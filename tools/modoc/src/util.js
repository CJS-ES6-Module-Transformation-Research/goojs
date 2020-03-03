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

exported_PATH_SEPARATOR.getFileName = getFileName;
exported_PATH_SEPARATOR.stringUntil = stringUntil;
exported_PATH_SEPARATOR.stringFrom = stringFrom;
exported_PATH_SEPARATOR.pipe = pipe;
exported_PATH_SEPARATOR.deepClone = deepClone;

exported_PATH_SEPARATOR.tagToIdentifier = tagToIdentifier;
exported_PATH_SEPARATOR.upperFirst = upperFirst;
exported_PATH_SEPARATOR.lowerFirst = lowerFirst;

exported_PATH_SEPARATOR.createIdGenerator = createIdGenerator;

exports.PATH_SEPARATOR = exported_PATH_SEPARATOR;
