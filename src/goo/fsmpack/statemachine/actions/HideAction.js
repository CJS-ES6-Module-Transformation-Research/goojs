var mod_HideAction = HideAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function HideAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

HideAction.prototype = Object.create(Action_Action.prototype);
HideAction.prototype.constructor = HideAction;

HideAction.external = {
	key: 'Hide',
	name: 'Hide',
	type: 'display',
	description: 'Hides an entity and its children.',
	parameters: [],
	transitions: []
};

HideAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.hide();
};

export { mod_HideAction as HideAction };