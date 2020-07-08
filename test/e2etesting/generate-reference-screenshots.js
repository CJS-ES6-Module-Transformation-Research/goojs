import ext_path_path from "path";
import ext_commander_program from "commander";
import { ScreenShooter as ScreenShooter_ScreenShooterjs } from "./ScreenShooter";
import ext_child_process_child_process from "child_process";
import { filterList as filterList_filterList } from "./filterList";
var toc = require(__dirname + '/../../tools/table-of-contents');
var exec = ext_child_process_child_process.exec;
var filterList = filterList_filterList.filterList;

ext_commander_program
	.version('0.0.0')
	.option('-u, --url [url]',				'URL of the goojs root folder')
	.option('-w, --wait [milliseconds]',	'Number of milliseconds to wait for the test to run before taking a screenshot.')
	.parse(process.argv);

ext_commander_program.url = ext_commander_program.url || process.env.GOOJS_ROOT_URL || 'http://localhost:8003';

var gooRootPath = ext_path_path.join(__dirname, '..', '..');

console.log('Using test URL: ' + ext_commander_program.url);

var shooter = new ScreenShooter_ScreenShooterjs({
	script : ScreenShooter_ScreenShooterjs.removeGooStuffScript
});

if (typeof ext_commander_program.wait !== 'undefined') {
	shooter.wait = ext_commander_program.wait;
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
	if (filterList.some(function (term) { return file.indexOf(term) !== -1; })) {
		continue;
	}

	var pngPath = ext_path_path.join(__dirname, 'screenshots', ext_path_path.relative(ext_path_path.join(gooRootPath, 'visual-test'), file)).replace(/\.html$/, '.png');

	var url = ext_commander_program.url + '/' + ext_path_path.relative(gooRootPath, file) + '?deterministic=1';

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
