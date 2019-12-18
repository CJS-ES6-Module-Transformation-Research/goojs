import { anonymus as RSVP } from "../util/rsvp";
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

functionObject_createPromise = function(fun) {
    var promise = new RSVP.Promise();

    fun(function(value) {
        promise.resolve(value);
    }, function(reason) {
        promise.reject(reason);
    });

    return promise;
};

functionObject_resolve = function(value) {
    var promise = new RSVP.Promise();
    promise.resolve(value);
    return promise;
};

functionObject_reject = function(reason) {
    var promise = new RSVP.Promise();
    promise.reject(reason);
    return promise;
};


var createDummyPromiseWarn = false;

functionObject_createDummyPromise = function(arg, error) {
    if (!createDummyPromiseWarn) {
        createDummyPromiseWarn = true;
        console.warn(
            "PromiseUtils.createDummyPromise is deprecated; please consider using PromiseUtils.resolve/reject instead"
        );
    }

    var promise = new RSVP.Promise();
    if (error) {
        promise.reject(error);
    } else {
        promise.resolve(arg);
    }
    return promise;
};

functionObject_optimisticAll = function(promises) {
    var resolved = 0, len = promises.length, results = [], promise = new RSVP.Promise();

    if (len > 0) {
        for (var i = 0; i < len; i++) {
            (function(i) {
                promises[i].then(function(result) {
                    results[i] = result;
                    resolved++;
                    if (resolved === len) {
                        promise.resolve(results);
                    }
                }, function(error) {
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

functionObject_delay = function(value, time) {
    var promise = new RSVP.Promise();
    setTimeout(function() {
        promise.resolve(value);
    }, time);
    return promise;
};

functionObject_defer = function(delay, arg) {
    var p1, p2, promise;
    promise = new RSVP.Promise();
    if (arg.apply) {
        p1 = new RSVP.Promise();
        p2 = p1.then(function() {
            return arg();
        });
        setTimeout(function() {
            p1.resolve();
        }, delay);
        return p2;
    } else {
        setTimeout(function() {
            promise.resolve(arg);
        }, delay);
    }
    return promise;
};

export { functionObject_createPromise as createPromise, functionObject_resolve as resolve, functionObject_reject as reject, functionObject_optimisticAll as optimisticAll, functionObject_delay as delay };
