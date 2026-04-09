(function initMojaZahradaCategoriesModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  registry.createCategoriesModule = function createCategoriesModule(deps = {}) {
    const {
      canonicalizeSupabaseMediaReference,
      normalizeEntitySyncMeta,
      clone,
      normalizeIdList,
      activeSyncItems,
      ensureDerivedDataCache,
      categoryAncestorIds,
      loadLastUsedCategoryIdForCardType,
      applyDefaultParenting,
      slugify,
      persist,
      render,
      showUndoDeleteToast,
      snapshotUndoStateValue,
      setUndoState,
      restoreUndoStateSnapshot,
      touchLocalSyncRecord,
      openCategoryManager,
      escapeHtml,
      getState = () => ({}),
      getActiveCategoryId = () => "",
      setActiveCategoryId = () => {},
      getIsFocusedView = () => false,
      ALWAYS_PROTECTED_CATEGORY_IDS = [],
      FALLBACK_CATEGORY_ID = "",
      ROOT_CATEGORY_IDS = [],
      STRUCTURE_CATEGORY_DEFAULTS,
      STRUCTURE_CATEGORIES = [],
      isDetailEntry = (item) => String(item?.entryKind || "detail") === "detail"
    } = deps;

    function normalizeCategoryRecord(category = {}) {
      const canonicalImage = canonicalizeSupabaseMediaReference(category?.image || category?.imagePath || "");
      return normalizeEntitySyncMeta({
        group: "Moje kategórie",
        parentCategoryId: "",
        nodeType: "kind",
        color: "#7e9f4b",
        image: "",
        recommendedSowingWindow: "",
        sowedAt: "",
        ...category,
        image: canonicalImage
      }, "category");
    }

    function filteredVarietiesForCurrentCategory() {
      return [...(ensureDerivedDataCache().sortedVarietiesByCategory.get(getActiveCategoryId()) || [])];
    }

    function currentCategory() {
      return ensureDerivedDataCache().categoriesById.get(getActiveCategoryId()) || null;
    }

    function collectDescendantCategoryIds(categoryId) {
      return [...(ensureDerivedDataCache().descendantsById.get(String(categoryId || "").trim()) || [])];
    }

    function orderedCategories() {
      return ensureDerivedDataCache().orderedCategories;
    }

    function groupedCategories() {
      return ensureDerivedDataCache().groupedCategories;
    }

    function childCategoriesOf(categoryId) {
      return [...(ensureDerivedDataCache().childrenByParent.get(String(categoryId || "").trim()) || [])];
    }

    function varietiesInCategory(categoryId) {
      return [...(ensureDerivedDataCache().varietiesByCategory.get(String(categoryId || "").trim()) || [])];
    }

    function varietiesInCategoryTree(categoryId) {
      return [...(ensureDerivedDataCache().varietiesByCategoryTree.get(String(categoryId || "").trim()) || [])];
    }

    function inheritedCategoryValue(categoryId, field) {
      const state = getState();
      let current = state.categories.find((item) => item.id === categoryId) || null;
      const visited = new Set();

      while (current && !visited.has(current.id)) {
        visited.add(current.id);
        const value = String(current[field] || "").trim();
        if (value) return value;
        current = current.parentCategoryId
          ? state.categories.find((item) => item.id === current.parentCategoryId) || null
          : null;
      }

      return "";
    }

    function isCategoryCompatibleWithCardType(cardTypeValue, categoryId) {
      const resolvedCategoryId = String(categoryId || "").trim();
      if (!resolvedCategoryId || resolvedCategoryId === FALLBACK_CATEGORY_ID) return false;
      const state = getState();
      const category = state.categories.find((item) => item.id === resolvedCategoryId);
      if (!category) return false;

      const lineage = new Set([category.id, ...categoryAncestorIds(category)]);

      if (cardTypeValue === "variety") {
        return lineage.has("root-zahrada")
          && !lineage.has("cat-skodcovia-problemy")
          && category.id !== "root-zahrada";
      }
      if (cardTypeValue === "mushroom") return lineage.has("cat-huby");
      if (cardTypeValue === "wild-plant") return lineage.has("cat-divoke-rastliny");
      if (cardTypeValue === "bird") {
        const birdRootId = state.categories.some((item) => item.id === "cat-vtaky") ? "cat-vtaky" : "cat-zvierata";
        return lineage.has(birdRootId);
      }
      if (cardTypeValue === "insect") return lineage.has("cat-hmyz");
      if (cardTypeValue === "pest-problem") return lineage.has("cat-skodcovia-problemy");
      if (cardTypeValue === "processing-recipe") return lineage.has("root-uroda");

      return false;
    }

    function resolveDefaultVarietyCategoryId() {
      const state = getState();
      const categoryExists = (categoryId) => state.categories.some((item) => item.id === categoryId);
      const current = currentCategory();

      if (getIsFocusedView() && current && isCategoryCompatibleWithCardType("variety", current.id)) {
        return current.id;
      }

      return ["cat-uzitkove", "root-plodova", "root-okrasne"].find((id) => categoryExists(id)) || FALLBACK_CATEGORY_ID;
    }

    function resolveQuickAddVarietyCategoryId() {
      const category = currentCategory();
      const rememberedCategoryId = loadLastUsedCategoryIdForCardType("variety");
      const fallbackCategoryId = rememberedCategoryId || resolveDefaultVarietyCategoryId();
      if (!getIsFocusedView() || !category) return fallbackCategoryId;
      if (ROOT_CATEGORY_IDS.includes(category.id)) return fallbackCategoryId;
      const children = childCategoriesOf(category.id);
      if (!children.length) return category.id;
      if (category.nodeType !== "parent") return category.id;

      const firstChild = children.find((item) => item.nodeType !== "parent");
      if (firstChild) return firstChild.id;

      return resolveDefaultVarietyCategoryId();
    }

    function resolvePreferredCardTypeForCategory(categoryId) {
      const resolvedCategoryId = String(categoryId || "").trim();
      const state = getState();
      const category = state.categories.find((item) => item.id === resolvedCategoryId);
      if (!category) return "variety";

      const lineage = new Set([category.id, ...categoryAncestorIds(category)]);
      if (lineage.has("cat-huby")) return "mushroom";
      if (lineage.has("cat-divoke-rastliny")) return "wild-plant";
      if (lineage.has("cat-zvierata")) return "bird";
      if (lineage.has("cat-hmyz")) return "insect";
      if (lineage.has("cat-skodcovia-problemy")) return "pest-problem";
      if (lineage.has("root-uroda")) return "processing-recipe";

      return "variety";
    }

    function resolveDefaultUniversalCardCategoryId(cardTypeValue) {
      const state = getState();
      const birdBranchId = state.categories.some((item) => item.id === "cat-vtaky") ? "cat-vtaky" : "cat-zvierata";
      const configs = {
        mushroom: { branchId: "cat-huby", defaultIds: ["cat-huby"] },
        "wild-plant": { branchId: "cat-divoke-rastliny", defaultIds: ["cat-divoke-rastliny"] },
        bird: { branchId: birdBranchId, defaultIds: ["cat-vtaky", "cat-zvierata"] },
        insect: { branchId: "cat-hmyz", defaultIds: ["cat-hmyz"] },
        "pest-problem": { branchId: "cat-skodcovia-problemy", defaultIds: ["cat-skodcovia-problemy"] },
        "processing-recipe": {
          branchId: "root-uroda",
          defaultIds: ["cat-recepty", "cat-zber", "cat-zavaranie", "cat-susenie", "cat-caje", "cat-tinktury", "cat-kompost-hnojiva"],
          skipCurrentIds: new Set(["root-uroda"])
        }
      };

      const config = configs[cardTypeValue];
      if (!config) return resolveDefaultVarietyCategoryId();

      const categoryExists = (categoryId) => state.categories.some((item) => item.id === categoryId);
      const current = currentCategory();
      const skipCurrentIds = config.skipCurrentIds || new Set();

      if (getIsFocusedView() && current && current.id !== FALLBACK_CATEGORY_ID) {
        const currentLineage = new Set([current.id, ...categoryAncestorIds(current)]);
        if (currentLineage.has(config.branchId) && !skipCurrentIds.has(current.id)) {
          return current.id;
        }
      }

      const explicitDefaultId = config.defaultIds.find((id) => categoryExists(id));
      if (!explicitDefaultId) return FALLBACK_CATEGORY_ID;

      if (ROOT_CATEGORY_IDS.includes(explicitDefaultId)) {
        const firstChild = childCategoriesOf(explicitDefaultId).find((item) => item.id !== FALLBACK_CATEGORY_ID) || childCategoriesOf(explicitDefaultId)[0];
        return firstChild?.id || explicitDefaultId;
      }

      return explicitDefaultId;
    }

    function resolvePreferredCategoryIdForCardType(cardTypeValue, currentCategoryId = "") {
      const resolvedCurrentCategoryId = String(currentCategoryId || "").trim();
      const state = getState();
      if (cardTypeValue === "bird" && state.categories.some((item) => item.id === "cat-vtaky")) {
        if (resolvedCurrentCategoryId === "cat-zvierata") {
          return "cat-vtaky";
        }
        const current = state.categories.find((item) => item.id === resolvedCurrentCategoryId);
        if (current) {
          const lineage = new Set([current.id, ...categoryAncestorIds(current)]);
          if (lineage.has("cat-zvierata") && !lineage.has("cat-vtaky")) {
            return "cat-vtaky";
          }
        }
      }
      if (isCategoryCompatibleWithCardType(cardTypeValue, resolvedCurrentCategoryId)) {
        return resolvedCurrentCategoryId;
      }
      if (cardTypeValue === "variety") {
        return resolveDefaultVarietyCategoryId();
      }
      return resolveDefaultUniversalCardCategoryId(cardTypeValue);
    }

    function resolveBatchSowingCategoryId() {
      const category = currentCategory();
      if (category && varietiesInCategoryTree(category.id).some(isDetailEntry)) return category.id;
      const firstCategoryWithVarieties = orderedCategories().find((item) => varietiesInCategoryTree(item.id).some(isDetailEntry));
      return firstCategoryWithVarieties?.id || null;
    }

    function resolveBatchMoveCategoryId() {
      const category = currentCategory();
      if (category && varietiesInCategoryTree(category.id).length) return category.id;
      const firstCategoryWithCards = orderedCategories().find((item) => varietiesInCategoryTree(item.id).length);
      return firstCategoryWithCards?.id || null;
    }

    function siblingCategories(category) {
      return orderedCategories().filter((item) => item.parentCategoryId === category.parentCategoryId);
    }

    function moveCategory(categoryId, direction) {
      const state = getState();
      const category = state.categories.find((item) => item.id === categoryId);
      if (!category) return;

      const siblings = siblingCategories(category);
      const currentIndex = siblings.findIndex((item) => item.id === categoryId);
      const targetIndex = currentIndex + direction;
      if (currentIndex === -1 || targetIndex < 0 || targetIndex >= siblings.length) return;

      const target = siblings[targetIndex];
      const originalOrder = category.order;
      const targetOriginalOrder = target.order;
      category.order = target.order;
      target.order = originalOrder;

      if (!persist()) {
        target.order = targetOriginalOrder;
        category.order = originalOrder;
        return;
      }

      render();
      openCategoryManager(categoryId, category.parentCategoryId || "");
    }

    function ensureActiveCategory() {
      const state = getState();
      const validCategories = activeSyncItems(state.categories);
      if (!validCategories.find((item) => item.id === getActiveCategoryId())) {
        setActiveCategoryId(validCategories[0]?.id || null);
      }
    }

    function enforceFixedCategoryNames(categories = []) {
      const fixedNames = { "cat-huby": "Huby a hríby" };
      return categories.map((item) => {
        const fixedName = fixedNames[String(item?.id || "").trim()];
        if (!fixedName) return item;
        return { ...item, name: fixedName };
      });
    }

    function fallbackParentIdForCategory(category, categories = getState()?.categories || []) {
      if (category.id === FALLBACK_CATEGORY_ID) {
        const defaultParentId = STRUCTURE_CATEGORY_DEFAULTS.get(FALLBACK_CATEGORY_ID)?.parentCategoryId || "";
        if (!defaultParentId || !categories.some((item) => item.id === defaultParentId)) return "";
        return defaultParentId;
      }
      const structureDefault = STRUCTURE_CATEGORY_DEFAULTS.get(category.id);
      if (structureDefault) return structureDefault.parentCategoryId || "";
      if (!category.parentCategoryId && category.nodeType === "parent") return "";
      const suggested = applyDefaultParenting({ ...category, parentCategoryId: "" }).parentCategoryId;
      return categories.some((item) => item.id === suggested && suggested !== category.id) ? suggested : "root-ine";
    }

    function wouldCreateCategoryCycle(categoryId, parentCategoryId, categories = getState().categories) {
      if (!categoryId || !parentCategoryId) return false;
      if (categoryId === parentCategoryId) return true;
      const categoriesById = new Map(categories.map((item) => [item.id, item]));
      const visited = new Set();
      let current = categoriesById.get(parentCategoryId) || null;

      while (current) {
        if (current.id === categoryId) return true;
        if (visited.has(current.id)) return true;
        visited.add(current.id);
        current = current.parentCategoryId ? categoriesById.get(current.parentCategoryId) || null : null;
      }

      return false;
    }

    function sanitizeCategoryHierarchy(categories) {
      const categoriesById = new Map(categories.map((item) => [item.id, item]));
      return categories.map((item) => {
        const normalized = { ...item };
        const structureDefault = STRUCTURE_CATEGORY_DEFAULTS.get(normalized.id);

        if (structureDefault) {
          normalized.name = structureDefault.name;
          normalized.parentCategoryId = structureDefault.parentCategoryId;
          normalized.nodeType = structureDefault.nodeType;
          normalized.group = structureDefault.group;
          normalized.order = Number.isFinite(Number(normalized.order)) ? Number(normalized.order) : structureDefault.order;
          normalized.color = String(normalized.color || "").trim() || structureDefault.color;
          if (!String(normalized.image || "").trim() && structureDefault.image) {
            normalized.image = structureDefault.image;
          }
        }

        if (normalized.id === "cat-kukurica" && (!normalized.parentCategoryId || normalized.parentCategoryId === "root-ine")) {
          normalized.parentCategoryId = "sub-uzitkove-ostatne";
          normalized.group = "Ostatné úžitkové rastliny";
          normalized.order = 120;
        }

        if (normalized.parentCategoryId && !categoriesById.has(normalized.parentCategoryId)) {
          normalized.parentCategoryId = fallbackParentIdForCategory(normalized, categories);
        }

        if (wouldCreateCategoryCycle(normalized.id, normalized.parentCategoryId, categories)) {
          normalized.parentCategoryId = fallbackParentIdForCategory(normalized, categories);
        }

        return normalized;
      });
    }

    function ensureRootCategories(categories) {
      const existingIds = new Set(categories.map((item) => item.id));
      const missingRoots = STRUCTURE_CATEGORIES
        .filter((item) => ALWAYS_PROTECTED_CATEGORY_IDS.includes(item.id) && !existingIds.has(item.id))
        .map((item) => clone(item));
      return [...missingRoots, ...categories];
    }

    function promoteLegacyNamedCategories(categories, varieties = [], customTasks = [], journal = []) {
      let nextCategories = categories.map((item) => ({ ...item }));
      let nextVarieties = varieties.map((item) => ({ ...item }));
      let nextTasks = customTasks.map((item) => ({ ...item }));
      let nextJournal = journal.map((item) => ({ ...item }));

      const promotions = [
        { targetId: "root-strukoviny", aliases: ["strukoviny"] },
        { targetId: "root-hluzova", aliases: ["hlubova-zelenina", "hlubova"] }
      ];

      promotions.forEach(({ targetId, aliases }) => {
        const target = nextCategories.find((item) => item.id === targetId);
        const targetDefaults = STRUCTURE_CATEGORY_DEFAULTS.get(targetId);
        if (!target) return;

        const duplicateIds = nextCategories
          .filter((item) => item.id !== targetId && !STRUCTURE_CATEGORY_DEFAULTS.has(item.id) && aliases.includes(slugify(item.name || "")))
          .map((item) => item.id);

        if (!duplicateIds.length) return;

        duplicateIds.forEach((duplicateId) => {
          const duplicate = nextCategories.find((item) => item.id === duplicateId);
          if (!duplicate) return;

          if (!String(target.image || "").trim() && String(duplicate.image || "").trim()) target.image = duplicate.image;
          if (!String(target.notes || "").trim() && String(duplicate.notes || "").trim()) target.notes = duplicate.notes;
          if (!String(target.recommendedSowingWindow || "").trim() && String(duplicate.recommendedSowingWindow || "").trim()) {
            target.recommendedSowingWindow = duplicate.recommendedSowingWindow;
          }
          if (
            String(duplicate.color || "").trim()
            && (!String(target.color || "").trim() || String(target.color || "").trim() === String(targetDefaults?.color || "").trim())
          ) {
            target.color = duplicate.color;
          }

          nextCategories.forEach((item) => {
            if (item.parentCategoryId === duplicateId) item.parentCategoryId = targetId;
          });

          nextVarieties = nextVarieties.map((item) => item.categoryId === duplicateId ? { ...item, categoryId: targetId } : item);
          nextTasks = nextTasks.map((item) => {
            const linkedCategoryIds = normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId);
            if (!linkedCategoryIds.includes(duplicateId)) return item;
            const nextLinkedCategoryIds = linkedCategoryIds.map((id) => (id === duplicateId ? targetId : id));
            return {
              ...item,
              linkedCategoryIds: normalizeIdList(nextLinkedCategoryIds),
              linkedCategoryId: normalizeIdList(nextLinkedCategoryIds)[0] || targetId
            };
          });
          nextJournal = nextJournal.map((item) => {
            const linkedCategoryIds = normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId);
            if (!linkedCategoryIds.includes(duplicateId)) return item;
            const nextLinkedCategoryIds = linkedCategoryIds.map((id) => (id === duplicateId ? targetId : id));
            return {
              ...item,
              linkedCategoryIds: normalizeIdList(nextLinkedCategoryIds),
              linkedCategoryId: normalizeIdList(nextLinkedCategoryIds)[0] || targetId
            };
          });
        });

        nextCategories = nextCategories.filter((item) => !duplicateIds.includes(item.id));
      });

      return { categories: nextCategories, varieties: nextVarieties, customTasks: nextTasks, journal: nextJournal };
    }

    function parentCategoryOptions(current, selfId) {
      const options = ['<option value="">Bez nadradenej kategórie</option>'];
      const blockedIds = new Set(selfId ? collectDescendantCategoryIds(selfId) : []);
      orderedCategories()
        .filter((item) => item.id !== selfId && !blockedIds.has(item.id))
        .forEach((item) => {
          options.push(`<option value="${item.id}" ${item.id === current ? "selected" : ""}>${escapeHtml(formattedCategoryOptionLabel(item))}</option>`);
        });
      return options.join("");
    }

    function categoryDepth(categoryId) {
      const state = getState();
      let depth = 0;
      const visited = new Set();
      let current = state.categories.find((item) => item.id === categoryId) || null;
      while (current?.parentCategoryId && !visited.has(current.id)) {
        visited.add(current.id);
        depth += 1;
        current = state.categories.find((item) => item.id === current.parentCategoryId) || null;
      }
      return depth;
    }

    function formattedCategoryOptionLabel(category, options = {}) {
      const depth = categoryDepth(category.id);
      const name = String(category.name || "").trim();
      if (options?.compact) return name;
      if (depth === 0) return `${name} [hlavná]`;
      if (depth === 1) return `    › ${name}`;
      return `${"      ".repeat(depth - 1)}·· ${name}`;
    }

    function deleteCategory(categoryId) {
      const state = getState();
      const deletedCategory = state.categories.find((item) => item.id === categoryId);
      if (!deletedCategory) return false;
      if (ALWAYS_PROTECTED_CATEGORY_IDS.includes(categoryId)) return false;
      const fallbackCategory = state.categories.find((item) => item.id === FALLBACK_CATEGORY_ID);
      const movedChildCategories = state.categories.filter((item) => item.parentCategoryId === categoryId);
      const movedVarieties = state.varieties.filter((item) => item.categoryId === categoryId);
      const movedTasks = state.customTasks.filter((item) => normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId).includes(categoryId));
      const movedJournal = state.journal.filter((item) => normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId).includes(categoryId));
      const previousCategories = clone(state.categories);
      const previousVarieties = clone(state.varieties);
      const previousTasks = clone(state.customTasks);
      const previousJournal = clone(state.journal);
      const previousActiveCategoryId = getActiveCategoryId();
      const previousUndoState = snapshotUndoStateValue();

      setUndoState({
        type: "category",
        category: clone(deletedCategory),
        categories: [clone(deletedCategory)],
        varieties: clone(movedVarieties),
        movedCategories: clone(movedChildCategories),
        customTasks: clone(movedTasks),
        journal: clone(movedJournal),
        previousActiveCategoryId
      });

      state.categories = ensureRootCategories(state.categories.map((item) => {
        if (item.id === categoryId) return touchLocalSyncRecord(item, "category", { deleted: true });
        if (item.parentCategoryId === categoryId) {
          return {
            ...item,
            parentCategoryId: item.id === FALLBACK_CATEGORY_ID ? "" : FALLBACK_CATEGORY_ID,
            group: item.id === FALLBACK_CATEGORY_ID ? (item.group || "Iné") : (fallbackCategory?.name || "Nezaradené")
          };
        }
        return item;
      }));
      state.varieties = state.varieties.map((item) => item.categoryId === categoryId ? { ...item, categoryId: FALLBACK_CATEGORY_ID } : item);
      state.customTasks = state.customTasks.map((item) => {
        const linkedCategoryIds = normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId);
        if (!linkedCategoryIds.includes(categoryId)) return item;
        const nextLinkedCategoryIds = linkedCategoryIds.map((id) => (id === categoryId ? FALLBACK_CATEGORY_ID : id));
        return {
          ...item,
          linkedCategoryIds: normalizeIdList(nextLinkedCategoryIds),
          linkedCategoryId: normalizeIdList(nextLinkedCategoryIds)[0] || FALLBACK_CATEGORY_ID
        };
      });
      state.journal = state.journal.map((item) => {
        const linkedCategoryIds = normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId);
        if (!linkedCategoryIds.includes(categoryId)) return item;
        const nextLinkedCategoryIds = linkedCategoryIds.map((id) => (id === categoryId ? FALLBACK_CATEGORY_ID : id));
        return {
          ...item,
          linkedCategoryIds: normalizeIdList(nextLinkedCategoryIds),
          linkedCategoryId: normalizeIdList(nextLinkedCategoryIds)[0] || FALLBACK_CATEGORY_ID
        };
      });
      setActiveCategoryId(FALLBACK_CATEGORY_ID);
      if (!persist()) {
        state.categories = previousCategories;
        state.varieties = previousVarieties;
        state.customTasks = previousTasks;
        state.journal = previousJournal;
        setActiveCategoryId(previousActiveCategoryId);
        restoreUndoStateSnapshot(previousUndoState);
        return false;
      }
      render();
      showUndoDeleteToast("Kategória zmazaná");
      return true;
    }

    return {
      normalizeCategoryRecord,
      filteredVarietiesForCurrentCategory,
      currentCategory,
      collectDescendantCategoryIds,
      orderedCategories,
      groupedCategories,
      childCategoriesOf,
      varietiesInCategory,
      varietiesInCategoryTree,
      inheritedCategoryValue,
      isCategoryCompatibleWithCardType,
      resolveDefaultVarietyCategoryId,
      resolveQuickAddVarietyCategoryId,
      resolvePreferredCardTypeForCategory,
      resolveDefaultUniversalCardCategoryId,
      resolvePreferredCategoryIdForCardType,
      resolveBatchSowingCategoryId,
      resolveBatchMoveCategoryId,
      moveCategory,
      ensureActiveCategory,
      deleteCategory,
      enforceFixedCategoryNames,
      fallbackParentIdForCategory,
      wouldCreateCategoryCycle,
      sanitizeCategoryHierarchy,
      ensureRootCategories,
      promoteLegacyNamedCategories,
      parentCategoryOptions,
      formattedCategoryOptionLabel
    };
  };
})(window);
