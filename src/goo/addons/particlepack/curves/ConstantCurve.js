import { Curve as addonsparticlepackcurvesCurve_Curvejs } from "../../../addons/particlepack/curves/Curve";
function ConstantCurve(options) {
	options = options || {};

	addonsparticlepackcurvesCurve_Curvejs.call(this, options);

	/**
	 * @type {number}
	 */
	this.value = options.value !== undefined ? options.value : 1;
}
ConstantCurve.prototype = Object.create(addonsparticlepackcurvesCurve_Curvejs.prototype);
ConstantCurve.prototype.constructor = ConstantCurve;

ConstantCurve.prototype.toGLSL = function (/*timeVariableName, lerpValueVariableName*/) {
	return addonsparticlepackcurvesCurve_Curvejs.numberToGLSL(this.value);
};

ConstantCurve.prototype.integralToGLSL = function (timeVariableName/*, lerpValueVariableName*/) {
	var value = addonsparticlepackcurvesCurve_Curvejs.numberToGLSL(this.value);
	return '(' + value + '*' + timeVariableName + ')';
};

ConstantCurve.prototype.getValueAt = function (/*t, lerpFactor*/) {
	return this.value;
};

ConstantCurve.prototype.getIntegralValueAt = function (t /*, lerpFactor*/) {
	return this.value * t;
};

var exported_ConstantCurve = ConstantCurve;

/**
 * A curve with a constant value.
 * @class
 * @constructor
 * @extends Curve
 * @param {object} [options]
 * @param {number} [options.value=1]
 */
export { exported_ConstantCurve as ConstantCurve };