"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaneCollider = undefined;

var _Collider = require("../../../addons/physicspack/colliders/Collider");

var mod_PlaneCollider = PlaneCollider;

/**
 * Plane collider, that faces in the Z direction.
 * @extends Collider
 */
function PlaneCollider() {
  _Collider.Collider.call(this);
}
PlaneCollider.prototype = Object.create(_Collider.Collider.prototype);
PlaneCollider.prototype.constructor = PlaneCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
PlaneCollider.prototype.transform = function () /*transform, targetCollider*/{};

/**
 * @returns {PlaneCollider}
 */
PlaneCollider.prototype.clone = function () {
  return new PlaneCollider();
};

/**
 * Plane collider, that faces in the Z direction.
 * @extends Collider
 */
exports.PlaneCollider = mod_PlaneCollider;