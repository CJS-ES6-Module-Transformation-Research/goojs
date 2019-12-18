Object.defineProperty(exports, "__esModule", {
    value: true
});
var functionObject_initPointerLockShims;
var functionObject_initFullscreenShims;
var functionObject_initAnimationShims;
var functionObject_initWebGLShims;
var functionObject_initAllShims;
var functionObject_clearVisibilityChangeListeners;
var functionObject_addVisibilityChangeListener;
var functionObject_togglePointerLock;
var functionObject_exitPointerLock;
var functionObject_requestPointerLock;
var functionObject_toggleFullScreen;
var functionObject_exitFullScreen;
var functionObject_requestFullScreen;
var functionObject_supported;
/**
 * Shims for standard gaming features
 * Only used to define the class. Should never be instantiated.
 */
function GameUtils() {}

functionObject_supported = {
    fullscreen: true,
    pointerLock: true
};

functionObject_requestFullScreen = function functionObject_requestFullScreen() {
    if (!document.fullscreenElement && document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    }
};

functionObject_exitFullScreen = function functionObject_exitFullScreen() {
    if (document.fullscreenElement && document.cancelFullScreen) {
        document.cancelFullScreen();
    }
};

exports.toggleFullScreen = functionObject_toggleFullScreen = function functionObject_toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
    }
};

exports.requestPointerLock = functionObject_requestPointerLock = function functionObject_requestPointerLock(optionalTarget) {
    var target = optionalTarget || document.documentElement;
    if (target.requestPointerLock) {
        target.requestPointerLock();
    }
};

exports.exitPointerLock = functionObject_exitPointerLock = function functionObject_exitPointerLock() {
    if (document.exitPointerLock) {
        document.exitPointerLock();
    }
};

exports.togglePointerLock = functionObject_togglePointerLock = function functionObject_togglePointerLock(optionalTarget) {
    if (!document.pointerLockElement) {
        functionObject_requestPointerLock(optionalTarget);
    } else {
        functionObject_exitPointerLock();
    }
};

var visibilityChangeListeners = [];

exports.addVisibilityChangeListener = functionObject_addVisibilityChangeListener = function functionObject_addVisibilityChangeListener(callback) {
    if (typeof callback !== "function") {
        return;
    }

    var vendors = ["", "ms", "moz", "webkit"];

    var hidden, visibilityChange;
    for (var x = 0; x < vendors.length; ++x) {
        var hiddenAttribute = vendors[x] + (vendors[x].length === 0 ? "hidden" : "Hidden");
        var visibilityAttribute = vendors[x] + "visibilitychange";

        if (typeof document[hiddenAttribute] !== "undefined") {
            hidden = hiddenAttribute;
            visibilityChange = visibilityAttribute;
            break;
        }
    }

    if (typeof document.addEventListener !== "undefined" && typeof hidden !== "undefined") {
        var eventListener = function eventListener() {
            if (document[hidden]) {
                callback(true);
            } else {
                callback(false);
            }
        };
        visibilityChangeListeners.push({
            eventName: visibilityChange,
            eventListener: eventListener
        });
        document.addEventListener(visibilityChange, eventListener);
    }
};

exports.clearVisibilityChangeListeners = functionObject_clearVisibilityChangeListeners = function functionObject_clearVisibilityChangeListeners() {
    visibilityChangeListeners.forEach(function (listener) {
        document.removeEventListener(listener.eventName, listener.eventListener);
    });
    visibilityChangeListeners = [];
};

exports.initAllShims = functionObject_initAllShims = function functionObject_initAllShims(global) {
    functionObject_initWebGLShims();
    functionObject_initAnimationShims();
    functionObject_initFullscreenShims(global);
    functionObject_initPointerLockShims(global);
};

functionObject_initWebGLShims = function functionObject_initWebGLShims() {
    window.Uint8ClampedArray = window.Uint8ClampedArray || window.Uint8Array;
};

