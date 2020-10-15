// jshint node:true
'use strict';

var isWin = /^win/.test(process.platform);

var PATH_SEPARATOR = isWin ? '\\' : '/';

var regex = isWin ? /\\?(\w+)\.js$/ : /\/?(\w+)\.js$/;

var getFileName = function (file) {
	return file.match(regex)[1];
};

var stringUntil = function (string, until) {
	return string.slice(0, string.indexOf(until));
};

var stringFrom = function (string, from) {
	return string.slice(string.indexOf(from) + 1);
};

var pipe = function (f, g) {
	return function () {
		return g(f.apply(null, arguments));
	};
};

// underscore doesn't have it
// NB! this is not a general-purpose deepClone
var deepClone = function (obj) {
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

var upperFirst = function (string) {
	return string[0].toUpperCase() + string.slice(1);
};

var lowerFirst = function (string) {
	return string[0].toLowerCase() + string.slice(1);
};

var tagToIdentifier = function (tagName) {
	return lowerFirst(tagName.slice(1).split('-').map(upperFirst).join(''));
};

var createIdGenerator = function (prefix) {
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

getFileName_getFileName = getFileName;
stringUntil_stringUntil = stringUntil;
stringFrom_stringFrom = stringFrom;
var pipe;
pipe = pipe;
var deepClone;
deepClone = deepClone;

tagToIdentifier_tagToIdentifier = tagToIdentifier;
var upperFirst;
upperFirst = upperFirst;
var lowerFirst;
lowerFirst = lowerFirst;

createIdGenerator_createIdGenerator = createIdGenerator;

PATH_SEPARATOR_PATH_SEPARATOR = PATH_SEPARATOR;
var PATH_SEPARATOR_PATH_SEPARATOR;
export { PATH_SEPARATOR_PATH_SEPARATOR as PATH_SEPARATOR };
var getFileName_getFileName;
export { getFileName_getFileName as getFileName };
var stringUntil_stringUntil;
export { stringUntil_stringUntil as stringUntil };
var stringFrom_stringFrom;
export { stringFrom_stringFrom as stringFrom };
var tagToIdentifier_tagToIdentifier;
export { tagToIdentifier_tagToIdentifier as tagToIdentifier };
var createIdGenerator_createIdGenerator;
export { createIdGenerator_createIdGenerator as createIdGenerator };