var mod_SetAnimationOffsetAction = SetAnimationOffsetAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function SetAnimationOffsetAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

SetAnimationOffsetAction.prototype = Object.create(Action_Action.prototype);
SetAnimationOffsetAction.prototype.constructor = SetAnimationOffsetAction;

SetAnimationOffsetAction.external = {
	key: 'Set Animation Offset',
	name: 'Set Animation Offset',
	type: 'animation',
	description: 'Sets animation clip offset.',
	parameters: [{
		name: 'Offset (sec)',
		key: 'offset',
		type: 'float',
		description: 'Animation offset',
		'default': 0
	}],
	transitions: []
};

SetAnimationOffsetAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.animationComponent) {
		entity.animationComponent.shiftClipTime(this.offset);
	}
};

export { mod_SetAnimationOffsetAction as SetAnimationOffsetAction };