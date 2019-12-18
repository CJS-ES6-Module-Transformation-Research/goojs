var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var config = {};

var browserGlobal = typeof window !== 'undefined' ? window : {};
var MutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;

if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	config.async = function (callback, binding) {
		process.nextTick(function () {
			callback.call(binding);
		});
	};
} else if (MutationObserver) {
	var queue = [];

	var observer = new MutationObserver(function () {
		var toProcess = queue.slice();
		queue = [];

		toProcess.forEach(function (tuple) {
			var callback = tuple[0],
			    binding = tuple[1];
			callback.call(binding);
		});
	});

	var element = document.createElement('div');
	observer.observe(element, { attributes: true });

	// Chrome Memory Leak: https://bugs.webkit.org/show_bug.cgi?id=93661
	window.addEventListener('unload', function () {
		observer.disconnect();
		observer = null;
	});

	config.async = function (callback, binding) {
		queue.push([callback, binding]);
		element.setAttribute('drainQueue', 'drainQueue');
	};
} else {
	config.async = function (callback, binding) {
		setTimeout(function () {
			callback.call(binding);
		}, 1);
	};
}

var Event = function Event(type, options) {
	this.type = type;

	for (var option in options) {
		if (!options.hasOwnProperty(option)) {
			continue;
		}

		this[option] = options[option];
	}
};

var indexOf = function indexOf(callbacks, callback) {
	for (var i = 0, l = callbacks.length; i < l; i++) {
		if (callbacks[i][0] === callback) {
			return i;
		}
	}

	return -1;
};

var callbacksFor = function callbacksFor(object) {
	var callbacks = object._promiseCallbacks;

	if (!callbacks) {
		callbacks = object._promiseCallbacks = {};
	}

	return callbacks;
};

var EventTarget = {
	mixin: function mixin(object) {
		object.on = this.on;
		object.off = this.off;
		object.trigger = this.trigger;
		return object;
	},

	on: function on(eventNames, callback, binding) {
		var allCallbacks = callbacksFor(this),
		    callbacks,
		    eventName;
		eventNames = eventNames.split(/\s+/);
		binding = binding || this;

		while (eventName = eventNames.shift()) {
			callbacks = allCallbacks[eventName];

			if (!callbacks) {
				callbacks = allCallbacks[eventName] = [];
			}

			if (indexOf(callbacks, callback) === -1) {
				callbacks.push([callback, binding]);
			}
		}
	},

	off: function off(eventNames, callback) {
		var allCallbacks = callbacksFor(this),
		    callbacks,
		    eventName,
		    index;
		eventNames = eventNames.split(/\s+/);

		while (eventName = eventNames.shift()) {
			if (!callback) {
				allCallbacks[eventName] = [];
				continue;
			}

			callbacks = allCallbacks[eventName];

			index = indexOf(callbacks, callback);

			if (index !== -1) {
				callbacks.splice(index, 1);
			}
		}
	},

	trigger: function trigger(eventName, options) {
		var allCallbacks = callbacksFor(this),
		    callbacks,
		    callbackTuple,
		    callback,
		    binding,
		    event;

		if (callbacks = allCallbacks[eventName]) {
			for (var i = 0, l = callbacks.length; i < l; i++) {
				callbackTuple = callbacks[i];
				callback = callbackTuple[0];
				binding = callbackTuple[1];

				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
					options = { detail: options };
				}

				event = new Event(eventName, options);
				callback.call(binding, event);
			}
		}
	}
};

var Promise = function Promise() {
	this.on('promise:resolved', function (event) {
		this.trigger('success', { detail: event.detail });
	}, this);

	this.on('promise:failed', function (event) {
		this.trigger('error', { detail: event.detail });
	}, this);
};

var noop = function noop() {};

var invokeCallback = function invokeCallback(type, promise, callback, event) {
	var hasCallback = typeof callback === 'function',
	    value,
	    error,
	    succeeded,
	    failed;

	if (hasCallback) {
		try {
			value = callback(event.detail);
			succeeded = true;
		} catch (e) {
			failed = true;
			error = e;
		}
	} else {
		value = event.detail;
		succeeded = true;
	}

	if (value && typeof value.then === 'function') {
		value.then(function (value) {
			promise.resolve(value);
		}, function (error) {
			promise.reject(error);
		});
	} else if (hasCallback && succeeded) {
		promise.resolve(value);
	} else if (failed) {
		promise.reject(error);
	} else {
		promise[type](value);
	}
};

Promise.prototype = {
	then: function then(done, fail) {
		var thenPromise = new Promise();

		if (this.isResolved) {
			config.async(function () {
				invokeCallback('resolve', thenPromise, done, { detail: this.resolvedValue });
			}, this);
		}

		if (this.isRejected) {
			config.async(function () {
				invokeCallback('reject', thenPromise, fail, { detail: this.rejectedValue });
			}, this);
		}

		this.on('promise:resolved', function (event) {
			invokeCallback('resolve', thenPromise, done, event);
		});

		this.on('promise:failed', function (event) {
			invokeCallback('reject', thenPromise, fail, event);
		});

		return thenPromise;
	},

	resolve: function resolve(value) {
		_resolve(this, value);

		this.resolve = noop;
		this.reject = noop;
	},

	reject: function reject(value) {
		_reject(this, value);

		this.resolve = noop;
		this.reject = noop;
	}
};

function _resolve(promise, value) {
	config.async(function () {
		promise.trigger('promise:resolved', { detail: value });
		promise.isResolved = true;
		promise.resolvedValue = value;
	});
}

function _reject(promise, value) {
	config.async(function () {
		promise.trigger('promise:failed', { detail: value });
		promise.isRejected = true;
		promise.rejectedValue = value;
	});
}

function all(promises) {
	var i,
	    results = [];
	var allPromise = new Promise();
	var remaining = promises.length;

	if (remaining === 0) {
		allPromise.resolve([]);
	}

	var resolve = function resolve(index, value) {
		results[index] = value;
		if (--remaining === 0) {
			allPromise.resolve(results);
		}
	};

	var resolver = function resolver(index) {
		return function (value) {
			resolve(index, value);
		};
	};

	var reject = function reject(error) {
		allPromise.reject(error);
	};

	for (i = 0; i < remaining; i++) {
		promises[i].then(resolver(i), reject);
	}
	return allPromise;
}

EventTarget.mixin(Promise.prototype);

function configure(name, value) {
	config[name] = value;
}

var anonymus_obj = {
	Promise: Promise,
	Event: Event,
	EventTarget: EventTarget,
	all: all,
	configure: configure
};

var exported_Promise = Promise;
var exported_Event = Event;
var exported_EventTarget = EventTarget;
var exported_all = all;
var exported_configure = configure;
exports.Promise = exported_Promise;
exports.all = exported_all;
