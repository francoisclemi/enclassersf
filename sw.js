const CACHE_NAME = 'pwa-calculateur-presse';
const urlsToCache = [
  './',
  './index.html',
  './styles.css', // Si tu as un fichier CSS séparé
  './script.js' // Si tu as un fichier JavaScript séparé
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
// ajout du bouton d'installation de l'appli

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Empêche l'affichage automatique de la boîte de dialogue d'installation
    e.preventDefault();
    // Sauvegarde l'événement pour l'utiliser plus tard
    deferredPrompt = e;
    // Affiche le bouton d'installation
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        // Cache le bouton
        installButton.style.display = 'none';
        // Affiche la boîte de dialogue d'installation
        deferredPrompt.prompt();
        // Attend la réponse de l'utilisateur
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('L\'utilisateur a accepté l\'installation');
            } else {
                console.log('L\'utilisateur a refusé l\'installation');
            }
            deferredPrompt = null;
        });
    });
});
