Object.defineProperty(exports, "__esModule", {
  value: true
});
var exported_Collider = Collider;
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

/**
 * Base class for Colliders.
 */
exports.Collider = exported_Collider;
