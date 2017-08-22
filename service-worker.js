var version = 'v1::';

self.addEventListener("install", function(event) {
    console.log('install event in progress');
    event.waitUntil(
        caches
        .open(version + 'fundamentals')
        .then(function(cache) {
            return cache.addAll([
                '/',
                'app.js',
                'scripts/controllers/home.js',
                'scripts/services/services.js',
                'bower_components/angular/angular.min.js',
                'bower_components/angular-ui-router/release/angular-ui-router.min.js'

            ]);
        })
        .then(function() {
            console.log('installation completed');
        })
    )
})
self.addEventListener("fetch", function(event) {
            console.log("fetch in progress");
            if (event.request.method !== 'GET') {
                console.log("Fetch Event ignored", event.request.method, event.request.url);
                return;
            }
            event.respondWith(
                caches
                .match(event.request)
                .then(function(cached) {
                    var networked = fetch(event.request)
                        .then(fetchedFromNetwork, unableToResolve)
                            .catch(unableToResolve)
                            console.log('fetch event', cached ? '(cahed)' : '(network)', event.request.url);
                            return cahed || networked;
                            function fetchedFromNetwork(response) {
                                var CacheCopy = response.clone();
                                console.log('fetch response from network', event.request.url);
                                caches
                                    .open(version + 'pages')
                                    .then(function add(cache) {
                                        cache.put(event.request, cacheCopy);
                                    })
                                    .then(function() {
                                        console.log('WORKER: fetch response stored in cache.', event.request.url);
                                    });
                                return response;
                            }
                            function unableToResolve() {
                                console.log('WORKER: fetch request failed in both cache and network.');
                                return new Response('<h1>Service Unavailable</h1>', {
                                    status: 503,
                                    statusText: 'Service Unavailable',
                                    headers: new Headers({
                                        'Content-Type': 'text/html'
                                      })
                                         });
                                       }
                                     })
                                 );
                               });

            self.addEventListener("activate", function(event) {
              console.log('WORKER: activate event in progress.');

              event.waitUntil(
                caches
                  .keys()
                  .then(function (keys) {
                    return Promise.all(
                      keys
                        .filter(function (key) {
                          return !key.startsWith(version);
                        })
                        .map(function (key) {
                          return caches.delete(key);
                        })
                    );
                  })
                  .then(function() {
                    console.log('WORKER: activate completed.');
                  })
              );
            });
