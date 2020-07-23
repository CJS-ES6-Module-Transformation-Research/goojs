import ext_path_path from "path";
import ext_webpack_webpack from "webpack";
import ext_karmacoverage_karmacoverage from "karma-coverage";
import ext_karmajasmine_karmajasmine from "karma-jasmine";
import ext_karmachromelauncher_karmachromelauncher from "karma-chrome-launcher";
import ext_karmawebpack_karmawebpack from "karma-webpack";
import * as karmaWebpackProvidePluginSettings_karmaWebpackProvidePluginSettingsjs from "./karmaWebpackProvidePluginSettings";
var encapsulated_anonymus;

encapsulated_anonymus = function (config) {
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
			ext_karmacoverage_karmacoverage,
			ext_karmajasmine_karmajasmine,
			ext_karmachromelauncher_karmachromelauncher,
			ext_karmawebpack_karmawebpack
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
				root: ext_path_path.resolve(ext_path_path.join(__dirname, '..', '..'))
			},

			node: {
				fs: 'empty'
			},

			// Instrument code that isn't test or vendor code.
			module: {
				loaders: [{
					test: /\.js?$/,
					include: ext_path_path.join(__dirname, 'src'),
					loader: 'babel?stage=0'
				}],
				postLoaders: [{
					test: /\.js$/,
					exclude: /(test|node_modules)\//,
					loader: 'istanbul-instrumenter'
				}]
			},

			plugins: [
				new ext_webpack_webpack.ProvidePlugin(karmaWebpackProvidePluginSettings_karmaWebpackProvidePluginSettingsjs)
			]

		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};