const CACHE = "cw-v2";
const PRECACHE = ["/", "/manifest.json", "/icons/icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  // Network-first for navigation (HTML pages) and API calls
  // so locale changes, auth, and dynamic data always get fresh responses
  if (e.request.mode === "navigate" || e.request.url.includes("/api/")) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          if (r.status === 200) {
            const copy = r.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          }
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, images, fonts)
  e.respondWith(
    caches.match(e.request).then(
      (cached) =>
        cached ||
        fetch(e.request)
          .then((r) => {
            if (r.status === 200) {
              const copy = r.clone();
              caches.open(CACHE).then((cache) => cache.put(e.request, copy));
            }
            return r;
          })
          .catch(() => cached)
    )
  );
});
