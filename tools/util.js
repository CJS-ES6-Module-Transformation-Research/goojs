// jshint node:true
'use strict';

function isSafeIdentifier(identifier) {
	return /^[\w_]+$/.test(identifier);
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

mod_isSafeIdentifier = isSafeIdentifier;
mod_safenIdentifier = safenIdentifier;
mod_extractModuleName = extractModuleName;
mod_stripEnding = stripEnding;
var mod_isSafeIdentifier;
export { mod_isSafeIdentifier as isSafeIdentifier };
var mod_safenIdentifier;
export { mod_safenIdentifier as safenIdentifier };
var mod_extractModuleName;
export { mod_extractModuleName as extractModuleName };
var mod_stripEnding;
export { mod_stripEnding as stripEnding };
