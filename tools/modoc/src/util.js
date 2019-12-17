// jshint node:true
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var isWin = /^win/.test(process.platform);

var PATH_SEPARATOR = isWin ? '\\' : '/';

var exported_PATH_SEPARATOR = PATH_SEPARATOR;

var regex = isWin ? /\\?(\w+)\.js$/ : /\/?(\w+)\.js$/;

var getFileName = function getFileName(file) {
	return file.match(regex)[1];
};

var exported_getFileName = getFileName;

var stringUntil = function stringUntil(string, until) {
	return string.slice(0, string.indexOf(until));
};

var exported_stringUntil = stringUntil;

var stringFrom = function stringFrom(string, from) {
	return string.slice(string.indexOf(from) + 1);
};

var exported_stringFrom = stringFrom;

var pipe = function pipe(f, g) {
	return function () {
		return g(f.apply(null, arguments));
	};
};

var exported_pipe = pipe;
var deepClone = function deepClone(obj) {
	if (obj instanceof Array) {
		return obj.map(deepClone);
	} else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
		var clone = {};
		Object.keys(obj).forEach(function (key) {
			clone[key] = deepClone(obj[key]);
		});
		return clone;
	} else {
		return obj;
	}
};

var exported_deepClone = deepClone;

var upperFirst = function upperFirst(string) {
	return string[0].toUpperCase() + string.slice(1);
};

var exported_upperFirst = upperFirst;

var lowerFirst = function lowerFirst(string) {
	return string[0].toLowerCase() + string.slice(1);
};

var exported_lowerFirst = lowerFirst;

var tagToIdentifier = function tagToIdentifier(tagName) {
	return lowerFirst(tagName.slice(1).split('-').map(upperFirst).join(''));
};

var exported_tagToIdentifier = tagToIdentifier;

var createIdGenerator = function createIdGenerator(prefix) {
	var counter = 0;
	return function (override) {
		if (arguments.length) {
			return prefix + override;
		} else {
			counter++;
			return prefix + (counter - 1);
		}
	};
};

var exported_createIdGenerator = createIdGenerator;
exports.PATH_SEPARATOR = exported_PATH_SEPARATOR;
exports.getFileName = exported_getFileName;
exports.stringUntil = exported_stringUntil;
exports.stringFrom = exported_stringFrom;
exports.pipe = exported_pipe;
exports.deepClone = exported_deepClone;
exports.upperFirst = exported_upperFirst;
exports.lowerFirst = exported_lowerFirst;
exports.tagToIdentifier = exported_tagToIdentifier;
exports.createIdGenerator = exported_createIdGenerator;
