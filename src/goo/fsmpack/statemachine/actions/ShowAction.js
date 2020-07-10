var ShowAction_ShowAction = ShowAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function ShowAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

ShowAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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

export { ShowAction_ShowAction as ShowAction };