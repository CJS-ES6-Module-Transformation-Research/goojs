import { Action as Action_Actionjs } from "./Action";

function SetTimeScaleAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
	this.everyFrame = false;
}

SetTimeScaleAction.prototype = Object.create(Action_Actionjs.prototype);
SetTimeScaleAction.prototype.constructor = SetTimeScaleAction;

SetTimeScaleAction.external = {
	key: 'Set Animation Time Scale',
	name: 'Set Animation Time Scale',
	type: 'animation',
	description: 'Sets the time scale for the current animation.',
	parameters: [{
		name: 'Scale',
		key: 'scale',
		type: 'float',
		description: 'Scale factor for the animation timer.',
		'default': 1
	}],
	transitions: []
};

SetTimeScaleAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.animationComponent) {
		entity.animationComponent.setTimeScale(this.scale);
	}
};

var exported_SetTimeScaleAction = SetTimeScaleAction;
export { exported_SetTimeScaleAction as SetTimeScaleAction };