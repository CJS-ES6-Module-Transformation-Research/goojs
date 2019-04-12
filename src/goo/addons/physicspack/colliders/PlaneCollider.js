Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlaneCollider;

var _Collider = require("../../../addons/physicspack/colliders/Collider");

var _Collider2 = _interopRequireDefault(_Collider);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Plane collider, that faces in the Z direction.
 * @extends Collider
 */
function PlaneCollider() {
  _Collider2.default.call(this);
}

PlaneCollider.prototype = Object.create(_Collider2.default.prototype);
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
module.exports = exports.default;
