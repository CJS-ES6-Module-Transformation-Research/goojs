Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ToggleFullscreenAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _GameUtils = require("./../../../util/GameUtils");

var _GameUtils2 = _interopRequireDefault(_GameUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function ToggleFullscreenAction() {
	_Action2.default.apply(this, arguments);
}

ToggleFullscreenAction.prototype = Object.create(_Action2.default.prototype);
ToggleFullscreenAction.prototype.constructor = ToggleFullscreenAction;

ToggleFullscreenAction.external = {
	key: 'Toggle Fullscreen',
	name: 'Toggle Fullscreen',
	type: 'display',
	description: 'Toggles fullscreen on/off. Note that in most browsers this must be initiated by a user gesture. For example, click or touch.',
	parameters: [],
	transitions: []
};

ToggleFullscreenAction.prototype.enter = function () /*fsm*/{
	_GameUtils2.default.toggleFullScreen();
};
module.exports = exports.default;
