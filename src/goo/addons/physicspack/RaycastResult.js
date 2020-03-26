import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function RaycastResult(settings) {
	settings = settings || {};

	/**
	 * The impact point in world space where the ray hit the collider.
	 * @type {Vector3}
	 */
	this.point = settings.point ? new mathVector3_Vector3js(settings.point) : new mathVector3_Vector3js();

	/**
	 * The normal of the surface the ray hit.
	 * @type {Vector3}
	 */
	this.normal = settings.normal ? new mathVector3_Vector3js(settings.normal) : new mathVector3_Vector3js();

	/**
	 * The Collider that was hit.
	 * @type {Entity}
	 */
	this.entity = settings.entity || null;

	/**
	 * The distance from the ray's origin to the impact point.
	 * @type {number}
	 * @default -1
	 */
	this.distance = settings.distance || -1;
}

RaycastResult.prototype.reset = function () {
	this.entity = null;
	this.distance = -1;
};

var exported_RaycastResult = RaycastResult;

/**
 * Structure used to get information back from a raycast.
 * @param {Object} [settings]
 * @param {Vector3} [settings.normal]
 * @param {Vector3} [settings.point]
 * @param {Entity} [settings.entity]
 * @param {number} [settings.distance]
 */
export { exported_RaycastResult as RaycastResult };