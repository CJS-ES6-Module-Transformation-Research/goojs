Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = PauseParticleSystemAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function PauseParticleSystemAction() {
	_Action2.default.apply(this, arguments);
}

PauseParticleSystemAction.prototype = Object.create(_Action2.default.prototype);
PauseParticleSystemAction.prototype.constructor = PauseParticleSystemAction;

PauseParticleSystemAction.external = {
	key: 'pauseParticleSystem',
	name: 'Pause Particle System',
	type: 'misc',
	description: 'Pauses the particle system on the entity.',
	canTransition: false,
	parameters: [],
	transitions: []
};

PauseParticleSystemAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.particleSystemComponent) {
		return;
	}
	entity.particleSystemComponent.pause();
};
module.exports = exports.default;
