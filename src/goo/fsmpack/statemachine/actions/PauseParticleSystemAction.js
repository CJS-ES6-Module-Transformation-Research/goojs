var PauseParticleSystemAction_PauseParticleSystemAction = PauseParticleSystemAction;
import { Action as Action_Actionjs } from "./Action";

function PauseParticleSystemAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}
PauseParticleSystemAction.prototype = Object.create(Action_Actionjs.prototype);
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

export { PauseParticleSystemAction_PauseParticleSystemAction as PauseParticleSystemAction };