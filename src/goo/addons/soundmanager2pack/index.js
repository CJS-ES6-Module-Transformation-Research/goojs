Object.defineProperty(exports, "__esModule", {
	value: true
});

var _SoundManager2Component = require("./components/SoundManager2Component");

var _SoundManager2Component2 = _interopRequireDefault(_SoundManager2Component);

var _SoundManager2System = require("./systems/SoundManager2System");

var _SoundManager2System2 = _interopRequireDefault(_SoundManager2System);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	SoundManager2Component: _SoundManager2Component2.default,
	SoundManager2System: _SoundManager2System2.default
};
;

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
