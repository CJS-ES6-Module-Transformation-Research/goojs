Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TransformData;

var _Quaternion = require("../../math/Quaternion");

var _Quaternion2 = _interopRequireDefault(_Quaternion);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Describes a relative transform as a Quaternion-Vector-Vector tuple. We use QVV to make it simpler to do LERP blending.
 * @param {TransformData} [source] source to copy.
 */
function TransformData(source) {
	this._rotation = new _Quaternion2.default().copy(source ? source._rotation : _Quaternion2.default.IDENTITY);
	this._scale = new _Vector2.default().copy(source ? source._scale : _Vector2.default.ONE);
	this._translation = new _Vector2.default().copy(source ? source._translation : _Vector2.default.ZERO);
}

/*
 * Applies the data from this transformdata to supplied transform
 * @param {Transform}
 */
TransformData.prototype.applyTo = function (transform) {
	// No need to set to identity since we overwrite them all
	// transform.setIdentity();
	// TODO: matrix vs quaternion?
	transform.rotation.copyQuaternion(this._rotation);
	transform.scale.set(this._scale);
	transform.translation.set(this._translation);
	transform.update();
};

/**
 * Copy the source's values into this transform data object.
 * @param {TransformData} source our source to copy.
 */
TransformData.prototype.set = function (source) {
	this._rotation.copy(source._rotation);
	this._scale.copy(source._scale);
	this._translation.copy(source._translation);
};

/**
 * Blend this TransformData with the given TransformData.
 * @param {TransformData} blendTo The TransformData to blend to
 * @param {number} blendWeight The blend weight
 * @param {TransformData} store The TransformData store.
 * @returns {TransformData} The blended transform.
 */
TransformData.prototype.blend = function (blendTo, blendWeight, store) {
	var tData = store ? store : new TransformData();

	tData._translation.set(this._translation).lerp(blendTo._translation, blendWeight);
	tData._scale.set(this._scale).lerp(blendTo._scale, blendWeight);
	_Quaternion2.default.slerp(this._rotation, blendTo._rotation, blendWeight, tData._rotation);
	return tData;
};
module.exports = exports.default;
