(function () {
  'use strict';

  angular
    .module('example')
    .value('cgBusyDefaults', {
      message: null,
      backdrop: true,
      templateUrl: 'app/config/cgbusy/config.cgbusy.html',
      delay: 300,
      minDuration: 700
    });

})();
