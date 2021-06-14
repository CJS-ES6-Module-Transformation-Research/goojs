'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RemoveParticlesAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var mod_RemoveParticlesAction = RemoveParticlesAction;

function RemoveParticlesAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}

RemoveParticlesAction.prototype = Object.create(_Action.Action.prototype);
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

exports.RemoveParticlesAction = mod_RemoveParticlesAction;