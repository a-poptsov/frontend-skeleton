(function () {
  'use strict';

  angular
    .module('example')
    .service('Authorization', AuthorizationService);

  /** @ngInject */
  function AuthorizationService() {

    this.header = function(login, pass) {
      return 'Basic ' + btoa(login + ':' + pass);
    };
  }
})();
