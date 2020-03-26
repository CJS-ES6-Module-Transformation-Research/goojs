import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function HideAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

HideAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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

var exported_HideAction = HideAction;
export { exported_HideAction as HideAction };