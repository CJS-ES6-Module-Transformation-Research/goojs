Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Vector3Curve;

var _ConstantCurve = require("../../../addons/particlepack/curves/ConstantCurve");

var _ConstantCurve2 = _interopRequireDefault(_ConstantCurve);

var _Curve = require("../../../addons/particlepack/curves/Curve");

var _Curve2 = _interopRequireDefault(_Curve);

var _ObjectUtils = require("../../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Three scalar curves. Can be converted to a vec3-valued expression in GLSL code.
 * @class
 * @constructor
 * @param {object} [options]
 * @param {Curve} [options.x]
 * @param {Curve} [options.y]
 * @param {Curve} [options.z]
 */
function Vector3Curve(options) {
	options = options || {};

	options = _ObjectUtils2.default.clone(options);
	options.type = 'vec3';
	_Curve2.default.call(this, options);

	this.x = options.x ? options.x.clone() : new _ConstantCurve2.default();
	this.y = options.y ? options.y.clone() : new _ConstantCurve2.default();
	this.z = options.z ? options.z.clone() : new _ConstantCurve2.default();

	if (this.x.type !== 'float' || this.y.type !== 'float' || this.z.type !== 'float') {
		throw new Error('Vector3Curve must have scalar components.');
	}
}

Vector3Curve.prototype = Object.create(_Curve2.default.prototype);
Vector3Curve.prototype.constructor = Vector3Curve;

Vector3Curve.prototype.toGLSL = function (timeVariableName, lerpValueVariableName) {
	return 'vec3(' + [this.x, this.y, this.z].map(function (c) {
		return c.toGLSL(timeVariableName, lerpValueVariableName);
	}).join(',') + ')';
};

Vector3Curve.prototype.integralToGLSL = function (timeVariableName, lerpValueVariableName) {
	return 'vec3(' + [this.x, this.y, this.z].map(function (c) {
		return c.integralToGLSL(timeVariableName, lerpValueVariableName);
	}).join(',') + ')';
};

Vector3Curve.prototype.getVec3ValueAt = function (t, lerpValue, store) {
	store.setDirect(this.x.getValueAt(t, lerpValue), this.y.getValueAt(t, lerpValue), this.z.getValueAt(t, lerpValue));
};

Vector3Curve.prototype.getVec3IntegralValueAt = function (t, lerpValue, store) {
	store.setDirect(this.x.getIntegralValueAt(t, lerpValue), this.y.getIntegralValueAt(t, lerpValue), this.z.getIntegralValueAt(t, lerpValue));
};
module.exports = exports.default;
