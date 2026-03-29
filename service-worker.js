// 📄 Fichier : service-worker.js
// 🎯 Rôle : PWA — cache des assets pour fonctionnement hors ligne

const CACHE_NAME = 'house-plants-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/css/reset.css',
  '/css/layout.css',
  '/css/responsive.css',
  '/css/components/buttons.css',
  '/css/components/modals.css',
  '/css/components/cards.css',
  '/css/components/badges.css',
  '/css/components/calendar.css',
  '/css/components/forms.css',
  '/css/components/empty-state.css',
  '/css/components/settings.css',
  '/js/config.js',
  '/js/storage.js',
  '/js/router.js',
  '/js/plants/plants.js',
  '/js/plants/plants.ui.js',
  '/js/plants/plants.modal.js',
  '/js/plants/plants.events.js',
  '/js/calendar/calendar.js',
  '/js/calendar/calendar.ui.js',
  '/js/calendar/calendar.modal.js',
  '/js/calendar/calendar.events.js',
  '/js/settings/settings.js',
  '/js/settings/settings.ui.js',
  '/js/settings/settings.events.js',
  '/js/app.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
