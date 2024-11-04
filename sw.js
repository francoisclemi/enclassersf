const CACHE_NAME = 'pwa-calculateur-presse';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Si tu as un fichier CSS séparé
  '/script.js' // Si tu as un fichier JavaScript séparé
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Retourne la réponse en cache si elle existe
        }
        return fetch(event.request); // Sinon, fait une requête réseau
      }
    )
  );
});
