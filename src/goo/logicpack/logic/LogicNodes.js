var functionObject_getAllTypes;
var functionObject_getClass;
var functionObject_getInterfaceByName;
var functionObject_registerType;
var functionObject_types;
/**
 * Base class/module for all logic boxes
 * @private
 */
function LogicNodes() {}

functionObject_types = {};

functionObject_registerType = function(name, fn) {
    functionObject_types[name] = {
        fn: fn,
        name: name,
        editorName: fn.editorName
    };
};

functionObject_getInterfaceByName = function(name) {
    if (functionObject_types[name] !== undefined) {
        return functionObject_types[name].fn.logicInterface;
    }
    return null;
};

functionObject_getClass = function(name) {
    if (functionObject_types[name] === undefined) {
        return function() {
            console.error("LogicNode type [" + name + "] does not exist.");
            return null;
        };
    }

    return functionObject_types[name].fn;
};

functionObject_getAllTypes = function() {
    var out = [];
    for (var n in functionObject_types) {
        out.push(functionObject_types[n]);
    }
    return out;
};

export { functionObject_registerType as registerType, functionObject_getClass as getClass };