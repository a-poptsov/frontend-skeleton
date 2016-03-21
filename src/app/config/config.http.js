(function () {
  'use strict';

  angular
    .module('example')
    .config(requestsErrorHandlerConfig)
    .run(httpDecoratorTriggerConfig);


  /** @ngInject */
  function requestsErrorHandlerConfig($httpProvider, $provide) {
    $httpProvider.interceptors.push(function ($q, $injector) {
      return {
        responseError: function (rejection) {
          var config = rejection.config;
          if (!config || (!config.customErrorHandling && !config.requestFromResolve) && !$injector.get('CustomHandledUrls').hasCustomHandler(config.url)) {
            $injector.get('growl').error('public.error.error_on_page', {ttl: -1});
          }
          return $q.reject(rejection);
        }
      };
    });

    $provide.decorator('$http', function ($delegate, StateStatus) {
      function makeDelegateApplyHandler(attr) {
        return function () {
          $delegate[attr].apply($delegate, arguments);
        };
      }

      function addRequestFromResolveConfig(config, isStateChanging) {
        var result = config || {};
        result.requestFromResolve = isStateChanging;
        return result;
      }

      function decorateRegularCall(method) {
        return function (url, config) {
          return $delegate[method](url, addRequestFromResolveConfig(config, StateStatus.isStateChanging()));
        };
      }

      function decorateDataCall(method) {
        return function (url, data, config) {
          return $delegate[method](url, data, addRequestFromResolveConfig(config, StateStatus.isStateChanging()));
        };
      }

      function copyNotOverriddenAttributes(newHttp) {
        for (var attr in $delegate) {
          if (!newHttp.hasOwnProperty(attr)) {
            if (typeof($delegate[attr]) === 'function') {
              newHttp[attr] = makeDelegateApplyHandler(attr);
            } else {
              newHttp[attr] = $delegate[attr];
            }
          }
        }
      }

      var newHttp = function (config) {
        return $delegate(addRequestFromResolveConfig(config, StateStatus.isStateChanging()));
      };
      newHttp.get = decorateRegularCall('get');
      newHttp.delete = decorateRegularCall('delete');
      newHttp.head = decorateRegularCall('head');
      newHttp.jsonp = decorateRegularCall('jsonp');
      newHttp.post = decorateDataCall('post');
      newHttp.put = decorateDataCall('put');
      copyNotOverriddenAttributes(newHttp);
      return newHttp;
    });
  }

  function httpDecoratorTriggerConfig($rootScope, StateStatus) {
    $rootScope.$on('$stateChangeStart', function () {
      StateStatus.setStateChanging(true);
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      StateStatus.setStateChanging(false);
    });
    $rootScope.$on('$stateNotFound', function () {
      StateStatus.setStateChanging(false);
    });
    $rootScope.$on('$stateChangeError', function () {
      StateStatus.setStateChanging(false);
    });
  }
})();
