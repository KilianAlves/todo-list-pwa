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

// Mise en cache des données issues de l'API

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Vérifiez que la requête est une méthode GET et qu'elle concerne l'API (port :7000)
  if (request.method === "GET" && request.url.includes(":7000/todos")) {
    event.respondWith(
      // Stratégie réseau en premier, puis cache en cas d'échec
      fetch(request)
        .then((networkResponse) => {
          // Clonez la réponse pour la mettre en cache
          const responseClone = networkResponse.clone();
          caches.open("todos") // Créez ou ouvrez le cache 'todos'
            .then((cache) => {
              cache.put(request, responseClone); // Mettez en cache la réponse
            });
          return networkResponse; // Retournez la réponse réseau
        })
        .catch(() => {
          // Si la requête échoue, cherchez dans le cache 'todos'
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse; // Retournez la réponse du cache
              } else {
                // Si la réponse n'est pas dans le cache, renvoyez une réponse vide ou un message d'erreur
                return new Response("No data available in cache.", { status: 404 });
              }
            });
        })
    );
  } else {
    // Pour les autres requêtes, utilisez la stratégie de cacheFirst déjà définie
    event.respondWith(cacheFirst(request));
  }
});


// Si réseau indisponible, afficher un fond orange sinon le fond classique

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