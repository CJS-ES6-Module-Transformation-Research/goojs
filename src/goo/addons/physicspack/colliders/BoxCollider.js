Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxCollider = undefined;

var _Vector = require("../../../math/Vector3");

var _Collider = require("../../../addons/physicspack/colliders/Collider");

var exported_BoxCollider = BoxCollider;
function BoxCollider(settings) {
  settings = settings || {};

  /**
   * @type {Vector3}
   */
  this.halfExtents = settings.halfExtents ? new _Vector.Vector3(settings.halfExtents) : new _Vector.Vector3(0.5, 0.5, 0.5);

  _Collider.Collider.call(this);
}
BoxCollider.prototype = Object.create(_Collider.Collider.prototype);
BoxCollider.prototype.constructor = BoxCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
BoxCollider.prototype.transform = function (transform, targetCollider) {
  targetCollider.halfExtents.set(transform.scale).mul(this.halfExtents);
};

/**
 * Clone the collider
 * @returns {BoxCollider}
 */
BoxCollider.prototype.clone = function () {
  return new BoxCollider({
    halfExtents: this.halfExtents
  });
};

/**
 * Physics box collider.
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Collider
 */
exports.BoxCollider = exported_BoxCollider;
