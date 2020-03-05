"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Joint = undefined;

var _Transform = require("../math/Transform");

function Joint(name) {
	this._name = name;

	this._index = 0;
	this._parentIndex = Joint.NO_PARENT;
	this._inverseBindPose = new _Transform.Transform();
}

Joint.NO_PARENT = -32768;

var exported_Joint = Joint;

/**
 * Representation of a Joint in a Skeleton. Meant to be used within a specific Skeleton object.
 * @param {string} name Name of joint
 */
exports.Joint = exported_Joint;
