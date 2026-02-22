const CACHE_NAME = 'lfilab-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/index.css',
    '/vite.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Ignore non-GET requests and chrome-extension:// schemes
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
        return;
    }

    // Stale-while-revalidate strategy for maximum reliability and speed
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Cache dynamic assets (like Vite bundles and external fonts)
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Network failed (offline), do nothing since we already return cachedResponse below if it exists
            });

            return cachedResponse || fetchPromise;
        })
    );
});
