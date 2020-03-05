import { Curve as Curvejs } from "../../../addons/particlepack/curves/Curve";
function LinearCurve(options) {
	options = options || {};

	Curvejs.call(this, options);

	/**
	 * Slope of the line.
	 * @type {number}
	 */
	this.k = options.k !== undefined ? options.k : 1;

	/**
	 * Value of the line when time is 0.
	 * @type {number}
	 */
	this.m = options.m || 0;
}
LinearCurve.prototype = Object.create(Curvejs.prototype);
LinearCurve.prototype.constructor = LinearCurve;

/**
 * Create the linar curve from a start and end value.
 * @param {number} startValue
 * @param {number} endValue
 */
LinearCurve.prototype.fromStartEnd = function (startValue, endValue) {
	this.m = startValue;
	this.k = endValue - startValue;
};

LinearCurve.prototype.toGLSL = function (timeVariableName/*, lerpValueVariableName*/) {
	return '(' + Curvejs.numberToGLSL(this.k) + '*' + timeVariableName + '+' + Curvejs.numberToGLSL(this.m) + ')';
};

LinearCurve.prototype.integralToGLSL = function (timeVariableName/*, lerpValueVariableName*/) {
	var k = Curvejs.numberToGLSL(this.k);
	var m = Curvejs.numberToGLSL(this.m);
	return '(' + k + '*' + timeVariableName + '*' + timeVariableName + '*0.5+' + m + '*' + timeVariableName + ')';
};

LinearCurve.prototype.getValueAt = function (t/*, lerpValue*/) {
	return this.k * (t - this.timeOffset) + this.m;
};

LinearCurve.prototype.getIntegralValueAt = function (t/*, lerpValue*/) {
	var x = (t - this.timeOffset);
	var k = this.k;
	var m = this.m;
	return 0.5 * k * x * x + m * x;
};

var exported_LinearCurve = LinearCurve;

/**
 * @class
 * @constructor
 * @extends Curve
 * @param {object} [options]
 * @param {number} [options.k]
 * @param {number} [options.m]
 */
export { exported_LinearCurve as LinearCurve };