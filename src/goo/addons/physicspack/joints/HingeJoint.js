Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HingeJoint;

var _PhysicsJoint = require("../../../addons/physicspack/joints/PhysicsJoint");

var _PhysicsJoint2 = _interopRequireDefault(_PhysicsJoint);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Physics hinge joint. To be added to a {@link RigidBodyComponent}.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Vector3} [settings.localAxis]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
function HingeJoint(settings) {
  settings = settings || {};
  _PhysicsJoint2.default.call(this, settings);

  /**
   * A point defined locally in the entity that the Hinge should rotate around.
   * @type {Vector3}
   */
  this.localPivot = settings.localPivot ? new _Vector2.default(settings.localPivot) : new _Vector2.default(0, 0.5, 0);

  /**
   * Automatically compute the connectedLocalPivot
   * @type {boolean}
   * @default true
   */
  this.autoConfigureConnectedPivot = settings.autoConfigureConnectedPivot ? settings.autoConfigureConnectedPivot : true;

  /**
   * The pivot point defined inside the connected entity.
   * @type {Vector3}
   */
  this.connectedLocalPivot = settings.connectedLocalPivot ? new _Vector2.default(settings.connectedLocalPivot) : new _Vector2.default();

  /**
   * @type {Vector3}
   */
  this.localAxis = settings.localAxis ? new _Vector2.default(settings.localAxis) : new _Vector2.default(1, 0, 0);
}

HingeJoint.prototype = Object.create(_PhysicsJoint2.default.prototype);
HingeJoint.prototype.constructor = HingeJoint;
module.exports = exports.default;
