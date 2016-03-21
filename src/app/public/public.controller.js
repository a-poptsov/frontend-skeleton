(function() {
  'use strict';

  angular
    .module('example')
    .config(publicRouteConfig);

  /** @ngInject */
  function publicRouteConfig($stateProvider) {
    $stateProvider
      .state('public', {
        abstract: true,
        templateUrl: 'app/public/public.html'
      });
  }
})();
