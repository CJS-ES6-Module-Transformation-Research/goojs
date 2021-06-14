import { PromiseUtils as PromiseUtils_PromiseUtils } from "../util/PromiseUtils";
var TaskScheduler_each;
var maxTimePerFrame;

var performance = typeof(window) !== 'undefined' ? window.performance : {};

performance.now = (
	performance.now ||
	performance.mozNow ||
	performance.msNow ||
	performance.oNow ||
	performance.webkitNow ||
	function () {
		return Date.now();
	}
);

function TaskScheduler() {}

maxTimePerFrame = 50;

// Engine loop must be disabled while running this
TaskScheduler_each = function (queue) {
	return PromiseUtils_PromiseUtils.createPromise(function (resolve) {
		var i = 0;

		function process() {
			var startTime = performance.now();
			while (i < queue.length && performance.now() - startTime < maxTimePerFrame) {
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

export { TaskScheduler_each as each, TaskScheduler };