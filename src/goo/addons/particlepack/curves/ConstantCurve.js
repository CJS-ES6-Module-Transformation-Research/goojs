Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ConstantCurve;

var _Curve = require('../../../addons/particlepack/curves/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * A curve with a constant value.
 * @class
 * @constructor
 * @extends Curve
 * @param {object} [options]
 * @param {number} [options.value=1]
 */
function ConstantCurve(options) {
	options = options || {};

	_Curve2.default.call(this, options);

	/**
  * @type {number}
  */
	this.value = options.value !== undefined ? options.value : 1;
}

ConstantCurve.prototype = Object.create(_Curve2.default.prototype);
ConstantCurve.prototype.constructor = ConstantCurve;

ConstantCurve.prototype.toGLSL = function () /*timeVariableName, lerpValueVariableName*/{
	return _Curve2.default.numberToGLSL(this.value);
};

ConstantCurve.prototype.integralToGLSL = function (timeVariableName /*, lerpValueVariableName*/) {
	var value = _Curve2.default.numberToGLSL(this.value);
	return '(' + value + '*' + timeVariableName + ')';
};

ConstantCurve.prototype.getValueAt = function () /*t, lerpFactor*/{
	return this.value;
};

ConstantCurve.prototype.getIntegralValueAt = function (t /*, lerpFactor*/) {
	return this.value * t;
};
module.exports = exports.default;
