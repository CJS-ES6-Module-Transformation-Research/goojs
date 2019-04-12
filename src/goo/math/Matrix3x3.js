Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Matrix = require("./Matrix3");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Matrix3x3 = _ObjectUtils2.default.warnOnce('Matrix3x3 has been renamed to Matrix3.', function () {
	_Matrix2.default.apply(this, arguments);
});

Matrix3x3.prototype = Object.create(_Matrix2.default.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in _Matrix2.default) {
	Matrix3x3[x] = _Matrix2.default[x];
}

exports.default = Matrix3x3;
module.exports = exports.default;
