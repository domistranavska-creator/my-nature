(function initMojaZahradaQuickUiModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createQuickUiModule !== "function") {
    registry.createQuickUiModule = function createQuickUiModule(deps = {}) {
      const scope = "quick-ui";
      const {
        QUICK_UI_PREFERENCES_KEY,
        JOURNAL_ENTRY_TYPE_OPTIONS = [],
        CARD_TYPE_OPTIONS = [],
        QUICK_ADD_ACTION_IDS = [],
        CARD_TYPES = globalScope.MojaZahradaConstants?.CARD_TYPES || { VARIETY: "variety" },
        isCategoryCompatibleWithCardType = () => false,
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

      function requireValue(name, value) {
        if (typeof value !== "undefined" && value !== null && value !== "") return value;
        const error = new Error(`[MojaZahrada] Missing required dependency: ${name}`);
        reportModuleError(error, { dependency: name });
        throw error;
      }

      const preferencesKey = requireValue("QUICK_UI_PREFERENCES_KEY", QUICK_UI_PREFERENCES_KEY);

      function normalizeQuickUiPreferences(value = {}) {
        const next = value && typeof value === "object" ? value : {};
        const validJournalTypes = new Set(JOURNAL_ENTRY_TYPE_OPTIONS.map((item) => String(item?.value || "").trim()).filter(Boolean));
        const validCardTypes = new Set(CARD_TYPE_OPTIONS.map((item) => String(item?.value || "").trim()).filter(Boolean));
        const rawLastCategoryByCardType = next.lastCategoryByCardType && typeof next.lastCategoryByCardType === "object"
          ? next.lastCategoryByCardType
          : {};
        const lastCategoryByCardType = {};

        Object.entries(rawLastCategoryByCardType).forEach(([cardTypeValue, categoryId]) => {
          const safeCardType = String(cardTypeValue || "").trim();
          const safeCategoryId = String(categoryId || "").trim();
          if (!validCardTypes.has(safeCardType) || !safeCategoryId) return;
          lastCategoryByCardType[safeCardType] = safeCategoryId;
        });

        return {
          lastJournalEntryType: validJournalTypes.has(String(next.lastJournalEntryType || "").trim())
            ? String(next.lastJournalEntryType || "").trim()
            : "",
          lastCardType: validCardTypes.has(String(next.lastCardType || "").trim())
            ? String(next.lastCardType || "").trim()
            : "",
          lastCategoryId: String(next.lastCategoryId || "").trim(),
          lastCategoryByCardType,
          recentAddActions: Array.isArray(next.recentAddActions)
            ? [...new Set(next.recentAddActions.map((item) => String(item || "").trim()).filter((item) => QUICK_ADD_ACTION_IDS.includes(item)))].slice(0, QUICK_ADD_ACTION_IDS.length)
            : []
        };
      }

      function loadQuickUiPreferences() {
        if (typeof localStorage === "undefined") return normalizeQuickUiPreferences();
        try {
          const raw = localStorage.getItem(preferencesKey);
          return raw ? normalizeQuickUiPreferences(JSON.parse(raw)) : normalizeQuickUiPreferences();
        } catch (error) {
          reportModuleError(error, { operation: "loadQuickUiPreferences" });
          return normalizeQuickUiPreferences();
        }
      }

      function saveQuickUiPreferences(value = {}) {
        if (typeof localStorage === "undefined") return normalizeQuickUiPreferences(value);
        const normalized = normalizeQuickUiPreferences(value);
        try {
          localStorage.setItem(preferencesKey, JSON.stringify(normalized));
        } catch (error) {
          reportModuleError(error, { operation: "saveQuickUiPreferences" });
        }
        return normalized;
      }

      function patchQuickUiPreferences(update) {
        const current = loadQuickUiPreferences();
        const nextValue = typeof update === "function"
          ? update(current)
          : { ...current, ...(update && typeof update === "object" ? update : {}) };
        return saveQuickUiPreferences(nextValue);
      }

      function loadLastUsedJournalEntryType() {
        return String(loadQuickUiPreferences().lastJournalEntryType || "").trim();
      }

      function rememberLastUsedJournalEntryType(entryTypeValue = "") {
        const normalizedEntryType = String(entryTypeValue || "").trim();
        if (!normalizedEntryType) return;
        patchQuickUiPreferences((current) => ({
          ...current,
          lastJournalEntryType: normalizedEntryType
        }));
      }

      function loadLastUsedCardType() {
        return String(loadQuickUiPreferences().lastCardType || "").trim();
      }

      function rememberLastUsedCardType(cardTypeValue = "") {
        const normalizedCardType = String(cardTypeValue || "").trim();
        if (!normalizedCardType) return;
        patchQuickUiPreferences((current) => ({
          ...current,
          lastCardType: normalizedCardType
        }));
      }

      function loadRecentQuickAddActions() {
        return [...loadQuickUiPreferences().recentAddActions];
      }

      function rememberQuickAddAction(actionId = "") {
        const normalizedAction = String(actionId || "").trim();
        if (!QUICK_ADD_ACTION_IDS.includes(normalizedAction)) return;
        patchQuickUiPreferences((current) => ({
          ...current,
          recentAddActions: [
            normalizedAction,
            ...current.recentAddActions.filter((item) => item !== normalizedAction)
          ].slice(0, QUICK_ADD_ACTION_IDS.length)
        }));
      }

      function loadLastUsedCategoryId() {
        return String(loadQuickUiPreferences().lastCategoryId || "").trim();
      }

      function loadLastUsedCategoryIdForCardType(cardTypeValue = CARD_TYPES.VARIETY) {
        const normalizedCardType = String(cardTypeValue || "").trim() || CARD_TYPES.VARIETY;
        const preferences = loadQuickUiPreferences();
        const specificCategoryId = String(preferences.lastCategoryByCardType?.[normalizedCardType] || "").trim();
        if (specificCategoryId && isCategoryCompatibleWithCardType(normalizedCardType, specificCategoryId)) {
          return specificCategoryId;
        }
        const fallbackCategoryId = String(preferences.lastCategoryId || "").trim();
        if (fallbackCategoryId && isCategoryCompatibleWithCardType(normalizedCardType, fallbackCategoryId)) {
          return fallbackCategoryId;
        }
        return "";
      }

      function rememberLastUsedCategory(categoryId = "", cardTypeValue = CARD_TYPES.VARIETY) {
        const normalizedCategoryId = String(categoryId || "").trim();
        const normalizedCardType = String(cardTypeValue || "").trim() || CARD_TYPES.VARIETY;
        if (!normalizedCategoryId) return;
        patchQuickUiPreferences((current) => ({
          ...current,
          lastCategoryId: normalizedCategoryId,
          lastCategoryByCardType: {
            ...(current.lastCategoryByCardType || {}),
            [normalizedCardType]: normalizedCategoryId
          }
        }));
      }

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        normalizeQuickUiPreferences,
        loadQuickUiPreferences,
        saveQuickUiPreferences,
        patchQuickUiPreferences,
        loadLastUsedJournalEntryType,
        rememberLastUsedJournalEntryType,
        loadLastUsedCardType,
        rememberLastUsedCardType,
        loadRecentQuickAddActions,
        rememberQuickAddAction,
        loadLastUsedCategoryId,
        loadLastUsedCategoryIdForCardType,
        rememberLastUsedCategory
      };
    };
  }
})(window);
