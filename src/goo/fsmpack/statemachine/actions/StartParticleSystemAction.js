import { Action } from "./Action";
var exported_StartParticleSystemAction = StartParticleSystemAction;

function StartParticleSystemAction/*id, settings*/() {
	Action.apply(this, arguments);
}
StartParticleSystemAction.prototype = Object.create(Action.prototype);
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
	if (!entity || !entity.particleSystemComponent) { return; }
	entity.particleSystemComponent.play();
};

export { exported_StartParticleSystemAction as StartParticleSystemAction };