import path from "path";
import webpack from "webpack";
import karmacoverage from "karma-coverage";
import karmajasmine from "karma-jasmine";
import karmachromelauncher from "karma-chrome-launcher";
import karmawebpack from "karma-webpack";
import * as karmaWebpackProvidePluginSettings from "./karmaWebpackProvidePluginSettings";

module.exports = function (config) {
	config.set({
		browsers: ['Chrome'],
		captureTimeout: 60000,
		browserDisconnectTimeout: 60000,
		browserNoActivityTimeout: 60000,

		basePath: '../../',

		files: [
			'lib/cannon/cannon.min.js',
			{ pattern: 'test/unit/**/*.mp4', included: false },
			{ pattern: 'test/unit/**/*.png', included: false },
			'test/unit/**/*-test.js'
		],

		frameworks: ['jasmine'],

		plugins: [
			karmacoverage,
			karmajasmine,
			karmachromelauncher,
			karmawebpack
		],

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
				root: path.resolve(path.join(__dirname, '..', '..'))
			},

			node: {
				fs: 'empty'
			},

			// Instrument code that isn't test or vendor code.
			module: {
				loaders: [{
					test: /\.js?$/,
					include: path.join(__dirname, 'src'),
					loader: 'babel?stage=0'
				}],
				postLoaders: [{
					test: /\.js$/,
					exclude: /(test|node_modules)\//,
					loader: 'istanbul-instrumenter'
				}]
			},

			plugins: [
				new webpack.ProvidePlugin(karmaWebpackProvidePluginSettings)
			]

		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};