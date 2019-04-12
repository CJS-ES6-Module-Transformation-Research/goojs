Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeshCollider;

var _Collider = require("../../../addons/physicspack/colliders/Collider");

var _Collider2 = _interopRequireDefault(_Collider);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Physics mesh collider.
 * @param {Object} [settings]
 * @param {MeshData} [settings.meshData]
 * @param {Vector3} [settings.scale]
 * @extends Collider
 */
function MeshCollider(settings) {
  settings = settings || {};

  /**
   * @type {MeshData}
   */
  this.meshData = settings.meshData;

  /**
   * @type {Vector3}
   */
  this.scale = settings.scale !== undefined ? new _Vector2.default(settings.scale) : new _Vector2.default(1, 1, 1);

  _Collider2.default.call(this);
}

MeshCollider.prototype = Object.create(_Collider2.default.prototype);
MeshCollider.prototype.constructor = MeshCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
MeshCollider.prototype.transform = function (transform, targetCollider) {
  targetCollider.scale.set(this.scale).mul(transform.scale);
};

/**
 * @returns {MeshCollider}
 */
MeshCollider.prototype.clone = function () {
  return new MeshCollider({
    meshData: this.meshData,
    scale: this.scale
  });
};
module.exports = exports.default;
