(function() {
  'use strict';

  angular
    .module('example')
    .config(configLocationHtml5Mode);

  /** @ngInject */
  function configLocationHtml5Mode($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }

})();
