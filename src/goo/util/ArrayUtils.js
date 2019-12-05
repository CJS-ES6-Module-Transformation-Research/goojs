var functionObject_fromValues;
var functionObject_fromKeys;
var functionObject_find;
var functionObject_remove;
var functionObject_getTypedArray;
/**
 * Utilities for arrays and typed arrays
 */
function ArrayUtils() {}

functionObject_getTypedArray = function(arrayBuffer, pointer) {
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

functionObject_remove = function(array, value, equals) {
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

functionObject_find = function(array, predicate) {
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }
    return null;
};

functionObject_fromKeys = function(collection) {
    var array = [];

    collection.forEach(function(value, key) {
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

functionObject_fromValues = function(collection) {
    var array = [];

    collection.forEach(function(value) {
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

export { functionObject_getTypedArray as getTypedArray, functionObject_remove as remove, functionObject_find as find, functionObject_fromValues as fromValues };
