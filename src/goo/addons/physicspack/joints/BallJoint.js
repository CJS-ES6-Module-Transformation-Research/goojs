var mod_BallJoint = BallJoint;
import { PhysicsJoint as PhysicsJoint_PhysicsJoint } from "../../../addons/physicspack/joints/PhysicsJoint";
import { Vector3 as Vector3_Vector3 } from "../../../math/Vector3";

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
	PhysicsJoint_PhysicsJoint.call(this, settings);

	/**
	 * @type {Vector3}
	 */
	this.localPivot = settings.localPivot ? Vector3_Vector3.fromAny(settings.localPivot) : new Vector3_Vector3(0, 0.5, 0);

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
	this.connectedLocalPivot = settings.connectedLocalPivot ? Vector3_Vector3.fromAny(settings.connectedLocalPivot) : new Vector3_Vector3(0, 0.5, 0);
}

BallJoint.prototype = Object.create(PhysicsJoint_PhysicsJoint.prototype);
BallJoint.prototype.constructor = BallJoint;

/**
 * A physics ball joint. A ball joint (or "constraint") will try to keep a point in each of two connected bodies the same.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
export { mod_BallJoint as BallJoint };
