(function () {
  'use strict';

  angular
    .module('example')
    .config(routeDefaultPathConfig)
    .run(routeErrorConfig);

  /** @ngInject */
  function routeDefaultPathConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise(function ($injector) {
      $injector.get('$state').go('error', {status: 404});
    });
  }

  /** @ngInject */
  function routeErrorConfig($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error.status === 401) {
        $state.go('login');
      } else {
        $state.go('error', {status: error.status});
      }
    });
  }

})();
