(function initMojaZahradaJournalModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  registry.createJournalModule = function createJournalModule(deps = {}) {
    const {
      canonicalizeSupabaseMediaList,
      canonicalizeSupabaseMediaReference,
      extractSupabaseStoragePath,
      normalizeTagList,
      normalizeIdList,
      inferRecordSeasonYear,
      normalizeEntitySyncMeta,
      makeId,
      todayISO,
      serializeMoodValues,
      normalizeWeatherSnapshot,
      normalizeJournalWalk,
      activeSyncItems,
      journalLinkChips,
      getState = () => ({})
    } = deps;

    function normalizeJournalEntry(entry = {}, varieties = []) {
      const images = Array.isArray(entry.images) && entry.images.length
        ? canonicalizeSupabaseMediaList(entry.images)
        : entry.image ? [canonicalizeSupabaseMediaReference(entry.image)] : [];
      const video = String(entry.video || entry.videoUrl || "").trim();
      const videoPath = String(entry.videoPath || "").trim() || extractSupabaseStoragePath(video);
      const linkedVarietyId = String(entry.linkedVarietyId || "").trim();
      const legacyPhenomena = normalizeTagList(entry.phenomena?.length ? entry.phenomena : entry.phenomenon);
      let linkedCategoryIds = normalizeIdList(entry.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry.linkedCategoryId);
      if (!linkedCategoryIds.length && linkedVarietyId) {
        const inferredCategoryId = varieties.find((item) => item.id === linkedVarietyId)?.categoryId || "";
        linkedCategoryIds = inferredCategoryId ? [inferredCategoryId] : [];
      }
      const linkedCategoryId = linkedCategoryIds[0] || "";
      const seasonYear = inferRecordSeasonYear(entry, [entry.date]);
      return normalizeEntitySyncMeta({
        ...entry,
        id: entry.id || makeId("journal"),
        title: String(entry.title || "Zápis").trim(),
        text: String(entry.text || "").trim(),
        date: String(entry.date || todayISO()).trim(),
        image: images[0] || "",
        images,
        entryType: (() => {
          const normalizedType = String(entry.entryType || "note").trim() || "note";
          return normalizedType === "observation" ? "note" : normalizedType;
        })(),
        tags: normalizeTagList([...(Array.isArray(entry.tags) ? entry.tags : normalizeTagList(entry.tags)), ...legacyPhenomena]),
        phenomena: [],
        linkedCategoryIds,
        linkedCategoryId,
        linkedVarietyId,
        linkedEntityName: String(entry.linkedEntityName || "").trim(),
        place: "",
        mood: serializeMoodValues(entry.mood),
        weather: normalizeWeatherSnapshot(entry.weather),
        walk: normalizeJournalWalk(entry, normalizeWeatherSnapshot(entry.weather)),
        video,
        videoPath,
        videoName: String(entry.videoName || "").trim(),
        videoMimeType: String(entry.videoMimeType || "").trim(),
        seasonYear
      }, "journal");
    }

    function normalizedJournalList() {
      const state = getState();
      if (!Array.isArray(state?.journal)) return [];
      return activeSyncItems(state.journal)
        .map((entry) => {
          try {
            return normalizeJournalEntry(entry || {}, state.varieties);
          } catch (error) {
            console.error("Zápis denníka sa nepodarilo normalizovať", error, entry);
            const fallbackImages = Array.isArray(entry?.images) && entry.images.length
              ? entry.images.filter(Boolean)
              : entry?.image
                ? [entry.image]
                : [];
            return {
              id: String(entry?.id || makeId("journal")).trim() || makeId("journal"),
              title: String(entry?.title || "Zápis").trim() || "Zápis",
              text: String(entry?.text || "").trim(),
              date: String(entry?.date || todayISO()).trim() || todayISO(),
              image: String(fallbackImages[0] || "").trim(),
              images: fallbackImages.map((item) => String(item || "").trim()).filter(Boolean),
              entryType: String(entry?.entryType || "note").trim() || "note",
              tags: normalizeTagList(entry?.tags),
              phenomena: [],
              linkedCategoryIds: normalizeIdList(entry?.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry?.linkedCategoryId),
              linkedCategoryId: String(entry?.linkedCategoryId || "").trim(),
              linkedVarietyId: String(entry?.linkedVarietyId || "").trim(),
              linkedEntityName: String(entry?.linkedEntityName || "").trim(),
              place: "",
              mood: serializeMoodValues(entry?.mood),
              weather: normalizeWeatherSnapshot(entry?.weather),
              walk: normalizeJournalWalk(entry || {}, normalizeWeatherSnapshot(entry?.weather)),
              video: String(entry?.video || entry?.videoUrl || "").trim(),
              videoPath: String(entry?.videoPath || "").trim(),
              videoName: String(entry?.videoName || "").trim(),
              videoMimeType: String(entry?.videoMimeType || "").trim(),
              seasonYear: inferRecordSeasonYear(entry, [entry?.date])
            };
          }
        })
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    function journalEntriesForTag(entries = normalizedJournalList(), themeKey = "") {
      const normalizedThemeKey = String(themeKey || "").trim();
      if (!normalizedThemeKey) return entries;
      const state = getState();
      return entries.filter((entry) => journalLinkChips(normalizeJournalEntry(entry, state.varieties)).some((chip) => chip.themeKey === normalizedThemeKey));
    }

    return {
      normalizeJournalEntry,
      normalizedJournalList,
      journalEntriesForTag
    };
  };
})(window);
