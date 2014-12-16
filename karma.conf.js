module.exports = function(config) {
    config.set({

        basePath : './',

        files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'lib/jp-caricksel.js',
            'lib/jp-caricksel_test.js'
        ],

        preprocessors: {
            '**/lib/*.js': 'coverage'
        },

        logLevel : config.LOG_INFO,

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        reporters: [
            'progress',
            'coverage'
        ],

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    });
};
