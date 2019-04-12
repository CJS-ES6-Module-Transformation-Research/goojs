Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BoxCollider;

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _Collider = require("../../../addons/physicspack/colliders/Collider");

var _Collider2 = _interopRequireDefault(_Collider);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Physics box collider.
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Collider
 */
function BoxCollider(settings) {
  settings = settings || {};

  /**
   * @type {Vector3}
   */
  this.halfExtents = settings.halfExtents ? new _Vector2.default(settings.halfExtents) : new _Vector2.default(0.5, 0.5, 0.5);

  _Collider2.default.call(this);
}

BoxCollider.prototype = Object.create(_Collider2.default.prototype);
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
module.exports = exports.default;
