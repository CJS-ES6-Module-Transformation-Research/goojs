import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function ShowAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

ShowAction.prototype = Object.create(Actionjs.prototype);
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

var exported_ShowAction = ShowAction;
export { exported_ShowAction as ShowAction };