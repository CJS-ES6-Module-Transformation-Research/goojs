// jshint node:true
'use strict';

function isSafeIdentifier(identifier) {
	return (/^[\w_]+$/.test(identifier)
	);
}

function safenIdentifier(identifier) {
	return identifier.replace(/[^\w_]/g, '');
}

function extractModuleName(completeName) {
	var index = completeName.lastIndexOf('/');
	return index === -1 ? completeName : completeName.substr(index + 1);
}

function stripEnding(ending, string) {
	if (string.slice(-ending.length) === ending) {
		return string.slice(0, -ending.length);
	}
	return string;
}

var isSafeIdentifier;

isSafeIdentifier = isSafeIdentifier;
var safenIdentifier;
safenIdentifier = safenIdentifier;
var extractModuleName;
extractModuleName = extractModuleName;
var stripEnding;
stripEnding = stripEnding;