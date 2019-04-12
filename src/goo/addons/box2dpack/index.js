Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Box2DComponent = require("./components/Box2DComponent");

var _Box2DComponent2 = _interopRequireDefault(_Box2DComponent);

var _Box2DSystem = require("./systems/Box2DSystem");

var _Box2DSystem2 = _interopRequireDefault(_Box2DSystem);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	Box2DComponent: _Box2DComponent2.default,
	Box2DSystem: _Box2DSystem2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
