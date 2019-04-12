Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BallJoint;

var _PhysicsJoint = require("../../../addons/physicspack/joints/PhysicsJoint");

var _PhysicsJoint2 = _interopRequireDefault(_PhysicsJoint);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A physics ball joint. A ball joint (or "constraint") will try to keep a point in each of two connected bodies the same.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
function BallJoint(settings) {
  settings = settings || {};
  _PhysicsJoint2.default.call(this, settings);

  /**
   * @type {Vector3}
   */
  this.localPivot = settings.localPivot ? _Vector2.default.fromAny(settings.localPivot) : new _Vector2.default(0, 0.5, 0);

  /**
   * Automatically compute the connectedLocalPivot by using the entities initial transforms.
   * @type {boolean}
   * @default true
   */
  this.autoConfigureConnectedPivot = settings.autoConfigureConnectedPivot ? settings.autoConfigureConnectedPivot : true;

  /**
   * The pivot point defined inside the connected entity.
   * @type {Vector3}
   */
  this.connectedLocalPivot = settings.connectedLocalPivot ? _Vector2.default.fromAny(settings.connectedLocalPivot) : new _Vector2.default(0, 0.5, 0);
}

BallJoint.prototype = Object.create(_PhysicsJoint2.default.prototype);
BallJoint.prototype.constructor = BallJoint;
module.exports = exports.default;
