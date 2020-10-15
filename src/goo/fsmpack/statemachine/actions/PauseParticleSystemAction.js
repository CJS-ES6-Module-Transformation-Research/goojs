'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PauseParticleSystemAction = undefined;

var _Action = require('./Action');

var PauseParticleSystemAction_PauseParticleSystemAction = PauseParticleSystemAction;

function PauseParticleSystemAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}
PauseParticleSystemAction.prototype = Object.create(_Action.Action.prototype);
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
	if (!entity || !entity.particleSystemComponent) {
		return;
	}
	entity.particleSystemComponent.pause();
};

exports.PauseParticleSystemAction = PauseParticleSystemAction_PauseParticleSystemAction;