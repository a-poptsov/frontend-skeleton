(function () {
  'use strict';

  angular
    .module('example')
    .service('CustomHandledUrls', CustomHandledUrlsService);

  /** @ngInject */
  function CustomHandledUrlsService() {
    var urls = {};

    this.enableCustomHandlerFor = function (url) {
      urls[url] = (urls[url] || 0) + 1;
    };

    this.disableCustomHandlerFor = function (url) {
      urls[url] = (urls[url] || 1) - 1;
    };

    this.hasCustomHandler = function (url) {
      return !!urls[url];
    };
  }
})();
