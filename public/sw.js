const STATIC_CACHE_NAME = "todosApp-static.v0";

const addResourcesToCache = async (ressources) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    // erreur request fail ?
    await cache.addAll(ressources);
}

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
  event.respondWith(cacheFirst({request: event.request}));
});

// Erreur dans les éléments mis en cache ?
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/assets/index-e1f2cdea.js",
            "/js/registerSw.js",
            "/css/style.css",
            "/icons/icon-192x192.png",
            "/icons/icon-512x512.png",
            "/manifest.json",
            "/icons/favicon.ico"
        ])
    );
});


// provoque erreur ??
self.skipWaiting();