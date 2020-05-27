"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var AbstractState_AbstractState = AbstractState;
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

/**
 * Base class for a state in our animation system
 * @private
 */
exports.AbstractState = AbstractState_AbstractState;