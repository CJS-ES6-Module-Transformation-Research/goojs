"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function AbstractState() {
	this._globalStartTime = 0;
	this.onFinished = null;
}

AbstractState.prototype.update = function () {};
AbstractState.prototype.postUpdate = function () {};
AbstractState.prototype.getCurrentSourceData = function () {};

AbstractState.prototype.resetClips = function (globalTime) {
	this._globalStartTime = globalTime;
};

AbstractState.prototype.shiftClipTime = function (shiftTime) {
	this._globalStartTime += shiftTime;
};

var exported_AbstractState = AbstractState;

/**
 * Base class for a state in our animation system
 * @private
 */
exports.AbstractState = exported_AbstractState;
