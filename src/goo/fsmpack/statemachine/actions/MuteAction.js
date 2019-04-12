Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MuteAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function MuteAction() {
	_Action2.default.apply(this, arguments);
}

MuteAction.prototype = Object.create(_Action2.default.prototype);
MuteAction.prototype.constructor = MuteAction;

MuteAction.external = {
	key: 'Mute sounds',
	name: 'Mute sounds',
	type: 'sound',
	description: 'Mute all sounds globally.',
	canTransition: false,
	parameters: [],
	transitions: []
};

MuteAction.prototype.enter = function (fsm) {
	var world = fsm.getWorld();
	if (!world) {
		return;
	}

	var soundSystem = world.getSystem('SoundSystem');
	if (soundSystem) {
		soundSystem.mute();
	}
};
module.exports = exports.default;
