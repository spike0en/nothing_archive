// Nothing Archive Custom Service Worker for PWA compliance
const CACHE_NAME = 'nothing-archive-cache-v2';
const ASSETS_TO_CACHE = [
  '/nothing_archive/',
  '/nothing_archive/index.html',
  '/nothing_archive/manifest.json',
  '/nothing_archive/img/logo_dark.png',
  '/nothing_archive/img/logo_light.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Ignore errors if some assets fail to load initially
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Pre-caching assets warn:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle local GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  if (!url.pathname.startsWith('/nothing_archive/') || url.pathname.endsWith('/sw.js')) {
    return;
  }

  const isNavigation = event.request.mode === 'navigate';
  const acceptsHtml = event.request.headers.get('accept')?.includes('text/html');

  // Network-First strategy for HTML navigation requests to prevent stale chunk errors after updates
  if (isNavigation || acceptsHtml) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return networkResponse;
          }
          return caches.match(event.request);
        })
        .catch(() => {
          return caches.match(event.request) || caches.match('/nothing_archive/index.html');
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in the background to update cache (stale-while-revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return networkResponse;
      }).catch(() => {
        // Fallback for offline pages
        if (event.request.mode === 'navigate') {
          return caches.match('/nothing_archive/index.html');
        }
      });
    })
  );
});
