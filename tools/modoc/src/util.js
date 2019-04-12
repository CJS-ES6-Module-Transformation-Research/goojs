// jshint node:true
'use strict';

var isWin = /^win/.test(process.platform);

export var PATH_SEPARATOR = isWin ? '\\' : '/';

var regex = isWin ? /\\?(\w+)\.js$/ : /\/?(\w+)\.js$/;

export var getFileName = function (file) {
	return file.match(regex)[1];
};

export var stringUntil = function (string, until) {
	return string.slice(0, string.indexOf(until));
};

export var stringFrom = function (string, from) {
	return string.slice(string.indexOf(from) + 1);
};

export var pipe = function (f, g) {
	return function () {
		return g(f.apply(null, arguments));
	};
};

// underscore doesn't have it
// NB! this is not a general-purpose deepClone
export var deepClone = function (obj) {
	if (obj instanceof Array) {
		return obj.map(deepClone);
	} else if (typeof obj === 'object') {
		var clone = {};
		Object.keys(obj).forEach(function (key) {
			clone[key] = deepClone(obj[key]);
		});
		return clone;
	} else {
		return obj;
	}
};

export var upperFirst = function (string) {
	return string[0].toUpperCase() + string.slice(1);
};

export var lowerFirst = function (string) {
	return string[0].toLowerCase() + string.slice(1);
};

export var tagToIdentifier = function (tagName) {
	return lowerFirst(tagName.slice(1).split('-').map(upperFirst).join(''));
};

export var createIdGenerator = function (prefix) {
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