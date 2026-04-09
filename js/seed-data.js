(function initMojaZahradaSeedData(globalScope) {
  if (globalScope.MojaZahradaSeedData) return;

  function requireValue(name, value) {
    if (typeof value !== "undefined" && value !== null && value !== "") return value;
    throw new Error(`[MojaZahrada] Missing required dependency: ${name}`);
  }

  const constants = requireValue("MojaZahradaConstants", globalScope.MojaZahradaConstants);
  const NODE_TYPES = requireValue("NODE_TYPES", constants.NODE_TYPES);
  const ROOT_CATEGORY = requireValue("ROOT_CATEGORY", constants.ROOT_CATEGORY);
  const CATEGORY_IDS = requireValue("CATEGORY_IDS", constants.CATEGORY_IDS);
  const FALLBACK_CATEGORY_ID = requireValue("FALLBACK_CATEGORY_ID", constants.FALLBACK_CATEGORY_ID);

  function createSeedVarieties(categoryId, prefix, folder, count, sowingWindow) {
    return Array.from({ length: count - 1 }, (_, index) => index + 2).map((imageNumber) => ({
      id: `var-${categoryId}-${imageNumber}`,
      categoryId,
      name: `${prefix} ${String(imageNumber).padStart(2, "0")}`,
      type: "",
      image: `assets/${folder}/${imageNumber}.png`,
      images: [`assets/${folder}/${imageNumber}.png`],
      sowingWindow,
      sowingWindowAuto: true,
      sowedAt: "",
      transplantedAt: "",
      status: "",
      place: "",
      top: false,
      rating: 0,
      taste: "",
      notes: "",
      notGrowingThisYear: false,
      avoidNextYear: false,
      neverGrown: false
    }));
  }

  const STRUCTURE_CATEGORIES = Object.freeze([
    { id: ROOT_CATEGORY.GARDEN, name: "Záhrada", nodeType: NODE_TYPES.PARENT, group: "Hlavné svety", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 0, color: "#5f8d39", image: "" },
    { id: ROOT_CATEGORY.NATURE, name: "Príroda", nodeType: NODE_TYPES.PARENT, group: "Hlavné svety", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 1, color: "#4f8a68", image: "" },
    { id: ROOT_CATEGORY.HARVEST, name: "Úroda a spracovanie", nodeType: NODE_TYPES.PARENT, group: "Hlavné svety", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 2, color: "#b57a32", image: "" },
    { id: ROOT_CATEGORY.OTHER, name: "Iné", nodeType: NODE_TYPES.PARENT, group: "Samostatné", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 3, color: "#7d8c97", image: "" },
    { id: CATEGORY_IDS.USEFUL, name: "Úžitkové rastliny", nodeType: NODE_TYPES.PARENT, group: "Záhrada", parentCategoryId: ROOT_CATEGORY.GARDEN, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 10, color: "#769a4a", image: "" },
    { id: CATEGORY_IDS.FRUIT_ROOT, name: "Plodová zelenina", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 20, color: "#c65a37", image: "" },
    { id: CATEGORY_IDS.ROOT_VEGETABLES_ROOT, name: "Koreňová zelenina", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 21, color: "#d58b32", image: "" },
    { id: CATEGORY_IDS.LEAFY_ROOT, name: "Listová zelenina", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 22, color: "#73a84e", image: "" },
    { id: CATEGORY_IDS.HERBS_ROOT, name: "Bylinky", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 23, color: "#4b8f6a", image: "" },
    { id: CATEGORY_IDS.LEGUMES_ROOT, name: "Strukoviny", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 24, color: "#7ea052", image: "" },
    { id: CATEGORY_IDS.STEM_ROOT, name: "Hľúbová zelenina", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 25, color: "#a77a53", image: "" },
    { id: CATEGORY_IDS.OTHER_USEFUL, name: "Ostatné úžitkové rastliny", nodeType: NODE_TYPES.PARENT, group: "Úžitkové rastliny", parentCategoryId: CATEGORY_IDS.USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 26, color: "#9aa25b", image: "" },
    { id: CATEGORY_IDS.ORNAMENTAL_ROOT, name: "Okrasné rastliny", nodeType: NODE_TYPES.PARENT, group: "Záhrada", parentCategoryId: ROOT_CATEGORY.GARDEN, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 30, color: "#b06aa0", image: "" },
    { id: CATEGORY_IDS.PEST_PROBLEMS, name: "Škodcovia a problémy", nodeType: NODE_TYPES.KIND, group: "Záhrada", parentCategoryId: ROOT_CATEGORY.GARDEN, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 40, color: "#9b6e45", image: "" },
    { id: CATEGORY_IDS.MUSHROOMS, name: "Huby a hríby", nodeType: NODE_TYPES.KIND, group: "Príroda", parentCategoryId: ROOT_CATEGORY.NATURE, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 50, color: "#8a7457", image: "" },
    { id: CATEGORY_IDS.WILD_PLANTS, name: "Divoké rastliny", nodeType: NODE_TYPES.KIND, group: "Príroda", parentCategoryId: ROOT_CATEGORY.NATURE, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 51, color: "#6a9a57", image: "" },
    { id: CATEGORY_IDS.ANIMALS, name: "Vtáky", nodeType: NODE_TYPES.KIND, group: "Príroda", parentCategoryId: ROOT_CATEGORY.NATURE, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 52, color: "#8f7b63", image: "" },
    { id: CATEGORY_IDS.INSECTS, name: "Hmyz", nodeType: NODE_TYPES.KIND, group: "Príroda", parentCategoryId: ROOT_CATEGORY.NATURE, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 53, color: "#b18b38", image: "" },
    { id: CATEGORY_IDS.HARVEST, name: "Zber", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 60, color: "#a77b2e", image: "" },
    { id: CATEGORY_IDS.RECIPES, name: "Recepty", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 61, color: "#ba6a45", image: "" },
    { id: CATEGORY_IDS.CANNING, name: "Zaváranie", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 62, color: "#c45d47", image: "" },
    { id: CATEGORY_IDS.DRYING, name: "Sušenie", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 63, color: "#bf8b3f", image: "" },
    { id: CATEGORY_IDS.TEA, name: "Čaje", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 64, color: "#7b9450", image: "" },
    { id: CATEGORY_IDS.TINCTURES, name: "Tinktúry", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 65, color: "#846a9e", image: "" },
    { id: CATEGORY_IDS.COMPOST, name: "Kompost a hnojivá", nodeType: NODE_TYPES.KIND, group: "Úroda a spracovanie", parentCategoryId: ROOT_CATEGORY.HARVEST, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 66, color: "#6f7f4e", image: "" },
    { id: FALLBACK_CATEGORY_ID, name: "Nezaradené", nodeType: NODE_TYPES.KIND, group: "Iné", parentCategoryId: ROOT_CATEGORY.OTHER, notes: "Sem sa presunú odrody po zmazaní kategórie, aby sa nestratili.", recommendedSowingWindow: "", sowedAt: "", order: 99, color: "#8f806b", image: "" }
  ]);

  const seedCategories = Object.freeze([
    ...STRUCTURE_CATEGORIES,
    { id: CATEGORY_IDS.PEPPERS, name: "Papriky", nodeType: NODE_TYPES.KIND, group: "Plodová zelenina", parentCategoryId: CATEGORY_IDS.FRUIT_ROOT, notes: "Výsev skôr, ideálne január až február.", recommendedSowingWindow: "", sowedAt: "", order: 100, color: "#d45d2c", image: "assets/papriky/10.png" },
    { id: CATEGORY_IDS.TOMATOES, name: "Rajčiny", nodeType: NODE_TYPES.KIND, group: "Plodová zelenina", parentCategoryId: CATEGORY_IDS.FRUIT_ROOT, notes: "Dobrý štart je február až marec.", recommendedSowingWindow: "", sowedAt: "", order: 101, color: "#c84136", image: "assets/rajciny/10.png" },
    { id: CATEGORY_IDS.LETTUCES, name: "Šaláty", nodeType: NODE_TYPES.KIND, group: "Listová zelenina", parentCategoryId: CATEGORY_IDS.LEAFY_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 110, color: "#78a84b", image: "" },
    { id: CATEGORY_IDS.ZUCCHINI, name: "Cukety", nodeType: NODE_TYPES.KIND, group: "Plodová zelenina", parentCategoryId: CATEGORY_IDS.FRUIT_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 102, color: "#78a24d", image: "" },
    { id: CATEGORY_IDS.CUCUMBERS, name: "Uhorky", nodeType: NODE_TYPES.KIND, group: "Plodová zelenina", parentCategoryId: CATEGORY_IDS.FRUIT_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 103, color: "#4f8e4c", image: "" },
    { id: CATEGORY_IDS.CORN, name: "Kukurica", nodeType: NODE_TYPES.KIND, group: "Ostatné úžitkové rastliny", parentCategoryId: CATEGORY_IDS.OTHER_USEFUL, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 120, color: "#d2af37", image: "" },
    { id: CATEGORY_IDS.CARROTS, name: "Mrkva", nodeType: NODE_TYPES.KIND, group: "Koreňová zelenina", parentCategoryId: CATEGORY_IDS.ROOT_VEGETABLES_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 130, color: "#ea8a2d", image: "" },
    { id: CATEGORY_IDS.PARSLEY, name: "Petržlen", nodeType: NODE_TYPES.KIND, group: "Koreňová zelenina", parentCategoryId: CATEGORY_IDS.ROOT_VEGETABLES_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 131, color: "#6c9b41", image: "" },
    { id: CATEGORY_IDS.HERBS, name: "Bylinky", nodeType: NODE_TYPES.KIND, group: "Bylinky", parentCategoryId: CATEGORY_IDS.HERBS_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 140, color: "#4b8f6a", image: "" },
    { id: CATEGORY_IDS.ORNAMENTAL, name: "Okrasné rastliny", nodeType: NODE_TYPES.KIND, group: "Okrasné rastliny", parentCategoryId: CATEGORY_IDS.ORNAMENTAL_ROOT, notes: "", recommendedSowingWindow: "", sowedAt: "", order: 150, color: "#b06aa0", image: "" }
  ]);

  const seedVarieties = Object.freeze([
    ...createSeedVarieties(CATEGORY_IDS.PEPPERS, "Paprika", "papriky", 20, "január - február"),
    ...createSeedVarieties(CATEGORY_IDS.TOMATOES, "Rajčina", "rajciny", 53, "február - marec")
  ].map((item) => {
    if (item.id === `var-${CATEGORY_IDS.TOMATOES}-10`) {
      return {
        ...item,
        name: "Pollicino F1",
        type: "cherry",
        sowedAt: "2026-03-05",
        status: "sown",
        top: true,
        rating: 5,
        taste: "Výborná, vyvážená chuť.",
        notes: "Dobrá chuť, pekný tvar. Zatiaľ vyzerá veľmi sľubne."
      };
    }

    if (item.id === `var-${CATEGORY_IDS.PEPPERS}-10`) {
      return {
        ...item,
        type: "farebná paprika",
        sowedAt: "2026-02-14",
        transplantedAt: "2026-03-10",
        status: "transplanted",
        place: "kvetináč",
        rating: 4,
        notes: "Pekné silné sadeničky, chce otáčať za svetlom."
      };
    }

    return item;
  }));

  const seedTasks = Object.freeze([]);

  const seedJournal = Object.freeze([
    {
      id: "journal-1",
      title: "Štart sezóny",
      date: "2026-03-01",
      text: "Toto je môj záhradný systém. Chcem mať všetko pekne pokope."
    }
  ]);

  globalScope.MojaZahradaSeedData = {
    STRUCTURE_CATEGORIES,
    seedCategories,
    seedVarieties,
    seedTasks,
    seedJournal
  };
})(window);
