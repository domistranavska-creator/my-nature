(function initMojaZahradaAuthLocalModule(globalScope) {
  const registry = globalScope.MojaZahradaModules || (globalScope.MojaZahradaModules = {});

  if (typeof registry.createAuthLocalModule !== "function") {
    registry.createAuthLocalModule = function createAuthLocalModule(deps = {}) {
      const scope = "auth-local";
      const {
        LOCAL_AUTH_PROFILE_KEY,
        LOCAL_AUTH_SESSION_KEY,
        makeId,
        unlockBodyScroll,
        syncWeatherBackgroundLoopVisibility,
        closeToolbarAddMenu,
        closeJournalOverlay,
        closeImageLightbox,
        getDetailModal,
        resetAuthGatePreviousOverflow,
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

      const localAuthProfileKey = requireValue("LOCAL_AUTH_PROFILE_KEY", LOCAL_AUTH_PROFILE_KEY);
      const localAuthSessionKey = requireValue("LOCAL_AUTH_SESSION_KEY", LOCAL_AUTH_SESSION_KEY);
      const makeIdValue = requireFunction("makeId", makeId);
      const unlockBodyScrollValue = requireFunction("unlockBodyScroll", unlockBodyScroll);
      const syncWeatherBackgroundLoopVisibilityValue = requireFunction("syncWeatherBackgroundLoopVisibility", syncWeatherBackgroundLoopVisibility);
      const closeToolbarAddMenuValue = requireFunction("closeToolbarAddMenu", closeToolbarAddMenu);
      const closeJournalOverlayValue = requireFunction("closeJournalOverlay", closeJournalOverlay);
      const closeImageLightboxValue = requireFunction("closeImageLightbox", closeImageLightbox);
      const getDetailModalValue = requireFunction("getDetailModal", getDetailModal);
      const resetAuthGatePreviousOverflowValue = requireFunction("resetAuthGatePreviousOverflow", resetAuthGatePreviousOverflow);

      function normalizeLocalAuthProfile(profile = {}) {
        if (!profile || typeof profile !== "object") return null;
        const email = String(profile.email || "").trim().toLowerCase();
        const passwordHash = String(profile.passwordHash || "").trim();
        const passwordSalt = String(profile.passwordSalt || "").trim();
        if (!email || !passwordHash || !passwordSalt) return null;
        return {
          userId: String(profile.userId || makeIdValue("user")).trim() || makeIdValue("user"),
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
          const raw = localStorage.getItem(localAuthProfileKey);
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
          localStorage.setItem(localAuthProfileKey, JSON.stringify(normalized));
          return true;
        } catch (error) {
          return false;
        }
      }

      function clearLocalAuthProfile() {
        try {
          localStorage.removeItem(localAuthProfileKey);
        } catch (error) {
          return;
        }
      }

      function loadLocalAuthSession() {
        try {
          const raw = localStorage.getItem(localAuthSessionKey);
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
          localStorage.setItem(localAuthSessionKey, JSON.stringify({
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
          localStorage.removeItem(localAuthSessionKey);
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
        if (!globalScope.crypto?.subtle || typeof TextEncoder === "undefined") {
          throw new Error("Tento prehliadač zatiaľ nepodporuje bezpečné lokálne prihlasovanie.");
        }
        const digest = await globalScope.crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value || "")));
        return [...new Uint8Array(digest)].map((item) => item.toString(16).padStart(2, "0")).join("");
      }

      function makeLocalAuthSalt() {
        if (!globalScope.crypto?.getRandomValues) {
          throw new Error("Tento prehliadač zatiaľ nevie pripraviť bezpečný lokálny účet.");
        }
        const bytes = new Uint8Array(16);
        globalScope.crypto.getRandomValues(bytes);
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
          userId: makeIdValue("user"),
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
        unlockBodyScrollValue("auth");
        resetAuthGatePreviousOverflowValue();
        syncWeatherBackgroundLoopVisibilityValue();
      }

      function ensureAuthGateRoot() {
        let root = authGateRoot();
        if (root) return root;
        root = document.createElement("div");
        root.id = "auth-gate-root";
        document.body.appendChild(root);
        syncWeatherBackgroundLoopVisibilityValue();
        return root;
      }

      function closeSecondaryOverlaysForAuthLock() {
        closeToolbarAddMenuValue();
        closeJournalOverlayValue();
        closeImageLightboxValue();
        const detailModal = getDetailModalValue();
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
        removeAuthGate();
      }

      function init() {}
      function refresh() {}
      function destroy() {}

      return {
        init,
        refresh,
        destroy,
        normalizeLocalAuthProfile,
        loadLocalAuthProfile,
        saveLocalAuthProfile,
        clearLocalAuthProfile,
        loadLocalAuthSession,
        saveLocalAuthSession,
        clearLocalAuthSession,
        localAuthDisplayName,
        isLocalAuthSessionValid,
        sha256Hex,
        makeLocalAuthSalt,
        hashLocalAuthPassword,
        buildLocalAuthProfile,
        verifyLocalAuthPassword,
        authGateRoot,
        removeAuthGate,
        ensureAuthGateRoot,
        closeSecondaryOverlaysForAuthLock,
        lockAppToAuth,
        syncAuthGate
      };
    };
  }
})(window);
