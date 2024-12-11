const CACHE_NAME = 'williams-cache';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/data/williamsfull.geojson',
  '/static/manifest.json',
  '/static/mapwil.png',
  '/css/style.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/data/williamsfull.geojson')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
