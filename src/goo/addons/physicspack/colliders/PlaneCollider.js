var PlaneCollider_PlaneCollider = PlaneCollider;
import { Collider as addonsphysicspackcollidersCollider_Colliderjs } from "../../../addons/physicspack/colliders/Collider";
function PlaneCollider() {
	addonsphysicspackcollidersCollider_Colliderjs.call(this);
}
PlaneCollider.prototype = Object.create(addonsphysicspackcollidersCollider_Colliderjs.prototype);
PlaneCollider.prototype.constructor = PlaneCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
PlaneCollider.prototype.transform = function (/*transform, targetCollider*/) {};

/**
 * @returns {PlaneCollider}
 */
PlaneCollider.prototype.clone = function () {
	return new PlaneCollider();
};

/**
 * Plane collider, that faces in the Z direction.
 * @extends Collider
 */
export { PlaneCollider_PlaneCollider as PlaneCollider };
