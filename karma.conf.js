// Karma configuration
// Generated on Thu Aug 20 2015 14:36:02 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'http://maps.googleapis.com/maps/api/js?sensor=false&language=en',
      './app/js/test/main.js',
      { pattern: './bower_components/jquery/dist/jquery.min.js', included: false },
      { pattern: './bower_components/underscore/underscore-min.js', included: false },
      { pattern: './bower_components/backbone/backbone-min.js', included: false },
      { pattern: './bower_components/requirejs/require.js', included: false },
      { pattern: './bower_components/text/text.js', included: false },
      { pattern: './app/html/**/*.html', included: false, serve: true },
      { pattern: './app/js/src/**/*.js', included: false },
      { pattern: './app/js/test/**/*Spec.js', included: false }
    ],


    // list of files to exclude
    exclude: [
      './app/js/src/main.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
