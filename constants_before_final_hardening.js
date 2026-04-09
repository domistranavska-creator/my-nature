(function initMojaZahradaConstants(globalScope) {
  if (globalScope.MojaZahradaConstants) return;

  const JOURNAL_ENTRY_TYPES = Object.freeze({
    NOTE: "note",
    WALK: "walk",
    WEATHER: "weather",
    WORK: "work",
    PROBLEM: "problem",
    OBSERVATION: "observation"
  });

  const CARD_TYPES = Object.freeze({
    VARIETY: "variety",
    MUSHROOM: "mushroom",
    WILD_PLANT: "wild-plant",
    BIRD: "bird",
    INSECT: "insect",
    PEST_PROBLEM: "pest-problem",
    PROCESSING_RECIPE: "processing-recipe"
  });

  const NODE_TYPES = Object.freeze({
    PARENT: "parent",
    KIND: "kind",
    DETAIL: "detail"
  });

  const ROOT_CATEGORY = Object.freeze({
    GARDEN: "root-zahrada",
    NATURE: "root-priroda",
    HARVEST: "root-uroda",
    OTHER: "root-ine"
  });

  const CATEGORY_IDS = Object.freeze({
    FALLBACK: "cat-nezaradene",
    USEFUL: "cat-uzitkove",
    FRUIT_ROOT: "root-plodova",
    ROOT_VEGETABLES_ROOT: "root-korenova",
    LEAFY_ROOT: "root-listova",
    HERBS_ROOT: "root-bylinky",
    LEGUMES_ROOT: "root-strukoviny",
    STEM_ROOT: "root-hluzova",
    OTHER_USEFUL: "sub-uzitkove-ostatne",
    ORNAMENTAL_ROOT: "root-okrasne",
    PEST_PROBLEMS: "cat-skodcovia-problemy",
    MUSHROOMS: "cat-huby",
    WILD_PLANTS: "cat-divoke-rastliny",
    BIRDS: "cat-vtaky",
    ANIMALS: "cat-zvierata",
    INSECTS: "cat-hmyz",
    HARVEST: "cat-zber",
    RECIPES: "cat-recepty",
    CANNING: "cat-zavaranie",
    DRYING: "cat-susenie",
    TEA: "cat-caje",
    TINCTURES: "cat-tinktury",
    COMPOST: "cat-kompost-hnojiva",
    PEPPERS: "cat-papriky",
    TOMATOES: "cat-rajciny",
    LETTUCES: "cat-salaty",
    ZUCCHINI: "cat-cukety",
    CUCUMBERS: "cat-uhorky",
    CORN: "cat-kukurica",
    CARROTS: "cat-mrkva",
    PARSLEY: "cat-petrzlen",
    HERBS: "cat-bylinky",
    ORNAMENTAL: "cat-okrasne"
  });

  const QUICK_ADD_ACTION_IDS = Object.freeze([
    "entry",
    "card",
    "gallery",
    "category",
    "batch-sowing",
    "batch-move"
  ]);

  const SYNC_MEDIA_STATUS_VALUES = Object.freeze([
    "idle",
    "pending",
    "uploading",
    "done",
    "error"
  ]);

  globalScope.MojaZahradaConstants = Object.freeze({
    JOURNAL_ENTRY_TYPES,
    CARD_TYPES,
    NODE_TYPES,
    ROOT_CATEGORY,
    ROOT_CATEGORY_ORDER: Object.freeze([
      ROOT_CATEGORY.GARDEN,
      ROOT_CATEGORY.NATURE,
      ROOT_CATEGORY.HARVEST,
      ROOT_CATEGORY.OTHER
    ]),
    CATEGORY_IDS,
    FALLBACK_CATEGORY_ID: CATEGORY_IDS.FALLBACK,
    QUICK_ADD_ACTION_IDS,
    SYNC_MEDIA_STATUS_VALUES
  });
})(window);
