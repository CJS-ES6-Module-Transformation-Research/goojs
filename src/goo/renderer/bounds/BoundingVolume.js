Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BoundingVolume = exports.Intersects = exports.Inside = exports.Outside = undefined;

var _Vector = require("../../math/Vector3");

var BoundingVolume_Intersects;
var BoundingVolume_Inside;
var BoundingVolume_Outside;
function BoundingVolume(center) {
	//! AT: this is one of the few classes that's cloning its input
	// I don't dare change the behaviour since there's no telling what will break
	this.center = new _Vector.Vector3();
	if (center) {
		this.center.set(center);
	}

	//! AT: can these be private?
	// they are updated only by some methods and would therefore be useless for external use
	this.min = new _Vector.Vector3(Infinity, Infinity, Infinity);
	this.max = new _Vector.Vector3(-Infinity, -Infinity, -Infinity);
}

/**
 * Sets the state to its initial value.
 * @returns {BoundingVolume}
 */
BoundingVolume.prototype.reset = function () {
	this.center.setDirect(0, 0, 0);
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
exports.Outside = BoundingVolume_Outside = 0;;
exports.Inside = BoundingVolume_Inside = 1;;
exports.Intersects = BoundingVolume_Intersects = 2;;

exports.Outside = BoundingVolume_Outside;
exports.Inside = BoundingVolume_Inside;
exports.Intersects = BoundingVolume_Intersects;

var exported_BoundingVolume = BoundingVolume;

/**
 * <code>BoundingVolume</code> Base class for boundings
 */
exports.BoundingVolume = exported_BoundingVolume;
