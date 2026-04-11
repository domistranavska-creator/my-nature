(function initMojaZahradaPreferencesModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createPreferencesModule !== "function") {
    registry.createPreferencesModule = function createPreferencesModule(deps = {}) {
      const scope = "preferences";
      const {
        MOBILE_WEATHER_SCENE_ONLY_KEY,
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

      const mobileWeatherSceneOnlyKey = requireValue("MOBILE_WEATHER_SCENE_ONLY_KEY", MOBILE_WEATHER_SCENE_ONLY_KEY);

      function loadMobileWeatherSceneOnlyPreference() {
        try {
          return localStorage.getItem(mobileWeatherSceneOnlyKey) === "1";
        } catch (error) {
          return false;
        }
      }

      function saveMobileWeatherSceneOnlyPreference(enabled = false) {
        try {
          if (!enabled) {
            localStorage.removeItem(mobileWeatherSceneOnlyKey);
            return;
          }
          localStorage.setItem(mobileWeatherSceneOnlyKey, "1");
        } catch (error) {
          // Dočasný prepínač čistého pozadia nech appku neblokuje.
        }
      }

      globalScope.loadMobileWeatherSceneOnlyPreference = loadMobileWeatherSceneOnlyPreference;
      globalScope.saveMobileWeatherSceneOnlyPreference = saveMobileWeatherSceneOnlyPreference;

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        loadMobileWeatherSceneOnlyPreference,
        saveMobileWeatherSceneOnlyPreference
      };
    };
  }
})(window);
