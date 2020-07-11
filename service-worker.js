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