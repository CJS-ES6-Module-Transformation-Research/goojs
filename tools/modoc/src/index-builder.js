"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getIndex = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _util = require("./util");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

// jshint node:true
'use strict';

var HTML_SUFFIX = '-doc.html';

function getDifferentiatorIndex(strings) {
	var minLength = strings.reduce(function (prev, cur) {
		return Math.min(prev, cur.length);
	}, strings[0].length);

	for (var i = 0; i < minLength; i++) {
		for (var j = 0; j < strings.length; j++) {
			var string = strings[j];
			if (string[i] !== strings[0][i]) {
				return i;
			}
		}
	}
}

function getIndex(classes) {
	var files = _underscore2.default.pluck(classes, 'file').filter(Boolean);
	var differentiator = getDifferentiatorIndex(files);

	var groups = _underscore2.default.groupBy(files, function (file) {
		return file.substring(differentiator, file.lastIndexOf('/'));
	});

	Object.keys(classes).forEach(function (className) {
		var class_ = classes[className];
		if (class_.group) {
			if (!groups[class_.group]) {
				groups[class_.group] = [];
			}
			groups[class_.group].push({
				name: class_.constructor.name,
				requirePath: class_.requirePath,
				link: class_.constructor.name + HTML_SUFFIX
			});
		}
	});

	var ret = [{
		name: 'Classes',
		classes: []
	}];

	Object.keys(groups).forEach(function (name) {
		var group = groups[name];
		group.forEach(function (file) {
			if ((typeof file === "undefined" ? "undefined" : _typeof(file)) === 'object') {
				return file;
			}

			var fileName = (0, _util.getFileName)(file);
			var requirePath = file.substring(differentiator, file.length - 3);
			ret[0].classes.push({
				name: fileName,
				requirePath: requirePath,
				link: fileName + HTML_SUFFIX
			});
		});
	});

	ret[0].classes.sort(function (classA, classB) {
		return classA.name < classB.name ? -1 : classA.name > classB.name ? 1 : 0;
	});

	return ret;
}

var getIndex_getIndex;

exports.getIndex = getIndex_getIndex = getIndex;
exports.getIndex = getIndex_getIndex;