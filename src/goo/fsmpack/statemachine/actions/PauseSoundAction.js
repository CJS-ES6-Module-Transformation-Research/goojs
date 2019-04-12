Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = PauseSoundAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function PauseSoundAction() {
	_Action2.default.apply(this, arguments);
}

PauseSoundAction.prototype = Object.create(_Action2.default.prototype);
PauseSoundAction.prototype.constructor = PauseSoundAction;

PauseSoundAction.external = {
	key: 'Pause Sound',
	name: 'Pause Sound',
	type: 'sound',
	description: 'Pauses a sound.',
	canTransition: false,
	parameters: [{
		name: 'Sound',
		key: 'sound',
		type: 'sound',
		description: 'Sound to pause.'
	}],
	transitions: []
};

PauseSoundAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.hasComponent('SoundComponent')) {
		var sound = entity.soundComponent.getSoundById(this.sound);
		if (sound) {
			sound.pause();
		}
	}
};
module.exports = exports.default;
