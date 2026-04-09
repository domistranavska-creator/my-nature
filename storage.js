(function initMojaZahradaStorageModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createStorageModule !== "function") {
    registry.createStorageModule = function createStorageModule(deps = {}) {
      const scope = "storage";
      const {
        STORAGE_KEY,
        clone,
        seedVarieties,
        seedTasks,
        seedJournal,
        seedCategories,
        normalizeVarietyRecord,
        normalizeTaskRecord,
        normalizeJournalEntry: rawNormalizeJournalEntry,
        normalizeCategoryRecord: rawNormalizeCategoryRecord,
        sanitizeCategoryHierarchy,
        ensureRootCategories,
        applyDefaultParenting,
        promoteLegacyNamedCategories,
        enforceFixedCategoryNames,
        placeholderImage,
        defaultStateFactory,
        saveResetBackup,
        serializeStateSnapshot,
        exportStateEnvelope,
        exportFileTimestamp,
        firstActiveCategoryId,
        activeSyncCount,
        invalidateDerivedDataCaches,
        prepareStateForSyncPersistence,
        mergeSupabaseSyncMetaPatch,
        scheduleAutoCloudPush,
        getState: rawGetState,
        setState: rawSetState,
        getSyncPersistenceBaseline: rawGetSyncPersistenceBaseline,
        setSyncPersistenceBaseline: rawSetSyncPersistenceBaseline,
        getActiveCategoryId: rawGetActiveCategoryId,
        setActiveCategoryId: rawSetActiveCategoryId,
        logModuleError
      } = deps;

      function reportModuleError(error, extra) {
        if (typeof logModuleError === "function") {
          logModuleError(scope, error, extra);
          return;
        }
        if (typeof extra === "undefined") {
          console.error(`[MojaZahrada][${scope}]`, error);
          return;
        }
        console.error(`[MojaZahrada][${scope}]`, error, extra);
      }

      function requireFunction(name, value) {
        if (typeof value === "function") return value;
        const error = new Error(`[MojaZahrada] Missing required dependency: ${name}`);
        reportModuleError(error, { dependency: name });
        throw error;
      }

      function requireValue(name, value) {
        if (typeof value !== "undefined" && value !== null && value !== "") return value;
        const error = new Error(`[MojaZahrada] Missing required dependency: ${name}`);
        reportModuleError(error, { dependency: name });
        throw error;
      }

      const storageKey = requireValue("STORAGE_KEY", STORAGE_KEY);
      const normalizeJournalEntry = requireFunction("normalizeJournalEntry", rawNormalizeJournalEntry);
      const normalizeCategoryRecord = requireFunction("normalizeCategoryRecord", rawNormalizeCategoryRecord);
      const getState = requireFunction("getState", rawGetState);
      const setState = requireFunction("setState", rawSetState);
      const getSyncPersistenceBaseline = requireFunction("getSyncPersistenceBaseline", rawGetSyncPersistenceBaseline);
      const setSyncPersistenceBaseline = requireFunction("setSyncPersistenceBaseline", rawSetSyncPersistenceBaseline);
      const getActiveCategoryId = requireFunction("getActiveCategoryId", rawGetActiveCategoryId);
      const setActiveCategoryId = requireFunction("setActiveCategoryId", rawSetActiveCategoryId);

      function normalizePersistedState(parsed = {}) {
        try {
          const normalizedVarieties = (parsed.varieties || clone(seedVarieties)).map(normalizeVarietyRecord);
          const normalizedTasks = (parsed.customTasks || clone(seedTasks)).map((task) => normalizeTaskRecord(task, normalizedVarieties));
          const normalizedJournal = (parsed.journal || clone(seedJournal)).map((entry) => normalizeJournalEntry(entry, normalizedVarieties));
          const categories = sanitizeCategoryHierarchy(ensureRootCategories((parsed.categories || clone(seedCategories)).map(normalizeCategoryRecord).map(applyDefaultParenting)));
          const promoted = promoteLegacyNamedCategories(categories, normalizedVarieties, normalizedTasks, normalizedJournal);
          return {
            categories: enforceFixedCategoryNames(promoted.categories.map(normalizeCategoryRecord)),
            varieties: promoted.varieties,
            customTasks: promoted.customTasks,
            journal: promoted.journal,
            autoTasks: Array.isArray(parsed.autoTasks) ? parsed.autoTasks : []
          };
        } catch (error) {
          reportModuleError(error, { operation: "normalizePersistedState" });
          throw error;
        }
      }

      function normalizeImportedStatePayload(parsed) {
        if (!parsed || typeof parsed !== "object") {
          throw new Error("Súbor s dátami nemá správny formát.");
        }
        if (parsed.state && typeof parsed.state === "object") {
          return normalizePersistedState(parsed.state);
        }
        return normalizePersistedState(parsed);
      }

      function saveImportBackupSnapshot(snapshot = serializeStateSnapshot()) {
        return saveResetBackup(snapshot, "before-import");
      }

      function downloadStateExport() {
        const payload = JSON.stringify(exportStateEnvelope(), null, 2);
        const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `moja-zahrada-export-${exportFileTimestamp()}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }

      async function importStateFromFile(file) {
        if (!file) {
          throw new Error("Najprv vyber JSON súbor s exportom.");
        }
        const raw = await file.text();
        if (!String(raw || "").trim()) {
          throw new Error("Vybraný súbor je prázdny.");
        }
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (error) {
          reportModuleError(error, { operation: "importStateFromFile.parse" });
          throw new Error("Vybraný súbor nie je platný JSON export.");
        }
        const previousState = serializeStateSnapshot();
        const nextState = normalizeImportedStatePayload(parsed);
        saveImportBackupSnapshot(previousState);
        const previousActiveCategoryId = getActiveCategoryId();
        setState(nextState);
        invalidateDerivedDataCaches();
        if (!getState().categories.some((item) => item.id === getActiveCategoryId())) {
          setActiveCategoryId(firstActiveCategoryId(getState().categories));
        }
        if (!persist()) {
          setState(normalizePersistedState(previousState));
          invalidateDerivedDataCaches();
          setActiveCategoryId(previousActiveCategoryId);
          persist();
          throw new Error("Import sa načítal, ale nový stav sa nepodarilo bezpečne uložiť.");
        }
        return {
          varieties: activeSyncCount(getState().varieties),
          tasks: activeSyncCount(getState().customTasks),
          journal: activeSyncCount(getState().journal)
        };
      }

      function defaultState() {
        const normalizedVarieties = clone(seedVarieties).map(normalizeVarietyRecord);
        const normalizedTasks = clone(seedTasks).map((task) => normalizeTaskRecord(task, normalizedVarieties));
        const normalizedJournal = clone(seedJournal).map((entry) => normalizeJournalEntry(entry, normalizedVarieties));
        const promoted = promoteLegacyNamedCategories(
          sanitizeCategoryHierarchy(clone(seedCategories).map(normalizeCategoryRecord)),
          normalizedVarieties,
          normalizedTasks,
          normalizedJournal
        );
        return {
          categories: enforceFixedCategoryNames(promoted.categories.map(normalizeCategoryRecord)),
          varieties: promoted.varieties,
          customTasks: promoted.customTasks,
          journal: promoted.journal,
          autoTasks: []
        };
      }

      function migrateLegacyState(legacy) {
        try {
          const categories = clone(seedCategories);
          const legacyEntries = legacy.entries || [];
          const varieties = legacyEntries.map((entry) => ({
            id: entry.id?.startsWith("var-") ? entry.id : `var-${entry.id}`,
            categoryId: entry.category === "paprika" ? "cat-papriky" : "cat-rajciny",
            entryKind: "detail",
            name: entry.name || "Odroda",
            type: entry.varietyType || "",
            image: entry.image || placeholderImage(),
            images: entry.image ? [entry.image] : [],
            sowingWindow: entry.sowingWindow || "",
            sowingWindowAuto: false,
            sowedAt: entry.sowedAt || "",
            transplantedAt: entry.transplantedAt || "",
            status: entry.status || "",
            place: "",
            top: Boolean(entry.favorite),
            rating: 0,
            taste: "",
            notes: entry.notes || "",
            notGrowingThisYear: false,
            avoidNextYear: Boolean(entry.avoidNextYear),
            neverGrown: false
          }));

          const normalizedVarieties = varieties.map(normalizeVarietyRecord);
          const normalizedTasks = (legacy.customTasks || clone(seedTasks)).map((task) => normalizeTaskRecord(task, normalizedVarieties));
          const normalizedJournal = (legacy.journal || clone(seedJournal)).map((entry) => normalizeJournalEntry(entry, normalizedVarieties));
          const promoted = promoteLegacyNamedCategories(
            sanitizeCategoryHierarchy(ensureRootCategories(categories.map(normalizeCategoryRecord).map(applyDefaultParenting))),
            normalizedVarieties,
            normalizedTasks,
            normalizedJournal
          );

          return {
            categories: enforceFixedCategoryNames(promoted.categories.map(normalizeCategoryRecord)),
            varieties: promoted.varieties,
            customTasks: promoted.customTasks,
            journal: promoted.journal,
            autoTasks: []
          };
        } catch (error) {
          reportModuleError(error, { operation: "migrateLegacyState" });
          throw error;
        }
      }

      function loadState() {
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) {
            return normalizePersistedState(JSON.parse(raw));
          }

          const legacyRaw = localStorage.getItem("moja-zahrada-v1");
          if (legacyRaw) {
            const legacy = JSON.parse(legacyRaw);
            return migrateLegacyState(legacy);
          }
        } catch (error) {
          reportModuleError(error, { operation: "loadState" });
          return defaultState();
        }

        return defaultState();
      }

      function persist(options = {}) {
        if (!options?.skipSyncPreparation) {
          const preparedState = prepareStateForSyncPersistence(getState(), getSyncPersistenceBaseline());
          setState(preparedState);
        }
        const serializedState = JSON.stringify(serializeStateSnapshot());
        try {
          localStorage.setItem(storageKey, serializedState);
          setSyncPersistenceBaseline(clone(getState()));
          mergeSupabaseSyncMetaPatch({}, getState());
          invalidateDerivedDataCaches();
          if (!options?.skipAutoSync) {
            scheduleAutoCloudPush();
          }
          return true;
        } catch (error) {
          reportModuleError(error, { operation: "persist" });
          alert("Uloženie sa nepodarilo. Dáta sú už asi príliš veľké pre úložisko prehliadača. Najčastejšie to robia fotky.");
          return false;
        }
      }

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        normalizePersistedState,
        normalizeImportedStatePayload,
        saveImportBackupSnapshot,
        downloadStateExport,
        importStateFromFile,
        defaultState,
        migrateLegacyState,
        loadState,
        persist
      };
    };
  }
})(window);
