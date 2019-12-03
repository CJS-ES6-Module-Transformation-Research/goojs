import { Action } from "./Action";
var exported_PauseParticleSystemAction = PauseParticleSystemAction;

function PauseParticleSystemAction/*id, settings*/() {
	Action.apply(this, arguments);
}
PauseParticleSystemAction.prototype = Object.create(Action.prototype);
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
	if (!entity || !entity.particleSystemComponent) { return; }
	entity.particleSystemComponent.pause();
};

export { exported_PauseParticleSystemAction as PauseParticleSystemAction };