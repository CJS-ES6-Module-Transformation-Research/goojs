import path from "path";
import program from "commander";
import { ScreenShooter as ScreenShooter_ScreenShooterjs } from "./ScreenShooter";
import child_process_child_process from "child_process";
import { filterList as filterList_filterListjs } from "./filterList";
var toc = require(__dirname + '/../../tools/table-of-contents');
var exec = child_process_child_process.exec;

program
	.version('0.0.0')
	.option('-u, --url [url]',				'URL of the goojs root folder')
	.option('-w, --wait [milliseconds]',	'Number of milliseconds to wait for the test to run before taking a screenshot.')
	.parse(process.argv);

program.url = program.url || process.env.GOOJS_ROOT_URL || 'http://localhost:8003';

var gooRootPath = path.join(__dirname, '..', '..');

console.log('Using test URL: ' + program.url);

var shooter = new ScreenShooter_ScreenShooterjs({
	script : ScreenShooter_ScreenShooterjs.removeGooStuffScript
});

if (typeof program.wait !== 'undefined') {
	shooter.wait = program.wait;
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
	if (filterList_filterListjs.some(function (term) { return file.indexOf(term) !== -1; })) {
		continue;
	}

	var pngPath = path.join(__dirname, 'screenshots', path.relative(path.join(gooRootPath, 'visual-test'), file)).replace(/\.html$/, '.png');

	var url = program.url + '/' + path.relative(gooRootPath, file) + '?deterministic=1';

	urlToPathMap[url] = pngPath;
}

exec('rm -rf ' + __dirname + '/screenshots',function (err) {
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
