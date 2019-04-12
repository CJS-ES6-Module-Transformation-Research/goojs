Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Matrix = require("./Matrix2");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Matrix2x2 = _ObjectUtils2.default.warnOnce('Matrix2x2 has been renamed to Matrix2.', function () {
	_Matrix2.default.apply(this, arguments);
});

Matrix2x2.prototype = Object.create(_Matrix2.default.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in _Matrix2.default) {
	Matrix2x2[x] = _Matrix2.default[x];
}

exports.default = Matrix2x2;
module.exports = exports.default;
