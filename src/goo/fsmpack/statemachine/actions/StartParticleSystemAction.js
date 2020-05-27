var StartParticleSystemAction_StartParticleSystemAction = StartParticleSystemAction;
import { Action as Action_Actionjs } from "./Action";

function StartParticleSystemAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
StartParticleSystemAction.prototype = Object.create(Action_Actionjs.prototype);
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

export { StartParticleSystemAction_StartParticleSystemAction as StartParticleSystemAction };