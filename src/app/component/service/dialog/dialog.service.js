(function () {
  'use strict';

  _.each(['alert', 'confirm', 'confirmWithComment'], function (type) {
    angular
      .module('example')
      .factory(_.capitalize(type), ['$modal', function ($modal) {
        return function (code, params) {
          return $modal.open({
            templateUrl: 'app/component/service/dialog/{type}.html'.replace('{type}', _.kebabCase(type)),
            controller: ['$scope', function ($scope) {
              _.extend($scope, {code: code, params: params});
            }]
          });
        };
      }]);
  });

})();
