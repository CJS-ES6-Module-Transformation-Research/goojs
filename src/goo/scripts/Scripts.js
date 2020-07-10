import { ScriptUtils as scriptsScriptUtils_ScriptUtilsjs } from "../scripts/ScriptUtils";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";

// the collection of scripts
var _scripts = {};

// the static class which just holds the following methods
var Scripts = {};

var Scripts_register = function(factoryFunction) {
    var key = factoryFunction.externals.key || factoryFunction.externals.name;
    if (_scripts[key]) {
        console.warn("Script already registered for key " + key);
        return;
    }
    //! AT: this will modify the external object but that's ok
    scriptsScriptUtils_ScriptUtilsjs.fillDefaultNames(factoryFunction.externals.parameters);
    _scripts[key] = factoryFunction;
};

var Scripts_addClass = utilObjectUtils_ObjectUtilsjs.warnOnce(
    "Scripts.addClass is deprecated; please consider using the global goo object instead",
    function() /* name, klass */{}
);

var Scripts_getClasses = utilObjectUtils_ObjectUtilsjs.warnOnce(
    "Scripts.getClasses is deprecated; please consider using the global goo object instead",
    function() {
        return window.goo;
    }
);

var Scripts_getScript = function(key) {
    return _scripts[key];
};

var Scripts_create = function(key, options) {
    var factoryFunction;
    if (typeof key === "string") {
        factoryFunction = _scripts[key];
        if (!factoryFunction) {
            throw new Error("Script \"" + key + "\" is not registered");
        }
    } else if (typeof key === "function") {
        factoryFunction = key;
    }

    var script = factoryFunction();
    script.parameters = {};
    script.environment = null;
    script.externals = factoryFunction.externals;

    if (factoryFunction.externals) {
        scriptsScriptUtils_ScriptUtilsjs.fillDefaultNames(script.externals.parameters);
        scriptsScriptUtils_ScriptUtilsjs.fillDefaultValues(script.parameters, factoryFunction.externals.parameters);
    }

    if (options) {
        utilObjectUtils_ObjectUtilsjs.extend(script.parameters, options);
    }

    return script;
};

var Scripts_allScripts = function() {
    // REVIEW: Why not return _scripts? Document this function.
    var scripts = {};
    var keys = Object.keys(_scripts);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        scripts[key] = _scripts[key];
    }
    return scripts;
};

export { Scripts_register as register, Scripts_getScript as getScript, Scripts_create as create };
