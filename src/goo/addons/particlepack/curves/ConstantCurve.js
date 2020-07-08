var ConstantCurve_ConstantCurve = ConstantCurve;

import {
    Curve as addonsparticlepackcurvesCurve_Curvejs,
    numberToGLSL as Curvejs_numberToGLSL,
} from "../../../addons/particlepack/curves/Curve";

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
	return Curvejs_numberToGLSL(this.value);
};

ConstantCurve.prototype.integralToGLSL = function (timeVariableName/*, lerpValueVariableName*/) {
	var value = Curvejs_numberToGLSL(this.value);
	return '(' + value + '*' + timeVariableName + ')';
};

ConstantCurve.prototype.getValueAt = function (/*t, lerpFactor*/) {
	return this.value;
};

ConstantCurve.prototype.getIntegralValueAt = function (t /*, lerpFactor*/) {
	return this.value * t;
};

/**
 * A curve with a constant value.
 * @class
 * @constructor
 * @extends Curve
 * @param {object} [options]
 * @param {number} [options.value=1]
 */
export { ConstantCurve_ConstantCurve as ConstantCurve };