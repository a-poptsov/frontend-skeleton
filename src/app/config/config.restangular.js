(function () {
  'use strict';

  angular
    .module('example')
    .config(resourceLocationConfig);

  /** @ngInject */
  function resourceLocationConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('api/');
  }

})();
