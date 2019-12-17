Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StopParticleSystemAction = undefined;

var _Action = require('./Action');

var exported_StopParticleSystemAction = StopParticleSystemAction;

function StopParticleSystemAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}
StopParticleSystemAction.prototype = Object.create(_Action.Action.prototype);
StopParticleSystemAction.prototype.constructor = StopParticleSystemAction;

StopParticleSystemAction.external = {
	key: 'stopParticleSystem',
	name: 'Stop Particle System',
	type: 'misc',
	description: 'Stops the particle system on the entity.',
	canTransition: false,
	parameters: [],
	transitions: []
};

StopParticleSystemAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.particleSystemComponent) {
		return;
	}
	entity.particleSystemComponent.stop();
};

exports.StopParticleSystemAction = exported_StopParticleSystemAction;
