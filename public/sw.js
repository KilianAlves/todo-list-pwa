import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

cleanupOutdatedCaches()


precacheAndRoute(self.__WB_MANIFEST)


const deleteOldCaches = async () => {
  cleanupOutdatedCaches();
};

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});


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
  } // else {
    // Pour les autres requêtes, utilisez la stratégie de cacheFirst déjà définie
    // event.respondWith(cacheFirst(request));
  // }
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



self.skipWaiting();