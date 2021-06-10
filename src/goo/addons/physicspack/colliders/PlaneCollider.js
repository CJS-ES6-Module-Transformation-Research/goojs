var mod_PlaneCollider = PlaneCollider;
import { Collider as Collider_Collider } from "../../../addons/physicspack/colliders/Collider";

/**
 * Plane collider, that faces in the Z direction.
 * @extends Collider
 */
function PlaneCollider() {
	Collider_Collider.call(this);
}
PlaneCollider.prototype = Object.create(Collider_Collider.prototype);
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
export { mod_PlaneCollider as PlaneCollider };
