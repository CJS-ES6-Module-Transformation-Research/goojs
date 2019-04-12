// jshint node:true
'use strict';

export function isSafeIdentifier(identifier) {
	return /^[\w_]+$/.test(identifier);
}

export function safenIdentifier(identifier) {
	return identifier.replace(/[^\w_]/g, '');
}

export function extractModuleName(completeName) {
	var index = completeName.lastIndexOf('/');
	return index === -1 ? completeName : completeName.substr(index + 1);
}

export function stripEnding(ending, string) {
	if (string.slice(-ending.length) === ending) {
		return string.slice(0, -ending.length);
	}
	return string;
}
