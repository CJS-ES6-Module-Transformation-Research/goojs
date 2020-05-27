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

var regex = isWin ? /\\?(\w+)\.js$/ : /\/?(\w+)\.js$/;

var getFileName = function getFileName(file) {
	return file.match(regex)[1];
};

var stringUntil = function stringUntil(string, until) {
	return string.slice(0, string.indexOf(until));
};

var stringFrom = function stringFrom(string, from) {
	return string.slice(string.indexOf(from) + 1);
};

var pipe = function pipe(f, g) {
	return function () {
		return g(f.apply(null, arguments));
	};
};

// underscore doesn't have it
// NB! this is not a general-purpose deepClone
var _deepClone = function deepClone(obj) {
	if (obj instanceof Array) {
		return obj.map(_deepClone);
	} else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
		var clone = {};
		Object.keys(obj).forEach(function (key) {
			clone[key] = _deepClone(obj[key]);
		});
		return clone;
	} else {
		return obj;
	}
};

var upperFirst = function upperFirst(string) {
	return string[0].toUpperCase() + string.slice(1);
};

var lowerFirst = function lowerFirst(string) {
	return string[0].toLowerCase() + string.slice(1);
};

var tagToIdentifier = function tagToIdentifier(tagName) {
	return lowerFirst(tagName.slice(1).split('-').map(upperFirst).join(''));
};

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

var getFileName_getFileName;

exports.getFileName = getFileName_getFileName = getFileName;
var stringUntil_stringUntil;
exports.stringUntil = stringUntil_stringUntil = stringUntil;
var stringFrom_stringFrom;
exports.stringFrom = stringFrom_stringFrom = stringFrom;
var pipe;
pipe = pipe;
var _deepClone;
_deepClone = _deepClone;

var tagToIdentifier_tagToIdentifier;

exports.tagToIdentifier = tagToIdentifier_tagToIdentifier = tagToIdentifier;
var upperFirst;
upperFirst = upperFirst;
var lowerFirst;
lowerFirst = lowerFirst;

var createIdGenerator_createIdGenerator;

exports.createIdGenerator = createIdGenerator_createIdGenerator = createIdGenerator;

var PATH_SEPARATOR_PATH_SEPARATOR;

exports.PATH_SEPARATOR = PATH_SEPARATOR_PATH_SEPARATOR = PATH_SEPARATOR;
exports.PATH_SEPARATOR = PATH_SEPARATOR_PATH_SEPARATOR;
exports.getFileName = getFileName_getFileName;
exports.stringUntil = stringUntil_stringUntil;
exports.stringFrom = stringFrom_stringFrom;
exports.tagToIdentifier = tagToIdentifier_tagToIdentifier;
exports.createIdGenerator = createIdGenerator_createIdGenerator;