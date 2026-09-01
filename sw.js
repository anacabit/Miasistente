// Mi Asistente — Service Worker v2
const CACHE = 'miasistente-v2';
const ARCHIVOS = [
  '/Miasistente/',
  '/Miasistente/index.html',
  '/Miasistente/manifest.json',
  '/Miasistente/icon-192.png',
  '/Miasistente/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ARCHIVOS).catch(function(){});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).catch(function(){ return cached; });
    })
  );
});
