var mod_RemoveParticlesAction = RemoveParticlesAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function RemoveParticlesAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

RemoveParticlesAction.prototype = Object.create(Action_Action.prototype);
RemoveParticlesAction.prototype.constructor = RemoveParticlesAction;

RemoveParticlesAction.external = {
	key: 'Remove Particles',
	name: 'Remove Particles',
	type: 'fx',
	description: 'Removes any particle emitter attached to the entity.',
	parameters: [],
	transitions: []
};

RemoveParticlesAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.children().each(function (child) {
		if (child.name.indexOf('_ParticleSystem') !== -1 && child.hasComponent('ParticleComponent')) {
			child.removeFromWorld();
		}
	});
};

export { mod_RemoveParticlesAction as RemoveParticlesAction };