"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScreenShooter = undefined;

var _seleniumWebdriver = require("selenium-webdriver");

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

'use strict';

var EventEmitter = _events2.default.EventEmitter;

function ScreenShooter(options) {
	options = options || {};

	var settings = this.settings = {
		wait: 100, // Milliseconds to wait if example is not done rendering
		width: 400, // This is sort of the smallest possible in Chrome
		height: 300
	};

	for (var key in options) {
		if (typeof settings[key] !== 'undefined') {
			settings[key] = options[key];
		}
	}

	// Init driver
	this.driver = new _seleniumWebdriver2.default.Builder().withCapabilities(_seleniumWebdriver2.default.Capabilities.chrome()).build();

	// Will update whenever needed.
	this.browserLog = [];
}

ScreenShooter.prototype = new EventEmitter();

ScreenShooter.prototype._storeImage = function (data, url, pngPath, callback) {

	var self = this;
	var driver = this.driver;
	data = data.replace(/^data:image\/\w+;base64,/, '');

	// Create out folder if it does not exist
	_mkdirp2.default.mkdirp(_path2.default.dirname(pngPath), function (err) {
		if (err) {
			return callback(err);
		}

		// Get the console log
		var logs = new _seleniumWebdriver2.default.WebDriver.Logs(driver);
		logs.get('browser').then(function (browserLog) {
			self.browserLog = browserLog;

			// Save screenshot
			_fs2.default.writeFileSync(pngPath, data, 'base64');

			self.emit('shoot', {
				url: url,
				path: pngPath,
				log: browserLog
			});

			callback();
		});
	});
};

ScreenShooter.prototype._getData = function (url, pngPath, callback) {
	var self = this;
	var driver = this.driver;

	driver.executeScript('return window.testLoaded;').then(function (testLoaded) {
		if (testLoaded) {
			driver.executeScript('return document.getElementById("goo").toDataURL();').then(function (data) {
				self._storeImage(data, url, pngPath, callback);
			}, function () {
				setTimeout(function () {
					self._getData(url, pngPath, callback);
				}, self.settings.wait);
			});
		} else {
			setTimeout(function () {
				self._getData(url, pngPath, callback);
			}, self.settings.wait);
		}
	});
};

// Take a screenshot on an url and store it to a file. Will emit a 'shoot' event
ScreenShooter.prototype.takeScreenshot = function (url, pngPath, callback) {
	var self = this;
	var driver = this.driver;

	// Point the browser to it
	driver.get(url).then(function () {
		self._getData(url, pngPath, callback);
	});
};

// Take many screenshots. First arg is a map from url to png path.
ScreenShooter.prototype.takeScreenshots = function (urlToPathMap, callback) {
	var self = this;

	// Get all urls
	var urls = [];
	for (var url in urlToPathMap) {
		urls.push(url);
	}

	// Loop asynchronously over all files
	_async2.default.eachSeries(urls, function (url, done) {
		// Take screenshot
		self.takeScreenshot(url, urlToPathMap[url], function () {
			done();
		});
	}, function () {
		if (callback) {
			callback();
		}
	});
};

// Shut down the shooter.
ScreenShooter.prototype.shutdown = function (callback) {
	// Shut down
	this.driver.close().then(function () {
		if (callback) {
			callback();
		}
	});
};

var exported_ScreenShooter = ScreenShooter;

/**
 * @class ScreenShooter
 * @param {object} [options]
 * @param {number} [options.wait]   How long to wait before taking each screenshot.
 * @param {number} [options.width]	Width of the browser window
 * @param {number} [options.height]	Height of the window
 */
exports.ScreenShooter = exported_ScreenShooter;
