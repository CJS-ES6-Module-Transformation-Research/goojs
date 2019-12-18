Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Matrix2x2 = undefined;

var _Matrix = require("./Matrix2");

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

var Matrix2x2 = ObjectUtils.warnOnce('Matrix2x2 has been renamed to Matrix2.', function () {
	_Matrix.Matrix2.apply(this, arguments);
});

var exported_Matrix2x2 = Matrix2x2;

Matrix2x2.prototype = Object.create(_Matrix.Matrix2.prototype);
Matrix2x2.prototype.constructor = Matrix2x2;
for (var x in _Matrix.Matrix2) {
	Matrix2x2[x] = _Matrix.Matrix2[x];
}

exports.Matrix2x2 = exported_Matrix2x2;
