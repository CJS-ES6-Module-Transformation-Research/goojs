import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function RemoveLightAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

RemoveLightAction.prototype = Object.create(Actionjs.prototype);
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