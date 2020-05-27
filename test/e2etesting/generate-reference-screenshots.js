"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _ScreenShooter = require("./ScreenShooter");

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _filterList = require("./filterList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toc = require(__dirname + '/../../tools/table-of-contents');
var exec = _child_process2.default.exec;

_commander2.default.version('0.0.0').option('-u, --url [url]', 'URL of the goojs root folder').option('-w, --wait [milliseconds]', 'Number of milliseconds to wait for the test to run before taking a screenshot.').parse(process.argv);

_commander2.default.url = _commander2.default.url || process.env.GOOJS_ROOT_URL || 'http://localhost:8003';

var gooRootPath = _path2.default.join(__dirname, '..', '..');

console.log('Using test URL: ' + _commander2.default.url);

var shooter = new _ScreenShooter.ScreenShooter({
	script: _ScreenShooter.ScreenShooter.removeGooStuffScript
});

if (typeof _commander2.default.wait !== 'undefined') {
	shooter.wait = _commander2.default.wait;
}

shooter.on('shoot', function (evt) {
	console.log('Took a screenshot!');
	console.log('    URL:  ' + evt.url);
	console.log('    Path: ' + evt.path + '\n');
});

// Get all visual test files
var files = toc.getFilesSync(__dirname + '/../../visual-test');

var urlToPathMap = {};
for (var i = 0; i < files.length; i++) {
	var file = files[i];
	if (_filterList.filterList.some(function (term) {
		return file.indexOf(term) !== -1;
	})) {
		continue;
	}

	var pngPath = _path2.default.join(__dirname, 'screenshots', _path2.default.relative(_path2.default.join(gooRootPath, 'visual-test'), file)).replace(/\.html$/, '.png');

	var url = _commander2.default.url + '/' + _path2.default.relative(gooRootPath, file) + '?deterministic=1';

	urlToPathMap[url] = pngPath;
}

exec('rm -rf ' + __dirname + '/screenshots', function (err) {
	if (err) {
		throw err;
	}
	shooter.takeScreenshots(urlToPathMap, function (err) {
		if (err) {
			throw err;
		}
		shooter.shutdown();
	});
});