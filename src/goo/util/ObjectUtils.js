var ObjectUtils_getExtension;
var ObjectUtils_isInteger;
var ObjectUtils_isNumber;
var ObjectUtils_isBoolean;
var ObjectUtils_isString;
var ObjectUtils_isObject;
var ObjectUtils_isArray;
var ObjectUtils_property;
var ObjectUtils_constant;
var ObjectUtils_warnOnce;
var ObjectUtils_cloneSet;
var ObjectUtils_cloneMap;
var ObjectUtils_shallowSelectiveClone;
var ObjectUtils_deepClone;
var ObjectUtils_map;
var ObjectUtils_forEach;
var ObjectUtils_each;
var ObjectUtils_clone;
var ObjectUtils_extend;
var ObjectUtils_copyOptions;
var ObjectUtils_defaults;
var ObjectUtils_find;
var ObjectUtils_contains;
function ObjectUtils() {}

/**
 * Gets whether the specified array contains the specified value.
 * @param {Array} array The array which is to be checked.
 * @param {*} value The value which is to be found.
 * @returns {boolean}
 *         True if the value exists in the array and false otherwise.
 */
ObjectUtils_contains = function(array, value) {
    return array.indexOf(value) !== -1;
};;

/**
 * Gets the first item in an array that matches the specified predicate.
 *
 * @param {Array} array
 *        The array which is to be searched.
 * @param {Function} predicate
 *        The preficate which will receive each item of the array and the
 *        current index.
 *
 * @return {*}
 *         The first item that matches the predicate or undefined if no
 *         items matched the predicate.
 */
ObjectUtils_find = function(array, predicate) {
    for (var i = 0; i < array.length; ++i) {
        var item = array[i];
        if (predicate(item, i)) {
            return item;
        }
    }

    return undefined;
};;

/**
 * Copies properties from an object onto another object if they're not already present
 * @param {Object} destination Destination object to copy to
 * @param {Object} source Source object to copy from
 * @returns {Object} Returns the destination object
 */
ObjectUtils_defaults = function(destination, source) {
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof destination[key] === "undefined" || destination[key] === null) {
            destination[key] = source[key];
        }
    }

    return destination;
};;

/**
 * Merges an options object and a defaults object into another object
 * @param destination Object to attach properties to
 * @param options A list of options; options must eb a subset of defaults
 * @param defaults Defaults for options; if an option if not present this value is used instead
 * @returns {Object} Returns the destination object
 */
ObjectUtils_copyOptions = function(destination, options, defaults) {
    var keys = Object.keys(defaults);

    if (options) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var option = options[key];
            destination[key] = typeof option === "undefined" || option === null ? defaults[key] : option;
        }
    } else {
        ObjectUtils_extend(destination, defaults);
    }

    return destination;
};;

/**
 * Copies properties from an object onto another object; overwrites existing properties
 * @param {Object} destination Destination object to copy to
 * @param {Object} source Source object to copy from
 * @returns {Object} Returns the destination object
 */
ObjectUtils_extend = function(destination, source) {
    if (!source) {
        return;
    }

    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        destination[key] = source[key];
    }

    return destination;
};;

// Create a (shallow-cloned) duplicate of an object.
ObjectUtils_clone = function(obj) {
    if (!ObjectUtils_isObject(obj)) {
        return obj;
    }
    return Array.isArray(obj) ? obj.slice() : ObjectUtils_extend({}, obj);
};;

// Save bytes in the minified (but not gzipped) version:
var nativeForEach = Array.prototype.forEach;

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles objects with the built-in `forEach`, arrays, and raw objects.
// Delegates to **ECMAScript 5**'s native `forEach` if available.
ObjectUtils_each = function(obj, iterator, context, sortProp) {
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
};;

/**
 * Creates an array of values by running each element in collection through
 * iteratee. The iteratee is bound to context and invoked with three
 * arguments: (value, index|key, collection).
 *
 * @param {(Array|Object|string)} collection
 * @param {Function} iteratee
 * @param {*} context
 * @param {string} sortProp
 *
 * @returns {Array}
 */
ObjectUtils_map = function(collection, iteratee, context, sortProp) {
    var result = [];

    ObjectUtils_forEach(collection, function(value, key) {
        result.push(iteratee.call(context, value, key, collection));
    }, context, sortProp);

    return result;
};;

/**
 * Performs a deep clone. Can handle primitive types, arrays, generic
 * objects, typed arrays and html nodes. Functions are shared. Does not
 * handle circular references - also does not preserve original
 * constructors/prototypes.
 *
 * @param {*} object Object to clone
 * @returns {*}
 */
