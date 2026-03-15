const cacheName = 'routine-v1';
const assets = [
  './',
  './index.html',
  './table.html',
  './routine.css',
  './header.css',
  './table.css',
  './r.js',
  './data_r.js',
  './table.js'
];

// Install: Cache all files
self.addEventListener('install', e => {
  self.skipWaiting(); // Forces the waiting service worker to become active
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
