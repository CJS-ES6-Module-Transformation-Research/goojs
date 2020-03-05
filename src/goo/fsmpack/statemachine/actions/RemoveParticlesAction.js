import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function RemoveParticlesAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

RemoveParticlesAction.prototype = Object.create(Actionjs.prototype);
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

var exported_RemoveParticlesAction = RemoveParticlesAction;
export { exported_RemoveParticlesAction as RemoveParticlesAction };