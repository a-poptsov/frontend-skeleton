(function() {
  'use strict';

  angular
    .module('example')
    .config(privateRouteConfig)
    .controller('PrivateController', PrivateController);

  /** @ngInject */
  function privateRouteConfig($stateProvider) {
    $stateProvider
      .state('private', {
        abstract: true,
        templateUrl: 'app/private/private.html',
        controller: 'PrivateController',
        controllerAs: 'private',
        resolve: {
          currentUser: function($http) {
            return $http.get('api/users/current').then(function(payload) {
              return payload.data;
            });
          }
        },
        data: {
          activeTab: null
        }
      });
  }

  /** @ngInject */
  function PrivateController(currentUser, $rootScope, $state) {
    var vm = this;
    vm.activeTab = $state.current.data.activeTab;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      if (toState && toState.data) {
        if (toState.data.activeTab === 'profile' && toParams.username !== currentUser.username) {
          vm.activeTab = null;
        } else {
          vm.activeTab = toState.data.activeTab;
        }
      }
    });

    vm.user = currentUser;
  }

})();
