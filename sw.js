const CACHE = 'nocturne-v3';

// À l'installation : on prend le contrôle immédiatement
self.addEventListener('install', e => {
  self.skipWaiting();
});

// À l'activation : on supprime tous les anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Réseau en priorité, cache en fallback
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
