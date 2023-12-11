const STATIC_CACHE_NAME = "todosApp-static.v1";

const addResourcesToCache = async (ressources) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    // erreur request fail ?
    await cache.addAll(ressources);
}

const putInCache = async (request, response) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.put(request, response);
};

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = ["v2"];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
  // Si la requête cible une url contenant le fichier background.css
  if (event.request.url.includes("background.css")) {
    // La réponse produite sera
    event.respondWith(
      // Le résultat de la requête vers le fichier background.css
      fetch(event.request)
      // Ou en cas d'échec
      .catch(() => {
        // une réponse fabriquée avec un fond orange
        return new Response(".main {background: orange;}", { headers: { "Content-Type": "text/css" }});
      })
    )
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});


// Erreur dans les éléments mis en cache ?
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/css/style.css",
            "/manifest.json",
            "/icons/favicon.ico",
            "/icons/icon-512x512.png"
        ])
    );
});


self.skipWaiting();