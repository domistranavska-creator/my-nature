(function initMojaZahradaPwa() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const isSecureContextLike = window.location.protocol === "https:"
    || window.location.hostname === "localhost"
    || window.location.hostname === "127.0.0.1";

  if (!isSecureContextLike) return;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    window.mojaZahradaDeferredInstallPrompt = event;
    document.documentElement.classList.add("pwa-install-ready");
  });

  window.addEventListener("appinstalled", () => {
    window.mojaZahradaDeferredInstallPrompt = null;
    document.documentElement.classList.remove("pwa-install-ready");
  });

  window.addEventListener("load", () => {
    const serviceWorkerUrl = new URL("./sw.js?v=2026-04-08-0011", window.location.href);

    navigator.serviceWorker.register(serviceWorkerUrl.href).then((registration) => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
            window.dispatchEvent(new CustomEvent("moja-zahrada-pwa-update"));
          }
        });
      });
    }).catch((error) => {
      console.warn("PWA service worker sa teraz nepodarilo zaregistrovať.", error);
    });
  });
})();
