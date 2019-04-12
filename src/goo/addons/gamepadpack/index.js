Object.defineProperty(exports, "__esModule", {
	value: true
});

var _GamepadComponent = require("./GamepadComponent");

var _GamepadComponent2 = _interopRequireDefault(_GamepadComponent);

var _GamepadData = require("./GamepadData");

var _GamepadData2 = _interopRequireDefault(_GamepadData);

var _GamepadSystem = require("./GamepadSystem");

var _GamepadSystem2 = _interopRequireDefault(_GamepadSystem);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	GamepadComponent: _GamepadComponent2.default,
	GamepadData: _GamepadData2.default,
	GamepadSystem: _GamepadSystem2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
