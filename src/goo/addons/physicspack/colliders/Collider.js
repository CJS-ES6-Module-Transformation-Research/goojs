"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Collider() {}

/**
 * @virtual
 * @returns {Collider}
 */
Collider.prototype.clone = function () {
  return new Collider();
};

/**
 * @private
 * @virtual
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
Collider.prototype.transform = function () /*transform, targetCollider*/{};

var exported_Collider = Collider;

/**
 * Base class for Colliders.
 */
exports.Collider = exported_Collider;
