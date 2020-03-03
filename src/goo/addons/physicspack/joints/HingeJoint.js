import { PhysicsJoint as PhysicsJoint_PhysicsJointjs } from "../../../addons/physicspack/joints/PhysicsJoint";
import { Vector3 as Vector3js } from "../../../math/Vector3";
function HingeJoint(settings) {
	settings = settings || {};
	PhysicsJoint_PhysicsJointjs.call(this, settings);

	/**
	 * A point defined locally in the entity that the Hinge should rotate around.
	 * @type {Vector3}
	 */
	this.localPivot = settings.localPivot ? new Vector3js(settings.localPivot) : new Vector3js(0, 0.5, 0);

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
	this.connectedLocalPivot = settings.connectedLocalPivot ? new Vector3js(settings.connectedLocalPivot) : new Vector3js();

	/**
	 * @type {Vector3}
	 */
	this.localAxis = settings.localAxis ? new Vector3js(settings.localAxis) : new Vector3js(1, 0, 0);
}
HingeJoint.prototype = Object.create(PhysicsJoint_PhysicsJointjs.prototype);
HingeJoint.prototype.constructor = HingeJoint;

var exported_HingeJoint = HingeJoint;

/**
 * Physics hinge joint. To be added to a {@link RigidBodyComponent}.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Vector3} [settings.localAxis]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
export { exported_HingeJoint as HingeJoint };
