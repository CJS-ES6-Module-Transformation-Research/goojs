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

var getFileName_getFileName;

getFileName_getFileName = getFileName;
var stringUntil_stringUntil;
stringUntil_stringUntil = stringUntil;
var stringFrom_stringFrom;
stringFrom_stringFrom = stringFrom;
var pipe;
pipe = pipe;
var deepClone;
deepClone = deepClone;

var tagToIdentifier_tagToIdentifier;

tagToIdentifier_tagToIdentifier = tagToIdentifier;
var upperFirst;
upperFirst = upperFirst;
var lowerFirst;
lowerFirst = lowerFirst;

var createIdGenerator_createIdGenerator;

createIdGenerator_createIdGenerator = createIdGenerator;

var PATH_SEPARATOR_PATH_SEPARATOR;

PATH_SEPARATOR_PATH_SEPARATOR = PATH_SEPARATOR;
export { PATH_SEPARATOR_PATH_SEPARATOR as PATH_SEPARATOR };
export { getFileName_getFileName as getFileName };
export { stringUntil_stringUntil as stringUntil };
export { stringFrom_stringFrom as stringFrom };
export { tagToIdentifier_tagToIdentifier as tagToIdentifier };
export { createIdGenerator_createIdGenerator as createIdGenerator };