// jshint node:true
'use strict';

var isWin = /^win/.test(process.platform);

var PATH_SEPARATOR = isWin ? '\\' : '/';

let exported_PATH_SEPARATOR = PATH_SEPARATOR;

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

exported_PATH_SEPARATOR.getFileName = getFileName;
exported_PATH_SEPARATOR.stringUntil = stringUntil;
exported_PATH_SEPARATOR.stringFrom = stringFrom;
exported_PATH_SEPARATOR.pipe = pipe;
exported_PATH_SEPARATOR.deepClone = deepClone;

exported_PATH_SEPARATOR.tagToIdentifier = tagToIdentifier;
exported_PATH_SEPARATOR.upperFirst = upperFirst;
exported_PATH_SEPARATOR.lowerFirst = lowerFirst;

exported_PATH_SEPARATOR.createIdGenerator = createIdGenerator;

export { exported_PATH_SEPARATOR as PATH_SEPARATOR };