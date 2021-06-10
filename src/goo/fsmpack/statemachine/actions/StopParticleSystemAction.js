var mod_StopParticleSystemAction = StopParticleSystemAction;
import { Action as Action_Action } from "./Action";

function StopParticleSystemAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}
StopParticleSystemAction.prototype = Object.create(Action_Action.prototype);
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
	if (!entity || !entity.particleSystemComponent) { return; }
	entity.particleSystemComponent.stop();
};

export { mod_StopParticleSystemAction as StopParticleSystemAction };