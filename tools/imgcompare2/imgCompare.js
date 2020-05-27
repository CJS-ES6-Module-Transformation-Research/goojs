import ext_child_process_exec from "child_process";
var exec = ext_child_process_exec.exec;

var regex = /\((\d+(?:\.\d+)?)\)/;

function extractNumber(string) {
	if (!regex.test(string)) {
		console.error('Imagemagick\'s compare method failed');
		console.error(string);
		return Infinity;
	}

	var match = string.match(regex);
	return +match[1];
}

function compare(actual, expected, callback) {
	var cmd = 'compare -metric RMSE ' + actual + ' ' + expected + ' ' + actual + '-diff.png';

	console.log(cmd);

	exec(cmd, function (error, stdout, stderr) {

		console.log(stderr)

		callback(extractNumber(stderr));
	});
}

var compare;

compare = compare;