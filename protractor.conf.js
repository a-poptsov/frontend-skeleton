'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
var ScreenShotReporter = require('protractor-screenshot-reporter');
var conf = require('./gulp/conf');
var path = require('path');
var dateFormat = require('dateformat');



// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--lang=EN']
    },
    'phantomjs.binary.path': require('phantomjs').path
  },

  getPageTimeout: 30000,

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: function () {
    browser.driver.manage().window().setSize(1280, 1024);
    var date = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    jasmine.getEnv().addReporter(new ScreenShotReporter({
      baseDirectory: conf.paths.tmp + '/protractor',
      takeScreenShotsOnlyForFailedSpecs: true,
      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
        return path.join(date, descriptions.reverse().join(' ') + '.' + capabilities.caps_.browserName);
      }
    }));
  }
};
