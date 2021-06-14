var mod_MeshCollider = MeshCollider;
import { Collider as Collider_Collider } from "../../../addons/physicspack/colliders/Collider";
import { Vector3 as Vector3_Vector3 } from "../../../math/Vector3";

/**
 * Physics mesh collider.
 * @param {Object} [settings]
 * @param {MeshData} [settings.meshData]
 * @param {Vector3} [settings.scale]
 * @extends Collider
 */
function MeshCollider(settings) {
	settings = settings || {};

	/**
	 * @type {MeshData}
	 */
	this.meshData = settings.meshData;

	/**
	 * @type {Vector3}
	 */
	this.scale = settings.scale !== undefined ? new Vector3_Vector3(settings.scale) : new Vector3_Vector3(1, 1, 1);

	Collider_Collider.call(this);
}
MeshCollider.prototype = Object.create(Collider_Collider.prototype);
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
export { mod_MeshCollider as MeshCollider };
