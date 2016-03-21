(function() {
  'use strict';

  angular
    .module('example')
    .service('Form', FormService);

  /** @ngInject */
  function FormService($q, Confirm) {

    this.validated = function(form) {
      return $q(function (resolve, reject) {
        var valid = form.$valid && !form.$pending;
        valid ? resolve() : angular.forEach(form, function(property, name) {
          (name.indexOf('$') !== 0) && property.$setDirty();
        }) && reject();
      });
    };

    this.cancelled = function(form) {
      return form.$dirty ? Confirm('form.cancel').result : $q.resolve();
    };

    this.clear = function(form) {
      form.$setPristine();
      form.$setUntouched();
    };
  }

})();
