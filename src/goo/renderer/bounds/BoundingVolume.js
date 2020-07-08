var BoundingVolume_BoundingVolume = BoundingVolume;
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
var BoundingVolume_Intersects;
var BoundingVolume_Inside;
var BoundingVolume_Outside;
function BoundingVolume(center) {
	//! AT: this is one of the few classes that's cloning its input
	// I don't dare change the behaviour since there's no telling what will break
	this.center = new mathVector3_Vector3js();
	if (center) {
		this.center.set(center);
	}

	//! AT: can these be private?
	// they are updated only by some methods and would therefore be useless for external use
	this.min = new mathVector3_Vector3js(Infinity, Infinity, Infinity);
	this.max = new mathVector3_Vector3js(-Infinity, -Infinity, -Infinity);
}

/**
 * Sets the state to its initial value.
 * @returns {BoundingVolume}
 */
BoundingVolume.prototype.reset = function () {
	this.center.setDirect(0,0,0);
	this.min.setDirect(Infinity, Infinity, Infinity);
	this.max.setDirect(-Infinity, -Infinity, -Infinity);
	return this;
};

/**
 * Copies data from another bounding volume
 * @param {BoundingVolume} source
 * @returns {BoundingVolume}
 */
BoundingVolume.prototype.copy = function (source) {
	this.center.copy(source.center);
	this.min.copy(source.min);
	this.min.copy(source.min);
	return this;
};

/**
 * Intersection type
 */
BoundingVolume_Outside = 0;;
BoundingVolume_Inside = 1;;
BoundingVolume_Intersects = 2;;

export { BoundingVolume_Outside as Outside, BoundingVolume_Inside as Inside, BoundingVolume_Intersects as Intersects, BoundingVolume };

/**
 * <code>BoundingVolume</code> Base class for boundings
 */
export { BoundingVolume_BoundingVolume as BoundingVolume };