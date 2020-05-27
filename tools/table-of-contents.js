import ext_glob_glob from "glob";
import ext_path_path from "path";
import ext_fs_fs from "fs";
// jshint node:true
'use strict';

var makeTree = function (files) {
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

var printTree = function (tree) {
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

var getFiles;

getFiles = function (ext_path_path, callback) {
	return ext_glob_glob(ext_path_path + '/**/!(index).html', function (err, files) {
		return callback(err, files);
	});
};

var getFilesSync;

getFilesSync = function (ext_path_path) {
	return ext_glob_glob.sync(ext_path_path + '/**/!(index).html');
};

var run;

run = function (rootPath, title) {
	var files = getFilesSync(rootPath);
	files = files.filter(function (fileName) {
		return fileName.indexOf('carousel') === -1;
	});

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		files[i] = ext_path_path.relative(rootPath, file).replace(/\\/g, '/');
	}

	var tree = makeTree(files);

	var content = '';

	content += [
		'<html>',
		'<head>',
		'<title>' + title + '</title>',
		'<link rel="stylesheet" type="text/css" href="style.css">',
		'</head>',
		'<body>',
		'<article class="container">',
		'<h1>Contents</h1>'
	].join('\n');

	content += printTree(tree);

	content += [
		'</article>',
		'</body>',
		'</html>'
	].join('\n');

	ext_fs_fs.writeFileSync(ext_path_path.resolve(rootPath + '/index.html'), content);
};
