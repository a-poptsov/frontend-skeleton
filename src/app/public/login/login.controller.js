(function () {
  'use strict';

  angular
    .module('example')
    .config(loginRouteConfig)
    .controller('LoginController', LoginController);

  /** @ngInject */
  function loginRouteConfig($stateProvider) {
    $stateProvider
      .state('login', {
        parent: 'public',
        url: '/login',
        templateUrl: 'app/public/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
  }

  /** @ngInject */
  function LoginController($http, Authorization, $state, Form, growl) {
    var vm = this;

    vm.submit = function (loginForm) {
      vm.pending = Form.validated(loginForm).then(function () {
        return $http({
          method: 'get',
          url: 'api/login',
          headers: {'authorization': Authorization.header(vm.login, vm.password)},
          customErrorHandling: true
        });
      }).then(function() {
        $state.go('home');
      }).catch(function (payload) {
        if (payload) {
          if (payload.status !== 401) {
            growl.error('public.error.error_on_page', {ttl: -1});
          } else {
            //TODO
          }
        }
      });
    };
  }
})();
