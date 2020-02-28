import { PhysicsJoint as PhysicsJoint_PhysicsJointjs } from "../../../addons/physicspack/joints/PhysicsJoint";
import { Vector3 as Vector3js } from "../../../math/Vector3";
function BallJoint(settings) {
	settings = settings || {};
	PhysicsJoint_PhysicsJointjs.call(this, settings);

	/**
	 * @type {Vector3}
	 */
	this.localPivot = settings.localPivot ? Vector3js_fromAny(settings.localPivot) : new Vector3js(0, 0.5, 0);

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
	this.connectedLocalPivot = settings.connectedLocalPivot ? Vector3js_fromAny(settings.connectedLocalPivot) : new Vector3js(0, 0.5, 0);
}

BallJoint.prototype = Object.create(PhysicsJoint_PhysicsJointjs.prototype);
BallJoint.prototype.constructor = BallJoint;

var exported_BallJoint = BallJoint;

/**
 * A physics ball joint. A ball joint (or "constraint") will try to keep a point in each of two connected bodies the same.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
export { exported_BallJoint as BallJoint };
