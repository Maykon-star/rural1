const CACHE_NAME = 'eito-degital-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './rural.css',
    './manifest.json',
    './icone-192.png',
    './icone-512.png',
    './calculos.js',
    './rural.js',
    './privacidade.html',
    './termos.html'
];
self.addEventListener('install', (event) => {
    event.waitUntil (
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});