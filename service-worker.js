// const CACHE_NAME = "barito-v3";
// let urlsToCache = [
//   '/',
//   '/manifest.json',
//   '/index.html',
//   '/matchdetail.html',
//   '/push.js',
//   '/pages/home.html',
//   '/pages/nav.html',
//   '/pages/saved.html',
//   '/pages/match.html',
//   '/pages/squad.html',
//   '/pages/standing.html',
//   '/pages/topscorer.html',
//   '/assets/css/style.css',
//   '/assets/js/nav.js',
//   '/assets/js/api.js',
//   '/assets/js/script.js',
//   '/assets/js/idb.js',
//   '/assets/js/db.js',
//   '/assets/js/matchdetail.js',
//   '/assets/images/B.png',
//   '/assets/images/apple_icon_192x192.png',
//   '/assets/images/hero.jpg',
//   '/assets/images/logo.png',
//   '/assets/images/icons/icon-72x72.png',
//   '/assets/images/icons/icon-96x96.png',
//   '/assets/images/icons/icon-128x128.png',
//   '/assets/images/icons/icon-144x144.png',
//   '/assets/images/icons/icon-152x152.png',
//   '/assets/images/icons/icon-192x192.png',
//   '/assets/images/icons/icon-384x384.png',
//   '/assets/images/icons/icon-512x512.png',
//   '/materialize/css/materialize.min.css',
//   '/materialize/js/materialize.min.js',
//   'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&family=Roboto:ital,wght@0,300;0,400;0,500;1,700&display=swap',
//   'https://fonts.googleapis.com/icon?family=Material+Icons',
//   'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
// ];

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {

//   let base_url = "https://api.football-data.org/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, {
//         ignoreSearch: true
//       }).then(function (response) {
//         return response || fetch(event.request);
//       })
//     )
//   }
// })

// self.addEventListener("activate", function (event) {
//   console.log('Aktivasi service worker baru');
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });


self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'assets/images/icons/icon-72x72.png',
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



importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/matchdetail.html',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: '/materialize/css/materialize.min.css',
    revision: '1'
  },
  {
    url: '/materialize/js/materialize.min.js',
    revision: '1'
  },
  {
    url: '/assets/css/style.css',
    revision: '1'
  },
  {
    url: '/assets/js/nav.js',
    revision: '1'
  },
  {
    url: '/assets/js/api.js',
    revision: '1'
  },
  {
    url: '/assets/js/idb.js',
    revision: '1'
  },
  {
    url: '/assets/js/db.js',
    revision: '1'
  },
  {
    url: '/assets/js/script.js',
    revision: '1'
  },
  {
    url: '/assets/js/matchdetail.js',
    revision: '1'
  },
  {
    url: '/assets/images/B.png',
    revision: '1'
  },
  {
    url: '/assets/images/logo.png',
    revision: '1'
  },
  {
    url: '/assets/images/hero.jpg',
    revision: '1'
  },
  {
    url: '/assets/images/icons/icon-144x144.png',
    revision: '1'
  },
  {
    url: '/assets/images/apple_icon_192x192.png',
    revision: '1'
  },
  {
    url: '/pages/home.html',
    revision: '1'
  },
  {
    url: '/pages/match.html',
    revision: '1'
  },
  {
    url: '/pages/nav.html',
    revision: '1'
  },
  {
    url: '/pages/saved.html',
    revision: '1'
  },
  {
    url: '/pages/squad.html',
    revision: '1'
  },
  {
    url: '/pages/standing.html',
    revision: '1'
  },
  {
    url: '/pages/topscorer.html',
    revision: '1'
  },
]);


workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'root'
  })
);


workbox.routing.registerRoute(
  new RegExp('/assets/images/icons/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'icons'
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.origin === 'https://fonts.googleapis.com' ||
  url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'fonts'
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.origin === 'https://api.football-data.org',
  new workbox.strategies.CacheFirst({
    cacheName: 'data-api',
    plugins: [
      new workbox.cacheableResponse.CacheableResponse(({
        statuses: [0, 200, 404],
        headers: {
          'Access-Control-Expose-Headers': 'X-Is-Cacheable',
          'X-Is-Cacheable': 'yes'
        }
      }))
    ]
  })
);