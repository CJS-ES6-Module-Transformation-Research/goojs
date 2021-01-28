var mod_StartParticleSystemAction = StartParticleSystemAction;
import { Action as Action_Action } from "./Action";

function StartParticleSystemAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}
StartParticleSystemAction.prototype = Object.create(Action_Action.prototype);
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

export { mod_StartParticleSystemAction as StartParticleSystemAction };