Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ToggleFullscreenAction = undefined;

var _Action = require("./Action");

var _GameUtils = require("./../../../util/GameUtils");

var GameUtils = _interopRequireWildcard(_GameUtils);

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

function ToggleFullscreenAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

ToggleFullscreenAction.prototype = Object.create(_Action.Action.prototype);
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
	GameUtils.toggleFullScreen();
};

var exported_ToggleFullscreenAction = ToggleFullscreenAction;
exports.ToggleFullscreenAction = exported_ToggleFullscreenAction;
