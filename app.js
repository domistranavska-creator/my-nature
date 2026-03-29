const STORAGE_KEY = "moja-zahrada-v2";
const WEATHER_PREFERENCES_KEY = "moja-zahrada-weather-preferences-v1";
const FOLDER_STORAGE_META_KEY = "moja-zahrada-folder-storage-meta-v1";
const FOLDER_STORAGE_DB_NAME = "moja-zahrada-folder-storage-v1";
const FOLDER_STORAGE_DB_STORE = "handles";
const FOLDER_STORAGE_HANDLE_ID = "state-directory";
const FOLDER_STORAGE_FILE_NAME = "moja-zahrada-data.json";
const FOLDER_STORAGE_BACKUP_FILE_NAME = "moja-zahrada-data-backup.json";
const EBIRD_PREFERENCES_KEY = "moja-zahrada-ebird-preferences-v1";
const EBIRD_TAXONOMY_CACHE_KEY = "moja-zahrada-ebird-taxonomy-v1";
const LOCAL_AUTH_PROFILE_KEY = "moja-zahrada-local-auth-profile-v1";
const LOCAL_AUTH_SESSION_KEY = "moja-zahrada-local-auth-session-v1";
const SUPABASE_PREFERENCES_KEY = "moja-zahrada-supabase-preferences-v1";
const SUPABASE_AUTH_MIRROR_KEY = "moja-zahrada-supabase-auth-mirror-v1";
const SUPABASE_SYNC_META_KEY = "moja-zahrada-supabase-sync-meta-v1";
const UI_MOBILE_PREVIEW_KEY = "moja-zahrada-mobile-preview-v1";
const MOBILE_PREVIEW_EMBED_PARAM = "mobile-preview-embedded";
const MOBILE_PREVIEW_DEVICE_PARAM = "mobile-preview-device";
const MOBILE_PREVIEW_HOST_ID = "mobile-preview-system-chrome";
const MOBILE_PREVIEW_DEFAULT_DEVICE_ID = "galaxy-a54-5g";
const MOBILE_PREVIEW_MESSAGE_TYPE = "moja-zahrada-mobile-preview-metrics";
const MOBILE_PREVIEW_COMMAND_TYPE = "moja-zahrada-mobile-preview-command";
const MOBILE_WEATHER_THEME_DEBUG_KEY = "moja-zahrada-mobile-weather-theme-debug-v1";
const MOBILE_WEATHER_THEME_CLOUD_KEY = "moja-zahrada-mobile-weather-cloud-debug-v1";
const MOBILE_WEATHER_THEME_DEBUG_PERIOD_KEY = "moja-zahrada-mobile-weather-theme-period-debug-v1";
const MOBILE_WEATHER_THEME_DEBUG_WIND_KEY = "moja-zahrada-mobile-weather-wind-debug-v1";
const MOBILE_WEATHER_THEME_DEBUG_PRECIP_KEY = "moja-zahrada-mobile-weather-precip-debug-v1";
const MOBILE_WEATHER_THEME_DEBUG_TEMP_KEY = "moja-zahrada-mobile-weather-temp-debug-v1";
const MOBILE_WEATHER_THEME_DEBUG_PHASE_KEY = "moja-zahrada-mobile-weather-phase-debug-v1";
const MOBILE_WEATHER_THEME_DEBUG_MOON_KEY = "moja-zahrada-mobile-weather-moon-debug-v1";
const MOBILE_WEATHER_THEME_SEASON_KEY = "moja-zahrada-mobile-weather-season-debug-v1";
const MOBILE_WEATHER_DEBUG_PARAM = "weather-debug";
const MOBILE_WEATHER_SCENE_ONLY_KEY = "moja-zahrada-mobile-weather-scene-only-v1";
const MOBILE_WEATHER_SOUND_KEY = "moja-zahrada-mobile-weather-sound-v1";
const MOBILE_WEATHER_SOUND_VOLUME_KEY = "moja-zahrada-mobile-weather-sound-volume-v1";
const IMAGE_FILE_ACCEPT = "image/*,.jpg,.jpeg,.png,.webp,.heic,.heif";
const VIDEO_FILE_ACCEPT = "video/*,.mp4,.mov,.m4v,.webm,.3gp";
const SUPABASE_IMAGE_BUCKET = "mojazahrada-images";
const SUPABASE_VIDEO_FILE_LIMIT_BYTES = 100 * 1024 * 1024;
const GARDEN_WEATHER_PLACE = "Zákopčie, Slovensko";
const WEATHER_AUTO_REFRESH_MS = 1000 * 60 * 15;
const UNDO_KEY = "moja-zahrada-undo-v1";
const RESET_BACKUP_KEY = "moja-zahrada-reset-backup-v1";
const IMAGE_BACKGROUND_MIGRATION_KEY = "moja-zahrada-white-bg-v1";
const FALLBACK_CATEGORY_ID = "cat-nezaradene";
const ROOT_CATEGORY_IDS = ["root-zahrada", "root-priroda", "root-uroda", "root-ine"];
const MOBILE_PREVIEW_DEVICES = Object.freeze({
  "galaxy-a54-5g": Object.freeze({
    id: "galaxy-a54-5g",
    label: "Samsung Galaxy A54 5G",
    screenWidth: 360,
    screenHeight: 800,
    statusBarHeight: 24,
    topToolbarExpandedHeight: 56,
    topToolbarCollapsedHeight: 56,
    bottomToolbarExpandedHeight: 50,
    bottomToolbarCollapsedHeight: 50,
    frameRadius: 34
  })
});
const embeddedMobilePreviewDeviceId = (() => {
  if (typeof window === "undefined") return "";
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get(MOBILE_PREVIEW_EMBED_PARAM) !== "1") return "";
    const requestedId = String(url.searchParams.get(MOBILE_PREVIEW_DEVICE_PARAM) || "")
      .trim()
      .toLowerCase();
    return MOBILE_PREVIEW_DEVICES[requestedId] ? requestedId : MOBILE_PREVIEW_DEFAULT_DEVICE_ID;
  } catch (error) {
    return "";
  }
})();
const ICONS = {
  moodJoy: "\uD83D\uDE0A",
  moodCalm: "\uD83D\uDE0C",
  moodGratitude: "\uD83D\uDE4F",
  moodExcitement: "\uD83E\uDD29",
  moodLove: "\uD83E\uDD70",
  moodWorry: "\uD83D\uDE1F",
  moodSadness: "\uD83D\uDE14",
  moodAnger: "\uD83D\uDE20",
  moodTired: "\uD83D\uDE34",
  moodSurprise: "\uD83D\uDE2E",
  weatherTemp: "\uD83C\uDF21\uFE0F",
  weatherRain: "\uD83C\uDF27\uFE0F",
  weatherWind: "\uD83C\uDF2C\uFE0F",
  weatherStorm: "\u26C8\uFE0F",
  weatherSnow: "\uD83C\uDF28\uFE0F",
  weatherMist: "\uD83C\uDF2B\uFE0F",
  weatherCloud: "\u2601\uFE0F",
  weatherSun: "\u2600\uFE0F",
  weatherMoon: "\uD83C\uDF19",
  weatherPartly: "\u26C5",
  walkStart: "\u25B6\uFE0F",
  walkPause: "\u23F8\uFE0F",
  walkResume: "\u23EF\uFE0F",
  walkStop: "\u23F9\uFE0F",
  walkRoute: "\uD83D\uDDFA\uFE0F",
  walkDuration: "\u23F1\uFE0F",
  walkGps: "\uD83D\uDCCD",
  categoryGarden: "\uD83C\uDF31",
  categoryNature: "\uD83C\uDF3F",
  categoryHarvest: "\uD83C\uDF4E",
  categoryOther: "\uD83D\uDCC1",
  categoryUseful: "\uD83E\uDD55",
  categoryFlowers: "\uD83C\uDF38",
  categoryPests: "\uD83D\uDC1B",
  categoryMushrooms: "\uD83C\uDF44",
  categoryWildPlants: "\uD83C\uDF3F",
  categoryBirds: "\uD83D\uDC26",
  categoryInsects: "\uD83E\uDD8B",
  categoryHarvesting: "\uD83E\uDDFA",
  categoryRecipes: "\uD83C\uDF72",
  categoryCanning: "\uD83C\uDF6F",
  categoryDrying: "\uD83C\uDF3E",
  categoryTea: "\uD83C\uDF75",
  categoryTincture: "\uD83E\uDDEA",
  categoryCompost: "\u267B\uFE0F",
  cardVariety: "\uD83C\uDF31",
  cardMushroom: "\uD83C\uDF44",
  cardWildPlant: "\uD83C\uDF3F",
  cardBird: "\uD83D\uDC26",
  cardInsect: "\uD83E\uDD8B",
  cardPest: "\uD83D\uDC1B",
  cardRecipe: "\uD83C\uDF72",
  lightning: "\u26A1\uFE0F",
  frost: "\u2744\uFE0F",
  heat: "\uD83C\uDF21\uFE0F",
  stars1: "\u2605\u2606\u2606\u2606\u2606",
  stars2: "\u2605\u2605\u2606\u2606\u2606",
  stars3: "\u2605\u2605\u2605\u2606\u2606",
  stars4: "\u2605\u2605\u2605\u2605\u2606",
  stars5: "\u2605\u2605\u2605\u2605\u2605"
};
const PLACE_OPTIONS = [
  { value: "pole", label: "Pole" },
  { value: "sklenik", label: "Skleník" },
  { value: "kvetinac", label: "Kvetináč" },
  { value: "interier", label: "Interiér" },
  { value: "parapet", label: "Parapet" }
];

const STRUCTURE_CATEGORIES = [
  { id: "root-zahrada", name: "Záhrada", nodeType: "parent", group: "Hlavné svety", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 0, color: "#5f8d39", image: "" },
  { id: "root-priroda", name: "Príroda", nodeType: "parent", group: "Hlavné svety", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 1, color: "#4f8a68", image: "" },
  { id: "root-uroda", name: "Úroda a spracovanie", nodeType: "parent", group: "Hlavné svety", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 2, color: "#b57a32", image: "" },
  { id: "root-ine", name: "Iné", nodeType: "parent", group: "Samostatné", parentCategoryId: "", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 3, color: "#7d8c97", image: "" },
  { id: "cat-uzitkove", name: "Úžitkové rastliny", nodeType: "parent", group: "Záhrada", parentCategoryId: "root-zahrada", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 10, color: "#769a4a", image: "" },
  { id: "root-plodova", name: "Plodová zelenina", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 20, color: "#c65a37", image: "" },
  { id: "root-korenova", name: "Koreňová zelenina", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 21, color: "#d58b32", image: "" },
  { id: "root-listova", name: "Listová zelenina", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 22, color: "#73a84e", image: "" },
  { id: "root-bylinky", name: "Bylinky", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 23, color: "#4b8f6a", image: "" },
  { id: "root-strukoviny", name: "Strukoviny", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 24, color: "#7ea052", image: "" },
  { id: "root-hluzova", name: "Hľúbová zelenina", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 25, color: "#a77a53", image: "" },
  { id: "sub-uzitkove-ostatne", name: "Ostatné úžitkové rastliny", nodeType: "parent", group: "Úžitkové rastliny", parentCategoryId: "cat-uzitkove", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 26, color: "#9aa25b", image: "" },
  { id: "root-okrasne", name: "Okrasné rastliny", nodeType: "parent", group: "Záhrada", parentCategoryId: "root-zahrada", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 30, color: "#b06aa0", image: "" },
  { id: "cat-skodcovia-problemy", name: "Škodcovia a problémy", nodeType: "kind", group: "Záhrada", parentCategoryId: "root-zahrada", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 40, color: "#9b6e45", image: "" },
  { id: "cat-huby", name: "Huby a hríby", nodeType: "kind", group: "Príroda", parentCategoryId: "root-priroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 50, color: "#8a7457", image: "" },
  { id: "cat-divoke-rastliny", name: "Divoké rastliny", nodeType: "kind", group: "Príroda", parentCategoryId: "root-priroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 51, color: "#6a9a57", image: "" },
  { id: "cat-zvierata", name: "Vtáky", nodeType: "kind", group: "Príroda", parentCategoryId: "root-priroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 52, color: "#8f7b63", image: "" },
  { id: "cat-hmyz", name: "Hmyz", nodeType: "kind", group: "Príroda", parentCategoryId: "root-priroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 53, color: "#b18b38", image: "" },
  { id: "cat-zber", name: "Zber", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 60, color: "#a77b2e", image: "" },
  { id: "cat-recepty", name: "Recepty", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 61, color: "#ba6a45", image: "" },
  { id: "cat-zavaranie", name: "Zaváranie", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 62, color: "#c45d47", image: "" },
  { id: "cat-susenie", name: "Sušenie", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 63, color: "#bf8b3f", image: "" },
  { id: "cat-caje", name: "Čaje", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 64, color: "#7b9450", image: "" },
  { id: "cat-tinktury", name: "Tinktúry", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 65, color: "#846a9e", image: "" },
  { id: "cat-kompost-hnojiva", name: "Kompost a hnojivá", nodeType: "kind", group: "Úroda a spracovanie", parentCategoryId: "root-uroda", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 66, color: "#6f7f4e", image: "" },
  { id: FALLBACK_CATEGORY_ID, name: "Nezaradené", nodeType: "kind", group: "Iné", parentCategoryId: "root-ine", notes: "Sem sa presunú odrody po zmazaní kategórie, aby sa nestratili.", recommendedSowingWindow: "", sowedAt: "", order: 99, color: "#8f806b", image: "" }
];
const STRUCTURE_CATEGORY_IDS = STRUCTURE_CATEGORIES.map((item) => item.id);
const STRUCTURE_CATEGORY_DEFAULTS = new Map(STRUCTURE_CATEGORIES.map((item) => [item.id, item]));
const ALWAYS_PROTECTED_CATEGORY_IDS = [FALLBACK_CATEGORY_ID];

const seedCategories = [
  ...STRUCTURE_CATEGORIES,
  { id: "cat-papriky", name: "Papriky", nodeType: "kind", group: "Plodová zelenina", parentCategoryId: "root-plodova", notes: "Výsev skôr, ideálne január až február.", recommendedSowingWindow: "", sowedAt: "", order: 100, color: "#d45d2c", image: "assets/papriky/10.png" },
  { id: "cat-rajciny", name: "Rajčiny", nodeType: "kind", group: "Plodová zelenina", parentCategoryId: "root-plodova", notes: "Dobrý štart je február až marec.", recommendedSowingWindow: "", sowedAt: "", order: 101, color: "#c84136", image: "assets/rajciny/10.png" },
  { id: "cat-salaty", name: "Šaláty", nodeType: "kind", group: "Listová zelenina", parentCategoryId: "root-listova", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 110, color: "#78a84b", image: "" },
  { id: "cat-cukety", name: "Cukety", nodeType: "kind", group: "Plodová zelenina", parentCategoryId: "root-plodova", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 102, color: "#78a24d", image: "" },
  { id: "cat-uhorky", name: "Uhorky", nodeType: "kind", group: "Plodová zelenina", parentCategoryId: "root-plodova", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 103, color: "#4f8e4c", image: "" },
  { id: "cat-kukurica", name: "Kukurica", nodeType: "kind", group: "Ostatné úžitkové rastliny", parentCategoryId: "sub-uzitkove-ostatne", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 120, color: "#d2af37", image: "" },
  { id: "cat-mrkva", name: "Mrkva", nodeType: "kind", group: "Koreňová zelenina", parentCategoryId: "root-korenova", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 130, color: "#ea8a2d", image: "" },
  { id: "cat-petrzlen", name: "Petržlen", nodeType: "kind", group: "Koreňová zelenina", parentCategoryId: "root-korenova", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 131, color: "#6c9b41", image: "" },
  { id: "cat-bylinky", name: "Bylinky", nodeType: "kind", group: "Bylinky", parentCategoryId: "root-bylinky", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 140, color: "#4b8f6a", image: "" },
  { id: "cat-okrasne", name: "Okrasné rastliny", nodeType: "kind", group: "Okrasné rastliny", parentCategoryId: "root-okrasne", notes: "", recommendedSowingWindow: "", sowedAt: "", order: 150, color: "#b06aa0", image: "" }
];

const seedVarieties = [
  ...createSeedVarieties("cat-papriky", "Paprika", "papriky", 20, "január - február"),
  ...createSeedVarieties("cat-rajciny", "Rajčina", "rajciny", 53, "február - marec")
].map((item) => {
  if (item.id === "var-cat-rajciny-10") {
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

  if (item.id === "var-cat-papriky-10") {
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
});

const seedTasks = [];

const seedJournal = [
  {
    id: "journal-1",
    title: "Štart sezóny",
    date: "2026-03-01",
    text: "Toto je môj záhradný systém. Chcem mať všetko pekne pokope."
  }
];

const MOOD_OPTIONS = [
  { value: "joy", label: "Radosť", emoji: ICONS.moodJoy },
  { value: "calm", label: "Pokoj", emoji: ICONS.moodCalm },
  { value: "gratitude", label: "Vďačnosť", emoji: ICONS.moodGratitude },
  { value: "excitement", label: "Nadšenie", emoji: ICONS.moodExcitement },
  { value: "love", label: "Láska", emoji: ICONS.moodLove },
  { value: "surprise", label: "Prekvapenie", emoji: ICONS.moodSurprise },
  { value: "worry", label: "Obava", emoji: ICONS.moodWorry },
  { value: "sadness", label: "Smútok", emoji: ICONS.moodSadness },
  { value: "anger", label: "Hnev", emoji: ICONS.moodAnger },
  { value: "tired", label: "Únava", emoji: ICONS.moodTired }
];
const JOURNAL_ENTRY_TYPE_OPTIONS = [
  { value: "note", label: "Zápis" },
  { value: "walk", label: "Prechádzka" },
  { value: "weather", label: "Počasie a javy" },
  { value: "work", label: "Práca" },
  { value: "problem", label: "Problém" }
];
const CARD_TYPE_OPTIONS = [
  { value: "variety", label: "Odrody" },
  { value: "mushroom", label: "Huby a hríby" },
  { value: "wild-plant", label: "Divoké rastliny" },
  { value: "bird", label: "Vtáky" },
  { value: "insect", label: "Hmyz" },
  { value: "pest-problem", label: "Škodcovia a problémy" },
  { value: "processing-recipe", label: "Spracovanie a recepty" }
];

function normalizeTaskRecord(task = {}, varieties = []) {
  const linkedVarietyId = String(task.linkedVarietyId || "").trim();
  const linkedCategoryIds = normalizeIdList(task.linkedCategoryIds?.length ? task.linkedCategoryIds : task.linkedCategoryId);
  let normalizedLinkedCategoryIds = linkedCategoryIds.slice();
  if (!normalizedLinkedCategoryIds.length && linkedVarietyId) {
    const inferredCategoryId = varieties.find((item) => item.id === linkedVarietyId)?.categoryId || "";
    normalizedLinkedCategoryIds = inferredCategoryId ? [inferredCategoryId] : [];
  }
  const linkedCategoryId = normalizedLinkedCategoryIds[0] || "";
  return {
    id: task.id || makeId("task"),
    text: String(task.text || "").trim(),
    date: String(task.date || "").trim(),
    done: Boolean(task.done),
    source: String(task.source || "").trim(),
    linkedCategoryIds: normalizedLinkedCategoryIds,
    linkedCategoryId,
    linkedVarietyId
  };
}

function normalizeTagList(value) {
  const items = Array.isArray(value)
    ? value
    : String(value || "")
      .split(",")
      .map((item) => item.trim());
  return [...new Set(items.filter(Boolean))];
}

function normalizeIdList(value) {
  const items = Array.isArray(value)
    ? value
    : [value];
  return [...new Set(items.map((item) => String(item || "").trim()).filter(Boolean))];
}

function normalizeWeatherSnapshot(value) {
  if (!value || typeof value !== "object") return null;
  const snapshot = {
    temperature: String(value.temperature || "").trim(),
    condition: String(value.condition || "").trim(),
    rain: String(value.rain || "").trim(),
    wind: String(value.wind || "").trim(),
    humidity: String(value.humidity || "").trim(),
    observedAt: String(value.observedAt || "").trim(),
    note: String(value.note || "").trim(),
    icon: String(value.icon || "").trim(),
    placeLabel: String(value.placeLabel || "").trim(),
    fetchedAt: String(value.fetchedAt || "").trim(),
    latitude: String(value.latitude || "").trim(),
    longitude: String(value.longitude || "").trim(),
    dayPeriod: String(value.dayPeriod || "").trim(),
    sunshineHours: Number.isFinite(Number(value.sunshineHours)) ? Number(value.sunshineHours) : null,
    moonPhase: String(value.moonPhase || "").trim(),
    isDay: Number.isFinite(Number(value.isDay)) ? Number(value.isDay) : null,
    temperatureC: Number.isFinite(Number(value.temperatureC)) ? Number(value.temperatureC) : null,
    apparentTemperatureC: Number.isFinite(Number(value.apparentTemperatureC)) ? Number(value.apparentTemperatureC) : null,
    humidityPct: Number.isFinite(Number(value.humidityPct)) ? Number(value.humidityPct) : null,
    precipitationMm: Number.isFinite(Number(value.precipitationMm)) ? Number(value.precipitationMm) : null,
    rainMm: Number.isFinite(Number(value.rainMm)) ? Number(value.rainMm) : null,
    showersMm: Number.isFinite(Number(value.showersMm)) ? Number(value.showersMm) : null,
    snowfallCm: Number.isFinite(Number(value.snowfallCm)) ? Number(value.snowfallCm) : null,
    cloudCoverPct: Number.isFinite(Number(value.cloudCoverPct)) ? Number(value.cloudCoverPct) : null,
    cloudCoverLowPct: Number.isFinite(Number(value.cloudCoverLowPct)) ? Number(value.cloudCoverLowPct) : null,
    cloudCoverMidPct: Number.isFinite(Number(value.cloudCoverMidPct)) ? Number(value.cloudCoverMidPct) : null,
    cloudCoverHighPct: Number.isFinite(Number(value.cloudCoverHighPct)) ? Number(value.cloudCoverHighPct) : null,
    windSpeedKmh: Number.isFinite(Number(value.windSpeedKmh)) ? Number(value.windSpeedKmh) : null,
    windGustsKmh: Number.isFinite(Number(value.windGustsKmh)) ? Number(value.windGustsKmh) : null,
    windDirectionDeg: Number.isFinite(Number(value.windDirectionDeg)) ? Number(value.windDirectionDeg) : null,
    visibilityM: Number.isFinite(Number(value.visibilityM)) ? Number(value.visibilityM) : null,
    pressureMslHpa: Number.isFinite(Number(value.pressureMslHpa)) ? Number(value.pressureMslHpa) : null,
    surfacePressureHpa: Number.isFinite(Number(value.surfacePressureHpa)) ? Number(value.surfacePressureHpa) : null,
    sunriseAt: String(value.sunriseAt || "").trim(),
    sunsetAt: String(value.sunsetAt || "").trim(),
    daylightSeconds: Number.isFinite(Number(value.daylightSeconds)) ? Number(value.daylightSeconds) : null,
    precipitationProbabilityPct: Number.isFinite(Number(value.precipitationProbabilityPct)) ? Number(value.precipitationProbabilityPct) : null
  };
  return Object.values(snapshot).some(Boolean) ? snapshot : null;
}

function normalizeWalkNumber(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const normalized = Number(raw.replace(",", "."));
  return Number.isFinite(normalized) ? normalized : null;
}

function normalizeWalkRoutePoints(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") return String(item.label || item.name || item.title || "").trim();
        return "";
      })
      .filter(Boolean);
  }
  return String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeWalkGpsPoints(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const latitude = Number(item.latitude ?? item.lat);
      const longitude = Number(item.longitude ?? item.lng ?? item.lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
      const recordedAt = String(item.recordedAt || item.timestamp || "").trim();
      const accuracyValue = normalizeWalkNumber(item.accuracyMeters ?? item.accuracy ?? item.accuracy_meters);
      return {
        latitude: Number(latitude.toFixed(6)),
        longitude: Number(longitude.toFixed(6)),
        recordedAt: recordedAt || new Date().toISOString(),
        accuracyMeters: accuracyValue !== null ? Math.max(0, Math.round(accuracyValue)) : null,
        source: String(item.source || "gps").trim() || "gps"
      };
    })
    .filter(Boolean);
}

function normalizeWalkPhotoStops(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const latitude = Number(item.latitude ?? item.lat);
      const longitude = Number(item.longitude ?? item.lng ?? item.lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
      return {
        latitude: Number(latitude.toFixed(6)),
        longitude: Number(longitude.toFixed(6)),
        recordedAt: String(item.recordedAt || item.capturedAt || "").trim() || new Date().toISOString(),
        imageIndex: Number.isFinite(Number(item.imageIndex)) ? Number(item.imageIndex) : 0
      };
    })
    .filter(Boolean);
}

function nearestWalkGpsPoint(points = [], recordedAt = "") {
  if (!Array.isArray(points) || !points.length) return null;
  const targetTime = Date.parse(String(recordedAt || "").trim());
  if (!Number.isFinite(targetTime)) return points[points.length - 1] || null;
  let bestPoint = points[0] || null;
  let bestDiff = Number.POSITIVE_INFINITY;
  points.forEach((point) => {
    const pointTime = Date.parse(point?.recordedAt || "");
    if (!Number.isFinite(pointTime)) return;
    const diff = Math.abs(pointTime - targetTime);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestPoint = point;
    }
  });
  return bestPoint || points[points.length - 1] || null;
}

function buildWalkPhotoStop(point, imageIndex = 0, recordedAt = "") {
  if (!point || !Number.isFinite(Number(point.latitude)) || !Number.isFinite(Number(point.longitude))) return null;
  return {
    latitude: Number(point.latitude),
    longitude: Number(point.longitude),
    recordedAt: String(recordedAt || point.recordedAt || new Date().toISOString()).trim() || new Date().toISOString(),
    imageIndex: Number.isFinite(Number(imageIndex)) ? Number(imageIndex) : 0
  };
}

function walkGpsDistanceKm(points = []) {
  if (!Array.isArray(points) || points.length < 2) return null;
  const toRadians = (value) => (value * Math.PI) / 180;
  let totalDistance = 0;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const latitudeDelta = toRadians(current.latitude - previous.latitude);
    const longitudeDelta = toRadians(current.longitude - previous.longitude);
    const startLatitude = toRadians(previous.latitude);
    const endLatitude = toRadians(current.latitude);
    const haversine = Math.sin(latitudeDelta / 2) ** 2
      + Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2;
    const arc = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    totalDistance += 6371 * arc;
  }
  return totalDistance > 0 ? Number(totalDistance.toFixed(3)) : null;
}

function walkDurationMinutesFromBounds(startedAt = "", endedAt = "", { live = false, pausedDurationMs = 0 } = {}) {
  const start = Date.parse(String(startedAt || "").trim());
  const end = endedAt
    ? Date.parse(String(endedAt || "").trim())
    : (live ? Date.now() : Number.NaN);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  const pausedMs = Math.max(0, Number(pausedDurationMs) || 0);
  return Math.max(0, Math.round((end - start - pausedMs) / 60000));
}

function walkGpsDurationMinutes(points = [], startedAt = "", endedAt = "", options = {}) {
  const boundedDuration = walkDurationMinutesFromBounds(startedAt, endedAt, options);
  if (boundedDuration !== null) return boundedDuration;
  if (!Array.isArray(points) || points.length < 2) return null;
  const start = Date.parse(points[0]?.recordedAt || "");
  const end = Date.parse(points[points.length - 1]?.recordedAt || "");
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  return Math.max(0, Math.round((end - start) / 60000));
}

function formatWalkDateTime(value = "") {
  const timestamp = Date.parse(String(value || "").trim());
  if (!Number.isFinite(timestamp)) return "";
  return new Date(timestamp).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
}

function walkAutoTitle(walkValue, fallbackDate = todayISO()) {
  const walk = normalizeJournalWalk({ walk: walkValue }) || null;
  const startedAt = String(walk?.startedAt || "").trim();
  const startTimestamp = Date.parse(startedAt);
  if (Number.isFinite(startTimestamp)) {
    const dateLabel = new Date(startTimestamp).toLocaleDateString("sk-SK", { day: "numeric", month: "numeric" });
    const timeLabel = new Date(startTimestamp).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
    return `Prechádzka ${dateLabel} • ${timeLabel}`;
  }
  const dateValue = String(fallbackDate || todayISO()).trim() || todayISO();
  return `Prechádzka ${formatDate(dateValue)}`;
}

function walkTimeRangeLabel(walkValue) {
  const walk = normalizeJournalWalk({ walk: walkValue }) || null;
  if (!walk) return "";
  const gpsPoints = Array.isArray(walk.gpsPoints) ? walk.gpsPoints : [];
  const startedAt = String(walk.startedAt || gpsPoints[0]?.recordedAt || "").trim();
  const endedAt = String(walk.endedAt || gpsPoints[gpsPoints.length - 1]?.recordedAt || "").trim();
  const startTime = formatWalkDateTime(startedAt);
  const endTime = formatWalkDateTime(endedAt);
  if (startTime && endTime) return `${startTime} - ${endTime}`;
  return startTime || endTime || "";
}

function formatWalkGpsCoordinates(point) {
  if (!point || !Number.isFinite(Number(point.latitude)) || !Number.isFinite(Number(point.longitude))) return "";
  return `${Number(point.latitude).toFixed(5)}, ${Number(point.longitude).toFixed(5)}`;
}

function formatWalkGpsPointLabel(point, index = 0, total = 0) {
  const dateValue = Date.parse(point?.recordedAt || "");
  const timeLabel = Number.isFinite(dateValue)
    ? new Date(dateValue).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })
    : "";
  const accuracyLabel = Number.isFinite(Number(point?.accuracyMeters)) ? `±${Math.round(Number(point.accuracyMeters))} m` : "";
  const label = index === 0
    ? "Štart"
    : (total && index === total - 1 ? "Koniec" : `Bod ${index + 1}`);
  return [label, timeLabel, accuracyLabel].filter(Boolean).join(" • ");
}

function formatWalkGpsPlaceLabel(point, kind = "point") {
  return "";
}

function displayWalkPlaceLabel(value = "") {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  const withoutCoordinates = normalized
    .replace(/\s*[•\-–]\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (withoutCoordinates.includes("Štart GPS")) return "Štart GPS";
  if (withoutCoordinates.includes("Koniec GPS")) return "Koniec GPS";
  if (withoutCoordinates.includes("GPS bod")) return "GPS bod";
  return withoutCoordinates;
}

function journalDisplayTitle(entry = {}) {
  const normalizedEntry = entry && typeof entry === "object" ? entry : {};
  const fallbackTitle = String(normalizedEntry.title || "Zápis").trim() || "Zápis";
  if (normalizedEntry.entryType !== "walk") return fallbackTitle;
  if (/^prechádzka\b/iu.test(fallbackTitle)) {
    return "Prechádzka";
  }
  return fallbackTitle;
}

function journalHeaderWeather(entry = {}) {
  const normalizedEntry = entry && typeof entry === "object" ? entry : {};
  const directWeather = normalizeWeatherSnapshot(normalizedEntry.weather);
  if (directWeather) return directWeather;
  const walk = normalizeJournalWalk({ walk: normalizedEntry.walk || normalizedEntry }, directWeather);
  if (!walk) return null;
  return normalizeWeatherSnapshot({
    temperature: walk.temperature,
    condition: walk.conditions,
    rain: walk.precipitation,
    wind: walk.wind
  });
}

function walkMapPoints(walkValue) {
  const walk = normalizeJournalWalk({ walk: walkValue }) || null;
  return Array.isArray(walk?.gpsPoints) ? walk.gpsPoints.filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude)) : [];
}

function renderWalkMapMarkup(walkValue, { compact = false, live = false, photoCount = 0 } = {}) {
  const points = walkMapPoints(walkValue);
  if (points.length < 1) return "";
  return `
    <div class="journal-walk__map-shell ${compact ? "journal-walk__map-shell--compact" : ""} ${live ? "journal-walk__map-shell--live" : ""}" data-walk-map-shell>
      <div
        class="journal-walk__map ${compact ? "journal-walk__map--compact" : ""} ${live ? "journal-walk__map--live" : ""}"
        data-walk-map
        data-walk-map-photo-count="${escapeAttribute(String(Math.max(0, Number(photoCount) || 0)))}"
        data-walk-map-points="${escapeAttribute(JSON.stringify(points.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude
        }))))}"
      ></div>
      ${compact ? "" : `
        <button class="journal-walk__map-expand" type="button" data-walk-map-fullscreen aria-label="Celá mapa" title="Celá mapa">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 4H4v4"></path>
            <path d="M16 4h4v4"></path>
            <path d="M20 16v4h-4"></path>
            <path d="M4 16v4h4"></path>
          </svg>
        </button>
      `}
    </div>
  `;
}

function hydrateWalkMaps(root = document) {
  if (!root || typeof root.querySelectorAll !== "function" || typeof window === "undefined" || !window.L) return;
  root.querySelectorAll("[data-walk-map]").forEach((mapEl) => {
    if (mapEl.dataset.walkMapReady === "true") return;
    const normalizedPoints = walkMapPointsFromElement(mapEl);
    const photoCount = Math.max(0, Number(mapEl.getAttribute("data-walk-map-photo-count") || 0) || 0);
    if (normalizedPoints.length < 1) return;

    const map = window.L.map(mapEl, {
      zoomControl: true,
      attributionControl: true,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
      zoomAnimation: false,
      fadeAnimation: false,
      markerZoomAnimation: false,
      tap: true,
      touchZoom: true
    });

    createWalkTileLayer(map, mapEl);
    walkMapInstances.set(mapEl, map);
    attachWalkMapControls(mapEl, () => walkMapInstances.get(mapEl));

    const startPoint = normalizedPoints[0];
    const endPoint = normalizedPoints[normalizedPoints.length - 1];

    let polyline = null;
    if (normalizedPoints.length >= 2) {
      polyline = window.L.polyline(
        normalizedPoints.map((point) => [Number(point.latitude), Number(point.longitude)]),
        {
          color: "#6f963d",
          weight: mapEl.classList.contains("journal-walk__map--compact") ? 4 : 5,
          opacity: 0.92,
          lineCap: "round",
          lineJoin: "round"
        }
      ).addTo(map);
    }

    window.L.circleMarker([Number(startPoint.latitude), Number(startPoint.longitude)], {
      radius: 6,
      color: "#3f6a2a",
      weight: 2,
      fillColor: "#f5fff0",
      fillOpacity: 1
    }).addTo(map);

    window.L.circleMarker([Number(endPoint.latitude), Number(endPoint.longitude)], {
      radius: 6,
      color: "#9c5b2b",
      weight: 2,
      fillColor: "#fff3e8",
      fillOpacity: 1
    }).addTo(map);

    walkMapPhotoMarkerPoints(normalizedPoints, photoCount).forEach((point, index) => {
      window.L.marker([Number(point.latitude), Number(point.longitude)], {
        keyboard: false,
        zIndexOffset: 600,
        icon: window.L.divIcon({
          className: "journal-walk__photo-marker",
          html: `<span style="display:grid;place-items:center;width:22px;height:22px;border-radius:999px;background:rgba(255,251,244,0.98);border:1px solid rgba(186,155,90,0.42);box-shadow:0 6px 14px rgba(52,41,25,0.16);font-size:12px;line-height:1;">\uD83D\uDCF7</span>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        }),
        title: photoCount > 1 ? `Fotka ${index + 1}` : "Fotka"
      }).addTo(map);
    });

    fitWalkMapViewport(map, {
      polyline,
      point: startPoint,
      compact: mapEl.classList.contains("journal-walk__map--compact"),
      live: mapEl.classList.contains("journal-walk__map--live"),
      points: normalizedPoints
    });
    scheduleWalkMapResize(map);
    mapEl.dataset.walkMapReady = "true";
  });
}

function walkRoutePointsText(walk) {
  const normalizedWalk = normalizeJournalWalk({ walk }) || null;
  return normalizedWalk?.routePoints?.join("\n") || "";
}

function normalizeJournalWalk(entry = {}, fallbackWeather = null) {
  const hasWalkObject = entry?.walk && typeof entry.walk === "object";
  const hasLegacyWalkShape = [
    "startPlace",
    "start",
    "endPlace",
    "end",
    "distanceKm",
    "distance",
    "durationMinutes",
    "duration",
    "routePoints",
    "routePointsText",
    "route"
  ].some((key) => Object.prototype.hasOwnProperty.call(entry || {}, key));
  const source = hasWalkObject
    ? entry.walk
    : hasLegacyWalkShape
      ? entry
      : null;
  if (!source || typeof source !== "object") return null;

  const weather = fallbackWeather && typeof fallbackWeather === "object" ? fallbackWeather : null;
  const normalized = {
    startPlace: String(source.startPlace || source.start || "").trim(),
    endPlace: String(source.endPlace || source.end || "").trim(),
    startedAt: String(source.startedAt || source.started_at || "").trim(),
    endedAt: String(source.endedAt || source.ended_at || "").trim(),
    pausedAt: String(source.pausedAt || source.paused_at || "").trim(),
    pausedDurationMs: Math.max(0, Number(source.pausedDurationMs || source.paused_duration_ms || 0) || 0),
    distanceKm: normalizeWalkNumber(source.distanceKm ?? source.distance),
    durationMinutes: normalizeWalkNumber(source.durationMinutes ?? source.durationMinutes ?? source.duration),
    routePoints: normalizeWalkRoutePoints(source.routePoints?.length ? source.routePoints : (source.routePointsText || source.route || "")),
    gpsPoints: normalizeWalkGpsPoints(source.gpsPoints),
    temperature: String(source.temperature || "").trim(),
    wind: String(source.wind || "").trim(),
    precipitation: String(source.precipitation || source.rain || "").trim(),
    conditions: String(source.conditions || source.condition || "").trim()
  };

  if (normalized.distanceKm === null) {
    const gpsDistance = walkGpsDistanceKm(normalized.gpsPoints);
    if (gpsDistance !== null) normalized.distanceKm = gpsDistance;
  }
  if (normalized.durationMinutes === null) {
    const gpsDuration = walkGpsDurationMinutes(normalized.gpsPoints, normalized.startedAt, normalized.endedAt, {
      pausedDurationMs: normalized.pausedDurationMs
    });
    if (gpsDuration !== null) normalized.durationMinutes = gpsDuration;
  }

  if (!normalized.temperature && weather?.temperature) normalized.temperature = String(weather.temperature).trim();
  if (!normalized.wind && weather?.wind) normalized.wind = String(weather.wind).trim();
  if (!normalized.precipitation && weather?.rain) normalized.precipitation = String(weather.rain).trim();
  if (!normalized.conditions && weather?.condition) normalized.conditions = String(weather.condition).trim();

  const hasContent = Boolean(
    normalized.startPlace
    || normalized.endPlace
    || normalized.startedAt
    || normalized.endedAt
    || normalized.pausedAt
    || normalized.pausedDurationMs
    || normalized.distanceKm !== null
    || normalized.durationMinutes !== null
    || normalized.routePoints.length
    || normalized.gpsPoints.length
    || normalized.temperature
    || normalized.wind
    || normalized.precipitation
    || normalized.conditions
  );

  return hasContent ? normalized : null;
}

function normalizeJournalEntry(entry = {}, varieties = []) {
  const images = Array.isArray(entry.images) && entry.images.length
    ? entry.images.filter(Boolean)
    : entry.image ? [entry.image] : [];
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
  return {
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
    place: String(entry.place || "").trim(),
    mood: String(entry.mood || "").trim(),
    weather: normalizeWeatherSnapshot(entry.weather),
    walk: normalizeJournalWalk(entry, normalizeWeatherSnapshot(entry.weather)),
    video,
    videoPath,
    videoName: String(entry.videoName || "").trim(),
    videoMimeType: String(entry.videoMimeType || "").trim()
  };
}

let state = loadState();
let activeCategoryId = state.categories[0]?.id || null;
let activeFilter = "all";
let isFocusedView = false;
let imageBackgroundCleanupScheduled = false;
let sowingTipInterval = null;
let overviewHighlightsInterval = null;
let memoryCarouselIndex = 0;
let insightTipIndex = 0;
let overviewHighlightsStep = 0;
let homeWeatherSnapshot = null;
let homeWeatherTrend = null;
let homeWeatherOverview = null;
let weatherOverviewSelectedDate = "";
let weatherOverviewSelectedWeek = "current";
let weatherOverviewSelectedPeriod = "";
let homeWeatherLoadPromise = null;
let homeWeatherTrendLoadPromise = null;
let homeWeatherOverviewLoadPromise = null;
let homeWeatherRefreshTimer = null;
let folderStorageWriteQueue = Promise.resolve();
let folderStorageWriteAlertShown = false;
let authGatePreviousOverflow = null;

const mainMenuEl = document.getElementById("main-menu");
const catalogEl = document.getElementById("catalog");
const progressOverviewEl = document.getElementById("progress-overview");
const memoryStripEl = document.getElementById("memory-strip");
const insightStripEl = document.getElementById("insight-strip");
const sownListEl = document.getElementById("sown-list");
const favoriteListEl = document.getElementById("favorite-list");
const avoidListEl = document.getElementById("avoid-list");
const todayTasksEl = document.getElementById("today-tasks");
const journalSidebarEl = document.getElementById("journal-sidebar");
const customTaskListEl = document.getElementById("custom-task-list");
const journalListEl = document.getElementById("journal-list");
const detailModal = document.getElementById("detail-modal");
const detailContent = document.getElementById("detail-content");
const imageLightboxEl = document.getElementById("image-lightbox");
let activeOverlayHistoryKind = "";
let overlayHistoryNavigating = false;
let detailModalPreviousOverflow = null;
let bodyScrollLockX = 0;
let bodyScrollLockY = 0;
let skipNextBodyScrollRestore = false;
const bodyScrollLockOwners = new Set();
let mobilePreviewEnabled = (() => {
  if (embeddedMobilePreviewDeviceId) return false;
  try {
    const storedValue = localStorage.getItem(UI_MOBILE_PREVIEW_KEY);
    if (storedValue === "1") return true;
    if (storedValue === "0") return false;
  } catch (error) {
    return false;
  }
  return typeof window !== "undefined" ? window.innerWidth > 760 : false;
})();
let mobileWeatherSoundEnabled = (() => {
  try {
    return localStorage.getItem(MOBILE_WEATHER_SOUND_KEY) !== "0";
  } catch (error) {
    return true;
  }
})();
let mobileWeatherSoundVolume = 1;
try {
  localStorage.removeItem(MOBILE_WEATHER_SOUND_VOLUME_KEY);
} catch (error) {
  // Keď panel hlasitosti nie je v UI, nech v appke nezostáva stará skrytá hodnota.
}
let mobileWeatherSoundPanelOpen = false;
let mainMenuWeatherAudioDebugTimer = 0;
let mainMenuWeatherAudioDebugEventsBound = false;
let mainMenuWeatherAudioControlsBound = false;
let embeddedMobilePreviewMetricsRaf = 0;
const walkMapInstances = new WeakMap();
const desktopMobilePreviewState = new WeakMap();
const MOBILE_APP_SHELL_MAX_WIDTH = 760;

function isEmbeddedMobilePreviewMode() {
  return Boolean(embeddedMobilePreviewDeviceId);
}

function shouldShowWeatherDebugUi() {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get(MOBILE_WEATHER_DEBUG_PARAM) === "1";
  } catch (error) {
    return false;
  }
}

function getActiveMobilePreviewDeviceProfile() {
  return MOBILE_PREVIEW_DEVICES[embeddedMobilePreviewDeviceId || MOBILE_PREVIEW_DEFAULT_DEVICE_ID]
    || MOBILE_PREVIEW_DEVICES[MOBILE_PREVIEW_DEFAULT_DEVICE_ID];
}

function shouldUseDesktopMobilePreviewHost() {
  if (typeof window === "undefined") return false;
  return !isEmbeddedMobilePreviewMode()
    && Boolean(mobilePreviewEnabled)
    && window.innerWidth > MOBILE_APP_SHELL_MAX_WIDTH;
}

function shouldUseInlineMobilePreviewClass() {
  if (isEmbeddedMobilePreviewMode()) return false;
  if (!mobilePreviewEnabled) return false;
  if (typeof window === "undefined") return true;
  return window.innerWidth <= MOBILE_APP_SHELL_MAX_WIDTH;
}

function mobilePreviewViewportHeight(profile, collapsed = false) {
  const topHeight = collapsed
    ? profile.topToolbarCollapsedHeight
    : profile.topToolbarExpandedHeight;
  const bottomHeight = collapsed
    ? profile.bottomToolbarCollapsedHeight
    : profile.bottomToolbarExpandedHeight;
  return Math.max(1, profile.screenHeight - profile.statusBarHeight - topHeight - bottomHeight);
}

function buildEmbeddedMobilePreviewUrl(deviceId = MOBILE_PREVIEW_DEFAULT_DEVICE_ID) {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set(MOBILE_PREVIEW_EMBED_PARAM, "1");
  url.searchParams.set(MOBILE_PREVIEW_DEVICE_PARAM, deviceId);
  return url.toString();
}

function mobilePreviewAddressLabel() {
  if (typeof window === "undefined") return "moja-zahrada";
  try {
    const url = new URL(window.location.href);
    if (url.protocol !== "file:" && url.hostname) {
      return url.hostname;
    }
    const segments = url.pathname.split(/[\\/]/).filter(Boolean);
    const fileName = String(segments[segments.length - 1] || "").replace(/\.html?$/i, "");
    if (fileName && fileName.toLowerCase() !== "index") return fileName;
    const folderName = String(segments[segments.length - 2] || "").trim();
    return folderName || fileName || "moja-zahrada";
  } catch (error) {
    return "moja-zahrada";
  }
}

function syncDesktopMobilePreviewStageScale(stage, profile) {
  if (!stage || !profile || typeof window === "undefined") return;
  const shellWidth = profile.screenWidth + 24;
  const shellHeight = profile.screenHeight + 84;
  const availableWidth = Math.max(1, window.innerWidth - 72);
  const availableHeight = Math.max(1, window.innerHeight - 88);
  const scale = Math.min(
    1,
    availableWidth / Math.max(1, shellWidth),
    availableHeight / Math.max(1, shellHeight)
  );
  stage.style.setProperty("--mobile-preview-scale", scale.toFixed(4));
}

function syncDesktopMobilePreviewStageMetrics(stage, { collapsed, viewportHeight } = {}) {
  if (!stage) return;
  const profile = getActiveMobilePreviewDeviceProfile();
  const nextCollapsed = typeof collapsed === "boolean"
    ? collapsed
    : stage.dataset.toolbarState === "collapsed";
  const topHeight = nextCollapsed
    ? profile.topToolbarCollapsedHeight
    : profile.topToolbarExpandedHeight;
  const bottomHeight = nextCollapsed
    ? profile.bottomToolbarCollapsedHeight
    : profile.bottomToolbarExpandedHeight;
  const nextViewportHeight = Number.isFinite(Number(viewportHeight))
    ? Math.max(1, Math.round(Number(viewportHeight)))
    : mobilePreviewViewportHeight(profile, nextCollapsed);

  stage.dataset.toolbarState = nextCollapsed ? "collapsed" : "expanded";
  stage.style.setProperty("--mobile-preview-device-width", `${profile.screenWidth}px`);
  stage.style.setProperty("--mobile-preview-device-height", `${profile.screenHeight}px`);
  stage.style.setProperty("--mobile-preview-device-radius", `${profile.frameRadius}px`);
  stage.style.setProperty("--mobile-preview-status-height", `${profile.statusBarHeight}px`);
  stage.style.setProperty("--mobile-preview-topbar-height", `${topHeight}px`);
  stage.style.setProperty("--mobile-preview-bottombar-height", `${bottomHeight}px`);
  stage.style.setProperty("--mobile-preview-viewport-height", `${nextViewportHeight}px`);

  const viewportLabel = stage.querySelector("[data-mobile-preview-viewport]");
  if (viewportLabel) {
    viewportLabel.textContent = `${profile.screenWidth} × ${nextViewportHeight} px`;
  }

  const addressLabel = stage.querySelector("[data-mobile-preview-address]");
  if (addressLabel) {
    addressLabel.textContent = mobilePreviewAddressLabel();
  }

  const timeLabel = stage.querySelector("[data-mobile-preview-time]");
  if (timeLabel) {
    try {
      timeLabel.textContent = new Intl.DateTimeFormat("sk-SK", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date());
    } catch (error) {
      timeLabel.textContent = "09:41";
    }
  }

  syncDesktopMobilePreviewStageScale(stage, profile);
}

function syncDesktopMobilePreviewHost() {
  if (typeof document === "undefined" || isEmbeddedMobilePreviewMode()) return;

  const active = shouldUseDesktopMobilePreviewHost();
  let stage = document.getElementById(MOBILE_PREVIEW_HOST_ID);

  if (!active) {
    stage?.remove();
    return;
  }

  const profile = getActiveMobilePreviewDeviceProfile();
  if (!stage) {
    stage = document.createElement("section");
    stage.id = MOBILE_PREVIEW_HOST_ID;
    stage.className = "mobile-preview-stage";
    stage.innerHTML = `
      <div class="mobile-preview-stage__scrim" data-mobile-preview-close></div>
      <div class="mobile-preview-stage__layout">
        <div class="mobile-preview-stage__meta">
          <div class="mobile-preview-stage__meta-copy">
            <strong>${escapeHtml(profile.label)}</strong>
            <span data-mobile-preview-viewport>${profile.screenWidth} × ${mobilePreviewViewportHeight(profile, false)} px</span>
          </div>
          <button class="mobile-preview-stage__close" type="button" data-mobile-preview-close>Zavrieť náhľad</button>
        </div>
        <div class="mobile-preview-device" data-mobile-preview-device="${escapeAttribute(profile.id)}">
          <div class="mobile-preview-device__frame">
            <div class="mobile-preview-device__speaker" aria-hidden="true"></div>
            <div class="mobile-preview-device__screen">
              <div class="mobile-preview-device__status-bar" aria-hidden="true">
                <span data-mobile-preview-time>09:41</span>
                <div class="mobile-preview-device__status-icons">
                  <span class="mobile-preview-device__signal"></span>
                  <span class="mobile-preview-device__wifi"></span>
                  <span class="mobile-preview-device__battery"></span>
                </div>
              </div>
              <div class="mobile-preview-device__toolbar mobile-preview-device__toolbar--top" aria-hidden="true">
                <div class="mobile-preview-device__browser-leading">
                  <span class="mobile-preview-device__browser-home"></span>
                  <span class="mobile-preview-device__browser-switch"></span>
                </div>
                <div class="mobile-preview-device__address-pill">
                  <span class="mobile-preview-device__address-icon"></span>
                  <span data-mobile-preview-address>moja-zahrada</span>
                </div>
                <div class="mobile-preview-device__toolbar-actions">
                  <span class="mobile-preview-device__tabs-pill">36</span>
                  <span class="mobile-preview-device__menu-dots"></span>
                </div>
              </div>
              <div class="mobile-preview-device__viewport">
                <iframe
                  class="mobile-preview-device__iframe"
                  title="Galaxy A54 5G mobilný preview"
                  loading="eager"
                  allow="clipboard-read; clipboard-write"
                ></iframe>
              </div>
              <div class="mobile-preview-device__toolbar mobile-preview-device__toolbar--bottom" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <aside class="mobile-preview-stage__tools" data-mobile-preview-tools></aside>
      </div>
    `;
    document.body.appendChild(stage);
  }

  if (stage.dataset.bound !== "true") {
    stage.dataset.bound = "true";
    stage.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("[data-mobile-preview-close]")) return;
      event.preventDefault();
      setMobilePreviewEnabled(false);
    });
    stage.addEventListener("click", handleDesktopMobilePreviewHostClick);
    stage.addEventListener("input", handleDesktopMobilePreviewHostInput);
    stage.addEventListener("change", handleDesktopMobilePreviewHostChange);
  }

  const frame = stage.querySelector(".mobile-preview-device__iframe");
  const nextSrc = buildEmbeddedMobilePreviewUrl(profile.id);
  if (frame && stage.dataset.frameBound !== "true") {
    stage.dataset.frameBound = "true";
    frame.addEventListener("load", () => {
      syncDesktopMobilePreviewStageMetrics(stage);
      syncDesktopMobilePreviewHostTools(stage);
    });
  }
  if (frame && frame.getAttribute("src") !== nextSrc) {
    frame.setAttribute("src", nextSrc);
  }

  syncDesktopMobilePreviewStageMetrics(stage);
  syncDesktopMobilePreviewHostTools(stage);
}

function handleDesktopMobilePreviewMessage(event) {
  const data = event?.data;
  if (!data || data.type !== MOBILE_PREVIEW_MESSAGE_TYPE) return;

  const stage = document.getElementById(MOBILE_PREVIEW_HOST_ID);
  if (!stage) return;

  const frame = stage.querySelector(".mobile-preview-device__iframe");
  if (frame?.contentWindow && frame.contentWindow !== event.source) return;

  if (data.previewState && typeof data.previewState === "object") {
    setDesktopMobilePreviewState(stage, data.previewState);
  }

  syncDesktopMobilePreviewStageMetrics(stage, {
    collapsed: false,
    viewportHeight: Number(data.innerHeight || 0) || undefined
  });
  syncDesktopMobilePreviewHostTools(stage);
}

function scheduleEmbeddedMobilePreviewMetricsPush() {
  if (!isEmbeddedMobilePreviewMode() || typeof window === "undefined" || window.parent === window) return;
  if (embeddedMobilePreviewMetricsRaf) return;

  embeddedMobilePreviewMetricsRaf = window.requestAnimationFrame(() => {
    embeddedMobilePreviewMetricsRaf = 0;
    const scrollTop = Math.max(
      Number(window.scrollY) || 0,
      Number(document.documentElement?.scrollTop) || 0,
      Number(document.scrollingElement?.scrollTop) || 0
    );
    const weatherBackgroundDebugState = window.weatherBackgroundEngine?.getDebugState
      ? window.weatherBackgroundEngine.getDebugState()
      : null;
    const weatherBackgroundDebugText = formatWeatherBackgroundDebugText(weatherBackgroundDebugState);
    const soundscapeConfig = window.weatherAudioConfig?.soundscapeConfig || {};
    const audioState = window.weatherAudioEngine?.getState
      ? window.weatherAudioEngine.getState()
      : null;
    const audioDebugState = collectWeatherAudioDebugState(audioState, soundscapeConfig);
    window.parent.postMessage({
      type: MOBILE_PREVIEW_MESSAGE_TYPE,
      deviceId: embeddedMobilePreviewDeviceId,
      scrollTop,
      innerWidth: Math.max(1, Math.round(window.innerWidth || document.documentElement?.clientWidth || 1)),
      innerHeight: Math.max(1, Math.round(window.innerHeight || document.documentElement?.clientHeight || 1)),
      previewState: {
        ready: true,
        weatherBackgroundDebugText,
        audioDebugState
      }
    }, "*");
  });
}

function handleEmbeddedMobilePreviewCommand(event) {
  if (!isEmbeddedMobilePreviewMode()) return;
  const data = event?.data;
  if (!data || data.type !== MOBILE_PREVIEW_COMMAND_TYPE) return;

  const command = String(data.command || "").trim();
  const payload = data.payload && typeof data.payload === "object" ? data.payload : {};

  if (command === "sync-weather") {
    applyMobileWeatherTheme();
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  if (command === "sync-weather-and-scene") {
    applyMobileWeatherTheme();
    applyMobileWeatherSceneMode();
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  if (command === "set-weather-precip") {
    saveMobileWeatherThemePrecipOverride(payload.value);
    applyMobileWeatherTheme();
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  if (command === "set-weather-wind") {
    saveMobileWeatherThemeWindOverride(payload.value);
    applyMobileWeatherTheme();
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  if (command === "set-weather-temp") {
    saveMobileWeatherThemeTemperatureOverride(payload.value);
    applyMobileWeatherTheme();
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  if (command === "set-audio-enabled") {
    window.weatherAudioEngine?.handleUserActivation?.();
    setMobileWeatherSoundEnabled(Boolean(payload.enabled));
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  if (command === "set-audio-volume") {
    window.weatherAudioEngine?.handleUserActivation?.();
    setMobileWeatherSoundVolume(payload.value);
    scheduleEmbeddedMobilePreviewMetricsPush();
  }
}

function readStoredMobileWeatherSoundState() {
  let enabled = mobileWeatherSoundEnabled;
  let volume = mobileWeatherSoundVolume;
  try {
    enabled = localStorage.getItem(MOBILE_WEATHER_SOUND_KEY) !== "0";
  } catch (error) {
    enabled = mobileWeatherSoundEnabled;
  }
  try {
    const raw = Number(localStorage.getItem(MOBILE_WEATHER_SOUND_VOLUME_KEY));
    if (Number.isFinite(raw)) {
      volume = Math.max(0, Math.min(1, raw));
    }
  } catch (error) {
    volume = mobileWeatherSoundVolume;
  }
  return { enabled, volume };
}

function getDesktopMobilePreviewState(stage = null) {
  if (!stage) return null;
  return desktopMobilePreviewState.get(stage) || null;
}

function setDesktopMobilePreviewState(stage = null, nextState = null) {
  if (!stage || !nextState || typeof nextState !== "object") return getDesktopMobilePreviewState(stage);
  const previous = getDesktopMobilePreviewState(stage) || {};
  const merged = { ...previous, ...nextState };
  desktopMobilePreviewState.set(stage, merged);
  return merged;
}

function getDesktopMobilePreviewFrame(stage = null) {
  if (typeof document === "undefined") return null;
  const resolvedStage = stage || document.getElementById(MOBILE_PREVIEW_HOST_ID);
  return resolvedStage?.querySelector(".mobile-preview-device__iframe") || null;
}

function getDesktopMobilePreviewFrameWindow(stage = null) {
  const frame = getDesktopMobilePreviewFrame(stage);
  if (!frame?.contentWindow) return null;
  try {
    void frame.contentWindow.location?.href;
    return frame.contentWindow;
  } catch (error) {
    return null;
  }
}

function scheduleDesktopMobilePreviewToolsRefresh(stage) {
  if (!stage || typeof window === "undefined") return;
  window.setTimeout(() => {
    if (!stage.isConnected) return;
    syncDesktopMobilePreviewHostTools(stage);
  }, 72);
}

function postDesktopMobilePreviewCommand(stage = null, command = "", payload = {}) {
  const frame = getDesktopMobilePreviewFrame(stage);
  if (!frame?.contentWindow) return false;
  try {
    frame.contentWindow.postMessage({
      type: MOBILE_PREVIEW_COMMAND_TYPE,
      command: String(command || "").trim(),
      payload: payload && typeof payload === "object" ? payload : {}
    }, "*");
    return true;
  } catch (error) {
    return false;
  }
}

function syncDesktopMobilePreviewEmbeddedWeather(stage, { syncScene = false } = {}) {
  const previewWindow = getDesktopMobilePreviewFrameWindow(stage);
  if (previewWindow) {
    previewWindow.applyMobileWeatherTheme?.();
    if (syncScene) {
      previewWindow.applyMobileWeatherSceneMode?.();
    }
    previewWindow.scheduleEmbeddedMobilePreviewMetricsPush?.();
    return true;
  }
  return postDesktopMobilePreviewCommand(stage, syncScene ? "sync-weather-and-scene" : "sync-weather");
}

function renderDesktopMobilePreviewHostToolsMarkup(stage) {
  const previewState = getDesktopMobilePreviewState(stage);
  const previewReady = Boolean(previewState?.ready);
  const activeWeatherThemeDebug = loadMobileWeatherThemeDebugOverride();
  const activeWeatherThemeDebugId = activeWeatherThemeDebug?.id || "auto";
  const activeWeatherThemeCloudOverride = loadMobileWeatherThemeCloudOverride();
  const activeWeatherThemePhase = loadMobileWeatherThemePhaseOverride();
  const activeWeatherThemeSeason = loadMobileWeatherThemeSeasonOverride();
  const activeWeatherThemeWindOverride = loadMobileWeatherThemeWindOverride();
  const activeWeatherThemePrecipOverride = loadMobileWeatherThemePrecipOverride();
  const activeWeatherThemeTemperatureOverride = loadMobileWeatherThemeTemperatureOverride();
  const weatherSceneOnlyActive = loadMobileWeatherSceneOnlyPreference();
  const effectiveWeatherWindSpeed = activeWeatherThemeWindOverride === null
    ? (homeWeatherSnapshot
      ? weatherWindSpeedKmh(homeWeatherSnapshot)
      : weatherWindSpeedFallbackForCategory(activeWeatherThemeDebug?.wind || "calm"))
    : activeWeatherThemeWindOverride;
  const effectiveWeatherPrecipitationAmount = activeWeatherThemePrecipOverride === null
    ? (homeWeatherSnapshot ? weatherPrecipitationMm(homeWeatherSnapshot) : 0)
    : activeWeatherThemePrecipOverride;
  const effectiveWeatherTemperature = activeWeatherThemeTemperatureOverride === null
    ? (homeWeatherSnapshot ? (weatherTemperatureC(homeWeatherSnapshot) ?? 16) : 16)
    : activeWeatherThemeTemperatureOverride;
  const weatherWindDebugLabel = activeWeatherThemeWindOverride === null
    ? `Auto · ${Math.round(effectiveWeatherWindSpeed)} km/h · ${mobileWeatherWindLabel(effectiveWeatherWindSpeed)}`
    : `${Math.round(effectiveWeatherWindSpeed)} km/h · ${mobileWeatherWindLabel(effectiveWeatherWindSpeed)}`;
  const weatherPrecipitationDebugLabel = activeWeatherThemePrecipOverride === null
    ? `Auto · ${effectiveWeatherPrecipitationAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(effectiveWeatherPrecipitationAmount)}`
    : `${effectiveWeatherPrecipitationAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(effectiveWeatherPrecipitationAmount)}`;
  const weatherTemperatureDebugLabel = activeWeatherThemeTemperatureOverride === null
    ? `Auto · ${Math.round(effectiveWeatherTemperature)} °C · ${mobileWeatherTemperatureBandLabel(effectiveWeatherTemperature)}`
    : `${Math.round(effectiveWeatherTemperature)} °C · ${mobileWeatherTemperatureBandLabel(effectiveWeatherTemperature)}`;
  const weatherBackgroundDebugText = previewState?.weatherBackgroundDebugText || "náhľad sa ešte načítava";
  const { enabled: storedSoundEnabled, volume: storedSoundVolume } = readStoredMobileWeatherSoundState();
  const audioDebugState = previewState?.audioDebugState || collectWeatherAudioDebugState({
    enabled: storedSoundEnabled,
    currentState: { masterVolume: storedSoundVolume }
  }, {});
  const audioVolume = Number.isFinite(Number(audioDebugState.currentState?.masterVolume))
    ? Math.max(0, Math.min(1, Number(audioDebugState.currentState.masterVolume)))
    : storedSoundVolume;
  const audioEnabled = audioDebugState.enabled && storedSoundEnabled;
  const audioStatus = !previewReady
    ? "Náhľad sa ešte načítava."
    : audioDebugState.supported === false
      ? "Zvuk nie je podporovaný."
      : !audioEnabled
        ? "Zvuk je vypnutý."
        : audioDebugState.running
          ? "Zvuk hrá podľa aktuálneho počasia."
          : audioDebugState.activated
            ? "Zvuk je pripravený."
            : "Ťukni na zapnutie zvuku.";
  const weatherPanelOpen = activeWeatherThemeDebugId !== "auto"
    || activeWeatherThemeCloudOverride !== ""
    || activeWeatherThemePhase !== ""
    || activeWeatherThemeSeason !== ""
    || activeWeatherThemeWindOverride !== null
    || activeWeatherThemePrecipOverride !== null
    || activeWeatherThemeTemperatureOverride !== null
    || weatherSceneOnlyActive;
  const audioPanelOpen = audioEnabled || audioVolume < 0.999 || Boolean(audioDebugState.activated);

  return `
    <div class="mobile-preview-tools">
      <details class="mobile-preview-tools__card"${weatherPanelOpen ? " open" : ""}>
        <summary class="mobile-preview-tools__summary">Test počasia</summary>
        <div class="mobile-preview-tools__body">
          <button
            class="mobile-preview-tools__toggle ${weatherSceneOnlyActive ? "is-active" : ""}"
            type="button"
            data-mobile-weather-scene-toggle="1"
            aria-pressed="${weatherSceneOnlyActive ? "true" : "false"}"
          >${weatherSceneOnlyActive ? "Čisté pozadie je zapnuté" : "Čisté pozadie"}</button>
          <p class="mobile-preview-tools__note">${weatherSceneOnlyActive ? "Karty v náhľade sú skryté, aby bolo vidno celé pozadie." : "Skryje obsah v náhľade a nechá iba čisté pozadie."}</p>

          <div class="mobile-preview-tools__label">Fáza dňa</div>
          <div class="mobile-preview-tools__chips">
            ${MOBILE_WEATHER_PHASE_DEBUG_OPTIONS.map((item) => `
              <button
                class="mobile-preview-tools__chip ${item.id === activeWeatherThemePhase ? "is-active" : ""}"
                type="button"
                data-mobile-weather-phase="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>

          <div class="mobile-preview-tools__label">Sezóna</div>
          <div class="mobile-preview-tools__chips">
            ${MOBILE_WEATHER_SEASON_DEBUG_OPTIONS.map((item) => `
              <button
                class="mobile-preview-tools__chip ${item.id === activeWeatherThemeSeason ? "is-active" : ""}"
                type="button"
                data-mobile-weather-season="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>

          <div class="mobile-preview-tools__label">Oblačnosť</div>
          <div class="mobile-preview-tools__chips">
            ${MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS.map((item) => `
              <button
                class="mobile-preview-tools__chip ${item.id === activeWeatherThemeCloudOverride ? "is-active" : ""}"
                type="button"
                data-mobile-weather-cloud="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>

          <div class="mobile-preview-tools__label">Javy</div>
          <div class="mobile-preview-tools__chips">
            ${MOBILE_WEATHER_THEME_DEBUG_OPTIONS.map((item) => `
              <button
                class="mobile-preview-tools__chip ${item.id === activeWeatherThemeDebugId ? "is-active" : ""}"
                type="button"
                data-mobile-weather-debug="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>

          <div class="mobile-preview-tools__range-block">
            <div class="mobile-preview-tools__range-head">
              <span>Zrážky</span>
              <span data-mobile-preview-precip-label>${escapeHtml(weatherPrecipitationDebugLabel)}</span>
            </div>
            <div class="mobile-preview-tools__range-actions">
              <button
                class="mobile-preview-tools__chip ${activeWeatherThemePrecipOverride === null ? "is-active" : ""}"
                type="button"
                data-mobile-weather-precip-auto="1"
              >Auto</button>
              <input
                class="mobile-preview-tools__range"
                type="range"
                min="0"
                max="12"
                step="0.2"
                value="${escapeAttribute(effectiveWeatherPrecipitationAmount.toFixed(1))}"
                data-mobile-weather-precip-range
                aria-label="Intenzita zrážok v milimetroch"
              >
            </div>
          </div>

          <div class="mobile-preview-tools__range-block">
            <div class="mobile-preview-tools__range-head">
              <span>Vietor</span>
              <span data-mobile-preview-wind-label>${escapeHtml(weatherWindDebugLabel)}</span>
            </div>
            <div class="mobile-preview-tools__range-actions">
              <button
                class="mobile-preview-tools__chip ${activeWeatherThemeWindOverride === null ? "is-active" : ""}"
                type="button"
                data-mobile-weather-wind-auto="1"
              >Auto</button>
              <input
                class="mobile-preview-tools__range"
                type="range"
                min="0"
                max="70"
                step="2"
                value="${escapeAttribute(String(Math.round(effectiveWeatherWindSpeed)))}"
                data-mobile-weather-wind-range
                aria-label="Sila vetra v kilometroch za hodinu"
              >
            </div>
          </div>

          <div class="mobile-preview-tools__range-block">
            <div class="mobile-preview-tools__range-head">
              <span>Teplota</span>
              <span data-mobile-preview-temp-label>${escapeHtml(weatherTemperatureDebugLabel)}</span>
            </div>
            <div class="mobile-preview-tools__range-actions">
              <button
                class="mobile-preview-tools__chip ${activeWeatherThemeTemperatureOverride === null ? "is-active" : ""}"
                type="button"
                data-mobile-weather-temp-auto="1"
              >Auto</button>
              <input
                class="mobile-preview-tools__range"
                type="range"
                min="-15"
                max="38"
                step="1"
                value="${escapeAttribute(String(Math.round(effectiveWeatherTemperature)))}"
                data-mobile-weather-temp-range
                aria-label="Teplota v stupňoch Celzia"
              >
            </div>
          </div>

          <p class="mobile-preview-tools__status">Debug: ${escapeHtml(weatherBackgroundDebugText)}</p>
        </div>
      </details>

      <details class="mobile-preview-tools__card"${audioPanelOpen ? " open" : ""}>
        <summary class="mobile-preview-tools__summary">Zvuky počasia</summary>
        <div class="mobile-preview-tools__body">
          <button
            class="mobile-preview-tools__toggle ${audioEnabled ? "is-active" : ""}"
            type="button"
            data-mobile-preview-audio-toggle="1"
            aria-pressed="${audioEnabled ? "true" : "false"}"
          >${audioEnabled ? "Zvuk je zapnutý" : "Zapnúť zvuk"}</button>
          <p class="mobile-preview-tools__note">${escapeHtml(audioStatus)}</p>
          <div class="mobile-preview-tools__range-block">
            <div class="mobile-preview-tools__range-head">
              <span>Hlasitosť</span>
              <span data-mobile-preview-audio-label>${escapeHtml(`${Math.round(audioVolume * 100)} %`)}</span>
            </div>
            <input
              class="mobile-preview-tools__range"
              type="range"
              min="0"
              max="100"
              step="1"
              value="${escapeAttribute(String(Math.round(audioVolume * 100)))}"
              data-mobile-preview-audio-volume-range
              aria-label="Hlasitosť zvukov počasia"
            >
          </div>
          <div class="mobile-preview-tools__sound-block ${audioDebugState.timeLayerKeys.length ? "is-live" : ""}">
            <div class="mobile-preview-tools__label">Loop času</div>
            <div class="mobile-preview-tools__sound-chips">${renderWeatherAudioDebugChipList(audioDebugState.timeLayerKeys, "nič", {
              activeItems: audioDebugState.timeLayerKeys
            })}</div>
          </div>
          <div class="mobile-preview-tools__sound-block ${audioDebugState.weatherLayerKeys.length ? "is-live" : ""}">
            <div class="mobile-preview-tools__label">Počasie</div>
            <div class="mobile-preview-tools__sound-chips">${renderWeatherAudioDebugChipList(audioDebugState.weatherLayerKeys, "nič", {
              activeItems: audioDebugState.weatherLayerKeys
            })}</div>
          </div>
          <div class="mobile-preview-tools__sound-block ${audioDebugState.textureLayerKeys.length ? "is-live" : ""}">
            <div class="mobile-preview-tools__label">Textúry</div>
            <div class="mobile-preview-tools__sound-chips">${renderWeatherAudioDebugChipList(audioDebugState.textureLayerKeys, "nič", {
              activeItems: audioDebugState.textureLayerKeys
            })}</div>
          </div>
          <div class="mobile-preview-tools__sound-block ${audioDebugState.playingDetailKeys.length ? "is-live" : audioDebugState.allowedDetailKeys.length ? "is-ready" : ""}">
            <div class="mobile-preview-tools__label">Všetky detaily</div>
            <div class="mobile-preview-tools__sound-chips">${renderWeatherAudioDebugChipList(audioDebugState.allDetailKeys, "nič", {
              activeItems: audioDebugState.allowedDetailKeys,
              mutedItems: audioDebugState.blockedDetailKeys,
              playingItems: audioDebugState.playingDetailKeys
            })}</div>
          </div>
          <div class="mobile-preview-tools__sound-block ${audioDebugState.playingDetailKeys.length ? "is-live" : ""}">
            <div class="mobile-preview-tools__label">Práve hrá</div>
            <div class="mobile-preview-tools__sound-chips">${renderWeatherAudioDebugChipList(audioDebugState.playingDetailKeys, "zatiaľ nič", {
              playingItems: audioDebugState.playingDetailKeys,
              playing: true
            })}</div>
          </div>
          ${audioDebugState.mutedReasons.length ? `<p class="mobile-preview-tools__status">${escapeHtml(audioDebugState.mutedReasons.join(" "))}</p>` : ""}
        </div>
      </details>
    </div>
  `;
}

function syncDesktopMobilePreviewHostTools(stage) {
  const tools = stage?.querySelector("[data-mobile-preview-tools]");
  if (!tools) return;
  const shouldShow = shouldShowWeatherDebugUi();
  tools.hidden = !shouldShow;
  if (!shouldShow) {
    tools.innerHTML = "";
    return;
  }
  tools.innerHTML = renderDesktopMobilePreviewHostToolsMarkup(stage);
}

function handleDesktopMobilePreviewHostClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const stage = target.closest(".mobile-preview-stage");
  const toolsRoot = target.closest("[data-mobile-preview-tools]");
  if (!stage || !toolsRoot) return;

  const button = target.closest("button");
  if (!(button instanceof HTMLButtonElement)) return;

  if (button.matches("[data-mobile-weather-debug]")) {
    event.preventDefault();
    saveMobileWeatherThemeDebugOverride(String(button.getAttribute("data-mobile-weather-debug") || "auto").trim() || "auto");
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-cloud]")) {
    event.preventDefault();
    saveMobileWeatherThemeCloudOverride(String(button.getAttribute("data-mobile-weather-cloud") || "").trim());
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-phase]")) {
    event.preventDefault();
    saveMobileWeatherThemePhaseOverride(String(button.getAttribute("data-mobile-weather-phase") || "").trim());
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-season]")) {
    event.preventDefault();
    saveMobileWeatherThemeSeasonOverride(String(button.getAttribute("data-mobile-weather-season") || "").trim());
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-precip-auto]")) {
    event.preventDefault();
    saveMobileWeatherThemePrecipOverride(null);
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-wind-auto]")) {
    event.preventDefault();
    saveMobileWeatherThemeWindOverride(null);
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-temp-auto]")) {
    event.preventDefault();
    saveMobileWeatherThemeTemperatureOverride(null);
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-weather-scene-toggle]")) {
    event.preventDefault();
    saveMobileWeatherSceneOnlyPreference(!loadMobileWeatherSceneOnlyPreference());
    syncDesktopMobilePreviewEmbeddedWeather(stage, { syncScene: true });
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
    return;
  }

  if (button.matches("[data-mobile-preview-audio-toggle]")) {
    event.preventDefault();
    const previewWindow = getDesktopMobilePreviewFrameWindow(stage);
    const { enabled } = readStoredMobileWeatherSoundState();
    if (previewWindow?.weatherAudioEngine?.handleUserActivation) {
      previewWindow.weatherAudioEngine.handleUserActivation();
    }
    if (typeof previewWindow?.setMobileWeatherSoundEnabled === "function") {
      previewWindow.setMobileWeatherSoundEnabled(!enabled);
    } else {
      try {
        localStorage.setItem(MOBILE_WEATHER_SOUND_KEY, !enabled ? "1" : "0");
      } catch (error) {
        // Keď je iframe ešte v nábehu, host si aspoň zapamätá posledné želanie.
      }
      postDesktopMobilePreviewCommand(stage, "set-audio-enabled", { enabled: !enabled });
    }
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
  }
}

function handleDesktopMobilePreviewHostInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  const stage = target.closest(".mobile-preview-stage");
  const toolsRoot = target.closest("[data-mobile-preview-tools]");
  if (!stage || !toolsRoot) return;

  if (target.matches("[data-mobile-weather-precip-range]")) {
    const nextAmount = Math.max(0, Math.min(12, Math.round((Number(target.value) || 0) * 10) / 10));
    saveMobileWeatherThemePrecipOverride(nextAmount);
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    postDesktopMobilePreviewCommand(stage, "set-weather-precip", { value: nextAmount });
    const label = toolsRoot.querySelector("[data-mobile-preview-precip-label]");
    if (label) {
      label.textContent = `${nextAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(nextAmount)}`;
    }
    return;
  }

  if (target.matches("[data-mobile-weather-wind-range]")) {
    const nextSpeed = Math.max(0, Math.min(70, Math.round(Number(target.value) || 0)));
    saveMobileWeatherThemeWindOverride(nextSpeed);
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    postDesktopMobilePreviewCommand(stage, "set-weather-wind", { value: nextSpeed });
    const label = toolsRoot.querySelector("[data-mobile-preview-wind-label]");
    if (label) {
      label.textContent = `${nextSpeed} km/h · ${mobileWeatherWindLabel(nextSpeed)}`;
    }
    return;
  }

  if (target.matches("[data-mobile-weather-temp-range]")) {
    const nextTemp = Math.max(-15, Math.min(38, Math.round(Number(target.value) || 0)));
    saveMobileWeatherThemeTemperatureOverride(nextTemp);
    syncDesktopMobilePreviewEmbeddedWeather(stage);
    postDesktopMobilePreviewCommand(stage, "set-weather-temp", { value: nextTemp });
    const label = toolsRoot.querySelector("[data-mobile-preview-temp-label]");
    if (label) {
      label.textContent = `${nextTemp} °C · ${mobileWeatherTemperatureBandLabel(nextTemp)}`;
    }
    return;
  }

  if (target.matches("[data-mobile-preview-audio-volume-range]")) {
    const nextPercent = Math.max(0, Math.min(100, Math.round(Number(target.value) || 0)));
    const previewWindow = getDesktopMobilePreviewFrameWindow(stage);
    if (previewWindow?.weatherAudioEngine?.handleUserActivation) {
      previewWindow.weatherAudioEngine.handleUserActivation();
    }
    if (typeof previewWindow?.setMobileWeatherSoundVolume === "function") {
      previewWindow.setMobileWeatherSoundVolume(nextPercent / 100);
    } else {
      try {
        localStorage.setItem(MOBILE_WEATHER_SOUND_VOLUME_KEY, String(nextPercent / 100));
      } catch (error) {
        // Host si odloží hlasitosť aj keď iframe ešte nie je pripravený.
      }
      postDesktopMobilePreviewCommand(stage, "set-audio-volume", { value: nextPercent / 100 });
    }
    const label = toolsRoot.querySelector("[data-mobile-preview-audio-label]");
    if (label) {
      label.textContent = `${nextPercent} %`;
    }
  }
}

function handleDesktopMobilePreviewHostChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  const stage = target.closest(".mobile-preview-stage");
  const toolsRoot = target.closest("[data-mobile-preview-tools]");
  if (!stage || !toolsRoot) return;
  if (
    target.matches("[data-mobile-weather-precip-range]")
    || target.matches("[data-mobile-weather-wind-range]")
    || target.matches("[data-mobile-weather-temp-range]")
    || target.matches("[data-mobile-preview-audio-volume-range]")
  ) {
    syncDesktopMobilePreviewHostTools(stage);
    scheduleDesktopMobilePreviewToolsRefresh(stage);
  }
}

function normalizeMobileWeatherCloudDebugId(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "partly-cloudy") return "cloudy";
  return normalized;
}

const MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS = [
  { id: "", label: "Auto", tone: "", variant: "" },
  { id: "clear", label: "Jasno", tone: "sun", variant: "clear" },
  { id: "mostly-clear", label: "Polojasno", tone: "sun", variant: "mostly-clear" },
  { id: "cloudy", label: "Oblačno", tone: "cloud", variant: "cloudy" },
  { id: "overcast", label: "Zamračené", tone: "cloud", variant: "overcast" }
];

const MOBILE_WEATHER_THEME_DEBUG_OPTIONS = [
  { id: "auto", label: "Auto", tone: "", variant: "", period: "", wind: "" },
  { id: "none", label: "Bez javu", tone: "soft", variant: "", period: "", wind: "calm" },
  { id: "fog", label: "Hmla", tone: "mist", variant: "fog", period: "", wind: "calm" },
  { id: "rain", label: "Dážď", tone: "rain", variant: "rain", period: "", wind: "windy" },
  { id: "sleet", label: "Dážď so snehom", tone: "snow", variant: "sleet", period: "", wind: "breeze" },
  { id: "hail", label: "Krúpy", tone: "storm", variant: "hail", period: "", wind: "fresh" },
  { id: "snow", label: "Sneženie", tone: "snow", variant: "snow", period: "", wind: "calm" },
  { id: "storm", label: "Búrka", tone: "storm", variant: "storm", period: "", wind: "gust" }
];

const MOBILE_WEATHER_PHASE_DEBUG_OPTIONS = [
  { id: "", label: "Auto" },
  { id: "dawn", label: "Svitanie" },
  { id: "day", label: "Deň" },
  { id: "sunset", label: "Západ" },
  { id: "night", label: "Noc" }
];

const MOBILE_WEATHER_MOON_DEBUG_OPTIONS = [
  { id: "", label: "Auto" },
  { id: "new", label: "Nov" },
  { id: "crescent", label: "Srpek" },
  { id: "quarter", label: "Štvrť" },
  { id: "gibbous", label: "Gibózna" },
  { id: "full", label: "Pln" }
];
const MOBILE_WEATHER_FIXED_MOON_PHASE = "full";

const MOBILE_WEATHER_SEASON_DEBUG_OPTIONS = [
  { id: "", label: "Auto" },
  { id: "spring", label: "Jar" },
  { id: "summer", label: "Leto" },
  { id: "autumn", label: "Jeseň" },
  { id: "winter", label: "Zima" }
];

function isCompactAppShellViewport() {
  if (typeof window === "undefined") return Boolean(mobilePreviewEnabled) || isEmbeddedMobilePreviewMode();
  return isEmbeddedMobilePreviewMode() || window.innerWidth <= MOBILE_APP_SHELL_MAX_WIDTH;
}

function syncResponsiveAppShellClass() {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("app-mobile-shell", isCompactAppShellViewport());
  document.body.classList.toggle("app-mobile-preview-embedded", isEmbeddedMobilePreviewMode());
  document.documentElement.classList.toggle("app-mobile-preview-embedded-root", isEmbeddedMobilePreviewMode());
  syncToolbarAddMenuOverlayState();
  syncResponsiveToolbarButtonPlacement();
  syncMobileBottomNavPlacement();
  syncMobileWeatherMiniPlacement();
  applyMobileWeatherTheme();
  applyMobileWeatherSceneMode();
  syncMobileToolbarScrollState();
  syncDesktopMobilePreviewHost();
  scheduleEmbeddedMobilePreviewMetricsPush();
}

function syncMobileToolbarScrollState() {
  if (!utilityBarEl || typeof document === "undefined" || typeof window === "undefined") return;
  const isMobileShell = document.body.classList.contains("app-mobile-shell");
  if (isMobileShell) {
    utilityBarEl.classList.remove("is-collapsed");
    return;
  }
  utilityBarEl.classList.remove("is-collapsed");
}

function syncMobilePreviewClass() {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("app-mobile-preview", shouldUseInlineMobilePreviewClass());
  document.body.classList.toggle("app-mobile-preview-host", shouldUseDesktopMobilePreviewHost());
  syncResponsiveAppShellClass();
  const button = document.getElementById("toggle-mobile-preview");
  if (button) {
    const nextLabel = mobilePreviewEnabled ? "Desktop náhľad" : "Mobilný náhľad";
    button.textContent = nextLabel;
    button.setAttribute("aria-pressed", mobilePreviewEnabled ? "true" : "false");
    button.setAttribute("aria-label", nextLabel);
    button.setAttribute("title", nextLabel);
    button.dataset.previewTarget = mobilePreviewEnabled ? "desktop" : "mobile";
    button.hidden = isEmbeddedMobilePreviewMode();
  }
  syncMobileWeatherSoundButton();
}

function setMobilePreviewEnabled(enabled) {
  mobilePreviewEnabled = Boolean(enabled);
  try {
    localStorage.setItem(UI_MOBILE_PREVIEW_KEY, mobilePreviewEnabled ? "1" : "0");
  } catch (error) {
    console.warn("Mobilný náhľad sa nepodarilo uložiť.", error);
  }
  syncMobilePreviewClass();
  render();
  syncMobileToolbarScrollState();
}

function lockBodyScroll(owner = "") {
  if (typeof document === "undefined") return;
  const normalizedOwner = String(owner || "").trim();
  if (normalizedOwner && bodyScrollLockOwners.has(normalizedOwner)) return;

  if (!bodyScrollLockOwners.size) {
    bodyScrollLockX = Math.max(window.scrollX || 0, document.documentElement?.scrollLeft || 0, 0);
    bodyScrollLockY = Math.max(window.scrollY || 0, document.documentElement?.scrollTop || 0, 0);
    detailModalPreviousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${bodyScrollLockY}px`;
    document.body.style.left = `-${bodyScrollLockX}px`;
    document.body.style.right = "";
    document.body.style.width = "100%";
    document.body.classList.add("app-detail-locked");
  }

  if (normalizedOwner) {
    bodyScrollLockOwners.add(normalizedOwner);
  }
}

function unlockBodyScroll(owner = "") {
  if (typeof document === "undefined") return;
  const normalizedOwner = String(owner || "").trim();
  if (normalizedOwner) {
    if (!bodyScrollLockOwners.has(normalizedOwner)) return;
    bodyScrollLockOwners.delete(normalizedOwner);
  } else {
    bodyScrollLockOwners.clear();
  }

  if (bodyScrollLockOwners.size) return;

  const shouldRestoreScroll = !skipNextBodyScrollRestore;
  skipNextBodyScrollRestore = false;
  document.body.style.overflow = detailModalPreviousOverflow ?? "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.classList.remove("app-detail-locked");
  if (shouldRestoreScroll) {
    window.scrollTo(bodyScrollLockX, bodyScrollLockY);
  }
  detailModalPreviousOverflow = null;
  bodyScrollLockX = 0;
  bodyScrollLockY = 0;
}

function lockDetailBodyScroll() {
  lockBodyScroll("detail");
}

function unlockDetailBodyScroll() {
  unlockBodyScroll("detail");
}

function reconcileBodyScrollState() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const hasDetailOverlay = Boolean(detailModal?.open);
  const hasJournalOverlay = Boolean(journalOverlayRoot());
  const hasLightboxOverlay = Boolean(imageLightboxEl?.open);
  const hasAuthOverlay = Boolean(authGateRoot());
  if (hasDetailOverlay || hasJournalOverlay || hasLightboxOverlay || hasAuthOverlay) return;

  const body = document.body;
  const hasInlineLock =
    body.classList.contains("app-detail-locked")
    || body.style.position === "fixed"
    || body.style.overflow === "hidden"
    || Boolean(body.style.top)
    || Boolean(body.style.left)
    || Boolean(body.style.width);

  if (!bodyScrollLockOwners.size && !hasInlineLock) return;
  unlockBodyScroll();
}

function syncMainMenuTouchScrollState() {
  if (typeof document === "undefined") return;
  const body = document.body;
  const isMainMenuMode = body.classList.contains("app-main-menu-mode");
  const isFocusedMode = body.classList.contains("app-focused-mode");
  const hasBlockingOverlay = Boolean(
    detailModal?.open
    || journalOverlayRoot()
    || imageLightboxEl?.open
    || authGateRoot()
  );
  body.classList.toggle("app-main-menu-scroll-safe", isMainMenuMode && !hasBlockingOverlay);
  body.classList.toggle("app-focused-scroll-safe", isFocusedMode && !hasBlockingOverlay);
}

function scheduleWalkMapResize(map) {
  if (!map) return;
  requestAnimationFrame(() => map.invalidateSize());
  window.setTimeout(() => map.invalidateSize(), 220);
}

function walkMapPointsFromElement(mapEl) {
  if (!mapEl) return [];
  const rawPoints = String(mapEl.getAttribute("data-walk-map-points") || "").trim();
  if (!rawPoints) return [];
  let points = [];
  try {
    points = JSON.parse(rawPoints);
  } catch (error) {
    points = [];
  }
  return Array.isArray(points)
    ? points.filter((point) => Number.isFinite(Number(point?.latitude)) && Number.isFinite(Number(point?.longitude)))
    : [];
}

function walkMapPhotoMarkerPoints(points = [], photoCount = 0) {
  const normalizedPoints = Array.isArray(points) ? points.filter(Boolean) : [];
  const totalPoints = normalizedPoints.length;
  const totalPhotos = Math.max(0, Number(photoCount) || 0);
  if (totalPoints < 1 || totalPhotos < 1) return [];

  const markerIndexes = new Set();
  if (totalPhotos === 1) {
    markerIndexes.add(Math.max(0, Math.floor((totalPoints - 1) / 2)));
  } else {
    for (let index = 0; index < totalPhotos; index += 1) {
      const ratio = (index + 1) / (totalPhotos + 1);
      markerIndexes.add(Math.max(0, Math.min(totalPoints - 1, Math.round(ratio * (totalPoints - 1)))));
    }
  }

  return [...markerIndexes]
    .sort((a, b) => a - b)
    .map((index) => normalizedPoints[index])
    .filter((point) => Number.isFinite(Number(point?.latitude)) && Number.isFinite(Number(point?.longitude)));
}

function constrainWalkMapBounds(bounds, { compact = false } = {}) {
  if (!bounds || !compact || typeof window === "undefined" || !window.L) return bounds;
  const center = bounds.getCenter();
  if (!center || !Number.isFinite(center.lat) || !Number.isFinite(center.lng)) return bounds;

  const maxRadiusKm = 30;
  const latRadius = maxRadiusKm / 111.32;
  const lngRadius = maxRadiusKm / (111.32 * Math.max(Math.cos((center.lat * Math.PI) / 180), 0.2));
  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();
  const latHalfSpan = Math.max(Math.abs(Number(northEast?.lat) - center.lat), Math.abs(center.lat - Number(southWest?.lat)));
  const lngHalfSpan = Math.max(Math.abs(Number(northEast?.lng) - center.lng), Math.abs(center.lng - Number(southWest?.lng)));

  if (latHalfSpan <= latRadius && lngHalfSpan <= lngRadius) {
    return bounds;
  }

  return window.L.latLngBounds(
    [center.lat - latRadius, center.lng - lngRadius],
    [center.lat + latRadius, center.lng + lngRadius]
  );
}

function walkTileProviderConfigs() {
  return [
    {
      key: "osm",
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
        referrerPolicy: "origin",
        updateWhenIdle: true,
        updateWhenZooming: false,
        keepBuffer: 1
      }
    },
    {
      key: "stadia-osm-bright",
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      options: {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank" rel="noreferrer">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
        updateWhenIdle: true,
        updateWhenZooming: false,
        keepBuffer: 1
      }
    }
  ];
}

function setWalkMapBlockedState(mapEl, blocked = false) {
  if (!mapEl) return;
  mapEl.dataset.walkMapBlocked = blocked ? "true" : "false";
  if (blocked) {
    mapEl.setAttribute("aria-label", "Mapa sa teraz nepodarila načítať.");
  } else {
    mapEl.removeAttribute("aria-label");
  }
}

function createWalkTileLayer(map, mapEl) {
  const providers = walkTileProviderConfigs();
  let providerIndex = 0;
  let errorCount = 0;
  let loadedSuccessfully = false;
  let activeLayer = null;

  const applyProvider = (nextIndex) => {
    providerIndex = nextIndex;
    errorCount = 0;
    loadedSuccessfully = false;
    setWalkMapBlockedState(mapEl, false);

    if (activeLayer) {
      activeLayer.off();
      if (map?.hasLayer(activeLayer)) {
        map.removeLayer(activeLayer);
      }
    }

    const provider = providers[providerIndex];
    activeLayer = window.L.tileLayer(provider.url, provider.options);
    activeLayer.on("tileload", () => {
      loadedSuccessfully = true;
      errorCount = 0;
      setWalkMapBlockedState(mapEl, false);
    });
    activeLayer.on("tileerror", () => {
      errorCount += 1;
      if (!loadedSuccessfully && errorCount >= 2 && providerIndex < providers.length - 1) {
        applyProvider(providerIndex + 1);
        return;
      }
      if (!loadedSuccessfully && errorCount >= 2) {
        setWalkMapBlockedState(mapEl, true);
      }
    });
    activeLayer.addTo(map);
    if (mapEl) {
      mapEl.dataset.walkMapProvider = provider.key;
    }
    return activeLayer;
  };

  return applyProvider(0);
}

function fitWalkMapViewport(map, { polyline = null, point = null, compact = false, live = false, points = [] } = {}) {
  if (!map) return;
  const padding = live ? [20, 20] : compact ? [16, 16] : [24, 24];
  const latLngPoints = Array.isArray(points)
    ? points
      .map((item) => [Number(item?.latitude), Number(item?.longitude)])
      .filter(([latitude, longitude]) => Number.isFinite(latitude) && Number.isFinite(longitude))
    : [];
  const sourceBounds = polyline?.getBounds?.() || (latLngPoints.length >= 2 ? window.L.latLngBounds(latLngPoints) : null);
  if (sourceBounds) {
    map.fitBounds(constrainWalkMapBounds(sourceBounds, { compact }), {
      padding,
      maxZoom: compact ? 16 : 17
    });
    return;
  }
  if (point && Number.isFinite(Number(point.latitude)) && Number.isFinite(Number(point.longitude))) {
    map.setView([Number(point.latitude), Number(point.longitude)], live ? 15 : compact ? 14 : 15);
  }
}

function refreshWalkMapElement(mapEl) {
  if (!mapEl) return;
  const map = walkMapInstances.get(mapEl);
  if (!map) return;
  const points = walkMapPointsFromElement(mapEl);
  const fitOptions = {
    point: points[0] || null,
    points,
    compact: mapEl.classList.contains("journal-walk__map--compact"),
    live: mapEl.classList.contains("journal-walk__map--live")
  };

  map.invalidateSize();
  fitWalkMapViewport(map, fitOptions);
  requestAnimationFrame(() => {
    map.invalidateSize();
    fitWalkMapViewport(map, fitOptions);
  });
  window.setTimeout(() => {
    map.invalidateSize();
    fitWalkMapViewport(map, fitOptions);
  }, 240);
}

function refreshWalkMaps(root = document) {
  if (!root || typeof root.querySelectorAll !== "function") return;
  hydrateWalkMaps(root);
  root.querySelectorAll("[data-walk-map]").forEach((mapEl) => {
    refreshWalkMapElement(mapEl);
  });
}

function attachWalkMapControls(mapEl, getMap) {
  const shell = mapEl?.closest("[data-walk-map-shell]");
  if (!shell || shell.dataset.walkMapControlsReady === "true") return;
  const expandButton = shell.querySelector("[data-walk-map-fullscreen]");
  const updateUi = () => {
    const isFullscreen = document.fullscreenElement === shell || shell.classList.contains("is-expanded");
    shell.classList.toggle("is-fullscreen", document.fullscreenElement === shell);
    if (expandButton) {
      const label = isFullscreen ? "Zavrieť mapu" : "Celá mapa";
      expandButton.setAttribute("aria-label", label);
      expandButton.setAttribute("title", label);
      expandButton.setAttribute("aria-pressed", isFullscreen ? "true" : "false");
    }
  };

  expandButton?.addEventListener("click", async () => {
    const map = getMap();
    if (!map) return;
    try {
      if (document.fullscreenElement === shell) {
        await document.exitFullscreen();
      } else if (!document.fullscreenElement && typeof shell.requestFullscreen === "function") {
        await shell.requestFullscreen();
      } else {
        shell.classList.toggle("is-expanded");
      }
    } catch (error) {
      shell.classList.toggle("is-expanded");
    }
    updateUi();
    scheduleWalkMapResize(map);
  });

  document.addEventListener("fullscreenchange", () => {
    updateUi();
    scheduleWalkMapResize(getMap());
  });

  shell.dataset.walkMapControlsReady = "true";
  updateUi();
}

function pushOverlayHistory(kind = "") {
  const normalizedKind = String(kind || "").trim();
  if (!normalizedKind || typeof window === "undefined" || !window.history?.pushState) return;
  if (activeOverlayHistoryKind === normalizedKind) return;
  window.history.pushState({ ...(window.history.state || {}), __mzOverlay: normalizedKind }, "");
  activeOverlayHistoryKind = normalizedKind;
}

function inferVisibleOverlayHistoryKind() {
  if (imageLightboxEl?.open) return "lightbox";
  if (journalOverlayRoot()) return "journal";
  if (detailModal?.open) return "detail";
  return "";
}

function clearOverlayHistory(kind = "", { fromHistory = false } = {}) {
  const normalizedKind = String(kind || "").trim();
  if (!normalizedKind || activeOverlayHistoryKind !== normalizedKind) return;
  activeOverlayHistoryKind = "";
  if (fromHistory || typeof window === "undefined" || !window.history?.back) return;
  overlayHistoryNavigating = true;
  window.history.back();
  window.setTimeout(() => {
    overlayHistoryNavigating = false;
  }, 0);
}

function openDetailModalDialog() {
  if (!detailModal.open) {
    pushOverlayHistory("detail");
    lockDetailBodyScroll();
    detailModal.showModal();
  }
  syncMobileOverlayBottomNavPlacement();
  detailModal.scrollTop = 0;
  if (detailContent) detailContent.scrollTop = 0;
  refreshWalkMaps(detailContent || detailModal);
}
const imageLightboxImageEl = document.getElementById("image-lightbox-image");
const imageLightboxCountEl = document.getElementById("image-lightbox-count");
const imageLightboxCloseEl = document.getElementById("image-lightbox-close");
const imageLightboxBackEl = document.getElementById("image-lightbox-back");
const imageLightboxPrevEl = document.getElementById("image-lightbox-prev");
const imageLightboxNextEl = document.getElementById("image-lightbox-next");
const detailModalBackEl = document.getElementById("detail-modal-back");
const undoDeleteEl = document.getElementById("undo-delete");
const restoreResetEl = document.getElementById("restore-reset");
const mainMenuQuickEl = document.getElementById("open-main-menu");
const toolbarAddMenuEl = document.getElementById("toolbar-add-menu");
const toolbarAddMenuPanelEl = toolbarAddMenuEl?.querySelector(".toolbar-add-menu__panel") || null;
const addEntryQuickEl = document.getElementById("open-add-entry");
const addCategoryQuickEl = document.getElementById("open-add-category");
const worklogPanelToggleEl = document.getElementById("toggle-worklog-panel");
const journalPanelToggleEl = document.getElementById("toggle-journal-panel");
const addCardQuickEl = document.getElementById("open-add-card");
const batchMenuQuickEl = document.getElementById("toolbar-batch-menu");
const batchSowingQuickEl = document.getElementById("open-batch-sowing");
const batchMoveQuickEl = document.getElementById("open-batch-move");
const menuPanelEl = document.getElementById("menu-panel");
const catalogHeaderEl = document.getElementById("catalog-header");
const catalogContextEl = document.getElementById("catalog-context");
const activeFilterLabelEl = document.getElementById("active-filter-label");
const filterDisclosureEl = document.getElementById("filter-disclosure");
const workspaceLayoutEl = document.querySelector(".workspace-layout");
const workspaceMainEl = document.querySelector(".workspace-main");
const utilityBarEl = document.querySelector(".utility-bar");
const pageShellEl = document.querySelector(".page-shell");
const heroWeatherWrapEl = document.querySelector(".hero__weather");
const heroWeatherOriginalParentEl = heroWeatherWrapEl?.parentElement || null;
const toolbarAddMenuPanelOriginalParentEl = toolbarAddMenuPanelEl?.parentElement || null;
const mainMenuQuickOriginalParentEl = mainMenuQuickEl?.parentElement || null;
const worklogQuickOriginalParentEl = worklogPanelToggleEl?.parentElement || null;
const journalQuickOriginalParentEl = journalPanelToggleEl?.parentElement || null;
let lastDeleted = loadUndoState();
const imageLightboxState = { images: [], index: 0, label: "Fotka" };
let toolbarSearchQuery = "";
let toolbarSearchLastResults = [];
let toolbarAddMenuOverlayHostEl = null;

wireStaticEvents();
render();
syncResponsiveAppShellClass();
window.addEventListener("resize", () => {
  syncResponsiveAppShellClass();
  positionToolbarAddMenuOverlay();
}, { passive: true });
window.addEventListener("scroll", () => {
  syncMobileToolbarScrollState();
  scheduleEmbeddedMobilePreviewMetricsPush();
  positionToolbarAddMenuOverlay();
}, { passive: true });
scheduleImageBackgroundCleanup();
hydrateStateFromFolderStorage().catch((error) => {
  console.warn("Dočasné diskové úložisko sa nepodarilo načítať.", error);
});

function closeToolbarAddMenu() {
  if (batchMenuQuickEl?.open) {
    batchMenuQuickEl.open = false;
  }
  if (toolbarAddMenuEl?.open) {
    toolbarAddMenuEl.open = false;
  }
  restoreToolbarAddMenuOverlay();
}

function ensureToolbarAddMenuOverlayHost() {
  if (typeof document === "undefined") return null;
  if (toolbarAddMenuOverlayHostEl?.isConnected) return toolbarAddMenuOverlayHostEl;
  const host = document.createElement("div");
  host.id = "toolbar-add-menu-overlay-host";
  document.body.appendChild(host);
  toolbarAddMenuOverlayHostEl = host;
  return host;
}

function isMobileToolbarAddOverlayMode() {
  return Boolean(document.body?.classList.contains("app-mobile-shell"));
}

function positionToolbarAddMenuOverlay() {
  if (!toolbarAddMenuEl?.open || !toolbarAddMenuPanelEl || !isMobileToolbarAddOverlayMode()) return;
  const host = ensureToolbarAddMenuOverlayHost();
  if (!host) return;
  const rect = toolbarAddMenuEl.getBoundingClientRect();
  const top = Math.max(56, Math.round(rect.bottom + 8));
  host.style.setProperty("--toolbar-add-overlay-top", `${top}px`);
}

function mountToolbarAddMenuOverlay() {
  if (!toolbarAddMenuPanelEl || !toolbarAddMenuPanelOriginalParentEl || !isMobileToolbarAddOverlayMode()) return;
  const host = ensureToolbarAddMenuOverlayHost();
  if (!host) return;
  positionToolbarAddMenuOverlay();
  if (toolbarAddMenuPanelEl.parentElement !== host) {
    host.appendChild(toolbarAddMenuPanelEl);
  }
  document.body.classList.add("app-toolbar-add-overlay-open");
}

function restoreToolbarAddMenuOverlay() {
  if (!toolbarAddMenuPanelEl || !toolbarAddMenuPanelOriginalParentEl) return;
  if (toolbarAddMenuPanelEl.parentElement !== toolbarAddMenuPanelOriginalParentEl) {
    toolbarAddMenuPanelOriginalParentEl.appendChild(toolbarAddMenuPanelEl);
  }
  document.body?.classList.remove("app-toolbar-add-overlay-open");
}

function syncToolbarAddMenuOverlayState() {
  if (!toolbarAddMenuEl?.open || !isMobileToolbarAddOverlayMode()) {
    restoreToolbarAddMenuOverlay();
    return;
  }
  mountToolbarAddMenuOverlay();
}

function openMainMenuView() {
  closeUtilityDrawers();
  isFocusedView = false;
  render();
  const isMobileShell = Boolean(document.body?.classList.contains("app-mobile-shell"));
  if (isMobileShell) {
    const scrollMainMenuTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollLeft = 0;
      }
      if (pageShellEl && typeof pageShellEl.scrollTo === "function") {
        pageShellEl.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };
    scrollMainMenuTop();
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(scrollMainMenuTop);
    }
    return;
  }
  const menuTop = menuPanelEl?.offsetTop ?? 0;
  window.scrollTo({ top: Math.max(0, menuTop - 12), behavior: "smooth" });
}

function normalizedJournalList() {
  if (!Array.isArray(state.journal)) return [];
  return state.journal
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
          image: fallbackImages[0] || "",
          images: fallbackImages,
          entryType: (() => {
            const normalizedType = String(entry?.entryType || "note").trim() || "note";
            return normalizedType === "observation" ? "note" : normalizedType;
          })(),
          tags: normalizeTagList(entry?.tags),
          linkedCategoryIds: normalizeIdList(entry?.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry?.linkedCategoryId),
          linkedCategoryId: normalizeIdList(entry?.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry?.linkedCategoryId)[0] || String(entry?.linkedCategoryId || "").trim(),
          linkedVarietyId: String(entry?.linkedVarietyId || "").trim(),
          linkedEntityName: String(entry?.linkedEntityName || "").trim(),
          place: String(entry?.place || "").trim(),
          mood: String(entry?.mood || "").trim(),
          weather: normalizeWeatherSnapshot(entry?.weather),
          walk: normalizeJournalWalk(entry, normalizeWeatherSnapshot(entry?.weather))
        };
      }
    })
    .sort((a, b) => String(b?.date || "").localeCompare(String(a?.date || "")));
}

let journalOverlayPreviousOverflow = null;

function journalOverlayRoot() {
  return document.getElementById("journal-overlay-root");
}

function handleJournalOverlayEscape(event) {
  if (event.key !== "Escape") return;
  event.preventDefault();
  closeJournalOverlay();
}

function closeJournalOverlay(options = {}) {
  const { fromHistory = false } = options;
  const root = journalOverlayRoot();
  if (root) root.remove();
  unlockBodyScroll("journal");
  journalOverlayPreviousOverflow = null;
  document.removeEventListener("keydown", handleJournalOverlayEscape);
  if (!fromHistory) {
    clearOverlayHistory("journal");
  } else if (activeOverlayHistoryKind === "journal") {
    activeOverlayHistoryKind = "";
  }
  syncMobileOverlayBottomNavPlacement();
}

function ensureJournalOverlayRoot() {
  let root = journalOverlayRoot();
  if (!root) {
    root = document.createElement("div");
    root.id = "journal-overlay-root";
    root.className = "journal-overlay-root";
    root.addEventListener("click", (event) => {
      if (event.target === root) closeJournalOverlay();
    });
    document.body.appendChild(root);
  }

  if (journalOverlayPreviousOverflow === null) {
    journalOverlayPreviousOverflow = document.body.style.overflow;
  }
  lockBodyScroll("journal");
  document.removeEventListener("keydown", handleJournalOverlayEscape);
  document.addEventListener("keydown", handleJournalOverlayEscape);
  pushOverlayHistory("journal");
  return root;
}

function journalOverlayFrame(title, bodyHtml, actionsHtml = "", topbarHtml = "") {
  const topbarSlot = topbarHtml
    ? `<div class="journal-overlay-shell__topline-main">${topbarHtml}</div>`
    : "";
  return `
    <section class="journal-overlay-shell">
      <div class="journal-overlay-shell__topline${topbarHtml ? " has-topbar" : ""}">
        <button type="button" id="journal-overlay-back" class="back-button journal-overlay-shell__back" aria-label="Krok späť">Späť</button>
        ${topbarSlot}
      </div>
      <button type="button" id="journal-overlay-close" class="journal-overlay-shell__close" aria-label="Zavrieť denník">x</button>
      <div class="journal-overlay-frame__head">
        <div class="journal-overlay-frame__title-block">
          <h3 id="journal-overlay-title">${escapeHtml(title)}</h3>
        </div>
        <div class="journal-overlay-frame__actions">${actionsHtml}</div>
        <div id="journal-overlay-header-weather" class="add-entry-form__weather--head journal-overlay-header-weather" hidden></div>
      </div>
      <div id="journal-overlay-body" class="journal-overlay-shell__body">${bodyHtml}</div>
    </section>
  `;
}

function renderJournalOverlayCard(entry) {
  const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
  const images = journalImages(normalizedEntry);
  const video = journalVideo(normalizedEntry);
  const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length });
  const safeTitle = journalDisplayTitle(normalizedEntry);
  const safeText = String(normalizedEntry.text || "").trim();
  const safeId = String(normalizedEntry.id || "").trim() || makeId("journal");
  const dateLabel = journalDateLabel(normalizedEntry.date);
  const chips = journalDisplayChips(normalizedEntry);
  const weatherWidgets = renderJournalWeatherWidgets(journalHeaderWeather(normalizedEntry));
  const headerWeatherWidgets = weatherWidgets;
  const footerChips = chips;

  return `
    <article class="journal-overlay-card ${images.length ? "journal-overlay-card--with-image" : ""} ${safeText || walkMarkup ? "" : "journal-overlay-card--compact"}">
      <div class="journal-overlay-card__header">
        <div class="journal-overlay-card__meta">
          <div class="journal-overlay-card__topline">
            <span class="journal-item__date-badge">${escapeHtml(dateLabel)}</span>
            ${headerWeatherWidgets}
          </div>
          <div class="journal-overlay-card__title-row">
            <strong class="journal-overlay-card__title">${escapeHtml(safeTitle)}</strong>
            ${renderMoodBadge(normalizedEntry.mood, "journal-overlay-card__mood")}
          </div>
        </div>
        <div class="journal-overlay-card__actions">
          <button class="button button--ghost journal-item__action" type="button" data-edit-journal-overlay="${escapeAttribute(safeId)}" aria-label="Upraviť záznam" title="Upraviť">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
              <path d="M13 7l4 4"></path>
            </svg>
          </button>
          <button class="button button--ghost journal-item__action journal-item__action--danger" type="button" data-delete-journal-overlay="${escapeAttribute(safeId)}" aria-label="Vymazať záznam" title="Vymazať">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M8 7l1 12h6l1-12"></path>
              <path d="M10 10v6"></path>
              <path d="M14 10v6"></path>
            </svg>
          </button>
        </div>
      </div>
      ${safeText ? `<p class="journal-overlay-card__text">${escapeHtml(safeText)}</p>` : ""}
      ${walkMarkup}
      ${renderJournalVideoPlayer(video, `Video zápisu ${safeTitle}`, "journal-item__video")}
      ${images.length ? `
        <div class="journal-overlay-card__gallery ${images.length === 1 ? "journal-overlay-card__gallery--single" : ""}">
          ${images.slice(0, 4).map((image, index) => `
            <button class="journal-item__image" type="button" data-open-journal-image="${escapeAttribute(safeId)}" data-journal-image-index="${index}" aria-label="Otvoriť fotku zápisu ${escapeAttribute(safeTitle)}">
              <img src="${escapeAttribute(image)}" alt="${escapeAttribute(safeTitle)}">
            </button>
          `).join("")}
          ${images.length > 4 ? `<span class="journal-item__more">+${images.length - 4}</span>` : ""}
        </div>
      ` : ""}
      ${footerChips.length ? `<div class="journal-overlay-card__footer"><div class="journal-item__chips journal-overlay-card__chips">${footerChips.map(renderJournalChip).join("")}</div></div>` : ""}
    </article>
  `;
}

function renderJournalOverlayCardsSafe(entries) {
  return entries.map((entry, index) => {
    try {
      return renderJournalOverlayCard(entry);
    } catch (error) {
      console.error("Zlyhal jeden zápis v denníkovom overlayi", error, entry);
      const fallbackTitle = String(entry?.title || `Zápis ${index + 1}`).trim() || `Zápis ${index + 1}`;
      const fallbackDate = String(entry?.date || todayISO()).trim() || todayISO();
      const fallbackText = String(entry?.text || "").trim();
      return `
        <article class="journal-overlay-card journal-overlay-card--fallback">
          <div class="journal-overlay-card__header">
            <div class="journal-overlay-card__meta">
              <div class="journal-overlay-card__topline">
                <span class="journal-item__date-badge">${escapeHtml(fallbackDate.includes("T") ? fallbackDate.slice(0, 10) : fallbackDate)}</span>
              </div>
              <div class="journal-overlay-card__title-row">
                <strong class="journal-overlay-card__title">${escapeHtml(fallbackTitle)}</strong>
              </div>
            </div>
            <div class="journal-overlay-card__actions">
              <button class="button button--ghost journal-item__action" type="button" data-edit-journal-overlay="${escapeAttribute(String(entry?.id || ""))}" aria-label="Upraviť záznam" title="Upraviť">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
                  <path d="M13 7l4 4"></path>
                </svg>
              </button>
              <button class="button button--ghost journal-item__action journal-item__action--danger" type="button" data-delete-journal-overlay="${escapeAttribute(String(entry?.id || ""))}" aria-label="Vymazať záznam" title="Vymazať">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 7h14"></path>
                  <path d="M9 7V5h6v2"></path>
                  <path d="M8 7l1 12h6l1-12"></path>
                  <path d="M10 10v6"></path>
                  <path d="M14 10v6"></path>
                </svg>
              </button>
            </div>
          </div>
          ${fallbackText ? `<p class="journal-overlay-card__text">${escapeHtml(fallbackText)}</p>` : ""}
        </article>
      `;
    }
  }).join("");
}

function bindJournalOverlayCardActions(container) {
  if (!container) return;

  bindThingLinks(container);

  container.querySelectorAll("[data-open-journal-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = normalizedJournalList().find((item) => item.id === button.dataset.openJournalImage);
      const images = journalImages(entry || {});
      if (!images.length) return;
      openImageLightbox(images, Number(button.dataset.journalImageIndex || 0), entry?.title || "Fotka denníka");
    });
  });

  container.querySelectorAll("[data-delete-journal-overlay]").forEach((button) => {
    button.addEventListener("click", () => {
      state.journal = state.journal.filter((entry) => String(entry?.id || "") !== button.dataset.deleteJournalOverlay);
      if (!persist()) return;
      render();
      openJournalOverlayList();
    });
  });

  container.querySelectorAll("[data-edit-journal-overlay]").forEach((button) => {
    button.addEventListener("click", () => {
      openJournalComposer(button.dataset.editJournalOverlay || "");
    });
  });
}

function openJournalOverlayList(initialTagKey = "") {
  const entries = normalizedJournalList();
  const root = ensureJournalOverlayRoot();
  let activeTagKey = String(initialTagKey || "").trim();

  const renderOverlay = () => {
    const showMobileQuickActionsTopbar = document.body.classList.contains("app-mobile-shell");
    const journalQuickActionsTopbar = "";
    const journalQuickActionsInline = showMobileQuickActionsTopbar ? "" : openJournalQuickActions();
    const activeRecords = journalTagRecords(entries);
    if (activeTagKey && !activeRecords.some((item) => item.themeKey === activeTagKey)) {
      activeTagKey = "";
    }
    const filteredEntries = journalEntriesForTag(entries, activeTagKey);

    try {
      root.innerHTML = journalOverlayFrame(
        "Denník",
        entries.length
          ? `
            <div class="journal-overlay-stack">
              ${journalQuickActionsInline}
              ${renderJournalTagFilterPanel(entries, activeTagKey, filteredEntries.length)}
              ${filteredEntries.length
                ? renderJournalOverlayTimeline(filteredEntries)
                : '<div class="empty-state empty-state--compact">K tomuto tagu zatiaľ nemáš žiadny zápis.</div>'}
            </div>
          `
          : `
            <div class="journal-overlay-stack">
              ${journalQuickActionsInline}
              <div class="empty-state empty-state--compact">Denník je pripravený. Pridaj prvý zápis a začne žiť.</div>
            </div>
          `,
        `
          <button class="button" type="button" id="journal-overlay-add">Pridať zápis</button>
        `,
        journalQuickActionsTopbar
      );
    } catch (error) {
      console.error("Denníkový overlay sa nepodarilo vykresliť", error);
      root.innerHTML = journalOverlayFrame(
        "Denník",
        `
          <div class="empty-state empty-state--compact">
            Denník sa teraz nepodarilo celé vykresliť, ale jadro appky ostalo v poriadku.
          </div>
        `,
        `<button class="button" type="button" id="journal-overlay-add">Pridať zápis</button>`
      );
    }

    root.querySelector("#journal-overlay-close")?.addEventListener("click", closeJournalOverlay);
    root.querySelector("#journal-overlay-back")?.addEventListener("click", closeJournalOverlay);
    root.querySelector("#journal-overlay-add")?.addEventListener("click", () => openJournalComposer());
    root.querySelectorAll("[data-open-journal-type]").forEach((button) => {
      button.addEventListener("click", () => {
        openJournalComposer("", String(button.getAttribute("data-open-journal-type") || "").trim() || "note");
      });
    });
    root.querySelectorAll("[data-journal-filter-tag]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTagKey = String(button.getAttribute("data-journal-filter-tag") || "").trim();
        activeTagKey = nextTagKey === activeTagKey ? "" : nextTagKey;
        renderOverlay();
      });
    });
    bindJournalOverlayCardActions(root);
    hydrateWalkMaps(root);
    syncMobileOverlayBottomNavPlacement();
  };

  renderOverlay();
}

function renderJournalComposerImagePreview(existingImages, pendingUrls, existingVideo = "", pendingVideoUrl = "") {
  const items = [
    ...existingImages.map((image, index) => `
      <div class="journal-form__image journal-form__image--pending">
        <img src="${escapeAttribute(image)}" alt="Uložená fotka ${index + 1}">
        <button class="journal-form__image-remove" type="button" data-remove-existing-image="${index}" aria-label="Odstrániť fotku">x</button>
      </div>
    `),
    ...pendingUrls.map((image, index) => `
      <div class="journal-form__image journal-form__image--pending">
        <img src="${escapeAttribute(image)}" alt="Nová fotka ${index + 1}">
        <button class="journal-form__image-remove" type="button" data-remove-new-image="${index}" aria-label="Odstrániť fotku">x</button>
      </div>
    `)
  ];
  if (existingVideo) {
    items.push(`
      <div class="journal-form__image journal-form__image--pending journal-form__image--video">
        <video src="${escapeAttribute(existingVideo)}" muted playsinline preload="metadata"></video>
        <button class="journal-form__image-remove" type="button" data-remove-existing-video="1" aria-label="Odstrániť video">x</button>
      </div>
    `);
  }
  if (pendingVideoUrl) {
    items.push(`
      <div class="journal-form__image journal-form__image--pending journal-form__image--video">
        <video src="${escapeAttribute(pendingVideoUrl)}" muted playsinline preload="metadata"></video>
        <button class="journal-form__image-remove" type="button" data-remove-new-video="1" aria-label="Odstrániť video">x</button>
      </div>
    `);
  }
  return items.join("");
}

function openJournalQuickActions(activeType = "") {
  const quickItems = [
    { type: "note", label: "Zápis" },
    { type: "walk", label: "Prechádzka" },
    { type: "weather", label: "Počasie a jav" },
    { type: "work", label: "Práca" },
    { type: "problem", label: "Problém" }
  ];
  const isMobileTopbar = document.body.classList.contains("app-mobile-shell");
  const normalizedActiveType = String(activeType || "").trim();
  const iconForType = (entryType) => {
    const icons = {
      note: "📝",
      walk: "🚶",
      weather: ICONS.weatherPartly,
      work: "🪏",
      problem: "⚠️"
    };
    return icons[String(entryType || "").trim()] || "📝";
  };
  if (isMobileTopbar) {
    return `
      <div class="journal-quick-actions journal-quick-actions--topbar detail-editor-mobile-switch">
        <div class="entry-mode-switch entry-mode-switch--topbar journal-quick-actions__chips">
          ${quickItems.map((item) => {
            const isActive = normalizedActiveType === item.type;
            return `
            <button
              class="journal-quick-actions__button entry-mode-switch__button${isActive ? " is-active" : ""}"
              type="button"
              data-open-journal-type="${escapeAttribute(item.type)}"
              aria-pressed="${isActive ? "true" : "false"}"
              aria-label="${escapeAttribute(item.label)}"
              title="${escapeAttribute(item.label)}"
            >
              <span class="entry-mode-switch__button-content">
                <span class="entry-mode-switch__button-icon" aria-hidden="true">${escapeHtml(iconForType(item.type))}</span>
                <span class="entry-mode-switch__button-label">${escapeHtml(item.label)}</span>
              </span>
            </button>
          `;
          }).join("")}
        </div>
      </div>
    `;
  }
  return `
    <div class="journal-quick-actions">
      <span class="journal-quick-actions__label">Rýchlo pridať</span>
      <div class="journal-quick-actions__chips">
        ${quickItems.map((item) => `
          <button class="button button--ghost button--small journal-quick-actions__button" type="button" data-open-journal-type="${escapeAttribute(item.type)}">${escapeHtml(item.label)}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function openJournalComposer(editingEntryId = "", preferredEntryType = "", options = {}) {
  const composerOptions = options && typeof options === "object" ? options : {};
  const editingEntry = editingEntryId
    ? normalizedJournalList().find((entry) => entry.id === editingEntryId) || null
    : null;
  const initialEntryType = String(editingEntry?.entryType || preferredEntryType || "note").trim() || "note";
  const isMobileJournalShell = document.body.classList.contains("app-mobile-shell");
  const root = ensureJournalOverlayRoot();
  let existingImages = editingEntry ? [...journalImages(editingEntry)] : [];
  let pendingFiles = Array.isArray(composerOptions.imageFiles)
    ? composerOptions.imageFiles.filter((file) => file instanceof File && file.size)
    : [];
  let pendingUrls = [];
  let existingVideo = editingEntry ? journalVideo(editingEntry) : "";
  let existingVideoPath = String(editingEntry?.videoPath || "").trim();
  let existingVideoName = String(editingEntry?.videoName || "").trim();
  let existingVideoMimeType = String(editingEntry?.videoMimeType || "").trim();
  let pendingVideoFile = composerOptions.videoFile instanceof File && composerOptions.videoFile.size
    ? composerOptions.videoFile
    : null;
  let pendingVideoUrl = "";
  const initialDateParts = journalDateParts(editingEntry?.date || "");
  const initialDate = initialDateParts.date || todayISO();
  const initialTime = initialDateParts.time || currentTimeValue();
  const defaultEntryMode = editingEntry && (
    (editingEntry.entryType && editingEntry.entryType !== "note")
    || (editingEntry.tags || []).length
    || editingEntry.place
    || (editingEntry.linkedCategoryIds || []).length
    || editingEntry.linkedCategoryId
    || editingEntry.linkedVarietyId
    || initialDate !== todayISO()
  ) ? "full" : "quick";
  const showMobileQuickActionsTopbar = document.body.classList.contains("app-mobile-shell");
  const journalQuickActionsTopbar = showMobileQuickActionsTopbar ? openJournalQuickActions(initialEntryType) : "";
  const journalModeSwitchMarkup = `
      <div class="entry-mode-switch journal-overlay-mode-switch" id="journal-overlay-mode-switch" role="group" aria-label="Režim zápisu">
        <button
          class="entry-mode-switch__button ${defaultEntryMode === "quick" ? "is-active" : ""}"
          type="button"
          data-journal-overlay-mode="quick"
          aria-pressed="${defaultEntryMode === "quick" ? "true" : "false"}"
        >Jednoduchý</button>
        <button
          class="entry-mode-switch__button ${defaultEntryMode === "full" ? "is-active" : ""}"
          type="button"
          data-journal-overlay-mode="full"
          aria-pressed="${defaultEntryMode === "full" ? "true" : "false"}"
        >Rozšírený</button>
      </div>
    `;
  const journalModeToggleMarkup = isMobileJournalShell
    ? ""
    : `
        <div class="add-entry-form__topbar">
          <button class="button button--ghost" id="journal-overlay-mode-toggle" type="button">${defaultEntryMode === "full" ? "Menej možností" : "Rozšírený zápis"}</button>
        </div>
      `;
  const journalComposerActions = isMobileJournalShell
    ? `
        <div class="journal-overlay-mobile-actions">
          <button class="button" id="journal-overlay-submit" type="submit" form="journal-overlay-form">${editingEntry ? "Uložiť zmeny" : "Uložiť zápis"}</button>
          ${journalModeSwitchMarkup}
        </div>
      `
    : `
      <button class="button button--ghost" type="button" id="journal-overlay-cancel">Späť</button>
      <button class="button" id="journal-overlay-submit" type="submit" form="journal-overlay-form">${editingEntry ? "Uložiť zmeny" : "Uložiť zápis"}</button>
    `;

  root.innerHTML = journalOverlayFrame(
    editingEntry ? "Upraviť zápis" : "Pridať zápis",
    `
      <form id="journal-overlay-form" class="journal-form add-entry-form" style="display:grid;gap:14px;">
        ${journalModeToggleMarkup}
        <div class="add-entry-form__main">
          ${renderJournalEntryTypePicker(initialEntryType, { mobileMinimal: isMobileJournalShell })}
          <div data-full-only data-title-field>
            <input id="journal-overlay-title-input" name="title" type="text" placeholder="${escapeAttribute(journalEntryTypeUi(initialEntryType).title)}" value="${escapeAttribute(editingEntry?.title || "")}">
          </div>
          <div data-full-only data-walk-auto-hidden>
            <div class="journal-date-row">
              <input name="date" id="journal-overlay-date" type="date" value="${escapeAttribute(initialDate)}" required>
              <input name="time" id="journal-overlay-time" type="time" value="${escapeAttribute(initialTime)}">
            </div>
          </div>
          <textarea id="journal-overlay-text" name="text" rows="3" placeholder="${escapeAttribute(journalEntryTypeUi(editingEntry?.entryType || "note").text)}">${escapeHtml(editingEntry?.text || "")}</textarea>
          ${renderMoodPicker(editingEntry?.mood || "")}
          <input name="mood" type="hidden" value="${escapeAttribute(editingEntry?.mood || "")}">
        </div>
        ${renderJournalWalkFields(editingEntry?.walk || null)}
        <label class="upload-field upload-field--compact">
          <span class="upload-field__label">Fotky k zápisu</span>
          <input name="imageFiles" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}" multiple>
        </label>
        <label class="upload-field upload-field--compact">
          <span class="upload-field__label">Video k zápisu</span>
          <input name="videoFile" type="file" accept="${escapeAttribute(VIDEO_FILE_ACCEPT)}">
        </label>
        <div id="journal-overlay-video-status" class="journal-upload-status" hidden>
          <div class="journal-upload-status__topline">
            <div class="journal-upload-status__title-wrap">
              <span class="journal-upload-status__spinner" aria-hidden="true"></span>
              <strong id="journal-overlay-video-status-title">Video zatiaľ nie je pridané.</strong>
            </div>
            <span id="journal-overlay-video-status-percent" class="journal-upload-status__percent">0 %</span>
          </div>
          <div class="progress-bar journal-upload-status__bar">
            <span id="journal-overlay-video-status-bar" style="width:0%"></span>
          </div>
          <p id="journal-overlay-video-status-detail" class="journal-upload-status__detail">Keď pridáš video, uvidíš tu jeho stav nahratia.</p>
        </div>
        <div id="journal-overlay-image-preview" class="journal-form__image-list" ${existingImages.length || existingVideo ? "" : "hidden"}></div>
        <details class="entry-advanced" id="journal-overlay-advanced">
          <summary class="entry-advanced__summary">Viac možností</summary>
          <div class="entry-advanced__content">
            <input name="tags" type="text" placeholder="Tagy oddelené čiarkou" value="${escapeAttribute((editingEntry?.tags || []).join(", "))}">
            <div class="journal-tag-picker" data-journal-tag-picker hidden></div>
            <input id="journal-overlay-place" name="place" type="text" placeholder="${escapeAttribute(journalEntryTypeUi(editingEntry?.entryType || "note").place)}" value="${escapeAttribute(editingEntry?.place || "")}">
            <div class="journal-tag-picker" data-journal-place-picker hidden></div>
            ${renderRelationDisclosure({
              summaryLabel: "Súvisí s kategóriami a kartou",
              categoryLabel: "Kategórie",
              categoryInputName: "linkedCategoryIds",
              categoryValues: editingEntry?.linkedCategoryIds?.length ? editingEntry.linkedCategoryIds : editingEntry?.linkedCategoryId,
              cardLabel: "Súvisí s kartou",
              cardInputName: "linkedVarietyId",
              cardValue: editingEntry?.linkedVarietyId || "",
              cardWrapKey: "journal-overlay",
              cardCategoryIds: editingEntry?.linkedCategoryIds?.length ? editingEntry.linkedCategoryIds : editingEntry?.linkedCategoryId
            })}
          </div>
        </details>
      </form>
    `,
    journalComposerActions,
    journalQuickActionsTopbar
  );

  const formEl = root.querySelector("#journal-overlay-form");
  const overlayTitleEl = root.querySelector("#journal-overlay-title");
  const modeToggleEl = root.querySelector("#journal-overlay-mode-toggle");
  const modeSwitchButtons = [...root.querySelectorAll("[data-journal-overlay-mode]")];
  const advancedDetailsEl = root.querySelector("#journal-overlay-advanced");
  const submitButton = root.querySelector("#journal-overlay-submit");
  const dateInput = formEl?.elements.date;
  const timeInput = formEl?.elements.time;
  const imageInput = formEl?.elements.imageFiles;
  const videoInput = formEl?.elements.videoFile;
  const titleInput = formEl?.elements.title;
  const textInput = formEl?.elements.text;
  const placeInput = formEl?.elements.place;
  const imagePreviewEl = root.querySelector("#journal-overlay-image-preview");
  const videoStatusEl = root.querySelector("#journal-overlay-video-status");
  const videoStatusTitleEl = root.querySelector("#journal-overlay-video-status-title");
  const videoStatusPercentEl = root.querySelector("#journal-overlay-video-status-percent");
  const videoStatusBarEl = root.querySelector("#journal-overlay-video-status-bar");
  const videoStatusDetailEl = root.querySelector("#journal-overlay-video-status-detail");
  const moodPickerEl = root.querySelector("#add-entry-mood-picker");
  const weatherMountEl = root.querySelector("#journal-overlay-header-weather");
  const walkFieldsEl = root.querySelector("#journal-overlay-walk-fields");
  const walkStartInput = formEl?.elements.walkStartPlace;
  const walkEndInput = formEl?.elements.walkEndPlace;
  const walkTemperatureInput = formEl?.elements.walkTemperature;
  const walkWindInput = formEl?.elements.walkWind;
  const walkPrecipitationInput = formEl?.elements.walkPrecipitation;
  const walkConditionsInput = formEl?.elements.walkConditions;
  const walkGpsStatusEl = root.querySelector("#journal-overlay-gps-status");
  const walkGpsSummaryEl = root.querySelector("#journal-overlay-gps-summary");
  const walkGpsPointsEl = root.querySelector("#journal-overlay-gps-points");
  const walkGpsMapWrapEl = root.querySelector("#journal-overlay-gps-map-wrap");
  const walkGpsDurationEl = root.querySelector("#journal-overlay-gps-duration");
  const walkGpsDistanceEl = root.querySelector("#journal-overlay-gps-distance");
  const walkGpsModeEl = root.querySelector("#journal-overlay-gps-mode");
  const walkGpsActionButtons = [...root.querySelectorAll("[data-walk-gps-action]")];
  const walkAutoHiddenSections = [...root.querySelectorAll("[data-walk-auto-hidden]")];
  const titleFieldSections = [...root.querySelectorAll("[data-title-field]")];
  const linkedCategoryInputs = [...(formEl?.querySelectorAll('input[name="linkedCategoryIds"]') || [])];
  const linkedVarietySelect = formEl?.elements.linkedVarietyId;
  const linkedVarietyWrap = formEl?.querySelector('[data-linked-variety-wrap="journal-overlay"]');
  const relationDisclosure = formEl?.querySelector("[data-relation-disclosure]") || null;
  const relationSummary = relationDisclosure?.querySelector("[data-relation-summary]") || null;
  let currentWeatherSnapshot = editingEntry?.weather || null;
  let lastSyncedEntryType = initialEntryType;
  let walkGpsPoints = normalizeWalkGpsPoints(editingEntry?.walk?.gpsPoints);
  let walkStartedAt = String(editingEntry?.walk?.startedAt || walkGpsPoints[0]?.recordedAt || "").trim();
  let walkEndedAt = String(editingEntry?.walk?.endedAt || "").trim();
  let walkPausedAt = String(editingEntry?.walk?.pausedAt || "").trim();
  let walkPausedDurationMs = Math.max(0, Number(editingEntry?.walk?.pausedDurationMs || 0) || 0);
  let walkGpsWatchId = null;
  let walkGpsBusy = false;
  let walkGpsTone = "neutral";
  let walkGpsMessage = "";
  let walkGpsTicker = null;
  let walkGpsLiveMap = null;
  let walkGpsLiveTileLayer = null;
  let walkGpsLivePolyline = null;
  let walkGpsLiveStartMarker = null;
  let walkGpsLiveEndMarker = null;

  const waitForNextPaint = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

  const autoJournalTitleForType = (entryTypeValue, weatherSnapshot = currentWeatherSnapshot || editingEntry?.weather || null) => journalAutoTitle(entryTypeValue, {
    tags: formEl?.elements.tags?.value || editingEntry?.tags || "",
    weatherCondition: weatherSnapshot?.condition || ""
  });

  const syncTitleAutoDerivedState = () => {
    if (!titleInput) return;
    const selectedType = String(formEl?.querySelector('input[name="entryType"]:checked')?.value || lastSyncedEntryType || initialEntryType || "note").trim() || "note";
    const currentValue = String(titleInput.value || "").trim();
    titleInput.dataset.autoDerived = String(!currentValue || currentValue === autoJournalTitleForType(selectedType));
  };

  const maybeSyncAutoDerivedTitle = (nextType, previousType = lastSyncedEntryType) => {
    if (!titleInput) return;
    const currentValue = String(titleInput.value || "").trim();
    const previousAutoTitle = autoJournalTitleForType(previousType);
    const nextAutoTitle = autoJournalTitleForType(nextType);
    const isAutoDerived = titleInput.dataset.autoDerived === "true"
      || !currentValue
      || currentValue === previousAutoTitle;
    if (!isAutoDerived) return;
    titleInput.value = nextAutoTitle;
    titleInput.dataset.autoDerived = "true";
  };

  const stopWalkGpsTracking = ({ silent = false } = {}) => {
    if (walkGpsWatchId !== null && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(walkGpsWatchId);
    }
    walkGpsWatchId = null;
    if (walkGpsTicker) {
      clearInterval(walkGpsTicker);
      walkGpsTicker = null;
    }
    if (!silent) {
      if (walkPausedAt) {
        walkPausedDurationMs += Math.max(0, Date.now() - Date.parse(walkPausedAt || ""));
        walkPausedAt = "";
      }
      if (!walkEndedAt && walkStartedAt) {
        walkEndedAt = new Date().toISOString();
      }
      walkGpsTone = walkGpsPoints.length ? "good" : "neutral";
      walkGpsMessage = walkGpsPoints.length
        ? `Prechádzka je ukončená. Uložené máš ${countedLabel(walkGpsPoints.length, "bod", "body", "bodov")}.`
        : "GPS je zastavené.";
    }
  };

  const cleanupJournalComposer = () => {
    stopWalkGpsTracking({ silent: true });
    if (walkGpsLiveMap) {
      walkGpsLiveMap.remove();
      walkGpsLiveMap = null;
      walkGpsLiveTileLayer = null;
      walkGpsLivePolyline = null;
      walkGpsLiveStartMarker = null;
      walkGpsLiveEndMarker = null;
    }
    clearPendingUrls();
  };

  root.querySelector("#journal-overlay-close")?.addEventListener("click", () => {
    cleanupJournalComposer();
    closeJournalOverlay();
  });
  root.querySelector("#journal-overlay-back")?.addEventListener("click", () => {
    cleanupJournalComposer();
    closeJournalOverlay();
  });
  root.querySelector("#journal-overlay-cancel")?.addEventListener("click", () => {
    cleanupJournalComposer();
    openJournalOverlayList();
  });

  const setVideoUploadStatus = ({
    hidden = false,
    title = "",
    detail = "",
    percent = 0,
    busy = false,
    tone = "neutral"
  } = {}) => {
    if (!videoStatusEl) return;
    const normalizedPercent = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));
    videoStatusEl.hidden = Boolean(hidden);
    videoStatusEl.classList.toggle("is-busy", Boolean(busy));
    videoStatusEl.classList.toggle("is-good", tone === "good");
    videoStatusEl.classList.toggle("is-danger", tone === "danger");
    if (videoStatusTitleEl) videoStatusTitleEl.textContent = String(title || "").trim() || "Video k zápisu";
    if (videoStatusDetailEl) videoStatusDetailEl.textContent = String(detail || "").trim();
    if (videoStatusPercentEl) videoStatusPercentEl.textContent = `${normalizedPercent} %`;
    if (videoStatusBarEl) videoStatusBarEl.style.width = `${normalizedPercent}%`;
  };

  const autoResizeTextarea = (textarea, { minHeight = 120, maxHeight = 320 } = {}) => {
    if (!textarea) return;
    textarea.style.height = "auto";
    const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const bindAutoDerivedInput = (input) => {
    if (!input || input.dataset.autoBound === "true") return;
    input.dataset.autoDerived = String(!String(input.value || "").trim());
    input.dataset.autoBound = "true";
    input.addEventListener("input", () => {
      input.dataset.autoDerived = String(!String(input.value || "").trim());
    });
  };

  [
    walkStartInput,
    walkEndInput,
    walkTemperatureInput,
    walkWindInput,
    walkPrecipitationInput,
    walkConditionsInput
  ].forEach(bindAutoDerivedInput);

  const applyAutoValue = (input, value = "") => {
    if (!input) return;
    const normalizedValue = String(value || "").trim();
    if (input.dataset.autoDerived === "true" || !String(input.value || "").trim()) {
      input.value = normalizedValue;
      input.dataset.autoDerived = String(!normalizedValue);
    }
  };

  const syncWalkAutoFields = () => {
    const firstPoint = walkGpsPoints[0] || null;
    const lastPoint = walkGpsPoints[walkGpsPoints.length - 1] || null;
    if (walkStartedAt && firstPoint) {
      applyAutoValue(walkStartInput, formatWalkGpsPlaceLabel(firstPoint, "start"));
    }
    if (walkEndedAt && lastPoint) {
      applyAutoValue(walkEndInput, formatWalkGpsPlaceLabel(lastPoint, "end"));
    }
    if (currentWeatherSnapshot) {
      applyAutoValue(walkTemperatureInput, currentWeatherSnapshot.temperature || "");
      applyAutoValue(walkWindInput, currentWeatherSnapshot.wind || "");
      applyAutoValue(walkPrecipitationInput, currentWeatherSnapshot.rain || "");
      applyAutoValue(walkConditionsInput, currentWeatherSnapshot.condition || "");
    }
  };

  const ensureWalkGpsTicker = () => {
    if (walkGpsWatchId === null) {
      if (walkGpsTicker) {
        clearInterval(walkGpsTicker);
        walkGpsTicker = null;
      }
      return;
    }
    if (walkGpsTicker) return;
    walkGpsTicker = setInterval(() => {
      renderWalkGpsState();
    }, 1000);
  };

  const renderWalkGpsLiveMap = () => {
    if (!walkGpsMapWrapEl) return;
    const points = walkGpsPoints.filter((point) => Number.isFinite(Number(point.latitude)) && Number.isFinite(Number(point.longitude)));
    const hasMap = points.length >= 1 && typeof window !== "undefined" && window.L;
    walkGpsMapWrapEl.hidden = !hasMap;
    if (!hasMap) {
      if (walkGpsLiveMap) {
        walkGpsLiveMap.remove();
        walkGpsLiveMap = null;
        walkGpsLiveTileLayer = null;
        walkGpsLivePolyline = null;
        walkGpsLiveStartMarker = null;
        walkGpsLiveEndMarker = null;
      }
      return;
    }

    const mapEl = walkGpsMapWrapEl.querySelector("[data-walk-map]");
    if (!mapEl) return;
    if (!walkGpsLiveMap) {
      walkGpsLiveMap = window.L.map(mapEl, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
        keyboard: false,
        zoomAnimation: false,
        fadeAnimation: false,
        markerZoomAnimation: false,
        tap: true,
        touchZoom: true
      });
      walkGpsLiveTileLayer = createWalkTileLayer(walkGpsLiveMap, mapEl);
      walkMapInstances.set(mapEl, walkGpsLiveMap);
      attachWalkMapControls(mapEl, () => walkGpsLiveMap);
    }

    if (walkGpsLivePolyline) walkGpsLiveMap.removeLayer(walkGpsLivePolyline);
    if (walkGpsLiveStartMarker) walkGpsLiveMap.removeLayer(walkGpsLiveStartMarker);
    if (walkGpsLiveEndMarker) walkGpsLiveMap.removeLayer(walkGpsLiveEndMarker);

    const startPoint = points[0];
    const endPoint = points[points.length - 1];

    if (points.length >= 2) {
      walkGpsLivePolyline = window.L.polyline(points.map((point) => [Number(point.latitude), Number(point.longitude)]), {
        color: "#6f963d",
        weight: 5,
        opacity: 0.92,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(walkGpsLiveMap);
    }

    walkGpsLiveStartMarker = window.L.circleMarker([Number(startPoint.latitude), Number(startPoint.longitude)], {
      radius: 6,
      color: "#3f6a2a",
      weight: 2,
      fillColor: "#f5fff0",
      fillOpacity: 1
    }).addTo(walkGpsLiveMap);

    walkGpsLiveEndMarker = window.L.circleMarker([Number(endPoint.latitude), Number(endPoint.longitude)], {
      radius: 6,
      color: "#9c5b2b",
      weight: 2,
      fillColor: "#fff3e8",
      fillOpacity: 1
    }).addTo(walkGpsLiveMap);

    fitWalkMapViewport(walkGpsLiveMap, {
      polyline: walkGpsLivePolyline,
      point: startPoint,
      live: true
    });
    scheduleWalkMapResize(walkGpsLiveMap);
  };

  const renderWalkGpsState = () => {
    syncWalkAutoFields();
    const gpsDistance = walkGpsDistanceKm(walkGpsPoints);
    const effectiveEndedAt = walkPausedAt || walkEndedAt;
    const gpsDuration = walkGpsDurationMinutes(walkGpsPoints, walkStartedAt, effectiveEndedAt, {
      live: walkGpsWatchId !== null,
      pausedDurationMs: walkPausedDurationMs
    });
    const lastPoint = walkGpsPoints[walkGpsPoints.length - 1] || null;
    const isTracking = walkGpsWatchId !== null;
    const isPaused = Boolean(walkPausedAt) && !isTracking;
    ensureWalkGpsTicker();
    const statusText = walkGpsMessage
      || (isTracking
        ? `Prechádzka práve beží. GPS zbiera body a čas sa počíta automaticky.`
        : isPaused
          ? "Prechádzka je pozastavená. Môžeš fotiť a potom dať Pokračovať."
        : walkGpsPoints.length
          ? `Prechádzka je pripravená na uloženie. Máš ${countedLabel(walkGpsPoints.length, "GPS bod", "GPS body", "GPS bodov")}.`
          : "GPS body sa zatiaľ neukladajú.");
    if (walkGpsStatusEl) {
      walkGpsStatusEl.textContent = statusText;
      walkGpsStatusEl.dataset.tone = walkGpsTone || "neutral";
    }
    if (walkGpsDurationEl) {
      walkGpsDurationEl.textContent = gpsDuration !== null ? formatJournalWalkDuration(gpsDuration) : "Zatiaľ nebeží";
    }
    if (walkGpsDistanceEl) {
      walkGpsDistanceEl.textContent = gpsDistance !== null ? formatJournalWalkDistance(gpsDistance) : "Zatiaľ bez trasy";
    }
    if (walkGpsModeEl) {
      walkGpsModeEl.dataset.state = isTracking ? "live" : isPaused ? "paused" : walkEndedAt ? "ended" : "idle";
      walkGpsModeEl.textContent = isTracking
        ? `Beží od ${formatWalkDateTime(walkStartedAt) || "teraz"}`
        : isPaused
          ? `Pozastavené ${formatWalkDateTime(walkPausedAt) || ""}`.trim()
        : walkEndedAt
          ? `Skončila ${formatWalkDateTime(walkEndedAt) || ""}`.trim()
          : walkStartedAt
            ? `Pripravená od ${formatWalkDateTime(walkStartedAt) || ""}`.trim()
            : "Pripravené";
    }
    if (walkGpsSummaryEl) {
      const pills = [
        walkGpsPoints.length ? countedLabel(walkGpsPoints.length, "GPS bod", "GPS body", "GPS bodov") : "",
        gpsDistance !== null ? formatJournalWalkDistance(gpsDistance) : "",
        gpsDuration !== null ? formatJournalWalkDuration(gpsDuration) : "",
        walkStartedAt ? `Štart ${formatWalkDateTime(walkStartedAt)}` : "",
        walkPausedAt ? `Pauza ${formatWalkDateTime(walkPausedAt)}` : "",
        walkEndedAt ? `Koniec ${formatWalkDateTime(walkEndedAt)}` : "",
        lastPoint && Number.isFinite(Number(lastPoint.accuracyMeters)) ? `Presnosť ±${Math.round(Number(lastPoint.accuracyMeters))} m` : ""
      ].filter(Boolean);
      walkGpsSummaryEl.innerHTML = pills.length
        ? pills.map((item) => `<span class="journal-walk-gps__pill">${escapeHtml(item)}</span>`).join("")
        : "";
      walkGpsSummaryEl.hidden = !pills.length;
    }
    if (walkGpsPointsEl) {
      const previewPoints = walkGpsPoints.slice(-4);
      walkGpsPointsEl.innerHTML = previewPoints.length
        ? previewPoints.map((point, index) => `<span class="journal-walk-gps__point">${escapeHtml(formatWalkGpsPointLabel(point, walkGpsPoints.length - previewPoints.length + index, walkGpsPoints.length))}</span>`).join("")
        : "";
      walkGpsPointsEl.hidden = !previewPoints.length;
    }
    renderWalkGpsLiveMap();
    walkGpsActionButtons.forEach((button) => {
      const action = String(button.getAttribute("data-walk-gps-action") || "").trim();
      if (action === "start") button.disabled = walkGpsBusy || isTracking;
      if (action === "pause") button.disabled = walkGpsBusy || !isTracking;
      if (action === "resume") button.disabled = walkGpsBusy || !isPaused;
      if (action === "stop") button.disabled = walkGpsBusy || (!isTracking && !isPaused);
    });
  };

  const shouldAppendWalkGpsPoint = (nextPoint) => {
    const previousPoint = walkGpsPoints[walkGpsPoints.length - 1] || null;
    if (!previousPoint) return true;
    const distanceKm = walkGpsDistanceKm([previousPoint, nextPoint]) || 0;
    const previousTime = Date.parse(previousPoint.recordedAt || "");
    const nextTime = Date.parse(nextPoint.recordedAt || "");
    const secondsDiff = Number.isFinite(previousTime) && Number.isFinite(nextTime)
      ? Math.abs(nextTime - previousTime) / 1000
      : Number.POSITIVE_INFINITY;
    return distanceKm >= 0.008 || secondsDiff >= 20;
  };

  const appendWalkGpsPoint = (position, source = "gps") => {
    const point = normalizeWalkGpsPoints([{
      latitude: position?.coords?.latitude,
      longitude: position?.coords?.longitude,
      accuracyMeters: position?.coords?.accuracy,
      recordedAt: new Date(position?.timestamp || Date.now()).toISOString(),
      source
    }])[0] || null;
    if (!point) return false;
    if (!shouldAppendWalkGpsPoint(point)) return false;
    walkGpsPoints = [...walkGpsPoints, point];
    walkGpsTone = "good";
    walkGpsMessage = source === "manual"
      ? "Aktuálna poloha sa pridala do trasy."
      : "GPS pridalo ďalší bod trasy.";
    renderWalkGpsState();
    return true;
  };

  const readCurrentGpsPosition = () => new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Toto zariadenie alebo prehliadač teraz nepodporuje GPS polohu."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });
  });

  walkGpsActionButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const action = String(button.getAttribute("data-walk-gps-action") || "").trim();
      try {
        if (action === "stop") {
          stopWalkGpsTracking();
          renderWalkGpsState();
          return;
        }

        if (action === "pause") {
          if (walkGpsWatchId !== null && typeof navigator !== "undefined" && navigator.geolocation) {
            navigator.geolocation.clearWatch(walkGpsWatchId);
          }
          walkGpsWatchId = null;
          if (walkGpsTicker) {
            clearInterval(walkGpsTicker);
            walkGpsTicker = null;
          }
          walkPausedAt = new Date().toISOString();
          walkGpsTone = "good";
          walkGpsMessage = "Prechádzka je pozastavená. Môžeš si odfotiť čo potrebuješ a potom pokračovať.";
          renderWalkGpsState();
          return;
        }

        if (action === "resume") {
          if (!walkStartedAt) {
            walkStartedAt = new Date().toISOString();
          }
          if (walkPausedAt) {
            const pausedSince = Date.parse(walkPausedAt || "");
            if (Number.isFinite(pausedSince)) {
              walkPausedDurationMs += Math.max(0, Date.now() - pausedSince);
            }
            walkPausedAt = "";
          }
          walkGpsBusy = true;
          walkGpsTone = "live";
          walkGpsMessage = "Pokračujem v prechádzke a GPS znovu sleduje trasu.";
          renderWalkGpsState();
          const resumedPosition = await readCurrentGpsPosition();
          appendWalkGpsPoint(resumedPosition, "gps");
          walkGpsWatchId = navigator.geolocation.watchPosition((position) => {
            appendWalkGpsPoint(position, "gps");
          }, (error) => {
            stopWalkGpsTracking({ silent: true });
            walkGpsTone = "danger";
            walkGpsMessage = error?.message
              ? `GPS sa zastavilo: ${error.message}`
              : "GPS sa teraz nepodarilo udržať aktívne.";
            renderWalkGpsState();
          }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 4000
          });
          renderWalkGpsState();
          return;
        }

        walkGpsBusy = true;
        walkGpsTone = "live";
        walkGpsMessage = "Spúšťam prechádzku a GPS sledovanie trasy...";
        renderWalkGpsState();

        if (action === "start") {
          if (typeof navigator === "undefined" || !navigator.geolocation) {
            throw new Error("Toto zariadenie alebo prehliadač teraz nepodporuje GPS polohu.");
          }
          if (walkGpsWatchId !== null) {
            walkGpsMessage = "Prechádzka už práve beží.";
            walkGpsTone = "live";
            renderWalkGpsState();
            return;
          }
          if (!walkStartedAt) {
            walkStartedAt = new Date().toISOString();
          }
          walkPausedAt = "";
          walkPausedDurationMs = 0;
          walkEndedAt = "";
          const initialPosition = await readCurrentGpsPosition();
          appendWalkGpsPoint(initialPosition, "gps");
          walkGpsWatchId = navigator.geolocation.watchPosition((position) => {
            appendWalkGpsPoint(position, "gps");
          }, (error) => {
            stopWalkGpsTracking({ silent: true });
            walkGpsTone = "danger";
            walkGpsMessage = error?.message
              ? `GPS sa zastavilo: ${error.message}`
              : "GPS sa teraz nepodarilo udržať aktívne.";
            renderWalkGpsState();
          }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 4000
          });
          walkGpsTone = "live";
          walkGpsMessage = "Prechádzka beží. GPS sleduje trasu a dĺžka aj čas sa rátajú samy.";
          renderWalkGpsState();
        }
      } catch (error) {
        walkGpsTone = "danger";
        walkGpsMessage = error instanceof Error && error.message
          ? error.message
          : "GPS sa teraz nepodarilo použiť.";
        renderWalkGpsState();
      } finally {
        walkGpsBusy = false;
        renderWalkGpsState();
      }
    });
  });

  const syncVideoUploadStatus = () => {
    if (pendingVideoFile instanceof File && pendingVideoFile.size) {
      setVideoUploadStatus({
        title: "Video je pripravené na uloženie",
        detail: `${pendingVideoFile.name} (${formatReadableFileSize(pendingVideoFile.size)}) čaká na nahratie do cloudu po uložení zápisu.`,
        percent: 8,
        tone: "neutral"
      });
      return;
    }
    if (existingVideoPath || existingVideo) {
      const videoLabel = existingVideoName || "Video je už pripojené k tomuto zápisu.";
      setVideoUploadStatus({
        title: "Video je už pri zápise",
        detail: existingVideoName
          ? `${videoLabel}${existingVideoMimeType ? ` • ${existingVideoMimeType}` : ""}`
          : "Video je už uložené v cloude alebo pripravené na prehratie.",
        percent: 100,
        tone: "good"
      });
      return;
    }
    setVideoUploadStatus({ hidden: true });
  };

  const clearPendingUrls = () => {
    pendingUrls.forEach((url) => URL.revokeObjectURL(url));
    pendingUrls = [];
    if (pendingVideoUrl) {
      URL.revokeObjectURL(pendingVideoUrl);
      pendingVideoUrl = "";
    }
  };

  const renderPreview = () => {
    if (!imagePreviewEl) return;
    clearPendingUrls();
    pendingUrls = pendingFiles.map((file) => URL.createObjectURL(file));
    pendingVideoUrl = pendingVideoFile ? URL.createObjectURL(pendingVideoFile) : "";
    imagePreviewEl.innerHTML = renderJournalComposerImagePreview(existingImages, pendingUrls, existingVideo, pendingVideoUrl);
    imagePreviewEl.hidden = !imagePreviewEl.innerHTML.trim();
    syncVideoUploadStatus();

    imagePreviewEl.querySelectorAll("[data-remove-existing-image]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.removeExistingImage);
        existingImages = existingImages.filter((_, imageIndex) => imageIndex !== index);
        renderPreview();
      });
    });

    imagePreviewEl.querySelectorAll("[data-remove-new-image]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.removeNewImage);
        pendingFiles = pendingFiles.filter((_, fileIndex) => fileIndex !== index);
        renderPreview();
      });
    });

    imagePreviewEl.querySelectorAll("[data-remove-existing-video]").forEach((button) => {
      button.addEventListener("click", () => {
        existingVideo = "";
        existingVideoPath = "";
        existingVideoName = "";
        existingVideoMimeType = "";
        renderPreview();
      });
    });

    imagePreviewEl.querySelectorAll("[data-remove-new-video]").forEach((button) => {
      button.addEventListener("click", () => {
        pendingVideoFile = null;
        renderPreview();
      });
    });
  };

  const selectedJournalCategoryIds = () => linkedCategoryInputs
    .filter((input) => input.checked)
    .map((input) => String(input.value || "").trim())
    .filter(Boolean);

  const syncJournalRelationSummary = () => {
    const linkedCategoryIds = selectedJournalCategoryIds();
    const linkedVarietyId = String(linkedVarietySelect?.value || "").trim();
    if (relationSummary) {
      relationSummary.textContent = relationDisclosureSummaryText(linkedCategoryIds, linkedVarietyId);
    }
    relationDisclosure?.classList.toggle("has-selection", Boolean(linkedCategoryIds.length || linkedVarietyId));
  };

  const renderLinkedVarietyOptions = () => {
    if (!linkedVarietySelect) return;
    const selectedCategoryIds = selectedJournalCategoryIds();
    const previousValue = String(linkedVarietySelect.value || "").trim();

    if (!selectedCategoryIds.length) {
      linkedVarietySelect.innerHTML = '<option value="">Bez karty</option>';
      linkedVarietySelect.value = "";
      if (linkedVarietyWrap) linkedVarietyWrap.hidden = true;
      syncJournalRelationSummary();
      return;
    }

    if (linkedVarietyWrap) linkedVarietyWrap.hidden = false;
    linkedVarietySelect.innerHTML = `<option value="">Bez karty</option>${linkedVarietyOptions(previousValue, selectedCategoryIds)}`;

    if (previousValue) {
      linkedVarietySelect.value = previousValue;
    }
    syncJournalRelationSummary();
  };

  const syncMoodPicker = (selectedValue) => {
    if (!formEl) return;
    formEl.elements.mood.value = selectedValue;
    moodPickerEl?.querySelectorAll("[data-mood-value]").forEach((button) => {
      const isSelected = button.dataset.moodValue === selectedValue;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  };

  const syncEntryTypeUi = () => {
    if (!formEl) return;
    const selectedType = String(formEl.querySelector('input[name="entryType"]:checked')?.value || editingEntry?.entryType || "note").trim() || "note";
    maybeSyncAutoDerivedTitle(selectedType, lastSyncedEntryType);
    lastSyncedEntryType = selectedType;
    const ui = journalEntryTypeUi(selectedType);
    const entryTypeTitleMap = {
      note: editingEntry ? "Upraviť zápis" : "Zápis",
      walk: editingEntry ? "Upraviť prechádzku" : "Prechádzka",
      weather: editingEntry ? "Upraviť počasie a javy" : "Počasie a javy",
      work: editingEntry ? "Upraviť prácu" : "Práca",
      problem: editingEntry ? "Upraviť problém" : "Problém"
    };
    const submitLabelMap = {
      note: editingEntry ? "Uložiť zápis" : "Pridať zápis",
      walk: editingEntry ? "Uložiť prechádzku" : "Pridať prechádzku",
      weather: editingEntry ? "Uložiť počasie a javy" : "Pridať počasie a javy",
      work: editingEntry ? "Uložiť prácu" : "Pridať prácu",
      problem: editingEntry ? "Uložiť problém" : "Pridať problém"
    };
    if (overlayTitleEl) overlayTitleEl.textContent = entryTypeTitleMap[selectedType] || (editingEntry ? "Upraviť zápis" : "Zápis");
    if (submitButton) submitButton.textContent = submitLabelMap[selectedType] || (editingEntry ? "Uložiť zmeny" : "Uložiť zápis");
    if (titleInput) titleInput.placeholder = ui.title;
    if (textInput) textInput.placeholder = ui.text;
    if (placeInput) placeInput.placeholder = ui.place;
    root.querySelectorAll("[data-open-journal-type]").forEach((button) => {
      const isActive = String(button.getAttribute("data-open-journal-type") || "").trim() === selectedType;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    if (walkFieldsEl) walkFieldsEl.hidden = selectedType !== "walk";
    titleFieldSections.forEach((section) => {
      section.hidden = formEl?.dataset.entryMode !== "full" || selectedType !== "note";
    });
    walkAutoHiddenSections.forEach((section) => {
      section.hidden = selectedType === "walk" ? true : formEl?.dataset.entryMode !== "full";
    });
    if (selectedType !== "walk") {
      stopWalkGpsTracking({ silent: true });
      renderWalkGpsState();
    }
  };

  const setEntryMode = (mode) => {
    if (!formEl) return;
    formEl.dataset.entryMode = mode;
    if (modeToggleEl) {
      const isFull = mode === "full";
      modeToggleEl.textContent = isFull ? "Menej možností" : "Rozšírený zápis";
      modeToggleEl.setAttribute("aria-pressed", isFull ? "true" : "false");
    }
    modeSwitchButtons.forEach((button) => {
      const isActive = String(button.dataset.journalOverlayMode || "").trim() === mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    formEl.querySelectorAll("[data-full-only]").forEach((section) => {
      if (section.hasAttribute("data-title-field")) {
        const selectedType = String(formEl.querySelector('input[name="entryType"]:checked')?.value || editingEntry?.entryType || initialEntryType || "note").trim() || "note";
        section.hidden = mode !== "full" || selectedType !== "note";
        return;
      }
      if (section.hasAttribute("data-walk-auto-hidden")) {
        const selectedType = String(formEl.querySelector('input[name="entryType"]:checked')?.value || editingEntry?.entryType || initialEntryType || "note").trim() || "note";
        section.hidden = mode !== "full" || selectedType === "walk";
        return;
      }
      section.hidden = mode !== "full";
    });

    if (advancedDetailsEl) {
      advancedDetailsEl.hidden = mode !== "full";
      advancedDetailsEl.open = mode === "full";
    }
  };

  const renderWeatherHint = async () => {
    if (!weatherMountEl || !dateInput) return;
    const selectedDate = String(dateInput.value || todayISO()).trim() || todayISO();
    let snapshot = null;
    if (selectedDate === todayISO()) {
      snapshot = homeWeatherSnapshot || await loadHomeWeatherSnapshot().catch(() => null);
      if (snapshot) homeWeatherSnapshot = snapshot;
    } else if (editingEntry?.weather) {
      snapshot = editingEntry.weather;
    }
    currentWeatherSnapshot = snapshot || null;
    syncWalkAutoFields();

    weatherMountEl.hidden = true;
    weatherMountEl.innerHTML = "";
  };

  setupCategoryTreePickers(formEl);
  setupJournalTagInput(formEl);
  setupJournalPlaceInput(formEl);
  linkedCategoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
      renderLinkedVarietyOptions();
    });
  });
  linkedVarietySelect?.addEventListener("change", () => {
    syncJournalRelationSummary();
  });
  renderLinkedVarietyOptions();

  imageInput?.addEventListener("change", () => {
    const files = Array.from(imageInput.files || []).filter((file) => file instanceof File && file.size);
    if (!files.length) return;
    pendingFiles = [...pendingFiles, ...files];
    imageInput.value = "";
    renderPreview();
  });

  videoInput?.addEventListener("change", () => {
    const file = Array.from(videoInput.files || []).find((item) => item instanceof File && item.size) || null;
    if (!file) return;
    if (file.size > SUPABASE_VIDEO_FILE_LIMIT_BYTES) {
      alert(`Video je zatiaľ príliš veľké. Skús prosím kratšie video do približne ${formatReadableFileSize(SUPABASE_VIDEO_FILE_LIMIT_BYTES)}.`);
      videoInput.value = "";
      return;
    }
    pendingVideoFile = file;
    videoInput.value = "";
    renderPreview();
  });

  moodPickerEl?.querySelectorAll("[data-mood-value]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextValue = button.dataset.moodValue || "";
      const currentValue = String(formEl.elements.mood.value || "");
      syncMoodPicker(currentValue === nextValue ? "" : nextValue);
    });
  });

  modeToggleEl?.addEventListener("click", () => {
    setEntryMode(formEl?.dataset.entryMode === "full" ? "quick" : "full");
  });
  modeSwitchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = String(button.dataset.journalOverlayMode || "").trim() || "quick";
      setEntryMode(nextMode === "full" ? "full" : "quick");
    });
  });

  root.querySelectorAll("[data-open-journal-type]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!formEl) return;
      const nextType = String(button.getAttribute("data-open-journal-type") || "").trim() || "note";
      const targetInput = [...formEl.querySelectorAll('input[name="entryType"]')]
        .find((input) => String(input.value || "").trim() === nextType);
      if (!targetInput) return;
      if (!targetInput.checked) {
        targetInput.checked = true;
        targetInput.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }
      syncEntryTypeUi();
    });
  });

  formEl?.querySelectorAll('input[name="entryType"]').forEach((input) => {
    input.addEventListener("change", () => {
      syncEntryTypeUi();
    });
  });

  dateInput?.addEventListener("change", () => {
    renderWeatherHint().catch(() => {});
  });

  if (textInput) {
    autoResizeTextarea(textInput);
    textInput.addEventListener("input", () => {
      autoResizeTextarea(textInput);
    });
  }

  titleInput?.addEventListener("input", () => {
    syncTitleAutoDerivedState();
  });

  setEntryMode(defaultEntryMode);
  if (titleInput) {
    titleInput.dataset.autoDerived = String(
      !String(titleInput.value || "").trim()
      || String(titleInput.value || "").trim() === autoJournalTitleForType(initialEntryType, editingEntry?.weather || null)
    );
  }
  syncMoodPicker(editingEntry?.mood || "");
  syncEntryTypeUi();
  renderPreview();
  renderWalkGpsState();
  renderWeatherHint().catch(() => {});
  syncMobileOverlayBottomNavPlacement();

  formEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton?.setAttribute("aria-busy", "true");
    if (submitButton) submitButton.disabled = true;
    try {
      const form = new FormData(formEl);
      const selectedEntryType = String(form.get("entryType") || editingEntry?.entryType || initialEntryType || "note").trim() || "note";

      const newImages = pendingFiles.length
        ? await Promise.all(pendingFiles.map((file) => fileToOptimizedDataUrl(file, 720, 0.68)))
        : [];
      const images = [...existingImages, ...newImages];
      const linkedVarietyId = String(form.get("linkedVarietyId") || "").trim();
      const linkedCategoryIds = form.getAll("linkedCategoryIds").map((value) => String(value || "").trim()).filter(Boolean);
      if (!linkedCategoryIds.length && linkedVarietyId) {
        const inferredCategoryId = state.varieties.find((item) => item.id === linkedVarietyId)?.categoryId || "";
        if (inferredCategoryId) linkedCategoryIds.push(inferredCategoryId);
      }
      const normalizedLinkedCategoryIds = normalizeIdList(linkedCategoryIds);
      const linkedCategoryId = normalizedLinkedCategoryIds[0] || "";
      const selectedDate = String(form.get("date") || todayISO()).trim() || todayISO();
      const selectedTime = String(form.get("time") || timeInput?.value || currentTimeValue()).trim() || currentTimeValue();
      let weatherSnapshot = selectedDate === todayISO()
        ? currentWeatherSnapshot || homeWeatherSnapshot || null
        : editingEntry?.weather || currentWeatherSnapshot || null;

      if (!weatherSnapshot && selectedDate === todayISO()) {
        weatherSnapshot = await loadHomeWeatherSnapshot().catch(() => null);
        if (weatherSnapshot) {
          homeWeatherSnapshot = weatherSnapshot;
          currentWeatherSnapshot = weatherSnapshot;
        }
      }

      const nextEntryId = editingEntry?.id || makeId("journal");
      const walk = selectedEntryType === "walk"
        ? normalizeJournalWalk({
          startPlace: form.get("walkStartPlace"),
          endPlace: form.get("walkEndPlace"),
          startedAt: walkStartedAt,
          endedAt: walkEndedAt || (walkGpsWatchId === null ? walkEndedAt : ""),
          pausedAt: walkPausedAt,
          pausedDurationMs: walkPausedDurationMs,
          distanceKm: walkGpsDistanceKm(walkGpsPoints),
          durationMinutes: walkGpsDurationMinutes(walkGpsPoints, walkStartedAt, walkPausedAt || walkEndedAt || (walkGpsWatchId === null ? walkEndedAt : ""), {
            live: walkGpsWatchId !== null,
            pausedDurationMs: walkPausedDurationMs
          }),
          routePoints: form.get("walkRoutePoints"),
          gpsPoints: walkGpsPoints,
          temperature: form.get("walkTemperature"),
          wind: form.get("walkWind"),
          precipitation: form.get("walkPrecipitation"),
          conditions: form.get("walkConditions")
        }, weatherSnapshot)
        : null;
      const title = String(form.get("title") || "").trim() || (selectedEntryType === "walk"
        ? walkAutoTitle(walk, selectedDate)
        : journalAutoTitle(selectedEntryType, {
          tags: form.get("tags"),
          weatherCondition: weatherSnapshot?.condition || ""
        }));
      let video = existingVideo;
      let videoPath = existingVideoPath;
      let videoName = existingVideoName;
      let videoMimeType = existingVideoMimeType;

      if (pendingVideoFile) {
        setVideoUploadStatus({
          title: "Pripravujem video na nahratie",
          detail: `${pendingVideoFile.name} sa chystá do cloudu.`,
          percent: 16,
          busy: true
        });
        await waitForNextPaint();
        const client = configuredSupabaseClient();
        setVideoUploadStatus({
          title: "Overujem cloud účet",
          detail: "Kontrolujem prihlásenie a cieľ v Supabase.",
          percent: 32,
          busy: true
        });
        await waitForNextPaint();
        const user = await requireSupabaseSessionUser(client);
        setVideoUploadStatus({
          title: "Nahrávam video do cloudu",
          detail: `${pendingVideoFile.name} (${formatReadableFileSize(pendingVideoFile.size)}) sa práve odosiela do Supabase Storage.`,
          percent: 64,
          busy: true
        });
        await waitForNextPaint();
        videoPath = await uploadFileToSupabase(client, {
          userId: user.id,
          entity: "journal",
          clientId: nextEntryId,
          file: pendingVideoFile,
          fileBaseName: "video"
        });
        setVideoUploadStatus({
          title: "Video je v cloude",
          detail: "Dopĺňam cestu videa a ukladám samotný zápis.",
          percent: 86,
          busy: true
        });
        await waitForNextPaint();
        video = await resolveSupabaseStorageImage(client, videoPath);
        videoName = String(pendingVideoFile.name || "").trim();
        videoMimeType = String(pendingVideoFile.type || "").trim();
      }

      const nextEntry = {
        id: nextEntryId,
        title,
        date: selectedEntryType === "walk" && walk?.startedAt
          ? String(walk.startedAt).trim()
          : stampJournalDate(selectedDate, selectedTime, editingEntry?.date || ""),
        text: String(form.get("text") || "").trim(),
        images,
        image: images[0] || "",
        entryType: selectedEntryType,
        tags: normalizeTagList(form.get("tags")),
        phenomena: [],
        linkedCategoryIds: normalizedLinkedCategoryIds,
        linkedCategoryId,
        linkedVarietyId,
        mood: String(form.get("mood") || "").trim(),
        place: String(form.get("place") || "").trim(),
        weather: weatherSnapshot,
        walk,
        video,
        videoPath,
        videoName,
        videoMimeType
      };

      if (editingEntry) {
        const previousJournal = [...state.journal];
        state.journal = state.journal.map((entry) => (String(entry?.id || "") === editingEntry.id ? nextEntry : entry));
        clearPendingUrls();
        if (!persist()) {
          state.journal = previousJournal;
          return;
        }
      } else {
        state.journal.unshift(nextEntry);
        clearPendingUrls();
        if (!persist()) {
          state.journal = state.journal.filter((entry) => entry.id !== nextEntry.id);
          return;
        }
      }

      if (videoPath || video) {
        setVideoUploadStatus({
          title: "Video je pripojené k zápisu",
          detail: videoName
            ? `${videoName} je uložené a pripravené na prehratie.`
            : "Video je uložené a pripravené na prehratie.",
          percent: 100,
          tone: "good"
        });
      }

      stopWalkGpsTracking({ silent: true });
      render();
      openJournalOverlayList();
    } catch (error) {
      setVideoUploadStatus({
        hidden: !pendingVideoFile && !existingVideo && !existingVideoPath,
        title: "Nahratie videa sa nepodarilo",
        detail: error instanceof Error && error.message
          ? error.message
          : "Video sa teraz nepodarilo uložiť. Skús to ešte raz.",
        percent: 100,
        tone: "danger"
      });
      console.error("Uloženie nového denníkového zápisu zlyhalo", error);
      alert(error instanceof Error && error.message ? error.message : "Zápis sa teraz nepodarilo uložiť. Skúsim to opraviť v ďalšom kroku.");
    } finally {
      if (!formEl?.isConnected) stopWalkGpsTracking({ silent: true });
      submitButton?.removeAttribute("aria-busy");
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function forceOpenJournalManager() {
  openJournalOverlayList();
}

window.__openJournalFallback = () => {
  openJournalOverlayList();
  return false;
};

function toolbarSearchElements() {
  return {
    wrap: document.getElementById("toolbar-search"),
    input: document.getElementById("toolbar-search-input"),
    results: document.getElementById("toolbar-search-results")
  };
}

function syncToolbarSearchOverlayPosition() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const { wrap, results } = toolbarSearchElements();
  if (!wrap || !results) return;
  if (!document.body?.classList.contains("app-mobile-shell")) {
    results.style.removeProperty("--toolbar-search-overlay-top");
    results.style.removeProperty("--toolbar-search-overlay-left");
    results.style.removeProperty("--toolbar-search-overlay-width");
    return;
  }

  const rect = wrap.getBoundingClientRect();
  const viewportWidth = Math.max(
    Number(document.documentElement?.clientWidth) || 0,
    Number(window.innerWidth) || 0,
    320
  );
  const horizontalInset = 12;
  const maxWidth = Math.max(180, viewportWidth - (horizontalInset * 2));
  const nextWidth = Math.min(Math.max(Math.round(rect.width), 180), maxWidth);
  const nextLeft = Math.min(
    Math.max(horizontalInset, Math.round(rect.left)),
    Math.max(horizontalInset, viewportWidth - horizontalInset - nextWidth)
  );

  results.style.setProperty("--toolbar-search-overlay-top", `${Math.round(rect.bottom + 8)}px`);
  results.style.setProperty("--toolbar-search-overlay-left", `${nextLeft}px`);
  results.style.setProperty("--toolbar-search-overlay-width", `${nextWidth}px`);
}

function clearToolbarSearch({ keepFocus = false } = {}) {
  const { wrap, input, results } = toolbarSearchElements();
  const clearButton = document.getElementById("toolbar-search-clear");
  toolbarSearchQuery = "";
  toolbarSearchLastResults = [];
  if (input) input.value = "";
  if (clearButton) clearButton.hidden = true;
  if (results) {
    results.hidden = true;
    results.innerHTML = "";
    results.style.removeProperty("--toolbar-search-overlay-top");
    results.style.removeProperty("--toolbar-search-overlay-left");
    results.style.removeProperty("--toolbar-search-overlay-width");
  }
  wrap?.classList.remove("is-open");
  if (!keepFocus) input?.blur();
}

function toolbarSearchMatches(query = "") {
  const normalizedQuery = slugify(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  const scoreText = (value = "") => {
    const normalizedValue = slugify(value);
    if (!normalizedValue) return Infinity;
    if (normalizedValue === normalizedQuery) return 0;
    if (normalizedValue.startsWith(normalizedQuery)) return 1;
    if (normalizedValue.includes(normalizedQuery)) return 2;
    return Infinity;
  };

  const categoryMatches = state.categories
    .map((category) => {
      const name = String(category?.name || "").trim();
      const score = scoreText(name);
      if (!name || !Number.isFinite(score)) return null;
      return {
        kind: "category",
        id: category.id,
        title: name,
        subtitle: category.nodeType === "parent" ? "Kategória" : "Podkategória",
        score
      };
    })
    .filter(Boolean);

  const cardMatches = state.varieties
    .map((item) => {
      const title = entryDisplayName(item);
      const score = scoreText(title);
      if (!title || !Number.isFinite(score)) return null;
      return {
        kind: "card",
        id: item.id,
        title,
        subtitle: categoryName(item.categoryId) || "Karta",
        score
      };
    })
    .filter(Boolean);

  return [...categoryMatches, ...cardMatches]
    .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title, "sk", { sensitivity: "base" }))
    .slice(0, 8);
}

function renderToolbarSearchResults() {
  const { wrap, input, results } = toolbarSearchElements();
  if (!input || !results) return;
  const query = String(input.value || "").trim();
  toolbarSearchQuery = query;
  toolbarSearchLastResults = toolbarSearchMatches(query);

  if (query.length < 2) {
    results.hidden = true;
    results.innerHTML = "";
    wrap?.classList.remove("is-open");
    return;
  }

  if (!toolbarSearchLastResults.length) {
    results.hidden = false;
    results.innerHTML = `<div class="toolbar-search__empty">Nič som nenašla pre „${escapeHtml(query)}“.</div>`;
    wrap?.classList.add("is-open");
    syncToolbarSearchOverlayPosition();
    return;
  }

  results.hidden = false;
  results.innerHTML = toolbarSearchLastResults.map((item, index) => `
    <button class="toolbar-search__item" type="button" data-toolbar-search-kind="${escapeAttribute(item.kind)}" data-toolbar-search-id="${escapeAttribute(item.id)}" data-toolbar-search-index="${index}">
      <span class="toolbar-search__item-main">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.subtitle)}</span>
      </span>
      <span class="toolbar-search__item-badge">${item.kind === "category" ? "Kategória" : "Karta"}</span>
    </button>
  `).join("");
  wrap?.classList.add("is-open");
  syncToolbarSearchOverlayPosition();

  results.querySelectorAll("[data-toolbar-search-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const kind = String(button.getAttribute("data-toolbar-search-kind") || "").trim();
      const id = String(button.getAttribute("data-toolbar-search-id") || "").trim();
      if (!id) return;
      clearToolbarSearch();
      closeToolbarAddMenu();
      if (kind === "category") {
        activeCategoryId = id;
        isFocusedView = true;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const card = state.varieties.find((item) => item.id === id);
      if (card?.categoryId) {
        activeCategoryId = card.categoryId;
        isFocusedView = true;
      }
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      openStoredCardEditor(id);
    });
  });
}

function ensureToolbarSearch() {
  const group = document.querySelector(".menu-toolbar__group--primary");
  if (!group) return null;
  let wrap = document.getElementById("toolbar-search");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toolbar-search";
    wrap.id = "toolbar-search";
    wrap.innerHTML = `
      <label class="toolbar-search__field" for="toolbar-search-input">
        <span class="toolbar-search__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5"></circle>
            <path d="M16 16l4 4"></path>
          </svg>
        </span>
        <input id="toolbar-search-input" type="search" autocomplete="off" spellcheck="false" placeholder="Hľadať kartu alebo kategóriu">
        <button class="toolbar-search__clear" id="toolbar-search-clear" type="button" aria-label="Vymazať hľadanie" hidden>×</button>
      </label>
      <div class="toolbar-search__results" id="toolbar-search-results" hidden></div>
    `;
  }
  const shouldLeadToolbar = Boolean(document.body?.classList.contains("app-mobile-shell"));
  const targetBefore = shouldLeadToolbar ? (group.firstChild || null) : null;
  if (wrap.parentElement !== group) {
    if (shouldLeadToolbar) {
      group.insertBefore(wrap, targetBefore);
    } else {
      group.appendChild(wrap);
    }
  } else if (shouldLeadToolbar && group.firstElementChild !== wrap) {
    group.insertBefore(wrap, group.firstChild || null);
  }

  const input = document.getElementById("toolbar-search-input");
  const clearButton = document.getElementById("toolbar-search-clear");
  const results = document.getElementById("toolbar-search-results");

  if (input && !input.dataset.bound) {
    input.dataset.bound = "true";
    input.addEventListener("input", () => {
      if (clearButton) clearButton.hidden = !String(input.value || "").trim();
      renderToolbarSearchResults();
    });
    input.addEventListener("focus", () => {
      if (String(input.value || "").trim().length >= 2) {
        renderToolbarSearchResults();
      }
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        clearToolbarSearch();
        return;
      }
      if (event.key === "Enter") {
        const firstResult = toolbarSearchLastResults[0];
        if (!firstResult) return;
        event.preventDefault();
        results?.querySelector("[data-toolbar-search-id]")?.click();
      }
    });
  }

  if (clearButton && !clearButton.dataset.bound) {
    clearButton.dataset.bound = "true";
    clearButton.addEventListener("click", () => {
      clearToolbarSearch({ keepFocus: true });
      input?.focus();
    });
  }

  if (input) input.value = toolbarSearchQuery;
  if (clearButton) clearButton.hidden = !toolbarSearchQuery.trim();
  if (document.body?.dataset.toolbarSearchOverlayBound !== "true") {
    document.body.dataset.toolbarSearchOverlayBound = "true";
    window.addEventListener("resize", () => {
      const { results } = toolbarSearchElements();
      if (!results || results.hidden) return;
      syncToolbarSearchOverlayPosition();
    });
    window.addEventListener("scroll", () => {
      const { results } = toolbarSearchElements();
      if (!results || results.hidden) return;
      syncToolbarSearchOverlayPosition();
    }, { passive: true });
  }
  if (group && group.dataset.mobileSearchTapBound !== "true") {
    group.dataset.mobileSearchTapBound = "true";
    group.addEventListener("click", (event) => {
      if (!document.body?.classList.contains("app-mobile-shell")) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(
        ".toolbar-add-menu, #open-main-menu, #toggle-worklog-panel, #toggle-journal-panel, #open-settings-panel, #toggle-mobile-preview, #toggle-weather-sound"
      )) {
        return;
      }
      if (target.closest("#toolbar-search-results, #toolbar-search-clear, .toolbar-search__item")) return;
      if (target.closest("#toolbar-search-input")) return;
      const activeInput = document.getElementById("toolbar-search-input");
      if (!(activeInput instanceof HTMLInputElement)) return;
      activeInput.focus({ preventScroll: true });
      try {
        const caretIndex = String(activeInput.value || "").length;
        activeInput.setSelectionRange(caretIndex, caretIndex);
      } catch (error) {
        // Some mobile browsers do not allow manual caret positioning here.
      }
    });
  }
  renderToolbarSearchResults();
  return wrap;
}

function wireStaticEvents() {
  const settingsPanelToggleEl = ensureSettingsToolbarButton();
  const mobilePreviewToggleEl = ensureMobilePreviewButton();
  const mobileWeatherSoundToggleEl = ensureMobileWeatherSoundButton();

  if (document.body?.dataset.mobilePreviewHostBound !== "true") {
    document.body.dataset.mobilePreviewHostBound = "true";
    window.addEventListener("message", handleDesktopMobilePreviewMessage);
    window.addEventListener("message", handleEmbeddedMobilePreviewCommand);
    window.addEventListener("weatheraudio:statechange", scheduleEmbeddedMobilePreviewMetricsPush);
  }

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      syncFilterButtons();
      if (filterDisclosureEl) filterDisclosureEl.open = false;
      renderCatalog();
    });
  });

  if (undoDeleteEl) {
    undoDeleteEl.addEventListener("click", undoLastDelete);
  }

  if (mobilePreviewToggleEl) {
    mobilePreviewToggleEl.addEventListener("click", () => {
      setMobilePreviewEnabled(!mobilePreviewEnabled);
    });
    syncMobilePreviewClass();
  }

  if (mobileWeatherSoundToggleEl && mobileWeatherSoundToggleEl.dataset.bound !== "true") {
    mobileWeatherSoundToggleEl.dataset.bound = "true";
    mobileWeatherSoundToggleEl.addEventListener("click", (event) => {
      event.preventDefault();
      const nextEnabled = !mobileWeatherSoundEnabled;
      if (nextEnabled) {
        window.weatherAudioEngine?.handleUserActivation?.();
      }
      setMobileWeatherSoundEnabled(nextEnabled);
      setMobileWeatherSoundPanelOpen(false);
    });
    window.weatherAudioEngine?.setEnabled?.(mobileWeatherSoundEnabled);
    syncMobileWeatherSoundButton();
  }

  if (mainMenuQuickEl) {
    mainMenuQuickEl.addEventListener("click", openMainMenuView);
  }

  if (toolbarAddMenuEl && toolbarAddMenuEl.dataset.overlayBound !== "true") {
    toolbarAddMenuEl.dataset.overlayBound = "true";
    toolbarAddMenuEl.addEventListener("toggle", () => {
      syncToolbarAddMenuOverlayState();
      positionToolbarAddMenuOverlay();
    });
  }

  if (addEntryQuickEl) {
    addEntryQuickEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      openJournalComposer();
    });
  }

  if (addCategoryQuickEl) {
    addCategoryQuickEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      openCategoryManager();
    });
  }

  if (worklogPanelToggleEl) {
    worklogPanelToggleEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      openTaskManager();
    });
  }

  if (journalPanelToggleEl) {
    journalPanelToggleEl.addEventListener("click", forceOpenJournalManager);
    journalPanelToggleEl.onclick = () => {
      forceOpenJournalManager();
      return false;
    };
  }

  if (settingsPanelToggleEl) {
    settingsPanelToggleEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      openSettingsManager();
    });
  }

  if (addCardQuickEl) {
    addCardQuickEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      openContextualCardEditor(resolveQuickAddVarietyCategoryId(), "detail");
    });
  }

  if (batchSowingQuickEl) {
    batchSowingQuickEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      const targetCategoryId = resolveBatchSowingCategoryId();
      if (!targetCategoryId) return;
      openBatchSowingManager(targetCategoryId);
    });
  }

  if (batchMoveQuickEl) {
    batchMoveQuickEl.addEventListener("click", () => {
      closeToolbarAddMenu();
      const targetCategoryId = resolveBatchMoveCategoryId();
      if (!targetCategoryId) return;
      openBatchMoveManager(targetCategoryId);
    });
  }

  document.addEventListener("click", (event) => {
    if (!toolbarAddMenuEl?.open) return;
    if (event.target.closest("#toolbar-add-menu")) return;
    if (event.target.closest("#toolbar-add-menu-overlay-host")) return;
    closeToolbarAddMenu();
  });

  document.addEventListener("click", (event) => {
    const searchWrap = document.getElementById("toolbar-search");
    if (!searchWrap) return;
    if (event.target.closest("#toolbar-search")) return;
    const { results } = toolbarSearchElements();
    results?.setAttribute("hidden", "hidden");
    searchWrap.classList.remove("is-open");
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".category-action-disclosure[open]").forEach((disclosure) => {
      if (event.target.closest(".category-action-disclosure") === disclosure) return;
      disclosure.open = false;
    });
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("#toggle-journal-panel, #open-all-journal-from-memories, #open-all-journal, [data-open-home-journal]");
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    closeToolbarAddMenu();
    forceOpenJournalManager();
  }, true);

  detailModal.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  detailModal.addEventListener("close", () => {
    unlockDetailBodyScroll();
    syncMobileOverlayBottomNavPlacement();
    if (!overlayHistoryNavigating) {
      clearOverlayHistory("detail");
      return;
    }
    if (activeOverlayHistoryKind === "detail") activeOverlayHistoryKind = "";
  });

  if (detailModalBackEl) {
    detailModalBackEl.addEventListener("click", () => {
      if (detailModal?.open && typeof detailModal.close === "function") detailModal.close();
    });
  }

  window.addEventListener("popstate", () => {
    if (activeOverlayHistoryKind === "lightbox" && imageLightboxEl?.open) {
      overlayHistoryNavigating = true;
      closeImageLightbox();
      window.setTimeout(() => {
        overlayHistoryNavigating = false;
      }, 0);
      return;
    }
    if (activeOverlayHistoryKind === "journal" && journalOverlayRoot()) {
      overlayHistoryNavigating = true;
      closeJournalOverlay({ fromHistory: true });
      window.setTimeout(() => {
        overlayHistoryNavigating = false;
      }, 0);
      return;
    }
    if (activeOverlayHistoryKind === "detail" && detailModal.open) {
      overlayHistoryNavigating = true;
      activeOverlayHistoryKind = "";
      detailModal.close();
      window.setTimeout(() => {
        overlayHistoryNavigating = false;
      }, 0);
    }
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-date-trigger]");
    if (!trigger) return;
    const input = document.getElementById(trigger.dataset.dateTrigger);
    if (!input) return;
    event.preventDefault();
    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }
    input.focus();
    input.click();
  });

  if (imageLightboxCloseEl) {
    imageLightboxCloseEl.addEventListener("click", closeImageLightbox);
  }

  if (imageLightboxBackEl) {
    imageLightboxBackEl.addEventListener("click", closeImageLightbox);
  }

  if (imageLightboxPrevEl) {
    imageLightboxPrevEl.addEventListener("click", () => stepImageLightbox(-1));
  }

  if (imageLightboxNextEl) {
    imageLightboxNextEl.addEventListener("click", () => stepImageLightbox(1));
  }

  if (imageLightboxEl) {
    imageLightboxEl.addEventListener("click", (event) => {
      if (event.target === imageLightboxEl) closeImageLightbox();
    });
    imageLightboxEl.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeImageLightbox();
    });
    imageLightboxEl.addEventListener("close", () => {
      const fallbackKind = inferVisibleOverlayHistoryKind();
      if (!overlayHistoryNavigating) {
        if (activeOverlayHistoryKind === "lightbox" && typeof window !== "undefined" && window.history?.back) {
          activeOverlayHistoryKind = "";
          overlayHistoryNavigating = true;
          window.history.back();
          window.setTimeout(() => {
            overlayHistoryNavigating = false;
            if (!activeOverlayHistoryKind) {
              activeOverlayHistoryKind = fallbackKind;
            }
          }, 0);
        } else if (activeOverlayHistoryKind === "lightbox") {
          activeOverlayHistoryKind = fallbackKind;
        }
      } else if (activeOverlayHistoryKind === "lightbox") {
        activeOverlayHistoryKind = fallbackKind;
      }

      unlockBodyScroll("lightbox");
      syncMobileOverlayBottomNavPlacement();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!imageLightboxEl || !imageLightboxEl.open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeImageLightbox();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepImageLightbox(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepImageLightbox(1);
    }
  });

}

function syncImageLightbox() {
  if (!imageLightboxEl || !imageLightboxImageEl || !imageLightboxCountEl) return;
  const images = imageLightboxState.images;
  if (!images.length) {
    closeImageLightbox();
    return;
  }

  imageLightboxState.index = Math.max(0, Math.min(imageLightboxState.index, images.length - 1));
  imageLightboxImageEl.src = images[imageLightboxState.index];
  imageLightboxImageEl.alt = `${imageLightboxState.label} ${imageLightboxState.index + 1}`;
  imageLightboxCountEl.textContent = `${imageLightboxState.index + 1}/${images.length}`;
  if (imageLightboxPrevEl) imageLightboxPrevEl.hidden = images.length < 2;
  if (imageLightboxNextEl) imageLightboxNextEl.hidden = images.length < 2;
}

function openImageLightbox(images, startIndex = 0, label = "Fotka") {
  if (!imageLightboxEl) return;
  const validImages = (images || []).filter(Boolean);
  if (!validImages.length) return;
  imageLightboxState.images = validImages;
  imageLightboxState.index = startIndex;
  imageLightboxState.label = label;
  syncImageLightbox();
  if (!imageLightboxEl.open && typeof imageLightboxEl.showModal === "function") {
    pushOverlayHistory("lightbox");
    lockBodyScroll("lightbox");
    imageLightboxEl.showModal();
  }
  syncMobileOverlayBottomNavPlacement();
}

function closeImageLightbox() {
  if (!imageLightboxEl) return;
  if (imageLightboxEl.open && typeof imageLightboxEl.close === "function") {
    imageLightboxEl.close();
  }
}

function stepImageLightbox(direction) {
  const images = imageLightboxState.images;
  if (!images.length || images.length < 2) return;
  imageLightboxState.index = (imageLightboxState.index + direction + images.length) % images.length;
  syncImageLightbox();
}

function render() {
  const safeStep = (label, fn) => {
    try {
      fn();
    } catch (error) {
      console.error(`Render krok zlyhal: ${label}`, error);
    }
  };

  ensureActiveCategory();
  syncMobilePreviewClass();
  closeToolbarAddMenu();
  refreshAutoTasks();
  updateUndoButton();
  updateRestoreResetButton();
  updateMenuVisibility();
  safeStep("vyhľadávanie v toolbare", ensureToolbarSearch);
  safeStep("hlavné menu", renderMainMenu);
  refreshMainMenuWeatherMini().catch(() => {});
  if (!homeWeatherOverview) loadHomeWeatherOverview().catch(() => {});
  safeStep("prehľad práce", renderProgressOverview);
  safeStep("katalóg", renderCatalog);
  safeStep("bočný prehľad", renderOverview);
  safeStep("úlohy", renderTasks);
  safeStep("denník", renderJournal);
  safeStep("spomienky", renderMemories);
  safeStep("insighty", renderInsights);
  safeStep("zvýraznenia", syncOverviewHighlights);
  safeStep("mapy prechádzok", () => hydrateWalkMaps(document));
  syncAuthGate();
  reconcileBodyScrollState();
  syncMainMenuTouchScrollState();
  scheduleEmbeddedMobilePreviewMetricsPush();
}

function renderMainMenu() {
  const grouped = groupedCategories();
  const roots = grouped.map(({ root }) => root);
  const isMobileShell = typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell");
  const isEmbeddedMobilePreview = typeof document !== "undefined" && document.body.classList.contains("app-mobile-preview-embedded");
  const showMobileWeatherDebugPanel = isMobileShell && !isEmbeddedMobilePreview && shouldShowWeatherDebugUi();
  const activeWeatherThemeDebug = loadMobileWeatherThemeDebugOverride();
  const activeWeatherThemeDebugId = activeWeatherThemeDebug?.id || "auto";
  const activeWeatherThemeCloudOverride = loadMobileWeatherThemeCloudOverride();
  const activeWeatherThemePhase = loadMobileWeatherThemePhaseOverride();
  const activeWeatherThemeSeason = loadMobileWeatherThemeSeasonOverride();
  const activeWeatherThemeWindOverride = loadMobileWeatherThemeWindOverride();
  const activeWeatherThemePrecipOverride = loadMobileWeatherThemePrecipOverride();
  const activeWeatherThemeTemperatureOverride = loadMobileWeatherThemeTemperatureOverride();
  let weatherSceneOnlyActive = loadMobileWeatherSceneOnlyPreference();
  const effectiveWeatherWindSpeed = activeWeatherThemeWindOverride === null
    ? (homeWeatherSnapshot
      ? weatherWindSpeedKmh(homeWeatherSnapshot)
      : weatherWindSpeedFallbackForCategory(activeWeatherThemeDebug?.wind || "calm"))
    : activeWeatherThemeWindOverride;
  const effectiveWeatherPrecipitationAmount = activeWeatherThemePrecipOverride === null
    ? (homeWeatherSnapshot ? weatherPrecipitationMm(homeWeatherSnapshot) : 0)
    : activeWeatherThemePrecipOverride;
  const effectiveWeatherTemperature = activeWeatherThemeTemperatureOverride === null
    ? (homeWeatherSnapshot ? (weatherTemperatureC(homeWeatherSnapshot) ?? 16) : 16)
    : activeWeatherThemeTemperatureOverride;
  const weatherWindDebugLabel = activeWeatherThemeWindOverride === null
    ? `Auto · ${Math.round(effectiveWeatherWindSpeed)} km/h · ${mobileWeatherWindLabel(effectiveWeatherWindSpeed)}`
    : `${Math.round(effectiveWeatherWindSpeed)} km/h · ${mobileWeatherWindLabel(effectiveWeatherWindSpeed)}`;
  const weatherPrecipitationDebugLabel = activeWeatherThemePrecipOverride === null
    ? `Auto · ${effectiveWeatherPrecipitationAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(effectiveWeatherPrecipitationAmount)}`
    : `${effectiveWeatherPrecipitationAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(effectiveWeatherPrecipitationAmount)}`;
  const weatherTemperatureDebugLabel = activeWeatherThemeTemperatureOverride === null
    ? `Auto · ${Math.round(effectiveWeatherTemperature)} °C · ${mobileWeatherTemperatureBandLabel(effectiveWeatherTemperature)}`
    : `${Math.round(effectiveWeatherTemperature)} °C · ${mobileWeatherTemperatureBandLabel(effectiveWeatherTemperature)}`;
  const weatherBackgroundDebugState = typeof window !== "undefined" && window.weatherBackgroundEngine?.getDebugState
    ? window.weatherBackgroundEngine.getDebugState()
    : null;
  const weatherBackgroundDebugText = formatWeatherBackgroundDebugText(weatherBackgroundDebugState);
  const weatherAudioDebugMarkup = showMobileWeatherDebugPanel
    ? renderWeatherAudioDebugMarkup(typeof window !== "undefined" && window.weatherAudioEngine?.getState
      ? window.weatherAudioEngine.getState()
      : null)
    : "";
  if (typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell") && loadMobileWeatherSceneOnlyPreference()) {
    saveMobileWeatherSceneOnlyPreference(false);
  }
  weatherSceneOnlyActive = loadMobileWeatherSceneOnlyPreference();
  applyMobileWeatherSceneMode();
  mainMenuEl.innerHTML = `
    <section class="menu-group">
      <div class="home-section__header">
      <div></div>
      </div>
      ${showMobileWeatherDebugPanel ? `
        <details class="weather-theme-debug"${activeWeatherThemeDebugId !== "auto" || activeWeatherThemeCloudOverride !== "" || activeWeatherThemePhase !== "" || activeWeatherThemeSeason !== "" || activeWeatherThemeWindOverride !== null || activeWeatherThemePrecipOverride !== null || activeWeatherThemeTemperatureOverride !== null || weatherSceneOnlyActive ? " open" : ""}>
          <summary class="weather-theme-debug__summary">Test počasia</summary>
          <div class="weather-theme-debug__scene">
            <button
              class="weather-theme-debug__scene-button ${weatherSceneOnlyActive ? "is-active" : ""}"
              type="button"
              data-mobile-weather-scene-toggle="1"
              aria-pressed="${weatherSceneOnlyActive ? "true" : "false"}"
            >${weatherSceneOnlyActive ? "Čisté pozadie je zapnuté" : "Čisté pozadie"}</button>
            <p class="weather-theme-debug__scene-note" data-mobile-weather-scene-note>${weatherSceneOnlyActive ? "Karty a ďalší obsah sú skryté, aby bolo vidno celé pozadie." : "Dočasne skryje karty a obsah, aby si vedela odfotiť celé pozadie."}</p>
          </div>
          <div class="weather-theme-debug__period">
            ${MOBILE_WEATHER_PHASE_DEBUG_OPTIONS.map((item) => `
              <button class="weather-theme-debug__mode ${item.id === activeWeatherThemePhase ? "is-active" : ""}" type="button" data-mobile-weather-phase="${escapeAttribute(item.id)}">${escapeHtml(item.label)}</button>
            `).join("")}
          </div>
          <div class="weather-theme-debug__section-label">Sezóna</div>
          <div class="weather-theme-debug__chips">
            ${MOBILE_WEATHER_SEASON_DEBUG_OPTIONS.map((item) => `
              <button
                class="weather-theme-debug__chip ${item.id === activeWeatherThemeSeason ? "is-active" : ""}"
                type="button"
                data-mobile-weather-season="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>
          <div class="weather-theme-debug__section-label">Oblačnosť</div>
          <div class="weather-theme-debug__chips">
            ${MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS.map((item) => `
              <button
                class="weather-theme-debug__chip ${item.id === activeWeatherThemeCloudOverride ? "is-active" : ""}"
                type="button"
                data-mobile-weather-cloud="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>
          <div class="weather-theme-debug__section-label">Javy</div>
          <div class="weather-theme-debug__chips">
            ${MOBILE_WEATHER_THEME_DEBUG_OPTIONS.map((item) => `
              <button
                class="weather-theme-debug__chip ${item.id === activeWeatherThemeDebugId ? "is-active" : ""}"
                type="button"
                data-mobile-weather-debug="${escapeAttribute(item.id)}"
              >${escapeHtml(item.label)}</button>
            `).join("")}
          </div>
          <div class="weather-theme-debug__wind weather-theme-debug__wind--precip">
            <div class="weather-theme-debug__wind-head">
              <span class="weather-theme-debug__wind-caption">Zrážky</span>
              <span class="weather-theme-debug__wind-value" data-mobile-weather-precip-label>${escapeHtml(weatherPrecipitationDebugLabel)}</span>
            </div>
            <div class="weather-theme-debug__wind-controls">
              <button class="weather-theme-debug__mode ${activeWeatherThemePrecipOverride === null ? "is-active" : ""}" type="button" data-mobile-weather-precip-auto="1">Auto</button>
              <input
                class="weather-theme-debug__range weather-theme-debug__range--precip"
                type="range"
                min="0"
                max="12"
                step="0.2"
                value="${escapeAttribute(effectiveWeatherPrecipitationAmount.toFixed(1))}"
                data-mobile-weather-precip-range
                aria-label="Intenzita zrážok v milimetroch"
              >
            </div>
            <div class="weather-theme-debug__scale" aria-hidden="true">
              <span>0</span>
              <span>2</span>
              <span>6</span>
              <span>12 mm</span>
            </div>
          </div>
          <div class="weather-theme-debug__wind">
            <div class="weather-theme-debug__wind-head">
              <span class="weather-theme-debug__wind-caption">Vietor</span>
              <span class="weather-theme-debug__wind-value" data-mobile-weather-wind-label>${escapeHtml(weatherWindDebugLabel)}</span>
            </div>
            <div class="weather-theme-debug__wind-controls">
              <button class="weather-theme-debug__mode ${activeWeatherThemeWindOverride === null ? "is-active" : ""}" type="button" data-mobile-weather-wind-auto="1">Auto</button>
              <input
                class="weather-theme-debug__range"
                type="range"
                min="0"
                max="70"
                step="2"
                value="${escapeAttribute(Math.round(effectiveWeatherWindSpeed))}"
                data-mobile-weather-wind-range
                aria-label="Sila vetra v kilometroch za hodinu"
              >
            </div>
            <div class="weather-theme-debug__scale" aria-hidden="true">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>70 km/h</span>
            </div>
          </div>
          <div class="weather-theme-debug__wind weather-theme-debug__wind--temp">
            <div class="weather-theme-debug__wind-head">
              <span class="weather-theme-debug__wind-caption">Teplota</span>
              <span class="weather-theme-debug__wind-value" data-mobile-weather-temp-label>${escapeHtml(weatherTemperatureDebugLabel)}</span>
            </div>
            <div class="weather-theme-debug__wind-controls">
              <button class="weather-theme-debug__mode ${activeWeatherThemeTemperatureOverride === null ? "is-active" : ""}" type="button" data-mobile-weather-temp-auto="1">Auto</button>
              <input
                class="weather-theme-debug__range"
                type="range"
                min="-15"
                max="38"
                step="1"
                value="${escapeAttribute(String(Math.round(effectiveWeatherTemperature)))}"
                data-mobile-weather-temp-range
                aria-label="Teplota v stupňoch Celzia"
              >
            </div>
            <div class="weather-theme-debug__scale" aria-hidden="true">
              <span>-15</span>
              <span>0</span>
              <span>20</span>
              <span>38 °C</span>
            </div>
          </div>
          <p class="weather-theme-debug__inline-state" data-mobile-weather-inline-state style="margin:10px 0 0; padding:8px 10px; border-radius:14px; background:rgba(16,22,30,.08); color:#314233; font-size:12px; line-height:1.35; word-break:break-word;">Debug: ${escapeHtml(weatherBackgroundDebugText)}</p>
        </details>
        ${weatherAudioDebugMarkup}
      ` : ""}
      <div class="catalog-grid catalog-grid--main-menu">
        ${roots.map(renderMainMenuCategoryCard).join("")}
      </div>
    </section>
  `;

  mainMenuEl.querySelectorAll("[data-open-main-category]").forEach((item) => {
    item.addEventListener("click", (event) => {
      activeCategoryId = item.dataset.openMainCategory;
      isFocusedView = true;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activeCategoryId = item.dataset.openMainCategory;
        isFocusedView = true;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  mainMenuEl.querySelectorAll("[data-edit-main-category]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openCategoryManager(button.dataset.editMainCategory);
    });
  });

  const hasMobileWeatherDebugControls = Boolean(
    mainMenuEl.querySelector("[data-mobile-weather-debug], [data-mobile-weather-cloud], [data-mobile-weather-phase], [data-mobile-weather-season], [data-mobile-weather-wind-range], [data-mobile-weather-precip-range], [data-mobile-weather-temp-range], [data-mobile-weather-scene-toggle], [data-mobile-weather-audio-panel], [data-mobile-weather-audio-inline]")
  );
  if (!hasMobileWeatherDebugControls) {
    return;
  }

  mainMenuEl.querySelectorAll("[data-mobile-weather-debug]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextId = String(button.getAttribute("data-mobile-weather-debug") || "auto").trim() || "auto";
      saveMobileWeatherThemeDebugOverride(nextId);
      applyMobileWeatherTheme();
      renderMainMenu();
    });
  });

  mainMenuEl.querySelectorAll("[data-mobile-weather-cloud]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextId = String(button.getAttribute("data-mobile-weather-cloud") || "").trim();
      saveMobileWeatherThemeCloudOverride(nextId);
      applyMobileWeatherTheme();
      renderMainMenu();
    });
  });

  mainMenuEl.querySelectorAll("[data-mobile-weather-phase]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextValue = String(button.getAttribute("data-mobile-weather-phase") || "").trim();
      saveMobileWeatherThemePhaseOverride(nextValue);
      applyMobileWeatherTheme();
      renderMainMenu();
    });
  });

  mainMenuEl.querySelectorAll("[data-mobile-weather-season]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextValue = String(button.getAttribute("data-mobile-weather-season") || "").trim();
      saveMobileWeatherThemeSeasonOverride(nextValue);
      applyMobileWeatherTheme();
      renderMainMenu();
    });
  });

  const weatherWindAutoButton = mainMenuEl.querySelector("[data-mobile-weather-wind-auto]");
  const weatherWindRange = mainMenuEl.querySelector("[data-mobile-weather-wind-range]");
  const weatherWindLabel = mainMenuEl.querySelector("[data-mobile-weather-wind-label]");
  const weatherPrecipAutoButton = mainMenuEl.querySelector("[data-mobile-weather-precip-auto]");
  const weatherPrecipRange = mainMenuEl.querySelector("[data-mobile-weather-precip-range]");
  const weatherPrecipLabel = mainMenuEl.querySelector("[data-mobile-weather-precip-label]");
  const weatherTempAutoButton = mainMenuEl.querySelector("[data-mobile-weather-temp-auto]");
  const weatherTempRange = mainMenuEl.querySelector("[data-mobile-weather-temp-range]");
  const weatherTempLabel = mainMenuEl.querySelector("[data-mobile-weather-temp-label]");
  const weatherInlineState = mainMenuEl.querySelector("[data-mobile-weather-inline-state]");
  const weatherSceneToggle = mainMenuEl.querySelector("[data-mobile-weather-scene-toggle]");
  const weatherSceneNote = mainMenuEl.querySelector("[data-mobile-weather-scene-note]");
  const resolveAutoWeatherWindSpeed = () => {
    const liveDebugOverride = loadMobileWeatherThemeDebugOverride();
    return homeWeatherSnapshot
      ? weatherWindSpeedKmh(homeWeatherSnapshot)
      : weatherWindSpeedFallbackForCategory(liveDebugOverride?.wind || "calm");
  };
  const resolveAutoWeatherPrecipitationAmount = () => homeWeatherSnapshot ? weatherPrecipitationMm(homeWeatherSnapshot) : 0;
  const resolveAutoWeatherTemperature = () => homeWeatherSnapshot ? (weatherTemperatureC(homeWeatherSnapshot) ?? 16) : 16;
  const syncWeatherWindUi = (speedValue, isAuto) => {
    const normalizedSpeed = Math.max(0, Math.min(70, Math.round(Number(speedValue) || 0)));
    if (weatherWindRange) weatherWindRange.value = String(normalizedSpeed);
    if (weatherWindLabel) {
      weatherWindLabel.textContent = isAuto
        ? `Auto · ${normalizedSpeed} km/h · ${mobileWeatherWindLabel(normalizedSpeed)}`
        : `${normalizedSpeed} km/h · ${mobileWeatherWindLabel(normalizedSpeed)}`;
    }
    if (weatherWindAutoButton) weatherWindAutoButton.classList.toggle("is-active", isAuto);
  };
  const syncWeatherPrecipUi = (amountValue, isAuto) => {
    const normalizedAmount = Math.max(0, Math.min(12, Math.round((Number(amountValue) || 0) * 10) / 10));
    if (weatherPrecipRange) weatherPrecipRange.value = normalizedAmount.toFixed(1);
    if (weatherPrecipLabel) {
      weatherPrecipLabel.textContent = isAuto
        ? `Auto · ${normalizedAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(normalizedAmount)}`
        : `${normalizedAmount.toFixed(1)} mm · ${mobileWeatherPrecipitationLabel(normalizedAmount)}`;
    }
    if (weatherPrecipAutoButton) weatherPrecipAutoButton.classList.toggle("is-active", isAuto);
  };
  const syncWeatherTempUi = (temperatureValue, isAuto) => {
    const normalizedTemp = Math.max(-15, Math.min(38, Math.round(Number(temperatureValue) || 0)));
    if (weatherTempRange) weatherTempRange.value = String(normalizedTemp);
    if (weatherTempLabel) {
      weatherTempLabel.textContent = isAuto
        ? `Auto · ${normalizedTemp} °C · ${mobileWeatherTemperatureBandLabel(normalizedTemp)}`
        : `${normalizedTemp} °C · ${mobileWeatherTemperatureBandLabel(normalizedTemp)}`;
    }
    if (weatherTempAutoButton) weatherTempAutoButton.classList.toggle("is-active", isAuto);
  };
  const syncWeatherSceneUi = (isActive) => {
    if (weatherSceneToggle) {
      weatherSceneToggle.classList.toggle("is-active", isActive);
      weatherSceneToggle.setAttribute("aria-pressed", isActive ? "true" : "false");
      weatherSceneToggle.textContent = isActive ? "Čisté pozadie je zapnuté" : "Čisté pozadie";
    }
    if (weatherSceneNote) {
      weatherSceneNote.textContent = isActive
        ? "Karty a ďalší obsah sú skryté, aby bolo vidno celé pozadie."
        : "Dočasne skryje karty a obsah, aby si vedela odfotiť celé pozadie.";
    }
  };
  const syncWeatherInlineDebugText = () => {
    if (!weatherInlineState) return;
    const nextDebugState = typeof window !== "undefined" && window.weatherBackgroundEngine?.getDebugState
      ? window.weatherBackgroundEngine.getDebugState()
      : null;
    weatherInlineState.textContent = `Debug: ${formatWeatherBackgroundDebugText(nextDebugState)}`;
  };
  const syncWeatherAudioDebugPanel = () => {
    updateMainMenuWeatherAudioDebugPanel();
  };

  if (weatherWindAutoButton) {
    weatherWindAutoButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveMobileWeatherThemeWindOverride(null);
      applyMobileWeatherTheme();
      syncWeatherWindUi(resolveAutoWeatherWindSpeed(), true);
      syncWeatherInlineDebugText();
      syncWeatherAudioDebugPanel();
    });
  }

  if (weatherWindRange) {
    const applyWeatherWindFromRange = () => {
      const nextSpeed = Math.max(0, Math.min(70, Math.round(Number(weatherWindRange.value) || 0)));
      saveMobileWeatherThemeWindOverride(nextSpeed);
      applyMobileWeatherTheme();
      syncWeatherWindUi(nextSpeed, false);
      syncWeatherInlineDebugText();
      syncWeatherAudioDebugPanel();
    };

    weatherWindRange.addEventListener("input", applyWeatherWindFromRange);
    weatherWindRange.addEventListener("change", applyWeatherWindFromRange);
  }

  if (weatherPrecipAutoButton) {
    weatherPrecipAutoButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveMobileWeatherThemePrecipOverride(null);
      applyMobileWeatherTheme();
      syncWeatherPrecipUi(resolveAutoWeatherPrecipitationAmount(), true);
      syncWeatherInlineDebugText();
      syncWeatherAudioDebugPanel();
    });
  }

  if (weatherPrecipRange) {
    const applyWeatherPrecipFromRange = () => {
      const nextAmount = Math.max(0, Math.min(12, Math.round((Number(weatherPrecipRange.value) || 0) * 10) / 10));
      saveMobileWeatherThemePrecipOverride(nextAmount);
      applyMobileWeatherTheme();
      syncWeatherPrecipUi(nextAmount, false);
      syncWeatherInlineDebugText();
      syncWeatherAudioDebugPanel();
    };

    weatherPrecipRange.addEventListener("input", applyWeatherPrecipFromRange);
    weatherPrecipRange.addEventListener("change", applyWeatherPrecipFromRange);
  }

  if (weatherTempAutoButton) {
    weatherTempAutoButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveMobileWeatherThemeTemperatureOverride(null);
      applyMobileWeatherTheme();
      syncWeatherTempUi(resolveAutoWeatherTemperature(), true);
      syncWeatherInlineDebugText();
      syncWeatherAudioDebugPanel();
    });
  }

  if (weatherTempRange) {
    const applyWeatherTempFromRange = () => {
      const nextTemp = Math.max(-15, Math.min(38, Math.round(Number(weatherTempRange.value) || 0)));
      saveMobileWeatherThemeTemperatureOverride(nextTemp);
      applyMobileWeatherTheme();
      syncWeatherTempUi(nextTemp, false);
      syncWeatherInlineDebugText();
      syncWeatherAudioDebugPanel();
    };

    weatherTempRange.addEventListener("input", applyWeatherTempFromRange);
    weatherTempRange.addEventListener("change", applyWeatherTempFromRange);
  }

  if (weatherSceneToggle) {
    weatherSceneToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const nextValue = !loadMobileWeatherSceneOnlyPreference();
      saveMobileWeatherSceneOnlyPreference(nextValue);
      applyMobileWeatherSceneMode();
      syncWeatherSceneUi(nextValue);
    });
  }

  syncWeatherWindUi(activeWeatherThemeWindOverride ?? resolveAutoWeatherWindSpeed(), activeWeatherThemeWindOverride === null);
  syncWeatherPrecipUi(activeWeatherThemePrecipOverride ?? resolveAutoWeatherPrecipitationAmount(), activeWeatherThemePrecipOverride === null);
  syncWeatherTempUi(activeWeatherThemeTemperatureOverride ?? resolveAutoWeatherTemperature(), activeWeatherThemeTemperatureOverride === null);
  syncWeatherSceneUi(weatherSceneOnlyActive);
  bindMainMenuWeatherAudioControlEvents();
  if (showMobileWeatherDebugPanel) {
    syncWeatherInlineDebugText();
    syncWeatherAudioDebugPanel();
    bindMainMenuWeatherAudioDebugEvents();
    ensureMainMenuWeatherAudioDebugTicker();
  } else {
    stopMainMenuWeatherAudioDebugTicker();
  }
}

function ensureSettingsToolbarButton() {
  const toolbarSlot = document.getElementById("menu-toolbar-settings-slot") || document.querySelector(".utility-bar__settings");
  if (!toolbarSlot) return null;
  const mobilePrimaryGroup = document.querySelector(".menu-toolbar__group--primary");
  const targetParent = document.body?.classList.contains("app-mobile-shell") && mobilePrimaryGroup
    ? mobilePrimaryGroup
    : toolbarSlot;
  let button = document.getElementById("open-settings-panel");
  if (button) {
    if (button.parentElement !== targetParent) {
      targetParent.appendChild(button);
    }
    return button;
  }

  button = document.createElement("button");
  button.className = "button button--ghost button--toolbar-utility";
  button.id = "open-settings-panel";
  button.type = "button";
  button.textContent = "Nastavenia";
  targetParent.appendChild(button);
  return button;
}

function ensureMobilePreviewButton() {
  if (isEmbeddedMobilePreviewMode()) {
    document.getElementById("toggle-mobile-preview")?.remove();
    return null;
  }
  const toolbarSlot = document.getElementById("menu-toolbar-settings-slot") || document.querySelector(".utility-bar__settings");
  if (!toolbarSlot) return null;
  const mobilePrimaryGroup = document.querySelector(".menu-toolbar__group--primary");
  const targetParent = document.body?.classList.contains("app-mobile-shell") && mobilePrimaryGroup
    ? mobilePrimaryGroup
    : toolbarSlot;
  let button = document.getElementById("toggle-mobile-preview");
  if (button) {
    if (button.parentElement !== targetParent) {
      targetParent.appendChild(button);
    }
    button.hidden = false;
    return button;
  }

  button = document.createElement("button");
  button.className = "button button--ghost button--toolbar-utility button--toolbar-preview";
  button.id = "toggle-mobile-preview";
  button.type = "button";
  targetParent.appendChild(button);
  button.hidden = false;
  syncMobilePreviewClass();
  return button;
}

function ensureMobileWeatherSoundButton() {
  const toolbarSlot = document.getElementById("menu-toolbar-settings-slot") || document.querySelector(".utility-bar__settings");
  if (!toolbarSlot) return null;
  const mobilePrimaryGroup = document.querySelector(".menu-toolbar__group--primary");
  const isMobileShell = Boolean(document.body?.classList.contains("app-mobile-shell"));
  const targetParent = isMobileShell && mobilePrimaryGroup ? mobilePrimaryGroup : toolbarSlot;
  let button = document.getElementById("toggle-weather-sound");
  if (button) {
    if (button.parentElement !== targetParent) {
      targetParent.appendChild(button);
    }
    button.hidden = !isMobileShell;
    syncMobileWeatherSoundButton();
    return button;
  }

  button = document.createElement("button");
  button.className = "button button--ghost button--toolbar-utility button--toolbar-sound";
  button.id = "toggle-weather-sound";
  button.type = "button";
  button.hidden = !isMobileShell;
  targetParent.appendChild(button);
  syncMobileWeatherSoundButton();
  return button;
}

function syncMobileWeatherSoundButton() {
  if (typeof document === "undefined") return;
  const button = document.getElementById("toggle-weather-sound");
  if (!button) return;
  const isMobileShell = Boolean(document.body?.classList.contains("app-mobile-shell"));
  button.hidden = !isMobileShell;
  const audioState = window.weatherAudioEngine?.getState?.() || null;
  const supported = audioState?.supported !== false;
  const waitingForGesture = Boolean(
    mobileWeatherSoundEnabled
    && supported
    && audioState?.ready
    && audioState?.running === false
  );
  const soundLabel = mobileWeatherSoundEnabled ? "Zvuk počasia zapnutý" : "Zvuk počasia vypnutý";
  const hint = !supported
    ? "Zvuk nie je v tomto prehliadači podporovaný."
    : waitingForGesture
      ? "Zvuk sa po prvom dotyku alebo kliknutí spustí."
      : mobileWeatherSoundEnabled
        ? "Ťuknutím zvuk vypneš."
        : "Ťuknutím zvuk zapneš.";
  button.textContent = soundLabel;
  button.setAttribute("aria-pressed", mobileWeatherSoundEnabled ? "true" : "false");
  button.removeAttribute("aria-expanded");
  button.setAttribute("aria-label", soundLabel);
  button.setAttribute("title", `${soundLabel}. ${hint}`.trim());
  button.dataset.soundState = mobileWeatherSoundEnabled ? "on" : "off";
  button.dataset.audioReady = waitingForGesture ? "pending" : "ready";
}

function setMobileWeatherSoundPanelOpen(open) {
  mobileWeatherSoundPanelOpen = Boolean(open);
  syncMobileWeatherSoundButton();
  syncMainMenuWeatherAudioControls();
}

function setMobileWeatherSoundEnabled(enabled, { persist = true } = {}) {
  mobileWeatherSoundEnabled = Boolean(enabled);
  if (persist) {
    try {
      localStorage.setItem(MOBILE_WEATHER_SOUND_KEY, mobileWeatherSoundEnabled ? "1" : "0");
    } catch (error) {
      console.warn("Zvuk počasia sa nepodarilo uložiť.", error);
    }
  }
  window.weatherAudioEngine?.setEnabled?.(mobileWeatherSoundEnabled);
  window.weatherAudioEngine?.setMasterVolume?.(mobileWeatherSoundVolume);
  if (!mobileWeatherSoundEnabled) {
    window.weatherAudioEngine?.clear?.();
  }
  applyMobileWeatherTheme();
  syncMobileWeatherSoundButton();
  updateMainMenuWeatherAudioDebugPanel();
  syncMainMenuWeatherAudioControls();
  scheduleEmbeddedMobilePreviewMetricsPush();
}

function setMobileWeatherSoundVolume(value, { persist = true } = {}) {
  mobileWeatherSoundVolume = Math.max(0, Math.min(1, Number(value) || 0));
  if (persist) {
    try {
      localStorage.setItem(MOBILE_WEATHER_SOUND_VOLUME_KEY, String(mobileWeatherSoundVolume));
    } catch (error) {
      console.warn("Hlasitosť zvuku počasia sa nepodarilo uložiť.", error);
    }
  }
  window.weatherAudioEngine?.setMasterVolume?.(mobileWeatherSoundVolume);
  updateMainMenuWeatherAudioDebugPanel();
  syncMainMenuWeatherAudioControls();
  scheduleEmbeddedMobilePreviewMetricsPush();
}

function syncResponsiveToolbarButtonPlacement() {
  if (typeof document === "undefined") return;
  ensureSettingsToolbarButton();
  ensureMobilePreviewButton();
  ensureMobileWeatherSoundButton();
}

function mobileBottomNavMarkup() {
  return `
    <button class="mobile-bottom-nav__button" type="button" data-mobile-bottom-nav="menu">
      <span class="mobile-bottom-nav__icon mobile-bottom-nav__icon--menu" aria-hidden="true"></span>
      <span class="mobile-bottom-nav__label">Menu</span>
    </button>
    <button class="mobile-bottom-nav__button" type="button" data-mobile-bottom-nav="tasks">
      <span class="mobile-bottom-nav__icon mobile-bottom-nav__icon--tasks" aria-hidden="true"></span>
      <span class="mobile-bottom-nav__label">Úlohy</span>
    </button>
    <button class="mobile-bottom-nav__button mobile-bottom-nav__button--camera" type="button" data-mobile-bottom-nav="camera">
      <span class="mobile-bottom-nav__icon mobile-bottom-nav__icon--camera" aria-hidden="true"></span>
      <span class="mobile-bottom-nav__label">Foťák</span>
    </button>
    <button class="mobile-bottom-nav__button" type="button" data-mobile-bottom-nav="journal">
      <span class="mobile-bottom-nav__icon mobile-bottom-nav__icon--journal" aria-hidden="true"></span>
      <span class="mobile-bottom-nav__label">Denník</span>
    </button>
  `;
}

function closeMobileOverlaySurfacesForNavigation() {
  const hasLightbox = Boolean(imageLightboxEl?.open);
  const hasJournal = Boolean(journalOverlayRoot());
  const hasDetail = Boolean(detailModal?.open);
  if (!hasLightbox && !hasJournal && !hasDetail) return;

  skipNextBodyScrollRestore = true;
  overlayHistoryNavigating = true;
  activeOverlayHistoryKind = "";

  if (hasLightbox) closeImageLightbox();
  if (hasJournal) closeJournalOverlay({ fromHistory: true });
  if (hasDetail) detailModal.close();

  window.setTimeout(() => {
    overlayHistoryNavigating = false;
  }, 0);
}

function runMobileBottomNavAction(action = "") {
  const normalizedAction = String(action || "").trim();
  if (!normalizedAction) return;

  closeToolbarAddMenu();
  closeMobileOverlaySurfacesForNavigation();

  const applyAction = () => {
    if (normalizedAction === "menu") {
      openMainMenuView();
      return;
    }
    if (normalizedAction === "tasks") {
      openTaskManager();
      return;
    }
    if (normalizedAction === "camera") {
      openMobileCameraPicker();
      return;
    }
    if (normalizedAction === "journal") {
      forceOpenJournalManager();
    }
  };

  applyAction();
}

function bindMobileBottomNav(slot) {
  if (!slot || slot.dataset.bound === "true") return slot;
  slot.dataset.bound = "true";
  slot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mobile-bottom-nav]");
    if (!button || !slot.contains(button)) return;
    runMobileBottomNavAction(button.getAttribute("data-mobile-bottom-nav") || "");
  });
  return slot;
}

function ensureMobileBottomNavHostSlot(host, { id, className = "" } = {}) {
  if (!host) return null;
  let slot = id ? host.querySelector(`#${id}`) : host.querySelector(".mobile-bottom-nav");
  const nextMarkup = mobileBottomNavMarkup();
  if (!slot) {
    slot = document.createElement("nav");
    slot.className = `mobile-bottom-nav ${className}`.trim();
    if (id) slot.id = id;
    slot.setAttribute("aria-label", "Spodná mobilná navigácia");
    slot.innerHTML = nextMarkup;
  } else if (className) {
    slot.className = `mobile-bottom-nav ${className}`.trim();
  }

  if (slot.innerHTML.trim() !== nextMarkup.trim()) {
    slot.innerHTML = nextMarkup;
  }

  if (slot.parentElement !== host) {
    host.appendChild(slot);
  }

  bindMobileBottomNav(slot);
  return slot;
}

function ensureMobileBottomNavSlot() {
  return ensureMobileBottomNavHostSlot(pageShellEl, { id: "mobile-bottom-nav" });
}

function syncMobileOverlayBottomNavPlacement() {
  if (typeof document === "undefined") return;
  const isMobileShell = document.body.classList.contains("app-mobile-shell");

  if (!isMobileShell) {
    detailModal?.querySelector("#detail-mobile-bottom-nav")?.remove();
    imageLightboxEl?.querySelector("#lightbox-mobile-bottom-nav")?.remove();
    journalOverlayRoot()?.querySelector("#journal-mobile-bottom-nav")?.remove();
    syncMainMenuTouchScrollState();
    return;
  }

  if (detailModal?.open) {
    ensureMobileBottomNavHostSlot(detailModal, {
      id: "detail-mobile-bottom-nav",
      className: "mobile-bottom-nav--overlay mobile-bottom-nav--detail"
    });
  } else {
    detailModal?.querySelector("#detail-mobile-bottom-nav")?.remove();
  }

  const journalRoot = journalOverlayRoot();
  const journalHost = journalRoot?.querySelector(".journal-overlay-shell") || journalRoot;
  if (journalHost) {
    ensureMobileBottomNavHostSlot(journalHost, {
      id: "journal-mobile-bottom-nav",
      className: "mobile-bottom-nav--overlay mobile-bottom-nav--journal"
    });
  }

  if (imageLightboxEl?.open) {
    ensureMobileBottomNavHostSlot(imageLightboxEl, {
      id: "lightbox-mobile-bottom-nav",
      className: "mobile-bottom-nav--overlay mobile-bottom-nav--lightbox"
    });
  } else {
    imageLightboxEl?.querySelector("#lightbox-mobile-bottom-nav")?.remove();
  }

  syncMainMenuTouchScrollState();
}

function syncMobileBottomNavPlacement() {
  if (typeof document === "undefined") return;
  const isMobileShell = document.body.classList.contains("app-mobile-shell");
  if (isMobileShell) {
    if (mainMenuQuickEl && mainMenuQuickOriginalParentEl && mainMenuQuickEl.parentElement !== mainMenuQuickOriginalParentEl) {
      mainMenuQuickOriginalParentEl.appendChild(mainMenuQuickEl);
    }
    if (worklogPanelToggleEl && worklogQuickOriginalParentEl && worklogPanelToggleEl.parentElement !== worklogQuickOriginalParentEl) {
      worklogQuickOriginalParentEl.appendChild(worklogPanelToggleEl);
    }
    if (journalPanelToggleEl && journalQuickOriginalParentEl && journalPanelToggleEl.parentElement !== journalQuickOriginalParentEl) {
      journalQuickOriginalParentEl.appendChild(journalPanelToggleEl);
    }
    document.getElementById("mobile-camera-fab-shell")?.remove();
    ensureMobileBottomNavSlot();
    ensureMobileCameraPicker();
    syncMobileOverlayBottomNavPlacement();
    return;
  }

  if (mainMenuQuickEl) {
    mainMenuQuickEl.hidden = !isFocusedView;
    if (mainMenuQuickOriginalParentEl && mainMenuQuickEl.parentElement !== mainMenuQuickOriginalParentEl) {
      mainMenuQuickOriginalParentEl.appendChild(mainMenuQuickEl);
    }
  }
  if (worklogPanelToggleEl) {
    if (worklogQuickOriginalParentEl && worklogPanelToggleEl.parentElement !== worklogQuickOriginalParentEl) {
      worklogQuickOriginalParentEl.appendChild(worklogPanelToggleEl);
    }
  }
  if (journalPanelToggleEl) {
    if (journalQuickOriginalParentEl && journalPanelToggleEl.parentElement !== journalQuickOriginalParentEl) {
      journalQuickOriginalParentEl.appendChild(journalPanelToggleEl);
    }
  }
  document.getElementById("mobile-bottom-nav")?.remove();
  document.getElementById("mobile-camera-fab-shell")?.remove();
  document.getElementById("mobile-camera-picker-host")?.remove();
  syncMobileOverlayBottomNavPlacement();
}

function lastSuggestedJournalPlace() {
  const latestPlaceEntry = normalizedJournalList().find((entry) => String(entry?.place || "").trim());
  if (latestPlaceEntry?.place) {
    return String(latestPlaceEntry.place || "").trim();
  }
  const weatherPreferences = loadWeatherPreferences();
  const shortWeatherPlace = String(weatherPreferences?.placeLabel || "").split(",")[0].trim();
  return shortWeatherPlace || "";
}

function ensureMobileCameraPicker() {
  if (typeof document === "undefined") return null;
  let host = document.getElementById("mobile-camera-picker-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "mobile-camera-picker-host";
    host.hidden = true;
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = `
      <div class="mobile-camera-picker__scrim" data-mobile-camera-close></div>
      <div class="mobile-camera-picker__sheet" role="dialog" aria-modal="true" aria-label="Pridať médiá">
        <div class="mobile-camera-picker__head">
          <strong>Pridať médiá</strong>
          <span>Vyber, či chceš fotiť, zobrať niečo z mobilu alebo pridať video.</span>
        </div>
        <div class="mobile-camera-picker__actions">
          <button class="mobile-camera-picker__button" type="button" data-mobile-camera-action="capture-photo">Odfotiť</button>
          <button class="mobile-camera-picker__button" type="button" data-mobile-camera-action="pick-photo">Vybrať fotku</button>
          <button class="mobile-camera-picker__button" type="button" data-mobile-camera-action="capture-video">Natočiť video</button>
          <button class="mobile-camera-picker__button" type="button" data-mobile-camera-action="pick-video">Vybrať video</button>
          <button class="mobile-camera-picker__button mobile-camera-picker__button--ghost" type="button" data-mobile-camera-close>Zrušiť</button>
        </div>
      </div>
      <input id="mobile-camera-capture-input" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}" capture="environment" hidden>
      <input id="mobile-camera-gallery-input" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}" hidden>
      <input id="mobile-video-capture-input" type="file" accept="${escapeAttribute(VIDEO_FILE_ACCEPT)}" capture="environment" hidden>
      <input id="mobile-video-gallery-input" type="file" accept="${escapeAttribute(VIDEO_FILE_ACCEPT)}" hidden>
    `;
    document.body.appendChild(host);
  }

  if (host.parentElement !== document.body) {
    document.body.appendChild(host);
  }

  if (host.dataset.bound !== "true") {
    host.dataset.bound = "true";
    const closePicker = () => {
      host.hidden = true;
      host.setAttribute("aria-hidden", "true");
      host.classList.remove("is-open");
    };
    const openInput = (selector) => {
      const input = host.querySelector(selector);
      if (input instanceof HTMLInputElement) {
        input.click();
      }
    };
    host.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      if (target.closest("[data-mobile-camera-close]")) {
        event.preventDefault();
        closePicker();
        return;
      }
      const actionButton = target.closest("[data-mobile-camera-action]");
      if (!(actionButton instanceof HTMLButtonElement)) return;
      event.preventDefault();
      const action = String(actionButton.getAttribute("data-mobile-camera-action") || "").trim();
      if (action === "capture-photo") {
        openInput("#mobile-camera-capture-input");
        return;
      }
      if (action === "pick-photo") {
        openInput("#mobile-camera-gallery-input");
        return;
      }
      if (action === "capture-video") {
        openInput("#mobile-video-capture-input");
        return;
      }
      if (action === "pick-video") {
        openInput("#mobile-video-gallery-input");
      }
    });
    const bindFileInput = (selector, kind = "image") => {
      const input = host.querySelector(selector);
      input?.addEventListener("change", () => {
        const file = Array.from(input.files || []).find((item) => item instanceof File && item.size) || null;
        input.value = "";
        closePicker();
        if (!file) return;
        if (kind === "video") {
          openJournalComposer("", "note", { videoFile: file });
          return;
        }
        openQuickPhotoEntryFlow(file).catch((error) => {
          console.error("Rýchly fotozápis sa teraz nepodarilo otvoriť.", error);
        });
      });
    };
    bindFileInput("#mobile-camera-capture-input", "image");
    bindFileInput("#mobile-camera-gallery-input", "image");
    bindFileInput("#mobile-video-capture-input", "video");
    bindFileInput("#mobile-video-gallery-input", "video");
  }

  return host;
}

function openMobileCameraPicker() {
  const host = ensureMobileCameraPicker();
  if (!host) return;
  host.hidden = false;
  host.setAttribute("aria-hidden", "false");
  host.classList.add("is-open");
}

async function openQuickPhotoEntryFlow(photoFile) {
  if (!(photoFile instanceof File) || !photoFile.size) return;

  let previewUrl = "";
  try {
    previewUrl = await fileToOptimizedDataUrl(photoFile, 1280, 0.78);
  } catch (error) {
    previewUrl = URL.createObjectURL(photoFile);
  }
  if (!previewUrl) {
    previewUrl = URL.createObjectURL(photoFile);
  }
  const shouldRevokePreviewUrl = String(previewUrl || "").startsWith("blob:");
  const suggestedPlace = lastSuggestedJournalPlace();
  const defaultEntryType = "note";
  let currentWeatherSnapshot = homeWeatherSnapshot || null;

  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--editor", "detail-modal--photo-quick");
  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact detail-layout--photo-quick-layout">
      <div class="detail-copy detail-copy--wide detail-copy--editor photo-quick-sheet">
        <div class="detail-copy__headline photo-quick-sheet__headline">
          <div class="photo-quick-sheet__headline-copy">
            <p class="eyebrow">Rýchly fotozápis</p>
            <h3>Pridať moment</h3>
            <p>Fotka je pripravená. Doplň len krátku poznámku, typ a miesto.</p>
          </div>
          <div class="detail-copy__actions">
            <button class="button" type="submit" form="quick-photo-entry-form">Uložiť</button>
          </div>
        </div>
        <form id="quick-photo-entry-form" class="detail-form detail-form--editor photo-quick-sheet__form">
          <div class="photo-quick-sheet__media">
            <img src="${escapeAttribute(previewUrl)}" alt="Nová fotka do denníka">
          </div>
          <div class="photo-quick-sheet__weather" id="quick-photo-weather" hidden></div>
          <div class="photo-quick-sheet__core">
            <div class="journal-entry-type-field photo-quick-sheet__type">
              <p class="journal-entry-type-field__label">Typ zápisu</p>
              <div class="choice-group choice-group--compact-meta choice-group--journal-entry-type">
                ${singleChoiceChipOptions("entryType", JOURNAL_ENTRY_TYPE_OPTIONS, defaultEntryType)}
              </div>
            </div>
            <label class="field-block field-block--full photo-quick-sheet__field">
              <span>Poznámka</span>
              <textarea name="text" rows="3" placeholder="Krátko, čo sa stalo alebo čo si si všimla..."></textarea>
            </label>
            <label class="field-block field-block--full photo-quick-sheet__field">
              <span>Miesto</span>
              <input name="place" type="text" placeholder="Miesto zápisu" value="${escapeAttribute(suggestedPlace)}">
              <div class="journal-tag-picker" data-journal-place-picker hidden></div>
            </label>
          </div>
        </form>
      </div>
    </div>
  `;

  const formEl = document.getElementById("quick-photo-entry-form");
  const placeInput = formEl?.elements.place;
  const weatherMountEl = document.getElementById("quick-photo-weather");
  const textInput = formEl?.elements.text;

  const cleanupQuickPhotoFlow = () => {
    if (shouldRevokePreviewUrl && previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  detailModal.addEventListener("close", cleanupQuickPhotoFlow, { once: true });

  const renderWeatherSummary = (snapshot) => {
    if (!weatherMountEl) return;
    if (!snapshot) {
      weatherMountEl.hidden = true;
      weatherMountEl.innerHTML = "";
      return;
    }
    weatherMountEl.hidden = false;
    const shortPlace = String(snapshot.placeLabel || "").split(",")[0].trim() || snapshot.placeLabel || "Počasie";
    const observed = String(snapshot.observedAt || "").trim();
    weatherMountEl.innerHTML = `
      <div class="photo-quick-sheet__weather-card">
        <span class="photo-quick-sheet__weather-icon" aria-hidden="true">${escapeHtml(weatherIconSymbol(snapshot))}</span>
        <div class="photo-quick-sheet__weather-copy">
          <strong>${escapeHtml([snapshot.temperature, snapshot.condition].filter(Boolean).join(" • ") || "Počasie sa doplnilo automaticky")}</strong>
          <span>${escapeHtml([shortPlace, observed].filter(Boolean).join(" • "))}</span>
        </div>
      </div>
    `;
  };

  const fillWeatherSnapshot = async () => {
    currentWeatherSnapshot = homeWeatherSnapshot || await loadHomeWeatherSnapshot().catch(() => null);
    renderWeatherSummary(currentWeatherSnapshot);
  };

  setupJournalPlaceInput(formEl);

  if (textInput) {
    textInput.focus();
  }

  fillWeatherSnapshot().catch(() => {});

  formEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(formEl);
    const selectedEntryType = String(form.get("entryType") || defaultEntryType).trim() || defaultEntryType;
    const optimizedImage = await fileToOptimizedDataUrl(photoFile, 720, 0.72);
    const linkedCategoryIds = activeCategoryId ? normalizeIdList([activeCategoryId]) : [];
    const linkedCategoryId = linkedCategoryIds[0] || "";
    const weatherSnapshot = currentWeatherSnapshot || homeWeatherSnapshot || await loadHomeWeatherSnapshot().catch(() => null);
    const entry = normalizeJournalEntry({
      id: makeId("journal"),
      title: journalAutoTitle(selectedEntryType, {
        weatherCondition: weatherSnapshot?.condition || ""
      }),
      date: stampJournalDate(todayISO(), currentTimeValue()),
      text: String(form.get("text") || "").trim(),
      images: [optimizedImage],
      image: optimizedImage,
      entryType: selectedEntryType,
      tags: [],
      linkedCategoryIds,
      linkedCategoryId,
      linkedVarietyId: "",
      mood: "",
      place: String(form.get("place") || "").trim(),
      weather: weatherSnapshot
    }, state.varieties);

    state.journal.unshift(entry);
    if (!persist()) {
      state.journal = state.journal.filter((item) => item.id !== entry.id);
      return;
    }
    render();
    if (detailModal?.open && typeof detailModal.close === "function") {
      detailModal.close();
    }
  });

  openDetailModalDialog();
}

function ensureMobileWeatherToolbarSlot() {
  const contentShell = utilityBarEl?.parentElement;
  if (!utilityBarEl || !contentShell) return null;
  let slot = document.getElementById("mobile-toolbar-weather-slot");
  if (!slot) {
    slot = document.createElement("div");
    slot.className = "mobile-toolbar-weather-slot";
    slot.id = "mobile-toolbar-weather-slot";
  }
  const targetSibling = utilityBarEl.nextSibling;
  if (slot.parentElement !== contentShell || slot.previousSibling !== utilityBarEl) {
    contentShell.insertBefore(slot, targetSibling);
  }
  return slot;
}

function syncMobileWeatherMiniPlacement() {
  if (typeof document === "undefined" || !heroWeatherWrapEl || !heroWeatherOriginalParentEl) return;
  const isMobileShell = document.body.classList.contains("app-mobile-shell");
  if (isMobileShell) {
    const slot = ensureMobileWeatherToolbarSlot();
    if (slot && heroWeatherWrapEl.parentElement !== slot) {
      slot.appendChild(heroWeatherWrapEl);
    }
    return;
  }
  if (heroWeatherWrapEl.parentElement !== heroWeatherOriginalParentEl) {
    heroWeatherOriginalParentEl.appendChild(heroWeatherWrapEl);
  }
  document.getElementById("mobile-toolbar-weather-slot")?.remove();
}

function renderProgressOverview() {
  if (!progressOverviewEl) return;
  if (sowingTipInterval) {
    clearInterval(sowingTipInterval);
    sowingTipInterval = null;
  }

  const tasks = combinedTasks();
  const completedTasks = tasks.filter((item) => item.done).length;
  const openTaskItems = tasks.filter((item) => !item.done);
  const openTasks = openTaskItems.length;
  const overdueTasks = openTaskItems.filter((item) => item.date && item.date < todayISO()).length;
  const dueNowTasks = sortTasks(openTaskItems.filter((task) => task.date && task.date <= todayISO()));
  const undatedTasks = sortTasks(openTaskItems.filter((task) => !task.date));
  const upcomingTasks = sortTasks(openTaskItems.filter((task) => task.date && task.date > todayISO()));
  const taskPreview = [...dueNowTasks, ...undatedTasks, ...upcomingTasks].slice(0, 3);
  const taskPreviewEmptyText = openTasks
    ? "Zatiaľ tu nemáš žiadne úlohy na dnes ani po termíne."
    : "Zatiaľ tu nemáš žiadne úlohy.";
  const taskPercent = percent(completedTasks, tasks.length || 0);
  const stressPercent = percent(overdueTasks, openTasks || 0);
  const taskExtraHtml = `
    <p class="progress-card__status ${overdueTasks ? "progress-card__status--danger" : "progress-card__status--good"}">
      ${escapeHtml(overdueTasks ? `${overdueTasks} ${overdueTasks === 1 ? "vec má termín pred dneškom." : "veci majú termín pred dneškom."}` : "Zatiaľ nič nehorí!")}
    </p>
    <div class="progress-card__submetric">
      <div class="progress-bar ${overdueTasks ? "progress-bar--danger" : "progress-bar--good"}">
        <span style="width:${stressPercent}%"></span>
      </div>
    </div>
    <div class="progress-card__task-stack">
      ${taskPreview.length
        ? taskPreview.map(renderTaskSidebarCard).join("")
        : `<div class="empty-state empty-state--compact">${escapeHtml(taskPreviewEmptyText)}</div>`}
      ${openTasks ? `<button class="button button--ghost mini-list__more" type="button" id="open-all-tasks">Zobraziť všetky úlohy (${openTasks})</button>` : ""}
    </div>
  `;
  progressOverviewEl.innerHTML = `
    ${progressCard(
      "Plán práce",
      `${countedLabel(completedTasks, "úloha hotová", "úlohy hotové", "úloh hotových")}, ${openTasks} ešte čaká.`,
      taskPercent,
      "good",
      taskExtraHtml
    )}
  `;

  const openAllTasksButton = document.getElementById("open-all-tasks");
  if (openAllTasksButton) {
    openAllTasksButton.addEventListener("click", () => openTaskManager());
  }

  bindTaskActions(progressOverviewEl);
}

function setupSowingTipMarquee() {
  const marquee = document.getElementById("sowing-tip-marquee");
  if (!marquee) return;

  const slides = [...marquee.querySelectorAll(".progress-card__tip-slide")];
  if (!slides.length) return;

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === 0);
  });

  if (slides.length < 2) return;

  let activeIndex = 0;
  sowingTipInterval = window.setInterval(() => {
    slides[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("is-active");
  }, 3600);
}

function renderCatalog() {
  if (!isFocusedView) {
    renderHomeDashboard();
    return;
  }

  const category = currentCategory();
  if (!category) {
    catalogEl.innerHTML = '<div class="empty-state">Najprv si vytvor kategóriu.</div>';
    return;
  }

  const childCategories = childCategoriesOf(category.id);
  const varieties = filteredVarietiesForCurrentCategory();
  const scopedCategoryVarieties = category.nodeType === "parent" ? [] : varietiesInCategoryTree(category.id);
  const batchCandidates = varietiesInCategoryTree(category.id).filter(isDetailEntry);
  const scopedPlantVarieties = scopedCategoryVarieties.filter((item) => cardType(item) === "variety" && isDetailEntry(item));
  const sownCount = scopedPlantVarieties.filter((item) => item.sowedAt).length;
  const topCount = scopedPlantVarieties.filter((item) => item.top).length;
  const avoidCount = scopedPlantVarieties.filter((item) => item.avoidNextYear).length;
  const neverGrownCount = scopedPlantVarieties.filter((item) => item.neverGrown).length;
  const hybridCount = scopedPlantVarieties.filter((item) => inferBreedingType(item) === "hybrid").length;
  const openPollinatedCount = scopedPlantVarieties.filter((item) => inferBreedingType(item) === "open").length;
  const activePlaceTags = PLACE_OPTIONS
    .map((option) => ({
      ...option,
      count: scopedPlantVarieties.filter((item) => normalizePlaceList(item.places?.length ? item.places : item.place).includes(option.value)).length
    }))
    .filter((option) => option.count);
  const inheritedNotes = categoryDisplayNotes(category.id);
  const inheritedSowingWindow = categoryDisplaySowingWindow(category.id);
  const categoryLineage = new Set([category.id, ...categoryAncestorIds(category)]);
  const showBreedingChips = categoryLineage.has("root-zahrada");
  const breadcrumb = categoryBreadcrumb(category.id);
  const previousCategoryId = breadcrumb.length > 1 ? breadcrumb[breadcrumb.length - 2].id : null;
  const childLabel = category.nodeType === "parent" ? "Kategórie v tejto sekcii" : "Podradené kategórie";
  const childEmpty = category.nodeType === "parent"
    ? "V tejto sekcii ešte nie sú ďalšie kategórie. Klikni na Pridať podradenú kategóriu."
    : "Pod touto kategóriou ešte nie sú ďalšie vetvy. Klikni na Pridať podradenú kategóriu.";
  const varietyEmpty = category.nodeType === "parent"
    ? "Karty patria skôr pod konkrétne kategórie. Najprv otvor alebo vytvor podradenú kategóriu."
    : "V tejto kategórii ešte nie sú karty. Klikni na Pridať kartu.";
  const categoryManageMarkup = `
      <details class="category-action-disclosure category-action-disclosure--inline category-panel__manage">
        <summary class="button button--soft category-action-disclosure__summary">Správa kategórie</summary>
        <section class="category-action-panel category-action-panel--inline">
          <div class="category-action-panel__row category-action-panel__row--category">
            <button class="button button--soft category-action-panel__button category-action-panel__button--manage" type="button" id="edit-category">Upraviť kategóriu</button>
            <button class="button button--soft category-action-panel__button category-action-panel__button--structure" type="button" id="add-child-category">Pridať podradenú kategóriu</button>
          </div>
          <div class="category-action-panel__row category-action-panel__row--entries">
            <button class="button category-action-panel__button category-action-panel__button--detail" type="button" id="add-detail-entry">Pridať kartu</button>
            <button class="button button--soft category-action-panel__button category-action-panel__button--gallery" type="button" id="add-gallery-entry">Pridať galériu</button>
            <button class="button button--soft category-action-panel__button category-action-panel__button--sowing" type="button" id="sow-category-entries">Hromadný výsev</button>
            <button class="button button--soft category-action-panel__button category-action-panel__button--move" type="button" id="move-category-entries">Hromadný presun kariet</button>
          </div>
        </section>
      </details>
    `;

  catalogEl.innerHTML = `
        <div class="category-shell">
          <div class="category-shell__nav category-shell__nav--compact">
            <div class="breadcrumb breadcrumb--compact">
              <button class="breadcrumb__item breadcrumb__item--menu is-ancestor" type="button" data-open-main-menu-filter>
                Hlavné menu
              </button>
              ${breadcrumb.map((item, index) => `
              <button class="breadcrumb__item ${index < breadcrumb.length - 1 ? "is-ancestor" : ""} ${index === breadcrumb.length - 1 ? "is-current" : ""}" type="button" data-open-category="${item.id}">
                ${escapeHtml(item.name)}
              </button>
            `).join("")}
            </div>
        </div>
        ${isFocusedView ? `
        <section class="category-panel category-panel--summary category-panel--${category.nodeType === "parent" ? "section" : "kind"}">
        <div class="category-panel__hero">
          <div class="category-panel__intro">
            <div class="category-panel__intro-copy">
              <div class="category-panel__title-row">
                <h3>${escapeHtml(category.name)}${scopedCategoryVarieties.length ? ` <span class="category-panel__title-count">(${scopedCategoryVarieties.length})</span>` : ""}</h3>
                ${inheritedSowingWindow ? `<div class="category-panel__hero-side"><span class="tag category-panel__hero-tag">Odporúčaný výsev: ${escapeHtml(inheritedSowingWindow)}</span></div>` : ""}
              </div>
              ${inheritedNotes ? `<p class="category-panel__notes">${escapeHtml(inheritedNotes)}</p>` : ""}
            </div>
          </div>
          ${categoryManageMarkup}
      </div>
        <div class="category-panel__chips category-panel__chips--actions">
        ${sownCount ? `<button class="tag tag--button tag--button-sown" type="button" id="open-category-sown">${sownCount} vysiate</button>` : ""}
        ${topCount ? `<button class="tag tag--button tag--button-top" type="button" id="open-category-top">${topCount} top</button>` : ""}
        ${avoidCount ? `<button class="tag tag--button tag--button-avoid" type="button" id="open-category-avoid">${avoidCount} neodporúčam</button>` : ""}
        ${neverGrownCount ? `<button class="tag tag--button tag--button-never-grown" type="button" id="open-category-never-grown">${neverGrownCount} ešte som nepestovala</button>` : ""}
        ${showBreedingChips && hybridCount ? `<button class="tag tag--button tag--button-hybrid" type="button" id="open-category-hybrid">${hybridCount} F1</button>` : ""}
        ${showBreedingChips && openPollinatedCount ? `<button class="tag tag--button tag--button-open" type="button" id="open-category-open-pollinated">${openPollinatedCount} nehybridná</button>` : ""}
        ${activePlaceTags.map((option) => `<button class="tag tag--button tag--button-place" type="button" data-open-category-place="${option.value}">${option.count} ${escapeHtml(option.label)}</button>`).join("")}
      </div>
    </section>
        ` : ""}
        ${childCategories.length ? `
          <section class="subcatalog subcatalog--overview">
            <div class="catalog-grid catalog-grid--subcategories">
              ${childCategories.map(renderChildCategoryCard).join("")}
            </div>
          </section>
        ` : ""}
    </div>
      ${varieties.length ? `
        <section class="subcatalog">
          <div class="catalog-grid catalog-grid--varieties">
            ${varieties.map(renderVarietyCard).join("")}
          </div>
        </section>
      ` : ""}
    `;

  syncCatalogCardImagePresentation(catalogEl);
  if (typeof window !== "undefined") {
    window.requestAnimationFrame(() => {
      if (!document.body.classList.contains("app-mobile-shell")) return;
      const compactBreadcrumb = catalogEl.querySelector(".breadcrumb--compact");
      const currentCrumb = compactBreadcrumb?.querySelector(".breadcrumb__item.is-current");
      if (!compactBreadcrumb || !currentCrumb) return;
      const fitsFully = compactBreadcrumb.scrollWidth <= compactBreadcrumb.clientWidth + 8;
      const targetLeft = fitsFully
        ? 0
        : Math.max(
          0,
          Math.min(
            currentCrumb.offsetLeft - 14,
            Math.max(0, compactBreadcrumb.scrollWidth - compactBreadcrumb.clientWidth)
          )
        );
      compactBreadcrumb.scrollTo({ left: targetLeft });
    });
  }

  const editCategoryButton = document.getElementById("edit-category");
  if (editCategoryButton) editCategoryButton.addEventListener("click", () => openCategoryManager(category.id));

  const addChildCategoryButton = document.getElementById("add-child-category");
  if (addChildCategoryButton) addChildCategoryButton.addEventListener("click", () => openCategoryManager(null, category.id));

  const addDetailEntryButton = document.getElementById("add-detail-entry");
  if (addDetailEntryButton) addDetailEntryButton.addEventListener("click", () => openContextualCardEditor(category.id, "detail"));

  const addGalleryEntryButton = document.getElementById("add-gallery-entry");
  if (addGalleryEntryButton) addGalleryEntryButton.addEventListener("click", () => openVarietyEditor(null, category.id, "gallery"));

  const sowCategoryEntriesButton = document.getElementById("sow-category-entries");
  if (sowCategoryEntriesButton) sowCategoryEntriesButton.addEventListener("click", () => openBatchSowingManager(category.id));

  const moveCategoryEntriesButton = document.getElementById("move-category-entries");
  if (moveCategoryEntriesButton) moveCategoryEntriesButton.addEventListener("click", () => openBatchMoveManager(category.id));

  const openCategorySownButton = document.getElementById("open-category-sown");
  if (openCategorySownButton) {
    openCategorySownButton.addEventListener("click", () => {
      openVarietyOverviewModal({
        title: `Vysiate v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => item.sowedAt),
        emptyMessage: "V tejto kategórii zatiaľ nemáš nič vysiate.",
        detailBuilder: (item) => formatDate(item.sowedAt)
      });
    });
  }

  const openCategoryTopButton = document.getElementById("open-category-top");
  if (openCategoryTopButton) {
    openCategoryTopButton.addEventListener("click", () => {
      openVarietyOverviewModal({
        title: `Top odrody v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => item.top),
        emptyMessage: "V tejto kategórii zatiaľ nemáš žiadne top odrody.",
        detailBuilder: (item) => `${categoryName(item.categoryId)}${inferBreedingType(item) === "hybrid" ? " • F1" : ""}`
      });
    });
  }

  const openCategoryAvoidButton = document.getElementById("open-category-avoid");
  if (openCategoryAvoidButton) {
    openCategoryAvoidButton.addEventListener("click", () => {
      openVarietyOverviewModal({
        title: `Neodporúčam v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => item.avoidNextYear),
        emptyMessage: "V tejto kategórii zatiaľ nemáš nič označené ako neodporúčam.",
        detailBuilder: (item) => `${categoryName(item.categoryId)}${inferBreedingType(item) === "hybrid" ? " • F1" : ""}`
      });
    });
  }

  const openCategoryNeverGrownButton = document.getElementById("open-category-never-grown");
  if (openCategoryNeverGrownButton) {
    openCategoryNeverGrownButton.addEventListener("click", () => {
      openVarietyOverviewModal({
        title: `Ešte som nepestovala v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => item.neverGrown),
        emptyMessage: "V tejto kategórii zatiaľ nemáš nič označené ako ešte som nepestovala.",
        detailBuilder: (item) => `${categoryName(item.categoryId)}${inferBreedingType(item) === "hybrid" ? " • F1" : ""}`
      });
    });
  }

  const openCategoryOpenPollinatedButton = document.getElementById("open-category-open-pollinated");
  if (openCategoryOpenPollinatedButton) {
    openCategoryOpenPollinatedButton.addEventListener("click", () => {
      openVarietyOverviewModal({
        title: `Nehybridné v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => inferBreedingType(item) === "open"),
        emptyMessage: "V tejto kategórii zatiaľ nemáš nič označené ako nehybridné.",
        detailBuilder: (item) => categoryName(item.categoryId)
      });
    });
  }

  const openCategoryHybridButton = document.getElementById("open-category-hybrid");
  if (openCategoryHybridButton) {
    openCategoryHybridButton.addEventListener("click", () => {
      openVarietyOverviewModal({
        title: `Hybridné F1 v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => inferBreedingType(item) === "hybrid"),
        emptyMessage: "V tejto kategórii zatiaľ nemáš nič označené ako hybridnú F1.",
        detailBuilder: (item) => categoryName(item.categoryId)
      });
    });
  }

  catalogEl.querySelectorAll("[data-open-category-place]").forEach((button) => {
    button.addEventListener("click", () => {
      const placeValue = button.dataset.openCategoryPlace;
      const placeOption = PLACE_OPTIONS.find((item) => item.value === placeValue);
      if (!placeOption) return;
      openVarietyOverviewModal({
        title: `${placeOption.label} v kategórii ${category.name}`,
        items: scopedPlantVarieties.filter((item) => normalizePlaceList(item.places?.length ? item.places : item.place).includes(placeValue)),
        emptyMessage: `V tejto kategórii zatiaľ nemáš nič označené ako ${placeOption.label.toLowerCase()}.`,
        detailBuilder: (item) => `${categoryName(item.categoryId)}${inferBreedingType(item) === "hybrid" ? " • F1" : ""}`
      });
    });
  });

  catalogEl.querySelectorAll("[data-open-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategoryId = button.dataset.openCategory;
      isFocusedView = true;
      render();
    });
  });

  catalogEl.querySelectorAll('.catalog-card--child[data-open-category][role="button"]').forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      activeCategoryId = card.dataset.openCategory;
      isFocusedView = true;
      render();
    });
  });

  catalogEl.querySelectorAll("[data-open-main-menu-filter]").forEach((button) => {
    button.addEventListener("click", openMainMenuView);
  });

  catalogEl.querySelectorAll("[data-open-variety]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openStoredCardEditor(button.dataset.openVariety);
    });
  });

  catalogEl.querySelectorAll(".catalog-card--clickable[data-open-variety]").forEach((card) => {
    card.addEventListener("click", () => openStoredCardEditor(card.dataset.openVariety));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStoredCardEditor(card.dataset.openVariety);
      }
    });
  });

  catalogEl.querySelectorAll("[data-stop-card-open]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    item.addEventListener("keydown", (event) => {
      event.stopPropagation();
    });
  });
}

function renderHomeDashboard() {
  const entries = journalEntriesNewestFirst();
  const latestEntry = entries[0] || null;
  const latestPhotos = recentGalleryItems();
  const seasonalMemory = seasonalMemoryCandidates()[0] || null;
  const thingRecords = buildThingRecords().slice(0, 6);
  const problemEntries = entries.filter((entry) => entry.entryType === "problem").slice(0, 2);
  const weatherSnapshot = homeWeatherSnapshot || latestEntry?.weather || seasonalMemory?.weather || null;
  const latestPhotoImages = latestPhotos.map((item) => item.image);

  catalogEl.innerHTML = `
    <div class="home-board">
      <section class="home-hero">
        <div class="home-hero__copy">
          <p class="eyebrow">Dnes</p>
          <h2>Môj pokojný priestor pre záhradu, prírodu a spomienky</h2>
          <p>Staré jadro ostáva zachované, len sa okolo neho skladá osobnejší domovský pohľad s denníkom, galériou, témami a sezónou.</p>
        </div>
        <div class="home-hero__actions">
          <button class="button" type="button" data-open-home-add>Pridať zápis</button>
          <button class="button button--ghost" type="button" data-open-home-journal>Otvoriť denník</button>
        </div>
      </section>

      <section class="home-grid">
        <article class="home-card">
          <div class="home-card__head">
            <div>
              <p class="eyebrow">Posledný zápis</p>
              <h3>${escapeHtml(latestEntry?.title || "Zatiaľ bez zápisu")}</h3>
            </div>
          </div>
          <p class="home-card__meta">${latestEntry ? escapeHtml(formatDate(latestEntry.date)) : "Pridaj prvý zápis a začneme si pamätať príbeh sezóny."}</p>
          <p class="home-card__text">${escapeHtml(trimText(latestEntry?.text || "Tvoje poznámky, fotky a súvislosti budú bývať práve tu.", 160))}</p>
          ${latestEntry ? `<div class="home-chip-row">${journalLinkChips(latestEntry).map(renderJournalChip).join("")}</div>` : ""}
        </article>

        <article class="home-card home-card--weather" id="home-weather-card" data-open-weather-overview>
          <div class="home-card__head">
            <div>
              <p class="eyebrow">Počasie</p>
              <h3>${escapeHtml(weatherSnapshot ? "Zákopčie dnes" : "Zákopčie dnes")}</h3>
            </div>
          </div>
          <div class="home-weather-box" data-home-weather-body>
            ${weatherSnapshot ? renderHomeWeatherCardMarkup(weatherSnapshot, homeWeatherTrend || []) : `<p class="home-weather-box__loading">Načítavam aktuálne počasie pre záhradu.</p>`}
          </div>
        </article>

        <article class="home-card home-card--memory">
          <div class="home-card__head">
            <div>
              <p class="eyebrow">Spomienka</p>
              <h3>${escapeHtml(seasonalMemory?.title || "Pred rokom dnes")}</h3>
            </div>
            ${seasonalMemory ? `<span class="home-pill">${escapeHtml(formatDate(seasonalMemory.date))}</span>` : ""}
          </div>
          <p class="home-card__text">${escapeHtml(seasonalMemory ? trimText(seasonalMemory.text || "Starší zápis z podobného dátumu.", 150) : "Keď pribudnú staršie roky, sem sa budú vracať spomienky z podobných dní a sezón.")}</p>
          ${seasonalMemory?.images?.length ? `<button class="button button--ghost" type="button" data-open-home-memory>Otvoriť spomienku</button>` : ""}
        </article>

        <article class="home-card">
          <div class="home-card__head">
            <div>
              <p class="eyebrow">Problémy</p>
              <h3>${problemEntries.length ? countedLabel(problemEntries.length, "1 záznam", "záznamy", "záznamov") : "Zatiaľ nič kritické"}</h3>
            </div>
          </div>
          <div class="home-stack">
            ${problemEntries.length
              ? problemEntries.map((entry) => `<div class="home-line"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(formatDate(entry.date))}</span></div>`).join("")
              : '<p class="home-card__text">Škodcovia, plesne, poškodenia a iné problémy budú mať svoje miesto bez toho, aby rozhádzali zvyšok appky.</p>'}
          </div>
        </article>
      </section>

      <section class="home-section">
        <div class="home-section__header">
          <div>
            <p class="eyebrow">Galéria</p>
            <h3>Fotky, ktoré niečo znamenajú</h3>
          </div>
          ${latestPhotos.length ? `<button class="button button--ghost mini-list__more mini-list__more--inline" type="button" data-open-home-gallery>Otvoriť fotky</button>` : ""}
        </div>
        <div class="home-gallery">
          ${latestPhotos.length
            ? latestPhotos.slice(0, 6).map((item, index) => `
              <button class="home-gallery__item" type="button" data-open-home-gallery-index="${index}" aria-label="Otvoriť fotku ${escapeAttribute(item.entryTitle)}">
                <img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.entryTitle)}">
                <span class="home-gallery__label">${escapeHtml(item.entryTitle)}</span>
              </button>
            `).join("")
            : '<div class="empty-state">Galéria bude žiť z denníkových fotiek, nie ako samostatný hlúpy album.</div>'}
        </div>
      </section>

      <section class="home-section">
        <div class="home-section__header">
          <div>
            <p class="eyebrow">Témy</p>
            <h3>Rastliny, odrody, miesta, tagy a problémy v jednom prepojenom pohľade</h3>
          </div>
          ${thingRecords.length ? `<button class="button button--ghost mini-list__more mini-list__more--inline" type="button" data-open-all-things>Všetky témy</button>` : ""}
        </div>
        <div class="home-entity-grid">
          ${thingRecords.length
            ? thingRecords.map((item) => `
              <button class="home-entity-card" type="button" data-open-thing="${escapeAttribute(item.key)}">
                <span class="home-entity-card__type">${escapeHtml(item.kindLabel)}</span>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.summary)}</span>
              </button>
            `).join("")
            : '<div class="empty-state">Témy sa budú skladať z kategórií, odrôd, miest, tagov a prepojených zápisov.</div>'}
        </div>
      </section>
    </div>
  `;

  bindHomeDashboard({ latestPhotoImages, latestPhotos, seasonalMemory });
  refreshHomeWeatherCard();
}

function bindHomeDashboard({ latestPhotoImages, latestPhotos, seasonalMemory }) {
  bindWeatherOverviewTriggers(catalogEl);
  catalogEl.querySelector("[data-open-home-add]")?.addEventListener("click", openJournalComposer);
  catalogEl.querySelector("[data-open-home-journal]")?.addEventListener("click", forceOpenJournalManager);
  catalogEl.querySelector("[data-open-home-memory]")?.addEventListener("click", () => {
    if (!seasonalMemory) return;
    openImageLightbox(journalImages(seasonalMemory), 0, seasonalMemory.title || "Spomienka");
  });
  catalogEl.querySelector("[data-open-home-gallery]")?.addEventListener("click", () => {
    if (!latestPhotoImages.length) return;
    openImageLightbox(latestPhotoImages, 0, "Galéria spomienok");
  });
  catalogEl.querySelectorAll("[data-open-home-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.openHomeGalleryIndex || 0);
      openImageLightbox(latestPhotoImages, index, latestPhotos[index]?.entryTitle || "Galéria");
    });
  });
  catalogEl.querySelectorAll("[data-open-thing]").forEach((button) => {
    button.addEventListener("click", () => openThingOverview(button.dataset.openThing || ""));
  });
  catalogEl.querySelector("[data-open-all-things]")?.addEventListener("click", openThingBrowser);
}

function bindThingLinks(container = document) {
  container.querySelectorAll("[data-open-thing]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openThingOverview(button.dataset.openThing || "");
    });
  });
}

function journalEntriesNewestFirst() {
  return state.journal
    .map((entry) => normalizeJournalEntry(entry, state.varieties))
    .slice()
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function journalImages(entry) {
  return (Array.isArray(entry.images) && entry.images.length ? entry.images : entry.image ? [entry.image] : []).filter(Boolean);
}

function journalVideo(entry) {
  return String(entry?.video || "").trim();
}

function renderJournalVideoPlayer(videoSource = "", title = "Video", className = "journal-item__video") {
  const normalized = String(videoSource || "").trim();
  if (!normalized) return "";
  return `
    <div class="${escapeAttribute(className)}">
      <video controls playsinline preload="metadata" src="${escapeAttribute(normalized)}" aria-label="${escapeAttribute(title)}"></video>
    </div>
  `;
}

function recentGalleryItems() {
  return journalEntriesNewestFirst()
    .flatMap((entry) => journalImages(entry).map((image, index) => ({
      entryId: entry.id,
      entryTitle: entry.title || "Zápis",
      image,
      index
    })));
}

function seasonalMemoryCandidates() {
  const today = todayISO();
  const monthDay = today.slice(5);
  return journalEntriesNewestFirst().filter((entry) => entry.date && entry.date.slice(5) === monthDay && entry.date < today);
}

function journalDateLabel(value) {
  const raw = String(value || "").trim();
  if (!raw) return formatDate(todayISO());
  const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return formatDate(raw);
  const dateLabel = formatDate(normalized);
  const timeLabel = normalized.includes("T")
    ? date.toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })
    : "";
  return timeLabel ? `${dateLabel} • ${timeLabel}` : dateLabel;
}

function journalDateParts(value = "") {
  const raw = String(value || "").trim();
  const fallbackDate = todayISO();
  if (!raw) {
    return {
      date: fallbackDate,
      time: currentTimeValue()
    };
  }
  if (!raw.includes("T")) {
    return {
      date: raw.slice(0, 10) || fallbackDate,
      time: currentTimeValue()
    };
  }
  const [datePart, timePart = ""] = raw.split("T");
  return {
    date: datePart || fallbackDate,
    time: timePart.slice(0, 5) || currentTimeValue()
  };
}

function currentTimeValue() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function stampJournalDate(rawDateValue, rawTimeValue = "", existingValue = "") {
  const dateValue = String(rawDateValue || "").trim() || todayISO();
  if (dateValue.includes("T")) return dateValue;
  const timeValue = String(rawTimeValue || "").trim();
  if (timeValue) return `${dateValue}T${timeValue.slice(0, 5)}`;

  const existing = String(existingValue || "").trim();
  if (existing.includes("T") && existing.slice(0, 10) === dateValue) {
    return `${dateValue}T${existing.split("T")[1].slice(0, 5)}`;
  }
  return `${dateValue}T${currentTimeValue()}`;
}

function journalTimelineHeadingLabel(dateValue = "") {
  const normalizedDate = String(dateValue || "").trim().slice(0, 10) || todayISO();
  if (normalizedDate === todayISO()) return `Dnes • ${formatDate(normalizedDate)}`;
  const yesterdayDate = new Date(`${todayISO()}T12:00:00`);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayIso = yesterdayDate.toISOString().slice(0, 10);
  if (normalizedDate === yesterdayIso) return `Včera • ${formatDate(normalizedDate)}`;
  return formatDate(normalizedDate);
}

function journalTimelineGroups(entries = []) {
  const groups = [];
  entries.forEach((entry) => {
    const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
    const groupKey = String(normalizedEntry.date || todayISO()).slice(0, 10) || todayISO();
    const lastGroup = groups[groups.length - 1];
    if (!lastGroup || lastGroup.key !== groupKey) {
      groups.push({
        key: groupKey,
        label: journalTimelineHeadingLabel(groupKey),
        entries: [normalizedEntry]
      });
      return;
    }
    lastGroup.entries.push(normalizedEntry);
  });
  return groups;
}

function renderJournalOverlayTimeline(entries = []) {
  const groups = journalTimelineGroups(entries);
  return groups.map((group) => `
    <section class="journal-overlay-group">
      <div class="journal-overlay-group__head">
        <h3>${escapeHtml(group.label)}</h3>
        <span>${escapeHtml(countedLabel(group.entries.length, "moment", "momenty", "momentov"))}</span>
      </div>
      <div class="journal-overlay-list">
        ${renderJournalOverlayCardsSafe(group.entries)}
      </div>
    </section>
  `).join("");
}

function weatherSnapshotSummary(weather) {
  return [
    weather.temperature ? `${weather.temperature}` : "",
    weather.condition || "",
    weather.humidity ? `Vlhkosť ${weather.humidity}` : "",
    weather.rain ? `Zrážky ${weather.rain}` : "",
    weather.wind ? `Vietor ${weather.wind}` : "",
    weather.observedAt ? `Aktualizované ${weather.observedAt}` : "",
    weather.note ? `Poznámka: ${weather.note}` : ""
  ].filter(Boolean).join(" • ");
}

function weatherVisualTone(weather) {
  const condition = String(weather?.condition || "").toLowerCase();
  if (!condition) return "soft";
  if (condition.includes("búrka") || condition.includes("krúp")) return "storm";
  if (condition.includes("mrhol") || condition.includes("mrznú")) return "rain";
  if (condition.includes("sne")) return "snow";
  if (condition.includes("dážď") || condition.includes("prehán")) return "rain";
  if (condition.includes("mráz") || condition.includes("námraz")) return "snow";
  if (condition.includes("hmla")) return "mist";
  if (condition.includes("polojas")) return "sun";
  if (condition.includes("zamrač")) return "cloud";
  if (condition.includes("jasno")) return "sun";
  if (condition.includes("obla")) return "cloud";
  return "soft";
}

function weatherFogVariantFromData(weather, { condition = "", liquidMm = null, snowfallCm = null, hasMixedPrecipitation = null } = {}) {
  const normalizedCondition = String(condition || "").trim().toLowerCase();
  if (normalizedCondition.includes("hmla")) return "fog";
  if (normalizedCondition.includes("opar")) return "mist";
  const visibility = weatherVisibilityM(weather);
  if (!Number.isFinite(visibility)) return "";
  const humidity = weatherHumidityPct(weather);
  const liquidAmount = Number.isFinite(liquidMm)
    ? liquidMm
    : weatherLiquidPrecipitationMm(weather, { condition: normalizedCondition });
  const snowAmount = Number.isFinite(snowfallCm)
    ? snowfallCm
    : weatherSnowAmountCm(weather, { condition: normalizedCondition });
  const mixedPrecipitation = typeof hasMixedPrecipitation === "boolean"
    ? hasMixedPrecipitation
    : weatherHasMixedPrecipitation(weather, { condition: normalizedCondition });
  const hasWetCondition = normalizedCondition.includes("dáž")
    || normalizedCondition.includes("mrhol")
    || normalizedCondition.includes("prehán")
    || normalizedCondition.includes("krúp")
    || normalizedCondition.includes("búrka")
    || normalizedCondition.includes("sne");
  if (mixedPrecipitation || hasWetCondition || liquidAmount > 0.12 || snowAmount > 0.05) return "";
  if (visibility <= 700) return "fog";
  if (visibility <= 1200 && (!Number.isFinite(humidity) || humidity >= 92)) return "fog";
  if (visibility <= 2400 && (!Number.isFinite(humidity) || humidity >= 88)) return "mist";
  return "";
}

function weatherIllustrationVariant(weather) {
  const condition = weatherConditionText(weather);
  const tempC = weatherTemperatureC(weather);
  const liquidMm = weatherLiquidPrecipitationMm(weather, { condition });
  const snowfallCm = weatherSnowAmountCm(weather, { condition });
  const hasMixedPrecipitation = weatherHasMixedPrecipitation(weather, { condition });
  const frostLike = (condition.includes("mráz") || condition.includes("námraz"))
    && Number.isFinite(tempC)
    && tempC <= 0.2
    && liquidMm <= 0.02
    && snowfallCm <= 0.01;
  if (hasMixedPrecipitation) return "sleet";
  const fogVariant = weatherFogVariantFromData(weather, {
    condition,
    liquidMm,
    snowfallCm,
    hasMixedPrecipitation
  });
  if (fogVariant) return fogVariant;
  if (!condition) {
    if (snowfallCm > 0.03) return "snow";
    if (liquidMm > 0.03) return "rain";
    return "soft";
  }
  if (condition.includes("takmer jasno")) return "mostly-clear";
  if (condition.includes("polojas")) return "mostly-clear";
  if (condition.includes("jasno")) return "clear";
  if (condition.includes("poloobla")) return "partly-cloudy";
  if (condition.includes("zamrač")) return "overcast";
  if (condition.includes("oblačno") || condition.includes("oblač")) return "cloudy";
  if (condition.includes("obla")) return "overcast";
  if (condition.includes("silné mrhol")) return "rain";
  if (condition.includes("mrhol")) return "rain";
  if (condition.includes("mrznúci") && condition.includes("dáž")) return "freezing-rain";
  if (condition.includes("silný dáž") || condition.includes("silné prehán")) return "rain";
  if (condition.includes("dážď") || condition.includes("prehán")) return "rain";
  if (condition.includes("krúp")) return "hail";
  if (condition.includes("búrka")) return "storm";
  if (condition.includes("silné snež") || condition.includes("silné snehové")) return "snow";
  if (condition.includes("slabé snež")) return "snow";
  if (condition.includes("sne")) return "snow";
  if (frostLike) return "frost";
  if (condition.includes("hmla")) return "fog";
  if (condition.includes("opar")) return "mist";
  return weatherVisualTone(weather);
}

function weatherWindState(weather) {
  const speed = weatherWindSpeedKmh(weather);
  return weatherWindStateFromSpeed(speed);
}

function weatherWindStateFromSpeed(speed) {
  const normalizedSpeed = Math.max(0, Number(speed) || 0);
  if (normalizedSpeed >= 52) return "gale";
  if (normalizedSpeed >= 36) return "gust";
  if (normalizedSpeed >= 26) return "fresh";
  if (normalizedSpeed >= 16) return "windy";
  if (normalizedSpeed >= 8) return "breeze";
  return "calm";
}

function weatherWindSpeedFallbackForCategory(category = "calm") {
  const normalizedCategory = String(category || "").trim().toLowerCase();
  if (normalizedCategory === "gale") return 58;
  if (normalizedCategory === "gust") return 40;
  if (normalizedCategory === "fresh") return 28;
  if (normalizedCategory === "windy" || normalizedCategory === "strong") return 18;
  if (normalizedCategory === "breeze") return 10;
  return 0;
}

function mobileWeatherWindLabel(speed) {
  const category = weatherWindStateFromSpeed(speed);
  if (category === "gale") return "víchrica";
  if (category === "gust") return "nárazy";
  if (category === "fresh") return "silný vietor";
  if (category === "windy") return "veterno";
  if (category === "breeze") return "vánok";
  return "bezvetrie";
}

function formatWeatherBackgroundDebugText(debugState) {
  if (!debugState) return "engine missing";
  const seasonLabel = debugState.season === "spring"
    ? "jar"
    : debugState.season === "summer"
      ? "leto"
      : debugState.season === "autumn"
        ? "jeseň"
        : debugState.season === "winter"
          ? "zima"
          : "";
  const sourceLabel = debugState.source === "canvas-local"
    ? "canvas"
    : (debugState.hasVideo ? "video" : "fallback");
  const parts = [
    debugState.scene || "no-scene",
    debugState.phase || debugState.period || "no-period",
    sourceLabel,
    debugState.precipitation || "no-precip"
  ];
  if (Number.isFinite(Number(debugState.precipitationAmount)) && Number(debugState.precipitationAmount) > 0) {
    parts.push(`${Number(debugState.precipitationAmount).toFixed(1)} mm`);
  } else if (Number.isFinite(Number(debugState.snowfallAmount)) && Number(debugState.snowfallAmount) > 0) {
    parts.push(`${Number(debugState.snowfallAmount).toFixed(1)} cm sneh`);
  }
  if (Number.isFinite(Number(debugState.windSpeed))) {
    parts.push(`vietor ${Math.round(Number(debugState.windSpeed))} km/h`);
  } else if (debugState.windCategory) {
    parts.push(`vietor ${debugState.windCategory}`);
  }
  if (Number.isFinite(Number(debugState.temperature))) {
    parts.push(`${Math.round(Number(debugState.temperature))} °C`);
  }
  if (debugState.moonPhase) {
    parts.push(`mesiac ${debugState.moonPhase}`);
  }
  if (seasonLabel) {
    parts.push(`sezóna ${seasonLabel}`);
  }
  return parts.join(" | ");
}

function mobileWeatherAudioLabel(key = "") {
  const labels = {
    dawn: "ráno",
    day: "deň",
    evening: "večer",
    night: "noc",
    clear: "jasno",
    partly_cloudy: "polojasno",
    cloudy: "oblačno",
    overcast: "zamračené",
    fog: "hmla",
    drizzle: "mrholenie",
    rain: "dážď",
    heavy_rain: "silný dážď",
    storm_far: "vzdialená búrka",
    storm_near: "blízka búrka",
    wind_soft: "jemný vánok",
    wind_medium: "vietor",
    wind_strong: "silný vietor",
    snow_light: "slabé sneženie",
    snow_medium: "sneženie",
    snow_heavy: "silné sneženie",
    wet_snow: "mokrý sneh",
    blizzard_like: "víchrica so snehom",
    hail: "krúpy",
    post_rain: "po daždi",
    post_storm: "po búrke",
    post_snow: "po snežení",
    frost: "mráz",
    heat_haze: "horúčava",
    dawn_chorus_rich: "ranný chorus",
    dawn_chorus_soft: "mäkké ranné vtáky",
    dawn_chorus_sparse: "riedke ranné vtáky",
    dawn_garden_air: "ranný vzduch",
    day_garden_soft: "denné vtáky",
    day_garden_open: "denný priestor",
    day_forest_air: "denný lesný vzduch",
    evening_softbirds: "večerné vtáky",
    evening_garden_air: "večerný vzduch",
    night_deep_air: "hlboká noc",
    night_forest_air: "nočný vzduch",
    night_cold_air: "studená noc",
    clear_air_soft: "čistý vzduch",
    cloud_air_soft: "oblačný vzduch",
    overcast_air_heavy: "ťažký vzduch",
    fog_air_soft: "hmlistý priestor",
    drizzle_soft: "jemné mrholenie",
    rain_soft: "dážď",
    rain_heavy: "silný dážď",
    storm_far_bed: "vzdialená búrka",
    storm_near_bed: "blízka búrka",
    wind_soft_trees: "jemný vánok v stromoch",
    wind_medium_trees: "vietor v stromoch",
    wind_strong_trees: "silný vietor v stromoch",
    snow_air_soft: "tichý sneh",
    snow_air_heavy: "hutný sneh",
    snow_wind_soft: "snehový vzduch",
    wet_snow_slush: "mokrá kaša",
    hail_hits_bed: "krúpy na povrchu",
    frost_cold_air: "mrazivý vzduch",
    heat_soft_air: "horúci vzduch",
    crowns_soft: "jemné koruny stromov",
    crowns_medium: "koruny stromov",
    crowns_strong: "silné koruny stromov",
    wet_space_soft: "mokré okolie",
    winter_space_soft: "zimný priestor",
    day_gentle_insects: "jemný denný hmyz",
    night_crickets_bed: "cvrčky",
    evening_warm_insects: "teplý večerný hmyz",
    autumn_leaves_soft: "suché lístie",
    post_rain_drip_bed: "kvapky po daždi",
    day_bird_call: "spev vtákov",
    bird_wings: "prelet vtáka",
    woodpecker: "ďateľ",
    crow_call: "vrana",
    owl_call: "sova",
    wolf_far: "vlk",
    dog_far: "vzdialený pes",
    bee_pass: "včela",
    bumblebee_pass: "čmeliak",
    dove_call: "hrdlička",
    cuckoo_call: "kukučka",
    squirrel_rustle: "veverička",
    mosquito_pass: "komár",
    frog_call: "žaba",
    tree_drips: "kvapky zo stromov",
    thunder_far: "vzdialený hrom",
    thunder_near: "blízky hrom",
    cold: "chladno",
    mild: "mierne",
    warm: "teplo",
    hot: "horúco"
  };
  if (labels[key]) return labels[key];
  return String(key || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function renderWeatherAudioDebugChipList(items = [], emptyLabel = "nič", options = {}) {
  const normalizedItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const activeSet = new Set(Array.isArray(options.activeItems) ? options.activeItems.filter(Boolean) : []);
  const mutedSet = new Set(Array.isArray(options.mutedItems) ? options.mutedItems.filter(Boolean) : []);
  const playingSet = new Set(Array.isArray(options.playingItems) ? options.playingItems.filter(Boolean) : []);
  const muted = Boolean(options.muted);
  const playing = Boolean(options.playing);
  if (!normalizedItems.length) {
    return `<span class="weather-audio-debug__empty">${escapeHtml(emptyLabel)}</span>`;
  }
  return normalizedItems.map((item) => {
    const classes = ["weather-audio-debug__chip"];
    const isPlaying = playing || playingSet.has(item);
    const isActive = isPlaying || activeSet.has(item);
    const isMuted = muted || mutedSet.has(item);
    if (isMuted && !isActive) classes.push("weather-audio-debug__chip--muted");
    if (isActive) classes.push("weather-audio-debug__chip--active");
    if (isPlaying) classes.push("weather-audio-debug__chip--playing");
    return `<span class="${classes.join(" ")}">${escapeHtml(mobileWeatherAudioLabel(item))}</span>`;
  }).join("");
}

function collectWeatherAudioDebugState(audioState = null, soundscapeConfig = null) {
  const normalizedConfig = soundscapeConfig || {};
  const supported = audioState?.supported !== false;
  const enabled = audioState?.enabled !== false;
  const activated = Boolean(audioState?.activated);
  const running = Boolean(audioState?.running);
  const evaluation = audioState?.evaluation || null;
  const activeMix = audioState?.activeMix || null;
  const currentState = audioState?.currentState || {};
  const activeLayerKeys = Object.keys(activeMix?.activeLayers || {});
  const timeLayerKeys = activeLayerKeys.filter((key) => Boolean(normalizedConfig.timeLayers?.[key]));
  const weatherLayerKeys = activeLayerKeys.filter((key) => Boolean(normalizedConfig.weatherLayers?.[key]));
  const textureLayerKeys = activeLayerKeys.filter((key) => Boolean(normalizedConfig.textureLayers?.[key]));
  const allDetailKeys = Object.entries(normalizedConfig.detailEvents || {})
    .filter(([, detail]) => (detail?.chance ?? 1) > 0)
    .map(([detailKey]) => detailKey);
  const playingDetailKeys = Array.isArray(audioState?.playingDetails) ? audioState.playingDetails.filter(Boolean) : [];
  const allowedDetailKeys = Array.isArray(evaluation?.allowedDetails) ? evaluation.allowedDetails.filter(Boolean) : [];
  const blockedDetailKeys = Object.keys(evaluation?.blockedReasons || {}).filter(Boolean);
  const mutedReasons = Array.isArray(evaluation?.mutedDueToPriority) ? evaluation.mutedDueToPriority.filter(Boolean) : [];
  const statusLabel = !supported
    ? "Zvuk nie je podporovaný"
    : !enabled
      ? "Zvuk je vypnutý"
      : !activated
        ? "Čaká na kliknutie"
        : running
          ? "Zvuk je aktívny"
          : "Zvuk je pripravený";
  const statusClass = !supported || !enabled
    ? "is-off"
    : !activated
      ? "is-pending"
      : running
        ? "is-on"
        : "is-idle";
  const masterVolume = Math.max(0, Math.min(1, Number(currentState.masterVolume ?? mobileWeatherSoundVolume) || 0));
  const masterVolumePercent = Math.round(masterVolume * 100);
  const metaParts = [];
  if (currentState.timeOfDay) metaParts.push(mobileWeatherAudioLabel(currentState.timeOfDay));
  if (currentState.weather) metaParts.push(mobileWeatherAudioLabel(currentState.weather));
  if (currentState.temperatureBand) metaParts.push(mobileWeatherAudioLabel(currentState.temperatureBand));

  return {
    supported,
    enabled,
    activated,
    running,
    evaluation,
    activeMix,
    currentState,
    activeLayerKeys,
    timeLayerKeys,
    weatherLayerKeys,
    textureLayerKeys,
    allDetailKeys,
    playingDetailKeys,
    allowedDetailKeys,
    blockedDetailKeys,
    mutedReasons,
    statusLabel,
    statusClass,
    masterVolume,
    masterVolumePercent,
    metaParts
  };
}

function renderWeatherAudioDebugMarkup(audioState = null) {
  const soundscapeConfig = typeof window !== "undefined" ? window.weatherAudioConfig?.soundscapeConfig || {} : {};
  const {
    timeLayerKeys,
    weatherLayerKeys,
    textureLayerKeys,
    allDetailKeys,
    playingDetailKeys,
    allowedDetailKeys,
    blockedDetailKeys,
    mutedReasons,
    statusLabel,
    statusClass,
    masterVolumePercent,
    metaParts
  } = collectWeatherAudioDebugState(audioState, soundscapeConfig);
  return `
    <section class="weather-audio-debug" data-mobile-weather-audio-panel>
      <div class="weather-audio-debug__header">
        <p class="weather-audio-debug__title">Zvuky počasia</p>
        <span class="weather-audio-debug__status ${statusClass}">${escapeHtml(statusLabel)}</span>
      </div>
      <p class="weather-audio-debug__meta">${escapeHtml(metaParts.join(" • ") || "bez aktívneho stavu")}</p>
      <p class="weather-audio-debug__legend">Tmavé hrá teraz · zelené sú povolené · sivé sú vypnuté</p>
      <div class="weather-audio-debug__master">
        <div class="weather-audio-debug__master-head">
          <p class="weather-audio-debug__label">Hlasitosť</p>
          <span class="weather-audio-debug__master-value" data-mobile-weather-audio-volume-value>${escapeHtml(`${masterVolumePercent} %`)}</span>
        </div>
        <div class="weather-audio-debug__range-wrap">
          <input
            class="weather-audio-debug__range"
            type="range"
            min="0"
            max="100"
            step="1"
            value="${escapeAttribute(String(masterVolumePercent))}"
            data-mobile-weather-audio-volume-range
            aria-label="Celková hlasitosť zvukov počasia"
          >
        </div>
      </div>
      <div class="weather-audio-debug__block ${timeLayerKeys.length ? "is-live" : ""}">
        <p class="weather-audio-debug__label">Loop času</p>
        <div class="weather-audio-debug__chips">${renderWeatherAudioDebugChipList(timeLayerKeys, "nič", { activeItems: timeLayerKeys })}</div>
      </div>
      <div class="weather-audio-debug__block ${weatherLayerKeys.length ? "is-live" : ""}">
        <p class="weather-audio-debug__label">Počasie</p>
        <div class="weather-audio-debug__chips">${renderWeatherAudioDebugChipList(weatherLayerKeys, "nič", { activeItems: weatherLayerKeys })}</div>
      </div>
      <div class="weather-audio-debug__block ${textureLayerKeys.length ? "is-live" : ""}">
        <p class="weather-audio-debug__label">Textúry</p>
        <div class="weather-audio-debug__chips">${renderWeatherAudioDebugChipList(textureLayerKeys, "nič", { activeItems: textureLayerKeys })}</div>
      </div>
      <div class="weather-audio-debug__block ${playingDetailKeys.length ? "is-live" : allowedDetailKeys.length ? "is-ready" : ""}">
        <p class="weather-audio-debug__label">Všetky detaily</p>
        <div class="weather-audio-debug__chips">${renderWeatherAudioDebugChipList(allDetailKeys, "nič", { activeItems: allowedDetailKeys, mutedItems: blockedDetailKeys, playingItems: playingDetailKeys })}</div>
      </div>
      <div class="weather-audio-debug__block ${playingDetailKeys.length ? "is-live" : ""}">
        <p class="weather-audio-debug__label">Práve hrá</p>
        <div class="weather-audio-debug__chips">${renderWeatherAudioDebugChipList(playingDetailKeys, "zatiaľ nič", { playingItems: playingDetailKeys, playing: true })}</div>
      </div>
      ${mutedReasons.length ? `<p class="weather-audio-debug__note">${escapeHtml(mutedReasons.join(" "))}</p>` : ""}
    </section>
  `;
}

function renderWeatherAudioInlineMarkup(audioState = null) {
  return "";
}

function syncMainMenuWeatherAudioControls() {
  if (typeof document === "undefined" || !mainMenuEl) return;
  const audioState = typeof window !== "undefined" && window.weatherAudioEngine?.getState
    ? window.weatherAudioEngine.getState()
    : null;
  const supported = audioState?.supported !== false;
  const statusLabel = !supported
    ? "Bez podpory"
    : !mobileWeatherSoundEnabled
      ? "Vypnutý"
      : "Zapnutý";
  const statusClass = !supported || !mobileWeatherSoundEnabled
    ? "is-off"
    : "is-on";
  mainMenuEl.querySelectorAll("[data-mobile-weather-audio-inline-status]").forEach((element) => {
    element.textContent = statusLabel;
    element.className = `weather-audio-inline__status ${statusClass}`;
    if (element instanceof HTMLButtonElement) {
      element.setAttribute("aria-pressed", mobileWeatherSoundEnabled ? "true" : "false");
      element.setAttribute("title", mobileWeatherSoundEnabled ? "Ťuknutím zvuk vypneš" : "Ťuknutím zvuk zapneš");
    }
  });
  mainMenuEl.querySelectorAll("[data-mobile-weather-audio-inline]").forEach((element) => {
    element.classList.toggle("is-on", Boolean(mobileWeatherSoundEnabled && supported));
    element.classList.toggle("is-off", !mobileWeatherSoundEnabled || !supported);
    element.hidden = !mobileWeatherSoundPanelOpen;
  });
}

function updateMainMenuWeatherAudioDebugPanel() {
  if (typeof document === "undefined" || !mainMenuEl) return;
  const panel = mainMenuEl.querySelector("[data-mobile-weather-audio-panel]");
  if (!panel) return;
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLInputElement && activeElement.matches("[data-mobile-weather-audio-volume-range]")) {
    return;
  }
  const audioState = typeof window !== "undefined" && window.weatherAudioEngine?.getState
    ? window.weatherAudioEngine.getState()
    : null;
  panel.outerHTML = renderWeatherAudioDebugMarkup(audioState);
  syncMainMenuWeatherAudioControls();
}

function bindMainMenuWeatherAudioDebugEvents() {
  if (typeof window === "undefined" || mainMenuWeatherAudioDebugEventsBound) return;
  window.addEventListener("weatheraudio:statechange", () => {
    updateMainMenuWeatherAudioDebugPanel();
    syncMainMenuWeatherAudioControls();
  });
  mainMenuWeatherAudioDebugEventsBound = true;
}

function bindMainMenuWeatherAudioControlEvents() {
  if (mainMenuWeatherAudioControlsBound || !mainMenuEl) return;
  mainMenuEl.addEventListener("click", (event) => {
    const toggleButton = event.target instanceof Element
      ? event.target.closest("[data-mobile-weather-audio-inline-toggle]")
      : null;
    if (!(toggleButton instanceof HTMLButtonElement) || !mainMenuEl.contains(toggleButton)) return;
    event.preventDefault();
    window.weatherAudioEngine?.handleUserActivation?.();
    setMobileWeatherSoundEnabled(!mobileWeatherSoundEnabled);
  });
  mainMenuEl.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.matches("[data-mobile-weather-audio-volume-range]")) return;
    window.weatherAudioEngine?.handleUserActivation?.();
    const nextPercent = Math.max(0, Math.min(100, Math.round(Number(target.value) || 0)));
    setMobileWeatherSoundVolume(nextPercent / 100);
  });
  mainMenuWeatherAudioControlsBound = true;
}

function stopMainMenuWeatherAudioDebugTicker() {
  if (!mainMenuWeatherAudioDebugTimer || typeof window === "undefined") return;
  window.clearInterval(mainMenuWeatherAudioDebugTimer);
  mainMenuWeatherAudioDebugTimer = 0;
}

function ensureMainMenuWeatherAudioDebugTicker() {
  if (typeof window === "undefined" || mainMenuWeatherAudioDebugTimer || !shouldShowWeatherDebugUi()) return;
  mainMenuWeatherAudioDebugTimer = window.setInterval(() => {
    if (typeof document === "undefined" || !document.body?.classList.contains("app-mobile-shell") || !shouldShowWeatherDebugUi()) return;
    updateMainMenuWeatherAudioDebugPanel();
  }, 320);
}

function toFiniteWeatherNumber(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : null;
}

function extractWeatherNumber(value) {
  const match = String(value ?? "").match(/-?\d+(?:[.,]\d+)?/);
  return match ? Number(String(match[0]).replace(",", ".")) : null;
}

function averageWeatherNumbers(...values) {
  const finiteValues = values
    .map((value) => toFiniteWeatherNumber(value))
    .filter((value) => value !== null);
  if (!finiteValues.length) return null;
  return finiteValues.reduce((sum, value) => sum + value, 0) / finiteValues.length;
}

function moonPhaseFromDateValue(value = new Date()) {
  const date = value instanceof Date ? value : new Date(String(value || ""));
  if (Number.isNaN(date.getTime())) return "gibbous";
  const synodicMonth = 29.530588853;
  const knownNewMoonUtc = Date.UTC(2000, 0, 6, 18, 14, 0);
  const daysSince = (date.getTime() - knownNewMoonUtc) / 86400000;
  const lunation = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
  const phase = lunation / synodicMonth;
  if (phase < 0.03 || phase > 0.97) return "new";
  if (phase < 0.22) return "waxing_crescent";
  if (phase < 0.28) return "first_quarter";
  if (phase < 0.47) return "waxing_gibbous";
  if (phase < 0.53) return "full";
  if (phase < 0.72) return "waning_gibbous";
  if (phase < 0.78) return "last_quarter";
  return "waning_crescent";
}

function weatherWindSpeedKmh(weather) {
  return toFiniteWeatherNumber(weather?.windSpeedKmh) ?? extractWeatherNumber(weather?.wind) ?? 0;
}

function weatherWindGustsKmh(weather) {
  return toFiniteWeatherNumber(weather?.windGustsKmh) ?? 0;
}

function weatherWindDirectionDeg(weather) {
  return toFiniteWeatherNumber(weather?.windDirectionDeg);
}

function weatherTemperatureC(weather) {
  return toFiniteWeatherNumber(weather?.temperatureC) ?? extractWeatherNumber(weather?.temperature);
}

function weatherApparentTemperatureC(weather) {
  return toFiniteWeatherNumber(weather?.apparentTemperatureC) ?? weatherTemperatureC(weather);
}

function weatherHumidityPct(weather) {
  return toFiniteWeatherNumber(weather?.humidityPct) ?? extractWeatherNumber(weather?.humidity);
}

function weatherPrecipitationMm(weather) {
  return toFiniteWeatherNumber(weather?.precipitationMm) ?? extractWeatherNumber(weather?.rain);
}

function weatherRainMm(weather) {
  return toFiniteWeatherNumber(weather?.rainMm);
}

function weatherShowersMm(weather) {
  return toFiniteWeatherNumber(weather?.showersMm);
}

function weatherSnowfallCm(weather) {
  return toFiniteWeatherNumber(weather?.snowfallCm);
}

function weatherConditionText(weather) {
  return String(weather?.condition || "").trim().toLowerCase();
}

function weatherLiquidPrecipitationMm(weather, options = {}) {
  const explicitLiquid = Math.max(0, weatherRainMm(weather) || 0, weatherShowersMm(weather) || 0);
  if (explicitLiquid > 0.03) return explicitLiquid;

  const totalPrecipitation = Math.max(0, weatherPrecipitationMm(weather) || 0);
  if (totalPrecipitation <= 0.03) return 0;

  const condition = String(options?.condition || weatherConditionText(weather));
  const snowLike = condition.includes("sne");
  const rainLike = condition.includes("dáž") || condition.includes("mrhol") || condition.includes("prehán") || condition.includes("lejak") || condition.includes("búrka") || condition.includes("krúp");
  return rainLike && !snowLike ? totalPrecipitation : 0;
}

function weatherSnowAmountCm(weather, options = {}) {
  const explicitSnow = Math.max(0, weatherSnowfallCm(weather) || 0);
  if (explicitSnow > 0.03) return explicitSnow;

  const totalPrecipitation = Math.max(0, weatherPrecipitationMm(weather) || 0);
  if (totalPrecipitation <= 0.03) return 0;

  const condition = String(options?.condition || weatherConditionText(weather));
  const snowLike = condition.includes("sne");
  const liquidLike = condition.includes("dáž") || condition.includes("mrhol") || condition.includes("prehán");
  return snowLike && !liquidLike ? Number((totalPrecipitation * 1.18).toFixed(2)) : 0;
}

function weatherHasMixedPrecipitation(weather, options = {}) {
  const condition = String(options?.condition || weatherConditionText(weather));
  if (condition.includes("dáž") && condition.includes("sneh")) return true;
  const explicitLiquid = Math.max(0, weatherRainMm(weather) || 0, weatherShowersMm(weather) || 0);
  const explicitSnow = Math.max(0, weatherSnowfallCm(weather) || 0);
  return explicitLiquid > 0.04 && explicitSnow > 0.03;
}

function weatherCloudCoverPct(weather) {
  return toFiniteWeatherNumber(weather?.cloudCoverPct);
}

function weatherCloudCoverLowPct(weather) {
  return toFiniteWeatherNumber(weather?.cloudCoverLowPct);
}

function weatherCloudCoverMidPct(weather) {
  return toFiniteWeatherNumber(weather?.cloudCoverMidPct);
}

function weatherCloudCoverHighPct(weather) {
  return toFiniteWeatherNumber(weather?.cloudCoverHighPct);
}

function weatherVisibilityM(weather) {
  return toFiniteWeatherNumber(weather?.visibilityM);
}

function weatherPressureMslHpa(weather) {
  return toFiniteWeatherNumber(weather?.pressureMslHpa);
}

function weatherSurfacePressureHpa(weather) {
  return toFiniteWeatherNumber(weather?.surfacePressureHpa);
}

function weatherPrecipitationProbabilityPct(weather) {
  return toFiniteWeatherNumber(weather?.precipitationProbabilityPct);
}

function weatherMoonPhase(weather) {
  return String(weather?.moonPhase || "").trim() || moonPhaseFromDateValue(weather?.observedAt || new Date());
}

function weatherClockMinutes(value) {
  const rawValue = value && typeof value === "object"
    ? (value.observedAt ?? value.time ?? "")
    : value;
  const date = new Date(rawValue);
  if (!Number.isNaN(date.getTime())) return (date.getHours() * 60) + date.getMinutes();
  const match = String(rawValue || "").match(/\b(\d{1,2}):(\d{2})\b/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hour) || !Number.isFinite(minutes)) return null;
  return (hour * 60) + minutes;
}

function weatherObservedHour(value) {
  const minutes = weatherClockMinutes(value);
  return minutes === null ? null : Math.floor(minutes / 60);
}

function mobileWeatherPhaseFromSnapshot(snapshot = null, period = "day") {
  if (period === "night") return "night";
  const fallbackHour = new Date().getHours();
  const observedMinutes = weatherClockMinutes(snapshot) ?? (fallbackHour * 60);
  const sunriseMinutes = weatherClockMinutes(snapshot?.sunriseAt);
  const sunsetMinutes = weatherClockMinutes(snapshot?.sunsetAt);

  if (sunriseMinutes !== null && observedMinutes >= sunriseMinutes - 50 && observedMinutes <= sunriseMinutes + 85) {
    return "dawn";
  }
  if (sunsetMinutes !== null && observedMinutes >= sunsetMinutes - 95 && observedMinutes <= sunsetMinutes + 55) {
    return "sunset";
  }
  return mobileWeatherPhaseFromHour(Math.floor(observedMinutes / 60), period);
}

function mobileWeatherHeatLevel(weather, period = "day") {
  const temp = weatherTemperatureC(weather);
  if (!Number.isFinite(temp)) return "normal";
  if (period === "night" && temp >= 20) return "tropical";
  if (period === "day" && temp >= 35) return "extreme";
  if (period === "day" && temp >= 30) return "hot";
  return "normal";
}

function mobileWeatherSeasonFromDate(date = new Date()) {
  const month = Number(date?.getMonth?.() ?? new Date().getMonth());
  if (month === 11 || month <= 1) return "winter";
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  return "autumn";
}

function buildMobileWeatherBackgroundInput({
  snapshot = null,
  tone = "soft",
  variant = "clear",
  phenomenonVariant = "",
  season = "auto",
  period = "day",
  phase = "day",
  wind = "calm",
  windSpeed = null,
  precipitationLocked = false,
  moonPhaseOverride = "",
  cloudLocked = false
} = {}) {
  const conditionText = String(snapshot?.condition || "").toLowerCase();
  const hasManualWindSpeed = Number.isFinite(Number(windSpeed));
  const resolvedWindSpeed = hasManualWindSpeed ? Number(windSpeed) : weatherWindSpeedKmh(snapshot);
  const observedWindGust = weatherWindGustsKmh(snapshot);
  const precipitationAmount = weatherPrecipitationMm(snapshot);
  const rainAmount = weatherRainMm(snapshot);
  const showersAmount = weatherShowersMm(snapshot);
  const snowfallAmount = weatherSnowfallCm(snapshot);
  const precipitationSuppressed = Boolean(precipitationLocked)
    && String(phenomenonVariant || "").trim().toLowerCase() === "none";
  const derivedManualWindGust = resolvedWindSpeed <= 0
    ? 0
    : Math.max(
      resolvedWindSpeed,
      Math.round(resolvedWindSpeed * 1.22 + (resolvedWindSpeed >= 22 ? 6 : resolvedWindSpeed >= 10 ? 3 : 1))
    );
  const resolvedWindGustSpeed = hasManualWindSpeed ? derivedManualWindGust : observedWindGust;
  const resolvedWindDirection = hasManualWindSpeed && resolvedWindGustSpeed <= 0
    ? null
    : weatherWindDirectionDeg(snapshot);

  return {
    isDay: period !== "night",
    period,
    phase,
    season,
    tone,
    variant,
    phenomenonVariant,
    precipitationLocked: Boolean(precipitationLocked),
    windCategory: wind || weatherWindStateFromSpeed(resolvedWindSpeed),
    windSpeed: resolvedWindSpeed,
    windGustSpeed: resolvedWindGustSpeed,
    windDirection: resolvedWindDirection,
    temperature: weatherTemperatureC(snapshot),
    apparentTemperature: weatherApparentTemperatureC(snapshot),
    humidity: weatherHumidityPct(snapshot),
    precipitationAmount,
    rainAmount,
    showersAmount,
    snowfallAmount,
    precipitationProbability: weatherPrecipitationProbabilityPct(snapshot),
    cloudCover: weatherCloudCoverPct(snapshot),
    cloudCoverLow: weatherCloudCoverLowPct(snapshot),
    cloudCoverMid: weatherCloudCoverMidPct(snapshot),
    cloudCoverHigh: weatherCloudCoverHighPct(snapshot),
    cloudLocked: Boolean(cloudLocked),
    visibility: weatherVisibilityM(snapshot),
    pressureMsl: weatherPressureMslHpa(snapshot),
    surfacePressure: weatherSurfacePressureHpa(snapshot),
    hasThunder: !precipitationSuppressed && (tone === "storm" || phenomenonVariant === "storm" || conditionText.includes("búrka")),
    hasHail: !precipitationSuppressed && (phenomenonVariant === "hail" || conditionText.includes("krúp")),
    moonPhase: String(moonPhaseOverride || weatherMoonPhase(snapshot) || "").trim().toLowerCase()
  };
}

function mobileWeatherPhaseFromHour(hourValue, period = "day") {
  const hour = Number(hourValue);
  if (!Number.isFinite(hour)) return period === "night" ? "night" : "day";
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 17 && hour < 21) return "sunset";
  if (hour >= 21 || hour < 5) return "night";
  return "day";
}

function mobileWeatherPhasePeriod(phaseValue = "", fallbackPeriod = "day") {
  const phase = String(phaseValue || "").trim().toLowerCase();
  if (phase === "night") return "night";
  if (phase === "dawn" || phase === "day" || phase === "sunset") return "day";
  return fallbackPeriod === "night" ? "night" : "day";
}

function mobileWeatherCloudVariantFromCover(coverPct) {
  const cover = Number(coverPct);
  if (!Number.isFinite(cover)) return "";
  if (cover >= 90) return "overcast";
  if (cover >= 44) return "cloudy";
  if (cover >= 10) return "mostly-clear";
  return "clear";
}

function mobileWeatherCloudVariantFromSnapshot(snapshot = null, period = "day") {
  const directVariant = weatherIllustrationVariant(snapshot);
  if (["clear", "mostly-clear", "cloudy", "overcast"].includes(directVariant)) return directVariant;
  if (directVariant === "partly-cloudy") {
    const cover = weatherCloudCoverPct(snapshot);
    return Number.isFinite(cover) && cover >= 44 ? "cloudy" : "mostly-clear";
  }

  const cloudVariant = mobileWeatherCloudVariantFromCover(weatherCloudCoverPct(snapshot));
  if (cloudVariant) return cloudVariant;

  const condition = String(snapshot?.condition || "").toLowerCase();
  if (condition.includes("zamrač")) return "overcast";
  if (condition.includes("poloobla")) return "cloudy";
  if (condition.includes("obla")) return "cloudy";
  if (condition.includes("polojas") || condition.includes("takmer jasno")) return "mostly-clear";
  if (condition.includes("jasno")) return "clear";
  if (condition.includes("hmla")) return "overcast";
  return period === "night" ? "mostly-clear" : "clear";
}

function mobileWeatherPhenomenonVariantFromSnapshot(snapshot = null) {
  const directVariant = weatherIllustrationVariant(snapshot);
  if (["hail", "storm", "freezing-rain"].includes(directVariant)) {
    return directVariant;
  }

  const condition = weatherConditionText(snapshot);
  const tempC = weatherTemperatureC(snapshot);
  const liquidMm = weatherLiquidPrecipitationMm(snapshot, { condition });
  const snowfallCm = weatherSnowAmountCm(snapshot, { condition });
  const hasMixedPrecipitation = weatherHasMixedPrecipitation(snapshot, { condition });
  const fogVariant = weatherFogVariantFromData(snapshot, {
    condition,
    liquidMm,
    snowfallCm,
    hasMixedPrecipitation
  });
  const frostLike = (directVariant === "frost" || condition.includes("mráz") || condition.includes("námraz"))
    && Number.isFinite(tempC)
    && tempC <= 0.2
    && liquidMm <= 0.02
    && snowfallCm <= 0.01;
  const hasSnow = condition.includes("sne") || snowfallCm > 0.03;
  const hasRain = condition.includes("dáž") || condition.includes("mrhol") || condition.includes("prehán") || liquidMm > 0.03;

  if (condition.includes("krúp") || directVariant === "hail") return "hail";
  if (condition.includes("búrka") || directVariant === "storm") return "storm";
  if (hasMixedPrecipitation) return "sleet";
  if (frostLike) return "frost";
  if (hasSnow || directVariant === "snow") return "snow";
  if (directVariant === "freezing-rain") return "freezing-rain";
  if (hasRain || directVariant === "rain") return "rain";
  if (fogVariant === "fog") return "fog";
  if (fogVariant === "mist") return "mist";
  if (condition.includes("hmla") || directVariant === "fog") return "fog";
  if (condition.includes("opar") || directVariant === "mist") return "mist";
  return "none";
}

function mobileWeatherToneFromState({ phenomenonVariant = "", cloudVariant = "", heatLevel = "normal", snapshot = null } = {}) {
  if (heatLevel === "tropical" || heatLevel === "hot" || heatLevel === "extreme") return "sun";
  if (phenomenonVariant === "storm" || phenomenonVariant === "hail") return "storm";
  if (phenomenonVariant === "snow" || phenomenonVariant === "frost" || phenomenonVariant === "sleet") return "snow";
  if (phenomenonVariant === "rain" || phenomenonVariant === "freezing-rain") return "rain";
  if (phenomenonVariant === "fog" || phenomenonVariant === "mist") return "mist";
  if (cloudVariant === "clear" || cloudVariant === "mostly-clear") return "sun";
  if (cloudVariant === "partly-cloudy" || cloudVariant === "cloudy" || cloudVariant === "overcast") return "cloud";
  return weatherVisualTone(snapshot);
}

function mobileWeatherBodyVariantFromState({ cloudVariant = "", heatLevel = "normal", period = "day" } = {}) {
  if (heatLevel === "tropical") return "tropical-night";
  if (heatLevel === "hot" || heatLevel === "extreme") return "heat";
  return cloudVariant || (period === "night" ? "mostly-clear" : "clear");
}

function mobileWeatherPrecipitationLabel(amountMm) {
  const amount = Math.max(0, Number(amountMm) || 0);
  if (amount >= 8) return "extrémne";
  if (amount >= 4.5) return "veľmi silné";
  if (amount >= 2.2) return "výrazné";
  if (amount >= 0.8) return "mierne";
  if (amount > 0.05) return "slabé";
  return "sucho";
}

function mobileWeatherTemperatureBandLabel(tempC) {
  const temp = Number(tempC);
  if (!Number.isFinite(temp)) return "mierne";
  if (temp <= 4) return "chladno";
  if (temp < 19) return "mierne";
  if (temp < 28) return "teplo";
  return "horúco";
}

function applyMobileWeatherPrecipitationOverride(template = {}, debugId = "", overrideMm = null) {
  if (!Number.isFinite(Number(overrideMm))) return template;
  const nextTemplate = { ...template };
  const amountMm = Math.max(0, Math.min(12, Number(overrideMm)));
  const resolvedDebugId = debugId === "heavy-rain"
    ? "rain"
    : debugId === "drizzle"
      ? "rain"
    : debugId === "light-rain" || debugId === "light-snow" || debugId === "dense-snow"
      ? (debugId.includes("snow") ? "snow" : "rain")
      : debugId;
  const isSnow = resolvedDebugId === "snow";
  const isSleet = resolvedDebugId === "sleet";
  const isRainLike = ["rain", "hail", "storm"].includes(resolvedDebugId);

  if (!isSnow && !isSleet && !isRainLike) return nextTemplate;

  if (amountMm <= 0) {
    nextTemplate.precipitationMm = 0;
    nextTemplate.rainMm = 0;
    nextTemplate.showersMm = 0;
    nextTemplate.snowfallCm = 0;
    nextTemplate.precipitationProbabilityPct = Math.min(Number(nextTemplate.precipitationProbabilityPct) || 0, 18);
    return nextTemplate;
  }

  nextTemplate.precipitationMm = Number(amountMm.toFixed(1));
  nextTemplate.precipitationProbabilityPct = Math.min(100, Math.round(56 + amountMm * 7));

  if (isSnow) {
    const cloudFloor = amountMm >= 4.5
      ? { total: 90, low: 94, mid: 84, high: 68 }
      : amountMm >= 1.6
        ? { total: 76, low: 82, mid: 68, high: 48 }
        : { total: 58, low: 66, mid: 46, high: 26 };
    nextTemplate.cloudCoverPct = Math.max(Number(nextTemplate.cloudCoverPct) || 0, cloudFloor.total);
    nextTemplate.cloudCoverLowPct = Math.max(Number(nextTemplate.cloudCoverLowPct) || 0, cloudFloor.low);
    nextTemplate.cloudCoverMidPct = Math.max(Number(nextTemplate.cloudCoverMidPct) || 0, cloudFloor.mid);
    nextTemplate.cloudCoverHighPct = Math.max(Number(nextTemplate.cloudCoverHighPct) || 0, cloudFloor.high);
    nextTemplate.rainMm = 0;
    nextTemplate.showersMm = 0;
    nextTemplate.snowfallCm = Number((amountMm * 1.18).toFixed(2));
    nextTemplate.visibilityM = Math.max(700, Math.round((Number(template.visibilityM) || 6400) - amountMm * 680));
    nextTemplate.humidityPct = Math.max(Number(nextTemplate.humidityPct) || 0, 90);
    return nextTemplate;
  }

  if (isSleet) {
    const cloudFloor = amountMm >= 4.5
      ? { total: 88, low: 92, mid: 84, high: 62 }
      : amountMm >= 1.6
        ? { total: 70, low: 76, mid: 64, high: 40 }
        : { total: 54, low: 58, mid: 46, high: 24 };
    nextTemplate.cloudCoverPct = Math.max(Number(nextTemplate.cloudCoverPct) || 0, cloudFloor.total);
    nextTemplate.cloudCoverLowPct = Math.max(Number(nextTemplate.cloudCoverLowPct) || 0, cloudFloor.low);
    nextTemplate.cloudCoverMidPct = Math.max(Number(nextTemplate.cloudCoverMidPct) || 0, cloudFloor.mid);
    nextTemplate.cloudCoverHighPct = Math.max(Number(nextTemplate.cloudCoverHighPct) || 0, cloudFloor.high);
    nextTemplate.rainMm = Number((amountMm * 0.52).toFixed(2));
    nextTemplate.showersMm = Number((amountMm * 0.18).toFixed(2));
    nextTemplate.snowfallCm = Number((amountMm * 0.62).toFixed(2));
    nextTemplate.visibilityM = Math.max(900, Math.round((Number(template.visibilityM) || 5200) - amountMm * 520));
    nextTemplate.humidityPct = Math.max(Number(nextTemplate.humidityPct) || 0, 92);
    return nextTemplate;
  }

  const cloudFloor = resolvedDebugId === "storm" || resolvedDebugId === "hail"
    ? { total: 100, low: 100, mid: 98, high: 90 }
    : amountMm >= 4.5
      ? { total: 88, low: 92, mid: 82, high: 64 }
      : amountMm >= 1.6
        ? { total: 70, low: 76, mid: 60, high: 40 }
        : { total: 42, low: 48, mid: 34, high: 20 };
  nextTemplate.cloudCoverPct = Math.max(Number(nextTemplate.cloudCoverPct) || 0, cloudFloor.total);
  nextTemplate.cloudCoverLowPct = Math.max(Number(nextTemplate.cloudCoverLowPct) || 0, cloudFloor.low);
  nextTemplate.cloudCoverMidPct = Math.max(Number(nextTemplate.cloudCoverMidPct) || 0, cloudFloor.mid);
  nextTemplate.cloudCoverHighPct = Math.max(Number(nextTemplate.cloudCoverHighPct) || 0, cloudFloor.high);

  const rainRatio = resolvedDebugId === "storm"
    ? 0.76
    : resolvedDebugId === "hail"
      ? 0.62
      : 0.86;
  const showerRatio = resolvedDebugId === "storm"
    ? 0.38
    : resolvedDebugId === "hail"
      ? 0.22
      : 0.18;

  nextTemplate.rainMm = Number((amountMm * rainRatio).toFixed(2));
  nextTemplate.showersMm = Number((amountMm * showerRatio).toFixed(2));
  nextTemplate.snowfallCm = 0;
  nextTemplate.visibilityM = Math.max(
    resolvedDebugId === "storm" ? 1200 : 2200,
    Math.round((Number(template.visibilityM) || 7000) - amountMm * (resolvedDebugId === "storm" ? 620 : 420))
  );
  nextTemplate.humidityPct = Math.max(Number(nextTemplate.humidityPct) || 0, 90);
  return nextTemplate;
}

function applyMobileWeatherCloudOverride(template = {}, cloudOverride = "", period = "day") {
  const normalizedCloudOverride = normalizeMobileWeatherCloudDebugId(cloudOverride);
  if (!normalizedCloudOverride) return template;

  const cloudTemplates = {
    clear: {
      condition: period === "night" ? "Jasná noc" : "Jasno",
      cloudCoverPct: 2,
      cloudCoverLowPct: 0,
      cloudCoverMidPct: 2,
      cloudCoverHighPct: 4
    },
    "mostly-clear": {
      condition: period === "night" ? "Takmer jasná noc" : "Polojasno",
      cloudCoverPct: 14,
      cloudCoverLowPct: 10,
      cloudCoverMidPct: 12,
      cloudCoverHighPct: 8
    },
    cloudy: {
      condition: "Oblačno",
      cloudCoverPct: 74,
      cloudCoverLowPct: 70,
      cloudCoverMidPct: 72,
      cloudCoverHighPct: 60
    },
    overcast: {
      condition: "Zamračené",
      cloudCoverPct: 96,
      cloudCoverLowPct: 98,
      cloudCoverMidPct: 94,
      cloudCoverHighPct: 88
    }
  };

  const cloudTemplate = cloudTemplates[normalizedCloudOverride];
  if (!cloudTemplate) return template;
  return {
    ...template,
    cloudCoverPct: cloudTemplate.cloudCoverPct,
    cloudCoverLowPct: cloudTemplate.cloudCoverLowPct,
    cloudCoverMidPct: cloudTemplate.cloudCoverMidPct,
    cloudCoverHighPct: cloudTemplate.cloudCoverHighPct
  };
}

function buildMobileWeatherThemeDebugSnapshot(snapshot = null, debugOverride = null, period = "day", options = {}) {
  const normalizedCloudOverride = normalizeMobileWeatherCloudDebugId(options?.cloudOverride || "");
  const temperatureOverrideC = Number.isFinite(Number(options?.temperatureOverrideC)) ? Number(options.temperatureOverrideC) : null;
  if ((!debugOverride || debugOverride.id === "auto") && !normalizedCloudOverride && temperatureOverrideC === null) return snapshot;

  const now = new Date();
  const baseSnapshot = normalizeWeatherSnapshot(snapshot || {}) || {};
  const fallbackObservedAt = baseSnapshot.observedAt || now.toISOString();
  const normalizedMoonOverride = String(options?.moonPhaseOverride || "").trim().toLowerCase();
  const fallbackMoonPhase = normalizedMoonOverride || baseSnapshot.moonPhase || moonPhaseFromDateValue(fallbackObservedAt);
  const baseTemperature = weatherTemperatureC(baseSnapshot);
  const baseApparentTemperature = weatherApparentTemperatureC(baseSnapshot);

  const templates = {
    clear: {
      condition: period === "night" ? "Jasná noc" : "Jasno",
      humidityPct: 44,
      visibilityM: 26000,
      precipitationMm: 0,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0,
      precipitationProbabilityPct: 2,
      cloudCoverPct: 2,
      cloudCoverLowPct: 0,
      cloudCoverMidPct: 2,
      cloudCoverHighPct: 4
    },
    "mostly-clear": {
      condition: period === "night" ? "Takmer jasná noc" : "Polojasno",
      humidityPct: 48,
      visibilityM: 23000,
      precipitationMm: 0,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0,
      precipitationProbabilityPct: 6,
      cloudCoverPct: 14,
      cloudCoverLowPct: 10,
      cloudCoverMidPct: 12,
      cloudCoverHighPct: 8
    },
    cloudy: {
      condition: "Oblačno",
      humidityPct: 62,
      visibilityM: 17000,
      precipitationMm: 0,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0,
      precipitationProbabilityPct: 22,
      cloudCoverPct: 74,
      cloudCoverLowPct: 70,
      cloudCoverMidPct: 72,
      cloudCoverHighPct: 60
    },
    overcast: {
      condition: "Zamračené",
      humidityPct: 74,
      visibilityM: 12000,
      precipitationMm: 0,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0,
      precipitationProbabilityPct: 34,
      cloudCoverPct: 96,
      cloudCoverLowPct: 98,
      cloudCoverMidPct: 94,
      cloudCoverHighPct: 88
    },
    fog: {
      condition: "Hmla",
      humidityPct: 98,
      visibilityM: 420,
      precipitationMm: 0,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0,
      precipitationProbabilityPct: 26,
      cloudCoverPct: 98,
      cloudCoverLowPct: 100,
      cloudCoverMidPct: 92,
      cloudCoverHighPct: 84
    },
    rain: {
      condition: "Dážď",
      humidityPct: 94,
      visibilityM: 6200,
      precipitationMm: 1.4,
      rainMm: 1.2,
      showersMm: 0.5,
      snowfallCm: 0,
      precipitationProbabilityPct: 96,
      cloudCoverPct: 64,
      cloudCoverLowPct: 68,
      cloudCoverMidPct: 54,
      cloudCoverHighPct: 34
    },
    hail: {
      condition: "Krúpy",
      humidityPct: 92,
      visibilityM: 5400,
      precipitationMm: 3.4,
      rainMm: 2.6,
      showersMm: 1.2,
      snowfallCm: 0,
      precipitationProbabilityPct: 98,
      cloudCoverPct: 100,
      cloudCoverLowPct: 100,
      cloudCoverMidPct: 100,
      cloudCoverHighPct: 96
    },
    sleet: {
      condition: "Dážď so snehom",
      temperatureC: Number.isFinite(baseTemperature) ? Math.min(baseTemperature, 2) : 1,
      apparentTemperatureC: Number.isFinite(baseApparentTemperature) ? Math.min(baseApparentTemperature, -1) : -1,
      humidityPct: 92,
      visibilityM: 4600,
      precipitationMm: 1.8,
      rainMm: 0.9,
      showersMm: 0.3,
      snowfallCm: 0.8,
      precipitationProbabilityPct: 96,
      cloudCoverPct: 80,
      cloudCoverLowPct: 84,
      cloudCoverMidPct: 70,
      cloudCoverHighPct: 48
    },
    snow: {
      condition: "Sneženie",
      temperatureC: Number.isFinite(baseTemperature) ? Math.min(baseTemperature, -1) : -1,
      apparentTemperatureC: Number.isFinite(baseApparentTemperature) ? Math.min(baseApparentTemperature, -4) : -4,
      humidityPct: 90,
      visibilityM: 5200,
      precipitationMm: 0.7,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0.6,
      precipitationProbabilityPct: 95,
      cloudCoverPct: 72,
      cloudCoverLowPct: 78,
      cloudCoverMidPct: 62,
      cloudCoverHighPct: 42
    },
    storm: {
      condition: "Búrka",
      humidityPct: 90,
      visibilityM: 5000,
      precipitationMm: 4.8,
      rainMm: 3.8,
      showersMm: 1.6,
      snowfallCm: 0,
      precipitationProbabilityPct: 99,
      cloudCoverPct: 100,
      cloudCoverLowPct: 100,
      cloudCoverMidPct: 100,
      cloudCoverHighPct: 96
    },
    none: {
      condition: period === "night" ? "Pokojná noc" : "Bez zrážok",
      precipitationMm: 0,
      rainMm: 0,
      showersMm: 0,
      snowfallCm: 0,
      precipitationProbabilityPct: 6
    }
  };

  const resolvedDebugId = !debugOverride || debugOverride.id === "auto"
    ? "auto"
    : debugOverride.id === "drizzle"
      ? "rain"
      : debugOverride.id;
  const template = resolvedDebugId === "auto"
    ? { ...baseSnapshot }
    : (templates[resolvedDebugId] || templates.clear);
  const resolvedTemplate = resolvedDebugId === "auto"
    ? template
    : applyMobileWeatherPrecipitationOverride(template, resolvedDebugId, options?.precipitationOverrideMm);
  const withCloudOverride = normalizedCloudOverride
    ? applyMobileWeatherCloudOverride(resolvedTemplate, normalizedCloudOverride, period)
    : resolvedTemplate;
  const withTemperatureOverride = temperatureOverrideC === null
    ? withCloudOverride
    : {
      ...withCloudOverride,
      temperature: `${Math.round(temperatureOverrideC)} °C`,
      temperatureC: temperatureOverrideC,
      apparentTemperatureC: Number.isFinite(Number(withCloudOverride.apparentTemperatureC))
        ? temperatureOverrideC + (Number(withCloudOverride.apparentTemperatureC) - Number(withCloudOverride.temperatureC || temperatureOverrideC))
        : temperatureOverrideC
    };
  return normalizeWeatherSnapshot({
    ...baseSnapshot,
    ...withTemperatureOverride,
    observedAt: fallbackObservedAt,
    dayPeriod: period,
    isDay: period === "night" ? 0 : 1,
    moonPhase: fallbackMoonPhase
  });
}

function loadMobileWeatherThemeDebugOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const legacyId = String(parsed?.id || "").trim();
    const selectedId = legacyId === "heavy-rain"
      ? "rain"
      : legacyId === "drizzle"
        ? "rain"
      : legacyId === "light-snow" || legacyId === "dense-snow"
        ? "snow"
        : legacyId;
    const match = MOBILE_WEATHER_THEME_DEBUG_OPTIONS.find((item) => item.id === selectedId);
    return match && match.id !== "auto" ? match : null;
  } catch (error) {
    return null;
  }
}

function loadMobileWeatherThemeCloudOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_CLOUD_KEY);
    const value = normalizeMobileWeatherCloudDebugId(raw || "");
    if (MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS.some((item) => item.id === value)) return value;

    const legacyRaw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_KEY);
    if (!legacyRaw) return "";
    const legacyParsed = JSON.parse(legacyRaw);
    const legacyId = normalizeMobileWeatherCloudDebugId(legacyParsed?.id || "");
    return MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS.some((item) => item.id === legacyId) ? legacyId : "";
  } catch (error) {
    return "";
  }
}

function loadMobileWeatherThemePeriodOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_PERIOD_KEY);
    const value = String(raw || "").trim();
    return value === "day" || value === "night" ? value : "";
  } catch (error) {
    return "";
  }
}

function loadMobileWeatherThemeWindOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_WIND_KEY);
    if (raw === null || raw === "") return null;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) return null;
    return Math.max(0, Math.min(70, Math.round(value)));
  } catch (error) {
    return null;
  }
}

function loadMobileWeatherThemePrecipOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_PRECIP_KEY);
    if (raw === null || raw === "") return null;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) return null;
    return Math.max(0, Math.min(12, Math.round(value * 10) / 10));
  } catch (error) {
    return null;
  }
}

function loadMobileWeatherThemePhaseOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_PHASE_KEY);
    const value = String(raw || "").trim().toLowerCase();
    return MOBILE_WEATHER_PHASE_DEBUG_OPTIONS.some((item) => item.id === value) ? value : "";
  } catch (error) {
    return "";
  }
}

function loadMobileWeatherThemeMoonOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_MOON_KEY);
    const value = String(raw || "").trim().toLowerCase();
    return MOBILE_WEATHER_MOON_DEBUG_OPTIONS.some((item) => item.id === value) ? value : "";
  } catch (error) {
    return "";
  }
}

function loadMobileWeatherThemeSeasonOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_SEASON_KEY);
    const value = String(raw || "").trim().toLowerCase();
    return MOBILE_WEATHER_SEASON_DEBUG_OPTIONS.some((item) => item.id === value) ? value : "";
  } catch (error) {
    return "";
  }
}

function loadMobileWeatherThemeTemperatureOverride() {
  try {
    const raw = localStorage.getItem(MOBILE_WEATHER_THEME_DEBUG_TEMP_KEY);
    if (raw === null || raw === undefined || String(raw).trim() === "") return null;
    const value = Number(raw);
    return Number.isFinite(value) ? Math.max(-15, Math.min(38, Math.round(value))) : null;
  } catch (error) {
    return null;
  }
}

function loadMobileWeatherSceneOnlyPreference() {
  try {
    return localStorage.getItem(MOBILE_WEATHER_SCENE_ONLY_KEY) === "1";
  } catch (error) {
    return false;
  }
}

function saveMobileWeatherThemeDebugOverride(nextId = "auto") {
  const match = MOBILE_WEATHER_THEME_DEBUG_OPTIONS.find((item) => item.id === String(nextId || "").trim()) || MOBILE_WEATHER_THEME_DEBUG_OPTIONS[0];
  try {
    if (!match || match.id === "auto") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_KEY, JSON.stringify({ id: match.id }));
  } catch (error) {
    // Dočasný prepínač vzhľadu nech appku neblokuje, keď localStorage zlyhá.
  }
}

function saveMobileWeatherThemeCloudOverride(nextId = "") {
  const normalizedId = normalizeMobileWeatherCloudDebugId(nextId);
  const isValid = MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS.some((item) => item.id === normalizedId);
  try {
    if (!isValid || !normalizedId) {
      localStorage.removeItem(MOBILE_WEATHER_THEME_CLOUD_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_CLOUD_KEY, normalizedId);
  } catch (error) {
    // Dočasný prepínač vzhľadu nech appku neblokuje, keď localStorage zlyhá.
  }
}

function saveMobileWeatherThemeWindOverride(nextValue = null) {
  try {
    if (nextValue === null || nextValue === undefined || String(nextValue).trim() === "") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_WIND_KEY);
      return;
    }
    const value = Number(nextValue);
    if (!Number.isFinite(value) || value < 0) {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_WIND_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_WIND_KEY, String(Math.max(0, Math.min(70, Math.round(value)))));
  } catch (error) {
    // Dočasný prepínač vetra nech appku neblokuje.
  }
}

function saveMobileWeatherThemePrecipOverride(nextValue = null) {
  try {
    if (nextValue === null || nextValue === undefined || String(nextValue).trim() === "") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_PRECIP_KEY);
      return;
    }
    const value = Number(nextValue);
    if (!Number.isFinite(value) || value < 0) {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_PRECIP_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_PRECIP_KEY, String(Math.max(0, Math.min(12, Math.round(value * 10) / 10))));
  } catch (error) {
    // Dočasný prepínač zrážok nech appku neblokuje.
  }
}

function saveMobileWeatherThemeTemperatureOverride(nextValue = null) {
  try {
    if (nextValue === null || nextValue === undefined || String(nextValue).trim() === "") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_TEMP_KEY);
      return;
    }
    const value = Number(nextValue);
    if (!Number.isFinite(value)) {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_TEMP_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_TEMP_KEY, String(Math.max(-15, Math.min(38, Math.round(value)))));
  } catch (error) {
    // Dočasný prepínač teploty nech appku neblokuje.
  }
}

function saveMobileWeatherThemePhaseOverride(nextValue = "") {
  const value = String(nextValue || "").trim().toLowerCase();
  try {
    if (!MOBILE_WEATHER_PHASE_DEBUG_OPTIONS.some((item) => item.id === value) || value === "") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_PHASE_KEY);
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_PERIOD_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_PHASE_KEY, value);
    localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_PERIOD_KEY);
  } catch (error) {
    // Dočasný prepínač fázy dňa nech appku neblokuje.
  }
}

function saveMobileWeatherThemeMoonOverride(nextValue = "") {
  const value = String(nextValue || "").trim().toLowerCase();
  try {
    if (!MOBILE_WEATHER_MOON_DEBUG_OPTIONS.some((item) => item.id === value) || value === "") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_MOON_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_MOON_KEY, value);
  } catch (error) {
    // Dočasný prepínač mesiaca nech appku neblokuje.
  }
}

function saveMobileWeatherThemeSeasonOverride(nextValue = "") {
  const value = String(nextValue || "").trim().toLowerCase();
  try {
    if (!MOBILE_WEATHER_SEASON_DEBUG_OPTIONS.some((item) => item.id === value) || value === "") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_SEASON_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_SEASON_KEY, value);
  } catch (error) {
    // Dočasný prepínač sezóny nech appku neblokuje.
  }
}

function saveMobileWeatherSceneOnlyPreference(enabled = false) {
  try {
    if (!enabled) {
      localStorage.removeItem(MOBILE_WEATHER_SCENE_ONLY_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_SCENE_ONLY_KEY, "1");
  } catch (error) {
    // Dočasný prepínač čistého pozadia nech appku neblokuje.
  }
}

function applyMobileWeatherSceneMode() {
  if (typeof document === "undefined" || !document.body) return;
  const body = document.body;
  const isActive = body.classList.contains("app-mobile-shell") && loadMobileWeatherSceneOnlyPreference();
  body.classList.toggle("app-mobile-weather-scene-only", isActive);
}

function saveMobileWeatherThemePeriodOverride(nextValue = "") {
  const value = String(nextValue || "").trim();
  try {
    if (value !== "day" && value !== "night") {
      localStorage.removeItem(MOBILE_WEATHER_THEME_DEBUG_PERIOD_KEY);
      return;
    }
    localStorage.setItem(MOBILE_WEATHER_THEME_DEBUG_PERIOD_KEY, value);
  } catch (error) {
    // Dočasný prepínač obdobia dňa nech appku neblokuje.
  }
}

function applyMobileWeatherTheme(snapshot = null) {
  if (typeof document === "undefined" || !document.body) return;
  const body = document.body;
  if (!body.classList.contains("app-mobile-shell")) {
    body.removeAttribute("data-mobile-weather-tone");
    body.removeAttribute("data-mobile-weather-variant");
    body.removeAttribute("data-mobile-weather-cloud");
    body.removeAttribute("data-mobile-weather-phenomenon");
    body.removeAttribute("data-mobile-weather-period");
    body.removeAttribute("data-mobile-weather-wind");
    body.removeAttribute("data-mobile-weather-season");
    body.removeAttribute("data-mobile-weather-heat");
    body.removeAttribute("data-mobile-weather-phase");
    body.removeAttribute("data-mobile-weather-debug");
    window.weatherBackgroundEngine?.clear?.();
    window.weatherAudioEngine?.clear?.();
    syncMobileWeatherSoundButton();
    scheduleEmbeddedMobilePreviewMetricsPush();
    return;
  }

  const debugOverride = loadMobileWeatherThemeDebugOverride();
  const debugCloudOverride = loadMobileWeatherThemeCloudOverride();
  const debugPhaseOverride = loadMobileWeatherThemePhaseOverride();
  const debugSeasonOverride = loadMobileWeatherThemeSeasonOverride();
  const debugTemperatureOverride = loadMobileWeatherThemeTemperatureOverride();
  const debugWindSpeedOverride = loadMobileWeatherThemeWindOverride();
  const debugPrecipitationOverride = loadMobileWeatherThemePrecipOverride();
  const forcedMoonPhase = MOBILE_WEATHER_FIXED_MOON_PHASE;
  const resolvedSnapshot = snapshot || homeWeatherSnapshot || null;
  const fallbackPeriod = weatherDayPeriodFromHour(new Date().getHours());
  const periodBase = debugOverride?.period || (resolvedSnapshot ? weatherSnapshotDayPeriod(resolvedSnapshot) : fallbackPeriod);
  const phaseOverride = debugPhaseOverride;
  const period = mobileWeatherPhasePeriod(phaseOverride, periodBase);
  const themedSnapshotBase = buildMobileWeatherThemeDebugSnapshot(resolvedSnapshot, debugOverride, period, {
    precipitationOverrideMm: debugPrecipitationOverride,
    temperatureOverrideC: debugTemperatureOverride,
    phaseOverride,
    moonPhaseOverride: forcedMoonPhase,
    cloudOverride: debugCloudOverride
  }) || resolvedSnapshot;
  const autoPhenomenonVariantBase = debugOverride?.id === "none"
    ? "none"
    : mobileWeatherPhenomenonVariantFromSnapshot(themedSnapshotBase);
  const autoPrecipitationDebugId = debugOverride?.id || autoPhenomenonVariantBase;
  const themedSnapshot = debugPrecipitationOverride === null || !themedSnapshotBase || debugOverride
    ? themedSnapshotBase
    : normalizeWeatherSnapshot({
      ...themedSnapshotBase,
      ...applyMobileWeatherPrecipitationOverride(themedSnapshotBase, autoPrecipitationDebugId, debugPrecipitationOverride)
    });
  const dryPhenomenonVariant = String(debugOverride?.variant || autoPhenomenonVariantBase || "").trim().toLowerCase();
  const precipitationSuppressed = debugPrecipitationOverride !== null
    && Number(debugPrecipitationOverride) <= 0.03
    && !["fog", "mist", "none"].includes(dryPhenomenonVariant);
  const heatLevel = themedSnapshot ? mobileWeatherHeatLevel(themedSnapshot, period) : "normal";
  const phase = phaseOverride || mobileWeatherPhaseFromSnapshot(themedSnapshot, period);
  const cloudVisual = MOBILE_WEATHER_CLOUD_DEBUG_OPTIONS.find((item) => item.id === debugCloudOverride) || null;
  const autoCloudVariant = cloudVisual?.variant || mobileWeatherCloudVariantFromSnapshot(themedSnapshot, period);
  const autoPhenomenonVariant = precipitationSuppressed || debugOverride?.id === "none"
    ? "none"
    : mobileWeatherPhenomenonVariantFromSnapshot(themedSnapshot);
  const tone = debugCloudOverride
    ? (cloudVisual?.tone || mobileWeatherToneFromState({
      phenomenonVariant: "none",
      cloudVariant: autoCloudVariant,
      heatLevel,
      snapshot: themedSnapshot
    }))
    : ((precipitationSuppressed ? "" : debugOverride?.tone) || mobileWeatherToneFromState({
      phenomenonVariant: autoPhenomenonVariant,
      cloudVariant: autoCloudVariant,
      heatLevel,
      snapshot: themedSnapshot
    }));
  const variant = mobileWeatherBodyVariantFromState({
    cloudVariant: autoCloudVariant,
    heatLevel,
    period
  });
  const phenomenonVariant = precipitationSuppressed ? "none" : (debugOverride?.variant || autoPhenomenonVariant);
  const observedAutoWindSpeed = themedSnapshot
    ? (toFiniteWeatherNumber(themedSnapshot?.windSpeedKmh) ?? extractWeatherNumber(themedSnapshot?.wind))
    : null;
  const autoWindSpeed = observedAutoWindSpeed !== null
    ? observedAutoWindSpeed
    : weatherWindSpeedFallbackForCategory(debugOverride?.wind || "calm");
  const windSpeed = debugWindSpeedOverride ?? autoWindSpeed;
  const baseWind = observedAutoWindSpeed !== null
    ? weatherWindStateFromSpeed(autoWindSpeed)
    : (debugOverride?.wind || (themedSnapshot ? weatherWindState(themedSnapshot) : "calm"));
  const resolvedWind = debugWindSpeedOverride === null ? baseWind : weatherWindStateFromSpeed(debugWindSpeedOverride);
  const season = debugSeasonOverride || mobileWeatherSeasonFromDate();
  const engineSnapshot = themedSnapshot
    ? normalizeWeatherSnapshot({ ...themedSnapshot })
    : themedSnapshot;

  if (engineSnapshot && debugOverride?.id && debugOverride.id !== "auto") {
    const fogLikeDebug = phenomenonVariant === "fog" || phenomenonVariant === "mist";
    if (fogLikeDebug) {
      engineSnapshot.humidityPct = Math.max(Number(engineSnapshot.humidityPct) || 0, 95);
      engineSnapshot.visibilityM = 1350;
      engineSnapshot.cloudCoverPct = Math.max(Number(engineSnapshot.cloudCoverPct) || 0, 84);
      engineSnapshot.cloudCoverLowPct = Math.max(Number(engineSnapshot.cloudCoverLowPct) || 0, 88);
      engineSnapshot.cloudCoverMidPct = Math.max(Number(engineSnapshot.cloudCoverMidPct) || 0, 74);
      engineSnapshot.cloudCoverHighPct = Math.max(Number(engineSnapshot.cloudCoverHighPct) || 0, 58);
    } else {
      engineSnapshot.visibilityM = Math.max(
        Number.isFinite(Number(engineSnapshot.visibilityM)) ? Number(engineSnapshot.visibilityM) : 22000,
        22000
      );
      engineSnapshot.humidityPct = Math.min(
        Number.isFinite(Number(engineSnapshot.humidityPct)) ? Number(engineSnapshot.humidityPct) : 66,
        phenomenonVariant === "snow" || phenomenonVariant === "sleet" ? 88 : 72
      );
    }
  }

  body.dataset.mobileWeatherTone = tone;
  body.dataset.mobileWeatherVariant = variant;
  body.dataset.mobileWeatherCloud = autoCloudVariant;
  body.dataset.mobileWeatherPhenomenon = phenomenonVariant;
  body.dataset.mobileWeatherPeriod = period;
  body.dataset.mobileWeatherWind = resolvedWind;
  body.dataset.mobileWeatherSeason = season;
  body.dataset.mobileWeatherHeat = heatLevel;
  body.dataset.mobileWeatherPhase = phase;
  body.dataset.mobileWeatherDebug = debugOverride?.id || "auto";

  const weatherBackgroundInput = buildMobileWeatherBackgroundInput({
    snapshot: engineSnapshot,
    tone,
    variant: autoCloudVariant,
    phenomenonVariant,
    season,
    period,
    phase,
    wind: resolvedWind,
    windSpeed,
    precipitationLocked: debugPrecipitationOverride !== null,
    moonPhaseOverride: forcedMoonPhase,
    cloudLocked: debugCloudOverride !== ""
  });

  window.weatherBackgroundEngine?.apply?.(weatherBackgroundInput);
  window.weatherAudioEngine?.setEnabled?.(mobileWeatherSoundEnabled);
  if (mobileWeatherSoundEnabled) {
    window.weatherAudioEngine?.apply?.(weatherBackgroundInput);
    window.weatherAudioEngine?.setMasterVolume?.(mobileWeatherSoundVolume);
  } else {
    window.weatherAudioEngine?.clear?.();
  }
  syncMobileWeatherSoundButton();
  syncMainMenuWeatherAudioControls();
  scheduleEmbeddedMobilePreviewMetricsPush();
}

function weatherIllustrationMarkup(weather) {
  const tone = weatherVisualTone(weather);
  const variant = weatherIllustrationVariant(weather);
  const dayPeriod = weatherSnapshotDayPeriod(weather);
  return `
    <div class="weather-illustration weather-illustration--${tone} weather-illustration--${dayPeriod} weather-illustration--variant-${variant}" aria-hidden="true">
      <span class="weather-illustration__glow"></span>
      <span class="weather-illustration__sun"></span>
      <span class="weather-illustration__moon"></span>
      <span class="weather-illustration__cloud weather-illustration__cloud--back"></span>
      <span class="weather-illustration__cloud weather-illustration__cloud--front"></span>
      <span class="weather-illustration__rain weather-illustration__rain--one"></span>
      <span class="weather-illustration__rain weather-illustration__rain--two"></span>
      <span class="weather-illustration__rain weather-illustration__rain--three"></span>
      <span class="weather-illustration__snow weather-illustration__snow--one"></span>
      <span class="weather-illustration__snow weather-illustration__snow--two"></span>
      <span class="weather-illustration__bolt"></span>
      <span class="weather-illustration__mist"></span>
    </div>
  `;
}

function weatherMetricMarkup(label, value) {
  if (!value) return "";
  return `
    <div class="weather-metric">
      <span class="weather-metric__label">${escapeHtml(label)}</span>
      <strong class="weather-metric__value">${escapeHtml(value)}</strong>
    </div>
  `;
}

function weatherHeroFactMarkup(label, value, tone = "soft") {
  if (!value) return "";
  return `
    <span class="weather-hero__fact weather-hero__fact--${escapeAttribute(tone)}">
      <span class="weather-hero__fact-label">${escapeHtml(label)}</span>
      <strong class="weather-hero__fact-value">${escapeHtml(value)}</strong>
    </span>
  `;
}

function weatherHeroMarkup(weather, options = {}) {
  const placeLabel = weather?.placeLabel || "Zákopčie";
  const currentTemperature = weather?.temperature || "—";
  const condition = weather?.condition || "Načítavam počasie";
  const observedAt = options.timeLabel || (weather?.observedAt ? `Aktualizované ${weather.observedAt}` : "Aktuálne pre záhradu");
  const note = options.note || "";
  const dayPeriod = weatherSnapshotDayPeriod(weather);
  const controls = options.controls || "";
  const periodLabel = dayPeriod === "night" ? "Noc" : "Deň";
  const facts = Array.isArray(options.facts)
    ? options.facts.filter((item) => item && item.value)
    : [];
  return `
    <div class="weather-hero weather-hero--${weatherVisualTone(weather)} weather-hero--${escapeAttribute(dayPeriod)}${options.compact ? " weather-hero--compact" : ""}">
      <div class="weather-hero__art">
        ${weatherIllustrationMarkup(weather)}
      </div>
      <div class="weather-hero__content">
        <div class="weather-hero__header">
          <div class="weather-hero__header-main">
            <p class="weather-hero__place">${escapeHtml(placeLabel)}</p>
            <p class="weather-hero__time">${escapeHtml(observedAt)}</p>
          </div>
          ${controls || options.compact ? `<div class="weather-hero__header-side">${controls || `<span class="weather-hero__phase weather-hero__phase--${escapeAttribute(dayPeriod)}">${escapeHtml(periodLabel)}</span>`}</div>` : ""}
        </div>
        <div class="weather-hero__main">
          <strong class="weather-hero__temperature">${escapeHtml(currentTemperature)}</strong>
          <div class="weather-hero__copy">
            <p class="weather-hero__condition">${escapeHtml(condition)}</p>
          </div>
        </div>
        <div class="weather-metrics">
          ${weatherMetricMarkup("Vlhkosť", weather?.humidity)}
          ${weatherMetricMarkup("Zrážky", weather?.rain)}
          ${weatherMetricMarkup("Vietor", weather?.wind)}
        </div>
        ${facts.length ? `
          <div class="weather-hero__facts">
            ${facts.map((item) => weatherHeroFactMarkup(item.label, item.value, item.tone || "soft")).join("")}
          </div>
        ` : ""}
        ${note ? `<p class="weather-hero__note">${escapeHtml(note)}</p>` : ""}
      </div>
    </div>
  `;
}

function mainMenuWeatherDetailMarkup(label, value) {
  if (!value) return "";
  return `
    <span class="main-menu-weather-mini__detail">
      <span class="main-menu-weather-mini__detail-label">${escapeHtml(label)}</span>
      <strong class="main-menu-weather-mini__detail-value">${escapeHtml(value)}</strong>
    </span>
  `;
}

function renderMiniWeatherTrendMarkup(days = [], options = {}) {
  if (!Array.isArray(days) || !days.length) {
    return `
      <div class="main-menu-weather-mini__trend ${options.compact ? "main-menu-weather-mini__trend--compact" : ""} main-menu-weather-mini__trend--loading">
        <p class="main-menu-weather-mini__trend-label">Tento týždeň</p>
        <span>Načítavam pondelkový prehľad zrážok a priebehu dní</span>
      </div>
    `;
  }

  const totalRain = days.reduce((sum, item) => sum + Number(item.rainMm || 0), 0);
  const rainyDays = days.filter((item) => Number(item.rainMm || 0) > 0.2).length;
  const dryDays = Math.max(0, days.length - rainyDays);
  const maxRain = Math.max(...days.map((item) => Number(item.rainMm || 0)), 1);
  const skyVisual = weatherWeekVisualSummary(days);
  const totalRainLabel = formatWeatherRain(totalRain) || "0 mm";
  const trendMeta = `${countedLabel(rainyDays, "daždivý deň", "daždivé dni", "daždivých dní")} • ${countedLabel(dryDays, "suchý deň", "suché dni", "suchých dní")} • ${skyVisual.weekLabel}`;

  return `
    <div class="main-menu-weather-mini__trend ${options.compact ? "main-menu-weather-mini__trend--compact" : ""}">
      <div class="main-menu-weather-mini__trend-head">
        <p class="main-menu-weather-mini__trend-label">Tento týždeň</p>
        <div class="main-menu-weather-mini__trend-totals">
          <strong class="main-menu-weather-mini__trend-total">${escapeHtml(totalRainLabel)}</strong>
        </div>
      </div>
      <div class="main-menu-weather-mini__trend-bars" aria-label="Zrážky v aktuálnom týždni od pondelka do nedele">
        ${days.map((item) => {
          const rainMm = Number(item.rainMm || 0);
          const level = rainMm > 0 ? Math.max(18, Math.round((rainMm / maxRain) * 100)) : 8;
          const dayLabel = item.label || "";
          const visual = weatherDayVisual(item);
          return `
            <span
              class="main-menu-weather-mini__trend-day ${rainMm > 0.2 ? "is-rainy" : "is-dry"} ${item.isToday ? "is-today" : ""}"
              title="${escapeAttribute(`${dayLabel}: ${formatWeatherRain(rainMm) || "0 mm"} • ${visual.label}`)}"
              aria-label="${escapeAttribute(`${dayLabel}: ${formatWeatherRain(rainMm) || "0 mm"} • ${visual.label}`)}"
            >
              <span class="main-menu-weather-mini__trend-sun" aria-hidden="true">${escapeHtml(visual.icon)}</span>
              <span class="main-menu-weather-mini__trend-bar">
                <span class="main-menu-weather-mini__trend-fill" style="height:${level}%"></span>
              </span>
              <span class="main-menu-weather-mini__trend-day-label">${escapeHtml(dayLabel)}</span>
            </span>
          `;
        }).join("")}
      </div>
      <p class="main-menu-weather-mini__trend-meta">
        ${escapeHtml(trendMeta)}
      </p>
    </div>
  `;
}

function renderMainMenuWeatherMini(weather, options = {}) {
  if (!weather) {
    return `
      <div class="main-menu-weather-mini__loading">
        <span class="main-menu-weather-mini__loading-dot"></span>
        <span>Načítavam Zákopčie</span>
      </div>
    `;
  }

  const triggerAttributes = options.interactive ? ' data-open-weather-overview' : "";
  const observedLabel = weather.observedAt ? `Akt. ${weather.observedAt}` : "";
  const sunshine = formatSunshineHours(weather.sunshineHours);
  const dayPeriod = weatherSnapshotDayPeriod(weather);
  const phaseLabel = dayPeriod === "night" ? "Noc" : "Deň";
  const phaseIcon = dayPeriod === "night" ? ICONS.weatherMoon : ICONS.weatherSun;

  if (options.heroCompact) {
    const heroMeta = weather.wind || weather.rain || weather.humidity || "";
    return `
      <div class="main-menu-weather-mini__card main-menu-weather-mini__card--${weatherVisualTone(weather)} main-menu-weather-mini__card--${escapeAttribute(dayPeriod)} main-menu-weather-mini__card--hero-pill"${triggerAttributes}>
        <div class="main-menu-weather-mini__hero-pill">
          <span class="main-menu-weather-mini__hero-phase main-menu-weather-mini__hero-phase--${escapeAttribute(dayPeriod)}" aria-label="${escapeAttribute(phaseLabel)}" title="${escapeAttribute(phaseLabel)}"><span aria-hidden="true">${escapeHtml(phaseIcon)}</span></span>
          <strong class="main-menu-weather-mini__hero-temperature">${escapeHtml(weather.temperature || "—")}</strong>
          <span class="main-menu-weather-mini__hero-condition">${escapeHtml(weather.condition || "Počasie")}</span>
          ${heroMeta ? `<span class="main-menu-weather-mini__hero-meta">${escapeHtml(heroMeta)}</span>` : ""}
        </div>
      </div>
    `;
  }

  return `
    <div class="main-menu-weather-mini__card main-menu-weather-mini__card--${weatherVisualTone(weather)} main-menu-weather-mini__card--${escapeAttribute(dayPeriod)}"${triggerAttributes}>
      <div class="main-menu-weather-mini__inner">
        <div class="main-menu-weather-mini__art">
          ${options.compactTrend && observedLabel ? `<p class="main-menu-weather-mini__meta main-menu-weather-mini__meta--art">${escapeHtml(observedLabel)}</p>` : ""}
          ${weatherIllustrationMarkup(weather)}
        </div>
        <div class="main-menu-weather-mini__copy">
          <div class="main-menu-weather-mini__eyebrow-row">
            <p class="main-menu-weather-mini__eyebrow">${escapeHtml(weather.placeLabel || "Zákopčie")}</p>
            <span class="main-menu-weather-mini__phase main-menu-weather-mini__phase--${escapeAttribute(dayPeriod)}"><span class="main-menu-weather-mini__phase-icon" aria-hidden="true">${escapeHtml(phaseIcon)}</span>${escapeHtml(phaseLabel)}</span>
          </div>
          <div class="main-menu-weather-mini__row">
            <strong class="main-menu-weather-mini__temperature">${escapeHtml(weather.temperature || "—")}</strong>
            <span class="main-menu-weather-mini__condition">${escapeHtml(weather.condition || "Počasie")}</span>
          </div>
          <div class="main-menu-weather-mini__details">
            ${mainMenuWeatherDetailMarkup("Vlhkosť", weather.humidity)}
            ${mainMenuWeatherDetailMarkup("Zrážky", weather.rain)}
            ${mainMenuWeatherDetailMarkup("Vietor", weather.wind)}
            ${mainMenuWeatherDetailMarkup("Slnko", sunshine)}
          </div>
          ${!options.compactTrend ? `<p class="main-menu-weather-mini__meta main-menu-weather-mini__meta--quiet">${escapeHtml(observedLabel)}</p>` : ""}
        </div>
      </div>
      ${options.showTrend ? renderMiniWeatherTrendMarkup(options.trendDays || [], { compact: options.compactTrend }) : ""}
    </div>
  `;
}

function moodOption(value) {
  return MOOD_OPTIONS.find((item) => item.value === value) || null;
}

function renderMoodPicker(selectedMood = "") {
  return `
    <div class="mood-picker" id="add-entry-mood-picker" role="group" aria-label="Pocit pri zápise">
      ${MOOD_OPTIONS.map((item) => `
        <button
          class="mood-picker__option ${selectedMood === item.value ? "is-selected" : ""}"
          type="button"
          data-mood-value="${escapeAttribute(item.value)}"
          aria-pressed="${selectedMood === item.value ? "true" : "false"}"
          title="${escapeAttribute(item.label)}"
        >
          <span class="mood-picker__emoji" aria-hidden="true">${item.emoji}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderMoodBadge(moodValue, className = "journal-mood-badge") {
  const mood = moodOption(moodValue);
  if (!mood) return "";
  return `<span class="${escapeAttribute(className)}" title="${escapeAttribute(mood.label)}" aria-label="${escapeAttribute(mood.label)}">${mood.emoji}</span>`;
}

function journalEntryTypeRecord(value = "") {
  const normalizedValue = String(value || "note").trim() || "note";
  return JOURNAL_ENTRY_TYPE_OPTIONS.find((item) => item.value === normalizedValue)
    || JOURNAL_ENTRY_TYPE_OPTIONS[0];
}

function journalEntryTypeLabel(value = "") {
  return journalEntryTypeRecord(value).label;
}

function journalThemeKindLabel(kind = "") {
  switch (String(kind || "").trim()) {
    case "tag":
      return "Tag";
    case "place":
      return "Miesto";
    case "phenomenon":
      return "Jav";
    case "weather":
      return "Počasie";
    case "entry-type":
      return "Typ zápisu";
    case "category":
      return "Kategória";
    case "variety":
      return "Karta";
    default:
      return "Téma";
  }
}

function journalThemeChipTitle(chip) {
  const label = String(chip?.label || "").trim();
  const separatorIndex = label.indexOf(":");
  if (separatorIndex === -1) return label;
  return label.slice(separatorIndex + 1).trim();
}

function renderJournalEntryTypePicker(selectedType = "note", options = {}) {
  const mobileMinimal = Boolean(options?.mobileMinimal);
  if (mobileMinimal) {
    return `
      <div class="journal-entry-type-field journal-entry-type-field--hidden" hidden aria-hidden="true">
        ${singleChoiceChipOptions("entryType", JOURNAL_ENTRY_TYPE_OPTIONS, selectedType || "note")}
      </div>
    `;
  }
  return `
    <div class="journal-entry-type-field">
      <p class="journal-entry-type-field__label">Typ zápisu</p>
      <div class="choice-group choice-group--compact-meta choice-group--journal-entry-type">
        ${singleChoiceChipOptions("entryType", JOURNAL_ENTRY_TYPE_OPTIONS, selectedType || "note")}
      </div>
    </div>
  `;
}

function renderJournalWalkFields(walkValue = null) {
  const walk = normalizeJournalWalk({ walk: walkValue }) || {
    startPlace: "",
    endPlace: "",
    startedAt: "",
    endedAt: "",
    distanceKm: null,
    durationMinutes: null,
    routePoints: [],
    gpsPoints: [],
    temperature: "",
    wind: "",
    precipitation: "",
    conditions: ""
  };

  return `
    <section id="journal-overlay-walk-fields" class="journal-walk-editor" hidden>
      <div class="journal-walk-editor__head">
        <div>
          <p class="journal-entry-type-field__label">Prechádzka a trasa</p>
          <p class="journal-walk-editor__hint">Ťukni Štart, choď, foť a na konci daj Koniec. Čo vieme, to sa zapíše samo.</p>
        </div>
      </div>
      <section class="journal-walk-gps">
        <div class="journal-walk-gps__head">
          <div>
            <p class="journal-entry-type-field__label">Štart a stop prechádzky</p>
            <p class="journal-walk-gps__hint">Ťukni Štart prechádzky, choď a foť. GPS bude priebežne zbierať body a čas aj dĺžka sa spočítajú samy.</p>
          </div>
          <div class="journal-walk-gps__actions">
            <button class="button journal-walk-gps__button journal-walk-gps__button--start" type="button" data-walk-gps-action="start"><span aria-hidden="true">${ICONS.walkStart}</span><span>Štart</span></button>
            <button class="button button--ghost journal-walk-gps__button journal-walk-gps__button--pause" type="button" data-walk-gps-action="pause"><span aria-hidden="true">${ICONS.walkPause}</span><span>Pauza</span></button>
            <button class="button button--ghost journal-walk-gps__button journal-walk-gps__button--resume" type="button" data-walk-gps-action="resume"><span aria-hidden="true">${ICONS.walkResume}</span><span>Pokračovať</span></button>
            <button class="button button--ghost journal-walk-gps__button journal-walk-gps__button--stop" type="button" data-walk-gps-action="stop"><span aria-hidden="true">${ICONS.walkStop}</span><span>Koniec</span></button>
          </div>
        </div>
        <div class="journal-walk-gps__auto" id="journal-overlay-gps-auto">
          <div class="journal-walk-gps__auto-card">
            <span>Čas prechádzky</span>
            <strong id="journal-overlay-gps-duration">Zatiaľ nebeží</strong>
          </div>
          <div class="journal-walk-gps__auto-card">
            <span>Dĺžka trasy</span>
            <strong id="journal-overlay-gps-distance">Zatiaľ bez trasy</strong>
          </div>
          <div class="journal-walk-gps__auto-card">
            <span>Stav</span>
            <strong id="journal-overlay-gps-mode">Pripravené</strong>
          </div>
        </div>
        <p class="journal-walk-gps__status" id="journal-overlay-gps-status">GPS body sa zatiaľ neukladajú.</p>
        <div class="journal-walk-gps__summary" id="journal-overlay-gps-summary"></div>
        <div class="journal-walk-gps__points" id="journal-overlay-gps-points" hidden></div>
        <div id="journal-overlay-gps-map-wrap" hidden>
          ${renderWalkMapMarkup(walk, { compact: false, live: true })}
        </div>
      </section>
      <details class="entry-advanced journal-walk-editor__optional">
        <summary class="entry-advanced__summary">Doplniť ručne, len ak chceš</summary>
        <div class="entry-advanced__content">
          <div class="journal-walk-editor__grid">
            <label class="field-block journal-walk-editor__field">
              <span>Štart</span>
              <input name="walkStartPlace" type="text" placeholder="Kde prechádzka začala" value="${escapeAttribute(walk.startPlace)}">
            </label>
            <label class="field-block journal-walk-editor__field">
              <span>Koniec</span>
              <input name="walkEndPlace" type="text" placeholder="Kde prechádzka skončila" value="${escapeAttribute(walk.endPlace)}">
            </label>
            <label class="field-block journal-walk-editor__field">
              <span>Teplota po trase</span>
              <input name="walkTemperature" type="text" placeholder="Napr. 12 °C" value="${escapeAttribute(walk.temperature)}">
            </label>
            <label class="field-block journal-walk-editor__field">
              <span>Vietor</span>
              <input name="walkWind" type="text" placeholder="Napr. 7 km/h" value="${escapeAttribute(walk.wind)}">
            </label>
            <label class="field-block journal-walk-editor__field">
              <span>Zrážky</span>
              <input name="walkPrecipitation" type="text" placeholder="Napr. 0 mm" value="${escapeAttribute(walk.precipitation)}">
            </label>
            <label class="field-block journal-walk-editor__field">
              <span>Podmienky</span>
              <input name="walkConditions" type="text" placeholder="Napr. polooblačno, prehánky, búrka v diaľke" value="${escapeAttribute(walk.conditions)}">
            </label>
            <label class="field-block field-block--full journal-walk-editor__field journal-walk-editor__field--full">
              <span>Body trasy</span>
              <textarea name="walkRoutePoints" rows="4" placeholder="Každý bod trasy na nový riadok, napríklad&#10;Dom&#10;Lúka pri potoku&#10;Lesná cesta&#10;Vyhliadka">${escapeHtml(walkRoutePointsText(walk))}</textarea>
            </label>
          </div>
        </div>
      </details>
    </section>
  `;
}

function journalEntryTypeUi(value = "") {
  const normalizedValue = String(value || "note").trim() || "note";
  const map = {
    note: {
      title: "Názov zápisu",
      text: "Čo sa stalo, čo si si všimla, čo si našla alebo čo bolo dôležité...",
      place: "Miesto, napr. Záhon pri plote, Les za domom"
    },
    walk: {
      title: "Názov prechádzky",
      text: "Voliteľná poznámka k prechádzke, čo si videla alebo čo si si chcela zapamätať...",
      place: "Trasa alebo miesto prechádzky"
    },
    weather: {
      title: "Počasie alebo jav",
      text: "Napíš, čo sa dialo: mráz, vietor, dážď, sucho, prvý čmeliak, kvitnutie...",
      place: "Kde sa to prejavilo najviac"
    },
    work: {
      title: "Čo si robila",
      text: "Akú prácu si spravila, čo sa podarilo, čo ešte treba dorobiť...",
      place: "Kde si pracovala"
    },
    problem: {
      title: "Aký problém sa objavil",
      text: "Čo sa pokazilo alebo objavilo, ako to vyzerá a čo s tým treba urobiť...",
      place: "Kde sa problém objavil"
    }
  };
  return map[normalizedValue] || map.note;
}

function journalAutoTitle(entryTypeValue = "note", options = {}) {
  const normalizedType = String(entryTypeValue || "note").trim() || "note";
  const firstTag = normalizeTagList(options.tags)[0] || "";
  const weatherCondition = String(options.weatherCondition || "").trim();
  if (normalizedType === "weather") {
    return firstTag || weatherCondition || "Počasie a jav";
  }
  if (normalizedType === "walk") return "Prechádzka";
  if (normalizedType === "work") return "Práca";
  if (normalizedType === "problem") return "Problém";
  return "Zápis";
}

function renderJournalPhenomenaPicker(records = [], currentValue = "") {
  if (!records.length) return "";
  const rawValue = String(currentValue || "");
  const endsWithSeparator = /,\s*$/.test(rawValue);
  const selectedKeys = new Set(normalizeTagList(rawValue).map(slugify));
  const currentToken = endsWithSeparator ? "" : String(rawValue.split(",").pop() || "").trim();
  const queryKey = slugify(currentToken);
  const selectedRecords = records.filter((item) => selectedKeys.has(item.key));
  const suggestionRecords = records
    .filter((item) => !selectedKeys.has(item.key) && (!queryKey || item.key.includes(queryKey)))
    .slice(0, queryKey ? 8 : 12);

  return `
    <div class="journal-tag-picker__head">
      <span class="journal-tag-picker__label">${queryKey ? "Nájdené javy" : "Použité javy"}</span>
      <span class="journal-tag-picker__meta">${queryKey ? `Hľadáš: ${escapeHtml(currentToken)}` : "Klikni a jav sa doplní do zápisu"}</span>
    </div>
    ${selectedRecords.length ? `
      <div class="journal-tag-picker__section">
        <span class="journal-tag-picker__section-label">V zápise už máš</span>
        <div class="journal-tag-picker__chips">
          ${selectedRecords.map((item) => `
            <button class="tag tag--journal-meta tag--interactive journal-tag-picker__chip is-selected" type="button" data-journal-phenomenon-remove="${escapeAttribute(item.label)}">
              <span>${escapeHtml(item.label)}</span>
              <span class="journal-tag-picker__chip-remove" aria-hidden="true">×</span>
            </button>
          `).join("")}
        </div>
      </div>
    ` : ""}
    <div class="journal-tag-picker__section">
      <span class="journal-tag-picker__section-label">${queryKey ? "Návrhy" : "Najčastejšie"}</span>
      ${suggestionRecords.length ? `
        <div class="journal-tag-picker__chips">
          ${suggestionRecords.map((item) => `
            <button class="tag tag--journal-meta tag--interactive journal-tag-picker__chip" type="button" data-journal-phenomenon-pick="${escapeAttribute(item.label)}">
              <span>${escapeHtml(item.label)}</span>
              <span class="journal-tag-picker__chip-count">${item.count}</span>
            </button>
          `).join("")}
        </div>
      ` : `<p class="journal-tag-picker__empty">${queryKey ? "Nenašiel sa podobný uložený jav." : "Zatiaľ tu ešte nemáš žiadne uložené javy."}</p>`}
    </div>
  `;
}

function renderJournalPlacePicker(records = [], currentValue = "") {
  if (!records.length) return "";
  const rawValue = String(currentValue || "").trim();
  const selectedKey = slugify(rawValue);
  const queryKey = selectedKey;
  const selectedRecord = records.find((item) => item.key === selectedKey) || null;
  const suggestionRecords = records
    .filter((item) => item.key !== selectedKey && (!queryKey || item.key.includes(queryKey)))
    .slice(0, queryKey ? 8 : 10);

  return `
    <div class="journal-tag-picker__head">
      <span class="journal-tag-picker__label">${queryKey ? "Nájdené miesta" : "Použité miesta"}</span>
      <span class="journal-tag-picker__meta">${queryKey ? `Hľadáš: ${escapeHtml(rawValue)}` : "Klikni a miesto sa doplní do zápisu"}</span>
    </div>
    ${selectedRecord ? `
      <div class="journal-tag-picker__section">
        <span class="journal-tag-picker__section-label">Aktuálne miesto</span>
        <div class="journal-tag-picker__chips">
          <button class="tag tag--journal-meta tag--interactive journal-tag-picker__chip is-selected" type="button" data-journal-place-clear>
            <span>${escapeHtml(selectedRecord.label)}</span>
            <span class="journal-tag-picker__chip-remove" aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    ` : ""}
    <div class="journal-tag-picker__section">
      <span class="journal-tag-picker__section-label">${queryKey ? "Návrhy miest" : "Najčastejšie"}</span>
      ${suggestionRecords.length ? `
        <div class="journal-tag-picker__chips">
          ${suggestionRecords.map((item) => `
            <button class="tag tag--journal-meta tag--interactive journal-tag-picker__chip" type="button" data-journal-place-pick="${escapeAttribute(item.label)}">
              <span>${escapeHtml(item.label)}</span>
              <span class="journal-tag-picker__chip-count">${item.count}</span>
            </button>
          `).join("")}
        </div>
      ` : `<p class="journal-tag-picker__empty">${queryKey ? "Nenašlo sa podobné uložené miesto." : "Zatiaľ tu ešte nemáš žiadne uložené miesto."}</p>`}
    </div>
  `;
}

function renderJournalWeatherWidgets(weather) {
  if (!weather || (!weather.condition && !weather.temperature && !weather.rain && !weather.wind)) return "";

  const parts = [
    weather.condition ? { icon: weatherIconSymbol(weather), text: weather.condition } : null,
    weather.temperature ? { icon: ICONS.weatherTemp, text: weather.temperature } : null,
    weather.rain ? { icon: ICONS.weatherRain, text: weather.rain } : null,
    weather.wind ? { icon: ICONS.weatherWind, text: weather.wind } : null
  ].filter(Boolean);

  if (!parts.length) return "";

  return `
    <div class="journal-weather">
      ${parts.map((item) => `
        <span class="journal-weather__pill">
          <span class="journal-weather__icon" aria-hidden="true">${item.icon}</span>
          <span>${escapeHtml(item.text)}</span>
        </span>
      `).join("")}
    </div>
  `;
}

function formatJournalWalkDistance(distanceKm) {
  const value = Number(distanceKm);
  if (!Number.isFinite(value)) return "";
  return `${value.toLocaleString("sk-SK", { minimumFractionDigits: value % 1 ? 1 : 0, maximumFractionDigits: 1 })} km`;
}

function formatJournalWalkDuration(durationMinutes) {
  const value = Number(durationMinutes);
  if (!Number.isFinite(value)) return "";
  const rounded = Math.max(0, Math.round(value));
  const hours = Math.floor(rounded / 60);
  const minutes = rounded % 60;
  if (!hours) return `${minutes} min`;
  if (!minutes) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

function renderJournalWalkSummary(walkValue, { compact = false, photoCount = 0 } = {}) {
  const walk = normalizeJournalWalk({ walk: walkValue }) || null;
  if (!walk) return "";

  const startLabel = displayWalkPlaceLabel(walk.startPlace);
  const endLabel = displayWalkPlaceLabel(walk.endPlace);
  const routeLabel = startLabel && endLabel
    ? `${startLabel} › ${endLabel}`
    : startLabel || endLabel || "";
  const gpsPoints = Array.isArray(walk.gpsPoints) ? walk.gpsPoints : [];
  const startedAt = String(walk.startedAt || gpsPoints[0]?.recordedAt || "").trim();
  const endedAt = String(walk.endedAt || gpsPoints[gpsPoints.length - 1]?.recordedAt || "").trim();
  const timeRangeLabel = (() => {
    const startTime = formatWalkDateTime(startedAt);
    const endTime = formatWalkDateTime(endedAt);
    if (startTime && endTime) return `${startTime} - ${endTime}`;
    return startTime || endTime || "";
  })();

  const compactPills = [
    timeRangeLabel ? { icon: ICONS.walkDuration, text: timeRangeLabel } : null,
    walk.distanceKm !== null ? { icon: "-", text: formatJournalWalkDistance(walk.distanceKm) } : null,
    walk.durationMinutes !== null ? { icon: ICONS.walkDuration, text: formatJournalWalkDuration(walk.durationMinutes) } : null,
    gpsPoints.length ? { icon: ICONS.walkGps, text: countedLabel(gpsPoints.length, "GPS bod", "GPS body", "GPS bodov") } : null
  ].filter(Boolean);

  const detailPills = [
    ...compactPills,
    walk.temperature ? { icon: ICONS.weatherTemp, text: walk.temperature } : null,
    walk.wind ? { icon: ICONS.weatherWind, text: walk.wind } : null,
    walk.precipitation ? { icon: ICONS.weatherRain, text: walk.precipitation } : null,
    walk.conditions ? { icon: weatherIconSymbol({ condition: walk.conditions }), text: walk.conditions } : null
  ].filter(Boolean);
  const pills = compact ? compactPills : detailPills;

  const routePoints = compact ? walk.routePoints.slice(0, 4) : walk.routePoints;
  const gpsPreviewPoints = routePoints.length
    ? []
    : (compact ? gpsPoints.slice(0, 2) : gpsPoints.slice(0, 4)).map((point, index) => formatWalkGpsPointLabel(point, index, gpsPoints.length));
  const previewPoints = compact
    ? []
    : (routePoints.length ? routePoints : gpsPreviewPoints);
  const extraPointCount = routePoints.length
    ? (compact && walk.routePoints.length > routePoints.length ? walk.routePoints.length - routePoints.length : 0)
    : (compact && gpsPoints.length > gpsPreviewPoints.length ? gpsPoints.length - gpsPreviewPoints.length : 0);

  return `
    <section class="journal-walk ${compact ? "journal-walk--compact" : ""}">
      ${routeLabel && !compact ? `
        <div class="journal-walk__route">
          <strong>${escapeHtml(routeLabel)}</strong>
        </div>
      ` : ""}
      ${pills.length ? `
        <div class="journal-walk__stats">
          ${pills.map((item) => `
            <span class="journal-walk__pill">
              <span class="journal-walk__pill-icon" aria-hidden="true">${item.icon}</span>
              <span>${escapeHtml(item.text)}</span>
            </span>
          `).join("")}
        </div>
      ` : ""}
      ${renderWalkMapMarkup(walk, { compact, photoCount })}
      ${previewPoints.length ? `
        <div class="journal-walk__points">
          ${previewPoints.map((point) => `<span class="journal-walk__point">${escapeHtml(point)}</span>`).join("")}
          ${extraPointCount ? `<span class="journal-walk__point journal-walk__point--more">+${extraPointCount}</span>` : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function weatherIconSymbol(weather) {
  const condition = String(weather?.condition || "").toLowerCase();
  if (!condition) return ICONS.weatherPartly;
  if (condition.includes("búrka")) return ICONS.weatherStorm;
  if (condition.includes("krúp")) return ICONS.weatherStorm;
  if (condition.includes("sne")) return ICONS.weatherSnow;
  if (condition.includes("dážď") || condition.includes("prehán")) return ICONS.weatherRain;
  if (condition.includes("hmla")) return ICONS.weatherMist;
  if (condition.includes("obla")) return ICONS.weatherCloud;
  if (condition.includes("jasno")) return ICONS.weatherSun;
  return ICONS.weatherPartly;
}

function journalLinkChips(entry) {
  const linkedVariety = state.varieties.find((item) => item.id === entry.linkedVarietyId);
  const linkedCategoryIds = normalizeIdList(entry.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry.linkedCategoryId);
  const chips = [];

  if (entry.entryType) {
    chips.push({
      label: `Typ: ${journalEntryTypeLabel(entry.entryType)}`,
      themeKey: `entry-type:${entry.entryType}`
    });
  }

  entry.tags.forEach((tag) => {
    const key = slugify(tag);
    if (!key) return;
    chips.push({
      label: `Tag: ${tag}`,
      themeKey: `tag:${key}`
    });
  });

  if (linkedVariety) {
    chips.push({
      label: `Odroda: ${entryDisplayName(linkedVariety)}`,
      themeKey: `variety:${linkedVariety.id}`
    });
  }

  linkedCategoryIds.forEach((categoryId) => {
    const category = state.categories.find((item) => item.id === categoryId);
    if (category) {
      chips.push({
        label: `Kategória: ${category.name}`,
        themeKey: `category:${category.id}`
      });
    }
  });

  if (entry.place) {
    const key = slugify(entry.place);
    if (key) {
      chips.push({
        label: `Miesto: ${entry.place}`,
        themeKey: `place:${key}`
      });
    }
  }

  if (entry.weather?.placeLabel) {
    const shortPlace = String(entry.weather.placeLabel || "").split(",")[0].trim() || entry.weather.placeLabel;
    chips.push({ label: shortPlace });
  }

  return chips;
}

function journalFilterableChips(entry) {
  return journalLinkChips(normalizeJournalEntry(entry, state.varieties)).filter((chip) => {
    const themeKey = String(chip?.themeKey || "").trim();
    return themeKey
      && !themeKey.startsWith("variety:");
  });
}

function journalDisplayChips(entry, { compact = false } = {}) {
  const allowedPrefixes = compact
    ? ["Typ:", "Miesto:", "Kategória:", "Odroda:"]
    : ["Typ:", "Miesto:", "Tag:", "Kategória:", "Odroda:"];

  return journalLinkChips(normalizeJournalEntry(entry, state.varieties)).filter((chip) => {
    const label = String(chip?.label || "").trim();
    return allowedPrefixes.some((prefix) => label.startsWith(prefix));
  });
}

function renderJournalChip(chip, options = {}) {
  if (chip?.themeKey) {
    const kind = String(chip.themeKey || "").split(":")[0];
    const kindClass = kind ? ` tag--link-${kind}` : "";
    const behavior = String(options.behavior || "").trim();
    const useJournalFilter = behavior === "journal-filter" && kind && kind !== "variety";
    const attributeName = useJournalFilter ? "data-journal-filter-tag" : "data-open-thing";
    return `<button class="tag tag--journal-meta tag--interactive${kindClass}" type="button" ${attributeName}="${escapeAttribute(chip.themeKey)}">${escapeHtml(chip.label)}</button>`;
  }
  return `<span class="tag tag--journal-meta">${escapeHtml(chip?.label || "")}</span>`;
}

function journalTagRecords(entries = normalizedJournalList()) {
  const tagMap = new Map();
  const priorityOrder = {
    "entry-type": 0,
    place: 1,
    category: 2,
    tag: 3
  };

  entries.forEach((entry) => {
    const seenKeys = new Set();
    journalFilterableChips(entry).forEach((chip) => {
      const themeKey = String(chip?.themeKey || "").trim();
      if (!themeKey || seenKeys.has(themeKey)) return;
      seenKeys.add(themeKey);
      const [kind = "", rawKey = ""] = themeKey.split(":");
      if (!kind || !rawKey) return;
      const label = journalThemeChipTitle(chip);
      const existing = tagMap.get(themeKey);
      if (existing) {
        existing.count += 1;
        return;
      }
      tagMap.set(themeKey, {
        key: themeKey,
        label,
        count: 1,
        themeKey,
        kind,
        kindLabel: journalThemeKindLabel(kind),
        order: Object.prototype.hasOwnProperty.call(priorityOrder, kind) ? priorityOrder[kind] : 99
      });
    });
  });
  return [...tagMap.values()].sort((a, b) => a.order - b.order || b.count - a.count || a.label.localeCompare(b.label, "sk", { sensitivity: "base" }));
}

function journalFilterSections(tagRecords = []) {
  const groups = [
    { kind: "entry-type", label: "Typ" },
    { kind: "place", label: "Miesto" },
    { kind: "category", label: "Kategórie" },
    { kind: "tag", label: "Tagy" }
  ];

  return groups
    .map((group) => ({
      ...group,
      items: tagRecords.filter((item) => item.kind === group.kind)
    }))
    .filter((group) => group.items.length);
}

function journalEntriesForTag(entries = normalizedJournalList(), themeKey = "") {
  const normalizedThemeKey = String(themeKey || "").trim();
  if (!normalizedThemeKey) return entries;
  return entries.filter((entry) => journalFilterableChips(entry).some((chip) => chip.themeKey === normalizedThemeKey));
}

function renderJournalTagFilterPanel(entries = normalizedJournalList(), activeTagKey = "", filteredCount = entries.length) {
  const tagRecords = journalTagRecords(entries);
  if (!tagRecords.length) return "";
  const activeRecord = tagRecords.find((item) => item.themeKey === activeTagKey) || null;
  const sections = journalFilterSections(tagRecords);
  return `
    <section class="journal-tag-filter">
      <div class="journal-tag-filter__head">
        <div class="journal-tag-filter__lead">
          ${activeRecord ? `<span class="journal-tag-filter__active">${escapeHtml(activeRecord.kindLabel)}: ${escapeHtml(activeRecord.label)}</span>` : ""}
          ${activeRecord ? `<button class="journal-tag-filter__clear" type="button" data-journal-filter-tag="">Zrušiť filter</button>` : ""}
        </div>
        <p class="journal-tag-filter__meta">${activeRecord ? `${escapeHtml(countedLabel(filteredCount, "zápis", "zápisy", "zápisov"))}` : escapeHtml(countedLabel(entries.length, "zápis", "zápisy", "zápisov"))}</p>
      </div>
      <div class="journal-tag-filter__sections">
        ${sections.map((section) => `
          <div class="journal-tag-filter__section">
            <p class="journal-tag-filter__section-label">${escapeHtml(section.label)}</p>
            <div class="journal-tag-filter__chips">
              ${section.items.map((item) => `
                <button class="tag tag--journal-meta tag--interactive tag--link-${escapeAttribute(item.kind)} journal-tag-filter__chip ${item.themeKey === activeTagKey ? "is-active" : ""}" type="button" data-journal-filter-tag="${escapeAttribute(item.themeKey)}">
                  <span>${escapeHtml(item.label)}</span>
                  <span class="journal-tag-filter__chip-count">${item.count}</span>
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderJournalTagPicker(tagRecords = [], currentValue = "") {
  if (!tagRecords.length) return "";
  const rawValue = String(currentValue || "");
  const endsWithSeparator = /,\s*$/.test(rawValue);
  const selectedKeys = new Set(normalizeTagList(rawValue).map(slugify));
  const currentToken = endsWithSeparator ? "" : String(rawValue.split(",").pop() || "").trim();
  const queryKey = slugify(currentToken);
  const selectedRecords = tagRecords.filter((item) => selectedKeys.has(item.key));
  const suggestionRecords = tagRecords
    .filter((item) => !selectedKeys.has(item.key) && (!queryKey || item.key.includes(queryKey)))
    .slice(0, queryKey ? 8 : 12);

  return `
    <div class="journal-tag-picker__head">
      <span class="journal-tag-picker__label">${queryKey ? "Nájdené tagy" : "Použité tagy"}</span>
      <span class="journal-tag-picker__meta">${queryKey ? `Hľadáš: ${escapeHtml(currentToken)}` : "Klikni a tag sa doplní do zápisu"}</span>
    </div>
    ${selectedRecords.length ? `
      <div class="journal-tag-picker__section">
        <span class="journal-tag-picker__section-label">Vo zápise už máš</span>
        <div class="journal-tag-picker__chips">
          ${selectedRecords.map((item) => `
            <button class="tag tag--journal-meta tag--interactive tag--link-tag journal-tag-picker__chip is-selected" type="button" data-journal-tag-remove="${escapeAttribute(item.label)}">
              <span>${escapeHtml(item.label)}</span>
              <span class="journal-tag-picker__chip-remove" aria-hidden="true">×</span>
            </button>
          `).join("")}
        </div>
      </div>
    ` : ""}
    <div class="journal-tag-picker__section">
      <span class="journal-tag-picker__section-label">${queryKey ? "Návrhy" : "Najčastejšie"}</span>
      ${suggestionRecords.length ? `
        <div class="journal-tag-picker__chips">
          ${suggestionRecords.map((item) => `
            <button class="tag tag--journal-meta tag--interactive tag--link-tag journal-tag-picker__chip" type="button" data-journal-tag-pick="${escapeAttribute(item.label)}">
              <span>${escapeHtml(item.label)}</span>
              <span class="journal-tag-picker__chip-count">${item.count}</span>
            </button>
          `).join("")}
        </div>
      ` : `<p class="journal-tag-picker__empty">${queryKey ? "Nenašiel sa podobný uložený tag." : "Zatiaľ tu ešte nemáš žiadne uložené tagy."}</p>`}
    </div>
  `;
}

function setupJournalTagInput(formEl) {
  if (!formEl) return;
  const tagsInput = formEl.elements.tags;
  const suggestionMount = formEl.querySelector("[data-journal-tag-picker]");
  if (!tagsInput || !suggestionMount) return;

  const setTagInputValue = (nextTags = []) => {
    tagsInput.value = nextTags.length ? `${nextTags.join(", ")}, ` : "";
    tagsInput.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const addSuggestedTag = (tagLabel) => {
    const rawValue = String(tagsInput.value || "");
    const endsWithSeparator = /,\s*$/.test(rawValue);
    const currentToken = endsWithSeparator ? "" : String(rawValue.split(",").pop() || "").trim();
    let nextTags = normalizeTagList(rawValue);
    if (currentToken) {
      nextTags = nextTags.filter((item) => slugify(item) !== slugify(currentToken));
    }
    if (!nextTags.some((item) => slugify(item) === slugify(tagLabel))) {
      nextTags.push(tagLabel);
    }
    setTagInputValue(nextTags);
    tagsInput.focus();
  };

  const removeSuggestedTag = (tagLabel) => {
    const nextTags = normalizeTagList(tagsInput.value).filter((item) => slugify(item) !== slugify(tagLabel));
    setTagInputValue(nextTags);
    tagsInput.focus();
  };

  const renderTagSuggestions = () => {
    const tagRecords = journalTagRecords().filter((item) => item.kind === "tag");
    if (!tagRecords.length) {
      suggestionMount.hidden = true;
      suggestionMount.innerHTML = "";
      return;
    }
    suggestionMount.hidden = false;
    suggestionMount.innerHTML = renderJournalTagPicker(tagRecords, String(tagsInput.value || ""));
    suggestionMount.querySelectorAll("[data-journal-tag-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        addSuggestedTag(String(button.getAttribute("data-journal-tag-pick") || "").trim());
      });
    });
    suggestionMount.querySelectorAll("[data-journal-tag-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        removeSuggestedTag(String(button.getAttribute("data-journal-tag-remove") || "").trim());
      });
    });
  };

  tagsInput.addEventListener("input", renderTagSuggestions);
  tagsInput.addEventListener("focus", renderTagSuggestions);
  renderTagSuggestions();
}

function journalPhenomenaRecords(entries = normalizedJournalList()) {
  const phenomenonMap = new Map();
  entries.forEach((entry) => {
    normalizeTagList(entry?.phenomena).forEach((phenomenonLabel) => {
      const label = String(phenomenonLabel || "").trim();
      const key = slugify(label);
      if (!label || !key) return;
      const existing = phenomenonMap.get(key);
      if (existing) {
        existing.count += 1;
        return;
      }
      phenomenonMap.set(key, {
        key,
        label,
        count: 1
      });
    });
  });
  return [...phenomenonMap.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "sk", { sensitivity: "base" }));
}

function journalPlaceRecords(entries = normalizedJournalList()) {
  const placeMap = new Map();
  entries.forEach((entry) => {
    const label = String(entry?.place || "").trim();
    const key = slugify(label);
    if (!label || !key) return;
    const existing = placeMap.get(key);
    if (existing) {
      existing.count += 1;
      return;
    }
    placeMap.set(key, {
      key,
      label,
      count: 1
    });
  });
  return [...placeMap.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "sk", { sensitivity: "base" }));
}

function setupJournalPhenomenaInput(formEl) {
  if (!formEl) return;
  const phenomenaInput = formEl.elements.phenomena;
  const suggestionMount = formEl.querySelector("[data-journal-phenomena-picker]");
  if (!phenomenaInput || !suggestionMount) return;

  const setPhenomenaInputValue = (nextValues = []) => {
    phenomenaInput.value = nextValues.length ? `${nextValues.join(", ")}, ` : "";
    phenomenaInput.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const addSuggestedPhenomenon = (label) => {
    const rawValue = String(phenomenaInput.value || "");
    const endsWithSeparator = /,\s*$/.test(rawValue);
    const currentToken = endsWithSeparator ? "" : String(rawValue.split(",").pop() || "").trim();
    let nextValues = normalizeTagList(rawValue);
    if (currentToken) {
      nextValues = nextValues.filter((item) => slugify(item) !== slugify(currentToken));
    }
    if (!nextValues.some((item) => slugify(item) === slugify(label))) {
      nextValues.push(label);
    }
    setPhenomenaInputValue(nextValues);
    phenomenaInput.focus();
  };

  const removeSuggestedPhenomenon = (label) => {
    const nextValues = normalizeTagList(phenomenaInput.value).filter((item) => slugify(item) !== slugify(label));
    setPhenomenaInputValue(nextValues);
    phenomenaInput.focus();
  };

  const renderPhenomenaSuggestions = () => {
    const records = journalPhenomenaRecords();
    if (!records.length) {
      suggestionMount.hidden = true;
      suggestionMount.innerHTML = "";
      return;
    }
    suggestionMount.hidden = false;
    suggestionMount.innerHTML = renderJournalPhenomenaPicker(records, String(phenomenaInput.value || ""));
    suggestionMount.querySelectorAll("[data-journal-phenomenon-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        addSuggestedPhenomenon(String(button.getAttribute("data-journal-phenomenon-pick") || "").trim());
      });
    });
    suggestionMount.querySelectorAll("[data-journal-phenomenon-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        removeSuggestedPhenomenon(String(button.getAttribute("data-journal-phenomenon-remove") || "").trim());
      });
    });
  };

  phenomenaInput.addEventListener("input", renderPhenomenaSuggestions);
  phenomenaInput.addEventListener("focus", renderPhenomenaSuggestions);
  renderPhenomenaSuggestions();
}

function setupJournalPlaceInput(formEl) {
  if (!formEl) return;
  const placeInput = formEl.elements.place;
  const suggestionMount = formEl.querySelector("[data-journal-place-picker]");
  if (!placeInput || !suggestionMount) return;

  const setPlaceValue = (label = "") => {
    placeInput.value = String(label || "").trim();
    placeInput.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const renderPlaceSuggestions = () => {
    const records = journalPlaceRecords();
    if (!records.length) {
      suggestionMount.hidden = true;
      suggestionMount.innerHTML = "";
      return;
    }
    suggestionMount.hidden = false;
    suggestionMount.innerHTML = renderJournalPlacePicker(records, String(placeInput.value || ""));
    suggestionMount.querySelectorAll("[data-journal-place-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        setPlaceValue(String(button.getAttribute("data-journal-place-pick") || "").trim());
        placeInput.focus();
      });
    });
    suggestionMount.querySelectorAll("[data-journal-place-clear]").forEach((button) => {
      button.addEventListener("click", () => {
        setPlaceValue("");
        placeInput.focus();
      });
    });
  };

  placeInput.addEventListener("input", renderPlaceSuggestions);
  placeInput.addEventListener("focus", renderPlaceSuggestions);
  renderPlaceSuggestions();
}

function taskLinkChips(task) {
  const linkedCategoryIds = normalizeIdList(task.linkedCategoryIds?.length ? task.linkedCategoryIds : task.linkedCategoryId);
  const linkedCategories = linkedCategoryIds
    .map((id) => state.categories.find((item) => item.id === id))
    .filter(Boolean);
  const linkedVariety = state.varieties.find((item) => item.id === task.linkedVarietyId);
  return [
    ...linkedCategories.map((linkedCategory) => ({ label: `Kategória: ${linkedCategory.name}`, themeKey: `category:${linkedCategory.id}` })),
    linkedVariety ? { label: `Karta: ${entryDisplayName(linkedVariety)}`, themeKey: `variety:${linkedVariety.id}` } : null
  ].filter(Boolean);
}

function taskLinkSummary(task) {
  const labels = taskLinkChips(task).map((item) => item.label);
  if (!labels.length) return task.source || "";
  return labels.join(" • ");
}

function buildThingRecords() {
  const records = [];
  const categoryThemeLabel = (category) => {
    if (!category?.parentCategoryId) return "Sekcia";
    if (category.nodeType === "parent") return "Kategória";
    return "Podkategória";
  };
  const pushRecord = (record) => {
    const relatedEntries = relatedEntriesForThing(record);
    const relatedTasks = relatedTasksForTheme(record);
    const imageCount = relatedEntries.reduce((total, entry) => total + journalImages(entry).length, 0);
    const problemCount = relatedEntries.filter((entry) => entry.entryType === "problem").length;
    record.summary = [
      countedLabel(relatedEntries.length, "zápis", "zápisy", "zápisov"),
      imageCount ? countedLabel(imageCount, "fotka", "fotky", "fotiek") : "",
      relatedTasks.length ? countedLabel(relatedTasks.length, "úloha", "úlohy", "úloh") : "",
      problemCount ? countedLabel(problemCount, "problém", "problémy", "problémov") : ""
    ].filter(Boolean).join(" • ");
    record.entryCount = relatedEntries.length;
    record.taskCount = relatedTasks.length;
    records.push(record);
  };

  orderedCategories().forEach((category) => {
    pushRecord({
      key: `category:${category.id}`,
      title: category.name,
      kind: "category",
      kindLabel: categoryThemeLabel(category)
    });
  });

  state.varieties.forEach((variety) => {
    pushRecord({
      key: `variety:${variety.id}`,
      title: entryDisplayName(variety),
      kind: "variety",
      kindLabel: cardTypeLabel(cardType(variety))
    });
  });

  const themeMap = new Map();
  const ensureTheme = (chip) => {
    const key = String(chip?.themeKey || "").trim();
    if (!key || themeMap.has(key) || key.startsWith("category:")) return;
    const [kind = "", thingKey = ""] = key.split(":");
    const title = journalThemeChipTitle(chip);
    if (!kind || !thingKey || !title) return;
    themeMap.set(key, {
      key,
      thingKey,
      title,
      kind,
      kindLabel: journalThemeKindLabel(kind)
    });
  };

  journalEntriesNewestFirst().forEach((entry) => {
    journalFilterableChips(entry).forEach((chip) => ensureTheme(chip));
  });

  themeMap.forEach((record) => pushRecord(record));

  return records
    .filter((item) => item.entryCount || item.taskCount || item.kind === "category" || item.kind === "variety")
    .sort((a, b) => a.title.localeCompare(b.title, "sk", { sensitivity: "base" }));
}

function relatedEntriesForThing(record) {
  if (!record) return [];
  if (record.kind === "category") {
    const categoryId = record.key.replace("category:", "");
    const categoryIds = new Set([categoryId, ...collectDescendantCategoryIds(categoryId)]);
    return journalEntriesNewestFirst().filter((entry) => normalizeIdList(entry.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry.linkedCategoryId).some((id) => categoryIds.has(id)));
  }

  if (record.kind === "variety") {
    const varietyId = record.key.replace("variety:", "");
    return journalEntriesNewestFirst().filter((entry) => entry.linkedVarietyId === varietyId);
  }

  return journalEntriesNewestFirst().filter((entry) => journalFilterableChips(entry).some((chip) => chip.themeKey === record.key));
}

function relatedTasksForTheme(record) {
  if (!record) return [];
  if (record.kind === "entry-type" || record.kind === "weather") return [];
  const titleKey = slugify(record.title || "");
  if (!titleKey) return [];

  if (record.kind === "variety") {
    const varietyId = record.key.replace("variety:", "");
    const variety = state.varieties.find((item) => item.id === varietyId);
    const names = [record.title, variety?.name, variety?.type].filter(Boolean).map(slugify);
    return sortTasks(state.customTasks.filter((task) => {
      if (task.linkedVarietyId === varietyId) return true;
      const text = slugify(task.text || "");
      return names.some((name) => name && text.includes(name));
    }));
  }

  if (record.kind === "category") {
    const categoryId = record.key.replace("category:", "");
    const categoryIds = [categoryId, ...collectDescendantCategoryIds(categoryId)];
    const categoryNames = new Set(
      categoryIds
        .map((id) => state.categories.find((item) => item.id === id)?.name)
        .filter(Boolean)
        .map(slugify)
    );
    return sortTasks(state.customTasks.filter((task) => {
      const linkedCategoryIds = normalizeIdList(task.linkedCategoryIds?.length ? task.linkedCategoryIds : task.linkedCategoryId);
      if (linkedCategoryIds.some((id) => categoryIds.includes(id))) return true;
      const text = slugify(task.text || "");
      return [...categoryNames].some((name) => name && text.includes(name));
    }));
  }

  return sortTasks(state.customTasks.filter((task) => {
    const categoryMatch = normalizeIdList(task.linkedCategoryIds?.length ? task.linkedCategoryIds : task.linkedCategoryId)
      .some((id) => slugify(state.categories.find((item) => item.id === id)?.name || "") === titleKey);
    const varietyMatch = task.linkedVarietyId && slugify(entryDisplayName(state.varieties.find((item) => item.id === task.linkedVarietyId) || {})) === titleKey;
    return categoryMatch || varietyMatch || slugify(task.text || "").includes(titleKey);
  }));
}

function renderChildCategoryCard(category) {
  return `
    <article class="catalog-card catalog-card--child catalog-card--clickable catalog-card--${category.nodeType || "kind"}" style="--category-accent:${escapeAttribute(category.color || "#7e9f4b")}">
      <button class="catalog-card__main-hit" type="button" data-open-category="${category.id}" aria-label="Otvoriť kategóriu ${escapeHtml(category.name)}">
        <div class="catalog-card__image">
          <img src="${escapeAttribute(categoryCardImage(category))}" alt="${escapeHtml(category.name)}">
        </div>
        <div class="catalog-card__body catalog-card__body--category">
          <div class="catalog-card__head catalog-card__head--category">
            <h3 class="catalog-card__title catalog-card__title--body">${escapeHtml(category.name)}</h3>
          </div>
          <p class="catalog-card__count">${escapeHtml(categoryVarietyCountLabel(category.id))}</p>
        </div>
      </button>
    </article>
  `;
}

function renderMainMenuCategoryCard(category) {
  return `
    <article class="catalog-card catalog-card--child catalog-card--main-menu-card catalog-card--${category.nodeType || "kind"}" style="--category-accent:${escapeAttribute(category.color || "#7e9f4b")}">
      <button class="catalog-card__main-hit" type="button" data-open-main-category="${category.id}" aria-label="Otvoriť kategóriu ${escapeHtml(category.name)}">
        <div class="catalog-card__image">
          <img src="${escapeAttribute(categoryCardImage(category))}" alt="${escapeHtml(category.name)}">
        </div>
        <div class="catalog-card__body catalog-card__body--category">
          <div class="catalog-card__head catalog-card__head--category">
            <h3 class="catalog-card__title catalog-card__title--body">${escapeHtml(category.name)}</h3>
          </div>
          <p class="catalog-card__count">${escapeHtml(categoryVarietyCountLabel(category.id))}</p>
        </div>
      </button>
    </article>
  `;
}

function syncCatalogCardImagePresentation(root = document) {
  root.querySelectorAll(".catalog-grid--varieties .catalog-card__image").forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;

    const syncFrame = () => {
      const width = img.naturalWidth || img.width || 0;
      const height = img.naturalHeight || img.height || 0;
      const source = img.currentSrc || img.src || "";
      const isMobileShell = typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell");
      if (!source) return;

      frame.style.setProperty("--card-image", `url(${JSON.stringify(source)})`);
      frame.style.setProperty("--card-image-ratio", width && height ? `${width} / ${height}` : "1 / 1");
      frame.classList.remove("catalog-card__image--soft-fit", "catalog-card__image--landscape", "catalog-card__image--portrait");

      if (!width || !height) return;

      const ratio = width / height;
      const portraitThreshold = isMobileShell ? 1.05 : 0.86;
      if (ratio > 1.18 || ratio < portraitThreshold) {
        frame.classList.add("catalog-card__image--soft-fit");
        frame.classList.add(ratio > 1.18 ? "catalog-card__image--landscape" : "catalog-card__image--portrait");
      }
    };

    if (img.complete) {
      syncFrame();
    } else {
      img.addEventListener("load", syncFrame, { once: true });
    }
  });
}

function syncDetailEditorImagePresentation(previewEl) {
  const img = previewEl instanceof HTMLImageElement ? previewEl : null;
  const frame = img?.closest(".detail-image--editor");
  if (!img || !frame) return;

  const syncFrame = () => {
    const width = img.naturalWidth || img.width || 0;
    const height = img.naturalHeight || img.height || 0;
    const source = img.currentSrc || img.src || "";
    if (source) {
      frame.style.setProperty("--detail-image", `url(${JSON.stringify(source)})`);
    }
    frame.style.setProperty("--detail-image-ratio", width && height ? `${width} / ${height}` : "1 / 1");
    frame.classList.remove("detail-image--soft-fit", "detail-image--landscape", "detail-image--portrait");
    if (!width || !height) return;

    const ratio = width / height;
    if (ratio > 1.18 || ratio < 1.05) {
      frame.classList.add("detail-image--soft-fit");
      frame.classList.add(ratio > 1.18 ? "detail-image--landscape" : "detail-image--portrait");
    }
  };

  if (img.complete) {
    syncFrame();
  } else {
    img.addEventListener("load", syncFrame, { once: true });
  }
}

function renderVarietyCard(variety) {
  if (isQuickEntry(variety)) {
    return renderQuickEntryCard(variety);
  }
  if (isGalleryEntry(variety)) {
    return renderGalleryEntryCard(variety);
  }
  const category = state.categories.find((item) => item.id === variety.categoryId);
  const previewText = trimText(varietyPreviewText(variety), 110);
  if (cardType(variety) !== "variety") {
    return renderUniversalCard(variety, category, previewText);
  }
  const statusValues = varietyStatusValues(variety);
  const summaryTags = [
    variety.top ? '<span class="tag tag--favorite">top odroda</span>' : "",
    variety.notGrowingThisYear ? '<span class="tag tag--avoid">nepestujem tento rok</span>' : "",
    variety.avoidNextYear ? '<span class="tag tag--avoid">neodporúčam</span>' : "",
    variety.neverGrown ? '<span class="tag tag--never-grown">ešte som nepestovala</span>' : "",
    inferBreedingType(variety) === "hybrid" ? '<span class="tag tag--hybrid">F1</span>' : "",
    normalizePlaceList(variety.places?.length ? variety.places : variety.place).length ? `<span class="tag">${escapeHtml(placeLabel(variety.places?.length ? variety.places : variety.place))}</span>` : "",
    ...statusValues
      .filter((status) => !(status === "sown" && variety.sowedAt))
      .map((status) => `<span class="tag">${escapeHtml(statusLabel(status))}</span>`),
    variety.rating ? `<span class="tag tag--rating">${renderStarRating(variety.rating, true)}</span>` : ""
  ].filter(Boolean);
  const selectedDetails = [
    variety.sowedAt ? `Vysiate: ${formatDate(variety.sowedAt)}.` : "",
    variety.transplantedAt ? `Vysadené: ${formatDate(variety.transplantedAt)}.` : "",
    variety.harvestedAt ? `Zberané: ${formatDate(variety.harvestedAt)}.` : ""
  ].filter(Boolean);
  const summaryTagsHtml = summaryTags.length ? summaryTags.join("") : "";
  const quickSectionHtml = `<div class="catalog-card__quick ${summaryTags.length ? "" : "is-empty"}">${summaryTagsHtml || '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>'}</div>`;
  const selectedDetailsHtml = selectedDetails.length ? escapeHtml(selectedDetails.join(" ")) : '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>';
  const previewTextHtml = previewText ? escapeHtml(previewText) : '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>';
  return `
    <article class="catalog-card catalog-card--variety" style="--category-accent:${escapeAttribute(category?.color || "#7e9f4b")}">
      <button class="catalog-card__main-hit catalog-card__main-hit--variety" type="button" data-open-variety="${variety.id}" aria-label="Otvoriť odrodu ${escapeHtml(variety.name)}">
        <div class="catalog-card__image">
          <img src="${escapeAttribute(primaryVarietyImage(variety))}" alt="${escapeHtml(variety.name)}">
          <div class="catalog-card__shade">
            <h3 class="catalog-card__title">${escapeHtml(variety.name)}</h3>
          </div>
        </div>
        ${quickSectionHtml}
        <div class="catalog-card__body">
          <p class="catalog-card__meta ${selectedDetails.length ? "" : "is-empty"}">${selectedDetailsHtml}</p>
          <p class="catalog-card__note-preview ${previewText ? "" : "is-empty"}">${previewTextHtml}</p>
        </div>
      </button>
    </article>
  `;
}

function renderUniversalCard(item, category, previewText) {
  const isBirdCard = cardType(item) === "bird";
  const birdLatinName = isBirdCard ? String(item?.birdLatinName || "").trim() : "";
  const birdExternalUrl = isBirdCard && item.birdSource === "ebird"
    ? String(item?.birdExternalUrl || "").trim()
    : "";
  const mushroomEdibilityValues = normalizeTagList(item.mushroomEdibilityValues?.length ? item.mushroomEdibilityValues : item.mushroomEdibility);
  const mushroomGatheringValues = normalizeTagList(item.mushroomGatheringValues?.length ? item.mushroomGatheringValues : item.mushroomGathering);
  const summaryTags = [
    ...(
      cardType(item) === "mushroom"
        ? mushroomEdibilityValues
          .map((value) => mushroomEdibilityLabel(value))
          .filter(Boolean)
          .map((label) => `<span class="tag">${escapeHtml(label)}</span>`)
        : []
    ),
    ...(
      cardType(item) === "mushroom"
        ? mushroomGatheringValues
          .map((value) => mushroomGatheringLabel(value))
          .filter(Boolean)
          .map((label) => `<span class="tag">${escapeHtml(label)}</span>`)
        : []
    ),
    cardType(item) === "wild-plant" && item.isMedicinal ? '<span class="tag">liečivá</span>' : "",
    cardType(item) === "wild-plant" && item.isPoisonous ? '<span class="tag">jedovatá</span>' : "",
    cardType(item) === "bird" && item.birdContact ? `<span class="tag">${escapeHtml(birdContactLabel(item.birdContact))}</span>` : "",
    cardType(item) === "pest-problem" && normalizeIdList(item.affectedCategoryIds?.length ? item.affectedCategoryIds : item.affectedCategoryId).length
      ? `<span class="tag">${escapeHtml(`Týka sa: ${normalizeIdList(item.affectedCategoryIds?.length ? item.affectedCategoryIds : item.affectedCategoryId).map(categoryName).join(", ")}`)}</span>`
      : "",
    cardType(item) === "processing-recipe" && normalizeIdList(item.relatedCategoryIds?.length ? item.relatedCategoryIds : item.relatedCategoryId).length
      ? `<span class="tag">${escapeHtml(`Súvisí s: ${normalizeIdList(item.relatedCategoryIds?.length ? item.relatedCategoryIds : item.relatedCategoryId).map(categoryName).join(", ")}`)}</span>`
      : ""
  ].filter(Boolean);
  const selectedDetails = [
    item.recordedAt ? `${cardDateLabel(cardType(item))}: ${formatDate(item.recordedAt)}.` : "",
    isBirdCard && item.birdPlace ? `Miesto: ${item.birdPlace}.` : ""
  ].filter(Boolean);
  const summaryTagsHtml = summaryTags.length ? summaryTags.join("") : "";
  const quickSectionHtml = summaryTags.length
    ? `<div class="catalog-card__quick">${summaryTagsHtml}</div>`
    : "";
  const selectedDetailsHtml = selectedDetails.length ? escapeHtml(selectedDetails.join(" ")) : '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>';
  const previewTextHtml = previewText ? escapeHtml(previewText) : '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>';
  const birdIdentityHtml = isBirdCard && birdLatinName
    ? `
          <div class="catalog-card__bird-identity">
            ${birdLatinName ? `<span class="catalog-card__bird-latin">${escapeHtml(birdLatinName)}</span>` : ""}
          </div>
        `
    : "";
  const birdExternalLinkHtml = birdExternalUrl
    ? `<a class="catalog-card__external-link catalog-card__external-link--bird-card" href="${escapeAttribute(birdExternalUrl)}" target="_blank" rel="noreferrer noopener" data-stop-card-open>${ICONS.cardBird} Otvoriť v eBirde</a>`
    : "";
  return `
    <article class="catalog-card catalog-card--clickable catalog-card--variety ${isBirdCard ? "catalog-card--bird" : ""}" data-open-variety="${item.id}" tabindex="0" role="button" aria-label="Otvoriť kartu ${escapeHtml(entryDisplayName(item))}" style="--category-accent:${escapeAttribute(category?.color || "#7e9f4b")}">
      <div class="catalog-card__image">
        <img src="${escapeAttribute(primaryVarietyImage(item))}" alt="${escapeHtml(entryDisplayName(item))}">
        <div class="catalog-card__shade">
          <h3 class="catalog-card__title">${escapeHtml(entryDisplayName(item))}</h3>
          ${birdIdentityHtml}
        </div>
      </div>
      ${quickSectionHtml}
      <div class="catalog-card__body">
        <p class="catalog-card__meta ${selectedDetails.length ? "" : "is-empty"}">${selectedDetailsHtml}</p>
        ${birdExternalLinkHtml}
        <p class="catalog-card__note-preview ${previewText ? "" : "is-empty"}">${previewTextHtml}</p>
      </div>
    </article>
  `;
}

function renderQuickEntryCard(variety) {
  const category = state.categories.find((item) => item.id === variety.categoryId);
  const previewText = trimText(varietyPreviewText(variety), 110);
  const imageCount = normalizeVarietyImages(variety).length;
  const quickTags = [
    '<span class="tag">rýchly záznam</span>',
    imageCount ? `<span class="tag">${countedLabel(imageCount, "fotka", "fotky", "fotiek")}</span>` : ""
  ].filter(Boolean);
  return `
    <article class="catalog-card catalog-card--variety catalog-card--quick-entry" style="--category-accent:${escapeAttribute(category?.color || "#7e9f4b")}">
      <button class="catalog-card__main-hit catalog-card__main-hit--variety" type="button" data-open-variety="${variety.id}" aria-label="Otvoriť záznam ${escapeHtml(entryDisplayName(variety))}">
        <div class="catalog-card__image">
          <img src="${escapeAttribute(primaryVarietyImage(variety))}" alt="${escapeHtml(entryDisplayName(variety))}">
          <div class="catalog-card__shade">
            <p class="eyebrow">${escapeHtml(entryKindLabel(variety))}</p>
            <h3 class="catalog-card__title">${escapeHtml(entryDisplayName(variety))}</h3>
          </div>
        </div>
        <div class="catalog-card__quick">${quickTags.join("")}</div>
        <div class="catalog-card__body">
          <p class="catalog-card__meta">${escapeHtml(categoryName(variety.categoryId))}</p>
          <p class="catalog-card__note-preview ${previewText ? "" : "is-empty"}">${previewText ? escapeHtml(previewText) : '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>'}</p>
        </div>
      </button>
    </article>
  `;
}

function renderGalleryEntryCard(variety) {
  const category = state.categories.find((item) => item.id === variety.categoryId);
  const previewText = trimText(varietyPreviewText(variety), 110);
  const images = normalizeVarietyImages(variety);
  const imageCount = images.length;
  const galleryTags = [
    '<span class="tag tag--gallery">galéria</span>',
    imageCount ? `<span class="tag">${countedLabel(imageCount, "fotka", "fotky", "fotiek")}</span>` : ""
  ].filter(Boolean);
  return `
    <article class="catalog-card catalog-card--variety catalog-card--gallery-entry" style="--category-accent:${escapeAttribute(category?.color || "#7e9f4b")}">
      <button class="catalog-card__main-hit catalog-card__main-hit--variety" type="button" data-open-variety="${variety.id}" aria-label="Otvoriť galériu ${escapeHtml(entryDisplayName(variety))}">
        <div class="catalog-card__image">
          <img src="${escapeAttribute(primaryVarietyImage(variety))}" alt="${escapeHtml(entryDisplayName(variety))}">
          <div class="catalog-card__shade">
            <p class="eyebrow">Galéria</p>
            <h3 class="catalog-card__title">${escapeHtml(entryDisplayName(variety))}</h3>
          </div>
        </div>
        <div class="catalog-card__quick">${galleryTags.join("")}</div>
        <div class="catalog-card__body">
          <p class="catalog-card__meta">${escapeHtml(categoryName(variety.categoryId))}</p>
          <p class="catalog-card__note-preview ${previewText ? "" : "is-empty"}">${previewText ? escapeHtml(previewText) : '<span class="catalog-card__placeholder" aria-hidden="true">&nbsp;</span>'}</p>
        </div>
      </button>
    </article>
  `;
}

function renderOverview() {
  const topVarieties = state.varieties
    .filter((item) => item.top)
    .slice(0, 3);
  const allTopVarieties = state.varieties.filter((item) => item.top);
  const avoidVarieties = state.varieties.filter((item) => item.avoidNextYear);
  const avoidPreview = avoidVarieties.slice(0, 3);
  if (favoriteListEl) {
    favoriteListEl.innerHTML = allTopVarieties.length
      ? `
        ${topVarieties.map((item) => miniItem(item.name, categoryName(item.categoryId), item.id, { badge: "TOP" })).join("")}
        ${allTopVarieties.length > topVarieties.length ? `<button class="button button--ghost mini-list__more" type="button" id="open-favorite-overview">Zobraziť všetky top odrody (${allTopVarieties.length})</button>` : ""}
      `
      : '<div class="empty-state">Tu budú tvoje najlepšie odrody s top hodnotením.</div>';

    const openFavoriteOverviewButton = document.getElementById("open-favorite-overview");
    if (openFavoriteOverviewButton) {
      openFavoriteOverviewButton.addEventListener("click", () => openFavoriteOverviewModal(allTopVarieties));
    }
    bindMiniVarietyOpen(favoriteListEl);
  }

  if (avoidListEl) {
    avoidListEl.innerHTML = avoidVarieties.length
      ? `
        ${avoidPreview.map((item) => miniItem(item.name, categoryName(item.categoryId), item.id, { badge: "NOPE" })).join("")}
        ${avoidVarieties.length > avoidPreview.length ? `<button class="button button--ghost mini-list__more" type="button" id="open-avoid-overview">Zobraziť všetky označené (${avoidVarieties.length})</button>` : ""}
      `
      : '<div class="empty-state">Keď niečo označíš ako neodporúčané, ukáže sa to tu.</div>';

    const openAvoidOverviewButton = document.getElementById("open-avoid-overview");
    if (openAvoidOverviewButton) {
      openAvoidOverviewButton.addEventListener("click", () => openAvoidOverviewModal(avoidVarieties));
    }

    bindMiniVarietyOpen(avoidListEl);
  }
}

function varietyPreviewText(variety) {
  if (cardType(variety) === "bird") {
    return String(variety?.notes || "").trim();
  }
  return variety.notes || "";
}

function showManualSowingWindow(variety) {
  return Boolean(varietySowingWindow(variety));
}

function renderTasks() {
  const customTasks = sortTasks(state.customTasks);
  if (!customTaskListEl) return;
  customTaskListEl.innerHTML = customTasks.length
    ? `
      <section class="task-section">
        <p class="eyebrow">Vlastné úlohy</p>
        <div class="task-stack">
          ${customTasks.map(renderTaskItem).join("")}
        </div>
      </section>
      `
    : '<div class="empty-state">Sem si môžeš pridávať vlastné úlohy.</div>';
  bindTaskActions(customTaskListEl);
  bindThingLinks(customTaskListEl);
}

function renderJournal() {
  const journalEntries = normalizedJournalList();

  if (journalListEl) {
    try {
      journalListEl.innerHTML = journalEntries.length
        ? journalEntries.map((entry) => renderJournalOverlayCard(entry)).join("")
        : '<div class="empty-state">Tvoje záznamy zo záhrady budú tu.</div>';
    } catch (error) {
      console.error("Zlyhal hlavný prehľad denníka", error);
      journalListEl.innerHTML = journalEntries.length
        ? journalEntries.map((entry) => renderJournalManagerCard(entry, "data-delete-journal")).join("")
        : '<div class="empty-state">Denník sa nepodarilo načítať.</div>';
    }
  }

  if (journalSidebarEl) {
    const latestEntries = journalEntries.slice(0, 3);
    try {
      journalSidebarEl.innerHTML = latestEntries.length
        ? `
          ${latestEntries.map((entry) => renderJournalSidebarCard(entry)).join("")}
          ${state.journal.length > latestEntries.length ? `<button class="button button--ghost mini-list__more" type="button" id="open-all-journal">Zobraziť všetky zápisy (${state.journal.length})</button>` : ""}
        `
        : '<div class="empty-state">Keď pridáš prvý zápis, ukáže sa aj tu.</div>';
    } catch (error) {
      console.error("Zlyhal bočný prehľad denníka", error);
      journalSidebarEl.innerHTML = latestEntries.length
        ? `
          ${latestEntries.map((entry) => `
            <article class="sidebar-preview-card sidebar-preview-card--journal">
              <div class="sidebar-preview-card__title-row">
                <p class="sidebar-preview-card__title">${escapeHtml(entry.title || "Záhradný zápis")}</p>
              </div>
              <p class="sidebar-preview-card__meta">${escapeHtml(formatDate(entry.date))}</p>
            </article>
          `).join("")}
          <button class="button button--ghost mini-list__more" type="button" id="open-all-journal">Otvoriť denník</button>
        `
        : '<div class="empty-state">Keď pridáš prvý zápis, ukáže sa aj tu.</div>';
    }
  }

  if (journalListEl) {
    journalListEl.querySelectorAll("[data-delete-journal]").forEach((button) => {
      button.addEventListener("click", () => {
        const entryId = button.dataset.deleteJournal;
        state.journal = state.journal.filter((entry) => entry.id !== entryId);
        if (!persist()) return;
        renderJournal();
      });
    });
  }

  if (journalSidebarEl) {
    const openAllJournalButton = document.getElementById("open-all-journal");
    if (openAllJournalButton) {
      openAllJournalButton.addEventListener("click", () => {
        forceOpenJournalManager();
      });
      openAllJournalButton.onclick = () => {
        forceOpenJournalManager();
        return false;
      };
    }

    bindThingLinks(journalSidebarEl);
  }

  if (journalListEl) {
    bindJournalOverlayCardActions(journalListEl);
  }
}

function renderJournalSidebarCard(entry) {
  const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
  const chips = journalDisplayChips(normalizedEntry);
  const previewText = trimText(normalizedEntry.text || "", 120);
  const isWalkEntry = normalizedEntry.entryType === "walk";
  const displayTitle = isWalkEntry
    ? "Prechádzka"
    : (journalDisplayTitle(normalizedEntry) || "Záhradný zápis");
  const walkTimeRange = isWalkEntry ? walkTimeRangeLabel(normalizedEntry.walk) : "";
  const sidebarDateLabel = [formatDate(normalizedEntry.date), walkTimeRange].filter(Boolean).join(" • ");
  return `
    <article class="sidebar-preview-card sidebar-preview-card--journal">
      <div class="sidebar-preview-card__journal-top">
        <p class="sidebar-preview-card__meta sidebar-preview-card__meta--journal">${escapeHtml(sidebarDateLabel)}</p>
        ${renderMoodBadge(normalizedEntry.mood, "sidebar-preview-card__mood")}
      </div>
      <p class="sidebar-preview-card__title sidebar-preview-card__title--journal">${escapeHtml(displayTitle)}</p>
      ${previewText ? `<p class="sidebar-preview-card__excerpt">${escapeHtml(previewText)}</p>` : ""}
      ${chips.length ? `<div class="sidebar-preview-card__footer"><div class="home-chip-row">${chips.map(renderJournalChip).join("")}</div></div>` : ""}
    </article>
  `;
}

function renderTaskSidebarCard(task) {
  const isOverdue = Boolean(task.date && task.date < todayISO());
  return `
    <article class="sidebar-preview-card sidebar-preview-card--task ${isOverdue ? "sidebar-preview-card--task-overdue" : ""}">
      <div class="sidebar-preview-card__task-row">
        <label class="sidebar-preview-card__checkbox-wrap" aria-label="Označiť úlohu ako hotovú">
          <input class="sidebar-preview-card__checkbox-input" type="checkbox" data-toggle-task="${task.id}" ${task.done ? "checked" : ""}>
          <span class="sidebar-preview-card__checkbox" aria-hidden="true"></span>
        </label>
        <p class="sidebar-preview-card__title">${escapeHtml(task.text)}</p>
        <span class="sidebar-preview-card__badge ${isOverdue ? "sidebar-preview-card__badge--overdue" : ""}">${escapeHtml(task.date ? formatDate(task.date) : "bez termínu")}</span>
      </div>
    </article>
  `;
}

function latestJournalImages() {
  return state.journal
    .flatMap((entry) => {
      const images = Array.isArray(entry.images) && entry.images.length
        ? entry.images
        : entry.image
          ? [entry.image]
          : [];
      return images.map((image, index) => ({
        entryId: entry.id,
        entryTitle: entry.title || "Záhradný zápis",
        entryDate: entry.date,
        entryText: String(entry.text || "").trim(),
        image,
        index
      }));
    })
    .slice(0, 12);
}

function renderMemories() {
  if (!memoryStripEl) return;
  const memoryItems = latestJournalImages();
  const totalJournalEntries = Array.isArray(state.journal) ? state.journal.length : 0;

  if (memoryCarouselIndex >= memoryItems.length) {
    memoryCarouselIndex = 0;
  }

  memoryStripEl.innerHTML = memoryItems.length
    ? `
      <div class="memory-strip__frame">
        ${memoryItems.length > 1 ? `
          <button class="memory-strip__nav memory-strip__nav--prev" type="button" data-memory-step="-1" aria-label="Predošlá spomienka">‹</button>
        ` : ""}
        <div class="memory-strip__hero" aria-label="${escapeAttribute(memoryItems[memoryCarouselIndex].entryTitle)}">
          <span class="memory-strip__backdrop" style="background-image:url('${escapeAttribute(memoryItems[memoryCarouselIndex].image)}')"></span>
          <img src="${escapeAttribute(memoryItems[memoryCarouselIndex].image)}" alt="${escapeAttribute(memoryItems[memoryCarouselIndex].entryTitle)}">
          <span class="memory-strip__count">${memoryCarouselIndex + 1}/${memoryItems.length}</span>
          ${memoryItems[memoryCarouselIndex].entryText
            ? `<span class="memory-strip__note">${escapeHtml(trimText(memoryItems[memoryCarouselIndex].entryText, 160))}</span>`
            : ""}
        </div>
        ${memoryItems.length > 1 ? `
          <button class="memory-strip__nav memory-strip__nav--next" type="button" data-memory-step="1" aria-label="Ďalšia spomienka">›</button>
        ` : ""}
      </div>
    `
    : '<div class="empty-state empty-state--compact">Keď pridáš fotky do denníka, ukážu sa aj tu.</div>';

  memoryStripEl.querySelectorAll("[data-memory-step]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (memoryItems.length < 2) return;
      const step = Number(button.getAttribute("data-memory-step") || 0);
      if (!step) return;
      memoryCarouselIndex = (memoryCarouselIndex + step + memoryItems.length) % memoryItems.length;
      renderMemories();
    });
  });

  const memoryHero = memoryStripEl.querySelector(".memory-strip__hero");
  const memoryHeroImage = memoryHero?.querySelector("img");
  if (memoryHero && memoryHeroImage) {
    const syncMemoryHeroOrientation = () => {
      const isPortrait = memoryHeroImage.naturalHeight > memoryHeroImage.naturalWidth;
      memoryHero.classList.toggle("memory-strip__hero--portrait", isPortrait);
      memoryHero.classList.toggle("memory-strip__hero--landscape", !isPortrait);
    };

    if (memoryHeroImage.complete && memoryHeroImage.naturalWidth && memoryHeroImage.naturalHeight) {
      syncMemoryHeroOrientation();
    } else {
      memoryHeroImage.addEventListener("load", syncMemoryHeroOrientation, { once: true });
    }
  }

  const openAllJournalButton = document.getElementById("open-all-journal-from-memories");
  if (openAllJournalButton) {
    openAllJournalButton.textContent = totalJournalEntries
      ? `Zobraziť všetky zápisy (${totalJournalEntries})`
      : "Otvoriť denník";
    openAllJournalButton.onclick = () => {
      forceOpenJournalManager();
      return false;
    };
  }
}

function insightWeatherSignals() {
  const weeks = Array.isArray(homeWeatherOverview?.weeks) ? homeWeatherOverview.weeks : [];
  const currentWeek = weeks.find((week) => week.key === "current") || weeks[0] || null;
  const nextWeek = weeks.find((week) => week.key === "next") || null;
  const upcomingDays = [...(currentWeek?.days || []), ...(nextWeek?.days || [])]
    .filter((item) => item && item.date && !item.isPast)
    .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  return {
    alerts: Array.isArray(homeWeatherOverview?.alerts) ? homeWeatherOverview.alerts : [],
    currentWeek,
    nextWeek,
    upcomingDays,
    frostDay: upcomingDays.find((item) => item.hardFrost || item.groundFrostRisk) || null,
    rainDay: upcomingDays.find((item) => item.heavyRain) || null,
    stormDay: upcomingDays.find((item) => item.hail || item.storm) || null,
    hotDay: upcomingDays.find((item) => item.veryHotDay || item.hotDay) || null,
    windDay: upcomingDays.find((item) => item.strongWind) || null
  };
}

function weatherInsightWeekTip(week, eyebrow = "") {
  if (!week?.summary) return null;
  const summary = week.summary;
  const upcomingDays = (week.days || []).filter((day) => day && !day.isPast);
  const frostDay = upcomingDays.find((day) => day.hardFrost || day.groundFrostRisk) || null;
  const rainDay = upcomingDays.find((day) => day.heavyRain) || null;
  const stormDay = upcomingDays.find((day) => day.hail || day.storm) || null;
  const hotDay = upcomingDays.find((day) => day.veryHotDay || day.hotDay) || null;
  const windDay = upcomingDays.find((day) => day.strongWind) || null;

  if (frostDay) {
    return {
      key: `weather-week-frost-${week.key}-${frostDay.date}`,
      eyebrow,
      title: `${week.label}: chladné rána`,
      body: `${capitalizeLabel(frostDay.label)} ${frostDay.calendarLabel} môže minimum padnúť na ${Math.round(frostDay.minTempC || 0)} °C. Citlivejšie výsevy, priesady a kvitnúce veci radšej sleduj alebo chráň.`
    };
  }

  if (stormDay) {
    return {
      key: `weather-week-storm-${week.key}-${stormDay.date}`,
      eyebrow,
      title: `${week.label}: sleduj búrky a krúpy`,
      body: `${capitalizeLabel(stormDay.label)} ${stormDay.calendarLabel} môže prísť prudší zásah. Oplatí sa skontrolovať nádoby, opory a všetko krehké alebo čerstvo vysadené.`
    };
  }

  if (rainDay || summary.totalRainMm >= 18) {
    return {
      key: `weather-week-rain-${week.key}`,
      eyebrow,
      title: `${week.label}: daždivejší priebeh`,
      body: `Od pondelka do nedele to vyzerá približne na ${summary.totalRain || "viac zrážok"}. Sleduj premokrenie nádob, odtok vody, blato a tlak na choroby.`
    };
  }

  if (summary.totalRainMm <= 4) {
    return {
      key: `weather-week-dry-${week.key}`,
      eyebrow,
      title: `${week.label}: skôr suchší priebeh`,
      body: `Zatiaľ vychádza len okolo ${summary.totalRain || "málo zrážok"}. Skontroluj nádoby, skleník a vrchnú vrstvu pôdy, hlavne pri čerstvých výsevoch a priesadách.`
    };
  }

  if (hotDay || summary.hottestMax >= 28) {
    return {
      key: `weather-week-heat-${week.key}`,
      eyebrow,
      title: `${week.label}: teplejšie dni`,
      body: `Maximum môže ísť približne na ${Math.round(summary.hottestMax || 0)} °C. V skleníku a nádobách sleduj rýchle presychanie, vetranie a tienenie.`
    };
  }

  if (windDay || summary.maxWindKmh >= 28) {
    return {
      key: `weather-week-wind-${week.key}`,
      eyebrow,
      title: `${week.label}: veterné dni`,
      body: `Vietor môže ísť približne na ${summary.maxWind || ""}. Skontroluj opory, vysychanie substrátu a či niečo nefúka priamo na citlivejšie rastliny.`
    };
  }

  if (summary.coldestMin !== null && summary.coldestMin <= 4) {
    return {
      key: `weather-week-cold-${week.key}`,
      eyebrow,
      title: `${week.label}: chladnejší priebeh`,
      body: `Najnižšie ranné teploty môžu byť okolo ${Math.round(summary.coldestMin)} °C. Pri skorých výsevoch a skleníku sa oplatí sledovať nočný pokles viac než popoludnie.`
    };
  }

  return {
    key: `weather-week-overview-${week.key}`,
    eyebrow,
    title: `${week.label}: pokojnejší priebeh`,
    body: `Zatiaľ to vyzerá skôr na ${summary.skyLabel || "pokojnejší týždeň"}, približne ${summary.totalRain || "0 mm"} zrážok a vietor skôr do ${summary.maxWind || "slabších hodnôt"}.`
  };
}

function buildSmartInsights(weather = insightWeatherSignals(), options = {}) {
  const includeAlerts = options?.includeAlerts !== false;
  const tips = [];
  const seenKeys = new Set();
  const pushTip = (target, tip) => {
    const title = String(tip?.title || "").trim();
    const body = String(tip?.body || "").trim();
    if (!title || !body) return;
    const key = String(tip?.key || `${tip?.eyebrow || ""}|${title}`).trim();
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    target.push({
      eyebrow: String(tip?.eyebrow || "Tip").trim(),
      title,
      body
    });
  };

  if (includeAlerts) {
    weather.alerts.slice(0, 4).forEach((alert, index) => {
      pushTip(tips, {
        key: `weather-alert-${index}-${slugify(alert.title || "")}`,
        eyebrow: alert.eyebrow || "Počasie",
        title: alert.title || "Upozornenie",
        body: alert.body || ""
      });
    });
  }

  const currentWeekTip = weatherInsightWeekTip(weather.currentWeek, "Tento týždeň");
  if (currentWeekTip) pushTip(tips, currentWeekTip);

  const nextWeekTip = weatherInsightWeekTip(weather.nextWeek, "Ďalší týždeň");
  if (nextWeekTip) pushTip(tips, nextWeekTip);

  if (weather.currentWeek?.summary && weather.nextWeek?.summary) {
    const currentRain = Number(weather.currentWeek.summary.totalRainMm || 0);
    const nextRain = Number(weather.nextWeek.summary.totalRainMm || 0);
    const currentMin = Number.isFinite(weather.currentWeek.summary.coldestMin) ? weather.currentWeek.summary.coldestMin : null;
    const nextMin = Number.isFinite(weather.nextWeek.summary.coldestMin) ? weather.nextWeek.summary.coldestMin : null;
    const currentMax = Number.isFinite(weather.currentWeek.summary.hottestMax) ? weather.currentWeek.summary.hottestMax : null;
    const nextMax = Number.isFinite(weather.nextWeek.summary.hottestMax) ? weather.nextWeek.summary.hottestMax : null;

    if (Math.abs(nextRain - currentRain) >= 10) {
      pushTip(tips, {
        key: "weather-week-shift-rain",
        eyebrow: "Porovnanie týždňov",
        title: nextRain > currentRain ? "Budúci týždeň môže byť mokrejší" : "Budúci týždeň môže byť suchší",
        body: nextRain > currentRain
          ? `Po tomto týždni môže prísť viac vody, približne ${weather.nextWeek.summary.totalRain || "vyšší úhrn zrážok"}. Oplatí sa myslieť na odtok, blato a tlak na choroby.`
          : `Po tomto týždni môže prísť menej vody, len približne ${weather.nextWeek.summary.totalRain || "nižší úhrn zrážok"}. Sleduj presychanie nádob, skleníka a čerstvých výsevov.`
      });
    }

    if (currentMin !== null && nextMin !== null && Math.abs(nextMin - currentMin) >= 4) {
      pushTip(tips, {
        key: "weather-week-shift-cold",
        eyebrow: "Porovnanie týždňov",
        title: nextMin < currentMin ? "Budúci týždeň môžu prísť chladnejšie rána" : "Budúci týždeň môžu rána trochu povoliť",
        body: nextMin < currentMin
          ? `Minimum môže klesnúť približne z ${Math.round(currentMin)} °C na ${Math.round(nextMin)} °C. Pri citlivých rastlinách rátaj s väčším rizikom ranného chladu.`
          : `Ranné minimum môže stúpnuť približne z ${Math.round(currentMin)} °C na ${Math.round(nextMin)} °C. Stále sa však oplatí sledovať prípadný prízemný mráz v jasných nociach.`
      });
    }

    if (currentMax !== null && nextMax !== null && Math.abs(nextMax - currentMax) >= 4) {
      pushTip(tips, {
        key: "weather-week-shift-heat",
        eyebrow: "Porovnanie týždňov",
        title: nextMax > currentMax ? "Budúci týždeň môže byť teplejší" : "Budúci týždeň môže trochu schladiť",
        body: nextMax > currentMax
          ? `Maximá môžu stúpnuť približne z ${Math.round(currentMax)} °C na ${Math.round(nextMax)} °C. V skleníku a nádobách si skontroluj vetranie, tienenie a rýchlosť presychania.`
          : `Maximá môžu klesnúť približne z ${Math.round(currentMax)} °C na ${Math.round(nextMax)} °C. Pri skorom pestovaní bude opäť dôležitejší nočný a ranný priebeh než obedné slnko.`
      });
    }
  }

  return tips.slice(0, 8);
}

function renderInsightSignalPill(alert) {
  const visual = weatherAlertVisual(alert);
  const title = String(alert?.title || visual.label || "Upozornenie").trim();
  return `
    <span class="insight-signal-pill insight-signal-pill--${escapeAttribute(visual.tone || alert?.tone || "soft")}">
      <span class="insight-signal-pill__icon" aria-hidden="true">${escapeHtml(visual.icon || ICONS.weatherPartly)}</span>
      <span class="insight-signal-pill__label">${escapeHtml(trimText(title, 32))}</span>
    </span>
  `;
}

function renderInsightSignalDock(alerts = []) {
  if (!alerts.length) return "";
  const primaryAlert = alerts[0];
  const primaryVisual = weatherAlertVisual(primaryAlert);
  const primaryTone = String(primaryVisual.tone || primaryAlert?.tone || "soft").trim();
  const primaryTitle = String(primaryAlert?.title || primaryVisual.label || "Upozornenie").trim();
  const summaryTitle = alerts.length === 1
    ? primaryTitle
    : `Dnes ${countedLabel(alerts.length, "dôležitý signál", "dôležité signály", "dôležitých signálov")}`;
  return `
    <section class="insight-signal-dock insight-signal-dock--${escapeAttribute(primaryTone)}" aria-label="Rýchle varovania">
      <div class="insight-signal-dock__hero">
        <span class="insight-signal-dock__icon" aria-hidden="true">${escapeHtml(primaryVisual.icon || ICONS.weatherPartly)}</span>
        <span class="insight-signal-dock__copy">
          <span class="insight-signal-dock__eyebrow">${escapeHtml(alerts.length === 1 ? String(primaryAlert?.eyebrow || "Počasie").trim() : "Rýchly prehľad")}</span>
          <strong>${escapeHtml(summaryTitle)}</strong>
        </span>
        ${alerts.length > 1 ? `
          <span class="insight-signal-dock__cluster" aria-hidden="true">
            ${alerts.slice(0, 3).map((alert) => {
              const visual = weatherAlertVisual(alert);
              return `<span class="insight-signal-dock__cluster-item insight-signal-dock__cluster-item--${escapeAttribute(visual.tone || alert?.tone || "soft")}">${escapeHtml(visual.icon || ICONS.weatherPartly)}</span>`;
            }).join("")}
          </span>
        ` : ""}
      </div>
      ${alerts.length > 1 ? `
        <div class="insight-signal-dock__pills">
          ${alerts.map((alert) => renderInsightSignalPill(alert)).join("")}
        </div>
      ` : ""}
    </section>
  `;
}

function renderInsights() {
  if (!insightStripEl) return;
  const weather = insightWeatherSignals();
  const isMobileShell = Boolean(document.body?.classList.contains("app-mobile-shell"));
  const compactAlerts = isMobileShell ? [] : [];
  const tips = buildSmartInsights(weather, { includeAlerts: !isMobileShell || compactAlerts.length === 0 });
  if (insightTipIndex >= tips.length) {
    insightTipIndex = 0;
  }
  insightStripEl.innerHTML = (tips.length || compactAlerts.length)
    ? `
      ${compactAlerts.length ? renderInsightSignalDock(compactAlerts) : ""}
      ${tips.length ? `
        <div class="insight-strip__ticker">
          ${tips.map((tip, index) => `
            <article class="insight-strip__slide ${index === insightTipIndex ? "is-active" : ""}">
              <p class="insight-strip__eyebrow">${escapeHtml(tip.eyebrow)}</p>
              <h4>${escapeHtml(tip.title)}</h4>
              <p>${escapeHtml(tip.body)}</p>
            </article>
          `).join("")}
        </div>
      ` : ""}
    `
    : '<div class="empty-state empty-state--compact">Tipy sa objavia podľa počasia a týždenného vývoja.</div>';
}

function syncOverviewHighlights() {
  if (overviewHighlightsInterval) {
    clearInterval(overviewHighlightsInterval);
    overviewHighlightsInterval = null;
  }

  const memoryItems = latestJournalImages();
  const weather = insightWeatherSignals();
  const isMobileShell = Boolean(document.body?.classList.contains("app-mobile-shell"));
  const compactAlerts = isMobileShell ? [] : [];
  const tips = buildSmartInsights(weather, { includeAlerts: !isMobileShell || compactAlerts.length === 0 });
  const canRotateMemories = memoryItems.length > 1;
  const canRotateTips = tips.length > 1;

  if (!canRotateMemories && !canRotateTips) return;

  overviewHighlightsInterval = window.setInterval(() => {
    overviewHighlightsStep += 1;

    if (canRotateMemories) {
      memoryCarouselIndex = (memoryCarouselIndex + 1) % memoryItems.length;
      renderMemories();
    }

    if (canRotateTips && overviewHighlightsStep % 2 === 0) {
      insightTipIndex = (insightTipIndex + 1) % tips.length;
      renderInsights();
    }
  }, 6200);
}

function renderTaskManagerList(taskList, taskCount, rerender) {
  const tasks = sortTasks(state.customTasks);
  if (taskCount) taskCount.textContent = countedLabel(tasks.length, "úloha", "úlohy", "úloh");

  taskList.innerHTML = tasks.length
    ? tasks.map(renderTaskItem).join("")
    : '<div class="empty-state empty-state--compact">Sem si môžeš pridávať vlastné úlohy.</div>';
  bindThingLinks(taskList);

  taskList.querySelectorAll("[data-toggle-task]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const task = state.customTasks.find((item) => item.id === checkbox.dataset.toggleTask);
      if (!task) return;
      const previousDone = task.done;
      task.done = checkbox.checked;
      if (!persist()) {
        task.done = previousDone;
        checkbox.checked = previousDone;
        return;
      }
      render();
      rerender();
    });
  });

  taskList.querySelectorAll("[data-delete-task]").forEach((button) => {
    button.addEventListener("click", () => {
      state.customTasks = state.customTasks.filter((item) => item.id !== button.dataset.deleteTask);
      if (!persist()) return;
      render();
      rerender();
    });
  });
}

function renderJournalManagerList(journalList, journalCount, rerender) {
  if (journalCount) journalCount.textContent = countedLabel(state.journal.length, "zápis", "zápisy", "zápisov");

  try {
    journalList.innerHTML = state.journal.length
      ? state.journal.map((entry) => renderJournalManagerCard(entry)).join("")
      : '<div class="empty-state empty-state--compact">Tvoje záznamy zo záhrady budú tu.</div>';
  } catch (error) {
    console.error("Zlyhal manažér denníka", error);
    journalList.innerHTML = state.journal.length
      ? state.journal.map((entry) => renderJournalManagerCard(entry)).join("")
      : '<div class="empty-state empty-state--compact">Tvoje záznamy zo záhrady budú tu.</div>';
  }

  bindThingLinks(journalList);

  journalList.querySelectorAll("[data-delete-worklog-journal]").forEach((button) => {
    button.addEventListener("click", () => {
      state.journal = state.journal.filter((entry) => entry.id !== button.dataset.deleteWorklogJournal);
      if (!persist()) return;
      render();
      rerender();
    });
  });

  journalList.querySelectorAll("[data-open-journal-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = state.journal.find((item) => item.id === button.dataset.openJournalImage);
      const images = Array.isArray(entry?.images) && entry.images.length ? entry.images : entry?.image ? [entry.image] : [];
      if (!images.length) return;
      const index = Number(button.dataset.journalImageIndex || 0);
      openImageLightbox(images, index, entry.title || "Fotka denníka");
    });
  });
}

function openTaskManager() {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--worklog");
  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact detail-layout--worklog">
      <div class="detail-copy detail-copy--wide worklog-manager">
        <section class="worklog-section worklog-section--single">
          <div class="worklog-section__head">
            <h4>Plán práce</h4>
            <div class="catalog-card__actions">
              <button class="button" type="button" id="open-add-task-from-worklog" aria-expanded="false">Pridať úlohu</button>
            </div>
          </div>
          <div class="worklog-task-editor" id="worklog-task-editor">
            <form id="worklog-task-form" class="task-form task-form--planner">
              <input name="text" type="text" placeholder="Napríklad: Presadiť papriky do väčších kelímkov" required>
              ${renderDateInput({ id: "worklog-task-date", name: "date" })}
              ${renderRelationDisclosure({
                summaryLabel: "Súvisí s kategóriou a kartou",
                categoryLabel: "Kategória",
                categoryInputName: "linkedCategoryIds",
                categoryValues: [],
                cardLabel: "Súvisí s kartou",
                cardInputName: "linkedVarietyId",
                cardValue: "",
                cardWrapKey: "task",
                cardCategoryIds: []
              })}
            </form>
            <div class="worklog-task-editor__actions">
              <button class="button button--ghost" type="button" id="close-add-task-editor">Zrušiť</button>
            </div>
          </div>
          <div id="worklog-task-list" class="task-stack task-stack--planner"></div>
        </section>
      </div>
    </div>
  `;

  const taskForm = document.getElementById("worklog-task-form");
  const taskEditor = document.getElementById("worklog-task-editor");
  const taskList = document.getElementById("worklog-task-list");
  const openTaskButton = document.getElementById("open-add-task-from-worklog");
  const closeTaskEditorButton = document.getElementById("close-add-task-editor");
  const taskTextInput = taskForm.elements.text;
  const linkedCategoryInputs = [...taskForm.querySelectorAll('input[name="linkedCategoryIds"]')];
  const linkedVarietySelect = taskForm.elements.linkedVarietyId;
  const linkedVarietyWrap = taskForm.querySelector('[data-linked-variety-wrap="task"]');
  const relationDisclosure = taskForm.querySelector("[data-relation-disclosure]");
  const relationSummary = relationDisclosure?.querySelector("[data-relation-summary]") || null;
  let isTaskEditorOpen = false;

  const rerenderTaskManager = () => renderTaskManagerList(taskList, null, rerenderTaskManager);

  const selectedTaskCategoryIds = () => linkedCategoryInputs
    .filter((input) => input.checked)
    .map((input) => String(input.value || "").trim())
    .filter(Boolean);

  const syncTaskRelationSummary = () => {
    const linkedCategoryIds = selectedTaskCategoryIds();
    const linkedVarietyId = String(linkedVarietySelect?.value || "").trim();
    if (relationSummary) {
      relationSummary.textContent = relationDisclosureSummaryText(linkedCategoryIds, linkedVarietyId);
    }
    relationDisclosure?.classList.toggle("has-selection", Boolean(linkedCategoryIds.length || linkedVarietyId));
  };

  const renderTaskVarietyOptions = () => {
    const selectedCategoryIds = selectedTaskCategoryIds();
    const allowedCategoryIds = selectedCategoryIds.length
      ? new Set(selectedCategoryIds.flatMap((categoryId) => [categoryId, ...collectDescendantCategoryIds(categoryId)]))
      : null;
    const previousValue = String(linkedVarietySelect?.value || "").trim();

    if (!selectedCategoryIds.length) {
      linkedVarietySelect.innerHTML = '<option value="">Bez karty</option>';
      linkedVarietySelect.value = "";
      if (linkedVarietyWrap) linkedVarietyWrap.hidden = true;
      syncTaskRelationSummary();
      return;
    }

    if (linkedVarietyWrap) linkedVarietyWrap.hidden = false;
    const filteredVarieties = state.varieties
      .filter((item) => !allowedCategoryIds || allowedCategoryIds.has(item.categoryId))
      .slice()
      .sort((a, b) => entryDisplayName(a).localeCompare(entryDisplayName(b), "sk"));

    linkedVarietySelect.innerHTML = `
      <option value="">Bez karty</option>
      ${filteredVarieties.map((item) => `<option value="${item.id}">${escapeHtml(entryDisplayName(item))}</option>`).join("")}
    `;

    if (previousValue && filteredVarieties.some((item) => item.id === previousValue)) {
      linkedVarietySelect.value = previousValue;
      syncTaskRelationSummary();
      return;
    }

    linkedVarietySelect.value = "";
    syncTaskRelationSummary();
  };

  const clearTaskForm = () => {
    taskForm.reset();
    linkedCategoryInputs.forEach((input) => {
      input.checked = false;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    if (linkedVarietySelect) {
      linkedVarietySelect.value = "";
    }
    if (relationDisclosure) {
      relationDisclosure.open = false;
    }
    renderTaskVarietyOptions();
    syncTaskRelationSummary();
  };

  const setTaskEditorOpen = (nextOpen) => {
    isTaskEditorOpen = Boolean(nextOpen);
    taskEditor?.classList.toggle("is-open", isTaskEditorOpen);
    openTaskButton.textContent = isTaskEditorOpen ? "Uložiť úlohu" : "Pridať úlohu";
    openTaskButton.setAttribute("aria-expanded", isTaskEditorOpen ? "true" : "false");
    if (isTaskEditorOpen) {
      window.setTimeout(() => {
        taskTextInput?.focus();
      }, 120);
      return;
    }
    clearTaskForm();
  };

  setupCategoryTreePickers(taskForm);
  linkedCategoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
      renderTaskVarietyOptions();
    });
  });
  linkedVarietySelect?.addEventListener("change", () => {
    const varietyId = String(linkedVarietySelect.value || "").trim();
    if (!varietyId) {
      syncTaskRelationSummary();
      return;
    }
    const variety = state.varieties.find((item) => item.id === varietyId);
    if (!variety) return;
    const matchingInput = linkedCategoryInputs.find((input) => String(input.value || "").trim() === String(variety.categoryId || "").trim());
    if (!matchingInput) return;
    if (!matchingInput.checked) {
      matchingInput.checked = true;
      matchingInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    linkedVarietySelect.value = varietyId;
  });
  renderTaskVarietyOptions();

  openTaskButton?.addEventListener("click", () => {
    if (!isTaskEditorOpen) {
      setTaskEditorOpen(true);
      return;
    }
    taskForm.requestSubmit();
  });

  closeTaskEditorButton?.addEventListener("click", () => {
    setTaskEditorOpen(false);
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(taskForm);
    const text = String(form.get("text") || "").trim();
    if (!text) return;
    const linkedVarietyId = String(form.get("linkedVarietyId") || "").trim();
    const linkedCategoryIds = form.getAll("linkedCategoryIds").map((value) => String(value || "").trim()).filter(Boolean);
    if (!linkedCategoryIds.length && linkedVarietyId) {
      const inferredCategoryId = state.varieties.find((item) => item.id === linkedVarietyId)?.categoryId || "";
      if (inferredCategoryId) linkedCategoryIds.push(inferredCategoryId);
    }
    state.customTasks.unshift(normalizeTaskRecord({
      id: makeId("task"),
      text,
      date: String(form.get("date") || ""),
      done: false,
      linkedCategoryIds,
      linkedCategoryId: linkedCategoryIds[0] || "",
      linkedVarietyId
    }, state.varieties));
    if (!persist()) return;
    render();
    rerenderTaskManager();
    setTaskEditorOpen(false);
  });

  setTaskEditorOpen(false);
  rerenderTaskManager();
  openDetailModalDialog();
}

function openJournalManager() {
  openJournalOverlayList();
}

function openAddEntryFlow(editingEntryId = "") {
  const editingEntry = editingEntryId
    ? normalizeJournalEntry(state.journal.find((entry) => entry.id === editingEntryId) || {}, state.varieties)
    : null;
  const defaultEntryMode = editingEntry && (
    (editingEntry.tags || []).length
    || editingEntry.place
    || (editingEntry.linkedCategoryIds || []).length
    || editingEntry.linkedCategoryId
    || editingEntry.linkedVarietyId
    || String(editingEntry?.date || todayISO()).slice(0, 10) !== todayISO()
  ) ? "full" : "quick";
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--worklog");
  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact detail-layout--worklog">
      <div class="detail-copy detail-copy--wide worklog-manager">
        <section class="worklog-section worklog-section--single">
          <div class="worklog-section__head worklog-section__head--with-weather">
            <div class="worklog-section__head-copy">
              <div class="entry-mode-switch" id="add-entry-mode-switch">
                <button class="entry-mode-switch__button ${defaultEntryMode === "quick" ? "is-active" : ""}" type="button" data-entry-mode="quick">Rýchly zápis</button>
                <button class="entry-mode-switch__button ${defaultEntryMode === "full" ? "is-active" : ""}" type="button" data-entry-mode="full">Rozšírený zápis</button>
              </div>
            </div>
            <div class="add-entry-form__weather add-entry-form__weather--head">
              <div class="weather-inline-card" id="weather-inline-card">
                <p class="weather-inline-card__status" id="weather-inline-status"></p>
                <div class="weather-inline-card__summary" id="weather-inline-summary" hidden></div>
              </div>
            </div>
          </div>
          <form id="add-entry-form" class="journal-form add-entry-form">
            <div class="add-entry-form__main">
              <input name="title" type="text" placeholder="Názov zápisu" value="${escapeAttribute(editingEntry?.title || "")}" required>
              <div data-full-only>
                ${renderDateInput({ id: "add-entry-date", name: "date", value: editingEntry?.date || todayISO(), required: true })}
              </div>
              <textarea name="text" rows="4" placeholder="Čo sa stalo, čo si si všimla, čo bolo dôležité...">${escapeHtml(editingEntry?.text || "")}</textarea>
              ${renderMoodPicker()}
              <input name="mood" type="hidden">
            </div>
            <input name="weatherCondition" type="hidden">
            <input name="weatherTemperature" type="hidden">
            <input name="weatherHumidity" type="hidden">
            <input name="weatherRain" type="hidden">
            <input name="weatherWind" type="hidden">
            <input name="weatherObservedAt" type="hidden">
            <input name="weatherPlaceLabel" type="hidden">
            <input name="weatherFetchedAt" type="hidden">
            <input name="weatherLatitude" type="hidden">
            <input name="weatherLongitude" type="hidden">
            <label class="upload-field upload-field--compact">
              <span class="upload-field__label">Fotky k zápisu</span>
              <input name="imageFiles" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}" multiple>
            </label>
            <div id="add-entry-image-preview" class="journal-form__image-list" hidden></div>
            <details class="entry-advanced" id="add-entry-advanced">
              <summary class="entry-advanced__summary">Viac možností</summary>
              <div class="entry-advanced__content">
                <input name="tags" type="text" placeholder="Tagy oddelené čiarkou" value="${escapeAttribute((editingEntry?.tags || []).join(", "))}">
                <div class="journal-tag-picker" data-journal-tag-picker hidden></div>
                <input name="place" type="text" placeholder="Miesto, napr. Záhon pri plote, Les za domom" value="${escapeAttribute(editingEntry?.place || "")}">
                ${renderRelationDisclosure({
                  summaryLabel: "Súvisí s kategóriami a kartou",
                  categoryLabel: "Kategórie",
                  categoryInputName: "linkedCategoryIds",
                  categoryValues: editingEntry?.linkedCategoryIds?.length ? editingEntry.linkedCategoryIds : editingEntry?.linkedCategoryId,
                  cardLabel: "Súvisí s kartou",
                  cardInputName: "linkedVarietyId",
                  cardValue: editingEntry?.linkedVarietyId || "",
                  cardWrapKey: "journal-manager",
                  cardCategoryIds: editingEntry?.linkedCategoryIds?.length ? editingEntry.linkedCategoryIds : editingEntry?.linkedCategoryId
                })}
              </div>
            </details>
            <button class="button" type="submit">${editingEntry ? "Uložiť zmeny" : "Uložiť zápis"}</button>
          </form>
        </section>
      </div>
    </div>
  `;

  const formEl = document.getElementById("add-entry-form");
  const imageInput = formEl.elements.imageFiles;
  const imagePreview = document.getElementById("add-entry-image-preview");
  const moodPickerEl = document.getElementById("add-entry-mood-picker");
  const modeSwitchEl = document.getElementById("add-entry-mode-switch");
  const advancedDetailsEl = document.getElementById("add-entry-advanced");
  const dateInput = formEl.elements.date;
  const linkedCategoryInputs = [...formEl.querySelectorAll('input[name="linkedCategoryIds"]')];
  const linkedVarietySelect = formEl.elements.linkedVarietyId;
  const linkedVarietyWrap = formEl.querySelector('[data-linked-variety-wrap="journal-manager"]');
  const relationDisclosure = formEl.querySelector("[data-relation-disclosure]");
  const relationSummary = relationDisclosure?.querySelector("[data-relation-summary]") || null;
  const weatherStatusEl = document.getElementById("weather-inline-status");
  const weatherSummaryEl = document.getElementById("weather-inline-summary");
  let pendingFiles = [];
  let existingImages = editingEntry ? [...journalImages(editingEntry)] : [];
  let pendingUrls = [];
  let weatherRefreshTimeout = null;
  let weatherAutoRefreshTimer = null;
  let weatherRequestCounter = 0;
  let currentWeatherSource = loadWeatherPreferences();

  const setEntryMode = (mode) => {
    formEl.dataset.entryMode = mode;
    modeSwitchEl?.querySelectorAll("[data-entry-mode]").forEach((button) => {
      const isActive = button.dataset.entryMode === mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    if (advancedDetailsEl) {
      advancedDetailsEl.open = mode === "full";
      advancedDetailsEl.hidden = mode !== "full";
    }
    formEl.querySelectorAll("[data-full-only]").forEach((section) => {
      section.hidden = mode !== "full";
    });
  };

  const clearPendingUrls = () => {
    pendingUrls.forEach((url) => URL.revokeObjectURL(url));
    pendingUrls = [];
  };

  const renderPreview = () => {
    if (!imagePreview) return;
    clearPendingUrls();
    const existingItems = existingImages.map((image, index) => `
      <div class="journal-form__image journal-form__image--pending">
        <img src="${escapeAttribute(image)}" alt="Uložená fotka ${index + 1}">
        <button class="journal-form__image-remove" type="button" data-remove-existing-image="${index}" aria-label="Odstrániť fotku">x</button>
      </div>
    `);
    const pendingItems = pendingFiles.map((file, index) => {
      const url = URL.createObjectURL(file);
      pendingUrls.push(url);
      return `
        <div class="journal-form__image journal-form__image--pending">
          <img src="${escapeAttribute(url)}" alt="Nová fotka ${index + 1}">
          <button class="journal-form__image-remove" type="button" data-remove-add-file="${index}" aria-label="Odstrániť fotku">x</button>
        </div>
      `;
    });
    const items = [...existingItems, ...pendingItems].join("");
    imagePreview.hidden = !items;
    imagePreview.innerHTML = items;
  };

  imageInput?.addEventListener("change", () => {
    const files = Array.from(imageInput.files || []).filter((file) => file instanceof File && file.size);
    if (!files.length) return;
    pendingFiles = [...pendingFiles, ...files];
    imageInput.value = "";
    renderPreview();
  });

  imagePreview?.addEventListener("click", (event) => {
    const existingButton = event.target.closest("[data-remove-existing-image]");
    if (existingButton) {
      const index = Number(existingButton.dataset.removeExistingImage);
      existingImages = existingImages.filter((_, imageIndex) => imageIndex !== index);
      renderPreview();
      return;
    }

    const button = event.target.closest("[data-remove-add-file]");
    if (!button) return;
    const index = Number(button.dataset.removeAddFile);
    pendingFiles = pendingFiles.filter((_, fileIndex) => fileIndex !== index);
    renderPreview();
  });

  const syncMoodPicker = (selectedValue) => {
    if (!moodPickerEl) return;
    formEl.elements.mood.value = selectedValue;
    moodPickerEl.querySelectorAll("[data-mood-value]").forEach((item) => {
      const isSelected = item.dataset.moodValue === selectedValue;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  };

  moodPickerEl?.querySelectorAll("[data-mood-value]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextValue = button.dataset.moodValue || "";
      const currentValue = String(formEl.elements.mood.value || "");
      const selectedValue = currentValue === nextValue ? "" : nextValue;
      syncMoodPicker(selectedValue);
    });
  });

  modeSwitchEl?.querySelectorAll("[data-entry-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      setEntryMode(button.dataset.entryMode || "quick");
    });
  });
  setEntryMode(defaultEntryMode);
  syncMoodPicker(editingEntry?.mood || "");
  renderPreview();
  setupJournalTagInput(formEl);

  const selectedJournalCategoryIds = () => linkedCategoryInputs
    .filter((input) => input.checked)
    .map((input) => String(input.value || "").trim())
    .filter(Boolean);

  const syncJournalRelationSummary = () => {
    const linkedCategoryIds = selectedJournalCategoryIds();
    const linkedVarietyId = String(linkedVarietySelect?.value || "").trim();
    if (relationSummary) {
      relationSummary.textContent = relationDisclosureSummaryText(linkedCategoryIds, linkedVarietyId);
    }
    relationDisclosure?.classList.toggle("has-selection", Boolean(linkedCategoryIds.length || linkedVarietyId));
  };

  const renderLinkedVarietyOptions = () => {
    if (!linkedVarietySelect) return;
    const selectedCategoryIds = selectedJournalCategoryIds();
    const previousValue = String(linkedVarietySelect?.value || "").trim();

    if (!selectedCategoryIds.length) {
      linkedVarietySelect.innerHTML = '<option value="">Bez karty</option>';
      linkedVarietySelect.value = "";
      if (linkedVarietyWrap) linkedVarietyWrap.hidden = true;
      syncJournalRelationSummary();
      return;
    }

    if (linkedVarietyWrap) linkedVarietyWrap.hidden = false;
    linkedVarietySelect.innerHTML = `<option value="">Bez karty</option>${linkedVarietyOptions(previousValue, selectedCategoryIds)}`;

    if (previousValue) {
      linkedVarietySelect.value = previousValue;
    }
    syncJournalRelationSummary();
  };

  setupCategoryTreePickers(formEl);
  linkedCategoryInputs.forEach((input) => {
    input.addEventListener("change", renderLinkedVarietyOptions);
  });
  linkedVarietySelect?.addEventListener("change", syncJournalRelationSummary);
  renderLinkedVarietyOptions();
  if (editingEntry?.linkedVarietyId && linkedVarietySelect) {
    linkedVarietySelect.value = editingEntry.linkedVarietyId;
  }

  const setWeatherStatus = (text, tone = "") => {
    if (!weatherStatusEl) return;
    weatherStatusEl.textContent = text;
    weatherStatusEl.dataset.tone = tone;
  };

  const clearWeatherFields = () => {
    ["weatherCondition", "weatherTemperature", "weatherHumidity", "weatherRain", "weatherWind", "weatherObservedAt", "weatherPlaceLabel", "weatherFetchedAt", "weatherLatitude", "weatherLongitude"].forEach((name) => {
      formEl.elements[name].value = "";
    });
    if (weatherSummaryEl) {
      weatherSummaryEl.hidden = true;
      weatherSummaryEl.innerHTML = "";
    }
  };

  const applyWeatherSnapshotToForm = (snapshot) => {
    formEl.elements.weatherCondition.value = snapshot.condition || "";
    formEl.elements.weatherTemperature.value = snapshot.temperature || "";
    formEl.elements.weatherHumidity.value = snapshot.humidity || "";
    formEl.elements.weatherRain.value = snapshot.rain || "";
    formEl.elements.weatherWind.value = snapshot.wind || "";
    formEl.elements.weatherObservedAt.value = snapshot.observedAt || "";
    formEl.elements.weatherPlaceLabel.value = snapshot.placeLabel || "";
    formEl.elements.weatherFetchedAt.value = snapshot.fetchedAt || "";
    formEl.elements.weatherLatitude.value = snapshot.latitude || "";
    formEl.elements.weatherLongitude.value = snapshot.longitude || "";
    if (weatherSummaryEl) {
      weatherSummaryEl.hidden = false;
      weatherSummaryEl.innerHTML = renderMainMenuWeatherMini(snapshot);
    }
  };

  const syncAutoRefreshForToday = () => {
    if (weatherAutoRefreshTimer) clearTimeout(weatherAutoRefreshTimer);
    if (String(dateInput?.value || todayISO()) !== todayISO()) return;
    weatherAutoRefreshTimer = window.setTimeout(() => {
      if (!formEl.isConnected) return;
      fetchWeatherSnapshotForForm().catch(() => {});
    }, WEATHER_AUTO_REFRESH_MS);
  };

  const fetchWeatherSnapshotForForm = async () => {
    const requestId = ++weatherRequestCounter;
    clearWeatherFields();
    setWeatherStatus("Načítavam počasie…", "loading");

    try {
      const source = await resolveWeatherSource({
        fallbackPreferences: currentWeatherSource
      });
      currentWeatherSource = source;
      saveWeatherPreferences(source);
      const snapshot = await fetchWeatherForDate(source, String(dateInput?.value || todayISO()));
      if (requestId !== weatherRequestCounter) return;
      applyWeatherSnapshotToForm(snapshot);
      setWeatherStatus("", "success");
      syncAutoRefreshForToday();
    } catch (error) {
      if (requestId !== weatherRequestCounter) return;
      clearWeatherFields();
      setWeatherStatus(error.message || "Počasie sa nepodarilo načítať.", "error");
    }
  };

  const scheduleWeatherRefresh = () => {
    if (weatherRefreshTimeout) clearTimeout(weatherRefreshTimeout);
    weatherRefreshTimeout = window.setTimeout(() => {
      fetchWeatherSnapshotForForm();
    }, 420);
  };

  dateInput?.addEventListener("change", scheduleWeatherRefresh);

  if (editingEntry?.weather) {
    applyWeatherSnapshotToForm(editingEntry.weather);
    setWeatherStatus("", "success");
    syncAutoRefreshForToday();
  } else {
    fetchWeatherSnapshotForForm().catch(() => {});
  }

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(formEl);
    const title = String(form.get("title") || "").trim();
    if (!title) return;
    const newImages = pendingFiles.length
      ? await Promise.all(pendingFiles.map((file) => fileToOptimizedDataUrl(file, 720, 0.68)))
      : [];
    const images = [...existingImages, ...newImages];
    const linkedVarietyId = String(form.get("linkedVarietyId") || "");
    const linkedCategoryIds = form.getAll("linkedCategoryIds").map((value) => String(value || "").trim()).filter(Boolean);
    if (!linkedCategoryIds.length && linkedVarietyId) {
      const inferredCategoryId = state.varieties.find((item) => item.id === linkedVarietyId)?.categoryId || "";
      if (inferredCategoryId) linkedCategoryIds.push(inferredCategoryId);
    }
    const normalizedLinkedCategoryIds = normalizeIdList(linkedCategoryIds);
    const linkedCategoryId = normalizedLinkedCategoryIds[0] || "";
    const entry = normalizeJournalEntry({
      id: editingEntry?.id || makeId("journal"),
      title,
      date: stampJournalDate(String(form.get("date") || todayISO()), editingEntry?.date || ""),
      text: String(form.get("text") || "").trim(),
      images,
      image: images[0] || "",
      entryType: editingEntry?.entryType || "",
      tags: normalizeTagList(form.get("tags")),
      linkedCategoryIds: normalizedLinkedCategoryIds,
      linkedCategoryId,
      linkedVarietyId,
      mood: String(form.get("mood") || "").trim(),
      place: String(form.get("place") || "").trim(),
      weather: normalizeWeatherSnapshot({
        condition: form.get("weatherCondition"),
        temperature: form.get("weatherTemperature"),
        humidity: form.get("weatherHumidity"),
        rain: form.get("weatherRain"),
        wind: form.get("weatherWind"),
        observedAt: form.get("weatherObservedAt"),
        placeLabel: form.get("weatherPlaceLabel"),
        fetchedAt: form.get("weatherFetchedAt"),
        latitude: form.get("weatherLatitude"),
        longitude: form.get("weatherLongitude")
      })
    }, state.varieties);

    if (editingEntry) {
      const entryIndex = state.journal.findIndex((item) => item.id === editingEntry.id);
      if (entryIndex === -1) return;
      const previousEntry = state.journal[entryIndex];
      state.journal[entryIndex] = entry;
      clearPendingUrls();
      if (!persist()) {
        state.journal[entryIndex] = previousEntry;
        return;
      }
    } else {
      state.journal.unshift(entry);
      clearPendingUrls();
      if (!persist()) {
        state.journal = state.journal.filter((item) => item.id !== entry.id);
        return;
      }
    }
    render();
    detailModal.close();
  });

  openDetailModalDialog();
}

function openThingBrowser() {
  const records = buildThingRecords();
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--overview");
  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide">
        <p class="eyebrow">Témy</p>
        <h3>Všetky témy</h3>
        <p>Témy sa skladajú z toho, čo už v appke existuje: kategórie, odrody, tagy, miesta, problémy aj denníkové zápisy.</p>
        <div class="home-entity-grid">
          ${records.map((item) => `
            <button class="home-entity-card" type="button" data-open-browser-thing="${escapeAttribute(item.key)}">
              <span class="home-entity-card__type">${escapeHtml(item.kindLabel)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.summary)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  detailContent.querySelectorAll("[data-open-browser-thing]").forEach((button) => {
    button.addEventListener("click", () => openThingOverview(button.dataset.openBrowserThing || ""));
  });
  openDetailModalDialog();
}

function openThingOverview(thingKey) {
  if (!thingKey) return;
  const record = buildThingRecords().find((item) => item.key === thingKey);
  if (!record) return;
  if (journalOverlayRoot()) {
    closeJournalOverlay({ fromHistory: true });
  }

  if (record.kind === "category") {
    activeCategoryId = thingKey.replace("category:", "");
    isFocusedView = true;
    if (detailModal.open && typeof detailModal.close === "function") detailModal.close();
    render();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return;
  }

  const entries = relatedEntriesForThing(record);
  const tasks = relatedTasksForTheme(record);
  const photos = entries.flatMap((entry) => journalImages(entry));
  const linkedVarieties = [...new Map(
    entries
      .map((entry) => state.varieties.find((item) => item.id === entry.linkedVarietyId))
      .filter(Boolean)
      .map((item) => [item.id, item])
  ).values()];
  const linkedCategories = [...new Map(
    entries
      .flatMap((entry) => normalizeIdList(entry.linkedCategoryIds?.length ? entry.linkedCategoryIds : entry.linkedCategoryId)
        .map((categoryId) => state.categories.find((item) => item.id === categoryId)))
      .filter(Boolean)
      .map((item) => [item.id, item])
  ).values()];
  const directVariety = record.kind === "variety"
    ? state.varieties.find((variety) => variety.id === record.key.replace("variety:", ""))
    : null;
  const category = directVariety
    ? state.categories.find((item) => item.id === directVariety.categoryId)
    : null;

  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--overview");
  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide">
        ${record.kind === "tag" ? "" : `<p class="eyebrow">${escapeHtml(record.kindLabel)}</p>`}
        <h3>${escapeHtml(record.title)}</h3>
        ${record.kind === "tag" ? "" : `<p>${escapeHtml(record.summary)}</p>`}
        ${record.kind === "variety" && category ? `<p class="task-item__meta">Patrí do kategórie ${escapeHtml(category.name)}.</p>` : ""}
        ${record.kind === "category" ? '<p class="task-item__meta">Sekcia otvorí svoj plný katalóg, aby si ostala v známom pohľade kategórií a odrôd.</p>' : ""}
        ${record.kind === "tag" ? "" : (linkedCategories.length || linkedVarieties.length) ? `
          <section class="overview-group">
            <div class="overview-group__head">
              <h4>Napojené karty</h4>
            </div>
            <div class="journal-item__chips">
              ${linkedCategories.map((item) => renderJournalChip({ label: `Kategória: ${item.name}`, themeKey: `category:${item.id}` })).join("")}
              ${linkedVarieties.map((item) => renderJournalChip({ label: `Odroda: ${entryDisplayName(item)}`, themeKey: `variety:${item.id}` })).join("")}
            </div>
          </section>
        ` : ""}
        ${tasks.length ? `
          <section class="overview-group">
            <div class="overview-group__head">
              <h4>Súvisiace úlohy</h4>
              <span class="overview-group__count">${escapeHtml(countedLabel(tasks.length, "1 úloha", "úlohy", "úloh"))}</span>
            </div>
            <div class="task-stack">
              ${tasks.slice(0, 4).map((task) => renderTaskItem(task, { showDelete: false })).join("")}
            </div>
          </section>
        ` : ""}
        <section class="overview-group">
          ${record.kind === "tag" ? "" : `
            <div class="overview-group__head">
              <h4>Súvisiace zápisy</h4>
              <span class="overview-group__count">${escapeHtml(countedLabel(entries.length, "1 zápis", "zápisy", "zápisov"))}</span>
            </div>
          `}
        <div class="home-stack">
          ${entries.length
            ? entries.map((entry) => renderJournalItem(entry, "", "")).join("")
            : '<div class="empty-state">K tejto téme zatiaľ nie sú priradené žiadne zápisy.</div>'}
        </div>
        </section>
        ${photos.length ? `<button class="button" type="button" id="open-thing-photos">Otvoriť všetky fotky (${photos.length})</button>` : ""}
      </div>
    </div>
  `;

  const openThingPhotosButton = document.getElementById("open-thing-photos");
  if (openThingPhotosButton) {
    openThingPhotosButton.addEventListener("click", () => openImageLightbox(photos, 0, record.title));
  }
  bindThingLinks(detailContent);
  bindTaskActions(detailContent);

  detailContent.querySelectorAll("[data-open-journal-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = entries.find((item) => item.id === button.dataset.openJournalImage);
      const images = journalImages(entry || {});
      if (!images.length) return;
      const index = Number(button.dataset.journalImageIndex || 0);
      openImageLightbox(images, index, entry?.title || record.title);
    });
  });

  openDetailModalDialog();
}

function openSownOverviewModal(items) {
  openVarietyOverviewModal({
    title: "Čo mám vysiate",
    items,
    emptyMessage: "Zatiaľ tu nemáš nič vysiate.",
    detailBuilder: (item) => formatDate(item.sowedAt)
  });
}

function openFavoriteOverviewModal(items) {
  openVarietyOverviewModal({
    title: "Najobľúbenejšie odrody",
    items,
    emptyMessage: "Zatiaľ tu nemáš žiadne top odrody.",
    detailBuilder: (item) => `${categoryName(item.categoryId)}${inferBreedingType(item) === "hybrid" ? " • F1" : ""}`
  });
}

function openAvoidOverviewModal(items) {
  openVarietyOverviewModal({
    title: "Už nepestovať",
    items,
    emptyMessage: "Zatiaľ tu nemáš nič označené na vyradenie.",
    detailBuilder: (item) => `${categoryName(item.categoryId)}${inferBreedingType(item) === "hybrid" ? " • F1" : ""}`
  });
}

function openVarietyOverviewModal({ title, items, emptyMessage, detailBuilder }) {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--overview");
  const availableCategoryIds = [...new Set(items.map((item) => item.categoryId))];
  const categories = orderedCategories().filter((item) => availableCategoryIds.includes(item.id));

  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide overview-manager">
        <div class="overview-manager__head">
          <h3>${escapeHtml(title)}</h3>
        </div>
        ${categories.length > 1 ? `
          <label class="field-block field-block--full overview-manager__filter">
            <span>Filtrovať kategóriu</span>
            <select id="overview-category-filter">
              <option value="all">Všetky kategórie</option>
              ${categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)} (${items.filter((item) => item.categoryId === category.id).length})</option>`).join("")}
            </select>
          </label>
        ` : ""}
        <div class="overview-manager__list" id="overview-manager-list"></div>
      </div>
    </div>
  `;

  const listEl = document.getElementById("overview-manager-list");
  const filterEl = document.getElementById("overview-category-filter");

  const renderOverviewGroups = (selectedCategoryId = "all") => {
    const filteredItems = selectedCategoryId === "all"
      ? items
      : items.filter((item) => item.categoryId === selectedCategoryId);

    if (!listEl) return;

    if (!filteredItems.length) {
      listEl.innerHTML = `<div class="empty-state empty-state--compact">${escapeHtml(emptyMessage)}</div>`;
      return;
    }

    const filteredCategories = selectedCategoryId === "all"
      ? categories.filter((category) => filteredItems.some((item) => item.categoryId === category.id))
      : categories.filter((category) => category.id === selectedCategoryId);
    const showGroupHeading = filteredCategories.length > 1;

    listEl.innerHTML = filteredCategories.map((category) => {
      const groupItems = filteredItems.filter((item) => item.categoryId === category.id);
      if (!groupItems.length) return "";
      return `
        <section class="overview-group">
          ${showGroupHeading ? `
            <div class="overview-group__head">
              <h4>${escapeHtml(category.name)}</h4>
            </div>
          ` : ""}
          <div class="overview-group__items">
            ${groupItems.map((item) => miniItem(item.name, detailBuilder(item), item.id)).join("")}
          </div>
        </section>
      `;
    }).join("");
  };

  if (filterEl) {
    filterEl.addEventListener("change", () => {
      renderOverviewGroups(filterEl.value);
    });
  }

  renderOverviewGroups();
  bindMiniVarietyOpen(listEl);
  openDetailModalDialog();
}

function openCategoryManager(categoryId = null, forcedParentId = "") {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--editor");
  const isMobileEditorShell = document.body.classList.contains("app-mobile-shell");
  const existing = categoryId ? state.categories.find((item) => item.id === categoryId) : null;
  const colorChoices = ["#d45d2c", "#c84136", "#78a24d", "#4f8e4c", "#ea8a2d", "#d2af37", "#4b8f6a", "#7d8c97", "#b06aa0", "#8f806b"];
  const siblingSet = existing ? siblingCategories(existing) : [];
  const siblingIndex = existing ? siblingSet.findIndex((item) => item.id === existing.id) : -1;
  const canMoveUp = siblingIndex > 0;
  const canMoveDown = siblingIndex !== -1 && siblingIndex < siblingSet.length - 1;
  const colorFieldMarkup = isMobileEditorShell
    ? `<input name="color" type="hidden" value="${escapeAttribute(existing?.color || "#7e9f4b")}">`
    : `
            <div class="field-block field-block--full category-manager__field category-manager__field--color">
              <span>Farba orámovania</span>
              <div class="color-picker" id="category-color-picker">
                ${colorChoices.map((color) => `
                  <button
                    class="color-swatch ${String(existing?.color || "#7e9f4b").toLowerCase() === color.toLowerCase() ? "is-active" : ""}"
                    type="button"
                    data-color-choice="${color}"
                    style="--swatch:${escapeAttribute(color)}"
                    aria-label="Vybrať farbu ${escapeAttribute(color)}"
                    title="${escapeAttribute(color)}"
                  ></button>
                `).join("")}
                <label class="color-picker__custom" title="Vlastná farba">
                  <span>Vlastná</span>
                  <input name="color" type="color" value="${escapeAttribute(existing?.color || "#7e9f4b")}">
                </label>
              </div>
            </div>
          `;

  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide detail-copy--editor category-manager">
        <div class="detail-copy__headline">
          <h3>${existing ? escapeHtml(existing.name) : "Pridať novú kategóriu"}</h3>
          <div class="detail-copy__actions">
            <button class="button" type="submit" form="category-form" id="save-category">${existing ? "Uložiť kategóriu" : "Vytvoriť kategóriu"}</button>
          </div>
        </div>
        <form class="detail-form detail-form--editor" id="category-form">
          <div class="detail-grid category-manager__grid">
            <label class="field-block category-manager__field category-manager__field--name">
              <span>Názov kategórie</span>
              <input name="name" type="text" value="${escapeAttribute(existing?.name || "")}" placeholder="Názov kategórie, napríklad Hrach" required>
            </label>
            <label class="field-block category-manager__field category-manager__field--type">
              <span>Typ kategórie</span>
              <select name="nodeType">${nodeTypeOptions(existing?.nodeType || (forcedParentId ? "kind" : "parent"))}</select>
            </label>
            <label class="field-block category-manager__field category-manager__field--parent">
              <span>Nadradená kategória</span>
              <select name="parentCategoryId">${parentCategoryOptions(existing?.parentCategoryId || forcedParentId || "", existing?.id || "")}</select>
            </label>
            <label class="field-block category-manager__field category-manager__field--recommended">
              <span>Odporúčaný výsev</span>
              <input name="recommendedSowingWindow" type="text" value="${escapeAttribute(existing?.recommendedSowingWindow || "")}" placeholder="Napríklad február - marec">
            </label>
            ${existing ? `
              <div class="field-block field-block--full category-manager__order-field category-manager__field category-manager__field--order">
                <span>Poradie v rovnakej vetve</span>
                <div class="catalog-card__actions category-order-actions">
                  <button class="button button--soft button--icon" type="button" id="move-category-up" aria-label="Posunúť kategóriu vyššie v poradí" title="${canMoveUp ? "Vyššie v poradí" : "Táto kategória je už prvá v poradí"}" ${canMoveUp ? "" : "disabled"}>&#8593;</button>
                  <button class="button button--soft button--icon" type="button" id="move-category-down" aria-label="Posunúť kategóriu nižšie v poradí" title="${canMoveDown ? "Nižšie v poradí" : "Táto kategória je už posledná v poradí"}" ${canMoveDown ? "" : "disabled"}>&#8595;</button>
                </div>
                <p class="category-order-actions__hint">Šípky menia len poradie v rámci rovnakej nadradenej kategórie.</p>
              </div>
            ` : ""}
            ${colorFieldMarkup}
            <div class="field-block category-manager__field category-manager__field--image">
              <span>Profilová fotka kategórie</span>
              <input name="imageFile" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}">
              <div class="category-manager__image-actions">
                <button class="button button--ghost button--tiny" type="button" id="clear-category-image" ${existing?.image ? "" : "hidden"}>Vymazať obrázok</button>
              </div>
            </div>
            <div class="field-block category-manager__preview-field category-manager__field category-manager__field--preview">
              <span>Náhľad kategórie</span>
              <div class="category-manager__preview-shell">
                <div class="category-preview" id="category-preview" style="--category-accent:${escapeAttribute(existing?.color || "#7e9f4b")}">
                  ${existing?.image ? `<img src="${escapeAttribute(existing.image)}" alt="${escapeHtml(existing.name || "Kategória")}">` : `<span>${escapeHtml((existing?.name || "K").slice(0, 1))}</span>`}
                </div>
              </div>
            </div>
            <label class="field-block category-manager__field category-manager__field--notes">
              <span>Poznámky ku kategórii</span>
              <textarea name="notes" rows="5" placeholder="Všeobecné poznámky ku kategórii, napríklad kedy sadiť, či chce chlad, čo sa osvedčilo...">${escapeHtml(existing?.notes || "")}</textarea>
            </label>
          </div>
          ${existing && !ALWAYS_PROTECTED_CATEGORY_IDS.includes(existing.id) ? `
            <div class="danger-zone">
              <button class="button button--danger button--danger-muted" type="button" id="delete-category">Vymazať kategóriu</button>
            </div>
          ` : ""}
        </form>
      </div>
    </div>
    `;

  const categoryForm = document.getElementById("category-form");
  const colorInput = categoryForm.querySelector('input[name="color"]');
  const imageInput = categoryForm.querySelector('input[name="imageFile"]');
  const nameInput = categoryForm.querySelector('input[name="name"]');
  const preview = document.getElementById("category-preview");
  const clearImageButton = document.getElementById("clear-category-image");

  const renderCategoryPreview = (image = "", altText = "") => {
    if (image) {
      preview.innerHTML = `<img src="${escapeAttribute(image)}" alt="${escapeHtml(altText || nameInput.value || "Kategoria")}">`;
      if (clearImageButton) clearImageButton.hidden = false;
      return;
    }

    preview.innerHTML = `<span>${escapeHtml((nameInput.value || "K").slice(0, 1))}</span>`;
    if (clearImageButton) clearImageButton.hidden = true;
  };

  categoryForm.addEventListener("keydown", (event) => {
    const tagName = event.target?.tagName;
    const isEditable = tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
    if (isEditable && (event.key === "Backspace" || event.key === "Delete")) {
      event.stopPropagation();
    }
  });

  colorInput.addEventListener("input", () => {
    preview.style.setProperty("--category-accent", colorInput.value);
    categoryForm.querySelectorAll("[data-color-choice]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.colorChoice?.toLowerCase() === colorInput.value.toLowerCase());
    });
  });

  categoryForm.querySelectorAll("[data-color-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      colorInput.value = button.dataset.colorChoice || "#7e9f4b";
      colorInput.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  nameInput.addEventListener("input", () => {
    if (!preview.querySelector("img")) {
      renderCategoryPreview("");
    }
  });

  imageInput.addEventListener("change", async () => {
    const file = imageInput.files?.[0];
    if (!file) return;
    const dataUrl = await fileToOptimizedDataUrl(file, 720, 0.68);
    preview.dataset.uploaded = dataUrl;
    delete preview.dataset.removed;
    renderCategoryPreview(dataUrl, nameInput.value || "Kategoria");
  });

  if (clearImageButton) {
    clearImageButton.addEventListener("click", () => {
      preview.dataset.uploaded = "";
      preview.dataset.removed = "true";
      imageInput.value = "";
      renderCategoryPreview("");
    });
  }

  const saveCategory = () => {
    const name = String(nameInput.value || "").trim();
    if (!name) {
      nameInput.focus();
      return;
    }
    const form = new FormData(categoryForm);
    const color = String(form.get("color") || "#7e9f4b");
    const image = preview.dataset.removed === "true" ? "" : (preview.dataset.uploaded || existing?.image || "");
    const categoryIdForValidation = existing?.id || makeId("cat");
    let parentCategoryId = String(form.get("parentCategoryId") || "");
    let nodeType = String(form.get("nodeType") || "kind");

    const structureDefault = STRUCTURE_CATEGORY_DEFAULTS.get(categoryIdForValidation);
    if (structureDefault) {
      parentCategoryId = structureDefault.parentCategoryId;
      nodeType = structureDefault.nodeType;
    }

    if (wouldCreateCategoryCycle(categoryIdForValidation, parentCategoryId)) {
      alert("Táto nadradená kategória by vytvorila cyklus. Vyber inú nadradenú kategóriu.");
      return;
    }

    const parentCategory = state.categories.find((item) => item.id === parentCategoryId) || null;
    const group = structureDefault
      ? structureDefault.group
      : nodeType === "parent"
        ? name
        : (parentCategory?.name || existing?.group || "Moje kategórie");
    const previousCategories = clone(state.categories);
    const previousActiveCategoryId = activeCategoryId;

    if (existing) {
      existing.name = name;
      existing.group = group;
      existing.parentCategoryId = parentCategoryId;
      existing.nodeType = nodeType;
      existing.recommendedSowingWindow = String(form.get("recommendedSowingWindow") || "").trim();
      existing.notes = String(form.get("notes") || "").trim();
      existing.color = color;
      existing.image = image;
    } else {
      const created = {
        id: categoryIdForValidation,
        name,
        group,
        parentCategoryId,
        nodeType,
        recommendedSowingWindow: String(form.get("recommendedSowingWindow") || "").trim(),
        sowedAt: existing?.sowedAt || "",
        notes: String(form.get("notes") || "").trim(),
        order: state.categories.length,
        color,
        image
      };
      state.categories.push(created);
      activeCategoryId = created.id;
    }

    state.categories = sanitizeCategoryHierarchy(state.categories);

    if (!persist()) {
      state.categories = previousCategories;
      activeCategoryId = previousActiveCategoryId;
      return;
    }
    render();
    detailModal.close();
  };

  categoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCategory();
  });

  if (existing) {
    const moveUpButton = document.getElementById("move-category-up");
    const moveDownButton = document.getElementById("move-category-down");
    const deleteCategoryButton = document.getElementById("delete-category");
    if (moveUpButton) {
      moveUpButton.addEventListener("click", () => moveCategory(existing.id, -1));
    }
    if (moveDownButton) {
      moveDownButton.addEventListener("click", () => moveCategory(existing.id, 1));
    }
    if (deleteCategoryButton) {
      deleteCategoryButton.addEventListener("click", () => {
        deleteCategory(existing.id);
        detailModal.close();
      });
    }
  }

  openDetailModalDialog();
}

function openVarietyEditor(varietyId = null, forcedCategoryId = null, forcedEntryKind = "detail") {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--editor");
  const existing = varietyId ? state.varieties.find((item) => item.id === varietyId) : null;
  const currentEntryKind = existing ? entryKind(existing) : forcedEntryKind;
  const isMobileShell = typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell");
  const showMobileAddTypeBar = !existing && currentEntryKind === "detail" && isMobileShell;
  const categoryId = forcedCategoryId || existing?.categoryId || activeCategoryId;
  const selectedPlaces = normalizePlaceList(existing?.places?.length ? existing.places : existing?.place);
  const selectedStatuses = varietyStatusValues(existing);
  let draftImages = normalizeVarietyImages(existing);
  let activeImageIndex = 0;
  let draggedImageIndex = null;

  detailContent.innerHTML = `
    ${showMobileAddTypeBar ? mobileAddCardTypeBarMarkup("variety") : ""}
    <div class="detail-layout detail-layout--editor">
      <div class="detail-image detail-image--editor">
        <button class="gallery-nav gallery-nav--prev" id="gallery-prev" type="button" aria-label="Predchádzajúca fotka">&#8249;</button>
        <img id="variety-preview" src="${escapeAttribute(primaryVarietyImage(existing || { cardType: "variety" }))}" alt="${escapeAttribute(entryDisplayName(existing) || "Nový záznam")}">
        <button class="gallery-nav gallery-nav--next" id="gallery-next" type="button" aria-label="Ďalšia fotka">&#8250;</button>
        <div class="detail-image__count" id="gallery-count"></div>
      </div>
      <div class="detail-copy detail-copy--wide detail-copy--editor">
        <div class="detail-copy__headline">
          <h3>${existing ? escapeHtml(entryDisplayName(existing)) : currentEntryKind === "detail" ? "Pridať odrodu" : currentEntryKind === "quick" ? "Pridať rýchly záznam" : "Pridať galériu"}</h3>
          <div class="detail-copy__actions">
            <button class="button" type="submit" form="variety-form">${existing ? "Uložiť" : currentEntryKind === "detail" ? "Pridať odrodu" : currentEntryKind === "quick" ? "Pridať rýchly záznam" : "Pridať galériu"}</button>
          </div>
        </div>
        ${currentEntryKind === "detail" && !showMobileAddTypeBar ? `
          <div class="entry-mode-switch entry-mode-switch--cards" id="card-type-switch">
            ${cardTypeOptionsMarkup("variety")}
          </div>
        ` : ""}
        <form class="detail-form detail-form--editor" id="variety-form">
          <div class="detail-grid">
            ${currentEntryKind === "detail" ? `
              <div class="detail-top-row field-block--full">
                <label class="field-block">
                  <span>Názov odrody</span>
                  <input name="name" type="text" value="${escapeAttribute(existing?.name || "")}" placeholder="Názov odrody" required>
                </label>
                <div class="field-block field-block--f1-inline">
                  <label class="choice-chip choice-chip--toggle-inline">
                    <input type="checkbox" name="breedingHybrid" value="hybrid" ${inferBreedingType(existing) === "hybrid" ? "checked" : ""}>
                    <span>F1</span>
                  </label>
                </div>
                <label class="field-block">
                  <span>Kategória</span>
                  <select name="categoryId" required>${categoryOptions(categoryId)}</select>
                </label>
              </div>
              <div class="field-block field-block--full">
                <span>Kde sa pestuje</span>
                <div class="choice-group choice-group--places">
                  ${placeChoiceOptions(selectedPlaces)}
                </div>
              </div>
              <div class="field-block field-block--full">
                <span>Stav</span>
                <div class="choice-group choice-group--status" id="variety-status">
                  ${choiceChipOptions("statusValues", [
                    { value: "planned", label: "Plánujem" },
                    { value: "sown", label: "Vysiate" },
                    { value: "transplanted", label: "Vysadené" },
                    { value: "harvested", label: "Zber" }
                  ], selectedStatuses)}
                </div>
                <div class="status-date-row">
                  <label class="status-date-row__field status-date-row__field--date" id="status-date-field-sown">
                    <span>Vysiate kedy</span>
                    ${renderDateInput({ id: "variety-sowed-at", name: "sowedAt", value: existing?.sowedAt || "" })}
                  </label>
                  <label class="status-date-row__field status-date-row__field--date" id="status-date-field-transplanted">
                    <span>Vysadené kedy</span>
                    ${renderDateInput({ id: "variety-transplanted-at", name: "transplantedAt", value: existing?.transplantedAt || "" })}
                  </label>
                  <label class="status-date-row__field status-date-row__field--date" id="status-date-field-harvested">
                    <span>Zberané kedy</span>
                    ${renderDateInput({ id: "variety-harvested-at", name: "harvestedAt", value: existing?.harvestedAt || "" })}
                  </label>
                </div>
              </div>
              <div class="field-block"><span>Ranking</span>${renderRatingPicker(existing?.rating || 0)}</div>
              <div class="field-block field-block--full">
                <span>Označenia</span>
                <div class="choice-group choice-group--compact-meta">
                  <label class="choice-chip">
                    <input name="top" type="checkbox" ${existing?.top ? "checked" : ""}>
                    <span>Toto je top odroda</span>
                  </label>
                  <label class="choice-chip">
                    <input name="notGrowingThisYear" type="checkbox" ${existing?.notGrowingThisYear ? "checked" : ""}>
                    <span>Nepestujem tento rok</span>
                  </label>
                  <label class="choice-chip">
                    <input name="avoidNextYear" type="checkbox" ${existing?.avoidNextYear ? "checked" : ""}>
                    <span>Neodporúčam</span>
                  </label>
                  <label class="choice-chip">
                    <input name="neverGrown" type="checkbox" ${existing?.neverGrown ? "checked" : ""}>
                    <span>Ešte som nepestovala</span>
                  </label>
                </div>
              </div>
            ` : `
              <label class="field-block"><span>${currentEntryKind === "quick" ? "Názov záznamu" : "Názov galérie"}</span><input name="name" type="text" value="${escapeAttribute(existing?.name || "")}" placeholder="${currentEntryKind === "quick" ? "Napríklad žltá skalnička pri plote" : "Napríklad Lúčne kvety"}"></label>
              <label class="field-block"><span>Kategória</span><select name="categoryId" required>${categoryOptions(categoryId)}</select></label>
              <label class="field-block field-block--full">
                <span>${currentEntryKind === "quick" ? "Dátum záznamu" : "Dátum albumu"}</span>
                ${renderDateInput({ id: "variety-sowed-at", name: "sowedAt", value: existing?.sowedAt || "" })}
              </label>
            `}
          </div>
          <label class="field-block field-block--full">
            <span>${currentEntryKind === "detail" ? "Poznámky a postrehy" : "Poznámka"}</span>
            <textarea class="detail-editor__notes" name="notes" rows="3" placeholder="${currentEntryKind === "detail" ? "Poznámky: chuť, rodivosť, čo jej sadlo, či ju chceš znova..." : currentEntryKind === "quick" ? "Krátky popis, kde rastie alebo čo si chceš zapamätať..." : "Voliteľný popis galérie..."}">${escapeHtml(existing?.notes || "")}</textarea>
          </label>
          <label class="upload-field upload-field--compact">
            <input name="imageFile" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}" multiple>
          </label>
          <div class="editor-gallery" id="variety-gallery-editor"></div>
          ${existing ? `
            <div class="danger-zone">
              <button class="button button--danger button--danger-muted" type="button" id="delete-variety">${currentEntryKind === "detail" ? "Vymazať odrodu" : currentEntryKind === "quick" ? "Vymazať záznam" : "Vymazať galériu"}</button>
            </div>
          ` : ""}
        </form>
      </div>
    </div>
  `;

  const imageInput = document.querySelector('input[name="imageFile"]');
  const preview = document.getElementById("variety-preview");
  const gallery = document.getElementById("variety-gallery-editor");
  const previousImageButton = document.getElementById("gallery-prev");
  const nextImageButton = document.getElementById("gallery-next");
  const galleryCount = document.getElementById("gallery-count");
  const statusInputs = [...document.querySelectorAll('#variety-form input[name="statusValues"]')];
  const statusDateFields = {
    sown: document.getElementById("status-date-field-sown"),
    transplanted: document.getElementById("status-date-field-transplanted"),
    harvested: document.getElementById("status-date-field-harvested")
  };
  const ratingPicker = document.querySelector("[data-rating-picker]");
  const ratingInput = ratingPicker?.querySelector('input[name="rating"]') || null;

  const syncStatusDateField = () => {
    const selectedStatusSet = new Set(statusInputs.filter((input) => input.checked).map((input) => String(input.value || "").trim()));
    Object.entries(statusDateFields).forEach(([statusKey, field]) => {
      if (!field) return;
      field.hidden = !selectedStatusSet.has(statusKey);
    });
  };

  const syncRatingPicker = () => {
    if (!ratingPicker || !ratingInput) return;
    const currentRating = Math.max(0, Math.min(5, Number(ratingInput.value) || 0));
    ratingPicker.querySelectorAll("[data-rating-value]").forEach((button) => {
      const buttonValue = Number(button.getAttribute("data-rating-value") || 0);
      button.classList.toggle("is-active", buttonValue <= currentRating);
    });
  };

  const syncPreview = () => {
    if (!draftImages.length) {
      activeImageIndex = 0;
      preview.src = cardPlaceholderImage("variety");
      previousImageButton.hidden = true;
      nextImageButton.hidden = true;
      galleryCount.hidden = true;
      syncDetailEditorImagePresentation(preview);
      return;
    }

    activeImageIndex = Math.max(0, Math.min(activeImageIndex, draftImages.length - 1));
    preview.src = draftImages[activeImageIndex];
    preview.alt = `Fotka ${activeImageIndex + 1} záznamu ${entryDisplayName(existing) || "Nový záznam"}`;
    previousImageButton.hidden = draftImages.length < 2;
    nextImageButton.hidden = draftImages.length < 2;
    galleryCount.hidden = false;
    galleryCount.textContent = `${activeImageIndex + 1}/${draftImages.length}`;
    syncDetailEditorImagePresentation(preview);
  };

  const moveDraftImage = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= draftImages.length || toIndex >= draftImages.length) return;
    const activeImage = draftImages[activeImageIndex] || "";
    const [movedImage] = draftImages.splice(fromIndex, 1);
    draftImages.splice(toIndex, 0, movedImage);
    const newActiveIndex = draftImages.indexOf(activeImage);
    activeImageIndex = newActiveIndex >= 0 ? newActiveIndex : 0;
  };

  const renderVarietyGalleryEditor = () => {
    syncPreview();
    if (!draftImages.length) {
      gallery.hidden = true;
      gallery.innerHTML = "";
      return;
    }

    gallery.hidden = false;
    gallery.innerHTML = draftImages.map((image, index) => `
          <article class="editor-gallery__mini ${index === 0 ? "is-primary" : ""} ${index === activeImageIndex ? "is-active" : ""}" draggable="true" data-drag-image="${index}" data-drop-image="${index}">
            <button class="editor-gallery__select" type="button" data-image-select="${index}" aria-label="Zobraziť fotku ${index + 1}">
              <img class="editor-gallery__thumb" src="${escapeAttribute(image)}" alt="Fotka ${index + 1}">
              ${index === 0 ? '<span class="editor-gallery__main-badge">hlavná</span>' : ""}
            </button>
            <button class="editor-gallery__remove" type="button" data-image-delete="${index}" aria-label="Vymazať fotku">×</button>
          </article>
        `).join("");

    gallery.querySelectorAll("[data-image-select]").forEach((button) => {
      button.addEventListener("click", () => {
        activeImageIndex = Number(button.dataset.imageSelect);
        renderVarietyGalleryEditor();
      });

      button.addEventListener("dblclick", () => {
        openImageLightbox(draftImages, Number(button.dataset.imageSelect), entryDisplayName(existing) || "Fotka");
      });
    });

    gallery.querySelectorAll("[data-image-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const deleteIndex = Number(button.dataset.imageDelete);
        draftImages = draftImages.filter((_, index) => index !== deleteIndex);
        if (activeImageIndex >= draftImages.length) activeImageIndex = Math.max(0, draftImages.length - 1);
        renderVarietyGalleryEditor();
      });
    });

    gallery.querySelectorAll("[data-drag-image]").forEach((item) => {
      item.addEventListener("dragstart", () => {
        draggedImageIndex = Number(item.dataset.dragImage);
        item.classList.add("is-dragging");
      });

      item.addEventListener("dragend", () => {
        draggedImageIndex = null;
        item.classList.remove("is-dragging");
        gallery.querySelectorAll(".editor-gallery__mini").forEach((thumb) => thumb.classList.remove("is-drop-target"));
      });

      item.addEventListener("dragover", (event) => {
        event.preventDefault();
        item.classList.add("is-drop-target");
      });

      item.addEventListener("dragleave", () => {
        item.classList.remove("is-drop-target");
      });

      item.addEventListener("drop", (event) => {
        event.preventDefault();
        item.classList.remove("is-drop-target");
        const dropIndex = Number(item.dataset.dropImage);
        if (draggedImageIndex === null) return;
        moveDraftImage(draggedImageIndex, dropIndex);
        renderVarietyGalleryEditor();
      });
    });
  };

  renderVarietyGalleryEditor();
  if (currentEntryKind === "detail") {
    syncStatusDateField();
    syncRatingPicker();
  }

  statusInputs.forEach((input) => {
    input.addEventListener("change", syncStatusDateField);
  });

  ratingPicker?.querySelectorAll("[data-rating-value]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!ratingInput) return;
      const nextValue = Number(button.getAttribute("data-rating-value") || 0);
      const currentValue = Math.max(0, Math.min(5, Number(ratingInput.value) || 0));
      ratingInput.value = String(currentValue === nextValue ? 0 : nextValue);
      syncRatingPicker();
    });
  });

  previousImageButton.addEventListener("click", () => {
    if (draftImages.length < 2) return;
    activeImageIndex = (activeImageIndex - 1 + draftImages.length) % draftImages.length;
    renderVarietyGalleryEditor();
  });

  nextImageButton.addEventListener("click", () => {
    if (draftImages.length < 2) return;
    activeImageIndex = (activeImageIndex + 1) % draftImages.length;
    renderVarietyGalleryEditor();
  });

  imageInput.addEventListener("change", async () => {
    const files = Array.from(imageInput.files || []);
    if (!files.length) return;
    const imageMaxDimension = currentEntryKind === "gallery" ? 900 : currentEntryKind === "quick" ? 1100 : 1400;
    const uploaded = await Promise.all(files.map((file) => fileToOptimizedDataUrl(file, imageMaxDimension)));
    draftImages = [...draftImages, ...uploaded.filter(Boolean)];
    activeImageIndex = draftImages.length ? Math.min(activeImageIndex, draftImages.length - 1) : 0;
    imageInput.value = "";
    renderVarietyGalleryEditor();
  });

  detailContent.querySelectorAll("[data-card-type]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedType = button.dataset.cardType || "variety";
      if (selectedType === "variety") return;
      const currentCategoryId = String(document.getElementById("variety-form")?.elements?.categoryId?.value || categoryId || "").trim();
      const targetCategoryId = resolvePreferredCategoryIdForCardType(selectedType, currentCategoryId) || FALLBACK_CATEGORY_ID;
      openUniversalCardEditor(selectedType, null, targetCategoryId);
    });
  });

  preview.addEventListener("click", () => {
    if (!draftImages.length) return;
    openImageLightbox(draftImages, activeImageIndex, entryDisplayName(existing) || "Fotka");
  });

  detailModal.onkeydown = null;

  document.getElementById("variety-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const places = normalizePlaceList(form.getAll("places"));
    const rawStatusValues = normalizeStatusList(form.getAll("statusValues"));
    const currentViewCategoryId = activeCategoryId;
    const sowedAt = currentEntryKind === "detail" && rawStatusValues.includes("sown") ? String(form.get("sowedAt") || "") : "";
    const transplantedAt = currentEntryKind === "detail" && rawStatusValues.includes("transplanted") ? String(form.get("transplantedAt") || "") : "";
    const harvestedAt = currentEntryKind === "detail" && rawStatusValues.includes("harvested") ? String(form.get("harvestedAt") || "") : "";
    const statusValues = currentEntryKind === "detail"
      ? finalizeVarietyStatusValues(rawStatusValues, { sowedAt, transplantedAt, harvestedAt })
      : [];
    const basePayload = {
      entryKind: currentEntryKind,
      categoryId: String(form.get("categoryId") || categoryId),
      name: String(form.get("name") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
      images: draftImages.slice(),
      image: draftImages[0] || cardPlaceholderImage("variety"),
      sowedAt
    };
    const payload = {
      ...basePayload,
      type: currentEntryKind === "detail" ? String(existing?.type || "").trim() : "",
      breedingType: currentEntryKind === "detail"
        ? (form.get("breedingHybrid") ? "hybrid" : "open")
        : "",
      sowingWindow: existing?.sowingWindow || "",
      sowingWindowAuto: existing?.sowingWindowAuto || false,
      transplantedAt,
      harvestedAt,
      statusValues,
      status: currentEntryKind === "detail" ? primaryStatusValue(statusValues) : "",
      place: currentEntryKind === "detail" ? places[0] || "" : "",
      places: currentEntryKind === "detail" ? places : [],
      rating: currentEntryKind === "detail" ? Number(form.get("rating") || 0) : 0,
      top: currentEntryKind === "detail" ? form.get("top") === "on" : false,
      notGrowingThisYear: currentEntryKind === "detail" ? form.get("notGrowingThisYear") === "on" : false,
      avoidNextYear: currentEntryKind === "detail" ? form.get("avoidNextYear") === "on" : false,
      neverGrown: currentEntryKind === "detail" ? form.get("neverGrown") === "on" : false
    };

    if (currentEntryKind === "detail" && !payload.name) return;

    if (existing) {
      Object.assign(existing, payload);
    } else {
      state.varieties.unshift({ id: makeId("var"), ...payload });
    }

    activeCategoryId = currentViewCategoryId;
    if (!persist()) return;
    render();
    detailModal.close();
  });

  if (existing) {
    document.getElementById("delete-variety").addEventListener("click", () => {
      setUndoState({
        type: "variety",
        variety: clone(existing)
      });
      state.varieties = state.varieties.filter((item) => item.id !== existing.id);
      if (!persist()) return;
      render();
      detailModal.close();
    });
  }

  openDetailModalDialog();
}

function openBatchSowingManager(categoryId = activeCategoryId) {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--batch", "detail-modal--editor");
  const sourceCategories = orderedCategories().filter((item) => (
    item.nodeType !== "parent" &&
    varietiesInCategoryTree(item.id).some(isDetailEntry)
  ));
  const initialSourceCategoryId = sourceCategories.some((item) => item.id === categoryId)
    ? categoryId
    : sourceCategories[0]?.id;

  if (!initialSourceCategoryId) {
    alert("Zatiaľ nemáš žiadne odrody na hromadný výsev.");
    return;
  }

  let currentSourceCategoryId = initialSourceCategoryId;
  let currentFilterCategoryId = "all";
  const selectedIds = new Set();

  const sourceCandidates = () => varietiesInCategoryTree(currentSourceCategoryId)
    .filter(isDetailEntry)
    .slice()
    .sort((a, b) => {
      const categoryDiff = categoryName(a.categoryId).localeCompare(categoryName(b.categoryId), "sk");
      if (categoryDiff !== 0) return categoryDiff;
      return a.name.localeCompare(b.name, "sk");
    });

  const sourceCandidateIds = () => new Set(sourceCandidates().map((item) => item.id));
  const visibleCategories = () => {
    const availableCategoryIds = [...new Set(sourceCandidates().map((item) => item.categoryId))];
    return orderedCategories().filter((item) => availableCategoryIds.includes(item.id));
  };
  const filteredCandidates = () => currentFilterCategoryId === "all"
    ? sourceCandidates()
    : sourceCandidates().filter((item) => item.categoryId === currentFilterCategoryId);

  const seedSelectionForSource = () => {
    const nextCandidates = sourceCandidates();
    const nextIds = new Set(nextCandidates.map((item) => item.id));
    selectedIds.clear();
    nextCandidates.forEach((item) => {
      if (Boolean(item.sowedAt) || ["sown", "transplanted", "harvested"].includes(item.status)) {
        selectedIds.add(item.id);
      }
    });
    currentFilterCategoryId = "all";
    return nextIds;
  };

  let candidateIds = seedSelectionForSource();

  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide detail-copy--editor batch-sowing-manager">
        <div class="detail-copy__headline">
          <h3>Hromadný výsev</h3>
          <div class="detail-copy__actions">
            <button class="button" type="submit" form="batch-sowing-form">Uložiť výsev</button>
          </div>
        </div>
        <form class="detail-form detail-form--editor" id="batch-sowing-form">
          <div class="detail-grid batch-sowing-manager__filters">
            <label class="field-block batch-sowing-manager__filter batch-sowing-manager__filter--source">
              <span>Kategória alebo vetva</span>
              <select id="batch-source-category">
                ${sourceCategories.map((item) => `<option value="${item.id}" ${item.id === currentSourceCategoryId ? "selected" : ""}>${escapeHtml(formattedCategoryOptionLabel(item))}</option>`).join("")}
              </select>
            </label>
            <label class="field-block batch-sowing-manager__filter batch-sowing-manager__filter--date">
              <span>Dátum výsevu</span>
              ${renderDateInput({ id: "batch-sowed-at", name: "sowedAt", value: todayISO(), required: true })}
            </label>
            <label class="field-block batch-sowing-manager__filter batch-sowing-manager__filter--category">
              <span>Filtrovať kategóriu</span>
              <select id="batch-category-filter"></select>
            </label>
          </div>
          <section class="batch-sowing-manager__selection-card">
            <div class="batch-sowing-manager__selection-head">
              <p class="batch-sowing__summary" id="batch-sowing-summary"></p>
              <div class="catalog-card__actions batch-sowing__toolbar batch-sowing__toolbar--triple">
                <button class="button button--soft" type="button" id="batch-select-sown">Označ vysiate</button>
                <button class="button button--soft" type="button" id="batch-select-all">Vybrať všetky</button>
                <button class="button button--soft" type="button" id="batch-clear-selection">Vyčistiť výber</button>
              </div>
            </div>
            <div class="batch-sowing__list" id="batch-sowing-list"></div>
          </section>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("batch-sowing-form");
  const sourceSelect = document.getElementById("batch-source-category");
  const filterSelect = document.getElementById("batch-category-filter");
  const list = document.getElementById("batch-sowing-list");
  const summary = document.getElementById("batch-sowing-summary");

  const renderFilterOptions = () => {
    const options = [
      '<option value="all">Všetky kategórie v tejto vetve</option>',
      ...visibleCategories().map((item) => `<option value="${item.id}" ${item.id === currentFilterCategoryId ? "selected" : ""}>${escapeHtml(formattedCategoryOptionLabel(item))} (${sourceCandidates().filter((candidate) => candidate.categoryId === item.id).length})</option>`)
    ];
    filterSelect.innerHTML = options.join("");
    if (![...filterSelect.options].some((option) => option.value === currentFilterCategoryId)) {
      currentFilterCategoryId = "all";
      filterSelect.value = "all";
    }
  };

  const updateSummary = () => {
    const visible = filteredCandidates();
    const currentCandidates = sourceCandidates();
    const selectedVisible = visible.filter((item) => selectedIds.has(item.id)).length;
    const selectedTotal = currentCandidates.filter((item) => selectedIds.has(item.id)).length;
    summary.textContent = `${visible.length} odrôd v zobrazení • ${selectedVisible} označených tu • ${selectedTotal} označených spolu`;
  };

  const renderBatchList = () => {
    const visible = filteredCandidates();
    list.innerHTML = visible.length
      ? visible.map((item) => `
        <label class="batch-sowing__item ${selectedIds.has(item.id) ? "is-selected" : ""}">
            <input class="checkbox-input" type="checkbox" name="varietyIds" value="${item.id}" ${selectedIds.has(item.id) ? "checked" : ""}>
            <span class="batch-sowing__copy">
              <strong>${escapeHtml(item.name)}</strong>
            </span>
          </label>
        `).join("")
      : '<div class="empty-state">V tomto filtri zatiaľ nie sú žiadne odrody.</div>';

    list.querySelectorAll('input[name="varietyIds"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedIds.add(checkbox.value);
        } else {
          selectedIds.delete(checkbox.value);
        }
        updateSummary();
      });
    });

    updateSummary();
  };

  const rerenderSourceView = () => {
    candidateIds = seedSelectionForSource();
    renderFilterOptions();
    renderBatchList();
  };

  const setSelection = (predicate) => {
    filteredCandidates().forEach((item) => {
      if (predicate(item)) {
        selectedIds.add(item.id);
      } else {
        selectedIds.delete(item.id);
      }
    });
    renderBatchList();
  };

  document.getElementById("batch-select-sown").addEventListener("click", () => {
    setSelection((item) => Boolean(item.sowedAt) || ["sown", "transplanted", "harvested"].includes(item.status));
  });

  document.getElementById("batch-select-all").addEventListener("click", () => {
    setSelection(() => true);
  });

  document.getElementById("batch-clear-selection").addEventListener("click", () => {
    setSelection(() => false);
  });

  sourceSelect.addEventListener("change", () => {
    currentSourceCategoryId = sourceSelect.value;
    rerenderSourceView();
  });

  filterSelect.addEventListener("change", () => {
    currentFilterCategoryId = filterSelect.value;
    renderBatchList();
  });

  renderFilterOptions();
  renderBatchList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const sowedAt = String(formData.get("sowedAt") || "");
    if (selectedIds.size && !sowedAt) return;

    state.varieties = state.varieties.map((item) => {
      const isCandidate = candidateIds.has(item.id);
      if (!isCandidate) return item;

      if (!selectedIds.has(item.id)) {
        const clearedStatusValues = finalizeVarietyStatusValues([], { harvestedAt: item.harvestedAt });
        return {
          ...item,
          sowedAt: "",
          transplantedAt: "",
          statusValues: clearedStatusValues,
          status: primaryStatusValue(clearedStatusValues)
        };
      }
      const nextStatus = item.status === "transplanted" || item.status === "harvested"
        ? item.status
        : "sown";
      const nextStatusValues = finalizeVarietyStatusValues([nextStatus], {
        sowedAt,
        transplantedAt: item.transplantedAt,
        harvestedAt: item.harvestedAt
      });
      return {
        ...item,
        sowedAt,
        statusValues: nextStatusValues,
        status: primaryStatusValue(nextStatusValues)
      };
    });

    if (!persist()) return;
    render();
    detailModal.close();
  });

  openDetailModalDialog();
}

function openBatchMoveManager(categoryId = activeCategoryId) {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--batch", "detail-modal--editor");
  const sourceCategories = orderedCategories().filter((item) => (
    item.nodeType !== "parent" &&
    varietiesInCategoryTree(item.id).length
  ));
  const initialSourceCategoryId = sourceCategories.some((item) => item.id === categoryId)
    ? categoryId
    : sourceCategories[0]?.id;

  if (!initialSourceCategoryId) {
    alert("Zatiaľ nemáš žiadnu kategóriu, z ktorej by sa dali karty presúvať.");
    return;
  }

  let currentSourceCategoryId = initialSourceCategoryId;
  const selectedIds = new Set();

  const candidates = () => varietiesInCategoryTree(currentSourceCategoryId)
    .slice()
    .sort((a, b) => entryDisplayName(a).localeCompare(entryDisplayName(b), "sk"));
  const targetCategories = () => orderedCategories().filter((item) => (
    item.nodeType !== "parent" &&
    item.id !== currentSourceCategoryId
  ));
  const candidateIds = () => new Set(candidates().map((item) => item.id));

  const seedSelectionForSource = () => {
    selectedIds.clear();
    candidates().forEach((item) => selectedIds.add(item.id));
  };

  seedSelectionForSource();

  detailContent.innerHTML = `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide detail-copy--editor batch-sowing-manager">
        <div class="detail-copy__headline">
          <h3>Hromadný presun kariet</h3>
          <div class="detail-copy__actions">
            <button class="button" type="submit" form="batch-move-form">Presunúť vybrané</button>
          </div>
        </div>
        <form class="detail-form detail-form--editor" id="batch-move-form">
          <div class="detail-grid batch-sowing-manager__filters">
            <label class="field-block batch-sowing-manager__filter batch-sowing-manager__filter--source">
              <span>Z kategórie</span>
              <select id="batch-move-source" name="sourceCategoryId">
                ${sourceCategories.map((item) => `<option value="${item.id}" ${item.id === currentSourceCategoryId ? "selected" : ""}>${escapeHtml(formattedCategoryOptionLabel(item))}</option>`).join("")}
              </select>
            </label>
            <label class="field-block batch-sowing-manager__filter batch-sowing-manager__filter--target">
              <span>Presunúť do</span>
              <select id="batch-move-target" name="targetCategoryId" required></select>
            </label>
          </div>
          <section class="batch-sowing-manager__selection-card">
            <div class="batch-sowing-manager__selection-head">
              <p class="batch-sowing__summary" id="batch-move-summary"></p>
              <div class="catalog-card__actions batch-sowing__toolbar batch-sowing__toolbar--double">
                <button class="button button--soft" type="button" id="batch-move-select-all">Vybrať všetky</button>
                <button class="button button--soft" type="button" id="batch-move-clear">Vyčistiť výber</button>
              </div>
            </div>
            <div class="batch-sowing__list" id="batch-move-list"></div>
          </section>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("batch-move-form");
  const sourceSelect = document.getElementById("batch-move-source");
  const targetSelect = document.getElementById("batch-move-target");
  const list = document.getElementById("batch-move-list");
  const summary = document.getElementById("batch-move-summary");

  const renderTargetOptions = () => {
    const targets = targetCategories();
    if (!targets.length) {
      targetSelect.innerHTML = "";
      return false;
    }
    targetSelect.innerHTML = targets.map((item) => `<option value="${item.id}">${escapeHtml(formattedCategoryOptionLabel(item))}</option>`).join("");
    return true;
  };

  const updateSummary = () => {
    summary.textContent = `${selectedIds.size} z ${candidates().length} kariet označených na presun`;
  };

  const renderMoveList = () => {
    list.innerHTML = candidates().map((item) => `
      <label class="batch-sowing__item ${selectedIds.has(item.id) ? "is-selected" : ""}">
        <input class="checkbox-input" type="checkbox" name="entryIds" value="${item.id}" ${selectedIds.has(item.id) ? "checked" : ""}>
        <span class="batch-sowing__copy">
          <strong>${escapeHtml(entryDisplayName(item))}</strong>
          <small>${escapeHtml(isDetailEntry(item) ? "detailná karta" : isQuickEntry(item) ? "rýchly záznam" : "galéria")}</small>
        </span>
      </label>
    `).join("");

    list.querySelectorAll('input[name="entryIds"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) selectedIds.add(checkbox.value);
        else selectedIds.delete(checkbox.value);
        renderMoveList();
      });
    });

    updateSummary();
  };

  document.getElementById("batch-move-select-all").addEventListener("click", () => {
    candidates().forEach((item) => selectedIds.add(item.id));
    renderMoveList();
  });

  document.getElementById("batch-move-clear").addEventListener("click", () => {
    selectedIds.clear();
    renderMoveList();
  });

  sourceSelect.addEventListener("change", () => {
    currentSourceCategoryId = sourceSelect.value;
    if (!candidates().length) return;
    seedSelectionForSource();
    if (!renderTargetOptions()) {
      alert("Z tejto kategórie už nie je kam presúvať karty.");
      return;
    }
    renderMoveList();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const targetCategoryId = String(new FormData(form).get("targetCategoryId") || "");
    if (!targetCategoryId || !selectedIds.size) return;

    const movableIds = candidateIds();
    state.varieties = state.varieties.map((item) => (
      movableIds.has(item.id) && selectedIds.has(item.id)
        ? { ...item, categoryId: targetCategoryId }
        : item
    ));

    if (!persist()) return;
    render();
    detailModal.close();
  });

  if (!renderTargetOptions()) {
    alert("Zatiaľ nemáš žiadnu inú kategóriu, kam by sa dali karty presunúť.");
    return;
  }

  renderMoveList();
  openDetailModalDialog();
}

function deleteCategory(categoryId) {
  const deletedCategory = state.categories.find((item) => item.id === categoryId);
  if (!deletedCategory) return;
  if (ALWAYS_PROTECTED_CATEGORY_IDS.includes(categoryId)) return;
  const fallbackCategory = state.categories.find((item) => item.id === FALLBACK_CATEGORY_ID);
  const movedChildCategories = state.categories.filter((item) => item.parentCategoryId === categoryId);
  const movedVarieties = state.varieties.filter((item) => item.categoryId === categoryId);
  const movedTasks = state.customTasks.filter((item) => normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId).includes(categoryId));
  const movedJournal = state.journal.filter((item) => normalizeIdList(item.linkedCategoryIds?.length ? item.linkedCategoryIds : item.linkedCategoryId).includes(categoryId));
  const previousCategories = clone(state.categories);
  const previousVarieties = clone(state.varieties);
  const previousTasks = clone(state.customTasks);
  const previousJournal = clone(state.journal);
  const previousActiveCategoryId = activeCategoryId;

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

  state.categories = ensureRootCategories(state.categories
    .filter((item) => item.id !== categoryId)
    .map((item) => item.parentCategoryId === categoryId
      ? {
          ...item,
          parentCategoryId: item.id === FALLBACK_CATEGORY_ID ? "" : FALLBACK_CATEGORY_ID,
          group: item.id === FALLBACK_CATEGORY_ID ? (item.group || "Iné") : (fallbackCategory?.name || "Nezaradené")
        }
      : item));
  state.varieties = state.varieties.map((item) => item.categoryId === categoryId
    ? { ...item, categoryId: FALLBACK_CATEGORY_ID }
    : item);
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
  activeCategoryId = FALLBACK_CATEGORY_ID;
  if (!persist()) {
    state.categories = previousCategories;
    state.varieties = previousVarieties;
    state.customTasks = previousTasks;
    state.journal = previousJournal;
    activeCategoryId = previousActiveCategoryId;
    return;
  }
  render();
}

function combinedTasks() {
  return [...state.customTasks];
}

function refreshAutoTasks() {
  state.autoTasks = [];
}

function buildAutoTasks(varieties) {
  return [];
}

function bindTaskActions(container) {
  container.querySelectorAll("[data-toggle-task]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = checkbox.dataset.toggleTask;
      const task = state.customTasks.find((item) => item.id === taskId);
      if (!task) return;
      const previousDone = task.done;
      task.done = checkbox.checked;
      if (!persist()) {
        task.done = previousDone;
        checkbox.checked = previousDone;
        return;
      }
      render();
    });
  });

  container.querySelectorAll("[data-delete-task]").forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.dataset.deleteTask;
      state.customTasks = state.customTasks.filter((item) => item.id !== taskId);
      if (!persist()) return;
      render();
    });
  });
}

function renderTaskItem(task, { showDelete = true, labelClickable = true } = {}) {
  const isOverdue = Boolean(!task.done && task.date && task.date < todayISO());
  const chips = taskLinkChips(task);
  const checkboxContent = `
    <input type="checkbox" data-toggle-task="${task.id}" ${task.done ? "checked" : ""}>
    <span class="task-item__title">${escapeHtml(task.text)}</span>
  `;
  return `
    <article class="task-item ${task.done ? "task-item--done" : ""} ${isOverdue ? "task-item--overdue" : ""}">
      <div class="task-item__header">
        ${labelClickable ? `<label class="checkbox-row task-item__main">${checkboxContent}</label>` : `<div class="checkbox-row task-item__main">${checkboxContent}</div>`}
        <div class="task-item__status">
          ${task.done ? '<span class="task-item__done-badge">Hotovo</span>' : ""}
          <span class="task-item__date-badge ${task.done ? "task-item__date-badge--done" : ""} ${isOverdue ? "task-item__date-badge--overdue" : ""}">${task.date ? formatDate(task.date) : "bez termínu"}</span>
        </div>
        <div class="task-item__side task-item__actions">
          ${showDelete ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" data-delete-task="${task.id}" aria-label="Vymazať úlohu" title="Vymazať">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M8 7l1 12h6l1-12"></path>
              <path d="M10 10v6"></path>
              <path d="M14 10v6"></path>
            </svg>
          </button>` : ""}
        </div>
      </div>
      ${chips.length ? `<div class="journal-item__chips">${chips.map(renderJournalChip).join("")}</div>` : ""}
      ${!chips.length && taskLinkSummary(task) ? `<p class="task-item__meta">${escapeHtml(taskLinkSummary(task))}</p>` : ""}
    </article>
  `;
}

function filteredVarietiesForCurrentCategory() {
  const rank = (item) => {
    if (isGalleryEntry(item)) return 0;
    if (isQuickEntry(item)) return 1;
    return 2;
  };

  return varietiesInCategory(activeCategoryId)
    .slice()
    .sort((a, b) => rank(a) - rank(b) || entryDisplayName(a).localeCompare(entryDisplayName(b), "sk", { sensitivity: "base" }));
}

function currentCategory() {
  return state.categories.find((item) => item.id === activeCategoryId) || null;
}

function categorySummary(categoryId) {
  const descendantIds = collectDescendantCategoryIds(categoryId);
  const varieties = state.varieties.filter((item) => descendantIds.includes(item.categoryId));
  const sown = varieties.filter((item) => item.sowedAt).length;
  const planned = varieties.filter((item) => !item.sowedAt && (!item.status || item.status === "planned")).length;
  if (!varieties.length) return "zatiaľ prázdne";
  return `${varieties.length} odrôd • ${sown} vysiate • ${planned} čaká`;
}

function collectDescendantCategoryIds(categoryId) {
  const ids = [];
  const stack = [categoryId];
  const visited = new Set();
  while (stack.length) {
    const currentId = stack.pop();
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    const children = state.categories.filter((item) => item.parentCategoryId === currentId);
    children.forEach((child) => {
      if (visited.has(child.id)) return;
      ids.push(child.id);
      stack.push(child.id);
    });
  }
  return ids;
}

function varietiesInCategory(categoryId) {
  return state.varieties.filter((item) => item.categoryId === categoryId);
}

function varietiesInCategoryTree(categoryId) {
  const categoryIds = new Set([categoryId, ...collectDescendantCategoryIds(categoryId)]);
  return state.varieties.filter((item) => categoryIds.has(item.categoryId));
}

function categoryVarietyCountLabel(categoryId) {
  const count = varietiesInCategoryTree(categoryId).length;
  if (count === 1) return "1 položka";
  if (count >= 2 && count <= 4) return `${count} položky`;
  return `${count} položiek`;
}

function inheritedCategoryValue(categoryId, field) {
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

function categoryDisplayNotes(categoryId) {
  return inheritedCategoryValue(categoryId, "notes");
}

function categoryDisplaySowingWindow(categoryId) {
  return inheritedCategoryValue(categoryId, "recommendedSowingWindow");
}

function countedLabel(count, one, few, many) {
  if (count === 1) return `1 ${one}`;
  if (count >= 2 && count <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
}

function worklogSummaryText(taskCount = state.customTasks.length, journalCount = state.journal.length) {
  return `${countedLabel(taskCount, "úloha", "úlohy", "úloh")} • ${countedLabel(journalCount, "zápis", "zápisy", "zápisov")}`;
}

function resetDetailModalClasses() {
  detailModal.classList.remove("detail-modal--worklog", "detail-modal--overview", "detail-modal--batch", "detail-modal--weather", "detail-modal--editor", "detail-modal--settings");
}

function orderedCategories() {
  const sortSiblings = (items) => [...items].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "sk"));
  const categoriesByParent = state.categories.reduce((map, item) => {
    const parentId = item.parentCategoryId || "";
    if (!map.has(parentId)) map.set(parentId, []);
    map.get(parentId).push(item);
    return map;
  }, new Map());

  const ordered = [];
  const visited = new Set();

  const walk = (parentId = "") => {
    const siblings = sortSiblings(categoriesByParent.get(parentId) || []);
    siblings.forEach((item) => {
      if (visited.has(item.id)) return;
      visited.add(item.id);
      ordered.push(item);
      walk(item.id);
    });
  };

  walk("");

  sortSiblings(state.categories).forEach((item) => {
    if (visited.has(item.id)) return;
    visited.add(item.id);
    ordered.push(item);
    walk(item.id);
  });

  return ordered;
}

function groupedCategories() {
  const categories = orderedCategories();
  return categories
    .filter((item) => !item.parentCategoryId && (item.nodeType === "parent" || item.id === FALLBACK_CATEGORY_ID))
    .map((root) => ({
      root,
      children: categories.filter((item) => item.parentCategoryId === root.id)
    }));
}

function childCategoriesOf(categoryId) {
  return orderedCategories().filter((item) => item.parentCategoryId === categoryId);
}

function isCategoryCompatibleWithCardType(cardTypeValue, categoryId) {
  const resolvedCategoryId = String(categoryId || "").trim();
  if (!resolvedCategoryId || resolvedCategoryId === FALLBACK_CATEGORY_ID) return false;
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
  const categoryExists = (categoryId) => state.categories.some((item) => item.id === categoryId);
  const current = currentCategory();

  if (isFocusedView && current && isCategoryCompatibleWithCardType("variety", current.id)) {
    return current.id;
  }

  return ["cat-uzitkove", "root-plodova", "root-okrasne"].find((id) => categoryExists(id)) || FALLBACK_CATEGORY_ID;
}

function resolveQuickAddVarietyCategoryId() {
  const category = currentCategory();
  if (!isFocusedView || !category) return resolveDefaultVarietyCategoryId();
  if (ROOT_CATEGORY_IDS.includes(category.id)) return resolveDefaultVarietyCategoryId();
  const children = childCategoriesOf(category.id);
  if (!children.length) return category.id;
  if (category.nodeType !== "parent") return category.id;

  const firstChild = children.find((item) => item.nodeType !== "parent");
  if (firstChild) return firstChild.id;

  return resolveDefaultVarietyCategoryId();
}

function resolvePreferredCardTypeForCategory(categoryId) {
  const resolvedCategoryId = String(categoryId || "").trim();
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

function openContextualCardEditor(categoryId = null, forcedEntryKind = "detail") {
  const targetCategoryId = String(categoryId || resolveQuickAddVarietyCategoryId() || FALLBACK_CATEGORY_ID).trim() || FALLBACK_CATEGORY_ID;
  const preferredCardType = resolvePreferredCardTypeForCategory(targetCategoryId);
  const resolvedCategoryId = resolvePreferredCategoryIdForCardType(preferredCardType, targetCategoryId);

  if (preferredCardType === "variety") {
    openVarietyEditor(null, resolvedCategoryId, forcedEntryKind);
    return;
  }

  openUniversalCardEditor(preferredCardType, null, resolvedCategoryId);
}

function resolveDefaultUniversalCardCategoryId(cardTypeValue) {
  const birdBranchId = state.categories.some((item) => item.id === "cat-vtaky") ? "cat-vtaky" : "cat-zvierata";
  const configs = {
    mushroom: {
      branchId: "cat-huby",
      defaultIds: ["cat-huby"]
    },
    "wild-plant": {
      branchId: "cat-divoke-rastliny",
      defaultIds: ["cat-divoke-rastliny"]
    },
    bird: {
      branchId: birdBranchId,
      defaultIds: ["cat-vtaky", "cat-zvierata"]
    },
    insect: {
      branchId: "cat-hmyz",
      defaultIds: ["cat-hmyz"]
    },
    "pest-problem": {
      branchId: "cat-skodcovia-problemy",
      defaultIds: ["cat-skodcovia-problemy"]
    },
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

  if (isFocusedView && current && current.id !== FALLBACK_CATEGORY_ID) {
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
  if (cardTypeValue === "bird" && state.categories.some((item) => item.id === "cat-vtaky")) {
    if (resolvedCurrentCategoryId === "cat-zvierata") {
      return "cat-vtaky";
    }
    const currentCategory = state.categories.find((item) => item.id === resolvedCurrentCategoryId);
    if (currentCategory) {
      const lineage = new Set([currentCategory.id, ...categoryAncestorIds(currentCategory)]);
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

function universalCardTitle(cardTypeValue) {
  const labels = {
    mushroom: "Pridať hubu alebo hríb",
    "wild-plant": "Pridať divokú rastlinu",
    bird: "Pridať vtáka",
    insect: "Pridať hmyz",
    "pest-problem": "Pridať škodcu alebo problém",
    "processing-recipe": "Pridať spracovanie alebo recept"
  };
  return labels[cardTypeValue] || "Pridať kartu";
}

function cardTypeSwitchIcon(cardTypeValue) {
  const icons = {
    variety: ICONS.cardVariety,
    mushroom: ICONS.cardMushroom,
    "wild-plant": ICONS.cardWildPlant,
    bird: ICONS.cardBird,
    insect: ICONS.cardInsect,
    "pest-problem": ICONS.cardPest,
    "processing-recipe": ICONS.cardRecipe
  };
  return icons[String(cardTypeValue || "").trim()] || ICONS.cardVariety;
}

function cardTypeOptionsMarkup(selectedType, { withIcons = false } = {}) {
  return CARD_TYPE_OPTIONS.map((option) => `
    <button
      class="entry-mode-switch__button ${option.value === selectedType ? "is-active" : ""}"
      type="button"
      data-card-type="${escapeAttribute(option.value)}"
      aria-pressed="${option.value === selectedType ? "true" : "false"}"
    >
      ${withIcons ? `
        <span class="entry-mode-switch__button-content">
          <span class="entry-mode-switch__button-icon" aria-hidden="true">${cardTypeSwitchIcon(option.value)}</span>
          <span class="entry-mode-switch__button-label">${escapeHtml(option.label)}</span>
        </span>
      ` : escapeHtml(option.label)}
    </button>
  `).join("");
}

function mobileAddCardTypeBarMarkup(selectedType) {
  return `
    <div class="detail-editor-mobile-switch">
      <div class="entry-mode-switch entry-mode-switch--topbar" data-card-type-switch="mobile-topbar">
        ${cardTypeOptionsMarkup(selectedType, { withIcons: true })}
      </div>
    </div>
  `;
}

function cardCreateLabel(cardTypeValue) {
  const labels = {
    variety: "Pridať odrodu",
    mushroom: "Pridať hubu alebo hríb",
    "wild-plant": "Pridať divokú rastlinu",
    bird: "Pridať vtáka",
    insect: "Pridať hmyz",
    "pest-problem": "Pridať škodcu alebo problém",
    "processing-recipe": "Pridať spracovanie alebo recept"
  };
  return labels[cardTypeValue] || "Pridať kartu";
}

function birdSourceLabel(value) {
  const labels = {
    ebird: "eBird",
    manual: "Ručne"
  };
  return labels[String(value || "").trim()] || "";
}

function birdContactLabel(value) {
  const labels = {
    seen: "Videný",
    heard: "Počutý",
    both: "Videný aj počutý"
  };
  return labels[String(value || "").trim()] || "";
}

function birdConfidenceLabel(value) {
  const labels = {
    certain: "Isté",
    likely: "Pravdepodobné",
    unsure: "Overiť"
  };
  return labels[String(value || "").trim()] || "";
}

function loadEbirdPreferences() {
  try {
    const raw = localStorage.getItem(EBIRD_PREFERENCES_KEY);
    if (!raw) return { apiKey: "" };
    const parsed = JSON.parse(raw);
    return {
      apiKey: String(parsed?.apiKey || "").trim()
    };
  } catch (error) {
    console.warn("Nepodarilo sa načítať eBird nastavenia.", error);
    return { apiKey: "" };
  }
}

function saveEbirdPreferences(nextPreferences = {}) {
  try {
    const current = loadEbirdPreferences();
    localStorage.setItem(EBIRD_PREFERENCES_KEY, JSON.stringify({
      ...current,
      ...nextPreferences,
      apiKey: String(nextPreferences?.apiKey ?? current.apiKey ?? "").trim()
    }));
    return true;
  } catch (error) {
    console.warn("Nepodarilo sa uložiť eBird nastavenia.", error);
    return false;
  }
}

function openSettingsManager(statusMessage = "", tone = "", statusScope = "") {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--settings");
  const preferences = loadEbirdPreferences();
  const weatherPreferences = loadWeatherPreferences();
  const folderStoragePreferences = loadFolderStoragePreferences();
  const authProfile = loadLocalAuthProfile();
  const authSession = loadLocalAuthSession();
  const supabasePreferences = loadSupabasePreferences();
  const supabaseAuthMirror = loadSupabaseAuthMirror();
  const supabaseSyncMeta = loadSupabaseSyncMeta();
  const currentApiKey = String(preferences.apiKey || "").trim();
  const currentWeatherPlace = String(weatherPreferences?.placeLabel || GARDEN_WEATHER_PLACE).trim() || GARDEN_WEATHER_PLACE;
  const hasApiKey = Boolean(currentApiKey);
  const folderStorageEnabled = Boolean(folderStoragePreferences.enabled);
  const folderStorageSupported = supportsFolderStorage();
  const currentFolderName = String(folderStoragePreferences.folderName || "").trim();
  const hasLocalAccount = Boolean(authProfile?.enabled);
  const isSignedIn = isLocalAuthSessionValid(authProfile, authSession);
  const accountName = hasLocalAccount ? localAuthDisplayName(authProfile) : "";
  const supabaseEnabled = Boolean(supabasePreferences.enabled && supabasePreferences.url && supabasePreferences.anonKey);
  const supabaseCloudSignedIn = Boolean(supabaseAuthMirror.email);
  const supabaseCloudReady = supabaseEnabled && supabaseCloudSignedIn;
  const weatherStatusMessage = statusScope === "weather"
    ? statusMessage
    : `Počasie sa teraz synchronizuje pre ${currentWeatherPlace}.`;
  const eBirdStatusMessage = statusScope === "ebird"
    ? statusMessage
    : (hasApiKey
      ? "eBird kľúč je uložený a pripravený na použitie."
      : "Keď kľúč doplníš sem, pri vtákoch už len zvolíš zdroj eBird a vyberieš druh zo zoznamu.");
  const storageStatusMessage = statusScope === "storage"
    ? statusMessage
    : (folderStorageSupported
      ? (folderStorageEnabled
        ? `Dočasné ukladanie ide do priečinka ${currentFolderName || "moja zahrada"}.`
        : "Zatiaľ sa ukladá len do prehliadača. Pri veľa fotkách si vieš zapnúť dočasný priečinok.")
      : "Tento prehliadač zatiaľ nepodporuje dočasné ukladanie do priečinka.");
  const accountStatusMessage = statusScope === "account"
    ? statusMessage
    : (hasLocalAccount
      ? (isSignedIn
        ? `Prihlásená si ako ${accountName || authProfile.email}.`
        : `Účet ${accountName || authProfile.email} čaká na prihlásenie.`)
      : "Zapni si lokálne prihlasovanie už teraz, aby sme mali čistú cestu k budúcemu účtu a synchronizácii.");
  const backupStatusMessage = statusScope === "backup"
    ? statusMessage
    : "Tu si vieš bezpečne uložiť export JSON a neskôr ho načítať späť do appky.";
  const supabaseStatusMessage = statusScope === "supabase"
    ? statusMessage
    : (supabaseEnabled
      ? "Supabase je uložený ako pripravený backend pre ďalší krok."
      : "Sem si vieš uložiť URL a anon key svojho Supabase projektu. Zatiaľ tým len pripravíme čistú cestu na cloud.");
  const cloudAccountStatusMessage = statusScope === "cloud-account"
    ? statusMessage
    : (supabaseEnabled
      ? (supabaseCloudSignedIn
        ? `Cloud účet je prihlásený ako ${supabaseAuthMirror.email}.`
        : "Supabase je pripravený. Keď chceš, vieš si tu už založiť alebo prihlásiť cloud účet.")
      : "Najprv si ulož Supabase projekt, potom sem doplníme cloud účet.");
  const cloudSyncStatusMessage = statusScope === "cloud-sync"
    ? statusMessage
    : (supabaseCloudReady
      ? (supabaseSyncMeta.lastSyncedAt
        ? `Posledné ručné zrkadlenie do cloudu prebehlo ${formatDate(supabaseSyncMeta.lastSyncedAt)}.`
        : "Cloud účet je pripravený. Upload teraz zrkadlí cloud podľa lokálu a import načíta cloud späť do appky.")
      : (supabaseEnabled
        ? "Najprv sa prihlás do cloud účtu a potom spusti prvý ručný sync."
        : "Najprv si ulož Supabase projekt, potom sem doplníme prvý sync."));
  const weatherTone = statusScope === "weather" ? tone : "";
  const eBirdTone = statusScope === "ebird" ? tone : "";
  const storageTone = statusScope === "storage" ? tone : "";
  const accountTone = statusScope === "account" ? tone : "";
  const backupTone = statusScope === "backup" ? tone : "";
  const supabaseTone = statusScope === "supabase" ? tone : "";
  const cloudAccountTone = statusScope === "cloud-account" ? tone : "";
  const cloudSyncTone = statusScope === "cloud-sync" ? tone : "";

  detailContent.innerHTML = `
    <div class="settings-sheet">
      <section class="settings-hero">
        <div>
          <p class="eyebrow">Nastavenia</p>
          <h2>Nastavenia appky a integrácií</h2>
        </div>
        <div class="settings-hero__meta">
          <div class="settings-hero__pill">${escapeHtml(currentWeatherPlace)}</div>
          <div class="settings-hero__pill">${escapeHtml(hasLocalAccount ? (isSignedIn ? `Účet: ${accountName || "prihlásená"}` : `Účet: ${accountName || "zamknutý"}`) : "Účet: zatiaľ vypnutý")}</div>
          <div class="settings-hero__pill">${escapeHtml(supabaseEnabled ? "Supabase pripravený" : "Supabase zatiaľ nie")}</div>
          <div class="settings-hero__pill">${escapeHtml(supabaseCloudSignedIn ? `Cloud: ${supabaseAuthMirror.email}` : "Cloud: zatiaľ nie")}</div>
        </div>
      </section>
      <div class="settings-grid">
        <section class="settings-panel">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Počasie</p>
              <h3>Miesto pre synchronizáciu</h3>
            </div>
          </div>
          <form id="settings-weather-form" class="settings-form">
            <label class="field-block field-block--full">
              <span>Mesto alebo dedina</span>
              <input name="weatherPlace" type="text" value="${escapeAttribute(currentWeatherPlace)}" placeholder="Napr. Zákopčie, Žilinský kraj" autocomplete="off" spellcheck="false">
            </label>
            <p class="settings-panel__help">Sem daj miesto, pre ktoré sa má ťahať domovské počasie, výstrahy aj týždenné prehľady.</p>
            <div class="settings-panel__actions">
              <button class="button" type="submit">Uložiť miesto</button>
              <button class="button button--ghost" type="button" data-reset-weather-place>Použiť Zákopčie</button>
            </div>
            <p class="settings-panel__status ${weatherTone ? `is-${weatherTone}` : ""}" data-settings-weather-status>${escapeHtml(weatherStatusMessage)}</p>
          </form>
        </section>
        <section class="settings-panel">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Záloha a prenos</p>
              <h3>Export a import dát</h3>
            </div>
          </div>
          <div class="settings-form">
            <p class="settings-panel__help">Export uloží celý stav appky do JSON. Import nahradí aktuálne dáta tým, čo je v exporte, preto si pred importom radšej sprav nový export.</p>
            <div class="settings-panel__actions">
              <button class="button" type="button" data-export-state>Exportovať JSON</button>
              <button class="button button--ghost" type="button" data-import-state>Načítať JSON</button>
            </div>
            <input id="settings-import-file" type="file" accept="application/json,.json" hidden>
            <p class="settings-panel__status ${backupTone ? `is-${backupTone}` : ""}" data-settings-backup-status>${escapeHtml(backupStatusMessage)}</p>
          </div>
        </section>
        <section class="settings-panel settings-panel--wide">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Backend</p>
              <h3>Supabase</h3>
            </div>
          </div>
          <form id="settings-supabase-form" class="settings-form">
            <label class="field-block field-block--full">
              <span>Supabase URL</span>
              <input name="supabaseUrl" type="url" value="${escapeAttribute(supabasePreferences.url || "")}" placeholder="https://xxxxx.supabase.co" autocomplete="off" spellcheck="false">
            </label>
            <label class="field-block field-block--full">
              <span>Supabase anon key</span>
              <input name="supabaseAnonKey" type="text" value="${escapeAttribute(supabasePreferences.anonKey || "")}" placeholder="Sem vlož anon public key" autocomplete="off" spellcheck="false">
            </label>
            <p class="settings-panel__help">Týmto ešte nič nemigruješ. Len si uložíš projekt, aby sme potom vedeli napojiť prihlásenie, dáta a obrázky bez ďalšej prestavby appky.</p>
            <div class="settings-panel__actions">
              <button class="button" type="submit">Uložiť Supabase</button>
              <button class="button button--ghost" type="button" data-test-supabase ${supabaseEnabled ? "" : "hidden"}>Otestovať spojenie</button>
              <button class="button button--ghost" type="button" data-clear-supabase ${supabaseEnabled ? "" : "hidden"}>Vymazať Supabase</button>
            </div>
            <p class="settings-panel__status ${supabaseTone ? `is-${supabaseTone}` : ""}" data-settings-supabase-status>${escapeHtml(supabaseStatusMessage)}</p>
          </form>
        </section>
        <section class="settings-panel">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Cloud účet</p>
              <h3>Supabase Auth</h3>
            </div>
          </div>
          <form id="settings-cloud-account-form" class="settings-form">
            ${supabaseCloudSignedIn ? `
              <div class="settings-panel__storage-meta settings-panel__account-meta">
                <span>Cloud e-mail</span>
                <strong>${escapeHtml(supabaseAuthMirror.email)}</strong>
                <span>Provider</span>
                <strong>${escapeHtml(supabaseAuthMirror.provider || "email")}</strong>
              </div>
            ` : ""}
            <div class="settings-panel__account-grid">
              <label class="field-block field-block--full">
                <span>E-mail do cloudu</span>
                <input name="cloudEmail" type="email" value="${escapeAttribute(supabaseAuthMirror.email || authProfile?.email || "")}" placeholder="napr. ja@mojazahrada.sk" autocomplete="username" ${supabaseEnabled ? "" : "disabled"}>
              </label>
              <label class="field-block field-block--full">
                <span>Heslo do cloudu</span>
                <input name="cloudPassword" type="password" placeholder="Aspoň 6 znakov" autocomplete="current-password" ${supabaseEnabled ? "" : "disabled"}>
              </label>
            </div>
            <div class="settings-panel__actions">
              <button class="button" type="button" data-cloud-signup ${supabaseEnabled ? "" : "disabled"}>Vytvoriť cloud účet</button>
              <button class="button button--ghost" type="button" data-cloud-signin ${supabaseEnabled ? "" : "disabled"}>Prihlásiť cloud účet</button>
              <button class="button button--ghost" type="button" data-cloud-signout ${supabaseCloudSignedIn ? "" : "hidden"}>Odhlásiť cloud účet</button>
            </div>
            <p class="settings-panel__help">Toto je už reálny cloud účet v Supabase. Dáta naň ešte nemigrujeme, ale pripravujeme tým čistý základ pre ďalší krok.</p>
            <p class="settings-panel__status ${cloudAccountTone ? `is-${cloudAccountTone}` : ""}" data-settings-cloud-account-status>${escapeHtml(cloudAccountStatusMessage)}</p>
          </form>
        </section>
        <section class="settings-panel settings-panel--wide">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Cloud dáta</p>
              <h3>Prvý sync do Supabase</h3>
            </div>
          </div>
          <div class="settings-form">
            <div class="settings-panel__storage-meta settings-panel__account-meta">
              <span>Kategórie</span>
              <strong>${escapeHtml(String(state.categories.length))}</strong>
              <span>Karty</span>
              <strong>${escapeHtml(String(state.varieties.length))}</strong>
              <span>Úlohy</span>
              <strong>${escapeHtml(String(state.customTasks.length))}</strong>
              <span>Denník</span>
              <strong>${escapeHtml(String(state.journal.length))}</strong>
            </div>
            <p class="settings-panel__help">Upload teraz zrkadlí cloud podľa lokálu. Nové a upravené dáta nahrá, ale z cloudu odstráni aj to, čo už lokálne neexistuje. Načítanie z cloudu sa pýta na potvrdenie a ešte predtým uloží lokálnu poistnú zálohu.</p>
            <div class="settings-panel__actions">
              <button class="button button--ghost" type="button" data-cloud-sync-compare ${supabaseCloudReady ? "" : "disabled"}>Porovnať lokálne a cloud</button>
              <button class="button" type="button" data-cloud-sync-upload ${supabaseCloudReady ? "" : "disabled"}>Nahrať dáta do cloudu</button>
              <button class="button button--ghost" type="button" data-cloud-sync-download ${supabaseCloudReady ? "" : "disabled"}>Načítať dáta z cloudu</button>
            </div>
            <p class="settings-panel__status ${cloudSyncTone ? `is-${cloudSyncTone}` : ""}" data-settings-cloud-sync-status>${escapeHtml(cloudSyncStatusMessage)}</p>
          </div>
        </section>
        <section class="settings-panel settings-panel--soft settings-panel--wide settings-panel--secondary">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Lokálne</p>
              <h3>Lokálny účet</h3>
            </div>
          </div>
          <form id="settings-account-form" class="settings-form">
            ${hasLocalAccount ? `
              <div class="settings-panel__storage-meta settings-panel__account-meta">
                <span>Profil</span>
                <strong>${escapeHtml(accountName || "Moja appka")}</strong>
                <span>E-mail</span>
                <strong>${escapeHtml(authProfile.email)}</strong>
                <span>Stav</span>
                <strong>${escapeHtml(isSignedIn ? "prihlásená" : "zamknutá")}</strong>
              </div>
            ` : ""}
            <div class="settings-panel__account-grid">
              <label class="field-block field-block--full">
                <span>Meno alebo názov profilu</span>
                <input name="displayName" type="text" value="${escapeAttribute(authProfile?.displayName || "")}" placeholder="Napr. Domi alebo Moja záhrada" autocomplete="name">
              </label>
              <label class="field-block field-block--full">
                <span>E-mail pre účet</span>
                <input name="email" type="email" value="${escapeAttribute(authProfile?.email || "")}" placeholder="napr. ja@mojazahrada.sk" autocomplete="username">
              </label>
            </div>
            ${hasLocalAccount ? `
              <label class="field-block field-block--full">
                <span>Aktuálne heslo</span>
                <input name="currentPassword" type="password" placeholder="Zadaj heslo na potvrdenie zmien" autocomplete="current-password">
              </label>
              <div class="settings-panel__account-grid">
                <label class="field-block field-block--full">
                  <span>Nové heslo</span>
                  <input name="nextPassword" type="password" placeholder="Nechaj prázdne, ak heslo nemeníš" autocomplete="new-password">
                </label>
                <label class="field-block field-block--full">
                  <span>Potvrď nové heslo</span>
                  <input name="nextPasswordConfirm" type="password" placeholder="Zopakuj nové heslo" autocomplete="new-password">
                </label>
              </div>
            ` : `
              <div class="settings-panel__account-grid">
                <label class="field-block field-block--full">
                  <span>Heslo</span>
                  <input name="nextPassword" type="password" placeholder="Aspoň 6 znakov" autocomplete="new-password">
                </label>
                <label class="field-block field-block--full">
                  <span>Potvrď heslo</span>
                  <input name="nextPasswordConfirm" type="password" placeholder="Zopakuj heslo" autocomplete="new-password">
                </label>
              </div>
            `}
            <div class="settings-panel__actions">
              <button class="button" type="submit">${hasLocalAccount ? "Uložiť účet" : "Zapnúť prihlasovanie"}</button>
              ${hasLocalAccount ? `<button class="button button--ghost" type="button" data-lock-local-account>Zamknúť appku</button>` : ""}
              ${hasLocalAccount && isSignedIn ? `<button class="button button--ghost" type="button" data-logout-local-account>Odhlásiť sa</button>` : ""}
            </div>
            <p class="settings-panel__help">Toto prihlasovanie je zatiaľ lokálne len v tomto prehliadači, ale ostáva ako bezpečná záloha.</p>
            <p class="settings-panel__status ${accountTone ? `is-${accountTone}` : ""}" data-settings-account-status>${escapeHtml(accountStatusMessage)}</p>
          </form>
        </section>
        <section class="settings-panel settings-panel--soft settings-panel--secondary">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Fallback</p>
              <h3>Priečinok pre dáta</h3>
            </div>
          </div>
          <div class="settings-form">
            <p class="settings-panel__help">Toto nechávame ako poistku, keď by samotný prehliadač nestačil.</p>
            <div class="settings-panel__storage-meta">
              <span>Priečinok</span>
              <strong>${escapeHtml(folderStorageEnabled ? (currentFolderName || "vybraný priečinok") : "zatiaľ nie je vybraný")}</strong>
              <span>Súbor</span>
              <strong>${escapeHtml(folderStoragePreferences.fileName || FOLDER_STORAGE_FILE_NAME)}</strong>
            </div>
            <div class="settings-panel__actions">
              <button class="button" type="button" data-pick-storage-folder ${folderStorageSupported ? "" : "disabled"}>${folderStorageEnabled ? "Zmeniť priečinok" : "Vybrať priečinok"}</button>
              <button class="button button--ghost" type="button" data-restore-storage-now ${folderStorageEnabled ? "" : "hidden"}>Načítať z priečinka</button>
              <button class="button button--ghost" type="button" data-save-storage-now ${folderStorageEnabled ? "" : "hidden"}>Uložiť tam hneď</button>
              <button class="button button--ghost" type="button" data-disable-storage ${folderStorageEnabled ? "" : "hidden"}>Vypnúť priečinok</button>
            </div>
            <p class="settings-panel__status ${storageTone ? `is-${storageTone}` : ""}" data-settings-storage-status>${escapeHtml(storageStatusMessage)}</p>
          </div>
        </section>
        <section class="settings-panel settings-panel--soft settings-panel--secondary">
          <div class="settings-panel__head">
            <div>
              <p class="eyebrow">Integrácia</p>
              <h3>eBird kľúč</h3>
            </div>
          </div>
          <form id="settings-ebird-form" class="settings-form">
            <label class="field-block field-block--full">
              <span>eBird API kľúč</span>
              <input name="ebirdApiKey" type="text" value="${escapeAttribute(currentApiKey)}" placeholder="Sem vlož svoj eBird kľúč" autocomplete="off" spellcheck="false">
            </label>
            <p class="settings-panel__help">Použije sa až vtedy, keď pri vtákoch zvolíš zdroj eBird.</p>
            <div class="settings-panel__actions">
              <button class="button" type="submit">Uložiť eBird kľúč</button>
              <button class="button button--ghost" type="button" data-clear-ebird-key ${hasApiKey ? "" : "hidden"}>Vymazať kľúč</button>
            </div>
            <p class="settings-panel__status ${eBirdTone ? `is-${eBirdTone}` : ""}" data-settings-ebird-status>${escapeHtml(eBirdStatusMessage)}</p>
          </form>
        </section>
      </div>
    </div>
  `;

  const settingsWeatherFormEl = document.getElementById("settings-weather-form");
  const settingsSupabaseFormEl = document.getElementById("settings-supabase-form");
  const settingsEbirdFormEl = document.getElementById("settings-ebird-form");
  const settingsAccountFormEl = document.getElementById("settings-account-form");
  const settingsCloudAccountFormEl = document.getElementById("settings-cloud-account-form");
  const clearEbirdKeyButton = detailContent.querySelector("[data-clear-ebird-key]");
  const clearSupabaseButton = detailContent.querySelector("[data-clear-supabase]");
  const testSupabaseButton = detailContent.querySelector("[data-test-supabase]");
  const cloudSignupButton = detailContent.querySelector("[data-cloud-signup]");
  const cloudSigninButton = detailContent.querySelector("[data-cloud-signin]");
  const cloudSignoutButton = detailContent.querySelector("[data-cloud-signout]");
  const cloudSyncCompareButton = detailContent.querySelector("[data-cloud-sync-compare]");
  const cloudSyncUploadButton = detailContent.querySelector("[data-cloud-sync-upload]");
  const cloudSyncDownloadButton = detailContent.querySelector("[data-cloud-sync-download]");
  const resetWeatherPlaceButton = detailContent.querySelector("[data-reset-weather-place]");
  const pickStorageFolderButton = detailContent.querySelector("[data-pick-storage-folder]");
  const restoreStorageNowButton = detailContent.querySelector("[data-restore-storage-now]");
  const saveStorageNowButton = detailContent.querySelector("[data-save-storage-now]");
  const disableStorageButton = detailContent.querySelector("[data-disable-storage]");
  const lockLocalAccountButton = detailContent.querySelector("[data-lock-local-account]");
  const logoutLocalAccountButton = detailContent.querySelector("[data-logout-local-account]");
  const exportStateButton = detailContent.querySelector("[data-export-state]");
  const importStateButton = detailContent.querySelector("[data-import-state]");
  const importStateInput = document.getElementById("settings-import-file");

  settingsWeatherFormEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nextPlace = String(new FormData(settingsWeatherFormEl).get("weatherPlace") || "").trim();
    if (!nextPlace) {
      openSettingsManager("Najprv sem doplň mesto alebo dedinu pre počasie.", "error", "weather");
      return;
    }
    try {
      const source = await resolveWeatherSource({ placeText: nextPlace });
      saveWeatherPreferences(source);
      homeWeatherSnapshot = null;
      homeWeatherTrend = null;
      homeWeatherOverview = null;
      await Promise.all([
        loadHomeWeatherSnapshot(true),
        loadHomeWeatherTrend(true),
        loadHomeWeatherOverview(true)
      ]).catch(() => null);
      render();
      refreshMainMenuWeatherMini().catch(() => {});
      refreshHomeWeatherCard().catch(() => {});
      openSettingsManager(`Počasie sa teraz synchronizuje pre ${source.placeLabel}.`, "success", "weather");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Miesto pre počasie sa nepodarilo uložiť.", "error", "weather");
    }
  });

  resetWeatherPlaceButton?.addEventListener("click", async () => {
    try {
      const source = await resolveWeatherSource({ placeText: GARDEN_WEATHER_PLACE });
      saveWeatherPreferences(source);
      homeWeatherSnapshot = null;
      homeWeatherTrend = null;
      homeWeatherOverview = null;
      await Promise.all([
        loadHomeWeatherSnapshot(true),
        loadHomeWeatherTrend(true),
        loadHomeWeatherOverview(true)
      ]).catch(() => null);
      render();
      refreshMainMenuWeatherMini().catch(() => {});
      refreshHomeWeatherCard().catch(() => {});
      openSettingsManager(`Počasie som vrátila na ${source.placeLabel}.`, "success", "weather");
    } catch (error) {
      openSettingsManager("Predvolené miesto pre počasie sa teraz nepodarilo obnoviť.", "error", "weather");
    }
  });

  pickStorageFolderButton?.addEventListener("click", async () => {
    try {
      await enableFolderStorageFromPicker();
      openSettingsManager(`Dočasné ukladanie ide odteraz do priečinka ${loadFolderStoragePreferences().folderName || "moja zahrada"}.`, "success", "storage");
    } catch (error) {
      if (error && typeof error === "object" && error.name === "AbortError") {
        return;
      }
      openSettingsManager(error instanceof Error ? error.message : "Priečinok pre dočasné úložisko sa nepodarilo nastaviť.", "error", "storage");
    }
  });

  saveStorageNowButton?.addEventListener("click", async () => {
    try {
      await writeStateToFolderStorage(JSON.stringify(serializeStateSnapshot()));
      openSettingsManager("Aktuálny stav som hneď uložila aj do priečinka na disku.", "success", "storage");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Nepodarilo sa uložiť aktuálny stav do priečinka.", "error", "storage");
    }
  });

  restoreStorageNowButton?.addEventListener("click", async () => {
    try {
      await loadStateFromFolderStorage({ requestAccess: true });
      openSettingsManager("Dáta som znova načítala priamo z priečinka na disku.", "success", "storage");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Nepodarilo sa načítať dáta z priečinka.", "error", "storage");
    }
  });

  disableStorageButton?.addEventListener("click", async () => {
    try {
      await disableFolderStorage();
      openSettingsManager("Dočasné ukladanie do priečinka som vypla. Appka je späť len na úložisku prehliadača.", "success", "storage");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Dočasné úložisko sa teraz nepodarilo vypnúť.", "error", "storage");
    }
  });

  settingsEbirdFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextKey = String(new FormData(settingsEbirdFormEl).get("ebirdApiKey") || "").trim();
    if (!nextKey) {
      openSettingsManager("Najprv sem vlož eBird API kľúč alebo použi vymazanie.", "error", "ebird");
      return;
    }
    if (saveEbirdPreferences({ apiKey: nextKey })) {
      openSettingsManager("eBird API kľúč je uložený. Pri vtákoch sa teraz zoznam načíta jedným klikom.", "success", "ebird");
      return;
    }
    openSettingsManager("Nepodarilo sa uložiť eBird API kľúč.", "error", "ebird");
  });

  clearEbirdKeyButton?.addEventListener("click", () => {
    if (saveEbirdPreferences({ apiKey: "" })) {
      openSettingsManager("eBird API kľúč som vymazala z tohto prehliadača.", "success", "ebird");
      return;
    }
    openSettingsManager("Kľúč sa nepodarilo vymazať.", "error", "ebird");
  });

  settingsSupabaseFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(settingsSupabaseFormEl);
    const url = String(formData.get("supabaseUrl") || "").trim();
    const anonKey = String(formData.get("supabaseAnonKey") || "").trim();
    const looksLikeUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url);
    if (!looksLikeUrl) {
      openSettingsManager("Sem pri Supabase daj presnú URL projektu, napríklad https://tvojprojekt.supabase.co", "error", "supabase");
      return;
    }
    if (!anonKey || anonKey.length < 40) {
      openSettingsManager("Pri Supabase ešte chýba anon key alebo vyzerá neúplne.", "error", "supabase");
      return;
    }
    if (saveSupabasePreferences({
      enabled: true,
      url,
      anonKey,
      configuredAt: supabasePreferences.configuredAt || new Date().toISOString(),
      lastCheckedAt: new Date().toISOString()
    })) {
      openSettingsManager("Supabase projekt je uložený. V ďalšom kroku naň napojíme účet, dáta a obrázky.", "success", "supabase");
      return;
    }
    openSettingsManager("Supabase nastavenie sa teraz nepodarilo uložiť.", "error", "supabase");
  });

  clearSupabaseButton?.addEventListener("click", () => {
    if (saveSupabasePreferences(normalizeSupabasePreferences())) {
      openSettingsManager("Supabase nastavenie som z tejto appky vymazala.", "success", "supabase");
      return;
    }
    openSettingsManager("Supabase nastavenie sa teraz nepodarilo vymazať.", "error", "supabase");
  });

  testSupabaseButton?.addEventListener("click", async () => {
    try {
      const result = await testSupabaseConnection();
      openSettingsManager(
        result.hasSession
          ? "Supabase spojenie funguje a už tam vidím aj aktívnu session."
          : "Supabase spojenie funguje. Session tam ešte nie je, čo je zatiaľ v poriadku.",
        "success",
        "supabase"
      );
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Supabase spojenie sa teraz nepodarilo overiť.", "error", "supabase");
    }
  });

  const readCloudCredentials = () => {
    if (!settingsCloudAccountFormEl) return { email: "", password: "" };
    const formData = new FormData(settingsCloudAccountFormEl);
    return {
      email: String(formData.get("cloudEmail") || "").trim().toLowerCase(),
      password: String(formData.get("cloudPassword") || "")
    };
  };

  cloudSignupButton?.addEventListener("click", async () => {
    const { email, password } = readCloudCredentials();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      openSettingsManager("Pri cloud účte ešte chýba správny e-mail.", "error", "cloud-account");
      return;
    }
    if (password.length < 6) {
      openSettingsManager("Cloud heslo nech má aspoň 6 znakov.", "error", "cloud-account");
      return;
    }
    try {
      const result = await supabaseSignUpEmail(email, password);
      openSettingsManager(
        result.needsConfirmation
          ? `Cloud účet ${result.userEmail} je vytvorený. Pozri si e-mail a potvrď registráciu, ak to Supabase od teba žiada.`
          : `Cloud účet ${result.userEmail} je vytvorený a rovno prihlásený.`,
        "success",
        "cloud-account"
      );
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Cloud účet sa teraz nepodarilo vytvoriť.", "error", "cloud-account");
    }
  });

  cloudSigninButton?.addEventListener("click", async () => {
    const { email, password } = readCloudCredentials();
    if (!email || !password) {
      openSettingsManager("Pri cloud prihlásení ešte chýba e-mail alebo heslo.", "error", "cloud-account");
      return;
    }
    try {
      const result = await supabaseSignInEmail(email, password);
      openSettingsManager(`Cloud účet ${result.userEmail} je prihlásený.`, "success", "cloud-account");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Cloud prihlásenie sa teraz nepodarilo.", "error", "cloud-account");
    }
  });

  cloudSignoutButton?.addEventListener("click", async () => {
    try {
      await supabaseSignOut();
      openSettingsManager("Cloud účet som odhlásila.", "success", "cloud-account");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Cloud odhlásenie sa teraz nepodarilo.", "error", "cloud-account");
    }
  });

  cloudSyncCompareButton?.addEventListener("click", async () => {
    const previousLabel = cloudSyncCompareButton.textContent;
    cloudSyncCompareButton.disabled = true;
    cloudSyncCompareButton.textContent = "Porovnávam...";
    try {
      const summary = await fetchSupabaseStateSummary();
      const localSummary = {
        categories: state.categories.length,
        cards: state.varieties.length,
        tasks: state.customTasks.length,
        journal: state.journal.length
      };
      const countsMatch = localSummary.categories === summary.categories
        && localSummary.cards === summary.cards
        && localSummary.tasks === summary.tasks
        && localSummary.journal === summary.journal;
      const latestCloudLabel = summary.latestUpdatedAt
        ? formatDate(summary.latestUpdatedAt)
        : "zatiaľ bez dátumu";
      openSettingsManager(
        `${countsMatch ? "Lokálne dáta a cloud momentálne sedia na počtoch." : "Lokálne dáta a cloud sa teraz líšia v počtoch."} Lokálne: ${localSummary.categories}/${localSummary.cards}/${localSummary.tasks}/${localSummary.journal}. Cloud: ${summary.categories}/${summary.cards}/${summary.tasks}/${summary.journal}. Cloud médiá v buckete: ${summary.imageFiles}. Posledná cloud zmena: ${latestCloudLabel}.`,
        countsMatch ? "success" : "",
        "cloud-sync"
      );
    } catch (error) {
      cloudSyncCompareButton.disabled = false;
      cloudSyncCompareButton.textContent = previousLabel;
      openSettingsManager(error instanceof Error ? error.message : "Lokálne a cloud dáta sa teraz nepodarilo porovnať.", "error", "cloud-sync");
    }
  });

  cloudSyncUploadButton?.addEventListener("click", async () => {
    const shouldContinue = window.confirm("Nahrať dáta do cloudu a zrkadliť cloud podľa aktuálneho lokálu? Z cloudu sa odstránia kategórie, karty, úlohy, zápisy a cloud obrázky, ktoré už lokálne neexistujú.");
    if (!shouldContinue) return;

    const previousLabel = cloudSyncUploadButton.textContent;
    cloudSyncUploadButton.disabled = true;
    cloudSyncUploadButton.textContent = "Nahrávam...";
    try {
      const result = await syncStateToSupabase();
      openSettingsManager(
        `Cloud zrkadlenie je hotové. Nahrala som ${countedLabel(result.categories, "kategóriu", "kategórie", "kategórií")}, ${countedLabel(result.cards, "kartu", "karty", "kariet")}, ${countedLabel(result.tasks, "úlohu", "úlohy", "úloh")}, ${countedLabel(result.journal, "zápis", "zápisy", "zápisov")} a ${countedLabel(result.uploadedImages, "fotku", "fotky", "fotiek")}. Z cloudu som odstránila ${countedLabel(result.deletedCategories, "kategóriu", "kategórie", "kategórií")}, ${countedLabel(result.deletedCards, "kartu", "karty", "kariet")}, ${countedLabel(result.deletedTasks, "úlohu", "úlohy", "úloh")}, ${countedLabel(result.deletedJournal, "zápis", "zápisy", "zápisov")} a ${countedLabel(result.deletedImages, "mediálny súbor", "mediálne súbory", "mediálnych súborov")}.`,
        "success",
        "cloud-sync"
      );
    } catch (error) {
      cloudSyncUploadButton.disabled = false;
      cloudSyncUploadButton.textContent = previousLabel;
      openSettingsManager(error instanceof Error ? error.message : "Prvý cloud sync sa teraz nepodarilo dokončiť.", "error", "cloud-sync");
    }
  });

  cloudSyncDownloadButton?.addEventListener("click", async () => {
    const shouldContinue = window.confirm("Načítať dáta z cloudu a prepísať nimi aktuálne lokálne dáta? Predtým sa uloží lokálna poistná záloha.");
    if (!shouldContinue) return;

    const previousLabel = cloudSyncDownloadButton.textContent;
    cloudSyncDownloadButton.disabled = true;
    cloudSyncDownloadButton.textContent = "Načítavam...";
    try {
      const result = await importStateFromSupabase();
      openSettingsManager(
        `Cloud import je hotový. Načítala som ${countedLabel(result.categories, "kategóriu", "kategórie", "kategórií")}, ${countedLabel(result.cards, "kartu", "karty", "kariet")}, ${countedLabel(result.tasks, "úlohu", "úlohy", "úloh")} a ${countedLabel(result.journal, "zápis", "zápisy", "zápisov")}.`,
        "success",
        "cloud-sync"
      );
    } catch (error) {
      cloudSyncDownloadButton.disabled = false;
      cloudSyncDownloadButton.textContent = previousLabel;
      openSettingsManager(error instanceof Error ? error.message : "Cloud dáta sa teraz nepodarilo načítať.", "error", "cloud-sync");
    }
  });

  settingsAccountFormEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(settingsAccountFormEl);
    const displayName = String(formData.get("displayName") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const currentPassword = String(formData.get("currentPassword") || "");
    const nextPassword = String(formData.get("nextPassword") || "");
    const nextPasswordConfirm = String(formData.get("nextPasswordConfirm") || "");
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!displayName) {
      openSettingsManager("Najprv si nastav meno alebo názov svojho profilu.", "error", "account");
      return;
    }
    if (!emailLooksValid) {
      openSettingsManager("Sem pri účte daj prosím normálny e-mail, aby sme mali dobrý základ aj do budúcna.", "error", "account");
      return;
    }

    if (!hasLocalAccount) {
      if (nextPassword.length < 6) {
        openSettingsManager("Heslo pre lokálny účet nech má aspoň 6 znakov.", "error", "account");
        return;
      }
      if (nextPassword !== nextPasswordConfirm) {
        openSettingsManager("Heslá sa nezhodujú. Skontroluj ich prosím ešte raz.", "error", "account");
        return;
      }
      try {
        const profile = await buildLocalAuthProfile({ displayName, email, password: nextPassword });
        if (!saveLocalAuthProfile(profile)) {
          openSettingsManager("Lokálny účet sa teraz nepodarilo uložiť.", "error", "account");
          return;
        }
        saveLocalAuthSession({
          userId: profile.userId,
          email: profile.email,
          displayName: localAuthDisplayName(profile),
          signedInAt: new Date().toISOString()
        });
        syncAuthGate();
        openSettingsManager(`Lokálne prihlasovanie je zapnuté. Prihlásená si ako ${localAuthDisplayName(profile)}.`, "success", "account");
      } catch (error) {
        openSettingsManager(error instanceof Error ? error.message : "Lokálny účet sa nepodarilo zapnúť.", "error", "account");
      }
      return;
    }

    const wantsPasswordChange = Boolean(nextPassword || nextPasswordConfirm);
    const profileChanged = displayName !== String(authProfile?.displayName || "").trim() || email !== String(authProfile?.email || "").trim().toLowerCase();
    if (!profileChanged && !wantsPasswordChange) {
      openSettingsManager("Na účte sa zatiaľ nič nemenilo.", "success", "account");
      return;
    }
    if (!currentPassword.trim()) {
      openSettingsManager("Pri zmene účtu potrebujem potvrdiť aktuálne heslo.", "error", "account");
      return;
    }
    try {
      const passwordMatches = await verifyLocalAuthPassword(currentPassword, authProfile);
      if (!passwordMatches) {
        openSettingsManager("Aktuálne heslo nesedí.", "error", "account");
        return;
      }
      const nextProfile = {
        ...authProfile,
        displayName,
        email,
        updatedAt: new Date().toISOString()
      };
      if (wantsPasswordChange) {
        if (nextPassword.length < 6) {
          openSettingsManager("Nové heslo nech má aspoň 6 znakov.", "error", "account");
          return;
        }
        if (nextPassword !== nextPasswordConfirm) {
          openSettingsManager("Nové heslá sa nezhodujú.", "error", "account");
          return;
        }
        nextProfile.passwordSalt = makeLocalAuthSalt();
        nextProfile.passwordHash = await hashLocalAuthPassword(nextPassword, nextProfile.passwordSalt);
      }
      if (!saveLocalAuthProfile(nextProfile)) {
        openSettingsManager("Účet sa teraz nepodarilo uložiť.", "error", "account");
        return;
      }
      saveLocalAuthSession({
        userId: nextProfile.userId,
        email: nextProfile.email,
        displayName: localAuthDisplayName(nextProfile),
        signedInAt: authSession?.signedInAt || new Date().toISOString()
      });
      syncAuthGate();
      openSettingsManager("Účet som uložila a prihlasovanie ostáva aktívne.", "success", "account");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Účet sa teraz nepodarilo upraviť.", "error", "account");
    }
  });

  lockLocalAccountButton?.addEventListener("click", () => {
    detailModal.close();
    lockAppToAuth();
  });

  logoutLocalAccountButton?.addEventListener("click", () => {
    detailModal.close();
    lockAppToAuth();
  });

  exportStateButton?.addEventListener("click", () => {
    try {
      downloadStateExport();
      openSettingsManager("Export JSON som pripravila a uložila na stiahnutie.", "success", "backup");
    } catch (error) {
      openSettingsManager("Export sa teraz nepodarilo pripraviť.", "error", "backup");
    }
  });

  importStateButton?.addEventListener("click", () => {
    importStateInput?.click();
  });

  importStateInput?.addEventListener("change", async () => {
    const file = importStateInput.files?.[0];
    if (!file) return;
    try {
      const result = await importStateFromFile(file);
      openSettingsManager(`Import je hotový. Načítala som ${countedLabel(result.varieties, "kartu", "karty", "kariet")}, ${countedLabel(result.tasks, "úlohu", "úlohy", "úloh")} a ${countedLabel(result.journal, "zápis", "zápisy", "zápisov")}.`, "success", "backup");
    } catch (error) {
      openSettingsManager(error instanceof Error ? error.message : "Import sa teraz nepodarilo dokončiť.", "error", "backup");
    } finally {
      importStateInput.value = "";
    }
  });

  openDetailModalDialog();
}

function getStoredEbirdApiKey() {
  return loadEbirdPreferences().apiKey;
}

function normalizeBirdLookupText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function birdEbirdSpeciesUrl(speciesCode) {
  const safeCode = String(speciesCode || "").trim();
  if (!safeCode) return "";
  return `https://ebird.org/species/${encodeURIComponent(safeCode)}`;
}

async function ensureEbirdApiKey() {
  return String(getStoredEbirdApiKey() || "").trim();
}

async function loadEbirdTaxonomy(apiKey, forceReload = false) {
  const safeApiKey = String(apiKey || "").trim();
  if (!safeApiKey) return [];

  if (!forceReload) {
    try {
      const cachedRaw = localStorage.getItem(EBIRD_TAXONOMY_CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (Array.isArray(cached?.items) && cached.items.length) {
          const fetchedAt = Number(cached?.fetchedAt || 0);
          const maxAgeMs = 1000 * 60 * 60 * 24 * 30;
          if (Date.now() - fetchedAt < maxAgeMs) {
            return cached.items;
          }
        }
      }
    } catch (error) {
      console.warn("Nepodarilo sa prečítať cache eBird taxonómie.", error);
    }
  }

  const params = new URLSearchParams({
    fmt: "json",
    cat: "species",
    locale: "sk",
    key: safeApiKey
  });
  const response = await fetch(`https://api.ebird.org/v2/ref/taxonomy/ebird?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`eBird taxonómia sa nepodarila načítať (${response.status})`);
  }
  const payload = await response.json();
  const items = Array.isArray(payload)
    ? payload.map((item) => ({
      speciesCode: String(item?.speciesCode || "").trim(),
      comName: String(item?.comName || "").trim(),
      sciName: String(item?.sciName || "").trim(),
      category: String(item?.category || "").trim()
    })).filter((item) => item.speciesCode && (item.comName || item.sciName))
    : [];

  try {
    localStorage.setItem(EBIRD_TAXONOMY_CACHE_KEY, JSON.stringify({
      fetchedAt: Date.now(),
      items
    }));
  } catch (error) {
    console.warn("Nepodarilo sa uložiť cache eBird taxonómie.", error);
  }

  return items;
}

function findBestEbirdSpeciesMatch(query, taxonomy = [], latinQuery = "") {
  const normalizedQuery = normalizeBirdLookupText(query);
  const normalizedLatin = normalizeBirdLookupText(latinQuery);
  const pool = Array.isArray(taxonomy) ? taxonomy : [];
  if (!normalizedQuery && !normalizedLatin) return null;

  const exactMatch = pool.find((item) => {
    const common = normalizeBirdLookupText(item.comName);
    const latin = normalizeBirdLookupText(item.sciName);
    return (normalizedQuery && (common === normalizedQuery || latin === normalizedQuery))
      || (normalizedLatin && (latin === normalizedLatin || common === normalizedLatin));
  });
  if (exactMatch) return exactMatch;

  const startsWithMatch = pool.find((item) => {
    const common = normalizeBirdLookupText(item.comName);
    const latin = normalizeBirdLookupText(item.sciName);
    return (normalizedQuery && (common.startsWith(normalizedQuery) || latin.startsWith(normalizedQuery)))
      || (normalizedLatin && (latin.startsWith(normalizedLatin) || common.startsWith(normalizedLatin)));
  });
  if (startsWithMatch) return startsWithMatch;

  return pool.find((item) => {
    const common = normalizeBirdLookupText(item.comName);
    const latin = normalizeBirdLookupText(item.sciName);
    return (normalizedQuery && (common.includes(normalizedQuery) || latin.includes(normalizedQuery)))
      || (normalizedLatin && (latin.includes(normalizedLatin) || common.includes(normalizedLatin)));
  }) || null;
}

function findExistingBirdCards(match = {}) {
  const speciesCode = String(match?.speciesCode || "").trim();
  const commonName = normalizeBirdLookupText(match?.comName || "");
  const latinName = normalizeBirdLookupText(match?.sciName || "");
  return state.varieties.filter((item) => {
    if (cardType(item) !== "bird") return false;
    if (speciesCode && String(item?.birdSpeciesCode || "").trim() === speciesCode) return true;
    if (commonName && normalizeBirdLookupText(item?.name || "") === commonName) return true;
    if (latinName && normalizeBirdLookupText(item?.birdLatinName || "") === latinName) return true;
    return false;
  });
}

function renderBirdEbirdPickerItems(taxonomy = [], query = "") {
  const normalizedQuery = normalizeBirdLookupText(query);
  if (!normalizedQuery) {
    return `
      <div class="bird-ebird-picker__empty">Píš názov a zoznam sa zúži.</div>
    `;
  }

  const matches = taxonomy
    .filter((item) => {
      const common = normalizeBirdLookupText(item.comName);
      const latin = normalizeBirdLookupText(item.sciName);
      const speciesCode = normalizeBirdLookupText(item.speciesCode);
      return common.includes(normalizedQuery) || latin.includes(normalizedQuery) || speciesCode.includes(normalizedQuery);
    })
    .slice(0, 18);

  if (!matches.length) {
    return `
      <div class="bird-ebird-picker__empty">
        V eBirde sa pre tento výraz nenašla zhoda.
      </div>
    `;
  }

  return matches.map((item) => {
    const existingBirdCards = findExistingBirdCards(item);
    return `
      <button
        class="bird-ebird-picker__item"
        type="button"
        data-bird-ebird-pick="${escapeAttribute(item.speciesCode)}"
      >
        <span class="bird-ebird-picker__item-main">
          <strong>${escapeHtml(item.comName || item.sciName || "Neznámy vták")}</strong>
          <span>${escapeHtml(item.sciName || "")}</span>
        </span>
        <span class="bird-ebird-picker__item-side">
          <span class="bird-ebird-picker__badge ${existingBirdCards.length ? "is-existing" : "is-new"}">
            ${escapeHtml(existingBirdCards.length ? `už v appke ${countedLabel(existingBirdCards.length, "raz", "razy", "krát")}` : "nový druh")}
          </span>
        </span>
      </button>
    `;
  }).join("");
}

function mushroomEdibilityOptions(current) {
  return [
    ["", "Bez označenia"],
    ["edible", "Jedlá"],
    ["inedible", "Nejedlá"],
    ["poisonous", "Jedovatá"],
    ["unknown", "Neviem"]
  ].map(([value, label]) => `<option value="${value}" ${value === current ? "selected" : ""}>${label}</option>`).join("");
}

function mushroomGatheringOptions(current) {
  return [
    ["", "Bez označenia"],
    ["gather", "Zbieram"],
    ["skip", "Nezbieram"],
    ["unknown", "Nepoznám"]
  ].map(([value, label]) => `<option value="${value}" ${value === current ? "selected" : ""}>${label}</option>`).join("");
}

function linkedVarietyOptions(current, selectedCategoryIds = "") {
  const normalizedCategoryIds = normalizeIdList(selectedCategoryIds);
  const allowedCategoryIds = normalizedCategoryIds.length
    ? new Set(normalizedCategoryIds.flatMap((categoryId) => [categoryId, ...collectDescendantCategoryIds(categoryId)]))
    : null;
  return state.varieties
    .filter((item) => !allowedCategoryIds || allowedCategoryIds.has(item.categoryId))
    .slice()
    .sort((a, b) => entryDisplayName(a).localeCompare(entryDisplayName(b), "sk"))
    .map((item) => `<option value="${item.id}" ${item.id === current ? "selected" : ""}>${escapeHtml(entryDisplayName(item))}</option>`)
    .join("");
}

function renderUniversalCardSpecificFields(cardTypeValue, existing = {}) {
  if (cardTypeValue === "mushroom") {
    const selectedEdibilityValues = normalizeTagList(existing.mushroomEdibilityValues?.length ? existing.mushroomEdibilityValues : existing.mushroomEdibility);
    const selectedGatheringValues = normalizeTagList(existing.mushroomGatheringValues?.length ? existing.mushroomGatheringValues : existing.mushroomGathering);
    return `
      <div class="field-block field-block--mushroom-meta">
        <span>Jedlosť</span>
        <div class="choice-group choice-group--flags">
          ${choiceChipOptions("mushroomEdibility", [
            { value: "edible", label: "Jedlá" },
            { value: "inedible", label: "Nejedlá" },
            { value: "poisonous", label: "Jedovatá" },
            { value: "unknown", label: "Neviem" }
          ], selectedEdibilityValues)}
        </div>
      </div>
      <div class="field-block field-block--mushroom-meta">
        <span>Zber</span>
        <div class="choice-group choice-group--flags">
          ${choiceChipOptions("mushroomGathering", [
            { value: "gather", label: "Zbieram" },
            { value: "skip", label: "Nezbieram" },
            { value: "unknown", label: "Nepoznám" }
          ], selectedGatheringValues)}
        </div>
      </div>
    `;
  }

  if (cardTypeValue === "wild-plant") {
    const selectedTraits = [
      existing.isMedicinal ? "medicinal" : "",
      existing.isPoisonous ? "poisonous" : ""
    ].filter(Boolean);
    return `
      <div class="field-block field-block--full field-block--wild-plant-meta">
        <span>Vlastnosti</span>
        <div class="choice-group choice-group--flags">
          ${choiceChipOptions("wildPlantTraits", [
            { value: "medicinal", label: "Liečivá" },
            { value: "poisonous", label: "Jedovatá" }
          ], selectedTraits)}
        </div>
      </div>
    `;
  }

  if (cardTypeValue === "bird") {
    const resolvedBirdSource = String(
      existing?.birdSource
      || ((existing?.birdSpeciesCode || existing?.birdExternalUrl) ? "ebird" : "manual")
    ).trim() || "manual";
    const isEbirdSource = resolvedBirdSource === "ebird";
    return `
      <input name="birdSpeciesCode" type="hidden" value="${escapeAttribute(existing?.birdSpeciesCode || "")}">
      <input name="birdExternalUrl" type="hidden" value="${escapeAttribute(existing?.birdExternalUrl || "")}">
      <div class="field-block field-block--full">
        <span>Zdroj</span>
        <div class="choice-group choice-group--flags">
          ${singleChoiceChipOptions("birdSource", [
            { value: "ebird", label: "eBird" },
            { value: "manual", label: "Ručne" }
          ], resolvedBirdSource)}
        </div>
      </div>
      <div class="bird-ebird-section" data-bird-ebird-section ${isEbirdSource ? "" : "hidden"}>
        <div class="field-block field-block--full bird-ebird-tools">
          <span>Rýchle doplnenie z eBirdu</span>
          <div class="bird-ebird-tools__actions">
            <button class="button button--soft" type="button" data-bird-ebird-match>Vybrať z eBird</button>
          </div>
          <p class="bird-ebird-tools__status" data-bird-ebird-status>Keď zvolíš zdroj eBird, druh si vieš jedným klikom načítať po slovensky bez ručného vypisovania názvu.</p>
          <div class="bird-ebird-picker" data-bird-ebird-picker hidden>
            <label class="bird-ebird-picker__search">
              <span>Hľadať v eBird zozname</span>
              <input type="text" name="birdEbirdSearch" placeholder="Napr. sýkorka, drozd, bocian, Parus major">
            </label>
            <div class="bird-ebird-picker__list" data-bird-ebird-picker-list></div>
          </div>
        </div>
      </div>
    `;
  }

  if (cardTypeValue === "pest-problem") {
    return `
      ${renderRelationDisclosure({
        summaryLabel: "Týka sa kategórií a karty",
        categoryLabel: "Kategórie",
        categoryInputName: "affectedCategoryIds",
        categoryValues: existing.affectedCategoryIds || existing.affectedCategoryId || "",
        cardLabel: "Týka sa karty",
        cardInputName: "affectedVarietyId",
        cardValue: existing.affectedVarietyId || "",
        cardWrapKey: "affected",
        cardCategoryIds: existing.affectedCategoryIds || existing.affectedCategoryId || ""
      })}
    `;
  }

  if (cardTypeValue === "processing-recipe") {
    return `
      ${renderRelationDisclosure({
        summaryLabel: "Súvisí s kategóriami a kartou",
        categoryLabel: "Kategórie",
        categoryInputName: "relatedCategoryIds",
        categoryValues: existing.relatedCategoryIds || existing.relatedCategoryId || "",
        cardLabel: "Súvisí s kartou",
        cardInputName: "relatedVarietyId",
        cardValue: existing.relatedVarietyId || "",
        cardWrapKey: "related",
        cardCategoryIds: existing.relatedCategoryIds || existing.relatedCategoryId || ""
      })}
    `;
  }

  return "";
}

function openUniversalCardEditor(cardTypeValue = "mushroom", cardId = null, forcedCategoryId = null) {
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--editor");
  const existing = cardId ? normalizeVarietyRecord(state.varieties.find((item) => item.id === cardId) || {}) : null;
  let selectedType = String(cardTypeValue || existing?.cardType || "mushroom");
  let selectedCategoryId = String(
    existing?.id
      ? (existing.categoryId || FALLBACK_CATEGORY_ID)
      : (resolvePreferredCategoryIdForCardType(selectedType, forcedCategoryId || "") || FALLBACK_CATEGORY_ID)
  ).trim() || FALLBACK_CATEGORY_ID;
  let categoryTouched = Boolean(existing?.categoryId);
  let draftImages = normalizeVarietyImages(existing);
  let activeImageIndex = 0;
  let draggedImageIndex = null;
  let birdEbirdTaxonomy = [];
  let birdEbirdPickerOpen = false;
  let birdEbirdPickerQuery = "";

  const renderEditor = () => {
    if (selectedType === "bird") {
      selectedCategoryId = String(resolvePreferredCategoryIdForCardType("bird", selectedCategoryId) || FALLBACK_CATEGORY_ID).trim() || FALLBACK_CATEGORY_ID;
    }
    const showMobileAddTypeBar = !existing
      && typeof document !== "undefined"
      && document.body.classList.contains("app-mobile-shell");
    const birdTitleLink = selectedType === "bird"
      ? String(existing?.birdExternalUrl || "").trim()
      : "";
    detailContent.innerHTML = `
      ${showMobileAddTypeBar ? mobileAddCardTypeBarMarkup(selectedType) : ""}
      <div class="detail-layout detail-layout--editor">
        <div class="detail-image detail-image--editor">
          <button class="gallery-nav gallery-nav--prev" id="gallery-prev" type="button" aria-label="Predchádzajúca fotka">&#8249;</button>
          <img id="variety-preview" src="${escapeAttribute(draftImages[0] || cardPlaceholderImage(selectedType))}" alt="${escapeAttribute(existing?.name || "Nová karta")}">
          <button class="gallery-nav gallery-nav--next" id="gallery-next" type="button" aria-label="Ďalšia fotka">&#8250;</button>
          <div class="detail-image__count" id="gallery-count"></div>
        </div>
        <div class="detail-copy detail-copy--wide detail-copy--editor">
          <div class="detail-copy__headline">
            <h3>${escapeHtml(existing ? entryDisplayName(existing) : cardCreateLabel(selectedType))}</h3>
            <div class="detail-copy__actions">
              <button class="button" type="submit" form="universal-card-form">${existing ? "Uložiť" : cardCreateLabel(selectedType)}</button>
            </div>
          </div>
          ${!showMobileAddTypeBar ? `
            <div class="entry-mode-switch entry-mode-switch--cards" id="card-type-switch">
              ${cardTypeOptionsMarkup(selectedType)}
            </div>
          ` : ""}
          <form class="detail-form detail-form--editor" id="universal-card-form">
            <div class="detail-grid">
              ${selectedType === "bird" ? `
                <div class="field-block field-block--bird-name">
                  <div class="field-block__stack field-block__stack--bird-name">
                    <label class="field-block__subfield">
                      <span class="field-block__subfield-label">Slovenský názov</span>
                      <input name="name" type="text" value="${escapeAttribute(existing?.name || "")}" placeholder="Napr. vrabec domový" required>
                    </label>
                    <label class="field-block__subfield">
                      <span class="field-block__subfield-label">Latinský názov</span>
                      <input name="birdLatinName" type="text" value="${escapeAttribute(existing?.birdLatinName || "")}" placeholder="Napr. Passer domesticus">
                    </label>
                  </div>
                </div>
                <div class="field-block field-block--bird-category">
                  <span>Kategória</span>
                  <select name="categoryId" required>${categoryOptions(selectedCategoryId, { cardTypeValue: selectedType })}</select>
                  <a
                    class="field-block__meta-link field-block__meta-link--bird-category"
                    data-bird-title-link
                    href="${escapeAttribute(birdTitleLink || "#")}"
                    target="_blank"
                    rel="noreferrer noopener"
                    ${birdTitleLink ? "" : "hidden"}
                  >eBird</a>
                </div>
                <div class="field-block field-block--full field-block--bird-observation">
                  <div class="field-block__inline-pair field-block__inline-pair--bird-observation">
                    <label class="field-block__subfield">
                      <span class="field-block__subfield-label">${escapeHtml(cardDateLabel(selectedType))}</span>
                      ${renderDateInput({ id: "universal-card-date", name: "recordedAt", value: existing?.recordedAt || todayISO() })}
                    </label>
                    <label class="field-block__subfield">
                      <span class="field-block__subfield-label">Miesto</span>
                      <input name="birdPlace" type="text" value="${escapeAttribute(existing?.birdPlace || "")}" placeholder="Napr. kŕmidlo, jabloň, lúka za domom">
                    </label>
                  </div>
                  <div class="field-block__subfield field-block__subfield--bird-contact">
                    <span class="field-block__subfield-label">Ako bol vták zachytený</span>
                    <div class="choice-group choice-group--flags choice-group--bird-contact">
                      ${singleChoiceChipOptions("birdContact", [
                        { value: "seen", label: "Videla som ho" },
                        { value: "heard", label: "Počula som ho" },
                        { value: "both", label: "Videla aj počula" }
                      ], existing?.birdContact || "")}
                    </div>
                  </div>
                </div>
              ` : `
                <label class="field-block"><span>Názov</span><input name="name" type="text" value="${escapeAttribute(existing?.name || "")}" placeholder="${escapeAttribute(cardTypeLabel(selectedType))}" required></label>
                <label class="field-block"><span>Kategória</span><select name="categoryId" required>${categoryOptions(selectedCategoryId, { cardTypeValue: selectedType })}</select></label>
                <label class="field-block field-block--full"><span>${escapeHtml(cardDateLabel(selectedType))}</span>${renderDateInput({ id: "universal-card-date", name: "recordedAt", value: existing?.recordedAt || todayISO() })}</label>
              `}
              ${renderUniversalCardSpecificFields(selectedType, existing || {})}
            </div>
            <label class="field-block field-block--full">
              <span>Poznámka</span>
              <textarea class="detail-editor__notes" name="notes" rows="3" placeholder="Krátka poznámka, čo si chceš zapamätať...">${escapeHtml(existing?.notes || "")}</textarea>
            </label>
            <label class="upload-field upload-field--compact">
              <input name="imageFile" type="file" accept="${escapeAttribute(IMAGE_FILE_ACCEPT)}" multiple>
            </label>
            <div class="editor-gallery" id="variety-gallery-editor"></div>
            ${existing ? `
              <div class="danger-zone">
                <button class="button button--danger button--danger-muted" type="button" id="delete-card">Vymazať kartu</button>
              </div>
            ` : ""}
          </form>
        </div>
      </div>
    `;

    const imageInput = document.querySelector('#universal-card-form input[name="imageFile"]');
    const preview = document.getElementById("variety-preview");
    const gallery = document.getElementById("variety-gallery-editor");
    const previousImageButton = document.getElementById("gallery-prev");
    const nextImageButton = document.getElementById("gallery-next");
    const galleryCount = document.getElementById("gallery-count");
    const formEl = document.getElementById("universal-card-form");
    const categorySelectEl = formEl?.elements.categoryId;

    const syncPreview = () => {
      if (!draftImages.length) {
        activeImageIndex = 0;
        preview.src = cardPlaceholderImage(selectedType);
        preview.alt = existing?.name || "Nová karta";
        previousImageButton.hidden = true;
        nextImageButton.hidden = true;
        galleryCount.hidden = true;
      } else {
        activeImageIndex = Math.max(0, Math.min(activeImageIndex, draftImages.length - 1));
        preview.src = draftImages[activeImageIndex];
        preview.alt = `Fotka ${activeImageIndex + 1} záznamu ${entryDisplayName(existing) || "Nová karta"}`;
        previousImageButton.hidden = draftImages.length < 2;
        nextImageButton.hidden = draftImages.length < 2;
        galleryCount.hidden = false;
        galleryCount.textContent = `${activeImageIndex + 1}/${draftImages.length}`;
      }
      syncDetailEditorImagePresentation(preview);
    };

    const moveDraftImage = (fromIndex, toIndex) => {
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= draftImages.length || toIndex >= draftImages.length) return;
      const activeImage = draftImages[activeImageIndex] || "";
      const [movedImage] = draftImages.splice(fromIndex, 1);
      draftImages.splice(toIndex, 0, movedImage);
      const newActiveIndex = draftImages.indexOf(activeImage);
      activeImageIndex = newActiveIndex >= 0 ? newActiveIndex : 0;
    };

    const renderUniversalGalleryEditor = () => {
      syncPreview();
      if (!draftImages.length) {
        gallery.hidden = true;
        gallery.innerHTML = "";
        return;
      }

      gallery.hidden = false;
      gallery.innerHTML = draftImages.map((image, index) => `
            <article class="editor-gallery__mini ${index === 0 ? "is-primary" : ""} ${index === activeImageIndex ? "is-active" : ""}" draggable="true" data-drag-image="${index}" data-drop-image="${index}">
              <button class="editor-gallery__select" type="button" data-image-select="${index}" aria-label="Zobraziť fotku ${index + 1}">
                <img class="editor-gallery__thumb" src="${escapeAttribute(image)}" alt="Fotka ${index + 1}">
                ${index === 0 ? '<span class="editor-gallery__main-badge">hlavná</span>' : ""}
              </button>
              <button class="editor-gallery__remove" type="button" data-image-delete="${index}" aria-label="Vymazať fotku">×</button>
            </article>
          `).join("");

      gallery.querySelectorAll("[data-image-select]").forEach((button) => {
        button.addEventListener("click", () => {
          activeImageIndex = Number(button.dataset.imageSelect || 0);
          renderUniversalGalleryEditor();
        });

        button.addEventListener("dblclick", () => {
          openImageLightbox(draftImages, Number(button.dataset.imageSelect || 0), entryDisplayName(existing) || "Fotka");
        });
      });

      gallery.querySelectorAll("[data-image-delete]").forEach((button) => {
        button.addEventListener("click", () => {
          const deleteIndex = Number(button.dataset.imageDelete || 0);
          draftImages = draftImages.filter((_, index) => index !== deleteIndex);
          if (activeImageIndex >= draftImages.length) activeImageIndex = Math.max(0, draftImages.length - 1);
          renderUniversalGalleryEditor();
        });
      });

      gallery.querySelectorAll("[data-drag-image]").forEach((item) => {
        item.addEventListener("dragstart", () => {
          draggedImageIndex = Number(item.dataset.dragImage || 0);
          item.classList.add("is-dragging");
        });

        item.addEventListener("dragend", () => {
          draggedImageIndex = null;
          item.classList.remove("is-dragging");
          gallery.querySelectorAll(".editor-gallery__mini").forEach((thumb) => thumb.classList.remove("is-drop-target"));
        });

        item.addEventListener("dragover", (event) => {
          event.preventDefault();
          item.classList.add("is-drop-target");
        });

        item.addEventListener("dragleave", () => {
          item.classList.remove("is-drop-target");
        });

        item.addEventListener("drop", (event) => {
          event.preventDefault();
          item.classList.remove("is-drop-target");
          const dropIndex = Number(item.dataset.dropImage || 0);
          if (draggedImageIndex === null) return;
          moveDraftImage(draggedImageIndex, dropIndex);
          renderUniversalGalleryEditor();
        });
      });
    };

    imageInput?.addEventListener("change", async () => {
      const files = Array.from(imageInput.files || []).filter((file) => file instanceof File && file.size);
      if (!files.length) return;
      const newImages = await Promise.all(files.map((file) => fileToOptimizedDataUrl(file, 720, 0.68)));
      draftImages = [...draftImages, ...newImages];
      imageInput.value = "";
      renderUniversalGalleryEditor();
    });

    previousImageButton.addEventListener("click", () => {
      if (!draftImages.length) return;
      activeImageIndex = (activeImageIndex - 1 + draftImages.length) % draftImages.length;
      renderUniversalGalleryEditor();
    });

    nextImageButton.addEventListener("click", () => {
      if (!draftImages.length) return;
      activeImageIndex = (activeImageIndex + 1) % draftImages.length;
      renderUniversalGalleryEditor();
    });

    detailContent.querySelectorAll("[data-card-type]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextType = button.dataset.cardType || selectedType;
        if (nextType === selectedType) return;
        const currentCategoryId = String(categorySelectEl?.value || selectedCategoryId || "").trim();
        selectedCategoryId = String(resolvePreferredCategoryIdForCardType(nextType, currentCategoryId) || FALLBACK_CATEGORY_ID).trim() || FALLBACK_CATEGORY_ID;
        selectedType = nextType;
        if (selectedType === "variety") {
          const targetCategoryId = String(resolvePreferredCategoryIdForCardType("variety", currentCategoryId) || selectedCategoryId || "");
          openVarietyEditor(cardType(existing) === "variety" ? existing?.id || null : null, targetCategoryId || null);
          return;
        }
        renderEditor();
      });
    });

    const syncLinkedVarietySelect = (categoryFieldName, varietyFieldName, wrapKey) => {
      const categoryInputs = [...formEl.querySelectorAll(`input[name="${categoryFieldName}"]`)];
      const varietySelect = formEl.elements[varietyFieldName];
      const varietyWrap = formEl.querySelector(`[data-linked-variety-wrap="${wrapKey}"]`);
      if (!varietySelect || !varietyWrap) return;

      const selectedCategoryIds = () => categoryInputs
        .filter((input) => input.checked)
        .map((input) => String(input.value || "").trim())
        .filter(Boolean);

      const refreshVarietySelect = () => {
        const chosenCategories = selectedCategoryIds();
        const previousValue = String(varietySelect.value || "");
        if (!chosenCategories.length) {
          varietySelect.innerHTML = '<option value="">Bez karty</option>';
          varietySelect.value = "";
          varietyWrap.hidden = true;
          return;
        }
        varietyWrap.hidden = false;
        varietySelect.innerHTML = `<option value="">Bez karty</option>${linkedVarietyOptions(previousValue, chosenCategories)}`;
        if (previousValue) varietySelect.value = previousValue;
      };

      refreshVarietySelect();
      categoryInputs.forEach((input) => {
        input.addEventListener("change", refreshVarietySelect);
      });
    };

    const setupRelationDisclosures = (rootEl) => {
      rootEl.querySelectorAll("[data-relation-disclosure]").forEach((disclosure) => {
        const categoryFieldName = String(disclosure.getAttribute("data-relation-category-input") || "").trim();
        const cardFieldName = String(disclosure.getAttribute("data-relation-card-input") || "").trim();
        const summaryValue = disclosure.querySelector("[data-relation-summary]");
        const cardSelect = rootEl.elements[cardFieldName];
        const categoryInputs = [...rootEl.querySelectorAll(`input[name="${categoryFieldName}"]`)];
        if (!categoryFieldName || !cardFieldName || !summaryValue) return;

        const syncSummary = () => {
          const selectedCategoryIds = categoryInputs
            .filter((input) => input.checked)
            .map((input) => String(input.value || "").trim())
            .filter(Boolean);
          const selectedCardId = String(cardSelect?.value || "").trim();
          summaryValue.textContent = relationDisclosureSummaryText(selectedCategoryIds, selectedCardId);
          disclosure.classList.toggle("has-selection", selectedCategoryIds.length > 0 || Boolean(selectedCardId));
        };

        categoryInputs.forEach((input) => {
          input.addEventListener("change", syncSummary);
        });
        cardSelect?.addEventListener("change", syncSummary);
        syncSummary();
      });
    };

    setupCategoryTreePickers(formEl);
    syncLinkedVarietySelect("affectedCategoryIds", "affectedVarietyId", "affected");
    syncLinkedVarietySelect("relatedCategoryIds", "relatedVarietyId", "related");
    setupRelationDisclosures(formEl);

    categorySelectEl?.addEventListener("change", () => {
      selectedCategoryId = String(categorySelectEl.value || FALLBACK_CATEGORY_ID).trim() || FALLBACK_CATEGORY_ID;
      categoryTouched = true;
    });

    const birdEbirdMatchButton = formEl.querySelector("[data-bird-ebird-match]");
    const birdEbirdStatusEl = formEl.querySelector("[data-bird-ebird-status]");
    const birdEbirdPickerEl = formEl.querySelector("[data-bird-ebird-picker]");
    const birdEbirdPickerListEl = formEl.querySelector("[data-bird-ebird-picker-list]");
    const birdEbirdSearchInput = formEl.elements.birdEbirdSearch;
    const birdSourceInputs = [...formEl.querySelectorAll('input[name="birdSource"]')];
    const birdEbirdSectionEl = formEl.querySelector("[data-bird-ebird-section]");
    const birdSpeciesCodeInput = formEl.elements.birdSpeciesCode;
    const birdExternalUrlInput = formEl.elements.birdExternalUrl;
    const birdTitleLinkEl = formEl.querySelector("[data-bird-title-link]");

    const selectedBirdSource = () => String(formEl.querySelector('input[name="birdSource"]:checked')?.value || "").trim() || "manual";

    const setBirdEbirdStatus = (message, tone = "") => {
      if (!birdEbirdStatusEl) return;
      birdEbirdStatusEl.textContent = message;
      if (tone) {
        birdEbirdStatusEl.setAttribute("data-tone", tone);
      } else {
        birdEbirdStatusEl.removeAttribute("data-tone");
      }
    };

    const syncBirdExternalLinkRow = () => {
      const safeUrl = String(birdExternalUrlInput?.value || "").trim();
      const showLink = selectedBirdSource() === "ebird" && Boolean(safeUrl);
      if (birdTitleLinkEl) {
        birdTitleLinkEl.hidden = !showLink;
        birdTitleLinkEl.href = safeUrl || "#";
        birdTitleLinkEl.textContent = "eBird";
      }
    };

    const syncBirdEbirdSection = () => {
      const isEbirdSource = selectedBirdSource() === "ebird";
      if (birdEbirdSectionEl) birdEbirdSectionEl.hidden = !isEbirdSource;
      [birdSpeciesCodeInput, birdExternalUrlInput, birdEbirdSearchInput].forEach((input) => {
        if (input) input.disabled = !isEbirdSource;
      });
      if (!isEbirdSource) {
        birdEbirdPickerOpen = false;
        renderBirdEbirdPicker();
      }
      syncBirdExternalLinkRow();
    };

    const applyBirdMatchToForm = (match) => {
      if (!match) return;
      const nameInput = formEl.elements.name;
      const latinInput = formEl.elements.birdLatinName;
      const sourceInput = formEl.querySelector('input[name="birdSource"][value="ebird"]');

      if (nameInput && match.comName) {
        nameInput.value = match.comName;
      }
      if (latinInput && match.sciName) {
        latinInput.value = match.sciName;
      }
      if (birdSpeciesCodeInput) {
        birdSpeciesCodeInput.value = match.speciesCode || "";
      }
      if (birdExternalUrlInput) {
        birdExternalUrlInput.value = birdEbirdSpeciesUrl(match.speciesCode);
      }
      if (sourceInput) {
        sourceInput.checked = true;
      }
      syncBirdEbirdSection();
    };

    const renderBirdEbirdPicker = () => {
      if (!birdEbirdPickerEl || !birdEbirdPickerListEl) return;
      birdEbirdPickerEl.hidden = !birdEbirdPickerOpen;
      if (!birdEbirdPickerOpen) return;

      birdEbirdPickerListEl.innerHTML = renderBirdEbirdPickerItems(birdEbirdTaxonomy, birdEbirdPickerQuery);
      birdEbirdPickerListEl.querySelectorAll("[data-bird-ebird-pick]").forEach((button) => {
        button.addEventListener("click", () => {
          const speciesCode = String(button.getAttribute("data-bird-ebird-pick") || "").trim();
          const match = birdEbirdTaxonomy.find((item) => String(item.speciesCode || "").trim() === speciesCode);
          if (!match) return;
          applyBirdMatchToForm(match);
          const existingBirdCards = findExistingBirdCards(match);
          setBirdEbirdStatus(
            existingBirdCards.length
              ? `Vybrala si: ${match.comName}${match.sciName ? ` • ${match.sciName}` : ""}. Tento vták už v appke máš ${countedLabel(existingBirdCards.length, "raz", "razy", "krát")}.`
              : `Vybrala si: ${match.comName}${match.sciName ? ` • ${match.sciName}` : ""}. V appke ho ešte nemáš, bude to nový druh.`,
            "success"
          );
          birdEbirdPickerOpen = false;
          renderBirdEbirdPicker();
        });
      });
    };

    birdEbirdMatchButton?.addEventListener("click", async () => {
      const apiKey = await ensureEbirdApiKey();
      if (!apiKey) {
        setBirdEbirdStatus("Najprv si ulož eBird API kľúč v Nastaveniach, potom sa zoznam načíta jedným klikom.", "error");
        return;
      }

      try {
        setBirdEbirdStatus("Načítavam slovenský zoznam vtákov z eBirdu...");
        birdEbirdTaxonomy = await loadEbirdTaxonomy(apiKey);
        birdEbirdPickerOpen = true;
        birdEbirdPickerQuery = String(formEl.elements.name?.value || formEl.elements.birdLatinName?.value || birdEbirdPickerQuery || "").trim();
        if (birdEbirdSearchInput) birdEbirdSearchInput.value = birdEbirdPickerQuery;
        renderBirdEbirdPicker();
        setBirdEbirdStatus("Zoznam pripravený. Stačí písať názov.", "success");
      } catch (error) {
        console.error(error);
        setBirdEbirdStatus("eBird sa teraz nepodarilo načítať. Skús to o chvíľu znova.", "error");
      }
    });

    birdEbirdSearchInput?.addEventListener("input", () => {
      birdEbirdPickerQuery = String(birdEbirdSearchInput.value || "").trim();
      renderBirdEbirdPicker();
    });

    birdSourceInputs.forEach((input) => {
      input.addEventListener("change", syncBirdEbirdSection);
    });
    birdExternalUrlInput?.addEventListener("input", syncBirdExternalLinkRow);
    syncBirdEbirdSection();

    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(formEl);
      const wildPlantTraits = form.getAll("wildPlantTraits").map((value) => String(value || "").trim()).filter(Boolean);
      const mushroomEdibilityValues = normalizeTagList(form.getAll("mushroomEdibility"));
      const mushroomGatheringValues = normalizeTagList(form.getAll("mushroomGathering"));
      const rawBirdSource = String(form.get("birdSource") || "").trim();
      const normalizedBirdSource = selectedType === "bird"
        ? (rawBirdSource || ((String(form.get("birdSpeciesCode") || "").trim() || String(form.get("birdExternalUrl") || "").trim()) ? "ebird" : "manual"))
        : "";
      const rawCategoryId = String(form.get("categoryId") || FALLBACK_CATEGORY_ID).trim();
      const normalizedCategoryId = selectedType === "bird"
        ? String(resolvePreferredCategoryIdForCardType("bird", rawCategoryId) || rawCategoryId || FALLBACK_CATEGORY_ID).trim() || FALLBACK_CATEGORY_ID
        : rawCategoryId || FALLBACK_CATEGORY_ID;
      const birdSpeciesCode = normalizedBirdSource === "ebird" ? String(form.get("birdSpeciesCode") || "").trim() : "";
      const birdExternalUrl = normalizedBirdSource === "ebird" ? String(form.get("birdExternalUrl") || "").trim() : "";
      const payload = normalizeVarietyRecord({
        ...(existing || {}),
        id: existing?.id || makeId("var"),
        entryKind: "detail",
        cardType: selectedType,
        categoryId: normalizedCategoryId,
        name: String(form.get("name") || "").trim(),
        notes: String(form.get("notes") || "").trim(),
        images: draftImages.slice(),
        image: draftImages[0] || cardPlaceholderImage(selectedType),
        recordedAt: String(form.get("recordedAt") || ""),
        mushroomEdibilityValues,
        mushroomEdibility: mushroomEdibilityValues[0] || "",
        mushroomGatheringValues,
        mushroomGathering: mushroomGatheringValues[0] || "",
        isMedicinal: wildPlantTraits.includes("medicinal"),
        isPoisonous: wildPlantTraits.includes("poisonous"),
        birdSpeciesCode,
        birdLatinName: String(form.get("birdLatinName") || "").trim(),
        birdPlace: String(form.get("birdPlace") || "").trim(),
        birdExternalUrl,
        birdSource: normalizedBirdSource,
        birdContact: String(form.get("birdContact") || "").trim(),
        birdConfidence: "",
        affectedCategoryIds: form.getAll("affectedCategoryIds").map((value) => String(value || "").trim()).filter(Boolean),
        affectedCategoryId: String(form.getAll("affectedCategoryIds")[0] || ""),
        affectedVarietyId: String(form.get("affectedVarietyId") || ""),
        relatedCategoryIds: form.getAll("relatedCategoryIds").map((value) => String(value || "").trim()).filter(Boolean),
        relatedCategoryId: String(form.getAll("relatedCategoryIds")[0] || ""),
        relatedVarietyId: String(form.get("relatedVarietyId") || ""),
        type: existing?.type || "",
        breedingType: existing?.breedingType || "",
        sowingWindow: existing?.sowingWindow || "",
        sowingWindowAuto: existing?.sowingWindowAuto || false,
        transplantedAt: existing?.transplantedAt || "",
        status: existing?.status || "",
        place: "",
        places: [],
        rating: existing?.rating || 0,
        top: existing?.top || false,
        notGrowingThisYear: existing?.notGrowingThisYear || false,
        avoidNextYear: existing?.avoidNextYear || false,
        neverGrown: existing?.neverGrown || false,
        sowedAt: existing?.sowedAt || ""
      });

      if (!payload.name) return;

      if (existing) {
        const index = state.varieties.findIndex((item) => item.id === existing.id);
        if (index >= 0) state.varieties[index] = payload;
      } else {
        state.varieties.unshift(payload);
      }

      if (!persist()) return;
      render();
      detailModal.close();
    });

    document.getElementById("delete-card")?.addEventListener("click", () => {
      if (!existing) return;
      setUndoState({
        type: "variety",
        variety: clone(existing)
      });
      state.varieties = state.varieties.filter((item) => item.id !== existing.id);
      if (!persist()) return;
      render();
      detailModal.close();
    });

    preview.addEventListener("click", () => {
      if (!draftImages.length) return;
      openImageLightbox(draftImages, activeImageIndex, entryDisplayName(existing) || "Fotka");
    });

    renderUniversalGalleryEditor();
  };

  renderEditor();
  openDetailModalDialog();
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

function siblingVarietyIndexes(categoryId) {
  return state.varieties.reduce((indexes, item, index) => {
    if (item.categoryId === categoryId) indexes.push(index);
    return indexes;
  }, []);
}

function moveVariety(varietyId, direction) {
  const variety = state.varieties.find((item) => item.id === varietyId);
  if (!variety) return;

  const siblingIndexes = siblingVarietyIndexes(variety.categoryId);
  const currentGlobalIndex = state.varieties.findIndex((item) => item.id === varietyId);
  const currentIndex = siblingIndexes.indexOf(currentGlobalIndex);
  const targetIndex = currentIndex + direction;
  if (currentIndex === -1 || targetIndex < 0 || targetIndex >= siblingIndexes.length) return;

  const targetGlobalIndex = siblingIndexes[targetIndex];
  const targetVariety = state.varieties[targetGlobalIndex];
  state.varieties[currentGlobalIndex] = targetVariety;
  state.varieties[targetGlobalIndex] = variety;

  if (!persist()) {
    state.varieties[currentGlobalIndex] = variety;
    state.varieties[targetGlobalIndex] = targetVariety;
    return;
  }

  render();
  openVarietyEditor(varietyId);
}

function moveCategory(categoryId, direction) {
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

function categoryBreadcrumb(categoryId) {
  const items = [];
  const visited = new Set();
  let current = state.categories.find((item) => item.id === categoryId) || null;
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    items.unshift({ id: current.id, name: current.name });
    current = current.parentCategoryId ? state.categories.find((item) => item.id === current.parentCategoryId) || null : null;
  }
  return items;
}

function ensureActiveCategory() {
  const validCategories = state.categories;
  if (!validCategories.find((item) => item.id === activeCategoryId)) {
    activeCategoryId = validCategories[0]?.id || null;
  }
}

function categoryName(categoryId) {
  return state.categories.find((item) => item.id === categoryId)?.name || "Kategória";
}

function entryKind(item) {
  return String(item?.entryKind || "detail");
}

function isDetailEntry(item) {
  return entryKind(item) === "detail";
}

function isQuickEntry(item) {
  return entryKind(item) === "quick";
}

function isGalleryEntry(item) {
  return entryKind(item) === "gallery";
}

function entryKindLabel(item) {
  if (isQuickEntry(item)) return "Rýchly záznam";
  if (isGalleryEntry(item)) return "Galéria";
  return item?.type || "";
}

function entryDisplayName(item) {
  const name = String(item?.name || "").trim();
  if (name) return name;
  if (isQuickEntry(item)) return "Rýchly záznam";
  if (isGalleryEntry(item)) return "Galéria";
  return "Bez názvu";
}

function inferBreedingType(item) {
  if (typeof item?.breedingType === "string" && item.breedingType) return item.breedingType;
  if (/\bF1\b/i.test(String(item?.name || ""))) return "hybrid";
  return (item?.entryKind === "gallery" || item?.entryKind === "quick") ? "" : "open";
}

function breedingTypeLabel(value) {
  const labels = {
    hybrid: "hybridná F1",
    open: "nehybridná"
  };
  return labels[value] || "";
}

function normalizePersistedState(parsed = {}) {
  const normalizedVarieties = (parsed.varieties || clone(seedVarieties)).map(normalizeVarietyRecord);
  const normalizedTasks = (parsed.customTasks || clone(seedTasks)).map((task) => normalizeTaskRecord(task, normalizedVarieties));
  const normalizedJournal = (parsed.journal || clone(seedJournal)).map((entry) => normalizeJournalEntry(entry, normalizedVarieties));
  const categories = sanitizeCategoryHierarchy(ensureRootCategories((parsed.categories || clone(seedCategories)).map((item) => ({
    group: "Moje kategórie",
    parentCategoryId: "",
    nodeType: "kind",
    color: "#7e9f4b",
    image: "",
    recommendedSowingWindow: "",
    sowedAt: "",
    ...item
  })).map(applyDefaultParenting)));
  const promoted = promoteLegacyNamedCategories(categories, normalizedVarieties, normalizedTasks, normalizedJournal);
  return {
    categories: enforceFixedCategoryNames(promoted.categories),
    varieties: promoted.varieties,
    customTasks: promoted.customTasks,
    journal: promoted.journal,
    autoTasks: Array.isArray(parsed.autoTasks) ? parsed.autoTasks : []
  };
}

function enforceFixedCategoryNames(categories = []) {
  const fixedNames = {
    "cat-huby": "Huby a hríby"
  };
  return categories.map((item) => {
    const fixedName = fixedNames[String(item?.id || "").trim()];
    if (!fixedName) return item;
    return {
      ...item,
      name: fixedName
    };
  });
}

function serializeStateSnapshot() {
  return {
    categories: state.categories,
    varieties: state.varieties,
    customTasks: state.customTasks,
    journal: state.journal,
    autoTasks: state.autoTasks
  };
}

function exportFileTimestamp(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

function exportStateEnvelope() {
  return {
    app: "Moja záhrada",
    schema: STORAGE_KEY,
    exportedAt: new Date().toISOString(),
    state: serializeStateSnapshot()
  };
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
  try {
    localStorage.setItem(RESET_BACKUP_KEY, JSON.stringify({
      savedAt: new Date().toISOString(),
      reason: "before-import",
      state: snapshot
    }));
  } catch (error) {
    return false;
  }
  return true;
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
    throw new Error("Vybraný súbor nie je platný JSON export.");
  }
  const previousState = serializeStateSnapshot();
  const nextState = normalizeImportedStatePayload(parsed);
  saveImportBackupSnapshot(previousState);
  const previousActiveCategoryId = activeCategoryId;
  state = nextState;
  if (!state.categories.some((item) => item.id === activeCategoryId)) {
    activeCategoryId = state.categories[0]?.id || null;
  }
  if (!persist()) {
    state = normalizePersistedState(previousState);
    activeCategoryId = previousActiveCategoryId;
    persist();
    throw new Error("Import sa načítal, ale nový stav sa nepodarilo bezpečne uložiť.");
  }
  render();
  return {
    varieties: state.varieties.length,
    tasks: state.customTasks.length,
    journal: state.journal.length
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return normalizePersistedState(JSON.parse(raw));
    }

    const legacyRaw = localStorage.getItem("moja-zahrada-v1");
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      return migrateLegacyState(legacy);
    }
  } catch (error) {
    return defaultState();
  }

  return defaultState();
}

function defaultState() {
  const normalizedVarieties = clone(seedVarieties).map(normalizeVarietyRecord);
  const normalizedTasks = clone(seedTasks).map((task) => normalizeTaskRecord(task, normalizedVarieties));
  const normalizedJournal = clone(seedJournal).map((entry) => normalizeJournalEntry(entry, normalizedVarieties));
  const promoted = promoteLegacyNamedCategories(
    sanitizeCategoryHierarchy(clone(seedCategories)),
    normalizedVarieties,
    normalizedTasks,
    normalizedJournal
  );
  return {
    categories: enforceFixedCategoryNames(promoted.categories),
    varieties: promoted.varieties,
    customTasks: promoted.customTasks,
    journal: promoted.journal,
    autoTasks: []
  };
}

function migrateLegacyState(legacy) {
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
    sanitizeCategoryHierarchy(ensureRootCategories(categories.map((item) => ({ group: "Moje kategórie", parentCategoryId: "", nodeType: "kind", color: "#7e9f4b", image: "", recommendedSowingWindow: "", sowedAt: "", ...item })).map(applyDefaultParenting))),
    normalizedVarieties,
    normalizedTasks,
    normalizedJournal
  );

  return {
    categories: enforceFixedCategoryNames(promoted.categories),
    varieties: promoted.varieties,
    customTasks: promoted.customTasks,
    journal: promoted.journal,
    autoTasks: []
  };
}

function persist() {
  const serializedState = JSON.stringify(serializeStateSnapshot());
  try {
    localStorage.removeItem(RESET_BACKUP_KEY);
    const folderStorage = loadFolderStoragePreferences();
    if (folderStorage.enabled) {
      try {
        localStorage.setItem(STORAGE_KEY, serializedState);
      } catch (browserStorageError) {
        console.warn("Nepodarilo sa ponechať browserovú poistku stavu.", browserStorageError);
      }
      queueFolderStorageWrite(serializedState);
      return true;
    }
    localStorage.setItem(STORAGE_KEY, serializedState);
    return true;
  } catch (error) {
    const folderStorageHint = supportsFolderStorage()
      ? " V Nastaveniach si môžeš dočasne zapnúť ukladanie do priečinka v počítači."
      : "";
    alert(`Uloženie sa nepodarilo. Dáta sú už asi príliš veľké pre úložisko prehliadača. Najčastejšie to robia fotky.${folderStorageHint}`);
    return false;
  }
}

function progressCard(title, meta, value, tone, actionsHtml = "") {
  return `
    <article class="progress-card">
      <h3>${escapeHtml(title)}</h3>
      <p class="progress-card__meta">${escapeHtml(meta)}</p>
      <div class="progress-bar ${tone === "danger" ? "progress-bar--danger" : "progress-bar--good"}">
        <span style="width:${value}%"></span>
      </div>
      ${actionsHtml ? `<div class="progress-card__actions">${actionsHtml}</div>` : ""}
    </article>
  `;
}

function miniItem(title, meta, varietyId = "", options = {}) {
  const clickable = Boolean(varietyId);
  const badge = String(options.badge || "").trim();
  const badgeClass = badge ? ` mini-item__badge--${badge.toLowerCase()}` : "";
  return `
    <article class="mini-item ${clickable ? "mini-item--clickable" : ""}" ${clickable ? `data-open-mini-variety="${escapeAttribute(varietyId)}" tabindex="0" role="button" aria-label="Otvoriť kartu ${escapeAttribute(title)}"` : ""}>
      ${badge ? `<span class="mini-item__badge${badgeClass}">${escapeHtml(badge)}</span>` : ""}
      <p class="mini-item__title">${escapeHtml(title)}</p>
      <p class="mini-item__meta">${escapeHtml(meta)}</p>
    </article>
  `;
}

function renderJournalItem(entry, deleteAttr, editAttr = "") {
  const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
  const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(entry.id)}"` : "";
  const editAttribute = editAttr ? `${editAttr}="${escapeAttribute(entry.id)}"` : "";
  const images = journalImages(normalizedEntry);
  const video = journalVideo(normalizedEntry);
  const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length });
  const displayTitle = journalDisplayTitle(normalizedEntry);
  const titleOnlyClass = !images.length && !video && !String(normalizedEntry.text || "").trim() && !walkMarkup ? "journal-item--title-only" : "";
  const chips = journalDisplayChips(normalizedEntry);
  const weatherWidgets = renderJournalWeatherWidgets(journalHeaderWeather(normalizedEntry));
  const headerWeatherWidgets = weatherWidgets;
  const footerChips = chips;
  return `
    <article class="journal-item ${images.length ? "journal-item--with-image" : ""} ${titleOnlyClass}">
      <div class="journal-item__header">
        <div class="journal-item__header-main">
          <div class="journal-item__topline">
            <span class="journal-item__date-badge">${journalDateLabel(normalizedEntry.date)}</span>
            ${headerWeatherWidgets}
          </div>
          <div class="journal-item__title-wrap">
            <strong class="journal-item__title">${escapeHtml(displayTitle)}</strong>
            ${renderMoodBadge(normalizedEntry.mood)}
          </div>
        </div>
        <div class="task-item__side journal-item__actions">
          ${editAttr ? `<button class="button button--ghost journal-item__action" type="button" ${editAttribute} aria-label="Upraviť záznam" title="Upraviť">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
              <path d="M13 7l4 4"></path>
            </svg>
          </button>` : ""}
          ${deleteAttr ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="Vymazať záznam" title="Vymazať">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M8 7l1 12h6l1-12"></path>
              <path d="M10 10v6"></path>
              <path d="M14 10v6"></path>
            </svg>
          </button>` : ""}
        </div>
      </div>
      ${normalizedEntry.text ? `<p class="task-item__meta journal-item__meta">${escapeHtml(normalizedEntry.text)}</p>` : ""}
      ${walkMarkup}
      ${renderJournalVideoPlayer(video, `Video zápisu ${displayTitle}`)}
      ${images.length ? `
        <div class="journal-item__gallery">
          ${images.slice(0, 4).map((image, index) => `
            <button class="journal-item__image" type="button" data-open-journal-image="${escapeAttribute(normalizedEntry.id)}" data-journal-image-index="${index}" aria-label="Otvoriť fotku zápisu ${escapeAttribute(displayTitle)}">
              <img src="${escapeAttribute(image)}" alt="${escapeAttribute(displayTitle)}">
            </button>
          `).join("")}
          ${images.length > 4 ? `<span class="journal-item__more">+${images.length - 4}</span>` : ""}
        </div>
      ` : ""}
      ${footerChips.length ? `<div class="journal-item__chips">${footerChips.map(renderJournalChip).join("")}</div>` : ""}
    </article>
  `;
}

function renderJournalManagerCard(entry, deleteAttr = "data-delete-worklog-journal") {
  const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
  const rawId = String(normalizedEntry.id || makeId("journal"));
  const rawTitle = journalDisplayTitle(normalizedEntry);
  const rawText = String(normalizedEntry.text || "").trim();
  const previewText = rawText.length > 220 ? `${rawText.slice(0, 217).trimEnd()}...` : rawText;
  const rawDate = String(normalizedEntry.date || todayISO()).trim() || todayISO();
  const images = journalImages(normalizedEntry);
  const video = journalVideo(normalizedEntry);
  const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length });
  const chips = journalDisplayChips(normalizedEntry);
  const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(rawId)}"` : "";

  return `
    <article style="display:grid;gap:10px;padding:16px 18px;border:1px solid rgba(122,103,74,0.14);border-radius:22px;background:linear-gradient(180deg, rgba(255,252,247,0.98), rgba(245,239,227,0.98));box-shadow:0 8px 18px rgba(39,32,19,0.05);">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:start;">
        <div style="display:grid;gap:8px;min-width:0;">
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
            <span style="display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 14px;border-radius:999px;background:rgba(247,242,229,0.98);border:1px solid rgba(138,121,88,0.24);color:#74624a;font-size:0.88rem;font-weight:800;white-space:nowrap;">${escapeHtml(journalDateLabel(rawDate))}</span>
          </div>
          <div style="display:flex;gap:10px;align-items:flex-start;justify-content:space-between;min-width:0;">
            <strong style="margin:0;color:#1f2918;font-size:1.08rem;line-height:1.24;min-width:0;">${escapeHtml(rawTitle)}</strong>
            ${renderMoodBadge(normalizedEntry.mood)}
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="Vymazať záznam" title="Vymazať">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M8 7l1 12h6l1-12"></path>
              <path d="M10 10v6"></path>
              <path d="M14 10v6"></path>
            </svg>
          </button>
        </div>
      </div>
      ${previewText ? `<p style="margin:0;color:#65735b;line-height:1.45;">${escapeHtml(previewText)}</p>` : ""}
      ${walkMarkup}
      ${renderJournalVideoPlayer(video, `Video zápisu ${rawTitle}`)}
      ${images[0] ? `
        <div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;">
          <button type="button" data-open-journal-image="${escapeAttribute(rawId)}" data-journal-image-index="0" aria-label="Otvoriť fotku zápisu ${escapeAttribute(rawTitle)}" style="width:132px;height:132px;padding:0;border:1px solid rgba(122,103,74,0.14);border-radius:18px;overflow:hidden;background:#fff;cursor:pointer;">
            <img src="${escapeAttribute(images[0])}" alt="${escapeAttribute(rawTitle)}" style="display:block;width:100%;height:100%;object-fit:cover;object-position:center;">
          </button>
          ${images.length > 1 ? `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:52px;padding:0 12px;border-radius:16px;background:rgba(255,248,221,0.94);border:1px solid rgba(186,155,90,0.32);color:#7f6324;font-weight:800;">+${images.length - 1}</span>` : ""}
        </div>
      ` : ""}
      ${chips.length ? `<div class="journal-item__chips">${chips.map(renderJournalChip).join("")}</div>` : ""}
    </article>
  `;
}

function renderJournalItemSimple(entry, deleteAttr = "", editAttr = "") {
  const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
  const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(entry.id)}"` : "";
  const editAttribute = editAttr ? `${editAttr}="${escapeAttribute(entry.id)}"` : "";
  const images = journalImages(normalizedEntry);
  const video = journalVideo(normalizedEntry);
  const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length });
  const previewText = trimText(normalizedEntry.text || "", 180);
  const displayTitle = journalDisplayTitle(normalizedEntry);

  return `
    <article class="journal-item journal-item--simple">
      <div class="journal-item__header">
        <div class="journal-item__header-main">
          <div class="journal-item__topline">
            <span class="journal-item__date-badge">${journalDateLabel(normalizedEntry.date)}</span>
          </div>
          <div class="journal-item__title-wrap">
            <strong class="journal-item__title">${escapeHtml(displayTitle)}</strong>
            ${renderMoodBadge(normalizedEntry.mood)}
          </div>
        </div>
        <div class="task-item__side journal-item__actions">
          ${editAttr ? `<button class="button button--ghost journal-item__action" type="button" ${editAttribute} aria-label="Upraviť záznam" title="Upraviť">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
              <path d="M13 7l4 4"></path>
            </svg>
          </button>` : ""}
          ${deleteAttr ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="Vymazať záznam" title="Vymazať">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M8 7l1 12h6l1-12"></path>
              <path d="M10 10v6"></path>
              <path d="M14 10v6"></path>
            </svg>
          </button>` : ""}
        </div>
      </div>
      ${previewText ? `<p class="task-item__meta journal-item__meta">${escapeHtml(previewText)}</p>` : ""}
      ${walkMarkup}
      ${renderJournalVideoPlayer(video, `Video zápisu ${displayTitle}`)}
      ${images[0] ? `
        <div class="journal-item__gallery">
          <button class="journal-item__image" type="button" data-open-journal-image="${escapeAttribute(normalizedEntry.id)}" data-journal-image-index="0" aria-label="Otvoriť fotku zápisu ${escapeAttribute(displayTitle)}">
            <img src="${escapeAttribute(images[0])}" alt="${escapeAttribute(displayTitle)}">
          </button>
          ${images.length > 1 ? `<span class="journal-item__more">+${images.length - 1}</span>` : ""}
        </div>
      ` : ""}
    </article>
  `;
}

function renderJournalItemEmergency(entry, deleteAttr = "", editAttr = "") {
  const normalizedEntry = normalizeJournalEntry(entry, state.varieties);
  const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(entry.id)}"` : "";
  const editAttribute = editAttr ? `${editAttr}="${escapeAttribute(entry.id)}"` : "";
  const images = journalImages(normalizedEntry);
  const video = journalVideo(normalizedEntry);
  const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length });
  const previewText = trimText(normalizedEntry.text || "", 220);
  const displayTitle = journalDisplayTitle(normalizedEntry);

  return `
    <article style="display:grid;gap:10px;padding:16px 18px;border:1px solid rgba(122,103,74,0.14);border-radius:22px;background:linear-gradient(180deg, rgba(255,252,247,0.98), rgba(245,239,227,0.98));box-shadow:0 8px 18px rgba(39,32,19,0.05);">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:start;">
        <div style="display:grid;gap:8px;min-width:0;">
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
            <span style="display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 14px;border-radius:999px;background:rgba(247,242,229,0.98);border:1px solid rgba(138,121,88,0.24);color:#74624a;font-size:0.88rem;font-weight:800;white-space:nowrap;">${journalDateLabel(normalizedEntry.date)}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;min-width:0;">
            <strong style="margin:0;color:#1f2918;font-size:1.08rem;line-height:1.24;">${escapeHtml(displayTitle)}</strong>
            ${renderMoodBadge(normalizedEntry.mood)}
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          ${editAttr ? `<button class="button button--ghost journal-item__action" type="button" ${editAttribute} aria-label="Upraviť záznam" title="Upraviť">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
              <path d="M13 7l4 4"></path>
            </svg>
          </button>` : ""}
          ${deleteAttr ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="Vymazať záznam" title="Vymazať">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M8 7l1 12h6l1-12"></path>
              <path d="M10 10v6"></path>
              <path d="M14 10v6"></path>
            </svg>
          </button>` : ""}
        </div>
      </div>
      ${previewText ? `<p style="margin:0;color:#65735b;line-height:1.45;">${escapeHtml(previewText)}</p>` : ""}
      ${walkMarkup}
      ${renderJournalVideoPlayer(video, `Video zápisu ${displayTitle}`)}
      ${images[0] ? `
        <div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;">
          <button type="button" data-open-journal-image="${escapeAttribute(normalizedEntry.id)}" data-journal-image-index="0" aria-label="Otvoriť fotku zápisu ${escapeAttribute(displayTitle)}" style="width:132px;height:132px;padding:0;border:1px solid rgba(122,103,74,0.14);border-radius:18px;overflow:hidden;background:#fff;cursor:pointer;">
            <img src="${escapeAttribute(images[0])}" alt="${escapeAttribute(displayTitle)}" style="display:block;width:100%;height:100%;object-fit:cover;object-position:center;">
          </button>
          ${images.length > 1 ? `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:52px;padding:0 12px;border-radius:16px;background:rgba(255,248,221,0.94);border:1px solid rgba(186,155,90,0.32);color:#7f6324;font-weight:800;">+${images.length - 1}</span>` : ""}
        </div>
      ` : ""}
    </article>
  `;
}

function bindMiniVarietyOpen(container) {
  if (!container) return;
  container.querySelectorAll("[data-open-mini-variety]").forEach((item) => {
    const openMiniVariety = () => {
      const varietyId = item.dataset.openMiniVariety;
      if (!varietyId) return;
      if (detailModal.open) detailModal.close();
      openStoredCardEditor(varietyId);
    };

    item.addEventListener("click", openMiniVariety);
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openMiniVariety();
    });
  });
}

function openStoredCardEditor(varietyId) {
  const existing = state.varieties.find((item) => item.id === varietyId);
  if (!existing) return;
  if (cardType(existing) === "variety") {
    openVarietyEditor(varietyId);
    return;
  }
  openUniversalCardEditor(cardType(existing), varietyId);
}

function statusLabel(status) {
  const labels = {
    planned: "plánujem",
    sown: "vysiate",
    transplanted: "vysadené",
    harvested: "zber"
  };
  return labels[status] || "";
}

function normalizeStatusList(value) {
  const orderedValues = ["planned", "sown", "transplanted", "harvested"];
  const values = new Set(normalizeTagList(value).map((item) => String(item || "").trim()).filter(Boolean));
  return orderedValues.filter((item) => values.has(item));
}

function finalizeVarietyStatusValues(statusValues = [], { sowedAt = "", transplantedAt = "", harvestedAt = "" } = {}) {
  const values = new Set(normalizeStatusList(statusValues));
  if (String(sowedAt || "").trim()) values.add("sown");
  if (String(transplantedAt || "").trim()) values.add("transplanted");
  if (String(harvestedAt || "").trim()) values.add("harvested");
  if (values.has("sown") || values.has("transplanted") || values.has("harvested")) {
    values.delete("planned");
  }
  return ["planned", "sown", "transplanted", "harvested"].filter((itemId) => values.has(itemId));
}

function varietyStatusValues(item) {
  return finalizeVarietyStatusValues(item?.statusValues?.length ? item.statusValues : item?.status, {
    sowedAt: item?.sowedAt,
    transplantedAt: item?.transplantedAt,
    harvestedAt: item?.harvestedAt
  });
}

function primaryStatusValue(statusValues = []) {
  const values = new Set(normalizeStatusList(statusValues));
  if (values.has("harvested")) return "harvested";
  if (values.has("transplanted")) return "transplanted";
  if (values.has("sown")) return "sown";
  if (values.has("planned")) return "planned";
  return "";
}

function statusOptions(current) {
  return [
    ["", "Bez stavu"],
    ["planned", "Plánujem"],
    ["sown", "Vysiate"],
    ["transplanted", "Vysadené"],
    ["harvested", "Zber"]
  ].map(([value, label]) => `<option value="${value}" ${value === current ? "selected" : ""}>${label}</option>`).join("");
}

function choiceChipOptions(inputName, options = [], selectedValues = []) {
  const selected = new Set((Array.isArray(selectedValues) ? selectedValues : [selectedValues])
    .map((value) => String(value || "").trim())
    .filter(Boolean));
  return options.map((option) => `
    <label class="choice-chip">
      <input type="checkbox" name="${escapeAttribute(inputName)}" value="${escapeAttribute(option.value)}" ${selected.has(option.value) ? "checked" : ""}>
      <span>${escapeHtml(option.label)}</span>
    </label>
  `).join("");
}

function singleChoiceChipOptions(inputName, options = [], currentValue = "") {
  const selectedValue = String(currentValue || "").trim();
  return options.map((option) => `
    <label class="choice-chip">
      <input type="radio" name="${escapeAttribute(inputName)}" value="${escapeAttribute(option.value)}" ${selectedValue === String(option.value || "").trim() ? "checked" : ""}>
      <span>${escapeHtml(option.label)}</span>
    </label>
  `).join("");
}

function placeChoiceOptions(currentValues = []) {
  return choiceChipOptions("places", PLACE_OPTIONS, normalizePlaceList(currentValues));
}

function categoryOptions(current, options = {}) {
  const orderedForSelect = [
    ...orderedCategories().filter((item) => item.id !== FALLBACK_CATEGORY_ID),
    ...orderedCategories().filter((item) => item.id === FALLBACK_CATEGORY_ID)
  ];
  const requestedType = String(options?.cardTypeValue || "").trim();
  const resolvedCurrent = requestedType === "bird" && current === "cat-zvierata" && state.categories.some((item) => item.id === "cat-vtaky")
    ? "cat-vtaky"
    : current;
  if (!requestedType || requestedType === "variety") {
    return orderedForSelect.map((item) => `<option value="${item.id}" ${item.id === resolvedCurrent ? "selected" : ""}>${escapeHtml(formattedCategoryOptionLabel(item))}</option>`).join("");
  }

  const compatibleCategories = orderedForSelect.filter((item) => item.id !== FALLBACK_CATEGORY_ID && isCategoryCompatibleWithCardType(requestedType, item.id));
  const currentCategory = orderedForSelect.find((item) => item.id === resolvedCurrent);
  const filteredCategories = currentCategory && !compatibleCategories.some((item) => item.id === currentCategory.id)
    ? [currentCategory, ...compatibleCategories]
    : compatibleCategories;
  const categoriesForSelect = filteredCategories.length ? filteredCategories : orderedForSelect;

  return categoriesForSelect.map((item) => `<option value="${item.id}" ${item.id === resolvedCurrent ? "selected" : ""}>${escapeHtml(formattedCategoryOptionLabel(item))}</option>`).join("");
}

function orderedPickerCategories() {
  return [
    ...orderedCategories().filter((item) => item.id !== FALLBACK_CATEGORY_ID),
    ...orderedCategories().filter((item) => item.id === FALLBACK_CATEGORY_ID)
  ];
}

function categoryChoiceSummaryText(selectedValues = []) {
  const selectedSet = new Set(normalizeIdList(selectedValues));
  const names = orderedPickerCategories()
    .filter((item) => selectedSet.has(item.id))
    .map((item) => item.name);

  if (!names.length) return "Zatiaľ nič nevybraté";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]}, ${names[1]}`;
  return `${names[0]}, ${names[1]} +${names.length - 2}`;
}

function relationDisclosureSummaryText(selectedCategoryValues = [], linkedCardId = "") {
  const categoryCount = normalizeIdList(selectedCategoryValues).length;
  const linkedCardCount = linkedCardId ? 1 : 0;

  if (!categoryCount && !linkedCardCount) {
    return "Zatiaľ nič nepripojené";
  }

  const parts = [];
  if (categoryCount) parts.push(countedLabel(categoryCount, "kategória", "kategórie", "kategórií"));
  if (linkedCardCount) parts.push(countedLabel(linkedCardCount, "karta", "karty", "kariet"));
  return parts.join(" • ");
}

function renderCategoryChoiceScopeTabs() {
  const roots = orderedPickerCategories().filter((item) => !String(item.parentCategoryId || "").trim());
  return `
    <div class="category-tree-picker__scopes" data-category-tree-scopes>
      <button class="category-tree-picker__scope is-active" type="button" data-category-tree-scope="all">Všetko</button>
      <button class="category-tree-picker__scope" type="button" data-category-tree-scope="selected">Vybrané</button>
      ${roots.map((item) => `<button class="category-tree-picker__scope" type="button" data-category-tree-scope="${escapeAttribute(item.id)}">${escapeHtml(item.name)}</button>`).join("")}
    </div>
  `;
}

function renderCategoryChoiceSelectedTags(selectedValues = []) {
  const selectedSet = new Set(normalizeIdList(selectedValues));
  const selectedItems = orderedPickerCategories().filter((item) => selectedSet.has(item.id));

  if (!selectedItems.length) {
    return "";
  }

  const previewItems = selectedItems.slice(0, 6);
  return `
    <div class="category-tree-picker__tags">
      ${previewItems.map((item) => `
        <button class="tag category-tree-picker__tag" type="button" data-category-tree-remove="${escapeAttribute(item.id)}" title="Odobrať ${escapeAttribute(item.name)}">
          <span>${escapeHtml(item.name)}</span>
          <span class="category-tree-picker__tag-remove" aria-hidden="true">×</span>
        </button>
      `).join("")}
      ${selectedItems.length > previewItems.length ? `<span class="tag category-tree-picker__tag category-tree-picker__tag--muted">+${selectedItems.length - previewItems.length} ďalšie</span>` : ""}
    </div>
  `;
}

function renderCategoryChoiceTreeNodes(inputName, parentId = "", selectedSet = new Set(), expandedSet = new Set(), depth = 0, rootId = "") {
  const childMap = orderedPickerCategories().reduce((map, item) => {
    const key = String(item.parentCategoryId || "");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
    return map;
  }, new Map());

  const nodes = childMap.get(String(parentId || "")) || [];
  return nodes.map((item) => {
    const childItems = childMap.get(item.id) || [];
    const hasChildren = childItems.length > 0;
    const branchId = `tree-branch-${inputName}-${item.id}`;
    const isExpanded = hasChildren && expandedSet.has(item.id);
    const searchLabel = [item.name, formattedCategoryOptionLabel(item)].filter(Boolean).join(" ");
    const activeRootId = depth === 0 ? item.id : rootId;

    return `
      <div class="category-tree-picker__node ${hasChildren ? "has-children" : ""}" style="--tree-depth:${depth}" data-category-tree-node data-category-tree-id="${escapeAttribute(item.id)}" data-category-tree-root="${escapeAttribute(activeRootId)}" data-category-tree-depth="${depth}" data-category-tree-search="${escapeAttribute(slugify(searchLabel))}">
        <div class="category-tree-picker__row">
          ${hasChildren
            ? `<button class="category-tree-picker__expander ${isExpanded ? "is-open" : ""}" type="button" data-category-tree-expander aria-expanded="${isExpanded ? "true" : "false"}" aria-controls="${escapeAttribute(branchId)}" title="${isExpanded ? "Zbaliť vetvu" : "Rozbaliť vetvu"}"><span aria-hidden="true">›</span></button>`
            : '<span class="category-tree-picker__expander-spacer" aria-hidden="true"></span>'}
          <label class="category-tree-picker__option ${selectedSet.has(item.id) ? "is-selected" : ""}">
            <input class="category-tree-picker__checkbox" type="checkbox" name="${escapeAttribute(inputName)}" value="${escapeAttribute(item.id)}" ${selectedSet.has(item.id) ? "checked" : ""}>
            <span class="category-tree-picker__option-text">${escapeHtml(item.name)}</span>
          </label>
        </div>
        ${hasChildren ? `<div class="category-tree-picker__children" id="${escapeAttribute(branchId)}" ${isExpanded ? "" : "hidden"}>${renderCategoryChoiceTreeNodes(inputName, item.id, selectedSet, expandedSet, depth + 1, activeRootId)}</div>` : ""}
      </div>
    `;
  }).join("");
}

function renderCategoryChoiceChips(inputName, selectedValues = [], selectionMode = "multiple") {
  const isMobileTree = typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell");
  const selected = new Set(normalizeIdList(selectedValues));
  const expanded = new Set();
  normalizeIdList(selectedValues).forEach((id) => {
    const category = state.categories.find((item) => item.id === id);
    categoryAncestorIds(category).forEach((ancestorId) => expanded.add(ancestorId));
  });
  if (isMobileTree) {
    orderedPickerCategories()
      .filter((item) => !String(item.parentCategoryId || "").trim())
      .forEach((item) => expanded.add(item.id));
  }

  return `
    <div class="category-tree-picker ${isMobileTree ? "category-tree-picker--mobile" : ""}" data-category-tree-picker data-category-tree-selection="${escapeAttribute(selectionMode)}">
      <div class="category-tree-picker__panel" data-category-tree-panel>
        <div class="category-tree-picker__selected" data-category-tree-selected>
          ${renderCategoryChoiceSelectedTags(selectedValues)}
        </div>
        ${renderCategoryChoiceScopeTabs()}
        ${isMobileTree ? "" : `
        <div class="category-tree-picker__actions">
          <button class="category-tree-picker__action" type="button" data-category-tree-expand-all>Rozbaliť všetky vetvy</button>
          <button class="category-tree-picker__action" type="button" data-category-tree-collapse-all>Zbaliť všetko</button>
        </div>
        `}
        <p class="category-tree-picker__search-empty" data-category-tree-empty hidden>Nenašla sa žiadna zhoda v strome.</p>
        <div class="category-tree-picker__tree">
          ${renderCategoryChoiceTreeNodes(inputName, "", selected, expanded, 0)}
        </div>
      </div>
    </div>
  `;
}

function renderRelationDisclosure({
  summaryLabel,
  categoryLabel,
  categoryInputName,
  categoryValues = [],
  categorySelectionMode = "multiple",
  cardLabel,
  cardInputName,
  cardValue = "",
  cardWrapKey,
  cardCategoryIds = []
}) {
  const normalizedCategoryValues = normalizeIdList(categoryValues);
  return `
    <div class="field-block field-block--full field-block--relation">
      <details class="relation-disclosure" data-relation-disclosure data-relation-category-input="${escapeAttribute(categoryInputName)}" data-relation-card-input="${escapeAttribute(cardInputName)}">
        <summary class="relation-disclosure__summary">
          <span class="relation-disclosure__summary-copy">
            <span class="relation-disclosure__summary-label">${escapeHtml(summaryLabel)}</span>
            <span class="relation-disclosure__summary-value" data-relation-summary>${escapeHtml(relationDisclosureSummaryText(normalizedCategoryValues, cardValue))}</span>
          </span>
        </summary>
        <div class="relation-disclosure__content">
          <div class="field-block field-block--full">
            <div class="category-tree-picker-wrap">
              ${renderCategoryChoiceChips(categoryInputName, normalizedCategoryValues, categorySelectionMode)}
            </div>
          </div>
          <label class="field-block field-block--full" data-linked-variety-wrap="${escapeAttribute(cardWrapKey)}">
            <span>${escapeHtml(cardLabel)}</span>
            <select name="${escapeAttribute(cardInputName)}">
              <option value="">Bez karty</option>
              ${linkedVarietyOptions(cardValue, cardCategoryIds)}
            </select>
          </label>
        </div>
      </details>
    </div>
  `;
}

function setupCategoryTreePickers(root) {
  if (!root) return;

  root.querySelectorAll("[data-category-tree-picker]").forEach((picker) => {
    const panel = picker.querySelector("[data-category-tree-panel]");
    const selectedMount = picker.querySelector("[data-category-tree-selected]");
    const tree = picker.querySelector(".category-tree-picker__tree");
    const checkboxInputs = [...picker.querySelectorAll('.category-tree-picker__checkbox')];
    const selectionMode = String(picker.dataset.categoryTreeSelection || "multiple").trim() || "multiple";
    const searchInput = picker.querySelector("[data-category-tree-search-input]");
    const emptyState = picker.querySelector("[data-category-tree-empty]");
    const expandAllButton = picker.querySelector("[data-category-tree-expand-all]");
    const collapseAllButton = picker.querySelector("[data-category-tree-collapse-all]");
    const scopeButtons = [...picker.querySelectorAll("[data-category-tree-scope]")];
    const rootNodes = [...picker.querySelectorAll('[data-category-tree-node]')].filter((node) => {
      const parentChildren = node.parentElement;
      return !parentChildren || !parentChildren.classList.contains("category-tree-picker__children");
    });

    if (selectionMode === "single") {
      const firstCheckedInput = checkboxInputs.find((input) => input.checked) || null;
      checkboxInputs.forEach((input) => {
        input.checked = input === firstCheckedInput;
      });
    }

    const setPickerOpen = (nextOpen) => {
      if (panel) {
        panel.hidden = !nextOpen;
      }
      picker.classList.toggle("is-open", nextOpen);
    };

    const selectedIds = () => checkboxInputs
      .filter((input) => input.checked)
      .map((input) => String(input.value || "").trim())
      .filter(Boolean);

    const selectedState = () => {
      const ids = selectedIds();
      const idSet = new Set(ids);
      const ancestorSet = new Set();
      ids.forEach((id) => {
        const category = state.categories.find((item) => item.id === id);
        categoryAncestorIds(category).forEach((ancestorId) => ancestorSet.add(ancestorId));
      });
      return { ids, idSet, ancestorSet };
    };

    const currentScope = () => String(picker.dataset.categoryTreeScope || "all").trim() || "all";

    const setElementVisible = (element, visible) => {
      if (!element) return;
      element.hidden = !visible;
      element.style.display = visible ? "" : "none";
    };

    const buildScopeSet = (scope, selected) => {
      if (scope === "all") return null;
      if (scope === "selected") return new Set([...selected.idSet, ...selected.ancestorSet]);
      return new Set([scope, ...collectDescendantCategoryIds(scope)]);
    };

    const syncScopeUi = () => {
      const { ids, idSet } = selectedState();
      scopeButtons.forEach((button) => {
        const scope = String(button.getAttribute("data-category-tree-scope") || "").trim();
        button.classList.toggle("is-active", scope === currentScope());
        if (scope === "selected") {
          button.textContent = ids.length ? `Vybrané (${ids.length})` : "Vybrané";
          button.disabled = ids.length === 0;
        } else if (scope === "all") {
          button.textContent = "Všetko";
          button.disabled = false;
        } else {
          const scopeCategory = state.categories.find((item) => item.id === scope);
          const selectedCount = orderedPickerCategories().filter((item) => idSet.has(item.id) && (item.id === scope || categoryAncestorIds(item).includes(scope))).length;
          button.textContent = scopeCategory ? `${scopeCategory.name}${selectedCount ? ` (${selectedCount})` : ""}` : scope;
          button.disabled = false;
        }
      });
      return { ids, idSet };
    };

    const setScope = (scope, options = {}) => {
      picker.dataset.categoryTreeScope = scope;
      if (!options.keepExpansion && !String(searchInput?.value || "").trim()) {
        if (scope === "selected") {
          const { idSet, ancestorSet } = selectedState();
          picker.querySelectorAll("[data-category-tree-expander]").forEach((button) => {
            const node = button.closest("[data-category-tree-node]");
            if (!node) return;
            const nodeId = String(node.getAttribute("data-category-tree-id") || "").trim();
            const shouldOpen = ancestorSet.has(nodeId) || orderedPickerCategories().some((item) => idSet.has(item.id) && categoryAncestorIds(item).includes(nodeId));
            if (shouldOpen) button.dataset.manualExpanded = "true";
          });
        } else if (scope !== "all") {
          picker.querySelectorAll("[data-category-tree-expander]").forEach((button) => {
            const node = button.closest("[data-category-tree-node]");
            if (!node) return;
            const nodeId = String(node.getAttribute("data-category-tree-id") || "").trim();
            if (nodeId === scope) button.dataset.manualExpanded = "true";
          });
        }
      }
      syncScopeUi();
      applyTreeFilter();
      if (tree) tree.scrollTop = 0;
    };

    const syncSelectionUi = () => {
      const ids = selectedIds();
      if (selectedMount) {
        selectedMount.innerHTML = ids.length ? renderCategoryChoiceSelectedTags(ids) : "";
        selectedMount.hidden = ids.length === 0;
        selectedMount.querySelectorAll("[data-category-tree-remove]").forEach((button) => {
          button.addEventListener("click", () => {
            const categoryId = String(button.getAttribute("data-category-tree-remove") || "").trim();
            if (!categoryId) return;
            const matchingInput = checkboxInputs.find((input) => String(input.value || "").trim() === categoryId);
            if (!matchingInput) return;
            matchingInput.checked = false;
            matchingInput.dispatchEvent(new Event("change", { bubbles: true }));
          });
        });
      }
      checkboxInputs.forEach((input) => {
        input.closest(".category-tree-picker__option")?.classList.toggle("is-selected", input.checked);
      });

      if (currentScope() === "selected" && !ids.length) {
        picker.dataset.categoryTreeScope = "all";
      }
      syncScopeUi();
    };

    const applyTreeFilter = () => {
      const query = slugify(String(searchInput?.value || "").trim());
      const scope = currentScope();
      const selected = selectedState();
      const scopeSet = buildScopeSet(scope, selected);
      let visibleCount = 0;

      const syncNodeVisibility = (node) => {
        const childWrap = [...node.children].find((item) => item.classList?.contains("category-tree-picker__children")) || null;
        const childNodes = childWrap
          ? [...childWrap.children].filter((item) => item.classList.contains("category-tree-picker__node"))
          : [];
        const checkbox = node.querySelector(".category-tree-picker__checkbox");
        const nodeId = String(node.getAttribute("data-category-tree-id") || "").trim();
        const depth = Number(node.getAttribute("data-category-tree-depth") || 0);
        const ownLabel = String(node.dataset.categoryTreeSearch || "");

        if (scope !== "all" && scope !== "selected" && depth === 0 && nodeId !== scope) {
          setElementVisible(node, false);
          return false;
        }

        const childMatch = childNodes.some((child) => syncNodeVisibility(child));
        const scopeMatch = !scopeSet || scopeSet.has(nodeId);
        const selfMatch = (!query || ownLabel.includes(query) || Boolean(checkbox?.checked)) && scopeMatch;
        const isVisible = selfMatch || (scopeMatch && childMatch);

        setElementVisible(node, isVisible);
        if (childWrap) {
          if (query) {
            setElementVisible(childWrap, childMatch);
          } else {
            const expander = node.querySelector("[data-category-tree-expander]");
            setElementVisible(childWrap, expander ? expander.dataset.manualExpanded === "true" : true);
          }
        }
        const expander = node.querySelector("[data-category-tree-expander]");
        if (expander) {
          const isOpen = query ? childMatch : expander.dataset.manualExpanded === "true";
          expander.setAttribute("aria-expanded", isOpen ? "true" : "false");
          expander.classList.toggle("is-open", isOpen);
        }

        if (isVisible) visibleCount += 1;
        return isVisible;
      };

      rootNodes.forEach((node) => syncNodeVisibility(node));
      if (emptyState) {
        if (visibleCount > 0) {
          emptyState.hidden = true;
        } else {
          emptyState.hidden = false;
          emptyState.textContent = scope === "selected" && !selected.ids.length
            ? "Najprv označ aspoň jednu kategóriu."
            : query
              ? "Nenašla sa žiadna zhoda v strome."
              : "V tejto vetve zatiaľ nič nie je.";
        }
      }
      picker.classList.toggle("is-filtering", Boolean(query));
    };

    picker.querySelectorAll("[data-category-tree-expander]").forEach((button) => {
      button.dataset.manualExpanded = button.getAttribute("aria-expanded") === "true" ? "true" : "false";
      button.addEventListener("click", () => {
        const branchId = button.getAttribute("aria-controls");
        if (!branchId) return;
        const branch = document.getElementById(branchId);
        if (!branch) return;
        const isOpen = button.getAttribute("aria-expanded") === "true";
        const nextState = isOpen ? "false" : "true";
        button.dataset.manualExpanded = nextState;
        if (!(searchInput && String(searchInput.value || "").trim())) {
          button.setAttribute("aria-expanded", nextState);
          button.classList.toggle("is-open", !isOpen);
          setElementVisible(branch, !isOpen);
        }
      });
    });

    expandAllButton?.addEventListener("click", () => {
      picker.querySelectorAll("[data-category-tree-expander]").forEach((button) => {
        button.dataset.manualExpanded = "true";
      });
      applyTreeFilter();
    });

    collapseAllButton?.addEventListener("click", () => {
      picker.querySelectorAll("[data-category-tree-expander]").forEach((button) => {
        button.dataset.manualExpanded = "false";
      });
      applyTreeFilter();
    });

    scopeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const scope = String(button.getAttribute("data-category-tree-scope") || "all").trim() || "all";
        setScope(scope);
      });
    });

    checkboxInputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (selectionMode === "single" && input.checked) {
          checkboxInputs.forEach((otherInput) => {
            if (otherInput !== input) otherInput.checked = false;
          });
        }
        syncSelectionUi();
        applyTreeFilter();
      });
    });

    searchInput?.addEventListener("input", applyTreeFilter);
    searchInput?.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !String(searchInput.value || "").trim()) {
        expandAllButton?.focus({ preventScroll: true });
      }
    });
    setPickerOpen(true);
    syncSelectionUi();
    setScope("all", { keepExpansion: true });
    applyTreeFilter();
  });
}

function groupOptionList() {
  const groups = [...new Set(state.categories.map((item) => item.group || "Moje kategórie"))];
  return groups.map((group) => `<option value="${escapeAttribute(group)}"></option>`).join("");
}

function applyDefaultParenting(category) {
  if (category.parentCategoryId) return category;

  const normalized = slugify(category.name);
  if (["papriky", "rajciny", "cukety", "uhorky", "baklazan", "tekvice", "melony"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-plodova" };
  }
  if (["mrkva", "petrzlen", "bulvova-zelenina", "cvikla", "pastinak", "redkovka"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-korenova" };
  }
  if (["salaty", "listova-zelenina", "spenat", "rukola", "kapusty", "kel"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-listova" };
  }
  if (["okrasne-rastliny", "okrasne"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-okrasne" };
  }
  if (["bylinky"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-bylinky" };
  }
  if (["strukoviny", "hrach", "fazuľa", "fazula", "fazula-krickova", "fazula-popinava", "bob", "soja", "sosovica", "cicer"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-strukoviny" };
  }
  if (["hlubova-zelenina", "hlubova", "kapusty", "kel", "brokolica", "karfiol", "kalerab", "ruzickovy-kel"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-hluzova" };
  }
  if (["kukurica", "obilniny"].includes(normalized)) {
    return { ...category, parentCategoryId: "sub-uzitkove-ostatne" };
  }
  if (["skodcovia-a-problemy", "skodcovia", "problemy"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-zahrada" };
  }
  if (["huby", "hriby", "divoke-rastliny", "zvierata", "hmyz"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-priroda" };
  }
  if (["zber", "recepty", "zavaranie", "susenie", "caje", "tinktury", "kompost-a-hnojiva"].includes(normalized)) {
    return { ...category, parentCategoryId: "root-uroda" };
  }
  return category;
}

function fallbackParentIdForCategory(category, categories = state?.categories || []) {
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

function wouldCreateCategoryCycle(categoryId, parentCategoryId, categories = state.categories) {
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

      if (!String(target.image || "").trim() && String(duplicate.image || "").trim()) {
        target.image = duplicate.image;
      }
      if (!String(target.notes || "").trim() && String(duplicate.notes || "").trim()) {
        target.notes = duplicate.notes;
      }
      if (!String(target.recommendedSowingWindow || "").trim() && String(duplicate.recommendedSowingWindow || "").trim()) {
        target.recommendedSowingWindow = duplicate.recommendedSowingWindow;
      }
      if (
        String(duplicate.color || "").trim() &&
        (!String(target.color || "").trim() || String(target.color || "").trim() === String(targetDefaults?.color || "").trim())
      ) {
        target.color = duplicate.color;
      }

      nextCategories.forEach((item) => {
        if (item.parentCategoryId === duplicateId) {
          item.parentCategoryId = targetId;
        }
      });

      nextVarieties = nextVarieties.map((item) => item.categoryId === duplicateId
        ? { ...item, categoryId: targetId }
        : item);
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

  return {
    categories: nextCategories,
    varieties: nextVarieties,
    customTasks: nextTasks,
    journal: nextJournal
  };
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

function formattedCategoryOptionLabel(category) {
  const depth = categoryDepth(category.id);
  const name = String(category.name || "").trim();
  if (depth === 0) return `${name} [hlavná]`;
  if (depth === 1) return `    › ${name}`;
  return `${"      ".repeat(depth - 1)}·· ${name}`;
}

function nodeTypeOptions(current) {
  return [
    ["parent", "Nadradená kategória"],
    ["kind", "Konkrétna kategória alebo druh"]
  ].map(([value, label]) => `<option value="${value}" ${value === current ? "selected" : ""}>${label}</option>`).join("");
}

function ratingOptions(current) {
  return [
    [0, "Bez rankingu"],
    [1, ICONS.stars1],
    [2, ICONS.stars2],
    [3, ICONS.stars3],
    [4, ICONS.stars4],
    [5, ICONS.stars5]
  ].map(([value, label]) => `<option value="${value}" ${Number(value) === Number(current) ? "selected" : ""}>${label}</option>`).join("");
}

function breedingTypeOptions(current) {
  return [
    ["", "Bez označenia"],
    ["hybrid", "Hybridná F1"],
    ["open", "Nehybridná"]
  ].map(([value, label]) => `<option value="${value}" ${value === current ? "selected" : ""}>${label}</option>`).join("");
}

function placeLabel(value) {
  const labels = Object.fromEntries(PLACE_OPTIONS.map((item) => [item.value, item.label]));
  const places = normalizePlaceList(value);
  return places.map((item) => labels[item] || item).join(" + ");
}

function nodeTypeLabel(value) {
  return value === "parent" ? "Hlavná sekcia" : "Konkrétna kategória";
}

function formatDate(value) {
  if (!value) return "bez dátumu";
  const raw = String(value).trim();
  if (!raw) return "bez dátumu";
  const normalized = raw.includes("T") ? raw : `${raw}T12:00:00`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return raw.slice(0, 10);
  return new Intl.DateTimeFormat("sk-SK", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const doneDiff = Number(a.done) - Number(b.done);
    if (doneDiff !== 0) return doneDiff;

    const dateDiff = (a.date || "9999-99-99").localeCompare(b.date || "9999-99-99");
    if (dateDiff !== 0) return dateDiff;

    return String(a.text || "").localeCompare(String(b.text || ""), "sk");
  });
}

function extractWindowMonths(text) {
  const value = String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const monthMap = [
    { keys: ["januar", "jan"], month: 1 },
    { keys: ["februar", "feb"], month: 2 },
    { keys: ["marec", "mar"], month: 3 },
    { keys: ["april", "apr"], month: 4 },
    { keys: ["maj"], month: 5 },
    { keys: ["jun"], month: 6 },
    { keys: ["jul"], month: 7 },
    { keys: ["august", "aug"], month: 8 },
    { keys: ["september", "sep"], month: 9 },
    { keys: ["oktober", "okt"], month: 10 },
    { keys: ["november", "nov"], month: 11 },
    { keys: ["december", "dec"], month: 12 }
  ];
  const months = monthMap
    .filter((entry) => entry.keys.some((key) => new RegExp(`\\b${key}\\b`).test(value)))
    .map((entry) => entry.month);
  return [...new Set(months)];
}

function pendingSowingCount(categoryId) {
  return varietiesInCategoryTree(categoryId)
    .filter(isDetailEntry)
    .filter((item) => !item.notGrowingThisYear)
    .filter((item) => !item.sowedAt)
    .filter((item) => !["sown", "transplanted", "harvested"].includes(item.status))
    .length;
}

function categoryWindowSource(categoryId) {
  const inheritedWindow = String(inheritedCategoryValue(categoryId, "recommendedSowingWindow") || "").trim();
  if (inheritedWindow) return inheritedWindow;
  const noteText = String(categoryDisplayNotes(categoryId) || "").trim();
  if (extractWindowMonths(noteText).length) return noteText;
  const firstPendingVariety = varietiesInCategoryTree(categoryId).find((item) => {
    if (!isDetailEntry(item)) return false;
    if (item.notGrowingThisYear) return false;
    if (item.sowedAt) return false;
    if (["sown", "transplanted", "harvested"].includes(item.status)) return false;
    return Boolean(varietySowingWindow(item));
  });
  return firstPendingVariety ? String(varietySowingWindow(firstPendingVariety) || "").trim() : "";
}

function monthDistance(currentMonth, targetMonth) {
  const raw = targetMonth - currentMonth;
  if (raw >= 0) return raw;
  return raw + 12;
}

function tipTitleByDistance(monthDiff, categoryName) {
  if (monthDiff === 0) return `Teraz je čas výsevu: ${categoryName}`;
  if (monthDiff === 1) return `Blíži sa čas výsevu: ${categoryName}`;
  if (monthDiff === 11) return `Výsev práve skončil: ${categoryName}`;
  return "";
}

function buildSowingTips() {
  const currentMonth = new Date().getMonth() + 1;
  const tips = orderedCategories()
    .filter((category) => category.nodeType === "kind")
    .map((category) => {
      const windowText = categoryWindowSource(category.id);
      if (!windowText) return null;
      const months = extractWindowMonths(windowText);
      if (!months.length) return null;
      const pendingCount = pendingSowingCount(category.id);
      if (!pendingCount) return null;
      const monthDiff = Math.min(...months.map((month) => monthDistance(currentMonth, month)));
      const title = tipTitleByDistance(monthDiff, category.name);
      if (!title) return null;
      return {
        id: category.id,
        title,
        windowText,
        pendingCount,
        monthDiff
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.monthDiff - b.monthDiff || a.pendingCount - b.pendingCount)
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      meta: `${countedLabel(item.pendingCount, "odroda čaká", "odrody čakajú", "odrôd čaká")} • ${item.windowText}`
    }));

  return tips;
}

function inferSowingWindowAuto(item) {
  if (typeof item.sowingWindowAuto === "boolean") return item.sowingWindowAuto;
  const defaults = {
    "cat-papriky": "január - február",
    "cat-rajciny": "február - marec"
  };
  return Boolean(item.id?.startsWith("var-cat-") && item.sowingWindow && defaults[item.categoryId] === item.sowingWindow);
}

function varietySowingWindow(item) {
  const directWindow = String(item?.sowingWindow || "").trim();
  if (directWindow) return directWindow;

  const categoryWindow = state.categories.find((category) => category.id === item?.categoryId)?.recommendedSowingWindow;
  return String(categoryWindow || "").trim();
}

function todayISO() {
  return formatInputDate(new Date());
}

function shiftDate(days, from = todayISO()) {
  const date = new Date(`${from}T12:00:00`);
  date.setDate(date.getDate() + days);
  return formatInputDate(date);
}

function trimText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
}

function stars(value) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  return "\u2605".repeat(rating) + "\u2606".repeat(5 - rating);
}

function renderStarRating(value, compact = false) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  const sizeClass = compact ? " star-rating--compact" : "";
  return `<span class="star-rating${sizeClass}" aria-label="Ranking ${rating} z 5">${Array.from({ length: 5 }, (_, index) => `<span class="star-rating__star ${index < rating ? "is-active" : ""}" aria-hidden="true">${index < rating ? "\u2605" : "\u2606"}</span>`).join("")}</span>`;
}

function renderRatingPicker(currentValue = 0) {
  const rating = Math.max(0, Math.min(5, Number(currentValue) || 0));
  return `
    <div class="rating-picker" data-rating-picker>
      <input type="hidden" name="rating" value="${rating}">
      ${Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;
        return `<button class="rating-picker__star ${value <= rating ? "is-active" : ""}" type="button" data-rating-value="${value}" aria-label="Hodnotenie ${value} z 5">${value <= rating ? "\u2605" : "\u2606"}</button>`;
      }).join("")}
    </div>
  `;
}

function isPlaceholderImage(value) {
  return !value || String(value).startsWith("data:image/svg+xml");
}

function normalizePlaceList(value) {
  const input = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const valid = new Set(PLACE_OPTIONS.map((item) => item.value));
  return [...new Set(input.map((item) => String(item || "").trim()).filter((item) => valid.has(item)))];
}

function restoreSeedAssetImage(item) {
  const id = String(item?.id || "").trim();
  const match = id.match(/^var-cat-(papriky|rajciny)-(\d+)$/);
  if (!match) return "";
  const [, folder, imageNumber] = match;
  return `assets/${folder}/${imageNumber}.png`;
}

function restoreSeedCategoryImage(category) {
  const id = String(category?.id || "").trim();
  if (id === "cat-papriky") return "assets/papriky/10.png";
  if (id === "cat-rajciny") return "assets/rajciny/10.png";
  return "";
}

function isDirectFieldOnly(item) {
  const places = normalizePlaceList(item?.places?.length ? item.places : item?.place);
  return places.length === 1 && places[0] === "pole";
}

function normalizeVarietyImages(item) {
  const restoredSeedImage = restoreSeedAssetImage(item);
  const values = [
    ...(Array.isArray(item?.images) ? item.images : []),
    item?.image || "",
    restoredSeedImage
  ].map((value) => String(value || "").trim()).filter(Boolean).filter((value) => !isPlaceholderImage(value));

  return [...new Set(values)];
}

function primaryVarietyImage(variety) {
  return normalizeVarietyImages(variety)[0] || cardPlaceholderImage(cardType(variety));
}

function normalizeVarietyRecord(item) {
  const images = normalizeVarietyImages(item);
  const places = normalizePlaceList(item?.places?.length ? item.places : item?.place);
  const statusValues = varietyStatusValues(item);
  const mushroomEdibilityValues = normalizeTagList(item?.mushroomEdibilityValues?.length ? item.mushroomEdibilityValues : item?.mushroomEdibility);
  const mushroomGatheringValues = normalizeTagList(item?.mushroomGatheringValues?.length ? item.mushroomGatheringValues : item?.mushroomGathering);
  const affectedCategoryIds = normalizeIdList(item?.affectedCategoryIds?.length ? item.affectedCategoryIds : item?.affectedCategoryId);
  const relatedCategoryIds = normalizeIdList(item?.relatedCategoryIds?.length ? item.relatedCategoryIds : item?.relatedCategoryId);
  return {
    entryKind: "detail",
    cardType: "variety",
    sowingWindowAuto: inferSowingWindowAuto(item),
    breedingType: inferBreedingType(item),
    neverGrown: false,
    recordedAt: "",
    statusValues: [],
    mushroomEdibility: "",
    mushroomEdibilityValues: [],
    mushroomGathering: "",
    mushroomGatheringValues: [],
    isMedicinal: false,
    isPoisonous: false,
    birdSpeciesCode: "",
    birdLatinName: "",
    birdPlace: "",
    birdExternalUrl: "",
    birdSource: "",
    birdContact: "",
    birdConfidence: "",
    affectedCategoryId: "",
    affectedCategoryIds: [],
    affectedVarietyId: "",
    relatedCategoryId: "",
    relatedCategoryIds: [],
    relatedVarietyId: "",
    ...item,
    statusValues,
    status: primaryStatusValue(statusValues) || String(item?.status || "").trim(),
    places,
    place: places[0] || "",
    sowedAt: String(item?.sowedAt || "").trim(),
    transplantedAt: String(item?.transplantedAt || "").trim(),
    harvestedAt: String(item?.harvestedAt || "").trim(),
    mushroomEdibilityValues,
    mushroomEdibility: mushroomEdibilityValues[0] || String(item?.mushroomEdibility || "").trim(),
    mushroomGatheringValues,
    mushroomGathering: mushroomGatheringValues[0] || String(item?.mushroomGathering || "").trim(),
    affectedCategoryIds,
    affectedCategoryId: affectedCategoryIds[0] || String(item?.affectedCategoryId || "").trim(),
    relatedCategoryIds,
    relatedCategoryId: relatedCategoryIds[0] || String(item?.relatedCategoryId || "").trim(),
    images,
    image: images[0] || cardPlaceholderImage(item?.cardType || "variety")
  };
}

function cardType(item) {
  return String(item?.cardType || "variety");
}

function cardTypeLabel(value) {
  const labels = {
    variety: "Odroda",
    mushroom: "Huba alebo hríb",
    "wild-plant": "Divoká rastlina",
    bird: "Vták",
    insect: "Hmyz",
    "pest-problem": "Škodca alebo problém",
    "processing-recipe": "Spracovanie alebo recept"
  };
  return labels[value] || "Karta";
}

function cardDateLabel(value) {
  const labels = {
    mushroom: "Nález",
    "wild-plant": "Pozorovanie",
    bird: "Pozorovanie",
    insect: "Pozorovanie",
    "pest-problem": "Zistené",
    "processing-recipe": "Dátum"
  };
  return labels[value] || "Dátum";
}

function mushroomEdibilityLabel(value) {
  const labels = {
    edible: "jedlá",
    inedible: "nejedlá",
    poisonous: "jedovatá",
    unknown: "neviem"
  };
  return labels[value] || "";
}

function mushroomGatheringLabel(value) {
  const labels = {
    gather: "zbieram",
    skip: "nezbieram",
    unknown: "nepoznám"
  };
  return labels[value] || "";
}

function placeholderImage() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Crect width='800' height='800' fill='%23d9ddd6'/%3E%3Crect x='28' y='28' width='744' height='744' rx='36' fill='%23e9ece7' stroke='%23c0c7be' stroke-width='6'/%3E%3C/svg%3E";
}

function categoryAncestorIds(category) {
  const ids = [];
  const visited = new Set();
  const categories = Array.isArray(state?.categories) ? state.categories : [];
  let currentId = String(category?.parentCategoryId || "").trim();

  while (currentId && !visited.has(currentId)) {
    ids.push(currentId);
    visited.add(currentId);
    const parent = categories.find((item) => item.id === currentId);
    currentId = String(parent?.parentCategoryId || "").trim();
  }

  return ids;
}

function categoryIllustrationLabel(value) {
  const label = String(value || "Kategória").trim();
  return label.length > 22 ? `${label.slice(0, 21)}…` : label;
}

function categoryIllustrationPreset(category) {
  const categoryId = String(category?.id || "").trim();
  const name = String(category?.name || "Kategória").trim();
  const slug = slugify(name);
  const lineage = new Set([categoryId, ...categoryAncestorIds(category)]);
  const inBranch = (...ids) => ids.some((id) => lineage.has(id));
  const matches = (...values) => values.some((value) => slug.includes(value));
  const make = (emoji, accent, bgStart, bgEnd, halo, label = name) => ({ emoji, accent, bgStart, bgEnd, halo, label });

  if (categoryId === "root-zahrada") return make(ICONS.categoryGarden, "#5f8d39", "#f8f2e6", "#e7f1d7", "#dfeac1", "Záhrada");
  if (categoryId === "root-priroda") return make(ICONS.categoryNature, "#4f8a68", "#f2f6ef", "#dfefe5", "#d4e7db", "Príroda");
  if (categoryId === "root-uroda") return make(ICONS.categoryHarvest, "#b57a32", "#fbf1e3", "#f6ead7", "#ead8ba", "Úroda a spracovanie");
  if (categoryId === "root-ine") return make(ICONS.categoryOther, "#7d8c97", "#f1f4f6", "#e4eaee", "#d8e0e6", "Iné");
  if (categoryId === "cat-uzitkove") return make(ICONS.categoryUseful, "#769a4a", "#f8f4e8", "#edf4dd", "#d9e7bf", "Úžitkové rastliny");
  if (categoryId === "root-okrasne" || categoryId === "cat-okrasne") return make(ICONS.categoryFlowers, "#b06aa0", "#fbf0f6", "#f5e5f1", "#ead0e3", "Okrasné rastliny");
  if (categoryId === "cat-skodcovia-problemy") return make(ICONS.categoryPests, "#9b6e45", "#fbf1e8", "#f4e6d8", "#ead6c0", "Škodcovia a problémy");
  if (categoryId === "cat-huby") return make(ICONS.categoryMushrooms, "#8a7457", "#f8f2ea", "#eee4d8", "#dfd0be", "Huby a hríby");
  if (categoryId === "cat-divoke-rastliny") return make(ICONS.categoryWildPlants, "#6a9a57", "#f3f7ef", "#e4efde", "#d4e5ca", "Divoké rastliny");
  if (categoryId === "cat-zvierata") return make(ICONS.categoryBirds, "#8f7b63", "#f7f2eb", "#ece4da", "#ddd0bf", "Vtáky");
  if (categoryId === "cat-hmyz") return make(ICONS.categoryInsects, "#b18b38", "#fbf5e7", "#f4ebd2", "#ebddb2", "Hmyz");
  if (categoryId === "cat-zber") return make(ICONS.categoryHarvesting, "#a77b2e", "#fbf3e3", "#f4e8ca", "#e8d6ab", "Zber");
  if (categoryId === "cat-recepty") return make(ICONS.categoryRecipes, "#ba6a45", "#fcf0e8", "#f7e1d7", "#efd0c1", "Recepty");
  if (categoryId === "cat-zavaranie") return make(ICONS.categoryCanning, "#c45d47", "#fdf0ec", "#f8dfd8", "#f0cdc5", "Zaváranie");
  if (categoryId === "cat-susenie") return make(ICONS.categoryDrying, "#bf8b3f", "#fbf4e5", "#f3ead0", "#e8d8af", "Sušenie");
  if (categoryId === "cat-caje") return make(ICONS.categoryTea, "#7b9450", "#f4f7eb", "#e9efd9", "#d8e2c0", "Čaje");
  if (categoryId === "cat-tinktury") return make(ICONS.categoryTincture, "#846a9e", "#f4eef8", "#e7dcf1", "#d8cae6", "Tinktúry");
  if (categoryId === "cat-kompost-hnojiva") return make(ICONS.categoryCompost, "#6f7f4e", "#f3f0e6", "#e6e8d8", "#d8dbc0", "Kompost a hnojivá");

  if (matches("paprik")) return make(ICONS.categoryUseful, "#d45d2c", "#fff2ec", "#f7e3d7", "#ffd7cb");
  if (matches("rajcin")) return make(ICONS.categoryHarvest, "#c84136", "#fff0ec", "#f8e0d8", "#f6d0c6");
  if (matches("uhork", "cuket")) return make(ICONS.categoryGarden, "#5f934e", "#f4f8ed", "#e7efdd", "#d7e6c8");
  if (matches("salat", "listov", "spinat", "mangold")) return make(ICONS.categoryWildPlants, "#73a84e", "#f3f8eb", "#e3efda", "#d3e5c2");
  if (matches("mrkv", "korenov", "redkov", "cvikl", "petrzl", "pastrnak", "celer")) return make(ICONS.categoryUseful, "#d98a2d", "#fff4ea", "#f6e7d2", "#f0d7b5");
  if (matches("struk", "hrach", "fazul", "sosovic", "cicer", "bob", "soja")) return make(ICONS.categoryUseful, "#7ea052", "#f4f8ee", "#e8efd8", "#d8e3be");
  if (matches("hlubov", "kapust", "brokolic", "karfiol", "kalerab", "kel")) return make(ICONS.categoryGarden, "#7ea061", "#f3f8ef", "#e4efde", "#d2e3cc", "Hľúbová zelenina");
  if (matches("kukuric", "obiln")) return make(ICONS.categoryHarvesting, "#d2af37", "#fdf6e4", "#f6ebc9", "#efdca1");
  if (matches("bylink", "bazalk", "mata", "medovk", "tymian", "rozmarin", "salvia", "levand")) return make(ICONS.categoryTea, "#4b8f6a", "#eef7f1", "#dff0e6", "#cde3d5");
  if (matches("okras", "kvet", "ruza", "tulipan", "dalia", "georgin")) return make(ICONS.categoryFlowers, "#b06aa0", "#fbf0f6", "#f4e3ee", "#e8d0e0");
  if (matches("skodc", "problem", "chorob", "plesen")) return make(ICONS.categoryPests, "#9b6e45", "#fbf2e8", "#f4e5d8", "#ead4c0");
  if (matches("hub", "hrib")) return make(ICONS.categoryMushrooms, "#8a7457", "#f8f2ea", "#eee4d8", "#dfd0be");
  if (matches("divok", "lucn", "lesn", "plan")) return make(ICONS.categoryWildPlants, "#6a9a57", "#f3f7ef", "#e4efde", "#d4e5ca");
  if (matches("zvier", "vtak", "srn", "jele", "mack", "lis", "jazve")) return make(ICONS.categoryBirds, "#8f7b63", "#f7f2eb", "#ece4da", "#ddd0bf");
  if (matches("hmyz", "motyl", "vcel", "cmel", "lien", "mrav")) return make(ICONS.categoryInsects, "#b18b38", "#fbf5e7", "#f4ebd2", "#ebddb2");
  if (matches("zber")) return make(ICONS.categoryHarvesting, "#a77b2e", "#fbf3e3", "#f4e8ca", "#e8d6ab");
  if (matches("recept", "sirup", "jedl", "pecen")) return make(ICONS.categoryRecipes, "#ba6a45", "#fcf0e8", "#f7e1d7", "#efd0c1");
  if (matches("zavar", "kompot", "dzem", "lekvar")) return make(ICONS.categoryCanning, "#c45d47", "#fdf0ec", "#f8dfd8", "#f0cdc5");
  if (matches("susen", "sus")) return make(ICONS.categoryDrying, "#bf8b3f", "#fbf4e5", "#f3ead0", "#e8d8af");
  if (matches("caj")) return make(ICONS.categoryTea, "#7b9450", "#f4f7eb", "#e9efd9", "#d8e2c0");
  if (matches("tinktur")) return make(ICONS.categoryTincture, "#846a9e", "#f4eef8", "#e7dcf1", "#d8cae6");
  if (matches("kompost", "hnoj")) return make(ICONS.categoryCompost, "#6f7f4e", "#f3f0e6", "#e6e8d8", "#d8dbc0");
  if (matches("nezarad", "ine")) return make(ICONS.categoryOther, "#7d8c97", "#f1f4f6", "#e4eaee", "#d8e0e6");

  if (inBranch("root-plodova")) return make(ICONS.categoryHarvest, "#c65a37", "#fff1eb", "#f7e4d8", "#f2d4c8");
  if (inBranch("root-korenova")) return make(ICONS.categoryUseful, "#d58b32", "#fff4ea", "#f6e7d2", "#ecd2b0");
  if (inBranch("root-listova")) return make(ICONS.categoryWildPlants, "#73a84e", "#f3f8eb", "#e3efda", "#d3e5c2");
  if (inBranch("root-bylinky")) return make(ICONS.categoryTea, "#4b8f6a", "#eef7f1", "#dff0e6", "#cde3d5");
  if (inBranch("root-strukoviny")) return make(ICONS.categoryUseful, "#7ea052", "#f4f8ee", "#e8efd8", "#d8e3be");
  if (inBranch("root-hluzova")) return make(ICONS.categoryGarden, "#a77a53", "#f8f2ea", "#eee6db", "#e1d4c7", "Hľúbová zelenina");
  if (inBranch("sub-uzitkove-ostatne")) return make(ICONS.categoryUseful, "#9aa25b", "#f8f5e9", "#eef0db", "#dfe2bf");
  if (inBranch("cat-uzitkove", "root-zahrada")) return make(ICONS.categoryUseful, category?.color || "#769a4a", "#f8f4e8", "#edf4dd", "#d9e7bf");
  if (inBranch("root-okrasne")) return make(ICONS.categoryFlowers, "#b06aa0", "#fbf0f6", "#f4e3ee", "#e8d0e0");
  if (inBranch("root-priroda")) return make(ICONS.categoryNature, category?.color || "#4f8a68", "#f2f6ef", "#dfefe5", "#d4e7db");
  if (inBranch("root-uroda")) return make(ICONS.categoryHarvest, category?.color || "#b57a32", "#fbf1e3", "#f6ead7", "#ead8ba");
  if (inBranch("root-ine")) return make(ICONS.categoryOther, "#7d8c97", "#f1f4f6", "#e4eaee", "#d8e0e6");

  return make(ICONS.categoryGarden, category?.color || "#7e9f4b", "#f7f4ec", "#edf2e2", "#dce5c9");
}

function categoryPlaceholderImage(category) {
  const preset = categoryIllustrationPreset(category);
  const label = categoryIllustrationLabel(preset?.label || category?.name || "Kategória");
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${preset.bgStart}"/>
          <stop offset="100%" stop-color="${preset.bgEnd}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="${preset.accent}" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="800" height="800" fill="url(#bg)"/>
      <circle cx="166" cy="180" r="126" fill="${preset.halo}" fill-opacity="0.9"/>
      <circle cx="636" cy="178" r="90" fill="${preset.accent}" fill-opacity="0.08"/>
      <ellipse cx="400" cy="632" rx="224" ry="68" fill="${preset.accent}" fill-opacity="0.12"/>
      <rect x="54" y="54" width="692" height="692" rx="58" fill="#fffdfa" stroke="${preset.accent}" stroke-opacity="0.16" stroke-width="6"/>
      <g filter="url(#shadow)">
        <circle cx="400" cy="332" r="136" fill="${preset.accent}" fill-opacity="0.14"/>
        <text x="400" y="390" text-anchor="middle" font-size="188" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${preset.emoji}</text>
      </g>
      <text x="400" y="584" text-anchor="middle" font-family="Trebuchet MS, Arial, sans-serif" font-size="42" font-weight="700" fill="${preset.accent}">${label}</text>
      <text x="400" y="630" text-anchor="middle" font-family="Trebuchet MS, Arial, sans-serif" font-size="24" fill="${preset.accent}" fill-opacity="0.74">dočasný ilustračný náhľad</text>
    </svg>
  `)}`;
}

function cardPlaceholderImage(cardTypeValue = "variety") {
  const presets = {
    variety: { emoji: ICONS.cardVariety, accent: "#7ca64b", bg: "#edf6e4", glow: "#d7eabf", label: "Odroda" },
    mushroom: { emoji: ICONS.cardMushroom, accent: "#a16d56", bg: "#f6ece7", glow: "#ecd9cf", label: "Huba alebo hríb" },
    "wild-plant": { emoji: ICONS.cardWildPlant, accent: "#5f8d52", bg: "#eaf4e5", glow: "#d8e8cf", label: "Divoká rastlina" },
    bird: { emoji: ICONS.cardBird, accent: "#7b6a58", bg: "#f5efe8", glow: "#e7ddd3", label: "Vtáky" },
    insect: { emoji: ICONS.cardInsect, accent: "#8c72b8", bg: "#f1ebfb", glow: "#e1d5f6", label: "Hmyz" },
    "pest-problem": { emoji: ICONS.cardPest, accent: "#b26b45", bg: "#f8ede7", glow: "#efd8cb", label: "Karta problému" },
    "processing-recipe": { emoji: ICONS.cardRecipe, accent: "#c18d2f", bg: "#fbf1d8", glow: "#f0dfac", label: "Spracovanie" }
  };
  const preset = presets[cardTypeValue] || presets.variety;
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${preset.bg}"/>
          <stop offset="100%" stop-color="#fbf8f1"/>
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fffdfa"/>
          <stop offset="100%" stop-color="${preset.bg}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="${preset.accent}" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="800" height="800" fill="url(#bg)"/>
      <circle cx="174" cy="166" r="118" fill="${preset.glow}" fill-opacity="0.84"/>
      <circle cx="646" cy="154" r="82" fill="${preset.accent}" fill-opacity="0.08"/>
      <rect x="82" y="82" width="636" height="636" rx="60" fill="url(#panel)" stroke="${preset.accent}" stroke-opacity="0.14" stroke-width="8"/>
      <rect x="112" y="112" width="576" height="576" rx="44" fill="none" stroke="${preset.accent}" stroke-opacity="0.08" stroke-width="4"/>
      <g filter="url(#shadow)">
        <circle cx="400" cy="312" r="132" fill="${preset.accent}" fill-opacity="0.12"/>
        <text x="400" y="372" text-anchor="middle" font-size="184">${preset.emoji}</text>
      </g>
      <rect x="188" y="502" width="424" height="94" rx="28" fill="${preset.accent}" fill-opacity="0.1"/>
      <text x="400" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="${preset.accent}">${preset.label}</text>
      <text x="400" y="616" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="${preset.accent}" fill-opacity="0.72">dočasný ilustračný náhľad</text>
    </svg>
  `)}`;
}

function categoryCardImage(category) {
  if (category.image) return category.image;
  const restored = restoreSeedCategoryImage(category);
  if (restored) return restored;
  return categoryPlaceholderImage(category);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function isProcessableImageDataUrl(value) {
  return typeof value === "string"
    && value.startsWith("data:image/")
    && !value.startsWith("data:image/svg+xml");
}

function isLightBackgroundPixel(data, index) {
  const alpha = data[index + 3];
  if (alpha < 16) return true;

  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const spread = max - min;
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  return luminance >= 205 && spread <= 85;
}

function whitenEdgeBackgroundOnCanvas(canvas) {
  const context = canvas.getContext("2d");
  if (!context) return false;

  const width = canvas.width;
  const height = canvas.height;
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const visited = new Uint8Array(width * height);
  const queue = [];
  let changed = false;

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const offset = y * width + x;
    if (visited[offset]) return;
    const pixelIndex = offset * 4;
    if (!isLightBackgroundPixel(data, pixelIndex)) return;
    visited[offset] = 1;
    queue.push(offset);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (queue.length) {
    const offset = queue.pop();
    const pixelIndex = offset * 4;
    if (data[pixelIndex] !== 255 || data[pixelIndex + 1] !== 255 || data[pixelIndex + 2] !== 255 || data[pixelIndex + 3] !== 255) {
      data[pixelIndex] = 255;
      data[pixelIndex + 1] = 255;
      data[pixelIndex + 2] = 255;
      data[pixelIndex + 3] = 255;
      changed = true;
    }

    const x = offset % width;
    const y = Math.floor(offset / width);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  if (changed) {
    context.putImageData(imageData, 0, 0);
  }

  return changed;
}

function normalizeImageBackgroundDataUrl(dataUrl) {
  return new Promise((resolve) => {
    if (!isProcessableImageDataUrl(dataUrl)) {
      resolve(dataUrl);
      return;
    }

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      const changed = whitenEdgeBackgroundOnCanvas(canvas);
      resolve(changed ? canvas.toDataURL("image/jpeg", 0.82) : dataUrl);
    };
    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });
}

function fileToOptimizedDataUrl(file, maxDimension = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
          resolve(reader.result);
          return;
        }
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        whitenEdgeBackgroundOnCanvas(canvas);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.onerror = () => resolve(reader.result);
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function scheduleImageBackgroundCleanup() {
  if (imageBackgroundCleanupScheduled) return;
  if (localStorage.getItem(IMAGE_BACKGROUND_MIGRATION_KEY) === "done") return;

  imageBackgroundCleanupScheduled = true;
  window.setTimeout(async () => {
    let changed = false;
    const cache = new Map();

    const normalizeSource = async (source) => {
      if (!isProcessableImageDataUrl(source)) return source;
      if (!cache.has(source)) {
        cache.set(source, normalizeImageBackgroundDataUrl(source));
      }
      return cache.get(source);
    };

    for (const category of state.categories) {
      const cleaned = await normalizeSource(category.image || "");
      if (cleaned !== category.image) {
        category.image = cleaned;
        changed = true;
      }
    }

    for (const variety of state.varieties) {
      const currentImages = normalizeVarietyImages(variety);
      const cleanedImages = [];
      let varietyChanged = false;

      for (const image of currentImages) {
        const cleaned = await normalizeSource(image);
        cleanedImages.push(cleaned);
        if (cleaned !== image) varietyChanged = true;
      }

      if (varietyChanged) {
        variety.images = cleanedImages;
        variety.image = cleanedImages[0] || placeholderImage();
        changed = true;
      }
    }

    if (!changed) {
      localStorage.setItem(IMAGE_BACKGROUND_MIGRATION_KEY, "done");
      imageBackgroundCleanupScheduled = false;
      return;
    }

    if (!persist()) {
      imageBackgroundCleanupScheduled = false;
      return;
    }

    localStorage.setItem(IMAGE_BACKGROUND_MIGRATION_KEY, "done");
    imageBackgroundCleanupScheduled = false;
    render();
  }, 0);
}

function syncFilterButtons() {
  document.querySelectorAll(".filter").forEach((item) => item.classList.remove("is-active"));
  const button = document.querySelector(`.filter[data-filter="${activeFilter}"]`);
  if (button) button.classList.add("is-active");
  if (activeFilterLabelEl) activeFilterLabelEl.textContent = filterLabel(activeFilter);
}

function filterLabel(filter) {
  const labels = {
    all: "Všetko",
    sown: "Vysiate",
    favorite: "Top odrody",
    avoid: "Nechcem ďalší rok"
  };
  return labels[filter] || labels.all;
}

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

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function percent(part, total) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((part / total) * 100)));
}

function setUndoState(payload) {
  lastDeleted = payload;
  localStorage.setItem(UNDO_KEY, JSON.stringify(payload));
  updateUndoButton();
}

function loadUndoState() {
  try {
    const raw = localStorage.getItem(UNDO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function saveResetBackup() {
  return null;
}

function loadResetBackup() {
  return null;
}

function updateRestoreResetButton() {
  return null;
}

function restoreResetBackup() {
  return null;
}

function clearUndoState() {
  lastDeleted = null;
  localStorage.removeItem(UNDO_KEY);
  updateUndoButton();
}

function undoLastDelete() {
  if (!lastDeleted) return;

  if (lastDeleted.type === "category" && lastDeleted.category) {
    const deletedCategories = Array.isArray(lastDeleted.categories) && lastDeleted.categories.length
      ? lastDeleted.categories
      : [lastDeleted.category];
    const existingCategoryIds = new Set(state.categories.map((item) => item.id));
    deletedCategories.forEach((item) => {
      if (!existingCategoryIds.has(item.id)) {
        state.categories.push(clone(item));
      }
    });

    (lastDeleted.varieties || []).forEach((item) => {
      const existingVarietyIndex = state.varieties.findIndex((entry) => entry.id === item.id);
      if (existingVarietyIndex >= 0) {
        state.varieties[existingVarietyIndex] = clone(item);
        return;
      }
      state.varieties.push(clone(item));
    });

    (lastDeleted.movedCategories || []).forEach((item) => {
      const existingCategoryIndex = state.categories.findIndex((entry) => entry.id === item.id);
      if (existingCategoryIndex >= 0) {
        state.categories[existingCategoryIndex] = clone(item);
        return;
      }
      state.categories.push(clone(item));
    });

    (lastDeleted.customTasks || []).forEach((item) => {
      const existingTaskIndex = state.customTasks.findIndex((entry) => entry.id === item.id);
      if (existingTaskIndex >= 0) {
        state.customTasks[existingTaskIndex] = clone(item);
        return;
      }
      state.customTasks.push(clone(item));
    });

    (lastDeleted.journal || []).forEach((item) => {
      const existingJournalIndex = state.journal.findIndex((entry) => entry.id === item.id);
      if (existingJournalIndex >= 0) {
        state.journal[existingJournalIndex] = clone(item);
        return;
      }
      state.journal.push(clone(item));
    });

    activeCategoryId = deletedCategories[0]?.id || lastDeleted.previousActiveCategoryId || lastDeleted.category.id;
  }

  if (lastDeleted.type === "variety" && lastDeleted.variety) {
    if (!state.varieties.some((item) => item.id === lastDeleted.variety.id)) {
      state.varieties.push(clone(lastDeleted.variety));
    }
    activeCategoryId = lastDeleted.variety.categoryId;
  }

  refreshAutoTasks();
  clearUndoState();
  if (!persist()) return;
  render();
}

function updateUndoButton() {
  if (!undoDeleteEl) return;
  undoDeleteEl.hidden = !lastDeleted;
}

function updateMenuVisibility() {
  if (!menuPanelEl) return;
  if (typeof document !== "undefined") {
    document.body.classList.toggle("app-main-menu-mode", !isFocusedView);
    document.body.classList.toggle("app-focused-mode", isFocusedView);
  }
  menuPanelEl.classList.toggle("is-hidden", isFocusedView);
  if (workspaceMainEl) {
    workspaceMainEl.classList.toggle("is-hidden", !isFocusedView);
  }
  if (workspaceLayoutEl) {
    workspaceLayoutEl.classList.toggle("workspace-layout--menu", !isFocusedView);
  }
  if (mainMenuQuickEl) {
    mainMenuQuickEl.hidden = !isFocusedView;
  }
  if (batchMenuQuickEl) {
    batchMenuQuickEl.hidden = !state.varieties.length;
  }
  updateCatalogHeader();
  syncMobileToolbarScrollState();
}

function closeUtilityDrawers() {
  closeToolbarAddMenu();
  const searchResults = document.getElementById("toolbar-search-results");
  if (searchResults) {
    searchResults.hidden = true;
  }
}

function supportsFolderStorage() {
  return typeof window !== "undefined"
    && typeof window.showDirectoryPicker === "function"
    && typeof indexedDB !== "undefined";
}

function loadFolderStoragePreferences() {
  try {
    const raw = localStorage.getItem(FOLDER_STORAGE_META_KEY);
    if (!raw) {
      return {
        enabled: false,
        folderName: "",
        fileName: FOLDER_STORAGE_FILE_NAME,
        lastSavedAt: ""
      };
    }
    const parsed = JSON.parse(raw);
    return {
      enabled: Boolean(parsed?.enabled),
      folderName: String(parsed?.folderName || "").trim(),
      fileName: String(parsed?.fileName || FOLDER_STORAGE_FILE_NAME).trim() || FOLDER_STORAGE_FILE_NAME,
      lastSavedAt: String(parsed?.lastSavedAt || "").trim()
    };
  } catch (error) {
    return {
      enabled: false,
      folderName: "",
      fileName: FOLDER_STORAGE_FILE_NAME,
      lastSavedAt: ""
    };
  }
}

function saveFolderStoragePreferences(nextPreferences = {}) {
  const current = loadFolderStoragePreferences();
  try {
    localStorage.setItem(FOLDER_STORAGE_META_KEY, JSON.stringify({
      enabled: Boolean(nextPreferences?.enabled ?? current.enabled),
      folderName: String(nextPreferences?.folderName ?? current.folderName ?? "").trim(),
      fileName: String(nextPreferences?.fileName ?? current.fileName ?? FOLDER_STORAGE_FILE_NAME).trim() || FOLDER_STORAGE_FILE_NAME,
      lastSavedAt: String(nextPreferences?.lastSavedAt ?? current.lastSavedAt ?? "").trim()
    }));
    return true;
  } catch (error) {
    return false;
  }
}

function clearFolderStoragePreferences() {
  try {
    localStorage.removeItem(FOLDER_STORAGE_META_KEY);
  } catch (error) {
    return;
  }
}

function openFolderStorageDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FOLDER_STORAGE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(FOLDER_STORAGE_DB_STORE)) {
        database.createObjectStore(FOLDER_STORAGE_DB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Databázu pre diskové úložisko sa nepodarilo otvoriť."));
  });
}

async function getFolderStorageHandle() {
  if (!supportsFolderStorage()) return null;
  const database = await openFolderStorageDb();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(FOLDER_STORAGE_DB_STORE, "readonly");
    const store = transaction.objectStore(FOLDER_STORAGE_DB_STORE);
    const request = store.get(FOLDER_STORAGE_HANDLE_ID);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error("Priečinok úložiska sa nepodarilo načítať."));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => {
      database.close();
      reject(transaction.error || new Error("Čítanie priečinka úložiska zlyhalo."));
    };
  });
}

async function setFolderStorageHandle(directoryHandle) {
  if (!supportsFolderStorage()) return false;
  const database = await openFolderStorageDb();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(FOLDER_STORAGE_DB_STORE, "readwrite");
    const store = transaction.objectStore(FOLDER_STORAGE_DB_STORE);
    const request = store.put(directoryHandle, FOLDER_STORAGE_HANDLE_ID);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error || new Error("Priečinok úložiska sa nepodarilo uložiť."));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => {
      database.close();
      reject(transaction.error || new Error("Uloženie priečinka úložiska zlyhalo."));
    };
  });
}

async function clearFolderStorageHandle() {
  if (!supportsFolderStorage()) return;
  const database = await openFolderStorageDb();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(FOLDER_STORAGE_DB_STORE, "readwrite");
    const store = transaction.objectStore(FOLDER_STORAGE_DB_STORE);
    const request = store.delete(FOLDER_STORAGE_HANDLE_ID);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error("Priečinok úložiska sa nepodarilo odpojiť."));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => {
      database.close();
      reject(transaction.error || new Error("Odpojenie priečinka úložiska zlyhalo."));
    };
  });
}

async function ensureFolderStoragePermission(directoryHandle, mode = "read", requestAccess = false) {
  if (!directoryHandle) return false;
  if (typeof directoryHandle.queryPermission === "function") {
    const currentPermission = await directoryHandle.queryPermission({ mode }).catch(() => "prompt");
    if (currentPermission === "granted") return true;
    if (!requestAccess || typeof directoryHandle.requestPermission !== "function") return false;
    const requestedPermission = await directoryHandle.requestPermission({ mode }).catch(() => "denied");
    return requestedPermission === "granted";
  }
  return true;
}

async function writeStateToFolderStorage(serializedState) {
  const preferences = loadFolderStoragePreferences();
  const directoryHandle = await getFolderStorageHandle();
  if (!preferences.enabled || !directoryHandle) {
    throw new Error("Najprv vyber priečinok pre dočasné diskové úložisko.");
  }
  const granted = await ensureFolderStoragePermission(directoryHandle, "readwrite", true);
  if (!granted) {
    throw new Error("Prehliadač nedostal povolenie zapisovať do zvoleného priečinka.");
  }
  const fileHandle = await directoryHandle.getFileHandle(preferences.fileName || FOLDER_STORAGE_FILE_NAME, { create: true });
  const existingFile = await fileHandle.getFile().catch(() => null);
  const existingRaw = existingFile ? await existingFile.text().catch(() => "") : "";
  if (String(existingRaw || "").trim() && isFolderStateShrinkSuspicious(serializedState, existingRaw)) {
    throw new Error("Zastavila som uloženie, lebo nový stav vyzerá podozrivo menší než dáta v priečinku. Najprv skús Načítať z priečinka, aby sa nič neprepísalo.");
  }
  const writable = await fileHandle.createWritable();
  await writable.write(serializedState);
  await writable.close();
  const backupFileHandle = await directoryHandle.getFileHandle(FOLDER_STORAGE_BACKUP_FILE_NAME, { create: true });
  const backupWritable = await backupFileHandle.createWritable();
  await backupWritable.write(serializedState);
  await backupWritable.close();
  saveFolderStoragePreferences({
    enabled: true,
    folderName: String(directoryHandle.name || preferences.folderName || "").trim(),
    fileName: preferences.fileName || FOLDER_STORAGE_FILE_NAME,
    lastSavedAt: new Date().toISOString()
  });
}

function queueFolderStorageWrite(serializedState) {
  folderStorageWriteQueue = folderStorageWriteQueue
    .catch(() => null)
    .then(() => writeStateToFolderStorage(serializedState))
    .then(() => {
      folderStorageWriteAlertShown = false;
    })
    .catch((error) => {
      console.warn("Dočasné diskové úložisko zlyhalo.", error);
      try {
        localStorage.setItem(STORAGE_KEY, serializedState);
      } catch (browserStorageError) {
        if (!folderStorageWriteAlertShown) {
          folderStorageWriteAlertShown = true;
          alert("Nepodarilo sa uložiť dáta ani do priečinka, ani do prehliadača. Otvor Nastavenia a znovu pripoj dočasné úložisko.");
        }
      }
    });
  return folderStorageWriteQueue;
}

function folderStateSnapshotMetrics(raw = "") {
  try {
    const parsed = JSON.parse(String(raw || ""));
    return {
      varieties: Array.isArray(parsed?.varieties) ? parsed.varieties.length : 0,
      tasks: Array.isArray(parsed?.customTasks) ? parsed.customTasks.length : 0,
      journal: Array.isArray(parsed?.journal) ? parsed.journal.length : 0,
      images: Array.isArray(parsed?.journal)
        ? parsed.journal.filter((entry) => Boolean(entry?.image) || (Array.isArray(entry?.images) && entry.images.length)).length
        : 0,
      size: String(raw || "").length
    };
  } catch (error) {
    return {
      varieties: 0,
      tasks: 0,
      journal: 0,
      images: 0,
      size: String(raw || "").length
    };
  }
}

function isFolderStateShrinkSuspicious(nextRaw = "", existingRaw = "") {
  const nextMetrics = folderStateSnapshotMetrics(nextRaw);
  const existingMetrics = folderStateSnapshotMetrics(existingRaw);
  if (!existingMetrics.size || !nextMetrics.size) return false;

  const sizeCollapsed = existingMetrics.size > 250000 && nextMetrics.size < existingMetrics.size * 0.45;
  const journalCollapsed = existingMetrics.journal >= 3 && nextMetrics.journal < existingMetrics.journal * 0.5;
  const imagesCollapsed = existingMetrics.images >= 2 && nextMetrics.images < existingMetrics.images * 0.5;
  const tasksCollapsed = existingMetrics.tasks >= 2 && nextMetrics.tasks < existingMetrics.tasks * 0.5;

  return sizeCollapsed && (journalCollapsed || imagesCollapsed || tasksCollapsed);
}

async function loadStateFromFolderStorage({ requestAccess = false } = {}) {
  const preferences = loadFolderStoragePreferences();
  if (!preferences.enabled) {
    throw new Error("Dočasné úložisko v priečinku zatiaľ nie je zapnuté.");
  }
  const directoryHandle = await getFolderStorageHandle().catch(() => null);
  if (!directoryHandle) {
    throw new Error("Prístup k priečinku sa po reštarte stratil. Klikni na Zmeniť priečinok a vyber znova svoju zložku moja zahrada.");
  }
  const granted = await ensureFolderStoragePermission(directoryHandle, "read", requestAccess);
  if (!granted) {
    throw new Error("Prehliadač nedostal povolenie čítať z vybraného priečinka.");
  }
  let fileHandle = await directoryHandle.getFileHandle(preferences.fileName || FOLDER_STORAGE_FILE_NAME).catch(() => null);
  if (!fileHandle) {
    fileHandle = await directoryHandle.getFileHandle(FOLDER_STORAGE_BACKUP_FILE_NAME).catch(() => null);
  }
  if (!fileHandle) {
    throw new Error("V zvolenom priečinku sa nepodarilo nájsť súbor s dátami.");
  }
  const file = await fileHandle.getFile();
  const raw = await file.text();
  if (!String(raw || "").trim()) {
    throw new Error("Súbor s dátami je zatiaľ prázdny.");
  }
  state = normalizePersistedState(JSON.parse(raw));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeStateSnapshot()));
  } catch (error) {
    console.warn("Nepodarilo sa obnoviť browserovú poistku po načítaní z priečinka.", error);
  }
  if (!state.categories.some((item) => item.id === activeCategoryId)) {
    activeCategoryId = state.categories[0]?.id || null;
  }
  render();
  return true;
}

async function hydrateStateFromFolderStorage() {
  await loadStateFromFolderStorage({ requestAccess: false }).catch(() => null);
}

async function enableFolderStorageFromPicker() {
  if (!supportsFolderStorage()) {
    throw new Error("Tento prehliadač zatiaľ nevie zapisovať do priečinka v počítači.");
  }
  const directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
  const granted = await ensureFolderStoragePermission(directoryHandle, "readwrite", true);
  if (!granted) {
    throw new Error("Bez povolenia zapisovať sa priečinok nedá použiť.");
  }
  await setFolderStorageHandle(directoryHandle);
  saveFolderStoragePreferences({
    enabled: true,
    folderName: String(directoryHandle.name || "").trim(),
    fileName: FOLDER_STORAGE_FILE_NAME,
    lastSavedAt: ""
  });
  await writeStateToFolderStorage(JSON.stringify(serializeStateSnapshot()));
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    return;
  }
}

async function disableFolderStorage() {
  const serializedState = JSON.stringify(serializeStateSnapshot());
  try {
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    throw new Error("Aktuálne dáta sú už príliš veľké pre samotný prehliadač. Priečinok zatiaľ nechaj zapnutý.");
  }
  await clearFolderStorageHandle();
  clearFolderStoragePreferences();
}

function normalizeLocalAuthProfile(profile = {}) {
  if (!profile || typeof profile !== "object") return null;
  const email = String(profile.email || "").trim().toLowerCase();
  const passwordHash = String(profile.passwordHash || "").trim();
  const passwordSalt = String(profile.passwordSalt || "").trim();
  if (!email || !passwordHash || !passwordSalt) return null;
  return {
    userId: String(profile.userId || makeId("user")).trim() || makeId("user"),
    provider: "local",
    enabled: profile.enabled !== false,
    displayName: String(profile.displayName || "").trim(),
    email,
    passwordHash,
    passwordSalt,
    createdAt: String(profile.createdAt || new Date().toISOString()).trim() || new Date().toISOString(),
    updatedAt: String(profile.updatedAt || profile.createdAt || new Date().toISOString()).trim() || new Date().toISOString(),
    lastLoginAt: String(profile.lastLoginAt || "").trim()
  };
}

function loadLocalAuthProfile() {
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_PROFILE_KEY);
    if (!raw) return null;
    return normalizeLocalAuthProfile(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

function saveLocalAuthProfile(profile) {
  const normalized = normalizeLocalAuthProfile(profile);
  if (!normalized) return false;
  try {
    localStorage.setItem(LOCAL_AUTH_PROFILE_KEY, JSON.stringify(normalized));
    return true;
  } catch (error) {
    return false;
  }
}

function normalizeSupabasePreferences(value = {}) {
  if (!value || typeof value !== "object") {
    return {
      enabled: false,
      url: "",
      anonKey: "",
      configuredAt: "",
      lastCheckedAt: ""
    };
  }
  return {
    enabled: Boolean(value.enabled),
    url: String(value.url || "").trim(),
    anonKey: String(value.anonKey || "").trim(),
    configuredAt: String(value.configuredAt || "").trim(),
    lastCheckedAt: String(value.lastCheckedAt || "").trim()
  };
}

function loadSupabaseBootstrapPreferences() {
  if (typeof window === "undefined") return normalizeSupabasePreferences();
  const rawConfig = window.MOJA_ZAHRADA_SUPABASE;
  if (!rawConfig || typeof rawConfig !== "object") return normalizeSupabasePreferences();
  return normalizeSupabasePreferences(rawConfig);
}

function loadSupabasePreferences() {
  try {
    const raw = localStorage.getItem(SUPABASE_PREFERENCES_KEY);
    if (!raw) return loadSupabaseBootstrapPreferences();
    return normalizeSupabasePreferences(JSON.parse(raw));
  } catch (error) {
    return loadSupabaseBootstrapPreferences();
  }
}

function saveSupabasePreferences(value = {}) {
  const normalized = normalizeSupabasePreferences(value);
  try {
    localStorage.setItem(SUPABASE_PREFERENCES_KEY, JSON.stringify(normalized));
    return true;
  } catch (error) {
    return false;
  }
}

function normalizeSupabaseAuthMirror(value = {}) {
  if (!value || typeof value !== "object") {
    return {
      userId: "",
      email: "",
      signedInAt: "",
      provider: "email"
    };
  }
  return {
    userId: String(value.userId || "").trim(),
    email: String(value.email || "").trim().toLowerCase(),
    signedInAt: String(value.signedInAt || "").trim(),
    provider: String(value.provider || "email").trim() || "email"
  };
}

function loadSupabaseAuthMirror() {
  try {
    const raw = localStorage.getItem(SUPABASE_AUTH_MIRROR_KEY);
    if (!raw) return normalizeSupabaseAuthMirror();
    return normalizeSupabaseAuthMirror(JSON.parse(raw));
  } catch (error) {
    return normalizeSupabaseAuthMirror();
  }
}

function saveSupabaseAuthMirror(value = {}) {
  try {
    localStorage.setItem(SUPABASE_AUTH_MIRROR_KEY, JSON.stringify(normalizeSupabaseAuthMirror(value)));
    return true;
  } catch (error) {
    return false;
  }
}

function clearSupabaseAuthMirror() {
  try {
    localStorage.removeItem(SUPABASE_AUTH_MIRROR_KEY);
  } catch (error) {
    return;
  }
}

function normalizeSupabaseSyncMeta(value = {}) {
  if (!value || typeof value !== "object") {
    return {
      lastSyncedAt: "",
      categories: 0,
      cards: 0,
      tasks: 0,
      journal: 0,
      uploadedImages: 0
    };
  }
  return {
    lastSyncedAt: String(value.lastSyncedAt || "").trim(),
    categories: Number.isFinite(Number(value.categories)) ? Number(value.categories) : 0,
    cards: Number.isFinite(Number(value.cards)) ? Number(value.cards) : 0,
    tasks: Number.isFinite(Number(value.tasks)) ? Number(value.tasks) : 0,
    journal: Number.isFinite(Number(value.journal)) ? Number(value.journal) : 0,
    uploadedImages: Number.isFinite(Number(value.uploadedImages)) ? Number(value.uploadedImages) : 0
  };
}

function loadSupabaseSyncMeta() {
  try {
    const raw = localStorage.getItem(SUPABASE_SYNC_META_KEY);
    if (!raw) return normalizeSupabaseSyncMeta();
    return normalizeSupabaseSyncMeta(JSON.parse(raw));
  } catch (error) {
    return normalizeSupabaseSyncMeta();
  }
}

function saveSupabaseSyncMeta(value = {}) {
  try {
    localStorage.setItem(SUPABASE_SYNC_META_KEY, JSON.stringify(normalizeSupabaseSyncMeta(value)));
    return true;
  } catch (error) {
    return false;
  }
}

function supabaseLibrary() {
  const library = window.supabase;
  if (!library || typeof library.createClient !== "function") return null;
  return library;
}

function configuredSupabaseClient() {
  const preferences = loadSupabasePreferences();
  if (!preferences.enabled || !preferences.url || !preferences.anonKey) {
    throw new Error("Najprv si v Nastaveniach ulož Supabase URL a publishable key.");
  }
  const library = supabaseLibrary();
  if (!library) {
    throw new Error("Supabase knižnica sa zatiaľ nenačítala. Obnov appku a skús to znova.");
  }
  return library.createClient(preferences.url, preferences.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
}

async function testSupabaseConnection() {
  const client = configuredSupabaseClient();
  const { data, error } = await client.auth.getSession();
  if (error) {
    throw new Error(error.message || "Supabase spojenie sa nepodarilo overiť.");
  }
  const sessionUser = data?.session?.user;
  if (sessionUser?.email) {
    saveSupabaseAuthMirror({
      userId: sessionUser.id,
      email: sessionUser.email,
      signedInAt: data.session.created_at || new Date().toISOString(),
      provider: "email"
    });
  }
  const preferences = loadSupabasePreferences();
  saveSupabasePreferences({
    ...preferences,
    enabled: true,
    lastCheckedAt: new Date().toISOString()
  });
  return {
    hasSession: Boolean(data?.session)
  };
}

async function supabaseSignUpEmail(email = "", password = "") {
  const client = configuredSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email: String(email || "").trim().toLowerCase(),
    password: String(password || "")
  });
  if (error) {
    throw new Error(error.message || "Cloud účet sa nepodarilo vytvoriť.");
  }
  const userEmail = String(data?.user?.email || email || "").trim().toLowerCase();
  if (data?.session?.user?.id || data?.user?.id) {
    saveSupabaseAuthMirror({
      userId: data?.session?.user?.id || data?.user?.id || "",
      email: userEmail,
      signedInAt: data?.session?.created_at || new Date().toISOString(),
      provider: "email"
    });
  }
  return {
    userEmail,
    needsConfirmation: !data?.session
  };
}

async function supabaseSignInEmail(email = "", password = "") {
  const client = configuredSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: String(email || "").trim().toLowerCase(),
    password: String(password || "")
  });
  if (error) {
    throw new Error(error.message || "Cloud prihlásenie sa nepodarilo.");
  }
  const userEmail = String(data?.user?.email || email || "").trim().toLowerCase();
  saveSupabaseAuthMirror({
    userId: data?.user?.id || "",
    email: userEmail,
    signedInAt: data?.session?.created_at || new Date().toISOString(),
    provider: "email"
  });
  return {
    userEmail
  };
}

async function supabaseSignOut() {
  const client = configuredSupabaseClient();
  const { error } = await client.auth.signOut();
  if (error) {
    throw new Error(error.message || "Cloud odhlásenie sa nepodarilo.");
  }
  clearSupabaseAuthMirror();
}

function normalizeSupabaseStorageError(error, fallbackMessage) {
  const message = String(error?.message || fallbackMessage || "").trim();
  if (!message) return fallbackMessage || "Supabase operácia sa nepodarila.";
  if (/bucket/i.test(message)) {
    return `Bucket ${SUPABASE_IMAGE_BUCKET} zatiaľ neexistuje alebo ešte nemá správne pravidlá. Najprv spusti pripravený SQL skript v Supabase.`;
  }
  if (/mime type/i.test(message) && /not supported/i.test(message)) {
    return "Bucket zatiaľ nepovoľuje tento typ videa alebo súboru. Spusti malý SQL update pre video formáty v Supabase a potom to skús znova.";
  }
  if ((/size/i.test(message) || /large/i.test(message)) && (/limit/i.test(message) || /exceed/i.test(message))) {
    return `Súbor je väčší než aktuálny cloud limit. Pre video odporúčam mať v buckete limit aspoň ${formatReadableFileSize(SUPABASE_VIDEO_FILE_LIMIT_BYTES)}.`;
  }
  return message;
}

async function requireSupabaseSessionUser(client = configuredSupabaseClient()) {
  const { data, error } = await client.auth.getSession();
  if (error) {
    throw new Error(error.message || "Cloud session sa nepodarilo overiť.");
  }
  const sessionUser = data?.session?.user || null;
  if (!sessionUser?.id) {
    throw new Error("Najprv sa prihlás do cloud účtu v časti Supabase Auth.");
  }
  saveSupabaseAuthMirror({
    userId: sessionUser.id,
    email: sessionUser.email || "",
    signedInAt: data?.session?.created_at || new Date().toISOString(),
    provider: "email"
  });
  return sessionUser;
}

function supabaseImageExtension(mimeType = "") {
  const normalized = String(mimeType || "").trim().toLowerCase();
  if (normalized === "image/png") return "png";
  if (normalized === "image/webp") return "webp";
  if (normalized === "image/heic") return "heic";
  if (normalized === "image/heif") return "heif";
  return "jpg";
}

function decodeImageDataUrl(value = "") {
  const match = String(value || "").match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (!match) {
    throw new Error("Obrázok nemá podporovaný data URL formát.");
  }
  const [, mimeType, base64Data] = match;
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return {
    mimeType,
    bytes
  };
}

function sanitizeStoragePathSegment(value = "") {
  return slugify(String(value || "").trim()) || "item";
}

function safeSupabaseDate(value = "") {
  const normalized = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;
}

function safeSupabaseTimestamp(value = "") {
  const normalized = String(value || "").trim();
  if (!normalized) return null;
  return normalized;
}

function chunkItems(items = [], size = 100) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function formatReadableFileSize(bytes = 0) {
  const normalized = Number(bytes);
  if (!Number.isFinite(normalized) || normalized <= 0) return "0 B";
  if (normalized < 1024) return `${Math.round(normalized)} B`;
  if (normalized < 1024 * 1024) return `${(normalized / 1024).toFixed(1)} KB`;
  return `${(normalized / (1024 * 1024)).toFixed(1)} MB`;
}

async function uploadProcessableImageToSupabase(client, { userId = "", entity = "misc", clientId = "", index = 0, source = "" } = {}) {
  const normalizedSource = String(source || "").trim();
  if (!normalizedSource) return "";
  const extractedStoragePath = extractSupabaseStoragePath(normalizedSource);
  if (extractedStoragePath) return extractedStoragePath;
  if (String(userId || "").trim() && normalizedSource.startsWith(`${String(userId || "").trim()}/`)) {
    return normalizedSource;
  }
  if (!isProcessableImageDataUrl(normalizedSource)) return normalizedSource;

  const { mimeType, bytes } = decodeImageDataUrl(normalizedSource);
  const extension = supabaseImageExtension(mimeType);
  const path = [
    String(userId || "").trim(),
    sanitizeStoragePathSegment(entity),
    sanitizeStoragePathSegment(clientId),
    `${String(index + 1).padStart(2, "0")}.${extension}`
  ].join("/");

  const { error } = await client.storage
    .from(SUPABASE_IMAGE_BUCKET)
    .upload(path, bytes, {
      contentType: mimeType,
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    throw new Error(normalizeSupabaseStorageError(error, "Obrázok sa do Supabase nepodarilo nahrať."));
  }

  return path;
}

function fileExtensionFromUpload(file) {
  const fileName = String(file?.name || "").trim();
  const fromName = fileName.includes(".") ? fileName.split(".").pop() : "";
  if (fromName) return sanitizeStoragePathSegment(fromName).replace(/[^a-z0-9]/gi, "") || "bin";

  const mimeType = String(file?.type || "").trim().toLowerCase();
  if (mimeType === "video/mp4") return "mp4";
  if (mimeType === "video/webm") return "webm";
  if (mimeType === "video/quicktime") return "mov";
  return "bin";
}

async function uploadFileToSupabase(client, { userId = "", entity = "misc", clientId = "", file, fileBaseName = "01" } = {}) {
  if (!(file instanceof File) || !file.size) {
    throw new Error("Súbor na nahratie nie je platný.");
  }

  const path = [
    String(userId || "").trim(),
    sanitizeStoragePathSegment(entity),
    sanitizeStoragePathSegment(clientId),
    `${sanitizeStoragePathSegment(fileBaseName)}.${fileExtensionFromUpload(file)}`
  ].join("/");

  const { error } = await client.storage
    .from(SUPABASE_IMAGE_BUCKET)
    .upload(path, file, {
      contentType: String(file.type || "").trim() || "application/octet-stream",
      cacheControl: "3600",
      upsert: true
    });

  if (error) {
    throw new Error(normalizeSupabaseStorageError(error, "Súbor sa do Supabase nepodarilo nahrať."));
  }

  return path;
}

function isDirectRenderableImageSource(value = "") {
  const normalized = String(value || "").trim();
  if (!normalized) return false;
  return normalized.startsWith("data:")
    || normalized.startsWith("blob:")
    || normalized.startsWith("http://")
    || normalized.startsWith("https://")
    || normalized.startsWith("assets/");
}

function extractSupabaseStoragePath(source = "") {
  const normalized = String(source || "").trim();
  if (!normalized || !/^https?:\/\//i.test(normalized)) return "";
  try {
    const url = new URL(normalized);
    const pathname = decodeURIComponent(String(url.pathname || ""));
    const markers = [
      `/storage/v1/object/sign/${SUPABASE_IMAGE_BUCKET}/`,
      `/storage/v1/object/public/${SUPABASE_IMAGE_BUCKET}/`
    ];
    for (const marker of markers) {
      if (pathname.includes(marker)) {
        return pathname.split(marker)[1] || "";
      }
    }
  } catch (error) {
    return "";
  }
  return "";
}

async function listSupabaseStorageFiles(client, rootPath = "") {
  const paths = [];
  const queue = [String(rootPath || "").trim()];

  while (queue.length) {
    const currentPath = queue.shift();
    const { data, error } = await client.storage
      .from(SUPABASE_IMAGE_BUCKET)
      .list(currentPath, { limit: 1000, sortBy: { column: "name", order: "asc" } });

    if (error) {
      throw new Error(normalizeSupabaseStorageError(error, "Cloud obrázky sa nepodarilo skontrolovať."));
    }

    (Array.isArray(data) ? data : []).forEach((item) => {
      const itemName = String(item?.name || "").trim();
      if (!itemName) return;
      const nextPath = currentPath ? `${currentPath}/${itemName}` : itemName;
      if (item?.id) {
        paths.push(nextPath);
        return;
      }
      queue.push(nextPath);
    });
  }

  return paths;
}

async function resolveSupabaseStorageImage(client, source = "") {
  const normalized = String(source || "").trim();
  if (!normalized) return "";
  if (isDirectRenderableImageSource(normalized)) return normalized;

  const { data, error } = await client.storage
    .from(SUPABASE_IMAGE_BUCKET)
    .createSignedUrl(normalized, 60 * 60 * 24 * 7);

  if (error) {
    console.warn("Nepodarilo sa pripraviť podpísaný obrázok zo storage", normalized, error);
    return "";
  }
  return String(data?.signedUrl || "").trim();
}

async function resolveSupabaseStorageImages(client, values = []) {
  const normalizedValues = [...new Set((Array.isArray(values) ? values : [values])
    .map((value) => String(value || "").trim())
    .filter(Boolean))];

  const resolved = await Promise.all(normalizedValues.map((value) => resolveSupabaseStorageImage(client, value)));
  return resolved.filter(Boolean);
}

async function syncStateToSupabase() {
  const client = configuredSupabaseClient();
  const user = await requireSupabaseSessionUser(client);
  const localProfile = loadLocalAuthProfile();
  const weatherPreferences = loadWeatherPreferences();
  const normalizedCards = state.varieties.map(normalizeVarietyRecord);
  const normalizedTasks = state.customTasks.map((task) => normalizeTaskRecord(task, normalizedCards));
  const normalizedJournal = state.journal.map((entry) => normalizeJournalEntry(entry, normalizedCards));
  let uploadedImages = 0;

  const countUploadedImage = (originalSource, nextSource) => {
    if (isProcessableImageDataUrl(originalSource) && nextSource && nextSource !== originalSource) {
      uploadedImages += 1;
    }
  };

  const profilePayload = {
    id: user.id,
    email: String(user.email || "").trim().toLowerCase(),
    display_name: localAuthDisplayName(localProfile) || String(user.user_metadata?.display_name || "").trim(),
    avatar_path: "",
    preferences: {
      weatherPlace: String(weatherPreferences?.placeLabel || GARDEN_WEATHER_PLACE).trim() || GARDEN_WEATHER_PLACE,
      localAccountEnabled: Boolean(localProfile?.enabled)
    }
  };

  const profileResult = await client
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" });

  if (profileResult.error) {
    throw new Error(profileResult.error.message || "Profil sa do Supabase nepodarilo uložiť.");
  }

  const categoryRows = [];
  for (const category of state.categories) {
    const originalImage = String(category?.image || "").trim();
    const syncedImage = originalImage
      ? await uploadProcessableImageToSupabase(client, {
        userId: user.id,
        entity: "categories",
        clientId: String(category?.id || "category").trim(),
        index: 0,
        source: originalImage
      })
      : "";
    countUploadedImage(originalImage, syncedImage);
    categoryRows.push({
      user_id: user.id,
      client_id: String(category?.id || "").trim(),
      parent_client_id: String(category?.parentCategoryId || "").trim(),
      name: String(category?.name || "").trim(),
      node_type: String(category?.nodeType || "kind").trim() || "kind",
      group_name: String(category?.group || "").trim(),
      order_index: Number.isFinite(Number(category?.order)) ? Number(category.order) : 0,
      color: String(category?.color || "#7e9f4b").trim() || "#7e9f4b",
      image_path: syncedImage,
      notes: String(category?.notes || "").trim(),
      recommended_sowing_window: String(category?.recommendedSowingWindow || "").trim(),
      sowed_at: String(category?.sowedAt || "").trim(),
      data: {
        ...category,
        image: syncedImage
      }
    });
  }

  const cardRows = [];
  for (const card of normalizedCards) {
    const originalImages = normalizeVarietyImages(card);
    const syncedImages = [];
    for (let index = 0; index < originalImages.length; index += 1) {
      const syncedImage = await uploadProcessableImageToSupabase(client, {
        userId: user.id,
        entity: "cards",
        clientId: String(card?.id || "card").trim(),
        index,
        source: originalImages[index]
      });
      countUploadedImage(originalImages[index], syncedImage);
      if (syncedImage) syncedImages.push(syncedImage);
    }
    cardRows.push({
      user_id: user.id,
      client_id: String(card?.id || "").trim(),
      category_client_id: String(card?.categoryId || "").trim(),
      entry_kind: String(card?.entryKind || "detail").trim() || "detail",
      card_type: String(card?.cardType || "variety").trim() || "variety",
      name: String(card?.name || "").trim(),
      detail_type: String(card?.type || "").trim(),
      status: String(card?.status || "").trim(),
      notes: String(card?.notes || "").trim(),
      place: String(card?.place || "").trim(),
      places: Array.isArray(card?.places) ? card.places : [],
      top: Boolean(card?.top),
      rating: Number.isFinite(Number(card?.rating)) ? Number(card.rating) : 0,
      image_path: syncedImages[0] || "",
      images: syncedImages,
      sowing_window: String(card?.sowingWindow || "").trim(),
      sowing_window_auto: Boolean(card?.sowingWindowAuto),
      sowed_at: safeSupabaseDate(card?.sowedAt),
      transplanted_at: safeSupabaseDate(card?.transplantedAt),
      harvested_at: safeSupabaseDate(card?.harvestedAt),
      data: {
        ...card,
        images: syncedImages,
        image: syncedImages[0] || ""
      }
    });
  }

  const taskRows = normalizedTasks.map((task) => ({
    user_id: user.id,
    client_id: String(task?.id || "").trim(),
    text: String(task?.text || "").trim(),
    due_on: safeSupabaseDate(task?.date),
    done: Boolean(task?.done),
    source: String(task?.source || "").trim(),
    linked_category_ids: Array.isArray(task?.linkedCategoryIds) ? task.linkedCategoryIds : [],
    linked_variety_id: String(task?.linkedVarietyId || "").trim(),
    data: { ...task }
  }));

  const journalRows = [];
  for (const entry of normalizedJournal) {
    const originalImages = journalImages(entry);
    const originalVideo = journalVideo(entry);
    const rawVideoPath = String(entry?.videoPath || "").trim();
    const syncedImages = [];
    for (let index = 0; index < originalImages.length; index += 1) {
      const syncedImage = await uploadProcessableImageToSupabase(client, {
        userId: user.id,
        entity: "journal",
        clientId: String(entry?.id || "journal").trim(),
        index,
        source: originalImages[index]
      });
      countUploadedImage(originalImages[index], syncedImage);
      if (syncedImage) syncedImages.push(syncedImage);
    }
    const syncedVideoPath = originalVideo
      ? await uploadProcessableImageToSupabase(client, {
        userId: user.id,
        entity: "journal",
        clientId: String(entry?.id || "journal").trim(),
        index: 999,
        source: rawVideoPath || originalVideo
      })
      : "";
    journalRows.push({
      user_id: user.id,
      client_id: String(entry?.id || "").trim(),
      title: String(entry?.title || "Zápis").trim() || "Zápis",
      body: String(entry?.text || "").trim(),
      entry_type: String(entry?.entryType || "note").trim() || "note",
      entry_at: safeSupabaseTimestamp(entry?.date),
      mood: String(entry?.mood || "").trim(),
      place: String(entry?.place || "").trim(),
      tags: Array.isArray(entry?.tags) ? entry.tags : [],
      weather: entry?.weather && typeof entry.weather === "object" ? entry.weather : {},
      linked_category_ids: Array.isArray(entry?.linkedCategoryIds) ? entry.linkedCategoryIds : [],
      linked_variety_id: String(entry?.linkedVarietyId || "").trim(),
      linked_entity_name: String(entry?.linkedEntityName || "").trim(),
      image_path: syncedImages[0] || "",
      images: syncedImages,
      data: {
        ...entry,
        images: syncedImages,
        image: syncedImages[0] || "",
        videoPath: syncedVideoPath || rawVideoPath || "",
        video: syncedVideoPath || rawVideoPath || originalVideo || "",
        videoName: String(entry?.videoName || "").trim(),
        videoMimeType: String(entry?.videoMimeType || "").trim()
      }
    });
  }

  const upsertTableRows = async (tableName, rows) => {
    if (!rows.length) return;
    const chunks = chunkItems(rows, 100);
    for (const chunk of chunks) {
      const { error } = await client
        .from(tableName)
        .upsert(chunk, { onConflict: "user_id,client_id" });
      if (error) {
        throw new Error(error.message || `Tabuľku ${tableName} sa nepodarilo zosynchronizovať.`);
      }
    }
  };

  const deleteMissingTableRows = async (tableName, localClientIds = []) => {
    const { data, error } = await client
      .from(tableName)
      .select("client_id");

    if (error) {
      throw new Error(error.message || `Tabuľku ${tableName} sa nepodarilo pripraviť na zrkadlenie.`);
    }

    const localIdSet = new Set(localClientIds.map((value) => String(value || "").trim()).filter(Boolean));
    const idsToDelete = (Array.isArray(data) ? data : [])
      .map((row) => String(row?.client_id || "").trim())
      .filter(Boolean)
      .filter((clientId) => !localIdSet.has(clientId));

    if (!idsToDelete.length) return 0;

    const chunks = chunkItems(idsToDelete, 100);
    for (const chunk of chunks) {
      const { error: deleteError } = await client
        .from(tableName)
        .delete()
        .in("client_id", chunk);

      if (deleteError) {
        throw new Error(deleteError.message || `Tabuľku ${tableName} sa nepodarilo zrkadliť podľa lokálu.`);
      }
    }

    return idsToDelete.length;
  };

  await upsertTableRows("categories", categoryRows);
  await upsertTableRows("cards", cardRows);
  await upsertTableRows("tasks", taskRows);
  await upsertTableRows("journal_entries", journalRows);

  const deletedCategories = await deleteMissingTableRows("categories", categoryRows.map((row) => row.client_id));
  const deletedCards = await deleteMissingTableRows("cards", cardRows.map((row) => row.client_id));
  const deletedTasks = await deleteMissingTableRows("tasks", taskRows.map((row) => row.client_id));
  const deletedJournal = await deleteMissingTableRows("journal_entries", journalRows.map((row) => row.client_id));

  const desiredStoragePaths = new Set([
    ...categoryRows.flatMap((row) => [row.image_path]),
    ...cardRows.flatMap((row) => [row.image_path, ...(Array.isArray(row.images) ? row.images : [])]),
    ...journalRows.flatMap((row) => [row.image_path, ...(Array.isArray(row.images) ? row.images : []), String(row?.data?.videoPath || "").trim()])
  ].map((value) => String(value || "").trim()).filter((value) => value.startsWith(`${user.id}/`)));

  const existingStoragePaths = await listSupabaseStorageFiles(client, user.id);
  const storagePathsToDelete = existingStoragePaths.filter((path) => !desiredStoragePaths.has(path));

  if (storagePathsToDelete.length) {
    const chunks = chunkItems(storagePathsToDelete, 100);
    for (const chunk of chunks) {
      const { error } = await client.storage
        .from(SUPABASE_IMAGE_BUCKET)
        .remove(chunk);

      if (error) {
        throw new Error(normalizeSupabaseStorageError(error, "Cloud obrázky sa nepodarilo zrkadliť podľa lokálu."));
      }
    }
  }

  const result = {
    lastSyncedAt: new Date().toISOString(),
    categories: categoryRows.length,
    cards: cardRows.length,
    tasks: taskRows.length,
    journal: journalRows.length,
    uploadedImages,
    deletedCategories,
    deletedCards,
    deletedTasks,
    deletedJournal,
    deletedImages: storagePathsToDelete.length
  };
  saveSupabaseSyncMeta(result);
  return result;
}

async function importStateFromSupabase() {
  const client = configuredSupabaseClient();
  await requireSupabaseSessionUser(client);

  const [
    categoriesResult,
    cardsResult,
    tasksResult,
    journalResult
  ] = await Promise.all([
    client.from("categories").select("*").order("order_index", { ascending: true }),
    client.from("cards").select("*").order("created_at", { ascending: true }),
    client.from("tasks").select("*").order("due_on", { ascending: true }),
    client.from("journal_entries").select("*").order("entry_at", { ascending: false })
  ]);

  if (categoriesResult.error) throw new Error(categoriesResult.error.message || "Kategórie sa z cloudu nepodarilo načítať.");
  if (cardsResult.error) throw new Error(cardsResult.error.message || "Karty sa z cloudu nepodarilo načítať.");
  if (tasksResult.error) throw new Error(tasksResult.error.message || "Úlohy sa z cloudu nepodarilo načítať.");
  if (journalResult.error) throw new Error(journalResult.error.message || "Denník sa z cloudu nepodarilo načítať.");

  const categoryRows = Array.isArray(categoriesResult.data) ? categoriesResult.data : [];
  const cardRows = Array.isArray(cardsResult.data) ? cardsResult.data : [];
  const taskRows = Array.isArray(tasksResult.data) ? tasksResult.data : [];
  const journalRows = Array.isArray(journalResult.data) ? journalResult.data : [];

  if (!categoryRows.length && !cardRows.length && !taskRows.length && !journalRows.length) {
    throw new Error("V cloude zatiaľ nevidím žiadne dáta na načítanie.");
  }

  const importedCategories = await Promise.all(categoryRows.map(async (row) => {
    const fallbackData = row?.data && typeof row.data === "object" ? row.data : {};
    const resolvedImage = await resolveSupabaseStorageImage(client, String(row?.image_path || fallbackData.image || "").trim());
    return {
      ...fallbackData,
      id: String(row?.client_id || fallbackData.id || "").trim(),
      parentCategoryId: String(row?.parent_client_id || fallbackData.parentCategoryId || "").trim(),
      name: String(row?.name || fallbackData.name || "").trim(),
      nodeType: String(row?.node_type || fallbackData.nodeType || "kind").trim() || "kind",
      group: String(row?.group_name || fallbackData.group || "").trim(),
      order: Number.isFinite(Number(row?.order_index)) ? Number(row.order_index) : Number(fallbackData.order || 0),
      color: String(row?.color || fallbackData.color || "#7e9f4b").trim() || "#7e9f4b",
      image: resolvedImage || String(row?.image_path || fallbackData.image || "").trim(),
      notes: String(row?.notes || fallbackData.notes || "").trim(),
      recommendedSowingWindow: String(row?.recommended_sowing_window || fallbackData.recommendedSowingWindow || "").trim(),
      sowedAt: String(row?.sowed_at || fallbackData.sowedAt || "").trim()
    };
  }));

  const importedCards = await Promise.all(cardRows.map(async (row) => {
    const fallbackData = row?.data && typeof row.data === "object" ? row.data : {};
    const imageValues = Array.isArray(row?.images) && row.images.length
      ? row.images
      : (Array.isArray(fallbackData.images) ? fallbackData.images : [row?.image_path || fallbackData.image || ""]);
    const resolvedImages = await resolveSupabaseStorageImages(client, imageValues);
    const finalImages = resolvedImages.length
      ? resolvedImages
      : imageValues.map((value) => String(value || "").trim()).filter(Boolean);
    return {
      ...fallbackData,
      id: String(row?.client_id || fallbackData.id || "").trim(),
      categoryId: String(row?.category_client_id || fallbackData.categoryId || "").trim(),
      entryKind: String(row?.entry_kind || fallbackData.entryKind || "detail").trim() || "detail",
      cardType: String(row?.card_type || fallbackData.cardType || "variety").trim() || "variety",
      name: String(row?.name || fallbackData.name || "").trim(),
      type: String(row?.detail_type || fallbackData.type || "").trim(),
      status: String(row?.status || fallbackData.status || "").trim(),
      notes: String(row?.notes || fallbackData.notes || "").trim(),
      place: String(row?.place || fallbackData.place || "").trim(),
      places: Array.isArray(row?.places) ? row.places : (Array.isArray(fallbackData.places) ? fallbackData.places : []),
      top: row?.top === undefined ? Boolean(fallbackData.top) : Boolean(row.top),
      rating: Number.isFinite(Number(row?.rating)) ? Number(row.rating) : Number(fallbackData.rating || 0),
      image: finalImages[0] || "",
      images: finalImages,
      sowingWindow: String(row?.sowing_window || fallbackData.sowingWindow || "").trim(),
      sowingWindowAuto: row?.sowing_window_auto === undefined ? Boolean(fallbackData.sowingWindowAuto) : Boolean(row.sowing_window_auto),
      sowedAt: String(row?.sowed_at || fallbackData.sowedAt || "").trim(),
      transplantedAt: String(row?.transplanted_at || fallbackData.transplantedAt || "").trim(),
      harvestedAt: String(row?.harvested_at || fallbackData.harvestedAt || "").trim()
    };
  }));

  const importedTasks = taskRows.map((row) => {
    const fallbackData = row?.data && typeof row.data === "object" ? row.data : {};
    const linkedCategoryIds = Array.isArray(row?.linked_category_ids)
      ? row.linked_category_ids
      : (Array.isArray(fallbackData.linkedCategoryIds) ? fallbackData.linkedCategoryIds : []);
    return {
      ...fallbackData,
      id: String(row?.client_id || fallbackData.id || "").trim(),
      text: String(row?.text || fallbackData.text || "").trim(),
      date: String(row?.due_on || fallbackData.date || "").trim(),
      done: row?.done === undefined ? Boolean(fallbackData.done) : Boolean(row.done),
      source: String(row?.source || fallbackData.source || "").trim(),
      linkedCategoryIds,
      linkedCategoryId: linkedCategoryIds[0] || String(fallbackData.linkedCategoryId || "").trim(),
      linkedVarietyId: String(row?.linked_variety_id || fallbackData.linkedVarietyId || "").trim()
    };
  });

  const importedJournal = await Promise.all(journalRows.map(async (row) => {
    const fallbackData = row?.data && typeof row.data === "object" ? row.data : {};
    const imageValues = Array.isArray(row?.images) && row.images.length
      ? row.images
      : (Array.isArray(fallbackData.images) ? fallbackData.images : [row?.image_path || fallbackData.image || ""]);
    const resolvedImages = await resolveSupabaseStorageImages(client, imageValues);
    const finalImages = resolvedImages.length
      ? resolvedImages
      : imageValues.map((value) => String(value || "").trim()).filter(Boolean);
    const rawVideoPath = String(fallbackData.videoPath || "").trim() || extractSupabaseStoragePath(String(fallbackData.video || "").trim());
    const resolvedVideo = rawVideoPath
      ? await resolveSupabaseStorageImage(client, rawVideoPath)
      : String(fallbackData.video || "").trim();
    const linkedCategoryIds = Array.isArray(row?.linked_category_ids)
      ? row.linked_category_ids
      : (Array.isArray(fallbackData.linkedCategoryIds) ? fallbackData.linkedCategoryIds : []);
    return {
      ...fallbackData,
      id: String(row?.client_id || fallbackData.id || "").trim(),
      title: String(row?.title || fallbackData.title || "Zápis").trim() || "Zápis",
      text: String(row?.body || fallbackData.text || "").trim(),
      date: String(row?.entry_at || fallbackData.date || "").trim(),
      entryType: String(row?.entry_type || fallbackData.entryType || "note").trim() || "note",
      mood: String(row?.mood || fallbackData.mood || "").trim(),
      place: String(row?.place || fallbackData.place || "").trim(),
      tags: Array.isArray(row?.tags) ? row.tags : (Array.isArray(fallbackData.tags) ? fallbackData.tags : []),
      weather: row?.weather && typeof row.weather === "object" ? row.weather : (fallbackData.weather && typeof fallbackData.weather === "object" ? fallbackData.weather : null),
      linkedCategoryIds,
      linkedCategoryId: linkedCategoryIds[0] || String(fallbackData.linkedCategoryId || "").trim(),
      linkedVarietyId: String(row?.linked_variety_id || fallbackData.linkedVarietyId || "").trim(),
      linkedEntityName: String(row?.linked_entity_name || fallbackData.linkedEntityName || "").trim(),
      image: finalImages[0] || "",
      images: finalImages,
      video: resolvedVideo,
      videoPath: rawVideoPath,
      videoName: String(fallbackData.videoName || "").trim(),
      videoMimeType: String(fallbackData.videoMimeType || "").trim()
    };
  }));

  const previousState = serializeStateSnapshot();
  const previousActiveCategoryId = activeCategoryId;
  const nextState = normalizePersistedState({
    categories: importedCategories,
    varieties: importedCards,
    customTasks: importedTasks,
    journal: importedJournal,
    autoTasks: Array.isArray(previousState.autoTasks) ? previousState.autoTasks : []
  });

  saveImportBackupSnapshot(previousState);
  state = nextState;
  if (!state.categories.some((item) => item.id === activeCategoryId)) {
    activeCategoryId = state.categories[0]?.id || null;
  }

  if (!persist()) {
    state = normalizePersistedState(previousState);
    activeCategoryId = previousActiveCategoryId;
    persist();
    throw new Error("Cloud dáta sa načítali, ale nový lokálny stav sa nepodarilo bezpečne uložiť.");
  }

  render();
  return {
    categories: importedCategories.length,
    cards: importedCards.length,
    tasks: importedTasks.length,
    journal: importedJournal.length
  };
}

async function fetchSupabaseStateSummary() {
  const client = configuredSupabaseClient();
  const user = await requireSupabaseSessionUser(client);

  const countTable = async (tableName) => {
    const { count, error } = await client
      .from(tableName)
      .select("id", { count: "exact", head: true });
    if (error) {
      throw new Error(error.message || `Tabuľku ${tableName} sa nepodarilo porovnať.`);
    }
    return Number.isFinite(Number(count)) ? Number(count) : 0;
  };

  const latestUpdatedAtForTable = async (tableName) => {
    const { data, error } = await client
      .from(tableName)
      .select("updated_at")
      .order("updated_at", { ascending: false })
      .limit(1);
    if (error) {
      throw new Error(error.message || `Tabuľku ${tableName} sa nepodarilo skontrolovať.`);
    }
    return String(data?.[0]?.updated_at || "").trim();
  };

  const [
    categories,
    cards,
    tasks,
    journal,
    latestCategoryUpdate,
    latestCardUpdate,
    latestTaskUpdate,
    latestJournalUpdate
  ] = await Promise.all([
    countTable("categories"),
    countTable("cards"),
    countTable("tasks"),
    countTable("journal_entries"),
    latestUpdatedAtForTable("categories"),
    latestUpdatedAtForTable("cards"),
    latestUpdatedAtForTable("tasks"),
    latestUpdatedAtForTable("journal_entries")
  ]);

  const latestUpdatedAt = [
    latestCategoryUpdate,
    latestCardUpdate,
    latestTaskUpdate,
    latestJournalUpdate
  ].filter(Boolean).sort().at(-1) || "";

  const imageFiles = (await listSupabaseStorageFiles(client, user.id)).length;

  return {
    categories,
    cards,
    tasks,
    journal,
    latestUpdatedAt,
    imageFiles
  };
}

function loadLocalAuthSession() {
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      userId: String(parsed.userId || "").trim(),
      email: String(parsed.email || "").trim().toLowerCase(),
      displayName: String(parsed.displayName || "").trim(),
      signedInAt: String(parsed.signedInAt || "").trim()
    };
  } catch (error) {
    return null;
  }
}

function saveLocalAuthSession(session = {}) {
  try {
    localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify({
      userId: String(session.userId || "").trim(),
      email: String(session.email || "").trim().toLowerCase(),
      displayName: String(session.displayName || "").trim(),
      signedInAt: String(session.signedInAt || new Date().toISOString()).trim() || new Date().toISOString()
    }));
    return true;
  } catch (error) {
    return false;
  }
}

function clearLocalAuthSession() {
  try {
    localStorage.removeItem(LOCAL_AUTH_SESSION_KEY);
  } catch (error) {
    return;
  }
}

function localAuthDisplayName(profile = loadLocalAuthProfile()) {
  const normalized = normalizeLocalAuthProfile(profile || {});
  if (!normalized) return "";
  return String(normalized.displayName || normalized.email || "").trim();
}

function isLocalAuthSessionValid(profile = loadLocalAuthProfile(), session = loadLocalAuthSession()) {
  const normalizedProfile = normalizeLocalAuthProfile(profile || {});
  if (!normalizedProfile?.enabled) return false;
  if (!session || typeof session !== "object") return false;
  const sessionEmail = String(session.email || "").trim().toLowerCase();
  const sessionUserId = String(session.userId || "").trim();
  return Boolean(sessionEmail && sessionEmail === normalizedProfile.email && sessionUserId && sessionUserId === normalizedProfile.userId);
}

async function sha256Hex(value = "") {
  if (!window.crypto?.subtle || typeof TextEncoder === "undefined") {
    throw new Error("Tento prehliadač zatiaľ nepodporuje bezpečné lokálne prihlasovanie.");
  }
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value || "")));
  return [...new Uint8Array(digest)].map((item) => item.toString(16).padStart(2, "0")).join("");
}

function makeLocalAuthSalt() {
  if (!window.crypto?.getRandomValues) {
    throw new Error("Tento prehliadač zatiaľ nevie pripraviť bezpečný lokálny účet.");
  }
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return [...bytes].map((item) => item.toString(16).padStart(2, "0")).join("");
}

async function hashLocalAuthPassword(password = "", salt = "") {
  return sha256Hex(`${String(salt || "").trim()}::${String(password || "")}`);
}

async function buildLocalAuthProfile({ displayName = "", email = "", password = "" } = {}) {
  const safeEmail = String(email || "").trim().toLowerCase();
  const safeName = String(displayName || "").trim();
  const salt = makeLocalAuthSalt();
  return {
    userId: makeId("user"),
    provider: "local",
    enabled: true,
    displayName: safeName,
    email: safeEmail,
    passwordSalt: salt,
    passwordHash: await hashLocalAuthPassword(password, salt),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: ""
  };
}

async function verifyLocalAuthPassword(password = "", profile = loadLocalAuthProfile()) {
  const normalizedProfile = normalizeLocalAuthProfile(profile || {});
  if (!normalizedProfile) return false;
  const candidateHash = await hashLocalAuthPassword(password, normalizedProfile.passwordSalt);
  return candidateHash === normalizedProfile.passwordHash;
}

function authGateRoot() {
  return document.getElementById("auth-gate-root");
}

function removeAuthGate() {
  const root = authGateRoot();
  if (root) root.remove();
  document.body.classList.remove("app-auth-locked");
  unlockBodyScroll("auth");
  authGatePreviousOverflow = null;
}

function ensureAuthGateRoot() {
  let root = authGateRoot();
  if (root) return root;
  root = document.createElement("div");
  root.id = "auth-gate-root";
  document.body.appendChild(root);
  return root;
}

function closeSecondaryOverlaysForAuthLock() {
  closeToolbarAddMenu();
  closeJournalOverlay();
  closeImageLightbox();
  if (detailModal?.open) {
    detailModal.close();
  }
}

function lockAppToAuth() {
  clearLocalAuthSession();
  closeSecondaryOverlaysForAuthLock();
  syncAuthGate("Appka je zamknutá. Prihlás sa znova.", "success");
}

function syncAuthGate(statusMessage = "", tone = "") {
  const profile = loadLocalAuthProfile();
  if (!profile?.enabled) {
    removeAuthGate();
    return;
  }
  if (isLocalAuthSessionValid(profile)) {
    removeAuthGate();
    return;
  }

  const root = ensureAuthGateRoot();
  const defaultStatus = tone
    ? statusMessage
    : `Prihlás sa do účtu ${localAuthDisplayName(profile)} a pokračuj tam, kde si skončila.`;
  if (authGatePreviousOverflow === null) {
    authGatePreviousOverflow = document.body.style.overflow;
  }
  lockBodyScroll("auth");
  document.body.classList.add("app-auth-locked");
  root.innerHTML = `
    <div class="auth-gate">
      <div class="auth-gate__backdrop"></div>
      <section class="auth-gate__sheet">
        <p class="eyebrow">Lokálny účet</p>
        <h2>Prihlásenie do appky</h2>
        <p class="auth-gate__lead">Účet je zatiaľ len lokálny v tomto prehliadači, ale pripravuje nám čistú cestu k budúcemu cloudu a synchronizácii.</p>
        <div class="auth-gate__identity">
          <span>${escapeHtml(localAuthDisplayName(profile))}</span>
          <strong>${escapeHtml(profile.email)}</strong>
        </div>
        <form id="auth-gate-form" class="auth-gate__form">
          <label class="field-block field-block--full">
            <span>Heslo</span>
            <input name="password" type="password" placeholder="Sem zadaj svoje heslo" autocomplete="current-password" required>
          </label>
          <div class="auth-gate__actions">
            <button class="button" type="submit">Prihlásiť sa</button>
          </div>
          <p class="settings-panel__status ${tone ? `is-${tone}` : ""}" data-auth-gate-status>${escapeHtml(defaultStatus)}</p>
        </form>
      </section>
    </div>
  `;

  root.querySelector("#auth-gate-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") || "");
    if (!password.trim()) {
      syncAuthGate("Najprv zadaj heslo k svojmu účtu.", "error");
      return;
    }
    try {
      const isValid = await verifyLocalAuthPassword(password, profile);
      if (!isValid) {
        syncAuthGate("Heslo nesedí. Skús ho zadať ešte raz.", "error");
        return;
      }
      const nextProfile = {
        ...profile,
        lastLoginAt: new Date().toISOString(),
        updatedAt: profile.updatedAt || new Date().toISOString()
      };
      saveLocalAuthProfile(nextProfile);
      saveLocalAuthSession({
        userId: nextProfile.userId,
        email: nextProfile.email,
        displayName: localAuthDisplayName(nextProfile),
        signedInAt: new Date().toISOString()
      });
      removeAuthGate();
      render();
    } catch (error) {
      syncAuthGate(error instanceof Error ? error.message : "Prihlásenie sa teraz nepodarilo overiť.", "error");
    }
  });
}

function loadWeatherPreferences() {
  try {
    const raw = localStorage.getItem(WEATHER_PREFERENCES_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const placeLabel = String(parsed.placeLabel || "").trim();
    const latitude = Number(parsed.latitude);
    const longitude = Number(parsed.longitude);
    if (!placeLabel || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return {
      latitude,
      longitude,
      placeLabel,
      source: String(parsed.source || "").trim()
    };
  } catch (error) {
    return null;
  }
}

function saveWeatherPreferences(preferences) {
  if (!preferences || !Number.isFinite(preferences.latitude) || !Number.isFinite(preferences.longitude)) return;
  try {
    localStorage.setItem(WEATHER_PREFERENCES_KEY, JSON.stringify({
      latitude: preferences.latitude,
      longitude: preferences.longitude,
      placeLabel: preferences.placeLabel || "",
      source: preferences.source || ""
    }));
  } catch (error) {
    return;
  }
}

async function geocodePlace(placeText) {
  const query = String(placeText || "").trim();
  if (!query) throw new Error("Najprv doplň miesto pre počasie.");
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=sk&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Nepodarilo sa nájsť miesto pre počasie.");
  const data = await response.json();
  const result = data?.results?.[0];
  if (!result) throw new Error("Miesto sa nepodarilo nájsť.");
  const parts = [result.name, result.admin1, result.country].filter(Boolean);
  return {
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
    placeLabel: parts.join(", "),
    source: "manual"
  };
}

async function resolveWeatherSource({ placeText, fallbackPreferences = null } = {}) {
  const trimmedPlace = String(placeText || "").trim();
  if (trimmedPlace) {
    return geocodePlace(trimmedPlace);
  }
  if (fallbackPreferences && Number.isFinite(Number(fallbackPreferences.latitude)) && Number.isFinite(Number(fallbackPreferences.longitude))) {
    return {
      latitude: Number(fallbackPreferences.latitude),
      longitude: Number(fallbackPreferences.longitude),
      placeLabel: String(fallbackPreferences.placeLabel || "").trim() || GARDEN_WEATHER_PLACE,
      source: String(fallbackPreferences.source || "manual").trim() || "manual"
    };
  }
  return geocodePlace(GARDEN_WEATHER_PLACE);
}

function weatherCodeLabel(code) {
  const labels = {
    0: "jasno",
    1: "takmer jasno",
    2: "polooblačno",
    3: "oblačno",
    45: "hmla",
    48: "hmla s námrazou",
    51: "slabé mrholenie",
    53: "mrholenie",
    55: "silné mrholenie",
    56: "mrznúce mrholenie",
    57: "silné mrznúce mrholenie",
    61: "slabý dážď",
    63: "dážď",
    65: "silný dážď",
    66: "mrznúci dážď",
    67: "silný mrznúci dážď",
    71: "slabé sneženie",
    73: "sneženie",
    75: "silné sneženie",
    77: "snehové zrná",
    80: "prehánky",
    81: "výrazné prehánky",
    82: "silné prehánky",
    85: "snehové prehánky",
    86: "silné snehové prehánky",
    95: "búrka",
    96: "búrka s krúpami",
    99: "silná búrka s krúpami"
  };
  return labels[Number(code)] || "bez popisu";
}

function currentWeatherConditionLabel(code, precipitation = 0, rain = 0, showers = 0, snowfall = 0) {
  const normalizedCode = Number(code);
  const normalizedPrecipitation = Number(precipitation || 0);
  const normalizedRain = Number(rain || 0);
  const normalizedShowers = Number(showers || 0);
  const normalizedSnowfall = Number(snowfall || 0);
  if (Math.max(normalizedPrecipitation, normalizedRain, normalizedShowers) > 0.04 && normalizedSnowfall > 0.03) {
    return "dážď so snehom";
  }
  if (normalizedCode === 3 && normalizedPrecipitation <= 0.2) return "polooblačno";
  return weatherCodeLabel(normalizedCode);
}

function formatWeatherTemperature(max, min) {
  if (Number.isFinite(max) && Number.isFinite(min)) return `${Math.round(min)} až ${Math.round(max)} °C`;
  if (Number.isFinite(max)) return `${Math.round(max)} °C`;
  if (Number.isFinite(min)) return `${Math.round(min)} °C`;
  return "";
}

function formatWeatherRain(total) {
  if (!Number.isFinite(total)) return "";
  if (total === 0) return "0 mm";
  return `${total.toFixed(total < 10 ? 1 : 0)} mm`;
}

function formatWeatherWind(maxWind) {
  if (!Number.isFinite(maxWind)) return "";
  return `${Math.round(maxWind)} km/h`;
}

function formatSunshineHours(hours) {
  if (!Number.isFinite(hours)) return "";
  const rounded = hours >= 10 ? Math.round(hours) : Math.round(hours * 10) / 10;
  if (rounded <= 0) return "0 h";
  return `${String(rounded).replace(".", ",")} h`;
}

function weatherDayPeriodFromHour(hour) {
  const normalizedHour = Number(hour);
  if (!Number.isFinite(normalizedHour)) return "day";
  return normalizedHour >= 20 || normalizedHour < 6 ? "night" : "day";
}

function weatherSnapshotDayPeriod(weather) {
  const direct = String(weather?.dayPeriod || "").trim();
  if (direct === "day" || direct === "night") return direct;
  const observedHour = weatherObservedHour(weather?.observedAt);
  if (observedHour !== null) return weatherDayPeriodFromHour(observedHour);
  return weatherDayPeriodFromHour(new Date().getHours());
}

function weatherNightConditionLabel(day) {
  const visual = weatherDayVisual(day);
  if (visual.key === "snow") return "noc so snežením";
  if (visual.key === "rain") return "noc s dažďom";
  if (visual.key === "cloud") return "oblačná noc";
  if (visual.key === "partly") return "pokojná noc";
  if (visual.key === "sun") return "jasná noc";
  return "noc";
}

function formatObservedTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("sk-SK", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function shiftIsoDate(value, offsetDays = 0) {
  const date = new Date(`${String(value || todayISO())}T12:00:00`);
  if (Number.isNaN(date.getTime())) return todayISO();
  date.setDate(date.getDate() + Number(offsetDays || 0));
  return formatInputDate(date);
}

function startOfWeatherWeek(value = todayISO(), offsetWeeks = 0) {
  const date = new Date(`${String(value || todayISO())}T12:00:00`);
  if (Number.isNaN(date.getTime())) return todayISO();
  const weekdayIndex = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - weekdayIndex + (Number(offsetWeeks || 0) * 7));
  return formatInputDate(date);
}

function endOfWeatherWeek(value = todayISO(), offsetWeeks = 0) {
  return shiftIsoDate(startOfWeatherWeek(value, offsetWeeks), 6);
}

function dateRangeBetween(startDate, endDate) {
  const start = String(startDate || "").trim();
  const end = String(endDate || "").trim();
  if (!start || !end || start > end) return [];
  const items = [];
  let cursor = start;
  while (cursor <= end) {
    items.push(cursor);
    cursor = shiftIsoDate(cursor, 1);
  }
  return items;
}

function formatWeatherHours(hoursValue) {
  const hours = Number(hoursValue || 0);
  if (!Number.isFinite(hours) || hours <= 0) return "";
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} min`;
  if (hours < 10) return `${hours.toFixed(1).replace(".", ",")} h`;
  return `${Math.round(hours)} h`;
}

function formatWeatherWeekRange(startDate, endDate) {
  const start = new Date(`${String(startDate || "")}T12:00:00`);
  const end = new Date(`${String(endDate || "")}T12:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    const monthLabel = new Intl.DateTimeFormat("sk-SK", { month: "long" }).format(start);
    return `${start.getDate()}. - ${end.getDate()}. ${monthLabel}`;
  }
  const formatter = new Intl.DateTimeFormat("sk-SK", { day: "numeric", month: "short" });
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function weatherCalendarDayLabel(value) {
  const date = new Date(`${String(value || "")}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("sk-SK", { day: "numeric", month: "numeric" }).format(date);
}

function capitalizeLabel(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function weatherVisualByKey(key) {
  const visuals = {
    sun: { key: "sun", icon: ICONS.weatherSun, label: "skôr slnečný", weekLabel: "slnečnejší týždeň", tone: "sun" },
    partly: { key: "partly", icon: ICONS.weatherPartly, label: "premenlivý", weekLabel: "premenlivý týždeň", tone: "soft" },
    cloud: { key: "cloud", icon: ICONS.weatherCloud, label: "zamračený", weekLabel: "oblačnejší týždeň", tone: "soft" },
    rain: { key: "rain", icon: ICONS.weatherRain, label: "daždivý", weekLabel: "daždivejší týždeň", tone: "rain" },
    snow: { key: "snow", icon: ICONS.weatherSnow, label: "so snehom", weekLabel: "zimnejší týždeň", tone: "frost" }
  };
  return visuals[key] || visuals.partly;
}

function weatherDayVisual(value) {
  const code = Number(typeof value === "object" ? value?.weatherCode : value);
  if ([71, 73, 75, 77, 85, 86].includes(code)) return weatherVisualByKey("snow");
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return weatherVisualByKey("rain");
  if ([3, 45, 48].includes(code)) return weatherVisualByKey("cloud");
  if ([2].includes(code)) return weatherVisualByKey("partly");
  if ([0, 1].includes(code)) return weatherVisualByKey("sun");
  return weatherVisualByKey("partly");
}

function weatherWeekVisualSummary(days = []) {
  const usableDays = days.filter((item) => item && item.date);
  if (!usableDays.length) return weatherVisualByKey("partly");

  const scores = new Map();
  usableDays.forEach((day) => {
    const visual = weatherDayVisual(day);
    let score = 1;
    if (visual.key === "rain" && Number(day.rainMm || 0) >= 6) score += 0.35;
    if (visual.key === "snow") score += 0.35;
    scores.set(visual.key, (scores.get(visual.key) || 0) + score);
  });

  const precedence = ["snow", "rain", "cloud", "partly", "sun"];
  let bestKey = "partly";
  let bestScore = -1;

  precedence.forEach((key) => {
    const score = scores.get(key) || 0;
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  });

  return weatherVisualByKey(bestKey);
}

function weatherTrendDayLabel(value) {
  const date = new Date(`${String(value || "")}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("sk-SK", { weekday: "short" }).format(date).replace(".", "");
}

function weatherTrendInsight(days = []) {
  if (!days.length) return "";
  let dryStreak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (Number(days[index].rainMm || 0) > 0.2) break;
    dryStreak += 1;
  }
  if (dryStreak >= 5) return `Už ${dryStreak} dní poriadne nepršalo.`;

  const rainyDays = days.filter((item) => Number(item.rainMm || 0) > 1).length;
  if (rainyDays >= 4) return "Týždeň bol vlhký, sleduj plesne a preliatie.";

  return "Posledných 7 dní máš po ruke v jednom rýchlom pohľade.";
}

function renderWeatherOverviewLoadingMarkup() {
  return `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide weather-overview" data-weather-overview-modal>
        <p class="eyebrow">Počasie</p>
        <h3>Načítavam týždenný prehľad</h3>
        <p class="home-weather-box__loading">Pripravujem pondelkové týždne, zrážky, vietor, priebeh dní aj upozornenia.</p>
      </div>
    </div>
  `;
}

function renderWeatherOverviewSummaryChip(label, value, tone = "soft") {
  if (!value) return "";
  return `
    <span class="weather-overview__summary-chip weather-overview__summary-chip--${escapeAttribute(tone)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </span>
  `;
}

function weatherAlertVisual(alert = {}) {
  const tone = String(alert?.tone || "soft").trim();
  const text = `${String(alert?.title || "")} ${String(alert?.body || "")}`.toLowerCase();

  if (tone === "storm" || /búr|blesk|krúp/.test(text)) {
    return { icon: ICONS.weatherStorm, label: "Búrka", tone: "storm" };
  }
  if (/sneh|snežen/.test(text)) {
    return { icon: ICONS.weatherSnow, label: "Sneženie", tone: "frost" };
  }
  if (tone === "frost" || /mráz|chlad|ľad|prízemný/.test(text)) {
    return { icon: ICONS.frost, label: "Mráz", tone: "frost" };
  }
  if (tone === "rain" || /dáž|zráž|preliat|blato/.test(text)) {
    return { icon: ICONS.weatherRain, label: "Dážď", tone: "rain" };
  }
  if (tone === "wind" || /vietor|náraz/.test(text)) {
    return { icon: ICONS.weatherWind, label: "Vietor", tone: "wind" };
  }
  if (tone === "heat" || /teplo|horúč|prehriat/.test(text)) {
    return { icon: ICONS.heat, label: "Teplo", tone: "heat" };
  }
  return { icon: ICONS.weatherPartly, label: "Počasie", tone: "soft" };
}

function renderWeatherAlertCard(alert) {
  const visual = weatherAlertVisual(alert);
  return `
    <article class="weather-alert weather-alert--${escapeAttribute(alert.tone || "soft")}">
      <div class="weather-alert__content">
        <div class="weather-alert__topline">
          <span class="weather-alert__phenomenon weather-alert__phenomenon--${escapeAttribute(visual.tone || "soft")}" aria-hidden="true">
            <span class="weather-alert__phenomenon-icon">${escapeHtml(visual.icon || ICONS.weatherPartly)}</span>
            <span class="weather-alert__phenomenon-label">${escapeHtml(visual.label || "Počasie")}</span>
          </span>
          <p class="weather-alert__eyebrow">${escapeHtml(alert.eyebrow || "Predpoveď")}</p>
        </div>
        <h4>${escapeHtml(alert.title || "Upozornenie")}</h4>
        <p>${escapeHtml(alert.body || "")}</p>
      </div>
    </article>
  `;
}

function renderWeatherDayBadge(label, tone = "soft") {
  return `<span class="weather-day-card__badge weather-day-card__badge--${escapeAttribute(tone)}">${escapeHtml(label)}</span>`;
}

function renderWeatherDayMetric(label, value) {
  if (!value) return "";
  return `
    <span class="weather-day-card__metric">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </span>
  `;
}

function weatherTemperatureTone(value) {
  if (!Number.isFinite(value)) return "soft";
  if (value <= 0) return "frost";
  if (value <= 7) return "cold";
  if (value <= 16) return "mild";
  if (value <= 24) return "warm";
  if (value <= 30) return "hot";
  return "heat";
}

function renderWeatherDayTemperature(label, value, period = "day") {
  const tone = weatherTemperatureTone(value);
  const icon = period === "night" ? ICONS.weatherMoon : ICONS.weatherSun;
  const temperature = Number.isFinite(value) ? `${Math.round(value)} °C` : "—";
  return `
    <span class="weather-day-card__temp weather-day-card__temp--${escapeAttribute(period)} weather-day-card__temp--${escapeAttribute(tone)}">
      <span class="weather-day-card__temp-icon" aria-hidden="true">${icon}</span>
      <span class="weather-day-card__temp-copy">
        <span class="weather-day-card__temp-label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(temperature)}</strong>
      </span>
    </span>
  `;
}

function weatherDailyRecordFromApi(daily, index, { today = todayISO() } = {}) {
  const date = String(daily?.time?.[index] || "").trim();
  const weatherCode = Number(daily?.weather_code?.[index]);
  const rainMm = Number(daily?.precipitation_sum?.[index] || 0);
  const maxTempC = Number(daily?.temperature_2m_max?.[index]);
  const minTempC = Number(daily?.temperature_2m_min?.[index]);
  const windKmh = Number(daily?.wind_speed_10m_max?.[index]);
  const sunshineHours = Number(daily?.sunshine_duration?.[index] || 0) / 3600;
  const condition = weatherCodeLabel(weatherCode);
  const visual = weatherDayVisual(weatherCode);
  const mostlyClear = [0, 1, 2].includes(weatherCode);
  const hardFrost = Number.isFinite(minTempC) && minTempC <= 0;
  const groundFrostRisk = Number.isFinite(minTempC) && minTempC > 0 && minTempC <= 2 && mostlyClear && (!Number.isFinite(windKmh) || windKmh <= 16);
  const hotDay = Number.isFinite(maxTempC) && maxTempC >= 28;
  const veryHotDay = Number.isFinite(maxTempC) && maxTempC >= 31;
  const heavyRain = Number.isFinite(rainMm) && rainMm >= 12;
  const strongWind = Number.isFinite(windKmh) && windKmh >= 30;
  const storm = [95, 96, 99].includes(weatherCode);
  const hail = [96, 99].includes(weatherCode);

  return {
    date,
    label: weatherTrendDayLabel(date),
    calendarLabel: weatherCalendarDayLabel(date),
    isToday: date === today,
    isPast: date < today,
    weatherCode,
    condition,
    icon: visual.icon,
    simpleLabel: visual.label,
    snow: visual.key === "snow",
    rainMm,
    rain: formatWeatherRain(rainMm),
    maxTempC,
    minTempC,
    windKmh,
    wind: formatWeatherWind(windKmh),
    sunshineHours,
    hardFrost,
    groundFrostRisk,
    hotDay,
    veryHotDay,
    heavyRain,
    strongWind,
    storm,
    hail
  };
}

function weatherWeekSummary(days = []) {
  const usableDays = days.filter((item) => item && item.date);
  const totalRainMm = usableDays.reduce((sum, item) => sum + Number(item.rainMm || 0), 0);
  const maxWindKmh = Math.max(0, ...usableDays.map((item) => Number.isFinite(item.windKmh) ? item.windKmh : 0));
  const coldestMin = Math.min(...usableDays.map((item) => Number.isFinite(item.minTempC) ? item.minTempC : Infinity));
  const hottestMax = Math.max(...usableDays.map((item) => Number.isFinite(item.maxTempC) ? item.maxTempC : -Infinity));
  const totalSunshineHours = usableDays.reduce((sum, item) => sum + Number(item.sunshineHours || 0), 0);
  const skyVisual = weatherWeekVisualSummary(usableDays);
  return {
    totalRainMm,
    totalRain: formatWeatherRain(totalRainMm),
    maxWindKmh,
    maxWind: formatWeatherWind(maxWindKmh),
    coldestMin: Number.isFinite(coldestMin) ? coldestMin : null,
    hottestMax: Number.isFinite(hottestMax) ? hottestMax : null,
    totalSunshineHours,
    totalSunshine: formatSunshineHours(totalSunshineHours),
    skyIcon: skyVisual.icon,
    skyLabel: skyVisual.weekLabel,
    skyTone: skyVisual.tone
  };
}

function buildWeatherAlerts(days = []) {
  const alerts = [];
  const candidates = days.filter((item) => item && !item.isPast);
  const pushAlert = (tone, eyebrow, title, body) => {
    alerts.push({ tone, eyebrow, title, body });
  };

  const frostDay = candidates.find((item) => item.hardFrost || item.groundFrostRisk);
  if (frostDay) {
    pushAlert(
      "frost",
      "Výstraha",
      "Pozor na mráz",
      `${capitalizeLabel(frostDay.label)} ${frostDay.calendarLabel} môže teplota klesnúť nebezpečne nízko. Citlivejšie rastliny radšej chráň.`
    );
  }

  const snowDay = candidates.find((item) => item.snow && (item.heavyRain || Number(item.rainMm || 0) >= 1));
  if (snowDay) {
    pushAlert(
      "frost",
      "Predpoveď",
      snowDay.heavyRain ? "Pozor na sneženie" : "Možné sneženie",
      `${capitalizeLabel(snowDay.label)} ${snowDay.calendarLabel} sa môže objaviť sneženie a chlad. Sleduj citlivejšie výsevy aj nádoby.`
    );
  }

  const heavyRainDay = candidates.find((item) => item.heavyRain && !item.snow);
  if (heavyRainDay) {
    pushAlert(
      "rain",
      "Predpoveď",
      "Pozor na výdatný dážď",
      `${capitalizeLabel(heavyRainDay.label)} ${heavyRainDay.calendarLabel} môže spadnúť výraznejšie množstvo vody. Sleduj preliatie a blato.`
    );
  }

  const stormDay = candidates.find((item) => item.hail || item.storm);
  if (stormDay) {
    pushAlert(
      "storm",
      "Výstraha",
      stormDay.hail ? "Možné krúpy" : "Možné búrky",
      `${capitalizeLabel(stormDay.label)} ${stormDay.calendarLabel} sleduj citlivejšie výsevy, kvetenstvo a nádoby.`
    );
  }

  const hotDay = candidates.find((item) => item.veryHotDay || item.hotDay);
  if (hotDay) {
    pushAlert(
      "heat",
      "Predpoveď",
      "Pozor na horúčavu",
      `${capitalizeLabel(hotDay.label)} ${hotDay.calendarLabel} sa môže deň rýchlo prehriať. Mysli na zálievku a tienenie.`
    );
  }

  const windDay = candidates.find((item) => item.strongWind);
  if (windDay) {
    pushAlert(
      "wind",
      "Predpoveď",
      "Pozor na silný vietor",
      `${capitalizeLabel(windDay.label)} ${windDay.calendarLabel} môže vietor viac vysušovať aj lámať citlivejšie časti rastlín.`
    );
  }

  return alerts.slice(0, 4);
}

function renderWeatherWeekCard(week) {
  const summary = week.summary || {};
  return `
    <section class="weather-week-card">
      <div class="weather-week-card__head">
        <div>
          <p class="eyebrow">${escapeHtml(week.label)}</p>
          <h4>${escapeHtml(week.rangeLabel || "")}</h4>
        </div>
        <div class="weather-week-card__summary">
          ${renderWeatherOverviewSummaryChip("Zrážky", summary.totalRain || "0 mm", summary.totalRainMm >= 18 ? "rain" : "soft")}
          ${renderWeatherOverviewSummaryChip("Priebeh", summary.skyLabel ? `${summary.skyIcon || ""} ${summary.skyLabel}`.trim() : "", summary.skyTone || "soft")}
          ${renderWeatherOverviewSummaryChip("Slnko", summary.totalSunshine || "", summary.totalSunshineHours >= 24 ? "sun" : "soft")}
          ${renderWeatherOverviewSummaryChip("Vietor", summary.maxWind || "", summary.maxWindKmh >= 30 ? "wind" : "soft")}
          ${renderWeatherOverviewSummaryChip("Minimum", summary.coldestMin === null ? "" : `${Math.round(summary.coldestMin)} °C`, summary.coldestMin !== null && summary.coldestMin <= 2 ? "frost" : "soft")}
          ${renderWeatherOverviewSummaryChip("Maximum", summary.hottestMax === null ? "" : `${Math.round(summary.hottestMax)} °C`, summary.hottestMax !== null && summary.hottestMax >= 28 ? "heat" : "soft")}
        </div>
      </div>
      <div class="weather-day-grid">
        ${week.days.map((day) => {
          const badges = [
            day.hardFrost ? renderWeatherDayBadge("Mráz", "frost") : "",
            !day.hardFrost && day.groundFrostRisk ? renderWeatherDayBadge("Prízemný mráz", "frost") : "",
            day.hail ? renderWeatherDayBadge("Krúpy", "storm") : "",
            !day.hail && day.storm ? renderWeatherDayBadge("Búrky", "storm") : "",
            day.snow ? renderWeatherDayBadge(day.heavyRain ? "Výdatné sneženie" : "Sneženie", "frost") : "",
            !day.snow && day.heavyRain ? renderWeatherDayBadge("Výdatný dážď", "rain") : "",
            day.veryHotDay ? renderWeatherDayBadge("Horúčava", "heat") : "",
            day.strongWind ? renderWeatherDayBadge("Silný vietor", "wind") : ""
          ].filter(Boolean).join("");

          return `
            <article class="weather-day-card ${day.isToday ? "is-today" : ""} ${day.isPast ? "is-past" : ""}">
              <div class="weather-day-card__head">
                <div class="weather-day-card__title-row">
                  <strong>${escapeHtml(capitalizeLabel(day.label))}</strong>
                  <span>${escapeHtml(day.calendarLabel)}</span>
                </div>
                <div class="weather-day-card__head-meta">
                  ${day.isToday ? '<span class="weather-day-card__today">Dnes</span>' : ""}
                  <span class="weather-day-card__icon" aria-hidden="true">${escapeHtml(day.icon || ICONS.weatherPartly)}</span>
                </div>
              </div>
              <div class="weather-day-card__temps">
                ${renderWeatherDayTemperature("Min", day.minTempC, "night")}
                ${renderWeatherDayTemperature("Max", day.maxTempC, "day")}
              </div>
              <div class="weather-day-card__metrics">
                ${renderWeatherDayMetric("Dážď", day.rain || "0 mm")}
                ${renderWeatherDayMetric("Vietor", day.wind || "")}
                ${renderWeatherDayMetric("Slnko", formatSunshineHours(day.sunshineHours))}
              </div>
              ${badges ? `<div class="weather-day-card__badges">${badges}</div>` : ""}
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function weatherOverviewWeekCandidates(overview) {
  return (overview?.weeks || []).filter((week) => week && week.key);
}

function resolveWeatherOverviewSelectedWeek(overview) {
  const weeks = weatherOverviewWeekCandidates(overview);
  if (!weeks.length) return null;
  return weeks.find((week) => week.key === weatherOverviewSelectedWeek)
    || weeks.find((week) => week.key === "current")
    || weeks[0];
}

function renderWeatherOverviewWeekSwitcher(overview) {
  const weeks = weatherOverviewWeekCandidates(overview);
  const selectedWeek = resolveWeatherOverviewSelectedWeek(overview);
  if (!weeks.length || !selectedWeek) {
    return '<div class="empty-state empty-state--compact">Týždenný prehľad zatiaľ nie je dostupný.</div>';
  }

  return `
    <div class="weather-week-switcher" data-weather-week-selected="${escapeAttribute(selectedWeek.key)}">
      <div class="weather-week-switcher__nav">
        <div class="weather-week-switcher__tabs" role="tablist" aria-label="Výber týždňa">
          ${weeks.map((week) => `
            <button
              class="weather-week-switcher__tab ${week.key === selectedWeek.key ? "is-active" : ""}"
              type="button"
              data-weather-week-key="${escapeAttribute(week.key)}"
              aria-pressed="${week.key === selectedWeek.key ? "true" : "false"}"
            >
              <span class="weather-week-switcher__tab-title">${escapeHtml(week.label || "Týždeň")}</span>
              <span class="weather-week-switcher__tab-range">${escapeHtml(week.rangeLabel || "")}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="weather-week-switcher__panel">
        ${renderWeatherWeekCard(selectedWeek)}
      </div>
    </div>
  `;
}

function weatherOverviewHeroCandidates(overview) {
  const dayMap = new Map();
  (overview?.weeks || []).forEach((week) => {
    (week?.days || []).forEach((day) => {
      if (day?.date) dayMap.set(day.date, day);
    });
  });

  return [
    { date: shiftIsoDate(todayISO(), -1), title: "Včera" },
    { date: todayISO(), title: "Dnes" },
    { date: shiftIsoDate(todayISO(), 1), title: "Zajtra" }
  ].map((item) => {
    const day = dayMap.get(item.date);
    if (!day) return null;
    return { ...day, heroTitle: item.title };
  }).filter(Boolean);
}

function weatherOverviewHeroData(snapshot, day, period = "day") {
  const isToday = day?.isToday;
  const sunshine = formatSunshineHours(day?.sunshineHours);
  const isNight = period === "night";
  const minLabel = Number.isFinite(day?.minTempC) ? `${Math.round(day.minTempC)} °C` : "";
  const maxLabel = Number.isFinite(day?.maxTempC) ? `${Math.round(day.maxTempC)} °C` : "";
  const rainLabel = isToday && !isNight ? (snapshot?.rain || day?.rain || "") : (day?.rain || "");
  const windLabel = isToday && !isNight ? (snapshot?.wind || day?.wind || "") : (day?.wind || "");
  const noteParts = isNight
    ? [
        sunshine ? `zajtra slnko ${sunshine}` : "",
        rainLabel ? `${rainLabel} zrážok` : "",
        windLabel ? `vietor ${windLabel}` : ""
      ].filter(Boolean)
    : isToday
      ? [
          sunshine ? `slnko ${sunshine}` : "",
          rainLabel ? `dnes spolu ${rainLabel}` : "",
          windLabel ? `vietor do ${windLabel}` : ""
        ].filter(Boolean)
      : [
          sunshine ? `slnko ${sunshine}` : "",
          rainLabel ? `${rainLabel} zrážok` : "",
          windLabel ? `vietor ${windLabel}` : ""
      ].filter(Boolean);

  return {
    placeLabel: snapshot?.placeLabel || "Zákopčie",
    temperature: isNight
      ? (Number.isFinite(day?.minTempC) ? `${Math.round(day.minTempC)} °C` : "—")
      : (isToday && snapshot?.temperature
        ? snapshot.temperature
        : Number.isFinite(day?.maxTempC) ? `${Math.round(day.maxTempC)} °C` : "—"),
    condition: isNight
      ? weatherNightConditionLabel(day)
      : (isToday
        ? (snapshot?.condition || day?.condition || "Počasie")
        : (day?.condition || snapshot?.condition || "Počasie")),
    humidity: !isNight && isToday ? snapshot?.humidity : "",
    rain: rainLabel,
    wind: windLabel,
    sunshineHours: day?.sunshineHours,
    dayPeriod: isNight ? "night" : "day",
    facts: [
      minLabel ? { label: "Min", value: minLabel, tone: "cool" } : null,
      maxLabel ? { label: "Max", value: maxLabel, tone: "warm" } : null,
      sunshine ? { label: "Slnko", value: sunshine, tone: "sun" } : null
    ].filter(Boolean),
    timeLabel: isNight
      ? `${day?.heroTitle || capitalizeLabel(day?.label)} noc • ${day?.calendarLabel || ""}`.trim()
      : isToday
        ? (snapshot?.observedAt ? `Dnes • aktualizované ${snapshot.observedAt}` : `Dnes • ${day?.calendarLabel || ""}`.trim())
        : `${day?.heroTitle || capitalizeLabel(day?.label)} deň • ${day?.calendarLabel || ""}`.trim(),
    note: noteParts.join(" • ")
  };
}

function renderWeatherOverviewHero(snapshot, overview) {
  const candidates = weatherOverviewHeroCandidates(overview);
  if (!candidates.length) {
    return weatherHeroMarkup(snapshot, { note: "Otváraš plný prehľad zrážok, vetra, chladu a výstrah." });
  }

  const selectedDay = candidates.find((item) => item.date === weatherOverviewSelectedDate)
    || candidates.find((item) => item.isToday)
    || candidates[0];
  const selectedPeriod = weatherOverviewSelectedPeriod === "day" || weatherOverviewSelectedPeriod === "night"
    ? weatherOverviewSelectedPeriod
    : (selectedDay.isToday ? weatherSnapshotDayPeriod(snapshot) : "day");
  const heroData = weatherOverviewHeroData(snapshot, selectedDay, selectedPeriod);
  const periodControls = `
    <div class="weather-hero__period-switch" role="tablist" aria-label="Denný alebo nočný pohľad">
      <button class="weather-hero__period-button ${selectedPeriod === "day" ? "is-active" : ""}" type="button" data-weather-hero-period="day" aria-pressed="${selectedPeriod === "day" ? "true" : "false"}">${ICONS.weatherSun} Deň</button>
      <button class="weather-hero__period-button ${selectedPeriod === "night" ? "is-active" : ""}" type="button" data-weather-hero-period="night" aria-pressed="${selectedPeriod === "night" ? "true" : "false"}">${ICONS.weatherMoon} Noc</button>
    </div>
  `;

  return `
    <div class="weather-overview__hero-switcher" data-weather-hero-selected="${escapeAttribute(selectedDay.date)}">
      <div class="weather-overview__hero-nav">
        <div class="weather-overview__hero-frame">
          ${weatherHeroMarkup(heroData, {
            note: heroData.note,
            timeLabel: heroData.timeLabel,
            controls: periodControls,
            facts: heroData.facts
          })}
        </div>
      </div>
      <div class="weather-overview__hero-days" role="tablist" aria-label="Rýchly výber dňa">
        ${candidates.map((item) => `
          <button
            class="weather-overview__hero-day ${item.date === selectedDay.date ? "is-active" : ""}"
            type="button"
            data-weather-hero-date="${escapeAttribute(item.date)}"
            aria-pressed="${item.date === selectedDay.date ? "true" : "false"}"
          >
            <span class="weather-overview__hero-day-top">
              <span class="weather-overview__hero-day-heading">
                <span class="weather-overview__hero-day-name">${escapeHtml(item.heroTitle)}</span>
                <span class="weather-overview__hero-day-date">${escapeHtml(item.calendarLabel || "")}</span>
              </span>
            </span>
            <span class="weather-overview__hero-day-main">
              <span class="weather-overview__hero-day-icon" aria-hidden="true">${escapeHtml(item.icon || ICONS.weatherPartly)}</span>
              <strong>${escapeHtml(Number.isFinite(item.maxTempC) ? `${Math.round(item.maxTempC)} °C` : "—")}</strong>
            </span>
            <span class="weather-overview__hero-day-meta">
              <span>${escapeHtml(Number.isFinite(item.minTempC) ? `Min ${Math.round(item.minTempC)} °C` : "Min —")}</span>
              <span>${escapeHtml(Number.isFinite(item.maxTempC) ? `Max ${Math.round(item.maxTempC)} °C` : "Max —")}</span>
              <span>${escapeHtml(Number.isFinite(item.rainMm) ? `${Math.round(item.rainMm * 10) / 10} mm` : "— mm")}</span>
              <span>${escapeHtml(formatSunshineHours(item.sunshineHours)) || "0 h"}</span>
            </span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderWeatherOverviewContent(snapshot, overview) {
  const alerts = Array.isArray(overview?.alerts) ? overview.alerts : [];
  const selectedWeek = resolveWeatherOverviewSelectedWeek(overview);
  return `
    <div class="detail-layout detail-layout--compact">
      <div class="detail-copy detail-copy--wide weather-overview" data-weather-overview-modal>
        <h3>${escapeHtml(overview?.placeLabel || snapshot?.placeLabel || "Zákopčie")}</h3>
        <div class="weather-overview__top">
          <div class="weather-overview__hero">
            ${renderWeatherOverviewHero(snapshot, overview)}
          </div>
          <section class="overview-group weather-overview__alerts">
            <div class="overview-group__head">
              <h4>Výstrahy a upozornenia</h4>
              <span class="overview-group__count">${escapeHtml(countedLabel(alerts.length, "upozornenie", "upozornenia", "upozornení"))}</span>
            </div>
            ${alerts.length
              ? `<div class="weather-alert-grid">${alerts.map(renderWeatherAlertCard).join("")}</div>`
              : '<div class="empty-state empty-state--compact">Zatiaľ nevidím výraznejšiu výstrahu. Týždne nižšie však stále ukazujú mráz, dážď, vietor aj priebeh dní.</div>'}
          </section>
        </div>
        <section class="overview-group weather-overview__external">
          <div class="overview-group__head">
            <h4>Radar a búrky</h4>
          </div>
          <div class="weather-overview__external-links">
            <a
              class="weather-overview__external-link"
              href="https://www.imeteo.sk/iradar"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span class="weather-overview__external-link-icon" aria-hidden="true">${ICONS.weatherRain}</span>
              Otvoriť radar zrážok
            </a>
            <a
              class="weather-overview__external-link weather-overview__external-link--storm"
              href="https://www.lightningmaps.org/#m=ses;t=3;s=0;o=0;b=;ts=0;y=47.7125;x=20.0092;z=7;d=2;dl=2;dc=0;"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span class="weather-overview__external-link-icon" aria-hidden="true">${ICONS.lightning}</span>
              Otvoriť mapu bleskov
            </a>
          </div>
        </section>
        <section class="overview-group">
          <div class="overview-group__head">
            <h4>Týždenné prehľady</h4>
            <span class="overview-group__count">${escapeHtml(selectedWeek?.rangeLabel || "Pondelok až nedeľa")}</span>
          </div>
          ${renderWeatherOverviewWeekSwitcher(overview)}
        </section>
      </div>
    </div>
  `;
}

function bindWeatherOverviewModalControls(root = detailContent) {
  if (!root?.querySelectorAll || !homeWeatherOverview) return;
  const candidates = weatherOverviewHeroCandidates(homeWeatherOverview);
  const weekCandidates = weatherOverviewWeekCandidates(homeWeatherOverview);

  if (candidates.length) {
    root.querySelectorAll("[data-weather-hero-date]").forEach((button) => {
      button.addEventListener("click", () => {
        weatherOverviewSelectedDate = button.dataset.weatherHeroDate || todayISO();
        rerenderOpenWeatherOverviewIfVisible();
      });
    });

    root.querySelectorAll("[data-weather-hero-period]").forEach((button) => {
      button.addEventListener("click", () => {
        weatherOverviewSelectedPeriod = button.dataset.weatherHeroPeriod === "night" ? "night" : "day";
        rerenderOpenWeatherOverviewIfVisible();
      });
    });
  }

  if (weekCandidates.length) {
    root.querySelectorAll("[data-weather-week-key]").forEach((button) => {
      button.addEventListener("click", () => {
        weatherOverviewSelectedWeek = button.dataset.weatherWeekKey || "current";
        rerenderOpenWeatherOverviewIfVisible();
      });
    });

  }
}

function rerenderOpenWeatherOverviewIfVisible() {
  if (!detailModal.open) return;
  if (!detailContent.querySelector("[data-weather-overview-modal]")) return;
  if (!homeWeatherSnapshot || !homeWeatherOverview) return;
  detailContent.innerHTML = renderWeatherOverviewContent(homeWeatherSnapshot, homeWeatherOverview);
  bindWeatherOverviewModalControls(detailContent);
}

function renderWeatherTrendMarkup(days = []) {
  if (!Array.isArray(days) || !days.length) {
    return `
      <div class="weather-rain-trend weather-rain-trend--loading">
        <p class="weather-rain-trend__summary">Načítavam posledných 7 dní zrážok.</p>
      </div>
    `;
  }

  const totalRain = days.reduce((sum, item) => sum + Number(item.rainMm || 0), 0);
  const rainyDays = days.filter((item) => Number(item.rainMm || 0) > 0.2).length;
  const dryDays = Math.max(0, days.length - rainyDays);
  const maxRain = Math.max(...days.map((item) => Number(item.rainMm || 0)), 1);
  const insight = weatherTrendInsight(days);

  return `
    <div class="weather-rain-trend">
      <p class="weather-rain-trend__summary">
        Za 7 dní: <strong>${escapeHtml(formatWeatherRain(totalRain) || "0 mm")}</strong>
        <span>${escapeHtml(`${rainyDays} daždivé dni • ${dryDays} suché dni`)}</span>
      </p>
      <div class="weather-rain-trend__bars" aria-label="Zrážky za posledných sedem dní">
        ${days.map((item) => {
          const rainMm = Number(item.rainMm || 0);
          const level = rainMm > 0 ? Math.max(14, Math.round((rainMm / maxRain) * 100)) : 6;
          return `
            <div class="weather-rain-trend__day ${rainMm > 0.2 ? "is-rainy" : "is-dry"} ${item.isToday ? "is-today" : ""}">
              <span class="weather-rain-trend__amount">${escapeHtml(formatWeatherRain(rainMm) || "0 mm")}</span>
              <span class="weather-rain-trend__bar"><span style="height:${level}%"></span></span>
              <span class="weather-rain-trend__label">${escapeHtml(item.label || "")}</span>
            </div>
          `;
        }).join("")}
      </div>
      ${insight ? `<p class="weather-rain-trend__hint">${escapeHtml(insight)}</p>` : ""}
    </div>
  `;
}

function renderHomeWeatherCardMarkup(snapshot, trendDays = []) {
  return `
    <div class="main-menu-weather-mini main-menu-weather-mini--home">
      ${renderMainMenuWeatherMini(snapshot, {
        showTrend: true,
        trendDays,
        compactTrend: false
      })}
    </div>
  `;
}

async function fetchWeatherForDate(source, date) {
  const targetDate = String(date || "").trim() || todayISO();
  const today = todayISO();
  if (targetDate === today) {
    const currentParams = new URLSearchParams({
      latitude: String(source.latitude),
      longitude: String(source.longitude),
      current: "temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,pressure_msl,surface_pressure",
      daily: "sunrise,sunset,daylight_duration,sunshine_duration,precipitation_probability_max,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max",
      timezone: "auto"
    });
    const currentResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${currentParams.toString()}`);
    if (!currentResponse.ok) throw new Error("Aktuálne počasie sa nepodarilo načítať z internetu.");
    const currentData = await currentResponse.json();
    const current = currentData?.current;
    const currentDaily = currentData?.daily || null;
    if (!current?.time) throw new Error("Aktuálne počasie nie je dostupné.");
    const condition = currentWeatherConditionLabel(current.weather_code, current.precipitation, current.rain, current.showers, current.snowfall);
    return normalizeWeatherSnapshot({
      condition,
      temperature: Number.isFinite(current.temperature_2m) ? `${Math.round(current.temperature_2m)} °C` : "",
      humidity: Number.isFinite(current.relative_humidity_2m) ? `${Math.round(current.relative_humidity_2m)} %` : "",
      rain: Number.isFinite(current.precipitation) ? formatWeatherRain(current.precipitation) : "",
      wind: formatWeatherWind(current.wind_speed_10m),
      observedAt: formatObservedTime(current.time),
      icon: weatherIconSymbol({ condition }),
      placeLabel: source.placeLabel || "Počasie dňa",
      dayPeriod: Number(current.is_day) === 0 ? "night" : weatherDayPeriodFromHour(weatherObservedHour(current.time)),
      sunshineHours: toFiniteWeatherNumber(currentDaily?.sunshine_duration?.[0]) !== null
        ? Number(currentDaily.sunshine_duration[0]) / 3600
        : null,
      moonPhase: moonPhaseFromDateValue(current.time),
      isDay: toFiniteWeatherNumber(current.is_day),
      temperatureC: toFiniteWeatherNumber(current.temperature_2m),
      apparentTemperatureC: toFiniteWeatherNumber(current.apparent_temperature),
      humidityPct: toFiniteWeatherNumber(current.relative_humidity_2m),
      precipitationMm: toFiniteWeatherNumber(current.precipitation),
      rainMm: toFiniteWeatherNumber(current.rain),
      showersMm: toFiniteWeatherNumber(current.showers),
      snowfallCm: toFiniteWeatherNumber(current.snowfall),
      cloudCoverPct: toFiniteWeatherNumber(current.cloud_cover),
      cloudCoverLowPct: toFiniteWeatherNumber(current.cloud_cover_low),
      cloudCoverMidPct: toFiniteWeatherNumber(current.cloud_cover_mid),
      cloudCoverHighPct: toFiniteWeatherNumber(current.cloud_cover_high),
      windSpeedKmh: toFiniteWeatherNumber(current.wind_speed_10m),
      windGustsKmh: toFiniteWeatherNumber(current.wind_gusts_10m),
      windDirectionDeg: toFiniteWeatherNumber(current.wind_direction_10m),
      visibilityM: toFiniteWeatherNumber(current.visibility),
      pressureMslHpa: toFiniteWeatherNumber(current.pressure_msl),
      surfacePressureHpa: toFiniteWeatherNumber(current.surface_pressure),
      sunriseAt: String(currentDaily?.sunrise?.[0] || "").trim(),
      sunsetAt: String(currentDaily?.sunset?.[0] || "").trim(),
      daylightSeconds: toFiniteWeatherNumber(currentDaily?.daylight_duration?.[0]),
      precipitationProbabilityPct: toFiniteWeatherNumber(currentDaily?.precipitation_probability_max?.[0]),
      fetchedAt: new Date().toISOString(),
      latitude: String(source.latitude),
      longitude: String(source.longitude)
    });
  }

  const isPast = targetDate < today;
  const baseUrl = isPast ? "https://archive-api.open-meteo.com/v1/archive" : "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: String(source.latitude),
    longitude: String(source.longitude),
    start_date: targetDate,
    end_date: targetDate,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,sunrise,sunset,daylight_duration,sunshine_duration",
    timezone: "auto"
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) throw new Error("Počasie sa nepodarilo načítať z internetu.");
  const data = await response.json();
  const daily = data?.daily;
  if (!daily?.time?.length) throw new Error("Pre tento dátum nie sú dostupné údaje o počasí.");
  const condition = weatherCodeLabel(daily.weather_code?.[0]);
  return normalizeWeatherSnapshot({
    condition,
    temperature: formatWeatherTemperature(daily.temperature_2m_max?.[0], daily.temperature_2m_min?.[0]),
    rain: formatWeatherRain(daily.precipitation_sum?.[0]),
    wind: formatWeatherWind(daily.wind_speed_10m_max?.[0]),
    icon: weatherIconSymbol({ condition }),
    placeLabel: source.placeLabel || "Počasie dňa",
    dayPeriod: "day",
    sunshineHours: toFiniteWeatherNumber(daily.sunshine_duration?.[0]) !== null
      ? Number(daily.sunshine_duration[0]) / 3600
      : null,
    moonPhase: moonPhaseFromDateValue(targetDate),
    temperatureC: averageWeatherNumbers(daily.temperature_2m_max?.[0], daily.temperature_2m_min?.[0]),
    apparentTemperatureC: averageWeatherNumbers(daily.apparent_temperature_max?.[0], daily.apparent_temperature_min?.[0]),
    precipitationMm: toFiniteWeatherNumber(daily.precipitation_sum?.[0]),
    rainMm: toFiniteWeatherNumber(daily.rain_sum?.[0]),
    showersMm: toFiniteWeatherNumber(daily.showers_sum?.[0]),
    snowfallCm: toFiniteWeatherNumber(daily.snowfall_sum?.[0]),
    windSpeedKmh: toFiniteWeatherNumber(daily.wind_speed_10m_max?.[0]),
    windGustsKmh: toFiniteWeatherNumber(daily.wind_gusts_10m_max?.[0]),
    windDirectionDeg: toFiniteWeatherNumber(daily.wind_direction_10m_dominant?.[0]),
    sunriseAt: String(daily.sunrise?.[0] || "").trim(),
    sunsetAt: String(daily.sunset?.[0] || "").trim(),
    daylightSeconds: toFiniteWeatherNumber(daily.daylight_duration?.[0]),
    precipitationProbabilityPct: toFiniteWeatherNumber(daily.precipitation_probability_max?.[0]),
    fetchedAt: new Date().toISOString(),
    latitude: String(source.latitude),
    longitude: String(source.longitude)
  });
}

async function fetchWeeklyWeatherTrend(source) {
  const today = todayISO();
  const startDate = startOfWeatherWeek(today);
  const endDate = endOfWeatherWeek(today);
  const yesterday = shiftIsoDate(today, -1);
  const days = [];

  if (startDate <= yesterday) {
    const archiveParams = new URLSearchParams({
      latitude: String(source.latitude),
      longitude: String(source.longitude),
      start_date: startDate,
      end_date: yesterday,
      daily: "precipitation_sum,weather_code",
      timezone: "auto"
    });
    const archiveResponse = await fetch(`https://archive-api.open-meteo.com/v1/archive?${archiveParams.toString()}`);
    if (!archiveResponse.ok) throw new Error("Týždenný prehľad počasia sa nepodarilo načítať.");
    const archiveData = await archiveResponse.json();
    const archiveDaily = archiveData?.daily;
    if (archiveDaily?.time?.length) {
      archiveDaily.time.forEach((dateValue, index) => {
        days.push({
          date: dateValue,
          rainMm: Number(archiveDaily.precipitation_sum?.[index] || 0),
          weatherCode: Number(archiveDaily.weather_code?.[index]),
          isToday: false,
          label: weatherTrendDayLabel(dateValue)
        });
      });
    }
  }

  const forecastParams = new URLSearchParams({
    latitude: String(source.latitude),
    longitude: String(source.longitude),
    start_date: today,
    end_date: endDate,
    daily: "precipitation_sum,weather_code",
    timezone: "auto"
  });
  const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${forecastParams.toString()}`);
  if (!forecastResponse.ok) throw new Error("Dnešný prehľad počasia sa nepodarilo načítať.");
  const forecastData = await forecastResponse.json();
  const forecastDaily = forecastData?.daily;
  if (forecastDaily?.time?.length) {
    forecastDaily.time.forEach((dateValue, index) => {
      days.push({
        date: dateValue,
        rainMm: Number(forecastDaily.precipitation_sum?.[index] || 0),
        weatherCode: Number(forecastDaily.weather_code?.[index]),
        isToday: dateValue === today,
        label: weatherTrendDayLabel(dateValue)
      });
    });
  }

  const dateIndex = new Map(days.map((item) => [item.date, item]));
  return dateRangeBetween(startDate, endDate).map((dateValue) => ({
    date: dateValue,
    rainMm: Number(dateIndex.get(dateValue)?.rainMm || 0),
    weatherCode: Number(dateIndex.get(dateValue)?.weatherCode || 2),
    isToday: dateValue === today,
    label: weatherTrendDayLabel(dateValue)
  }));
}

async function loadHomeWeatherSnapshot(forceReload = false) {
  if (forceReload) {
    homeWeatherLoadPromise = null;
  }

  if (!homeWeatherLoadPromise) {
    homeWeatherLoadPromise = resolveWeatherSource({ fallbackPreferences: loadWeatherPreferences() })
      .then((source) => {
        saveWeatherPreferences(source);
        return fetchWeatherForDate(source, todayISO());
      })
      .then((snapshot) => {
        homeWeatherSnapshot = snapshot;
        applyMobileWeatherTheme(snapshot);
        return snapshot;
      })
      .catch(() => null)
      .finally(() => {
        homeWeatherLoadPromise = null;
      });
  }

  return homeWeatherLoadPromise;
}

async function loadHomeWeatherTrend(forceReload = false) {
  if (forceReload) {
    homeWeatherTrendLoadPromise = null;
  }

  if (!homeWeatherTrendLoadPromise) {
    homeWeatherTrendLoadPromise = resolveWeatherSource({ fallbackPreferences: loadWeatherPreferences() })
      .then((source) => {
        saveWeatherPreferences(source);
        return fetchWeeklyWeatherTrend(source);
      })
      .then((trend) => {
        homeWeatherTrend = trend;
        return trend;
      })
      .catch(() => null)
      .finally(() => {
        homeWeatherTrendLoadPromise = null;
      });
  }

  return homeWeatherTrendLoadPromise;
}

async function fetchWeatherOverviewData(source) {
  const today = todayISO();
  const previousStart = startOfWeatherWeek(today, -1);
  const nextEnd = endOfWeatherWeek(today, 1);
  const yesterday = shiftIsoDate(today, -1);
  const dayMap = new Map();

  if (previousStart <= yesterday) {
    const archiveParams = new URLSearchParams({
      latitude: String(source.latitude),
      longitude: String(source.longitude),
      start_date: previousStart,
      end_date: yesterday,
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunshine_duration",
      timezone: "auto"
    });
    const archiveResponse = await fetch(`https://archive-api.open-meteo.com/v1/archive?${archiveParams.toString()}`);
    if (!archiveResponse.ok) throw new Error("Počasie za minulé dni sa nepodarilo načítať.");
    const archiveData = await archiveResponse.json();
    const archiveDaily = archiveData?.daily;
    if (archiveDaily?.time?.length) {
      archiveDaily.time.forEach((dateValue, index) => {
        const record = weatherDailyRecordFromApi(archiveDaily, index, { today });
        if (record.date) dayMap.set(record.date, record);
      });
    }
  }

  const forecastParams = new URLSearchParams({
    latitude: String(source.latitude),
    longitude: String(source.longitude),
    start_date: today,
    end_date: nextEnd,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunshine_duration",
    timezone: "auto"
  });
  const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${forecastParams.toString()}`);
  if (!forecastResponse.ok) throw new Error("Počasie na ďalšie dni sa nepodarilo načítať.");
  const forecastData = await forecastResponse.json();
  const forecastDaily = forecastData?.daily;
  if (forecastDaily?.time?.length) {
    forecastDaily.time.forEach((dateValue, index) => {
      const record = weatherDailyRecordFromApi(forecastDaily, index, { today });
      if (record.date) dayMap.set(record.date, record);
    });
  }

  const buildWeek = (offset, label, key) => {
    const startDate = startOfWeatherWeek(today, offset);
    const endDate = endOfWeatherWeek(today, offset);
    const days = dateRangeBetween(startDate, endDate).map((dateValue) => {
      if (dayMap.has(dateValue)) return dayMap.get(dateValue);
      const visual = weatherDayVisual(2);
      return {
        date: dateValue,
        label: weatherTrendDayLabel(dateValue),
        calendarLabel: weatherCalendarDayLabel(dateValue),
        isToday: dateValue === today,
        isPast: dateValue < today,
        weatherCode: 2,
        condition: "polooblačno",
        icon: visual.icon,
        simpleLabel: visual.label,
        rainMm: 0,
        rain: "0 mm",
        maxTempC: null,
        minTempC: null,
        windKmh: null,
        wind: "",
        sunshineHours: 0,
        hardFrost: false,
        groundFrostRisk: false,
        hotDay: false,
        veryHotDay: false,
        heavyRain: false,
        strongWind: false,
        storm: false,
        hail: false
      };
    });
    return {
      key,
      label,
      startDate,
      endDate,
      rangeLabel: formatWeatherWeekRange(startDate, endDate),
      days,
      summary: weatherWeekSummary(days)
    };
  };

  const weeks = [
    buildWeek(-1, "Minulý týždeň", "previous"),
    buildWeek(0, "Tento týždeň", "current"),
    buildWeek(1, "Ďalší týždeň", "next")
  ];

  return {
    placeLabel: source.placeLabel || "Zákopčie",
    weeks,
    alerts: buildWeatherAlerts(weeks.flatMap((week) => week.days))
  };
}

async function loadHomeWeatherOverview(forceReload = false) {
  if (forceReload) {
    homeWeatherOverviewLoadPromise = null;
  }

  if (!homeWeatherOverviewLoadPromise) {
    homeWeatherOverviewLoadPromise = resolveWeatherSource({ fallbackPreferences: loadWeatherPreferences() })
      .then((source) => {
        saveWeatherPreferences(source);
        return fetchWeatherOverviewData(source);
      })
      .then((overview) => {
        homeWeatherOverview = overview;
        rerenderOpenWeatherOverviewIfVisible();
        renderInsights();
        syncOverviewHighlights();
        return overview;
      })
      .catch(() => null)
      .finally(() => {
        homeWeatherOverviewLoadPromise = null;
      });
  }

  return homeWeatherOverviewLoadPromise;
}

function openWeatherOverviewModal(options = {}) {
  weatherOverviewSelectedDate = todayISO();
  weatherOverviewSelectedWeek = "current";
  weatherOverviewSelectedPeriod = "";
  resetDetailModalClasses();
  detailModal.classList.add("detail-modal--weather");
  detailContent.innerHTML = renderWeatherOverviewLoadingMarkup();
  openDetailModalDialog();

  Promise.all([
    loadHomeWeatherSnapshot(Boolean(options.forceReload)),
    loadHomeWeatherOverview(Boolean(options.forceReload))
  ]).then(([snapshot, overview]) => {
    if (!snapshot || !overview) {
      detailContent.innerHTML = `
        <div class="detail-layout detail-layout--compact">
          <div class="detail-copy detail-copy--wide weather-overview" data-weather-overview-modal>
            <p class="eyebrow">Počasie</p>
            <h3>Prehľad sa teraz nepodarilo načítať</h3>
            <p class="home-weather-box__loading">Skús to o chvíľu znova. Základ appky tým ostal v poriadku.</p>
          </div>
        </div>
      `;
      return;
    }

    detailContent.innerHTML = renderWeatherOverviewContent(snapshot, overview);
    bindWeatherOverviewModalControls(detailContent);
  }).catch(() => {
    detailContent.innerHTML = `
      <div class="detail-layout detail-layout--compact">
        <div class="detail-copy detail-copy--wide weather-overview" data-weather-overview-modal>
          <p class="eyebrow">Počasie</p>
          <h3>Prehľad sa teraz nepodarilo načítať</h3>
          <p class="home-weather-box__loading">Skús to o chvíľu znova. Základ appky tým ostal v poriadku.</p>
        </div>
      </div>
    `;
  });
}

function bindWeatherOverviewTriggers(root = document) {
  if (!root?.querySelectorAll) return;

  root.querySelectorAll("[data-open-weather-overview]").forEach((element) => {
    if (element.dataset.weatherOverviewBound === "true") return;
    element.dataset.weatherOverviewBound = "true";

    const tagName = String(element.tagName || "").toUpperCase();
    const isNativeButton = tagName === "BUTTON";
    if (!isNativeButton) {
      element.setAttribute("role", "button");
      if (!element.hasAttribute("tabindex")) {
        element.setAttribute("tabindex", "0");
      }
    }

    element.addEventListener("click", (event) => {
      if (event.target.closest("button, a, input, select, textarea, label")) return;
      openWeatherOverviewModal();
    });

    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openWeatherOverviewModal();
    });
  });
}

async function refreshMainMenuWeatherMini() {
  const [snapshot, trend] = await Promise.all([loadHomeWeatherSnapshot(), loadHomeWeatherTrend()]);
  if (!snapshot) return;
  applyMobileWeatherTheme(snapshot);
  document.querySelectorAll("#main-menu-weather-mini, #hero-weather-mini").forEach((mountEl) => {
    const isHeroMount = mountEl.id === "hero-weather-mini" || mountEl.classList.contains("main-menu-weather-mini--hero");
    const heroCompact = Boolean(document.body?.classList.contains("app-mobile-shell") && isHeroMount);
    const showTrend = !isHeroMount;
    mountEl.innerHTML = renderMainMenuWeatherMini(snapshot, {
      showTrend,
      compactTrend: showTrend,
      trendDays: trend || homeWeatherTrend || [],
      interactive: true,
      heroCompact
    });
  });
  bindWeatherOverviewTriggers(document);
  if (homeWeatherRefreshTimer) clearTimeout(homeWeatherRefreshTimer);
  homeWeatherRefreshTimer = window.setTimeout(() => {
    Promise.all([loadHomeWeatherSnapshot(true), loadHomeWeatherTrend(true), loadHomeWeatherOverview(true)]).then(() => {
      if (document.getElementById("main-menu-weather-mini") || document.getElementById("hero-weather-mini")) {
        refreshMainMenuWeatherMini().catch(() => {});
      }
      if (document.getElementById("home-weather-card")) {
        refreshHomeWeatherCard().catch(() => {});
      }
    });
  }, WEATHER_AUTO_REFRESH_MS);
}

async function refreshHomeWeatherCard() {
  const card = document.getElementById("home-weather-card");
  if (!card) return;
  const [snapshot, trend] = await Promise.all([loadHomeWeatherSnapshot(), loadHomeWeatherTrend()]);
  if (!snapshot) return;
  applyMobileWeatherTheme(snapshot);
  const bodyEl = card.querySelector("[data-home-weather-body]");
  if (bodyEl) bodyEl.innerHTML = renderHomeWeatherCardMarkup(snapshot, trend || homeWeatherTrend || []);
  bindWeatherOverviewTriggers(card);
  if (homeWeatherRefreshTimer) clearTimeout(homeWeatherRefreshTimer);
  homeWeatherRefreshTimer = window.setTimeout(() => {
    Promise.all([loadHomeWeatherSnapshot(true), loadHomeWeatherTrend(true), loadHomeWeatherOverview(true)]).then(() => {
      refreshMainMenuWeatherMini().catch(() => {});
      if (document.getElementById("home-weather-card")) {
        refreshHomeWeatherCard().catch(() => {});
      }
    });
  }, WEATHER_AUTO_REFRESH_MS);
}

function renderDateInput({ id, name, value = "", required = false }) {
  return `
    <div class="date-input-wrap">
      <button
        class="date-input-wrap__trigger"
        type="button"
        data-date-trigger="${escapeAttribute(id)}"
        aria-label="Otvoriť kalendár"
        title="Vybrať dátum"
      ></button>
      <input
        class="date-input"
        id="${escapeAttribute(id)}"
        name="${escapeAttribute(name)}"
        type="date"
        ${value ? `value="${escapeAttribute(value)}"` : ""}
        ${required ? "required" : ""}
      >
    </div>
  `;
}

function updateCatalogHeader() {
  if (!catalogHeaderEl) return;
  catalogHeaderEl.classList.add("is-hidden");
  if (filterDisclosureEl) filterDisclosureEl.open = false;
}

function formatInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


