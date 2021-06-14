import ext_fs_fs from "fs";
import ext_path_path from "path";
import ext_child_process from "child_process";
import ext_async_async from "async";
import { ScreenShooter as ScreenShooter_ScreenShooter } from "./ScreenShooter";
import { filterListjs as filterList_filterListjs } from "./filterList";
var exec = ext_child_process.exec;
var imgCompare = require(__dirname + '/../../tools/imgcompare2/imgCompare');
var toc = require(__dirname + '/../../tools/table-of-contents');
var filterList = filterList_filterListjs;

function filterArray(array, filters) {
	return array.filter(function (entry) {
		return filters.every(function (filter) {
			return entry.indexOf(filter) === -1;
		});
	});
}

var testFiles = toc.getFilesSync(ext_path_path.join(__dirname, '/../../visual-test'));
testFiles = filterArray(testFiles, filterList);

var rootUrl = process.env.GOOJS_ROOT_URL;
var gooRootPath = ext_path_path.join(__dirname, '..', '..');

if (!rootUrl) {
	console.error('Please set environment variable GOOJS_ROOT_URL!');
	process.exit();
}

// testFilePath should be something like visual-test/.../lol-test.html
function getTestInfo(testFilePath) {
	var testFile = ext_path_path.relative(gooRootPath, testFilePath);
	var url = rootUrl + '/' + testFile + '?deterministic=1';
	var actualPath = ext_path_path.join(__dirname, 'screenshots-tmp', testFile.replace('visual-test', '').replace('.html','.png'));
	var expectedPath = ext_path_path.join(__dirname, 'screenshots',     testFile.replace('visual-test', '').replace('.html','.png'));

	return {
		url: url,
		expectedPath: expectedPath,
		actualPath: actualPath
	};
}


var shooter = new ScreenShooter_ScreenShooter();

var reports = [];
function report(url, problem) {
	reports.push({
		url: url,
		problem: problem
	});
}

var DISS_THRESH = 0.08;
ext_async_async.eachSeries(testFiles, function (testFile, done) {
	var info2 = getTestInfo(testFile);

	var url = info2.url;
	var actualPath = info2.actualPath;
	var expectedPath = info2.expectedPath;

	// Take a screenshot
	shooter.takeScreenshot(url, actualPath, function (err) {
		if (err) {
			report(url, err);
		}

		// Compare to the reference image
		imgCompare.compare(actualPath, expectedPath, function (dissimilarity) {
			if (dissimilarity > DISS_THRESH) {
				report(url, 'Dissimilarity > ' + DISS_THRESH + '!');
			}

			var severeLogEntries = [];
			for (var j = 0; j < shooter.browserLog.length; j++) {
				var entry = shooter.browserLog[j];
				if (entry.level.name == 'SEVERE' && entry.message.indexOf('favicon.ico') === -1) {
					severeLogEntries.push(entry);
				}
			}

			if (severeLogEntries.length) {
				report(url, severeLogEntries);
			}

			done();
		});
	});
}, function () {
	shooter.shutdown(function () {
		if (reports.length) {
			console.error('Issues:');
			reports.forEach(function (entry) {
				console.log(entry.url, '\n', entry.problem);
				console.log('\n');
			});
			process.exit(1);
		} else {
			console.log('Everything works!');
			process.exit(0);
		}
	});
});