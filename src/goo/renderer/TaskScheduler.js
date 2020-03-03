Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TaskScheduler = exports.each = undefined;

var _PromiseUtils = require("../util/PromiseUtils");

var TaskScheduler_each;
var TaskScheduler_maxTimePerFrame;

var performance = typeof window !== 'undefined' ? window.performance : {};

performance.now = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return Date.now();
};

function TaskScheduler() {}

TaskScheduler_maxTimePerFrame = 50;;

// Engine loop must be disabled while running this
exports.each = TaskScheduler_each = function TaskScheduler_each(queue) {
    return (0, _PromiseUtils.createPromise)(function (resolve) {
        var i = 0;

        function process() {
            var startTime = performance.now();
            while (i < queue.length && performance.now() - startTime < TaskScheduler_maxTimePerFrame) {
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
};;

exports.each = TaskScheduler_each;
exports.TaskScheduler = TaskScheduler;
