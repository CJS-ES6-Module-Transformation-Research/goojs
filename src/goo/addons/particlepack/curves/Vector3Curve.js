"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Vector3Curve = undefined;

var _ConstantCurve = require("../../../addons/particlepack/curves/ConstantCurve");

var _Curve = require("../../../addons/particlepack/curves/Curve");

var _ObjectUtils = require("../../../util/ObjectUtils");

var Vector3Curve_Vector3Curve = Vector3Curve;

function Vector3Curve(options) {
	options = options || {};

	options = _ObjectUtils.ObjectUtils.clone(options);
	options.type = 'vec3';
	_Curve.Curve.call(this, options);

	this.x = options.x ? options.x.clone() : new _ConstantCurve.ConstantCurve();
	this.y = options.y ? options.y.clone() : new _ConstantCurve.ConstantCurve();
	this.z = options.z ? options.z.clone() : new _ConstantCurve.ConstantCurve();

	if (this.x.type !== 'float' || this.y.type !== 'float' || this.z.type !== 'float') {
		throw new Error('Vector3Curve must have scalar components.');
	}
}
Vector3Curve.prototype = Object.create(_Curve.Curve.prototype);
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

/**
 * Three scalar curves. Can be converted to a vec3-valued expression in GLSL code.
 * @class
 * @constructor
 * @param {object} [options]
 * @param {Curve} [options.x]
 * @param {Curve} [options.y]
 * @param {Curve} [options.z]
 */
exports.Vector3Curve = Vector3Curve_Vector3Curve;