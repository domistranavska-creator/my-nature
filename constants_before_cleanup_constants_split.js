(function initMojaZahradaConstants(globalScope) {
  if (globalScope.MojaZahradaConstants) return;

  const ROOT_CATEGORY = Object.freeze({
    GARDEN: "root-zahrada",
    NATURE: "root-priroda",
    HARVEST: "root-uroda",
    OTHER: "root-ine"
  });

  const CATEGORY_IDS = Object.freeze({
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
  });

  globalScope.MojaZahradaConstants = Object.freeze({
    JOURNAL_ENTRY_TYPES: Object.freeze({
      NOTE: "note",
      WALK: "walk",
      WEATHER: "weather",
      WORK: "work",
      PROBLEM: "problem",
      OBSERVATION: "observation"
    }),
    CARD_TYPES: Object.freeze({
      VARIETY: "variety",
      MUSHROOM: "mushroom",
      WILD_PLANT: "wild-plant",
      BIRD: "bird",
      INSECT: "insect",
      PEST_PROBLEM: "pest-problem",
      PROCESSING_RECIPE: "processing-recipe"
    }),
    NODE_TYPES: Object.freeze({
      PARENT: "parent",
      KIND: "kind",
      DETAIL: "detail"
    }),
    ROOT_CATEGORY,
    ROOT_CATEGORY_ORDER: Object.freeze([
      ROOT_CATEGORY.GARDEN,
      ROOT_CATEGORY.NATURE,
      ROOT_CATEGORY.HARVEST,
      ROOT_CATEGORY.OTHER
    ]),
    CATEGORY_IDS,
    FALLBACK_CATEGORY_ID: CATEGORY_IDS.FALLBACK
  });
})(window);
