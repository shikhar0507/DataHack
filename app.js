var app = angular.module('app', ['ui.router']);  

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl : 'views/home.html',
            controller : 'init'
        });

});


//Service worker

if('serviceWorker' in navigator) {
    console.log('service worker regesteration in progress');
    navigator.serviceWorker.register('service-worker.js', {scope:'/ProgressiveWebApp/'}).then(function() {
  
    console.log('service worker regesteration complete');
  }, function () {
    console.log('service worker regesteration failure');
  });
  } else {
    console.log('service worker no supported');
  }
  
  