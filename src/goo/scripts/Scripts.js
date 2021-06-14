"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.create = exports.getScript = exports.register = undefined;

var _ScriptUtils = require("../scripts/ScriptUtils");

var _ObjectUtils = require("../util/ObjectUtils");

var allScripts;
var create;
var getScript;
var getClasses;
var addClass;
var register;

// the collection of scripts
var _scripts = {};

exports.register = register = function register(factoryFunction) {
	var key = factoryFunction.externals.key || factoryFunction.externals.name;
	if (_scripts[key]) {
		console.warn('Script already registered for key ' + key);
		return;
	}
	//! AT: this will modify the external object but that's ok
	(0, _ScriptUtils.fillDefaultNames)(factoryFunction.externals.parameters);
	_scripts[key] = factoryFunction;
};

addClass = _ObjectUtils.ObjectUtils.warnOnce('Scripts.addClass is deprecated; please consider using the global goo object instead', function () /* name, klass */{
	// deprecated as of v0.15.3 and scheduled for removal in version 0.17.0
});

getClasses = _ObjectUtils.ObjectUtils.warnOnce('Scripts.getClasses is deprecated; please consider using the global goo object instead', function () {
	return window.goo;
});

exports.getScript = getScript = function getScript(key) {
	return _scripts[key];
};

exports.create = create = function create(key, options) {
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
		(0, _ScriptUtils.fillDefaultNames)(script.externals.parameters);
		(0, _ScriptUtils.fillDefaultValues)(script.parameters, factoryFunction.externals.parameters);
	}

	if (options) {
		_ObjectUtils.ObjectUtils.extend(script.parameters, options);
	}

	return script;
};

allScripts = function allScripts() {
	// REVIEW: Why not return _scripts? Document this function.
	var scripts = {};
	var keys = Object.keys(_scripts);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		scripts[key] = _scripts[key];
	}
	return scripts;
};

exports.register = register;
exports.getScript = getScript;
exports.create = create;