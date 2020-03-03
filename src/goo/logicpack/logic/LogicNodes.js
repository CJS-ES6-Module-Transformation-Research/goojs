Object.defineProperty(exports, "__esModule", {
    value: true
});
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
exports.registerType = LogicNodes_registerType = function LogicNodes_registerType(name, fn) {
    LogicNodes_types[name] = {
        fn: fn,
        name: name,
        editorName: fn.editorName
    };
};;

LogicNodes_getInterfaceByName = function LogicNodes_getInterfaceByName(name) {
    if (LogicNodes_types[name] !== undefined) {
        return LogicNodes_types[name].fn.logicInterface;
    }
    return null;
};;

exports.getClass = LogicNodes_getClass = function LogicNodes_getClass(name) {
    if (LogicNodes_types[name] === undefined) {
        return function () {
            console.error("LogicNode type [" + name + "] does not exist.");
            return null;
        };
    }

    return LogicNodes_types[name].fn;
};;

LogicNodes_getAllTypes = function LogicNodes_getAllTypes() {
    var out = [];
    for (var n in LogicNodes_types) {
        out.push(LogicNodes_types[n]);
    }
    return out;
};;

exports.registerType = LogicNodes_registerType;
exports.getClass = LogicNodes_getClass;
exports.LogicNodes = LogicNodes;