functionObject_initAnimationShims = function functionObject_initAnimationShims() {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (window.requestAnimationFrame === undefined) {
        window.requestAnimationFrame = function (callback) {
            var currTime = Date.now(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (window.cancelAnimationFrame === undefined) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
};

functionObject_initFullscreenShims = function functionObject_initFullscreenShims(global) {
    global = global || window;
    var elementPrototype = (global.HTMLElement || global.Element).prototype;

    if (!document.hasOwnProperty("fullscreenEnabled")) {
        var getter = function () {
            if ("webkitIsFullScreen" in document) {
                return function () {
                    return document.webkitFullscreenEnabled;
                };
            }
            if ("mozFullScreenEnabled" in document) {
                return function () {
                    return document.mozFullScreenEnabled;
                };
            }

            functionObject_supported.fullscreen = false;

            return function () {
                return false;
            };
        }();

        Object.defineProperty(document, "fullscreenEnabled", {
            enumerable: true,
            configurable: false,
            writeable: false,
            get: getter
        });
    }

    if (!document.hasOwnProperty("fullscreenElement")) {
        var getter = function () {
            var name = ["webkitCurrentFullScreenElement", "webkitFullscreenElement", "mozFullScreenElement"];

            var getNameInDocument = function getNameInDocument(i) {
                return function () {
                    return document[name[i]];
                };
            };

            for (var i = 0; i < name.length; i++) {
                if (name[i] in document) {
                    return getNameInDocument(i);
                }
            }
            return function () {
                return null;
            };
        }();

        Object.defineProperty(document, "fullscreenElement", {
            enumerable: true,
            configurable: false,
            writeable: false,
            get: getter
        });
    }

    function fullscreenchange() {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("fullscreenchange", true, false, null);
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitfullscreenchange", fullscreenchange, false);
    document.addEventListener("mozfullscreenchange", fullscreenchange, false);

    function fullscreenerror() {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("fullscreenerror", true, false, null);
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitfullscreenerror", fullscreenerror, false);
    document.addEventListener("mozfullscreenerror", fullscreenerror, false);

    if (!elementPrototype.requestFullScreen) {
        elementPrototype.requestFullScreen = function () {
            if (elementPrototype.msRequestFullscreen) {
                return function () {
                    this.msRequestFullscreen();
                };
            }

            if (elementPrototype.webkitRequestFullscreen) {
                return function () {
                    this.webkitRequestFullscreen(global.Element.ALLOW_KEYBOARD_INPUT);
                };
            }

            if (elementPrototype.webkitRequestFullScreen) {
                return function () {
                    this.webkitRequestFullScreen(global.Element.ALLOW_KEYBOARD_INPUT);
                };
            }

            if (elementPrototype.mozRequestFullScreen) {
                return function () {
                    this.mozRequestFullScreen();
                };
            }

            return function () {};
        }();
    }

    if (!document.cancelFullScreen) {
        document.cancelFullScreen = function () {
            return document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {};
        }();
    }
};

functionObject_initPointerLockShims = function functionObject_initPointerLockShims(global) {
    global = global || window;
    var elementPrototype = (global.HTMLElement || global.Element).prototype;

    if (!global.MouseEvent) {
        return;
    }

    var mouseEventPrototype = global.MouseEvent.prototype;

    if (!("movementX" in mouseEventPrototype)) {
        Object.defineProperty(mouseEventPrototype, "movementX", {
            enumerable: true,
            configurable: false,
            writeable: false,

            get: function get() {
                return this.webkitMovementX || this.mozMovementX || 0;
            }
        });
    }

    if (!("movementY" in mouseEventPrototype)) {
        Object.defineProperty(mouseEventPrototype, "movementY", {
            enumerable: true,
            configurable: false,
            writeable: false,

            get: function get() {
                return this.webkitMovementY || this.mozMovementY || 0;
            }
        });
    }

    if (!navigator.pointer) {
        navigator.pointer = navigator.webkitPointer || navigator.mozPointer;
    }

    function pointerlockchange() {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("pointerlockchange", true, false, null);
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlocklost", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlocklost", pointerlockchange, false);

    function pointerlockerror() {
        var newEvent = document.createEvent("CustomEvent");
        newEvent.initCustomEvent("pointerlockerror", true, false, null);
        document.dispatchEvent(newEvent);
    }
    document.addEventListener("webkitpointerlockerror", pointerlockerror, false);
    document.addEventListener("mozpointerlockerror", pointerlockerror, false);

    if (!("pointerLockElement" in document)) {
        var getter = function () {
            if ("webkitPointerLockElement" in document) {
                return function () {
                    return document.webkitPointerLockElement;
                };
            }
            if ("mozPointerLockElement" in document) {
                return function () {
                    return document.mozPointerLockElement;
                };
            }
            return function () {
                return null;
            };
        }();

        Object.defineProperty(document, "pointerLockElement", {
            enumerable: true,
            configurable: false,
            writeable: false,
            get: getter
        });
    }

    if (!elementPrototype.requestPointerLock) {
        elementPrototype.requestPointerLock = function () {
            if (elementPrototype.webkitRequestPointerLock) {
                return function () {
                    this.webkitRequestPointerLock();
                };
            }

            if (elementPrototype.mozRequestPointerLock) {
                return function () {
                    this.mozRequestPointerLock();
                };
            }

            if (navigator.pointer) {
                return function () {
                    navigator.pointer.lock(this, pointerlockchange, pointerlockerror);
                };
            }

            functionObject_supported.pointerLock = false;

            return function () {};
        }();
    }

    if (!document.exitPointerLock) {
        document.exitPointerLock = function () {
            return document.webkitExitPointerLock || document.mozExitPointerLock || function () {
                if (navigator.pointer) {
                    navigator.pointer.unlock();
                }
            };
        }();
    }
};

exports.toggleFullScreen = functionObject_toggleFullScreen;
exports.requestPointerLock = functionObject_requestPointerLock;
exports.exitPointerLock = functionObject_exitPointerLock;
exports.togglePointerLock = functionObject_togglePointerLock;
exports.addVisibilityChangeListener = functionObject_addVisibilityChangeListener;
exports.clearVisibilityChangeListeners = functionObject_clearVisibilityChangeListeners;
exports.initAllShims = functionObject_initAllShims;
