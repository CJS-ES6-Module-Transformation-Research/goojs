var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _karmaCoverage = require("karma-coverage");

var _karmaCoverage2 = _interopRequireDefault(_karmaCoverage);

var _karmaJasmine = require("karma-jasmine");

var _karmaJasmine2 = _interopRequireDefault(_karmaJasmine);

var _karmaChromeLauncher = require("karma-chrome-launcher");

var _karmaChromeLauncher2 = _interopRequireDefault(_karmaChromeLauncher);

var _karmaWebpack = require("karma-webpack");

var _karmaWebpack2 = _interopRequireDefault(_karmaWebpack);

var _karmaWebpackProvidePluginSettings = require("./karmaWebpackProvidePluginSettings");

var karmaWebpackProvidePluginSettings = _interopRequireWildcard(_karmaWebpackProvidePluginSettings);

function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
				return obj;
		} else {
				var newObj = {};if (obj != null) {
						for (var key in obj) {
								if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
						}
				}newObj.default = obj;return newObj;
		}
}

function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = function (config) {
		config.set({

				// base path, that will be used to resolve files and exclude
				basePath: '../../',

				plugins: [_karmaCoverage2.default, _karmaJasmine2.default, _karmaChromeLauncher2.default, _karmaWebpack2.default],

				frameworks: ['jasmine'],

				files: ['lib/cannon/cannon.min.js', { pattern: 'test/unit/**/*.mp4', included: false }, { pattern: 'test/unit/**/*.png', included: false }, { pattern: 'test/unit/**/*-test.js' }],

				// list of files to exclude
				exclude: [],

				// test results reporter to use
				// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
				reporters: ['dots', 'coverage'],

				// web server port
				port: 9876,

				// enable / disable colors in the output (reporters and logs)
				colors: true,

				// level of logging
				// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
				// logLevel: config.LOG_INFO,


				// enable / disable watching file and executing tests whenever any file changes
				autoWatch: true,

				// Start these browsers, currently available:
				// - Chrome
				// - ChromeCanary
				// - Firefox
				// - Opera (has to be installed with `npm install karma-opera-launcher`)
				// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
				// - PhantomJS
				// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
				browsers: ['Chrome'],

				// If browser does not capture in given timeout [ms], kill it
				captureTimeout: 60000,

				// Continuous Integration mode
				// if true, it capture browsers, run tests and exit
				singleRun: false,

				preprocessors: {
						// source files, that you wanna generate coverage for
						// do not include tests or libraries
						// (these files will be instrumented by Istanbul)
						'src/**/*.js': ['coverage'],
						'test/unit/**/*-test.js': ['webpack']
				},

				// optionally, configure the reporter
				coverageReporter: {
						type: 'html',
						dir: 'coverage/'
				},

				webpackMiddleware: {
						// webpack-dev-middleware configuration
						// i. e.
						noInfo: true
				},

				webpack: {
						resolve: {
								// Everything relative to repo root
								root: _path2.default.resolve(_path2.default.join(__dirname, '..', '..'))
						},
						plugins: [new _webpack2.default.ProvidePlugin(karmaWebpackProvidePluginSettings)]
				}
		});
};
