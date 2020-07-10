var MeshCollider_MeshCollider = MeshCollider;
import { Collider as addonsphysicspackcollidersCollider_Colliderjs } from "../../../addons/physicspack/colliders/Collider";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
function MeshCollider(settings) {
	settings = settings || {};

	/**
	 * @type {MeshData}
	 */
	this.meshData = settings.meshData;

	/**
	 * @type {Vector3}
	 */
	this.scale = settings.scale !== undefined ? new mathVector3_Vector3js(settings.scale) : new mathVector3_Vector3js(1, 1, 1);

	addonsphysicspackcollidersCollider_Colliderjs.call(this);
}
MeshCollider.prototype = Object.create(addonsphysicspackcollidersCollider_Colliderjs.prototype);
MeshCollider.prototype.constructor = MeshCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
MeshCollider.prototype.transform = function (transform, targetCollider) {
	targetCollider.scale.set(this.scale).mul(transform.scale);
};

/**
 * @returns {MeshCollider}
 */
MeshCollider.prototype.clone = function () {
	return new MeshCollider({
		meshData: this.meshData,
		scale: this.scale
	});
};

/**
 * Physics mesh collider.
 * @param {Object} [settings]
 * @param {MeshData} [settings.meshData]
 * @param {Vector3} [settings.scale]
 * @extends Collider
 */
export { MeshCollider_MeshCollider as MeshCollider };
