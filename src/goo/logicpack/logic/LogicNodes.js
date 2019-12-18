Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.registerType = functionObject_registerType = function functionObject_registerType(name, fn) {
    functionObject_types[name] = {
        fn: fn,
        name: name,
        editorName: fn.editorName
    };
};

functionObject_getInterfaceByName = function functionObject_getInterfaceByName(name) {
    if (functionObject_types[name] !== undefined) {
        return functionObject_types[name].fn.logicInterface;
    }
    return null;
};

exports.getClass = functionObject_getClass = function functionObject_getClass(name) {
    if (functionObject_types[name] === undefined) {
        return function () {
            console.error("LogicNode type [" + name + "] does not exist.");
            return null;
        };
    }

    return functionObject_types[name].fn;
};

functionObject_getAllTypes = function functionObject_getAllTypes() {
    var out = [];
    for (var n in functionObject_types) {
        out.push(functionObject_types[n]);
    }
    return out;
};

exports.registerType = functionObject_registerType;
exports.getClass = functionObject_getClass;
