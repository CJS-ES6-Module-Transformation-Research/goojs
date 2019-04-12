Object.defineProperty(exports, "__esModule", {
	value: true
});

var _LineRenderer = require("./LineRenderer");

var _LineRenderer2 = _interopRequireDefault(_LineRenderer);

var _LineRenderSystem = require("./LineRenderSystem");

var _LineRenderSystem2 = _interopRequireDefault(_LineRenderSystem);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	LineRenderer: _LineRenderer2.default,
	LineRenderSystem: _LineRenderSystem2.default
};
;

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
