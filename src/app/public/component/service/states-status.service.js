(function () {
  'use strict';

  angular
    .module('consplusweb')
    .service('StateStatus', StateStatusService);

  /** @ngInject */
  function StateStatusService() {
    var stateChanging = false;
    this.isStateChanging = function () {
      return stateChanging;
    };
    this.setStateChanging = function (newVal) {
      stateChanging = newVal;
    };
  }
})();
