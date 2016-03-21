(function() {
  'use strict';

  angular
    .module('example')
    .config(configTranslate)
    .run(defaultLanguageConfig);

  /** @ngInject */
  function configTranslate($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({prefix: 'l10n/', suffix: '.json'})
      .registerAvailableLanguageKeys(['ru', 'en'])
      .determinePreferredLanguage()
      .fallbackLanguage('ru')
      .useMissingTranslationHandlerLog()
      .useMessageFormatInterpolation()
      .useSanitizeValueStrategy('escape');
  }

  /** @ngInject */
  function defaultLanguageConfig(Language) { // eslint-disable-line no-unused-vars
    //need to resolve Language service
  }

})();
