var functionObject_getExtension;
var functionObject_isInteger;
var functionObject_isNumber;
var functionObject_isBoolean;
var functionObject_isString;
var functionObject_isObject;
var functionObject_isArray;
var functionObject_property;
var functionObject_constant;
var functionObject_warnOnce;
var functionObject_cloneSet;
var functionObject_cloneMap;
var functionObject_shallowSelectiveClone;
var functionObject_deepClone;
var functionObject_map;
var functionObject_forEach;
var functionObject_each;
var functionObject_clone;
var functionObject_extend;
var functionObject_copyOptions;
var functionObject_defaults;
var functionObject_find;
var functionObject_contains;
function ObjectUtils() {}

functionObject_contains = function(array, value) {
    return array.indexOf(value) !== -1;
};

functionObject_find = function(array, predicate) {
    for (var i = 0; i < array.length; ++i) {
        var item = array[i];
        if (predicate(item, i)) {
            return item;
        }
    }

    return undefined;
};

functionObject_defaults = function(destination, source) {
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof destination[key] === "undefined" || destination[key] === null) {
            destination[key] = source[key];
        }
    }

    return destination;
};

functionObject_copyOptions = function(destination, options, defaults) {
    var keys = Object.keys(defaults);

    if (options) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var option = options[key];
            destination[key] = (typeof option === "undefined" || option === null ? defaults[key] : option);
        }
    } else {
        functionObject_extend(destination, defaults);
    }

    return destination;
};

functionObject_extend = function(destination, source) {
    if (!source) {
        return;
    }

    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        destination[key] = source[key];
    }

    return destination;
};

functionObject_clone = function(obj) {
    if (!functionObject_isObject(obj)) {
        return obj;
    }
    return (Array.isArray(obj) ? obj.slice() : functionObject_extend({}, obj));
};

// Save bytes in the minified (but not gzipped) version:
var nativeForEach = Array.prototype.forEach;

functionObject_each = function(obj, iterator, context, sortProp) {
    if (typeof obj === "undefined" || obj === null) {
        return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            iterator.call(context, obj[i], i, obj);
        }
    } else {
        var keys = Object.keys(obj);
        if (sortProp !== undefined) {
            keys.sort(function(a, b) {
                return obj[a][sortProp] - obj[b][sortProp];
            });
        }
        for (var i = 0, length = keys.length; i < length; i++) {
            iterator.call(context, obj[keys[i]], keys[i], obj);
        }
    }
};

functionObject_map = function(collection, iteratee, context, sortProp) {
    var result = [];

    functionObject_forEach(collection, function(value, key) {
        result.push(iteratee.call(context, value, key, collection));
    }, context, sortProp);

    return result;
};

functionObject_deepClone = function(object) {
    // handle primitive types, functions, null and undefined
    if (object === null || typeof object !== "object") {
        return object;
    }

    // handle typed arrays
    if (Object.prototype.toString.call(object.buffer) === "[object ArrayBuffer]") {
        return new object.constructor(object);
    }

    // handle arrays (even sparse ones)
    if (object instanceof Array) {
        return object.map(functionObject_deepClone);
    }

    // handle html nodes
    if (object.nodeType && typeof object.cloneNode === "function") {
        return object.cloneNode(true);
    }

    // handle generic objects
    // prototypes and constructors will not match in the clone
    var copy = {};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        copy[key] = functionObject_deepClone(object[key]);
    }
    return copy;
};

functionObject_shallowSelectiveClone = function(source, keys) {
    var clone = {};

    keys.forEach(function(key) {
        clone[key] = source[key];
    });

    return clone;
};

functionObject_cloneMap = function(source) {
    var clone = new Map();
    source.forEach(function(value, key) {
        clone.set(key, value);
    });
    return clone;
};

functionObject_cloneSet = function(source) {
    var clone = new Set();
    source.forEach(function(value) {
        clone.add(value);
    });
    return clone;
};

functionObject_warnOnce = function(message, fun) {
    var warned = false;
    return function() {
        if (!warned) {
            console.warn(message);
            warned = true;
        }

        return fun.apply(this, arguments);
    };
};

functionObject_constant = function(value) {
    return function() {
        return value;
    };
};

functionObject_property = function(propName) {
    return function(obj) {
        return obj[propName];
    };
};

functionObject_isArray = function(value) {
    return Array.isArray(value);
};

functionObject_isObject = function(value) {
    return value === Object(value);
};

functionObject_isString = function(value) {
    return typeof value === "string";
};

functionObject_isBoolean = function(value) {
    return value === true || value === false;
};

functionObject_isNumber = function(value) {
    return typeof value === "number";
};

functionObject_isInteger = function(value) {
    return functionObject_isNumber(value) && value % 1 === 0;
};

functionObject_getExtension = function(value) {
    if (functionObject_isString(value)) {
        var dotIndex = value.lastIndexOf(".");
        if (dotIndex >= -1) {
            return value.substr(dotIndex + 1).toLowerCase();
        }
    }

    return "";
};

export { functionObject_contains as contains, functionObject_find as find, functionObject_defaults as defaults, functionObject_copyOptions as copyOptions, functionObject_extend as extend, functionObject_clone as clone, functionObject_map as map, functionObject_deepClone as deepClone, functionObject_shallowSelectiveClone as shallowSelectiveClone, functionObject_cloneMap as cloneMap, functionObject_cloneSet as cloneSet, functionObject_warnOnce as warnOnce, functionObject_constant as constant, functionObject_isArray as isArray, functionObject_isString as isString, functionObject_isBoolean as isBoolean, functionObject_isNumber as isNumber, functionObject_isInteger as isInteger, functionObject_getExtension as getExtension };
