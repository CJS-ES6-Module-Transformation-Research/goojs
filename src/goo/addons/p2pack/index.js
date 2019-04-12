Object.defineProperty(exports, "__esModule", {
	value: true
});

var _P2Component = require("./P2Component");

var _P2Component2 = _interopRequireDefault(_P2Component);

var _P2System = require("./P2System");

var _P2System2 = _interopRequireDefault(_P2System);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	P2Component: _P2Component2.default,
	P2System: _P2System2.default
};
;

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
