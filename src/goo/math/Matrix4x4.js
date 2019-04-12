Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Matrix = require("./Matrix4");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Matrix4x4 = _ObjectUtils2.default.warnOnce('Matrix4x4 has been renamed to Matrix4.', function () {
	_Matrix2.default.apply(this, arguments);
});

Matrix4x4.prototype = Object.create(_Matrix2.default.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in _Matrix2.default) {
	Matrix4x4[x] = _Matrix2.default[x];
}

exports.default = Matrix4x4;
module.exports = exports.default;
