const STATIC_CACHE_NAME = "todosApp-static.v0";

const addResourcesToCache = async (ressources) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    return cache.addAll(ressources);
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/js/app.js",
            "/js/registerSw.js",
            "/css/style.css",
            "/img/icon-192x192.png",
            "/img/icon-512x512.png",
        ])
    );
});

self.skipWaiting();