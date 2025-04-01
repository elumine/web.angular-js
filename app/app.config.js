'use strict';

angular.
  module('myApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider
        .when('/users', {
          template: '<users-view></users-view>'
        })
        .when('/users/:id', {
          template: '<users-view></users-view>'
        })
        .when('/404', {
          template: 'Oops, 404, page not found'
        })
        .when('/403', { // page exists, but to design for login provided so it's available only via url
          template: 'Oops, 403, forbidden :('
        })
        .otherwise('/404');
    }
  ]);
