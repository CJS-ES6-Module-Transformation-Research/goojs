import { Collider } from "../../../addons/physicspack/colliders/Collider";
var exported_PlaneCollider = PlaneCollider;
function PlaneCollider() {
	Collider.call(this);
}
PlaneCollider.prototype = Object.create(Collider.prototype);
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
export { exported_PlaneCollider as PlaneCollider };
