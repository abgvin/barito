const CACHE_NAME = "barito-v2";
let urlsToCache = [
  '/',
  '/manifest.json',
  '/index.html',
  '/matchdetail.html',
  '/push.js',
  '/pages/home.html',
  '/pages/nav.html',
  '/pages/saved.html',
  '/pages/match.html',
  '/pages/squad.html',
  '/pages/standing.html',
  '/pages/topscorer.html',
  '/assets/css/style.css',
  '/assets/js/nav.js',
  '/assets/js/api.js',
  '/assets/js/script.js',
  '/assets/js/idb.js',
  '/assets/js/db.js',
  '/assets/js/matchdetail.js',
  '/assets/images/B.png',
  '/assets/images/apple_icon_192x192.png',
  '/assets/images/hero.jpg',
  '/assets/images/logo.png',
  '/assets/images/icons/icon-72x72.png',
  '/assets/images/icons/icon-96x96.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-384x384.png',
  '/assets/images/icons/icon-512x512.png',
  '/materialize/css/materialize.min.css',
  '/materialize/js/materialize.min.js',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&family=Roboto:ital,wght@0,300;0,400;0,500;1,700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {

  let base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {
        ignoreSearch: true
      }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
})

self.addEventListener("activate", function (event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});