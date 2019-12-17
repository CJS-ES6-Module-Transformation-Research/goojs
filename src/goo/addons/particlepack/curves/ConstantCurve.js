Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ConstantCurve = undefined;

var _Curve = require('../../../addons/particlepack/curves/Curve');

var exported_ConstantCurve = ConstantCurve;
function ConstantCurve(options) {
	options = options || {};

	_Curve.Curve.call(this, options);

	/**
  * @type {number}
  */
	this.value = options.value !== undefined ? options.value : 1;
}
ConstantCurve.prototype = Object.create(_Curve.Curve.prototype);
ConstantCurve.prototype.constructor = ConstantCurve;

ConstantCurve.prototype.toGLSL = function () /*timeVariableName, lerpValueVariableName*/{
	return _Curve.Curve.numberToGLSL(this.value);
};

ConstantCurve.prototype.integralToGLSL = function (timeVariableName /*, lerpValueVariableName*/) {
	var value = _Curve.Curve.numberToGLSL(this.value);
	return '(' + value + '*' + timeVariableName + ')';
};

ConstantCurve.prototype.getValueAt = function () /*t, lerpFactor*/{
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
exports.ConstantCurve = exported_ConstantCurve;
