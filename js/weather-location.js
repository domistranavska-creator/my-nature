(function initMojaZahradaWeatherLocationModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createWeatherLocationModule !== "function") {
    registry.createWeatherLocationModule = function createWeatherLocationModule(deps = {}) {
      const scope = "weather-location";
      const {
        WEATHER_PREFERENCES_KEY,
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

      const weatherPreferencesKey = requireValue("WEATHER_PREFERENCES_KEY", WEATHER_PREFERENCES_KEY);

      function loadWeatherPreferences() {
        try {
          const raw = localStorage.getItem(weatherPreferencesKey);
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
          localStorage.setItem(weatherPreferencesKey, JSON.stringify({
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
        const response = await globalScope.fetch(url);
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

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        loadWeatherPreferences,
        saveWeatherPreferences,
        geocodePlace
      };
    };
  }
})(window);
