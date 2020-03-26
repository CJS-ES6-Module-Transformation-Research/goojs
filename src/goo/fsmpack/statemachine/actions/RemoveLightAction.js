import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function RemoveLightAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

RemoveLightAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
RemoveLightAction.prototype.constructor = RemoveLightAction;

RemoveLightAction.external = {
	key: 'Remove Light',
	name: 'Remove Light',
	type: 'light',
	description: 'Removes the light attached to the entity.',
	parameters: [],
	transitions: []
};

RemoveLightAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.hasComponent('LightComponent')) {
		entity.clearComponent('LightComponent');
	}
};

var exported_RemoveLightAction = RemoveLightAction;
export { exported_RemoveLightAction as RemoveLightAction };