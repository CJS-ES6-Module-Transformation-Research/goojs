'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RemoveAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var mod_RemoveAction = RemoveAction;

function RemoveAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}

RemoveAction.prototype = Object.create(_Action.Action.prototype);
RemoveAction.prototype.constructor = RemoveAction;

RemoveAction.external = {
	key: 'Remove',
	name: 'Remove',
	type: 'display',
	description: 'Removes the entity from the world.',
	parameters: [{
		name: 'Recursive',
		key: 'recursive',
		type: 'boolean',
		description: 'Remove children too.',
		'default': false
	}],
	transitions: []
};

RemoveAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.removeFromWorld(this.recursive);
};

exports.RemoveAction = mod_RemoveAction;