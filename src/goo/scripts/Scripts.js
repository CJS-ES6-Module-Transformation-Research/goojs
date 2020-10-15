"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.create = exports.getScript = exports.register = undefined;

var _ScriptUtils = require("../scripts/ScriptUtils");

var _ObjectUtils = require("../util/ObjectUtils");

var Scripts_allScripts;
var Scripts_create;
var Scripts_getScript;
var Scripts_getClasses;
var Scripts_addClass;
var Scripts_register;


// the collection of scripts
var _scripts = {};

exports.register = Scripts_register = function Scripts_register(factoryFunction) {
	var key = factoryFunction.externals.key || factoryFunction.externals.name;
	if (_scripts[key]) {
		console.warn('Script already registered for key ' + key);
		return;
	}
	//! AT: this will modify the external object but that's ok
	_ScriptUtils.ScriptUtils.fillDefaultNames(factoryFunction.externals.parameters);
	_scripts[key] = factoryFunction;
};

Scripts_addClass = _ObjectUtils.ObjectUtils.warnOnce('Scripts.addClass is deprecated; please consider using the global goo object instead', function () /* name, klass */{
	// deprecated as of v0.15.3 and scheduled for removal in version 0.17.0
});

Scripts_getClasses = _ObjectUtils.ObjectUtils.warnOnce('Scripts.getClasses is deprecated; please consider using the global goo object instead', function () {
	return window.goo;
});

exports.getScript = Scripts_getScript = function Scripts_getScript(key) {
	return _scripts[key];
};

exports.create = Scripts_create = function Scripts_create(key, options) {
	var factoryFunction;
	if (typeof key === 'string') {
		factoryFunction = _scripts[key];
		if (!factoryFunction) {
			throw new Error('Script "' + key + '" is not registered');
		}
	} else if (typeof key === 'function') {
		factoryFunction = key;
	}

	var script = factoryFunction();
	script.parameters = {};
	script.environment = null;
	script.externals = factoryFunction.externals;

	if (factoryFunction.externals) {
		_ScriptUtils.ScriptUtils.fillDefaultNames(script.externals.parameters);
		_ScriptUtils.ScriptUtils.fillDefaultValues(script.parameters, factoryFunction.externals.parameters);
	}

	if (options) {
		_ObjectUtils.ObjectUtils.extend(script.parameters, options);
	}

	return script;
};

Scripts_allScripts = function Scripts_allScripts() {
	// REVIEW: Why not return _scripts? Document this function.
	var scripts = {};
	var keys = Object.keys(_scripts);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		scripts[key] = _scripts[key];
	}
	return scripts;
};

exports.register = Scripts_register;
exports.getScript = Scripts_getScript;
exports.create = Scripts_create;