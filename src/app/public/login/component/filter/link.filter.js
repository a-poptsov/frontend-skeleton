(function () {
  'use strict';

  angular
    .module('example')
    .filter('encodeURIComponent', EncodeURIComponent);

  /** @ngInject */
  function EncodeURIComponent() {
    return function (string) {
      return window.encodeURIComponent(string);
    };
  }
})();
