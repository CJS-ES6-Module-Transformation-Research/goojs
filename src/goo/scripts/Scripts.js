import { ScriptUtils as ScriptUtilsjs } from "../scripts/ScriptUtils";
import { ObjectUtils as ObjectUtilsjs } from "../util/ObjectUtils";

// the collection of scripts
var _scripts = {};

Scripts.addClass = ObjectUtilsjs.warnOnce(
	'Scripts.addClass is deprecated; please consider using the global goo object instead',
	function (/* name, klass */) {
		// deprecated as of v0.15.3 and scheduled for removal in version 0.17.0
	}
);

Scripts.getClasses = ObjectUtilsjs.warnOnce(
	'Scripts.getClasses is deprecated; please consider using the global goo object instead',
	function () {
		return window.goo;
	}
);

Scripts.getScript = function (key) {
	return _scripts[key];
};

Scripts.create = function (key, options) {
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
		ScriptUtilsjs.fillDefaultNames(script.externals.parameters);
		ScriptUtilsjs.fillDefaultValues(script.parameters, factoryFunction.externals.parameters);
	}

	if (options) {
		ObjectUtilsjs.extend(script.parameters, options);
	}

	return script;
};

Scripts.allScripts = function () {
	// REVIEW: Why not return _scripts? Document this function.
	var scripts = {};
	var keys = Object.keys(_scripts);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		scripts[key] = _scripts[key];
	}
	return scripts;
};

var Scripts_register = function(factoryFunction) {
    var key = factoryFunction.externals.key || factoryFunction.externals.name;
    if (_scripts[key]) {
        console.warn("Script already registered for key " + key);
        return;
    }
    //! AT: this will modify the external object but that's ok
    ScriptUtilsjs.fillDefaultNames(factoryFunction.externals.parameters);
    _scripts[key] = factoryFunction;
};

export { Scripts_register as register };
