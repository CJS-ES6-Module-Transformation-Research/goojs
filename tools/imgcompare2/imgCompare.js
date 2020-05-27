'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var exec = _child_process2.default.exec;

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

		console.log(stderr);

		callback(extractNumber(stderr));
	});
}

var compare;

compare = compare;