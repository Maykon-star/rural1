const CACHE_NAME = 'eito-degital-v1';
const ASSENT_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './icone-192.png',
    './icone.512.png',
    './calculos.js',
    './script.js'
];
self.addEventListener('install', (event) => {
    event.waitUntil (
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSENT_TO_CACHE);
        })
    );
});