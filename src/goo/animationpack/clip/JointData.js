"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.JointData = undefined;

var _TransformData = require("../../animationpack/clip/TransformData");

function JointData(source) {
	_TransformData.TransformData.call(this, source);
	this._jointIndex = source ? source._jointIndex : 0;
}

JointData.prototype = Object.create(_TransformData.TransformData.prototype);
JointData.prototype.constructor = JointData;

/**
 * Copy the jointData's values into this transform data object.
 * @param {JointData} jointData our source to copy. Must not be null.
 */
JointData.prototype.set = function (jointData) {
	_TransformData.TransformData.prototype.set.call(this, jointData);
	this._jointIndex = jointData._jointIndex;
};

/**
 * Blend this transform with the given transform.
 * @param {TransformData} blendTo The transform to blend to
 * @param {number} blendWeight The blend weight
 * @param {TransformData} store The transform store.
 * @returns {TransformData} The blended transform.
 */
JointData.prototype.blend = function (blendTo, blendWeight, store) {
	var rVal = store;
	if (!rVal) {
		rVal = new JointData();
		rVal._jointIndex = this._jointIndex;
	} else if (rVal instanceof JointData) {
		rVal._jointIndex = this._jointIndex;
	}
	return _TransformData.TransformData.prototype.blend.call(this, blendTo, blendWeight, rVal);
};

JointData.prototype.clone = function () {
	return new JointData(this);
};

var exported_JointData = JointData;

/**
 * Describes transform of a joint.
 * @param {JointData} [source] source to copy
 */
exports.JointData = exported_JointData;
