Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RaycastResult;

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Structure used to get information back from a raycast.
 * @param {Object} [settings]
 * @param {Vector3} [settings.normal]
 * @param {Vector3} [settings.point]
 * @param {Entity} [settings.entity]
 * @param {number} [settings.distance]
 */
function RaycastResult(settings) {
  settings = settings || {};

  /**
   * The impact point in world space where the ray hit the collider.
   * @type {Vector3}
   */
  this.point = settings.point ? new _Vector2.default(settings.point) : new _Vector2.default();

  /**
   * The normal of the surface the ray hit.
   * @type {Vector3}
   */
  this.normal = settings.normal ? new _Vector2.default(settings.normal) : new _Vector2.default();

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
module.exports = exports.default;
