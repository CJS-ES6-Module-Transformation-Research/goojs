import { Curve as addonsparticlepackcurvesCurve_Curvejs } from "../../../addons/particlepack/curves/Curve";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../../math/MathUtils";
function LerpCurve(options) {
	options = options || {};

	addonsparticlepackcurvesCurve_Curvejs.call(this, options);

	/**
	 * @type {Curve}
	 */
	this.curveA = options.curveA !== undefined ? options.curveA.clone() : null;

	/**
	 * @type {Curve}
	 */
	this.curveB = options.curveB !== undefined ? options.curveB.clone() : null;
}
LerpCurve.prototype = Object.create(addonsparticlepackcurvesCurve_Curvejs.prototype);
LerpCurve.prototype.constructor = LerpCurve;

LerpCurve.prototype.toGLSL = function (timeVariableName, lerpVariableName) {
	return 'mix(' + this.curveA.toGLSL(timeVariableName, lerpVariableName) + ',' + this.curveB.toGLSL(timeVariableName, lerpVariableName) + ',' + lerpVariableName + ')';
};

LerpCurve.prototype.integralToGLSL = function (timeVariableName, lerpVariableName) {
	return 'mix(' + this.curveA.integralToGLSL(timeVariableName, lerpVariableName) + ',' + this.curveB.integralToGLSL(timeVariableName, lerpVariableName) + ',' + lerpVariableName + ')';
};

LerpCurve.prototype.getValueAt = function (t, lerpValue) {
	return mathMathUtils_MathUtilsjs.lerp(lerpValue, this.curveA.getValueAt(t, lerpValue), this.curveB.getValueAt(t, lerpValue));
};

LerpCurve.prototype.getIntegralValueAt = function (t, lerpValue) {
	return mathMathUtils_MathUtilsjs.lerp(lerpValue, this.curveA.getIntegralValueAt(t, lerpValue), this.curveB.getIntegralValueAt(t, lerpValue));
};

var exported_LerpCurve = LerpCurve;

/**
 * Curve that can lerp between two other curves.
 * @class
 * @constructor
 * @extends Curve
 * @param {object} [options]
 * @param {Curve} [options.curveA]
 * @param {Curve} [options.curveB]
 */
export { exported_LerpCurve as LerpCurve };