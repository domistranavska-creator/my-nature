(function initMojaZahradaUiHelpersModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createUiHelpersModule !== "function") {
    registry.createUiHelpersModule = function createUiHelpersModule(deps = {}) {
      const scope = "ui.helpers";
      const {
        escapeHtml,
        escapeAttribute,
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

      const safeEscapeHtml = requireFunction("escapeHtml", escapeHtml);
      const safeEscapeAttribute = requireFunction("escapeAttribute", escapeAttribute);

      function progressCard(title, meta, value, tone, actionsHtml = "") {
        return `
        <article class="progress-card">
          <h3>${safeEscapeHtml(title)}</h3>
          <p class="progress-card__meta">${safeEscapeHtml(meta)}</p>
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
        <article class="mini-item ${clickable ? "mini-item--clickable" : ""}" ${clickable ? `data-open-mini-variety="${safeEscapeAttribute(varietyId)}" tabindex="0" role="button" aria-label="Otvoriť kartu ${safeEscapeAttribute(title)}"` : ""}>
          ${badge ? `<span class="mini-item__badge${badgeClass}">${safeEscapeHtml(badge)}</span>` : ""}
          <p class="mini-item__title">${safeEscapeHtml(title)}</p>
          <p class="mini-item__meta">${safeEscapeHtml(meta)}</p>
        </article>
      `;
      }

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        progressCard,
        miniItem
      };
    };
  }
})(window);
