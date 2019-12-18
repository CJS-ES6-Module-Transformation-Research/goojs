Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = exports.optimisticAll = exports.reject = exports.resolve = exports.createPromise = undefined;

var _rsvp = require("../util/rsvp");

var functionObject_defer;
var functionObject_delay;
var functionObject_optimisticAll;
var functionObject_createDummyPromise;
var functionObject_reject;
var functionObject_resolve;
var functionObject_createPromise;

/**
 * Provides promise-related utility methods
 */
function PromiseUtils() {}

exports.createPromise = functionObject_createPromise = function functionObject_createPromise(fun) {
    var promise = new _rsvp.anonymus.Promise();

    fun(function (value) {
        promise.resolve(value);
    }, function (reason) {
        promise.reject(reason);
    });

    return promise;
};

exports.resolve = functionObject_resolve = function functionObject_resolve(value) {
    var promise = new _rsvp.anonymus.Promise();
    promise.resolve(value);
    return promise;
};

exports.reject = functionObject_reject = function functionObject_reject(reason) {
    var promise = new _rsvp.anonymus.Promise();
    promise.reject(reason);
    return promise;
};

var createDummyPromiseWarn = false;

functionObject_createDummyPromise = function functionObject_createDummyPromise(arg, error) {
    if (!createDummyPromiseWarn) {
        createDummyPromiseWarn = true;
        console.warn("PromiseUtils.createDummyPromise is deprecated; please consider using PromiseUtils.resolve/reject instead");
    }

    var promise = new _rsvp.anonymus.Promise();
    if (error) {
        promise.reject(error);
    } else {
        promise.resolve(arg);
    }
    return promise;
};

exports.optimisticAll = functionObject_optimisticAll = function functionObject_optimisticAll(promises) {
    var resolved = 0,
        len = promises.length,
        results = [],
        promise = new _rsvp.anonymus.Promise();

    if (len > 0) {
        for (var i = 0; i < len; i++) {
            (function (i) {
                promises[i].then(function (result) {
                    results[i] = result;
                    resolved++;
                    if (resolved === len) {
                        promise.resolve(results);
                    }
                }, function (error) {
                    results[i] = error;
                    resolved++;
                    if (resolved === len) {
                        promise.resolve(results);
                    }
                });
            })(i);
        }
    } else {
        promise.resolve(results);
    }
    return promise;
};

exports.delay = functionObject_delay = function functionObject_delay(value, time) {
    var promise = new _rsvp.anonymus.Promise();
    setTimeout(function () {
        promise.resolve(value);
    }, time);
    return promise;
};

functionObject_defer = function functionObject_defer(delay, arg) {
    var p1, p2, promise;
    promise = new _rsvp.anonymus.Promise();
    if (arg.apply) {
        p1 = new _rsvp.anonymus.Promise();
        p2 = p1.then(function () {
            return arg();
        });
        setTimeout(function () {
            p1.resolve();
        }, delay);
        return p2;
    } else {
        setTimeout(function () {
            promise.resolve(arg);
        }, delay);
    }
    return promise;
};

exports.createPromise = functionObject_createPromise;
exports.resolve = functionObject_resolve;
exports.reject = functionObject_reject;
exports.optimisticAll = functionObject_optimisticAll;
exports.delay = functionObject_delay;
