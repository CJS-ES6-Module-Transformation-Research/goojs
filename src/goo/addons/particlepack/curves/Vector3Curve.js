import { ConstantCurve as ConstantCurvejs } from "../../../addons/particlepack/curves/ConstantCurve";
import { Curve as Curvejs } from "../../../addons/particlepack/curves/Curve";
import { ObjectUtils as ObjectUtilsjs } from "../../../util/ObjectUtils";
function Vector3Curve(options) {
	options = options || {};

	options = ObjectUtilsjs.clone(options);
	options.type = 'vec3';
	Curvejs.call(this, options);

	this.x = options.x ? options.x.clone() : new ConstantCurvejs();
	this.y = options.y ? options.y.clone() : new ConstantCurvejs();
	this.z = options.z ? options.z.clone() : new ConstantCurvejs();

	if (this.x.type !== 'float' || this.y.type !== 'float' || this.z.type !== 'float') {
		throw new Error('Vector3Curve must have scalar components.');
	}
}
Vector3Curve.prototype = Object.create(Curvejs.prototype);
Vector3Curve.prototype.constructor = Vector3Curve;

Vector3Curve.prototype.toGLSL = function (timeVariableName, lerpValueVariableName) {
	return 'vec3(' + [this.x, this.y, this.z].map(function (c) { return c.toGLSL(timeVariableName, lerpValueVariableName); }).join(',') + ')';
};

Vector3Curve.prototype.integralToGLSL = function (timeVariableName, lerpValueVariableName) {
	return 'vec3(' + [this.x, this.y, this.z].map(function (c) { return c.integralToGLSL(timeVariableName, lerpValueVariableName); }).join(',') + ')';
};

Vector3Curve.prototype.getVec3ValueAt = function (t, lerpValue, store) {
	store.setDirect(
		this.x.getValueAt(t, lerpValue),
		this.y.getValueAt(t, lerpValue),
		this.z.getValueAt(t, lerpValue)
	);
};

Vector3Curve.prototype.getVec3IntegralValueAt = function (t, lerpValue, store) {
	store.setDirect(
		this.x.getIntegralValueAt(t, lerpValue),
		this.y.getIntegralValueAt(t, lerpValue),
		this.z.getIntegralValueAt(t, lerpValue)
	);
};

var exported_Vector3Curve = Vector3Curve;

/**
 * Three scalar curves. Can be converted to a vec3-valued expression in GLSL code.
 * @class
 * @constructor
 * @param {object} [options]
 * @param {Curve} [options.x]
 * @param {Curve} [options.y]
 * @param {Curve} [options.z]
 */
export { exported_Vector3Curve as Vector3Curve };