ObjectUtils_deepClone = function(object) {
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
        return object.map(ObjectUtils_deepClone);
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
        copy[key] = ObjectUtils.deepClone(object[key]);
    }
    return copy;
};;

ObjectUtils_shallowSelectiveClone = function(source, keys) {
    var clone = {};

    keys.forEach(function(key) {
        clone[key] = source[key];
    });

    return clone;
};;

// probably not the best way to copy maps and sets
ObjectUtils_cloneMap = function(source) {
    var clone = new Map();
    source.forEach(function(value, key) {
        clone.set(key, value);
    });
    return clone;
};;

ObjectUtils_cloneSet = function(source) {
    var clone = new Set();
    source.forEach(function(value) {
        clone.add(value);
    });
    return clone;
};;

ObjectUtils_warnOnce = function(message, fun) {
    var warned = false;
    return function() {
        if (!warned) {
            console.warn(message);
            warned = true;
        }

        return fun.apply(this, arguments);
    };
};;

/**
 * Creates a function which returns the provided value.
 *
 * @param {*} value Value which is to be returned by the created function.
 *
 * @returns {Function}
 */
ObjectUtils_constant = function(value) {
    return function() {
        return value;
    };
};;

/**
 * Creates a function which returns the specified property of any object
 * passed to it.
 *
 * @param {string} propName Name of the property whose value is to be returned by the created function
 *
 * @returns {Function}
 */
ObjectUtils_property = function(propName) {
    return function(obj) {
        return obj[propName];
    };
};;

/**
 * Gets whether the specified value is an array.
 *
 * @param {*} value Value which is to be tested.
 *
 * @returns {boolean} True if the value is an array and false otherwise.
 */
ObjectUtils_isArray = function(value) {
    return Array.isArray(value);
};;

/**
 * Gets whether the specified value is an object.
 *
 * @param {*} value Value which is to be tested.
 *
 * @returns {boolean} True if the value is an object and false otherwise.
 */
ObjectUtils_isObject = function(value) {
    return value === Object(value);
};;

/**
 * Gets whether the specified value is a string.
 *
 * @param {*} value Value which is to be tested.
 *
 * @returns {boolean} True if the value is a string and false otherwise.
 */
ObjectUtils_isString = function(value) {
    return typeof value === "string";
};;

/**
 * Gets whether the specified value is an boolean value.
 *
 * @param {*} value Value which is to be tested.
 *
 * @returns {boolean} True if the value is a boolean and false otherwise.
 */
ObjectUtils_isBoolean = function(value) {
    return value === true || value === false;
};;

/**
 * Gets whether the specified value is a number.
 *
 * @param {*} value Value which is to be tested.
 *
 * @returns {boolean} True if the value is a number and false otherwise.
 */
ObjectUtils_isNumber = function(value) {
    return typeof value === "number";
};;

/**
 * Gets whether the specified value is an integer number.
 *
 * @param {*} value Value which is to be tested.
 *
 * @returns {boolean} True if the value is an integer number and false otherwise.
 */
ObjectUtils_isInteger = function(value) {
    return ObjectUtils_isNumber(value) && value % 1 === 0;
};;

/**
 * Gets the extension of the specified string. The extension is anything
 * after the last '.'
 *
 * @param {*} value Value whose extension is to be returned.
 *
 * @returns {string}
 */
ObjectUtils_getExtension = function(value) {
    if (ObjectUtils_isString(value)) {
        var dotIndex = value.lastIndexOf(".");
        if (dotIndex >= -1) {
            return value.substr(dotIndex + 1).toLowerCase();
        }
    }

    return "";
};;

export { ObjectUtils_contains as contains, ObjectUtils_find as find, ObjectUtils_defaults as defaults, ObjectUtils_copyOptions as copyOptions, ObjectUtils_extend as extend, ObjectUtils_clone as clone, ObjectUtils_map as map, ObjectUtils_deepClone as deepClone, ObjectUtils_shallowSelectiveClone as shallowSelectiveClone, ObjectUtils_cloneMap as cloneMap, ObjectUtils_cloneSet as cloneSet, ObjectUtils_warnOnce as warnOnce, ObjectUtils_constant as constant, ObjectUtils_isArray as isArray, ObjectUtils_isString as isString, ObjectUtils_isBoolean as isBoolean, ObjectUtils_isNumber as isNumber, ObjectUtils_isInteger as isInteger, ObjectUtils_getExtension as getExtension, ObjectUtils };
