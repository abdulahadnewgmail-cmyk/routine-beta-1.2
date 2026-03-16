const cacheName = 'somoy-routine-v1.3';
const assets = [
  './',
  './index.html',
  './table.html',
  './routine.css',
  './header.css',
  './table.css',
  './r.js',
  './data_r.js',
  './table.js',
  './manifest.json' // Recommended to add this
];

// Install: Save everything to the phone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Activate: Delete old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Serve from cache but update in the background
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Update the cache with the new version from the internet
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // If totally offline, this catch handles the error silently
        });
        
        // Return the cached version immediately, or wait for network if not in cache
        return response || fetchPromise;
      });
    })
  );
});
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
