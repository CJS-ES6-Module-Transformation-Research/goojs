Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Vector4Curve;

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
 * Three scalar curves. Can be converted to a vec4-valued expression in GLSL code.
 * @class
 * @constructor
 * @param {object} [options]
 * @param {Curve} [options.x]
 * @param {Curve} [options.y]
 * @param {Curve} [options.z]
 * @param {Curve} [options.w]
 */
function Vector4Curve(options) {
	options = options || {};

	options = _ObjectUtils2.default.clone(options);
	options.type = 'vec4';
	_Curve2.default.call(this, options);

	this.x = options.x ? options.x.clone() : new _ConstantCurve2.default();
	this.y = options.y ? options.y.clone() : new _ConstantCurve2.default();
	this.z = options.z ? options.z.clone() : new _ConstantCurve2.default();
	this.w = options.w ? options.w.clone() : new _ConstantCurve2.default({ value: 1 });

	if (this.x.type !== 'float' || this.y.type !== 'float' || this.z.type !== 'float' || this.w.type !== 'float') {
		throw new Error('Vector4Curve must have scalar components.');
	}
}

Vector4Curve.prototype = Object.create(_Curve2.default.prototype);
Vector4Curve.prototype.constructor = Vector4Curve;

Vector4Curve.prototype.toGLSL = function (timeVariableName, lerpValueVariableName) {
	return 'vec4(' + [this.x, this.y, this.z, this.w].map(function (c) {
		return c.toGLSL(timeVariableName, lerpValueVariableName);
	}).join(',') + ')';
};

Vector4Curve.prototype.integralToGLSL = function (timeVariableName, lerpValueVariableName) {
	return 'vec4(' + [this.x, this.y, this.z, this.w].map(function (c) {
		return c.integralToGLSL(timeVariableName, lerpValueVariableName);
	}).join(',') + ')';
};

Vector4Curve.prototype.getVec4ValueAt = function (t, lerpValue, store) {
	store.setDirect(this.x.getValueAt(t, lerpValue), this.y.getValueAt(t, lerpValue), this.z.getValueAt(t, lerpValue), this.w.getValueAt(t, lerpValue));
};

Vector4Curve.prototype.getVec4IntegralValueAt = function (t, lerpValue, store) {
	store.setDirect(this.x.getIntegralValueAt(t, lerpValue), this.y.getIntegralValueAt(t, lerpValue), this.z.getIntegralValueAt(t, lerpValue), this.w.getIntegralValueAt(t, lerpValue));
};
module.exports = exports.default;
