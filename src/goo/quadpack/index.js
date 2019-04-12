Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DoubleQuad = require("./DoubleQuad");

var _DoubleQuad2 = _interopRequireDefault(_DoubleQuad);

var _QuadComponent = require("./QuadComponent");

var _QuadComponent2 = _interopRequireDefault(_QuadComponent);

var _QuadComponentHandler = require("./QuadComponentHandler");

var _QuadComponentHandler2 = _interopRequireDefault(_QuadComponentHandler);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	DoubleQuad: _DoubleQuad2.default,
	QuadComponent: _QuadComponent2.default,
	QuadComponentHandler: _QuadComponentHandler2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
