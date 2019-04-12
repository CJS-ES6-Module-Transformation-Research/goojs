"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.run = exports.getFilesSync = exports.getFiles = undefined;

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

// jshint node:true
'use strict';

var makeTree = function makeTree(files) {
	var tree = {};

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var parts = file.split('/');
		var branch = tree;
		for (var j = 0; j < parts.length; j++) {
			var part = parts[j];
			if (j === parts.length - 1) {
				branch[part] = file;
				break;
			}
			if (!branch[part]) {
				branch[part] = {};
			}
			branch = branch[part];
		}
	}

	return tree;
};

var printTree = function printTree(tree) {
	var ret = '<ul>\n';

	for (var branch in tree) {
		var link = tree[branch];
		ret += '<li>';
		if (typeof link === 'string') {
			ret += '<a href="' + link + '">' + branch + '</a>';
		} else {
			ret += branch;
			ret += printTree(link);
		}
		ret += '</li>\n';
	}

	ret += '</ul>\n';

	return ret;
};

var getFiles = exports.getFiles = function getFiles(path, callback) {
	return (0, _glob2.default)(path + '/**/!(index).html', function (err, files) {
		return callback(err, files);
	});
};;

var getFilesSync = exports.getFilesSync = function getFilesSync(path) {
	return _glob2.default.sync(path + '/**/!(index).html');
};;

var run = exports.run = function run(rootPath, title) {
	var files = exports.getFilesSync(rootPath);
	files = files.filter(function (fileName) {
		return fileName.indexOf('carousel') === -1;
	});

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		files[i] = _path2.default.relative(rootPath, file).replace(/\\/g, '/');
	}

	var tree = makeTree(files);

	var content = '';

	content += ['<html>', '<head>', '<title>' + title + '</title>', '<link rel="stylesheet" type="text/css" href="style.css">', '</head>', '<body>', '<article class="container">', '<h1>Contents</h1>'].join('\n');

	content += printTree(tree);

	content += ['</article>', '</body>', '</html>'].join('\n');

	_fs2.default.writeFileSync(_path2.default.resolve(rootPath + '/index.html'), content);
};;
