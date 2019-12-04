// jshint node:true
'use strict';

var isWin = /^win/.test(process.platform);

var PATH_SEPARATOR = isWin ? '\\' : '/';

let exported_PATH_SEPARATOR = PATH_SEPARATOR;

var regex = isWin ? /\\?(\w+)\.js$/ : /\/?(\w+)\.js$/;

var getFileName = function (file) {
	return file.match(regex)[1];
};

let exported_getFileName = getFileName;

var stringUntil = function (string, until) {
	return string.slice(0, string.indexOf(until));
};

let exported_stringUntil = stringUntil;

var stringFrom = function (string, from) {
	return string.slice(string.indexOf(from) + 1);
};

let exported_stringFrom = stringFrom;

var pipe = function (f, g) {
	return function () {
		return g(f.apply(null, arguments));
	};
};

let exported_pipe = pipe;
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

let exported_deepClone = deepClone;

var upperFirst = function (string) {
	return string[0].toUpperCase() + string.slice(1);
};

let exported_upperFirst = upperFirst;

var lowerFirst = function (string) {
	return string[0].toLowerCase() + string.slice(1);
};

let exported_lowerFirst = lowerFirst;

var tagToIdentifier = function (tagName) {
	return lowerFirst(tagName.slice(1).split('-').map(upperFirst).join(''));
};

let exported_tagToIdentifier = tagToIdentifier;

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

let exported_createIdGenerator = createIdGenerator;
export { exported_PATH_SEPARATOR as PATH_SEPARATOR };
export { exported_getFileName as getFileName };
export { exported_stringUntil as stringUntil };
export { exported_stringFrom as stringFrom };
export { exported_pipe as pipe };
export { exported_deepClone as deepClone };
export { exported_upperFirst as upperFirst };
export { exported_lowerFirst as lowerFirst };
export { exported_tagToIdentifier as tagToIdentifier };
export { exported_createIdGenerator as createIdGenerator };