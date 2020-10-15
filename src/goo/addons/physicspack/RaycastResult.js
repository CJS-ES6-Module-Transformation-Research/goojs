"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RaycastResult = undefined;

var _Vector = require("../../math/Vector3");

var RaycastResult_RaycastResult = RaycastResult;

function RaycastResult(settings) {
	settings = settings || {};

	/**
  * The impact point in world space where the ray hit the collider.
  * @type {Vector3}
  */
	this.point = settings.point ? new _Vector.Vector3(settings.point) : new _Vector.Vector3();

	/**
  * The normal of the surface the ray hit.
  * @type {Vector3}
  */
	this.normal = settings.normal ? new _Vector.Vector3(settings.normal) : new _Vector.Vector3();

	/**
  * The Collider that was hit.
  * @type {Entity}
  */
	this.entity = settings.entity || null;

	/**
  * The distance from the ray's origin to the impact point.
  * @type {number}
  * @default -1
  */
	this.distance = settings.distance || -1;
}

RaycastResult.prototype.reset = function () {
	this.entity = null;
	this.distance = -1;
};

/**
 * Structure used to get information back from a raycast.
 * @param {Object} [settings]
 * @param {Vector3} [settings.normal]
 * @param {Vector3} [settings.point]
 * @param {Entity} [settings.entity]
 * @param {number} [settings.distance]
 */
exports.RaycastResult = RaycastResult_RaycastResult;