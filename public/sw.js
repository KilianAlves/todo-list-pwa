const STATIC_CACHE_NAME = "todosApp-static.v0";

const addResourcesToCache = async (ressources) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    // erreur request fail ?
    return cache.addAll(ressources);
}
// Erreur dans les éléments mis en cache ?
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/js/app.js",
            "/js/registerSw.js",
            "/css/style.css",
            "/icons/icon-192x192.png",
            "/icons/icon-512x512.png",
            "/manifest.json",
        ])
    );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request));
});


const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    addResourcesToCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  };
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
  });

// provoque erreur ??
self.skipWaiting();