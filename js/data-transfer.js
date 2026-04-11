(function initMojaZahradaDataTransferModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createDataTransferModule !== "function") {
    registry.createDataTransferModule = function createDataTransferModule(deps = {}) {
      const scope = "data-transfer";
      const {
        STORAGE_KEY,
        RESET_BACKUP_KEY,
        getState,
        onResetBackupSaved,
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

      function requireFunction(name, value) {
        if (typeof value === "function") return value;
        const error = new Error(`[MojaZahrada] Missing required dependency: ${name}`);
        reportModuleError(error, { dependency: name });
        throw error;
      }

      const storageKey = requireValue("STORAGE_KEY", STORAGE_KEY);
      const resetBackupKey = requireValue("RESET_BACKUP_KEY", RESET_BACKUP_KEY);
      const getStateValue = requireFunction("getState", getState);
      const onResetBackupSavedValue = typeof onResetBackupSaved === "function"
        ? onResetBackupSaved
        : function noop() {};

      function serializeStateSnapshot() {
        const state = getStateValue();
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
          schema: storageKey,
          exportedAt: new Date().toISOString(),
          state: serializeStateSnapshot()
        };
      }

      function saveResetBackup() {
        const snapshot = arguments.length > 0 ? arguments[0] : serializeStateSnapshot();
        const reason = String(arguments.length > 1 ? arguments[1] : "manual").trim() || "manual";
        try {
          localStorage.setItem(resetBackupKey, JSON.stringify({
            savedAt: new Date().toISOString(),
            reason,
            state: snapshot
          }));
          onResetBackupSavedValue();
          return true;
        } catch (error) {
          return false;
        }
      }

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        serializeStateSnapshot,
        exportFileTimestamp,
        exportStateEnvelope,
        saveResetBackup
      };
    };
  }
})(window);
