Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = StopSoundAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function StopSoundAction() {
	_Action2.default.apply(this, arguments);
}

StopSoundAction.prototype = Object.create(_Action2.default.prototype);
StopSoundAction.prototype.constructor = StopSoundAction;

StopSoundAction.external = {
	key: 'Stop Sound',
	name: 'Stop Sound',
	type: 'sound',
	description: 'Stops a sound.',
	canTransition: false,
	parameters: [{
		name: 'Sound',
		key: 'sound',
		type: 'sound',
		description: 'Sound to stop.'
	}],
	transitions: []
};

StopSoundAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.hasComponent('SoundComponent')) {
		var sound = entity.soundComponent.getSoundById(this.sound);
		if (sound) {
			sound.stop();
		}
	}
};
module.exports = exports.default;
