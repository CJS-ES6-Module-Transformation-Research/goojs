Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Matrix4x4 = undefined;

var _Matrix = require("./Matrix4");

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

var Matrix4x4 = ObjectUtils.warnOnce('Matrix4x4 has been renamed to Matrix4.', function () {
	_Matrix.Matrix4.apply(this, arguments);
});

var exported_Matrix4x4 = Matrix4x4;

Matrix4x4.prototype = Object.create(_Matrix.Matrix4.prototype);
Matrix4x4.prototype.constructor = Matrix4x4;
for (var x in _Matrix.Matrix4) {
	Matrix4x4[x] = _Matrix.Matrix4[x];
}

exports.Matrix4x4 = exported_Matrix4x4;
