Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AmmoComponent = require("./AmmoComponent");

var _AmmoComponent2 = _interopRequireDefault(_AmmoComponent);

var _AmmoSystem = require("./AmmoSystem");

var _AmmoSystem2 = _interopRequireDefault(_AmmoSystem);

var _calculateTriangleMeshShape = require("./calculateTriangleMeshShape");

var _calculateTriangleMeshShape2 = _interopRequireDefault(_calculateTriangleMeshShape);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	AmmoComponent: _AmmoComponent2.default,
	AmmoSystem: _AmmoSystem2.default,
	calculateTriangleMeshShape: _calculateTriangleMeshShape2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
