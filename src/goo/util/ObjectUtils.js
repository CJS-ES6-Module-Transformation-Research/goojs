var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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
var _functionObject_deepClone;
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

exports.contains = functionObject_contains = function functionObject_contains(array, value) {
    return array.indexOf(value) !== -1;
};

exports.find = functionObject_find = function functionObject_find(array, predicate) {
    for (var i = 0; i < array.length; ++i) {
        var item = array[i];
        if (predicate(item, i)) {
            return item;
        }
    }

    return undefined;
};

exports.defaults = functionObject_defaults = function functionObject_defaults(destination, source) {
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof destination[key] === "undefined" || destination[key] === null) {
            destination[key] = source[key];
        }
    }

    return destination;
};

exports.copyOptions = functionObject_copyOptions = function functionObject_copyOptions(destination, options, defaults) {
    var keys = Object.keys(defaults);

    if (options) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var option = options[key];
            destination[key] = typeof option === "undefined" || option === null ? defaults[key] : option;
        }
    } else {
        functionObject_extend(destination, defaults);
    }

    return destination;
};

exports.extend = functionObject_extend = function functionObject_extend(destination, source) {
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

exports.clone = functionObject_clone = function functionObject_clone(obj) {
    if (!functionObject_isObject(obj)) {
        return obj;
    }
    return Array.isArray(obj) ? obj.slice() : functionObject_extend({}, obj);
};

// Save bytes in the minified (but not gzipped) version:
var nativeForEach = Array.prototype.forEach;

functionObject_each = function functionObject_each(obj, iterator, context, sortProp) {
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
            keys.sort(function (a, b) {
                return obj[a][sortProp] - obj[b][sortProp];
            });
        }
        for (var i = 0, length = keys.length; i < length; i++) {
            iterator.call(context, obj[keys[i]], keys[i], obj);
        }
    }
};

exports.map = functionObject_map = function functionObject_map(collection, iteratee, context, sortProp) {
    var result = [];

    functionObject_forEach(collection, function (value, key) {
        result.push(iteratee.call(context, value, key, collection));
    }, context, sortProp);

    return result;
};

exports.deepClone = _functionObject_deepClone = function functionObject_deepClone(object) {
    // handle primitive types, functions, null and undefined
    if (object === null || (typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") {
        return object;
    }

    // handle typed arrays
    if (Object.prototype.toString.call(object.buffer) === "[object ArrayBuffer]") {
        return new object.constructor(object);
    }

    // handle arrays (even sparse ones)
    if (object instanceof Array) {
        return object.map(_functionObject_deepClone);
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
        copy[key] = _functionObject_deepClone(object[key]);
    }
    return copy;
};

exports.shallowSelectiveClone = functionObject_shallowSelectiveClone = function functionObject_shallowSelectiveClone(source, keys) {
    var clone = {};

    keys.forEach(function (key) {
        clone[key] = source[key];
    });

    return clone;
};

exports.cloneMap = functionObject_cloneMap = function functionObject_cloneMap(source) {
    var clone = new Map();
    source.forEach(function (value, key) {
        clone.set(key, value);
    });
    return clone;
};

exports.cloneSet = functionObject_cloneSet = function functionObject_cloneSet(source) {
    var clone = new Set();
    source.forEach(function (value) {
        clone.add(value);
    });
    return clone;
};

exports.warnOnce = functionObject_warnOnce = function functionObject_warnOnce(message, fun) {
    var warned = false;
    return function () {
        if (!warned) {
            console.warn(message);
            warned = true;
        }

        return fun.apply(this, arguments);
    };
};

exports.constant = functionObject_constant = function functionObject_constant(value) {
    return function () {
        return value;
    };
};

functionObject_property = function functionObject_property(propName) {
    return function (obj) {
        return obj[propName];
    };
};

exports.isArray = functionObject_isArray = function functionObject_isArray(value) {
    return Array.isArray(value);
};

functionObject_isObject = function functionObject_isObject(value) {
    return value === Object(value);
};

exports.isString = functionObject_isString = function functionObject_isString(value) {
    return typeof value === "string";
};

exports.isBoolean = functionObject_isBoolean = function functionObject_isBoolean(value) {
    return value === true || value === false;
};

exports.isNumber = functionObject_isNumber = function functionObject_isNumber(value) {
    return typeof value === "number";
};

exports.isInteger = functionObject_isInteger = function functionObject_isInteger(value) {
    return functionObject_isNumber(value) && value % 1 === 0;
};

exports.getExtension = functionObject_getExtension = function functionObject_getExtension(value) {
    if (functionObject_isString(value)) {
        var dotIndex = value.lastIndexOf(".");
        if (dotIndex >= -1) {
            return value.substr(dotIndex + 1).toLowerCase();
        }
    }

    return "";
};

exports.contains = functionObject_contains;
exports.find = functionObject_find;
exports.defaults = functionObject_defaults;
exports.copyOptions = functionObject_copyOptions;
exports.extend = functionObject_extend;
exports.clone = functionObject_clone;
exports.map = functionObject_map;
exports.deepClone = _functionObject_deepClone;
exports.shallowSelectiveClone = functionObject_shallowSelectiveClone;
exports.cloneMap = functionObject_cloneMap;
exports.cloneSet = functionObject_cloneSet;
exports.warnOnce = functionObject_warnOnce;
exports.constant = functionObject_constant;
exports.isArray = functionObject_isArray;
exports.isString = functionObject_isString;
exports.isBoolean = functionObject_isBoolean;
exports.isNumber = functionObject_isNumber;
exports.isInteger = functionObject_isInteger;
exports.getExtension = functionObject_getExtension;
