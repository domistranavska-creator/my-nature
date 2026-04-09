(function initMojaZahradaUiModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createUiModule !== "function") {
    registry.createUiModule = function createUiModule(deps = {}) {
      const scope = "ui";
      const {
        escapeHtml,
        escapeAttribute,
        normalizeJournalEntry: rawNormalizeJournalEntry,
        journalImages,
        journalVideo,
        renderJournalWalkSummary,
        journalDisplayTitle,
        journalDisplayChips,
        renderJournalWeatherWidgets,
        journalHeaderWeather,
        renderMoodBadge,
        journalDateLabel,
        renderJournalVideoPlayer,
        renderJournalImageTag,
        renderJournalChip,
        trimText,
        makeId,
        todayISO,
        detailModal,
        suppressNextDetailReturnContext,
        openStoredCardView,
        getState: rawGetState,
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

      const normalizeJournalEntry = requireFunction("normalizeJournalEntry", rawNormalizeJournalEntry);
      const getState = requireFunction("getState", rawGetState);

      const createUiHelpersModule = requireFunction("createUiHelpersModule", registry.createUiHelpersModule);
      const uiHelpers = createUiHelpersModule({
        escapeHtml,
        escapeAttribute,
        logModuleError
      });
      const progressCard = requireFunction("uiHelpers.progressCard", uiHelpers.progressCard);
      const miniItem = requireFunction("uiHelpers.miniItem", uiHelpers.miniItem);

      function normalizeEntryForRender(entry) {
        try {
          const state = getState();
          return normalizeJournalEntry(entry, state?.varieties);
        } catch (error) {
          reportModuleError(error, {
            operation: "normalizeEntryForRender",
            entryId: String(entry?.id || "").trim()
          });
          throw error;
        }
      }

      function renderJournalItem(entry, deleteAttr, editAttr = "") {
        const normalizedEntry = normalizeEntryForRender(entry);
        const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(entry.id)}"` : "";
        const editAttribute = editAttr ? `${editAttr}="${escapeAttribute(entry.id)}"` : "";
        const images = journalImages(normalizedEntry);
        const video = journalVideo(normalizedEntry);
        const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length, photoEntryId: normalizedEntry.id });
        const displayTitle = journalDisplayTitle(normalizedEntry);
        const titleOnlyClass = !images.length && !video && !String(normalizedEntry.text || "").trim() && !walkMarkup ? "journal-item--title-only" : "";
        const chips = journalDisplayChips(normalizedEntry);
        const isMobileShell = typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell");
        const headerWeatherWidgets = renderJournalWeatherWidgets(journalHeaderWeather(normalizedEntry), {
          singlePill: isMobileShell
        });
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
              ${editAttr ? `<button class="button button--ghost journal-item__action" type="button" ${editAttribute} aria-label="UpraviĹĄ zĂˇznam" title="UpraviĹĄ">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
                  <path d="M13 7l4 4"></path>
                </svg>
              </button>` : ""}
              ${deleteAttr ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="VymazaĹĄ zĂˇznam" title="VymazaĹĄ">
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
          ${renderJournalVideoPlayer(video, `Video zĂˇpisu ${displayTitle}`)}
          ${images.length ? `
            <div class="journal-item__gallery">
              ${images.slice(0, 4).map((image, index) => `
                <button class="journal-item__image" type="button" data-open-journal-image="${escapeAttribute(normalizedEntry.id)}" data-journal-image-index="${index}" aria-label="OtvoriĹĄ fotku zĂˇpisu ${escapeAttribute(displayTitle)}">
                  ${renderJournalImageTag(image, displayTitle, { entryId: normalizedEntry.id, index })}
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
        const normalizedEntry = normalizeEntryForRender(entry);
        const rawId = String(normalizedEntry.id || makeId("journal"));
        const rawTitle = journalDisplayTitle(normalizedEntry);
        const rawText = String(normalizedEntry.text || "").trim();
        const previewText = rawText.length > 220 ? `${rawText.slice(0, 217).trimEnd()}...` : rawText;
        const rawDate = String(normalizedEntry.date || todayISO()).trim() || todayISO();
        const images = journalImages(normalizedEntry);
        const video = journalVideo(normalizedEntry);
        const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length, photoEntryId: normalizedEntry.id });
        const chips = journalDisplayChips(normalizedEntry);
        const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(rawId)}"` : "";
        const isMobileShell = typeof document !== "undefined" && document.body.classList.contains("app-mobile-shell");
        const headerWeatherWidgets = renderJournalWeatherWidgets(journalHeaderWeather(normalizedEntry), {
          singlePill: isMobileShell
        });

        if (isMobileShell) {
          return `
          <article class="journal-item journal-item--manager-compact ${images.length ? "journal-item--with-image" : ""}">
            <div class="journal-item__header">
              <div class="journal-item__header-main">
                <div class="journal-item__topline">
                  <span class="journal-item__date-badge">${escapeHtml(journalDateLabel(rawDate))}</span>
                  ${headerWeatherWidgets}
                </div>
                <div class="journal-item__title-wrap">
                  <strong class="journal-item__title">${escapeHtml(rawTitle)}</strong>
                  ${renderMoodBadge(normalizedEntry.mood)}
                </div>
              </div>
              <div class="task-item__side journal-item__actions">
                <button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="VymazaĹĄ zĂˇznam" title="VymazaĹĄ">
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
            ${previewText ? `<p class="task-item__meta journal-item__meta">${escapeHtml(previewText)}</p>` : ""}
            ${walkMarkup}
            ${renderJournalVideoPlayer(video, `Video zĂˇpisu ${rawTitle}`)}
            ${images[0] ? `
              <div class="journal-item__gallery journal-item__gallery--manager-compact">
                <button class="journal-item__image" type="button" data-open-journal-image="${escapeAttribute(rawId)}" data-journal-image-index="0" aria-label="OtvoriĹĄ fotku zĂˇpisu ${escapeAttribute(rawTitle)}">
                  ${renderJournalImageTag(images[0], rawTitle, { entryId: rawId, index: 0 })}
                </button>
                ${images.length > 1 ? `<span class="journal-item__more">+${images.length - 1}</span>` : ""}
              </div>
            ` : ""}
            ${chips.length ? `<div class="journal-item__chips">${chips.map(renderJournalChip).join("")}</div>` : ""}
          </article>
        `;
        }

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
              <button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="VymazaĹĄ zĂˇznam" title="VymazaĹĄ">
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
          ${renderJournalVideoPlayer(video, `Video zĂˇpisu ${rawTitle}`)}
          ${images[0] ? `
            <div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;">
              <button type="button" data-open-journal-image="${escapeAttribute(rawId)}" data-journal-image-index="0" aria-label="OtvoriĹĄ fotku zĂˇpisu ${escapeAttribute(rawTitle)}" style="width:132px;height:132px;padding:0;border:1px solid rgba(122,103,74,0.14);border-radius:18px;overflow:hidden;background:#fff;cursor:pointer;">
                ${renderJournalImageTag(images[0], rawTitle, { entryId: rawId, index: 0, style: "display:block;width:100%;height:100%;object-fit:cover;object-position:center;" })}
              </button>
              ${images.length > 1 ? `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:52px;padding:0 12px;border-radius:16px;background:rgba(255,248,221,0.94);border:1px solid rgba(186,155,90,0.32);color:#7f6324;font-weight:800;">+${images.length - 1}</span>` : ""}
            </div>
          ` : ""}
          ${chips.length ? `<div class="journal-item__chips">${chips.map(renderJournalChip).join("")}</div>` : ""}
        </article>
      `;
      }

      function renderJournalItemSimple(entry, deleteAttr = "", editAttr = "") {
        const normalizedEntry = normalizeEntryForRender(entry);
        const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(entry.id)}"` : "";
        const editAttribute = editAttr ? `${editAttr}="${escapeAttribute(entry.id)}"` : "";
        const images = journalImages(normalizedEntry);
        const video = journalVideo(normalizedEntry);
        const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length, photoEntryId: normalizedEntry.id });
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
              ${editAttr ? `<button class="button button--ghost journal-item__action" type="button" ${editAttribute} aria-label="UpraviĹĄ zĂˇznam" title="UpraviĹĄ">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
                  <path d="M13 7l4 4"></path>
                </svg>
              </button>` : ""}
              ${deleteAttr ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="VymazaĹĄ zĂˇznam" title="VymazaĹĄ">
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
          ${renderJournalVideoPlayer(video, `Video zĂˇpisu ${displayTitle}`)}
          ${images[0] ? `
            <div class="journal-item__gallery">
              <button class="journal-item__image" type="button" data-open-journal-image="${escapeAttribute(normalizedEntry.id)}" data-journal-image-index="0" aria-label="OtvoriĹĄ fotku zĂˇpisu ${escapeAttribute(displayTitle)}">
                ${renderJournalImageTag(images[0], displayTitle, { entryId: normalizedEntry.id, index: 0 })}
              </button>
              ${images.length > 1 ? `<span class="journal-item__more">+${images.length - 1}</span>` : ""}
            </div>
          ` : ""}
        </article>
      `;
      }

      function renderJournalItemEmergency(entry, deleteAttr = "", editAttr = "") {
        const normalizedEntry = normalizeEntryForRender(entry);
        const deleteAttribute = deleteAttr ? `${deleteAttr}="${escapeAttribute(entry.id)}"` : "";
        const editAttribute = editAttr ? `${editAttr}="${escapeAttribute(entry.id)}"` : "";
        const images = journalImages(normalizedEntry);
        const video = journalVideo(normalizedEntry);
        const walkMarkup = renderJournalWalkSummary(normalizedEntry.walk, { compact: true, photoCount: images.length, photoEntryId: normalizedEntry.id });
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
              ${editAttr ? `<button class="button button--ghost journal-item__action" type="button" ${editAttribute} aria-label="UpraviĹĄ zĂˇznam" title="UpraviĹĄ">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
                  <path d="M13 7l4 4"></path>
                </svg>
              </button>` : ""}
              ${deleteAttr ? `<button class="button button--ghost journal-item__action journal-item__action--danger" type="button" ${deleteAttribute} aria-label="VymazaĹĄ zĂˇznam" title="VymazaĹĄ">
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
          ${renderJournalVideoPlayer(video, `Video zĂˇpisu ${displayTitle}`)}
          ${images[0] ? `
            <div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;">
              <button type="button" data-open-journal-image="${escapeAttribute(normalizedEntry.id)}" data-journal-image-index="0" aria-label="OtvoriĹĄ fotku zĂˇpisu ${escapeAttribute(displayTitle)}" style="width:132px;height:132px;padding:0;border:1px solid rgba(122,103,74,0.14);border-radius:18px;overflow:hidden;background:#fff;cursor:pointer;">
                ${renderJournalImageTag(images[0], displayTitle, { entryId: normalizedEntry.id, index: 0, style: "display:block;width:100%;height:100%;object-fit:cover;object-position:center;" })}
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
            if (detailModal.open) {
              suppressNextDetailReturnContext({ preserveContext: true });
              detailModal.close();
            }
            openStoredCardView(varietyId, { captureReturnContext: false });
          };

          item.addEventListener("click", openMiniVariety);
          item.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            openMiniVariety();
          });
        });
      }

      function init() {
        uiHelpers.init?.();
      }

      function refresh() {
        uiHelpers.refresh?.();
      }

      function destroy() {
        uiHelpers.destroy?.();
      }

      return {
        init,
        refresh,
        destroy,
        progressCard,
        miniItem,
        renderJournalItem,
        renderJournalManagerCard,
        renderJournalItemSimple,
        renderJournalItemEmergency,
        bindMiniVarietyOpen
      };
    };
  }
})(window);

