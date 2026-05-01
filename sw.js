const CACHE = 'nocturne-v1';
const FILES = [
  './index.html',
  './manifest.json',
  './assets/Logo/icon-192.jpg',
  './assets/Logo/icon-512.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
