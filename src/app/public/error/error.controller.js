(function () {
  'use strict';

  angular
    .module('example')
    .config(errorRouteConfig)
    .controller('ErrorController', ErrorController);

  /** @ngInject */
  function errorRouteConfig($stateProvider) {
    $stateProvider
      .state('error', {
        templateUrl: 'app/public/error/error.html',
        controllerAs: 'error',
        params: {status: null},
        controller: 'ErrorController'
      });
  }

  /** @ngInject */
  function ErrorController($stateParams) {
    var vm = this;

    vm.status = $stateParams.status;
  }
})();
