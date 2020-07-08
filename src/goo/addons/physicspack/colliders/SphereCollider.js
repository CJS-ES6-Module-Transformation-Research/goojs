var SphereCollider_SphereCollider = SphereCollider;
import { Collider as addonsphysicspackcollidersCollider_Colliderjs } from "../../../addons/physicspack/colliders/Collider";
function SphereCollider(settings) {
	settings = settings || {};

	/**
	 * @type {number}
	 */
	this.radius = settings.radius !== undefined ? settings.radius : 0.5;

	addonsphysicspackcollidersCollider_Colliderjs.call(this);
}
SphereCollider.prototype = Object.create(addonsphysicspackcollidersCollider_Colliderjs.prototype);
SphereCollider.prototype.constructor = SphereCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
SphereCollider.prototype.transform = function (transform, targetCollider) {
	var scale = transform.scale;
	targetCollider.radius = this.radius * Math.max(
		Math.abs(scale.x),
		Math.abs(scale.y),
		Math.abs(scale.z)
	);
};

/**
 * @returns {SphereCollider}
 */
SphereCollider.prototype.clone = function () {
	return new SphereCollider({
		radius: this.radius
	});
};

/**
 * @param {Object} [settings]
 * @param {number} [settings.radius=0.5]
 * @extends Collider
 */
export { SphereCollider_SphereCollider as SphereCollider };
