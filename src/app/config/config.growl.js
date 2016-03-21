(function () {
  'use strict';

  angular
    .module('example')
    .config(resourceLocationConfig);

  /** @ngInject */
  function resourceLocationConfig(growlProvider) {
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalDisableCountDown(true);
  }
})();
