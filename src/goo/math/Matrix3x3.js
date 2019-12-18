Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Matrix3x3 = undefined;

var _Matrix = require("./Matrix3");

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var Matrix3x3 = ObjectUtils.warnOnce('Matrix3x3 has been renamed to Matrix3.', function () {
	_Matrix.Matrix3.apply(this, arguments);
});

var exported_Matrix3x3 = Matrix3x3;

Matrix3x3.prototype = Object.create(_Matrix.Matrix3.prototype);
Matrix3x3.prototype.constructor = Matrix3x3;
for (var x in _Matrix.Matrix3) {
	Matrix3x3[x] = _Matrix.Matrix3[x];
}

exports.Matrix3x3 = exported_Matrix3x3;
