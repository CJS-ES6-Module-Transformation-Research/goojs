var BoxCollider_BoxCollider = BoxCollider;
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
import { Collider as addonsphysicspackcollidersCollider_Colliderjs } from "../../../addons/physicspack/colliders/Collider";
function BoxCollider(settings) {
	settings = settings || {};

	/**
	 * @type {Vector3}
	 */
	this.halfExtents = settings.halfExtents ? new mathVector3_Vector3js(settings.halfExtents) : new mathVector3_Vector3js(0.5, 0.5, 0.5);

	addonsphysicspackcollidersCollider_Colliderjs.call(this);
}
BoxCollider.prototype = Object.create(addonsphysicspackcollidersCollider_Colliderjs.prototype);
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

/**
 * Physics box collider.
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Collider
 */
export { BoxCollider_BoxCollider as BoxCollider };
