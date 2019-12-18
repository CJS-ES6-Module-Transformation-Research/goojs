Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.each = undefined;

var _PromiseUtils = require("../util/PromiseUtils");

var PromiseUtils = _interopRequireWildcard(_PromiseUtils);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

var functionObject_each;
var functionObject_maxTimePerFrame;

var performance = typeof window !== 'undefined' ? window.performance : {};

performance.now = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return Date.now();
};

function TaskScheduler() {}

functionObject_maxTimePerFrame = 50;

exports.each = functionObject_each = function functionObject_each(queue) {
    return PromiseUtils.createPromise(function (resolve) {
        var i = 0;

        function process() {
            var startTime = performance.now();
            while (i < queue.length && performance.now() - startTime < TaskScheduler.maxTimePerFrame) {
                queue[i]();
                i++;
            }

            if (i < queue.length) {
                // REVIEW: 4ms is 'lagom'? Should this number be hard-coded?
                //! AT: 4 ms is the minimum amount as specified by the HTML standard
                setTimeout(process, 4);
            } else {
                resolve();
            }
        }

        process();
    });
};

exports.each = functionObject_each;
