Object.defineProperty(exports, "__esModule", {
    value: true
});
var functionObject_fromValues;
var functionObject_fromKeys;
var functionObject_find;
var functionObject_remove;
var functionObject_getTypedArray;
/**
 * Utilities for arrays and typed arrays
 */
function ArrayUtils() {}

exports.getTypedArray = functionObject_getTypedArray = function functionObject_getTypedArray(arrayBuffer, pointer) {
    var start = pointer[0];
    var length = pointer[1];
    var format = pointer[2];

    if (format === "float32") {
        return new Float32Array(arrayBuffer, start, length);
    } else if (format === "uint8") {
        return new Uint8Array(arrayBuffer, start, length);
    } else if (format === "uint16") {
        return new Uint16Array(arrayBuffer, start, length);
    } else if (format === "uint32") {
        return new Uint32Array(arrayBuffer, start, length);
    } else {
        throw new Error("Binary format " + format + " is not supported");
    }
};

exports.remove = functionObject_remove = function functionObject_remove(array, value, equals) {
    var idx = -1;
    if (typeof equals === "function") {
        for (var i = 0; i < array.length; i++) {
            if (equals(array[i], value)) {
                idx = i;
                break;
            }
        }
    } else {
        idx = array.indexOf(value);
    }
    if (idx > -1) {
        array.splice(idx, 1);
    }
};

exports.find = functionObject_find = function functionObject_find(array, predicate) {
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }
    return null;
};

exports.fromKeys = functionObject_fromKeys = function functionObject_fromKeys(collection) {
    var array = [];

    collection.forEach(function (value, key) {
        array.push(key);
    });
    //        var iterator = collection.keys();
    //        var entry = iterator.next();
    //        while (!entry.done) {
    //            array.push(entry.value);
    //            entry = iterator.next();
    //        }
    return array;
};

exports.fromValues = functionObject_fromValues = function functionObject_fromValues(collection) {
    var array = [];

    collection.forEach(function (value) {
        array.push(value);
    });
    //        var iterator = collection.values();
    //        var entry = iterator.next();
    //        while (!entry.done) {
    //            array.push(entry.value);
    //            entry = iterator.next();
    //        }
    return array;
};

exports.getTypedArray = functionObject_getTypedArray;
exports.remove = functionObject_remove;
exports.find = functionObject_find;
exports.fromKeys = functionObject_fromKeys;
exports.fromValues = functionObject_fromValues;
