const MOJA_ZAHRADA_STATIC_CACHE = "moja-zahrada-static-v2026-04-08-0008";
const MOJA_ZAHRADA_RUNTIME_CACHE = "moja-zahrada-runtime-v2026-04-08-0008";
const MOJA_ZAHRADA_APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=2026-04-08-0027",
  "./weatherBackground.css?v=2026-04-05-0129",
  "./app.js?v=2026-04-08-0008",
  "./weatherBackground.js?v=2026-04-05-0129",
  "./weatherAudio.js?v=2026-04-08-0001",
  "./supabase-config.js?v=2026-03-29-0015",
  "./pwa.js?v=2026-04-08-0008",
  "./manifest.webmanifest?v=2026-04-04-0077",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png?v=2026-04-04-0077",
  "./favicon.svg?v=2026-04-04-0077"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(MOJA_ZAHRADA_STATIC_CACHE)
      .then((cache) => cache.addAll(MOJA_ZAHRADA_APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((cacheName) => ![MOJA_ZAHRADA_STATIC_CACHE, MOJA_ZAHRADA_RUNTIME_CACHE].includes(cacheName))
        .map((cacheName) => caches.delete(cacheName))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function shouldRuntimeCache(requestUrl, request) {
  if (request.method !== "GET") return false;
  if (requestUrl.origin !== self.location.origin) return false;
  if (request.mode === "navigate") return false;

  const pathname = requestUrl.pathname.toLowerCase();
  const destination = request.destination || "";

  return destination === "script"
    || destination === "style"
    || destination === "image"
    || destination === "audio"
    || destination === "font"
    || pathname.endsWith(".js")
    || pathname.endsWith(".css")
    || pathname.endsWith(".png")
    || pathname.endsWith(".svg")
    || pathname.endsWith(".jpg")
    || pathname.endsWith(".jpeg")
    || pathname.endsWith(".webp")
    || pathname.endsWith(".mp3")
    || pathname.endsWith(".wav")
    || pathname.endsWith(".ogg");
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(MOJA_ZAHRADA_RUNTIME_CACHE);
        cache.put("./index.html", response.clone());
        return response;
      } catch (error) {
        return caches.match(request) || caches.match("./index.html");
      }
    })());
    return;
  }

  if (!shouldRuntimeCache(requestUrl, request)) return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(MOJA_ZAHRADA_RUNTIME_CACHE);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return caches.match(requestUrl.pathname);
    }
  })());
});
