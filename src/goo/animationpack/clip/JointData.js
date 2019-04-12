Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = JointData;

var _TransformData = require("../../animationpack/clip/TransformData");

var _TransformData2 = _interopRequireDefault(_TransformData);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Describes transform of a joint.
 * @param {JointData} [source] source to copy
 */
function JointData(source) {
	_TransformData2.default.call(this, source);
	this._jointIndex = source ? source._jointIndex : 0;
}

JointData.prototype = Object.create(_TransformData2.default.prototype);
JointData.prototype.constructor = JointData;

/**
 * Copy the jointData's values into this transform data object.
 * @param {JointData} jointData our source to copy. Must not be null.
 */
JointData.prototype.set = function (jointData) {
	_TransformData2.default.prototype.set.call(this, jointData);
	this._jointIndex = jointData._jointIndex;
};

/**
 * Blend this transform with the given transform.
 * @param {TransformData} blendTo The transform to blend to
 * @param {number} blendWeight The blend weight
 * @param {TransformData} store The transform store.
 * @returns {TransformData} The blended transform.
 */
JointData.prototype.blend = function (blendTo, blendWeight, store) {
	var rVal = store;
	if (!rVal) {
		rVal = new JointData();
		rVal._jointIndex = this._jointIndex;
	} else if (rVal instanceof JointData) {
		rVal._jointIndex = this._jointIndex;
	}
	return _TransformData2.default.prototype.blend.call(this, blendTo, blendWeight, rVal);
};

JointData.prototype.clone = function () {
	return new JointData(this);
};
module.exports = exports.default;
