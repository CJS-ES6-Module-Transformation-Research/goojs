var LogicNodes_getAllTypes;
var LogicNodes_getClass;
var LogicNodes_getInterfaceByName;
var LogicNodes_registerType;
var LogicNodes_types;
/**
 * Base class/module for all logic boxes
 * @private
 */
function LogicNodes() {}

LogicNodes_types = {};;

/**
 * Register a new logic node. All logic nodes must call this to register themselves.
 * @private
 */
LogicNodes_registerType = function(name, fn) {
    LogicNodes_types[name] = {
        fn: fn,
        name: name,
        editorName: fn.editorName
    };
};;

LogicNodes_getInterfaceByName = function(name) {
    if (LogicNodes_types[name] !== undefined) {
        return LogicNodes_types[name].fn.logicInterface;
    }
    return null;
};;

LogicNodes_getClass = function(name) {
    if (LogicNodes_types[name] === undefined) {
        return function() {
            console.error("LogicNode type [" + name + "] does not exist.");
            return null;
        };
    }

    return LogicNodes_types[name].fn;
};;

LogicNodes_getAllTypes = function() {
    var out = [];
    for (var n in LogicNodes_types) {
        out.push(LogicNodes_types[n]);
    }
    return out;
};;

export { LogicNodes_registerType as registerType, LogicNodes_getClass as getClass, LogicNodes };