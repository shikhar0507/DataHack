var app = angular.module('app',['ui.router'])
.constant('URL','')

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'views/Home.html',
      controller: 'home'
    })


});
