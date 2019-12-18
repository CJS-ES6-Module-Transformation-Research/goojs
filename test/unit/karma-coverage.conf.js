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
		browsers: ['Chrome'],
		captureTimeout: 60000,
		browserDisconnectTimeout: 60000,
		browserNoActivityTimeout: 60000,

		basePath: '../../',

		files: ['lib/cannon/cannon.min.js', { pattern: 'test/unit/**/*.mp4', included: false }, { pattern: 'test/unit/**/*.png', included: false }, 'test/unit/**/*-test.js'],

		frameworks: ['jasmine'],

		plugins: [_karmaCoverage2.default, _karmaJasmine2.default, _karmaChromeLauncher2.default, _karmaWebpack2.default],

		preprocessors: {
			'test/unit/**/*-test.js': ['webpack']
		},

		reporters: ['dots', 'coverage'],

		coverageReporter: {
			reporters: [{
				type: 'text-summary'
			}, {
				type: 'html',
				dir: 'coverage'
			}]
		},

		singleRun: true,

		webpack: {
			resolve: {
				// Everything relative to repo root
				root: _path2.default.resolve(_path2.default.join(__dirname, '..', '..'))
			},

			node: {
				fs: 'empty'
			},

			// Instrument code that isn't test or vendor code.
			module: {
				loaders: [{
					test: /\.js?$/,
					include: _path2.default.join(__dirname, 'src'),
					loader: 'babel?stage=0'
				}],
				postLoaders: [{
					test: /\.js$/,
					exclude: /(test|node_modules)\//,
					loader: 'istanbul-instrumenter'
				}]
			},

			plugins: [new _webpack2.default.ProvidePlugin(karmaWebpackProvidePluginSettings)]

		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};
