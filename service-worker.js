var version = 'v1::';

self.addEventListener("install", function(event) {
  console.log('install event in progress');
  event.waitUntil(
    caches
      .open(version+ 'fundamentals')
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
        .then(function () {
          console.log('installation completed');
        })
  )
});
