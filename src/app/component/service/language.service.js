(function () {
  'use strict';

  angular
    .module('example')
    .service('Language', LanguageService);

  /** @ngInject */
  function LanguageService($localStorage, $translate) {

    $translate.use($localStorage.language = $localStorage.language || $translate.use());

    this.change = function (language) {
      $translate.use($localStorage.language = language);
    };

    this.provide = function () {
      return $localStorage.language;
    };
  }

})();
