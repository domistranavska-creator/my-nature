(function initMojaZahradaCategoriesModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createCategoriesModule !== "function") {
    registry.createCategoriesModule = function createCategoriesModule(deps = {}) {
      const scope = "categories";
      const {
        canonicalizeSupabaseMediaReference,
        normalizeEntitySyncMeta: rawNormalizeEntitySyncMeta,
        clone,
        normalizeIdList,
        activeSyncItems,
        ensureDerivedDataCache: rawEnsureDerivedDataCache,
        categoryAncestorIds,
        loadLastUsedCategoryIdForCardType,
        applyDefaultParenting,
        slugify,
        persist: rawPersist,
        render: rawRender,
        showUndoDeleteToast,
        snapshotUndoStateValue,
        setUndoState,
        restoreUndoStateSnapshot,
        touchLocalSyncRecord,
        openCategoryManager,
        escapeHtml,
        getState: rawGetState,
        getActiveCategoryId = () => "",
        setActiveCategoryId = () => {},
        getIsFocusedView = () => false,
        ALWAYS_PROTECTED_CATEGORY_IDS = [],
        FALLBACK_CATEGORY_ID: rawFallbackCategoryId = "",
        ROOT_CATEGORY_IDS: rawRootCategoryIds = [],
        STRUCTURE_CATEGORY_DEFAULTS,
        STRUCTURE_CATEGORIES = [],
        isDetailEntry = (item) => String(item?.entryKind || "detail") === "detail",
        logModuleError,
        CARD_TYPES = globalScope.MojaZahradaConstants?.CARD_TYPES || {
          VARIETY: "variety",
          MUSHROOM: "mushroom",
          WILD_PLANT: "wild-plant",
          BIRD: "bird",
          INSECT: "insect",
          PEST_PROBLEM: "pest-problem",
          PROCESSING_RECIPE: "processing-recipe"
        },
        ROOT_CATEGORY = globalScope.MojaZahradaConstants?.ROOT_CATEGORY || {
          GARDEN: "root-zahrada",
          NATURE: "root-priroda",
          HARVEST: "root-uroda",
          OTHER: "root-ine"
        },
        CATEGORY_IDS = globalScope.MojaZahradaConstants?.CATEGORY_IDS || {
          FALLBACK: "cat-nezaradene",
          USEFUL: "cat-uzitkove",
          ORNAMENTAL_ROOT: "root-okrasne",
          MUSHROOMS: "cat-huby",
          WILD_PLANTS: "cat-divoke-rastliny",
          BIRDS: "cat-vtaky",
          ANIMALS: "cat-zvierata",
          INSECTS: "cat-hmyz",
          PEST_PROBLEMS: "cat-skodcovia-problemy",
          HARVEST: "cat-zber",
          RECIPES: "cat-recepty",
          CANNING: "cat-zavaranie",
          DRYING: "cat-susenie",
          TEA: "cat-caje",
          TINCTURES: "cat-tinktury",
          COMPOST: "cat-kompost-hnojiva",
          OTHER_USEFUL: "sub-uzitkove-ostatne",
          CORN: "cat-kukurica"
        },
        NODE_TYPES = globalScope.MojaZahradaConstants?.NODE_TYPES || {
          PARENT: "parent",
          KIND: "kind"
        }
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

      const normalizeEntitySyncMeta = requireFunction("normalizeEntitySyncMeta", rawNormalizeEntitySyncMeta);
      const ensureDerivedDataCache = requireFunction("ensureDerivedDataCache", rawEnsureDerivedDataCache);
      const persist = requireFunction("persist", rawPersist);
      const render = requireFunction("render", rawRender);
      const getState = requireFunction("getState", rawGetState);
      const FALLBACK_CATEGORY_ID = rawFallbackCategoryId || CATEGORY_IDS.FALLBACK;
      const ROOT_CATEGORY_IDS = Array.isArray(rawRootCategoryIds) && rawRootCategoryIds.length
        ? rawRootCategoryIds
        : [ROOT_CATEGORY.GARDEN, ROOT_CATEGORY.NATURE, ROOT_CATEGORY.HARVEST, ROOT_CATEGORY.OTHER];

      function normalizeCategoryRecord(category = {}) {
        try {
          const canonicalImage = canonicalizeSupabaseMediaReference(category?.image || category?.imagePath || "");
          return normalizeEntitySyncMeta({
            group: "Moje kategórie",
            parentCategoryId: "",
            nodeType: NODE_TYPES.KIND,
            color: "#7e9f4b",
            image: "",
            recommendedSowingWindow: "",
            sowedAt: "",
            ...category,
            image: canonicalImage
          }, "category");
        } catch (error) {
          reportModuleError(error, {
            operation: "normalizeCategoryRecord",
            categoryId: String(category?.id || "").trim()
          });
          throw error;
        }
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

        if (cardTypeValue === CARD_TYPES.VARIETY) {
          return lineage.has(ROOT_CATEGORY.GARDEN)
            && !lineage.has(CATEGORY_IDS.PEST_PROBLEMS)
            && category.id !== ROOT_CATEGORY.GARDEN;
        }
        if (cardTypeValue === CARD_TYPES.MUSHROOM) return lineage.has(CATEGORY_IDS.MUSHROOMS);
        if (cardTypeValue === CARD_TYPES.WILD_PLANT) return lineage.has(CATEGORY_IDS.WILD_PLANTS);
        if (cardTypeValue === CARD_TYPES.BIRD) {
          const birdRootId = state.categories.some((item) => item.id === CATEGORY_IDS.BIRDS) ? CATEGORY_IDS.BIRDS : CATEGORY_IDS.ANIMALS;
          return lineage.has(birdRootId);
        }
        if (cardTypeValue === CARD_TYPES.INSECT) return lineage.has(CATEGORY_IDS.INSECTS);
        if (cardTypeValue === CARD_TYPES.PEST_PROBLEM) return lineage.has(CATEGORY_IDS.PEST_PROBLEMS);
        if (cardTypeValue === CARD_TYPES.PROCESSING_RECIPE) return lineage.has(ROOT_CATEGORY.HARVEST);

        return false;
      }

      function resolveDefaultVarietyCategoryId() {
        const state = getState();
        const categoryExists = (categoryId) => state.categories.some((item) => item.id === categoryId);
        const current = currentCategory();

        if (getIsFocusedView() && current && isCategoryCompatibleWithCardType(CARD_TYPES.VARIETY, current.id)) {
          return current.id;
        }

        return [CATEGORY_IDS.USEFUL, "root-plodova", CATEGORY_IDS.ORNAMENTAL_ROOT].find((id) => categoryExists(id)) || FALLBACK_CATEGORY_ID;
      }

      function resolveQuickAddVarietyCategoryId() {
        const category = currentCategory();
        const rememberedCategoryId = loadLastUsedCategoryIdForCardType(CARD_TYPES.VARIETY);
        const fallbackCategoryId = rememberedCategoryId || resolveDefaultVarietyCategoryId();
        if (!getIsFocusedView() || !category) return fallbackCategoryId;
        if (ROOT_CATEGORY_IDS.includes(category.id)) return fallbackCategoryId;
        const children = childCategoriesOf(category.id);
        if (!children.length) return category.id;
        if (category.nodeType !== NODE_TYPES.PARENT) return category.id;

        const firstChild = children.find((item) => item.nodeType !== NODE_TYPES.PARENT);
        if (firstChild) return firstChild.id;

        return resolveDefaultVarietyCategoryId();
      }

      function resolvePreferredCardTypeForCategory(categoryId) {
        const resolvedCategoryId = String(categoryId || "").trim();
        const state = getState();
        const category = state.categories.find((item) => item.id === resolvedCategoryId);
        if (!category) return CARD_TYPES.VARIETY;

        const lineage = new Set([category.id, ...categoryAncestorIds(category)]);
        if (lineage.has(CATEGORY_IDS.MUSHROOMS)) return CARD_TYPES.MUSHROOM;
        if (lineage.has(CATEGORY_IDS.WILD_PLANTS)) return CARD_TYPES.WILD_PLANT;
        if (lineage.has(CATEGORY_IDS.ANIMALS)) return CARD_TYPES.BIRD;
        if (lineage.has(CATEGORY_IDS.INSECTS)) return CARD_TYPES.INSECT;
        if (lineage.has(CATEGORY_IDS.PEST_PROBLEMS)) return CARD_TYPES.PEST_PROBLEM;
        if (lineage.has(ROOT_CATEGORY.HARVEST)) return CARD_TYPES.PROCESSING_RECIPE;

        return CARD_TYPES.VARIETY;
      }

      function resolveDefaultUniversalCardCategoryId(cardTypeValue) {
        const state = getState();
        const birdBranchId = state.categories.some((item) => item.id === CATEGORY_IDS.BIRDS) ? CATEGORY_IDS.BIRDS : CATEGORY_IDS.ANIMALS;
        const configs = {
          [CARD_TYPES.MUSHROOM]: { branchId: CATEGORY_IDS.MUSHROOMS, defaultIds: [CATEGORY_IDS.MUSHROOMS] },
          [CARD_TYPES.WILD_PLANT]: { branchId: CATEGORY_IDS.WILD_PLANTS, defaultIds: [CATEGORY_IDS.WILD_PLANTS] },
          [CARD_TYPES.BIRD]: { branchId: birdBranchId, defaultIds: [CATEGORY_IDS.BIRDS, CATEGORY_IDS.ANIMALS] },
          [CARD_TYPES.INSECT]: { branchId: CATEGORY_IDS.INSECTS, defaultIds: [CATEGORY_IDS.INSECTS] },
          [CARD_TYPES.PEST_PROBLEM]: { branchId: CATEGORY_IDS.PEST_PROBLEMS, defaultIds: [CATEGORY_IDS.PEST_PROBLEMS] },
          [CARD_TYPES.PROCESSING_RECIPE]: {
            branchId: ROOT_CATEGORY.HARVEST,
            defaultIds: [CATEGORY_IDS.RECIPES, CATEGORY_IDS.HARVEST, CATEGORY_IDS.CANNING, CATEGORY_IDS.DRYING, CATEGORY_IDS.TEA, CATEGORY_IDS.TINCTURES, CATEGORY_IDS.COMPOST],
            skipCurrentIds: new Set([ROOT_CATEGORY.HARVEST])
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
        if (cardTypeValue === CARD_TYPES.BIRD && state.categories.some((item) => item.id === CATEGORY_IDS.BIRDS)) {
          if (resolvedCurrentCategoryId === CATEGORY_IDS.ANIMALS) {
            return CATEGORY_IDS.BIRDS;
          }
          const current = state.categories.find((item) => item.id === resolvedCurrentCategoryId);
          if (current) {
            const lineage = new Set([current.id, ...categoryAncestorIds(current)]);
            if (lineage.has(CATEGORY_IDS.ANIMALS) && !lineage.has(CATEGORY_IDS.BIRDS)) {
              return CATEGORY_IDS.BIRDS;
            }
          }
        }
        if (isCategoryCompatibleWithCardType(cardTypeValue, resolvedCurrentCategoryId)) {
          return resolvedCurrentCategoryId;
        }
        if (cardTypeValue === CARD_TYPES.VARIETY) {
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
        const fixedNames = { [CATEGORY_IDS.MUSHROOMS]: "Huby a hríby" };
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
        if (!category.parentCategoryId && category.nodeType === NODE_TYPES.PARENT) return "";
        const suggested = applyDefaultParenting({ ...category, parentCategoryId: "" }).parentCategoryId;
        return categories.some((item) => item.id === suggested && suggested !== category.id) ? suggested : ROOT_CATEGORY.OTHER;
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
        try {
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

            if (normalized.id === CATEGORY_IDS.CORN && (!normalized.parentCategoryId || normalized.parentCategoryId === ROOT_CATEGORY.OTHER)) {
              normalized.parentCategoryId = CATEGORY_IDS.OTHER_USEFUL;
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
        } catch (error) {
          reportModuleError(error, { operation: "sanitizeCategoryHierarchy" });
          throw error;
        }
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

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
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
  }
})(window);
