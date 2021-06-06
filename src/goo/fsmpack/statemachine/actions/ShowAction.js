var mod_ShowAction = ShowAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function ShowAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

ShowAction.prototype = Object.create(Action_Action.prototype);
ShowAction.prototype.constructor = ShowAction;

ShowAction.external = {
	key: 'Show',
	name: 'Show',
	type: 'display',
	description: 'Makes an entity visible.',
	parameters: [],
	transitions: []
};

ShowAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.show();
};

export { mod_ShowAction as ShowAction };