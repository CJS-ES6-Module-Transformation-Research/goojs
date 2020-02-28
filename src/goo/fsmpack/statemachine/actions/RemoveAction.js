import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function RemoveAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

RemoveAction.prototype = Object.create(Action_Actionjs.prototype);
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

var exported_RemoveAction = RemoveAction;
export { exported_RemoveAction as RemoveAction };