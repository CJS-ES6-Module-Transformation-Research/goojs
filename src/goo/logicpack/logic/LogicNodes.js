/**
 * Base class/module for all logic boxes
 * @private
 */
function LogicNodes() {}

LogicNodes.types = {};

var functionObject_types = {};

/**
 * Register a new logic node. All logic nodes must call this to register themselves.
 * @private
 */
LogicNodes.registerType = function (name, fn) {
    LogicNodes.types[name] = {
		fn: fn,
		name: name,
		editorName: fn.editorName
	};

    var functionObject_name = {
        fn: fn,
        name: name,
        editorName: fn.editorName
    };
};

var functionObject_registerType = function(name, fn) {
    functionObject_types[name] = {
        fn: fn,
        name: name,
        editorName: fn.editorName
    };
};

LogicNodes.getInterfaceByName = function (name) {
	if (LogicNodes.types[name] !== undefined) {
		return LogicNodes.types[name].fn.logicInterface;
	}
	return null;
};

var functionObject_getInterfaceByName = function(name) {
    if (functionObject_types[name] !== undefined) {
        return functionObject_types[name].fn.logicInterface;
    }
    return null;
};

LogicNodes.getClass = function (name) {
	if (LogicNodes.types[name] === undefined) {
		return function () {
			console.error('LogicNode type [' + name + '] does not exist.');
			return null;
		};
	}

	return LogicNodes.types[name].fn;
};

var functionObject_getClass = function(name) {
    if (functionObject_types[name] === undefined) {
        return function() {
            console.error("LogicNode type [" + name + "] does not exist.");
            return null;
        };
    }

    return functionObject_types[name].fn;
};

LogicNodes.getAllTypes = function () {
	var out = [];
	for (var n in LogicNodes.types) {
		out.push(LogicNodes.types[n]);
	}
	return out;
};

var functionObject_getAllTypes = function() {
    var out = [];
    for (var n in functionObject_types) {
        out.push(functionObject_types[n]);
    }
    return out;
};

export { functionObject_registerType as registerType, functionObject_getClass as getClass };