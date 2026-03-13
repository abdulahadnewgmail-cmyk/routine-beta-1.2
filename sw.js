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

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
