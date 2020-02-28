import { Vector3 as Vector3js } from "../../../math/Vector3";
import { Collider as Colliderjs } from "../../../addons/physicspack/colliders/Collider";
function BoxCollider(settings) {
	settings = settings || {};

	/**
	 * @type {Vector3}
	 */
	this.halfExtents = settings.halfExtents ? new Vector3js(settings.halfExtents) : new Vector3js(0.5, 0.5, 0.5);

	Colliderjs.call(this);
}
BoxCollider.prototype = Object.create(Colliderjs.prototype);
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

var exported_BoxCollider = BoxCollider;

/**
 * Physics box collider.
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Collider
 */
export { exported_BoxCollider as BoxCollider };
