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

mod_getFileName = getFileName;
mod_stringUntil = stringUntil;
mod_stringFrom = stringFrom;
mod_pipe = pipe;
mod_deepClone = deepClone;

mod_tagToIdentifier = tagToIdentifier;
mod_upperFirst = upperFirst;
mod_lowerFirst = lowerFirst;

mod_createIdGenerator = createIdGenerator;

mod_PATH_SEPARATOR = PATH_SEPARATOR;
var mod_getFileName;
export { mod_getFileName as getFileName };
var mod_stringUntil;
export { mod_stringUntil as stringUntil };
var mod_stringFrom;
export { mod_stringFrom as stringFrom };
var mod_pipe;
export { mod_pipe as pipe };
var mod_deepClone;
export { mod_deepClone as deepClone };
var mod_tagToIdentifier;
export { mod_tagToIdentifier as tagToIdentifier };
var mod_upperFirst;
export { mod_upperFirst as upperFirst };
var mod_lowerFirst;
export { mod_lowerFirst as lowerFirst };
var mod_createIdGenerator;
export { mod_createIdGenerator as createIdGenerator };
var mod_PATH_SEPARATOR;
export { mod_PATH_SEPARATOR as PATH_SEPARATOR };