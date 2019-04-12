Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = StartParticleSystemAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function StartParticleSystemAction() {
	_Action2.default.apply(this, arguments);
}

StartParticleSystemAction.prototype = Object.create(_Action2.default.prototype);
StartParticleSystemAction.prototype.constructor = StartParticleSystemAction;

StartParticleSystemAction.external = {
	key: 'startParticleSystem',
	name: 'Start Particle System',
	type: 'misc',
	description: 'Starts / plays the particle system on the entity.',
	canTransition: false,
	parameters: [],
	transitions: []
};

StartParticleSystemAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.particleSystemComponent) {
		return;
	}
	entity.particleSystemComponent.play();
};
module.exports = exports.default;
