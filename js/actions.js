(function initMojaZahradaActionsModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createActionsModule !== "function") {
    registry.createActionsModule = function createActionsModule(deps = {}) {
      const scope = "actions";
      const {
        getState,
        clearAppCache,
        render,
        persistInBackground,
        softDeleteStateRecord,
        normalizeTaskRecord,
        showAppToast,
        showUndoDeleteToast,
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

      function requireFunction(name, value) {
        if (typeof value === "function") return value;
        const error = new Error(`[MojaZahrada] Missing required dependency: ${name}`);
        reportModuleError(error, { dependency: name });
        throw error;
      }

      const getStateValue = requireFunction("getState", getState);
      const clearAppCacheValue = requireFunction("clearAppCache", clearAppCache);
      const renderValue = requireFunction("render", render);
      const persistInBackgroundValue = requireFunction("persistInBackground", persistInBackground);
      const softDeleteStateRecordValue = requireFunction("softDeleteStateRecord", softDeleteStateRecord);
      const normalizeTaskRecordValue = requireFunction("normalizeTaskRecord", normalizeTaskRecord);
      const showAppToastValue = typeof showAppToast === "function" ? showAppToast : function noop() {};
      const showUndoDeleteToastValue = typeof showUndoDeleteToast === "function" ? showUndoDeleteToast : function noop() {};

      function runRender(callback) {
        if (typeof callback === "function") {
          callback();
          return;
        }
        renderValue();
      }

      function addTaskAction(taskPayload, options = {}) {
        const currentState = getStateValue();
        const normalizedTask = normalizeTaskRecordValue(taskPayload, currentState.varieties);
        currentState.customTasks.unshift(normalizedTask);
        clearAppCacheValue();
        runRender(options.render);
        if (options.showToast !== false) {
          showAppToastValue("Úloha pridaná", {
            tone: "success",
            detail: "Úloha je uložená."
          });
        }
        persistInBackgroundValue(String(options.persistContext || "add task"));
        return normalizedTask;
      }

      function toggleTaskAction(taskId, done, options = {}) {
        const normalizedTaskId = String(taskId || "").trim();
        if (!normalizedTaskId) return false;
        const currentState = getStateValue();
        const task = currentState.customTasks.find((item) => item.id === normalizedTaskId);
        if (!task) return false;
        task.done = Boolean(done);
        clearAppCacheValue();
        runRender(options.render);
        persistInBackgroundValue(String(options.persistContext || "toggle task"));
        return true;
      }

      function deleteTaskAction(taskId, options = {}) {
        const normalizedTaskId = String(taskId || "").trim();
        if (!normalizedTaskId) return false;
        const deleteResult = softDeleteStateRecordValue("customTasks", normalizedTaskId, "task");
        if (!deleteResult) return false;
        clearAppCacheValue();
        runRender(options.render);
        if (options.showUndoToast !== false) {
          showUndoDeleteToastValue("Úloha zmazaná");
        }
        persistInBackgroundValue(String(options.persistContext || "delete task"));
        return true;
      }

      function saveJournalEntryAction(entry, options = {}) {
        if (!entry || typeof entry !== "object") return false;
        const currentState = getStateValue();
        const normalizedEntryId = String(options.entryId || "").trim();
        if (normalizedEntryId) {
          const entryIndex = currentState.journal.findIndex((item) => item.id === normalizedEntryId);
          if (entryIndex === -1) return false;
          currentState.journal[entryIndex] = entry;
        } else {
          currentState.journal.unshift(entry);
        }
        clearAppCacheValue();
        runRender(options.render);
        const defaultContext = normalizedEntryId ? "save journal entry" : "add journal entry";
        persistInBackgroundValue(String(options.persistContext || defaultContext));
        return true;
      }

      function addJournalEntryAction(entry, options = {}) {
        return saveJournalEntryAction(entry, options);
      }

      function deleteJournalEntryAction(entryId, options = {}) {
        const normalizedEntryId = String(entryId || "").trim();
        if (!normalizedEntryId) return false;
        const deleteResult = softDeleteStateRecordValue("journal", normalizedEntryId, "journal");
        if (!deleteResult) return false;
        clearAppCacheValue();
        runRender(options.render);
        if (options.showUndoToast !== false) {
          showUndoDeleteToastValue("Zápis zmazaný");
        }
        persistInBackgroundValue(String(options.persistContext || "delete journal"));
        return true;
      }

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        addTaskAction,
        toggleTaskAction,
        deleteTaskAction,
        saveJournalEntryAction,
        addJournalEntryAction,
        deleteJournalEntryAction
      };
    };
  }
})(window);
