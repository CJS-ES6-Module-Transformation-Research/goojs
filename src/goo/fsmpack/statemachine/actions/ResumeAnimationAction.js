import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function ResumeAnimationAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

ResumeAnimationAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
ResumeAnimationAction.prototype.constructor = ResumeAnimationAction;

ResumeAnimationAction.external = {
	key: 'Resume Animation',
	name: 'Resume Animation',
	type: 'animation',
	description: 'Continues playing a skeleton animation.',
	parameters: [{
		name: 'On all entities',
		key: 'onAll',
		type: 'boolean',
		description: 'Resume animation on all entities or just one.',
		'default': false
	}],
	transitions: []
};

ResumeAnimationAction.prototype.enter = function (fsm) {
	if (this.onAll) {
		var world = fsm.getWorld();
		var animationSystem = world.getSystem('AnimationSystem');
		animationSystem.resume();
	} else {
		var entity = fsm.getOwnerEntity();
		if (entity.animationComponent) {
			entity.animationComponent.resume();
		}
	}
};

var exported_ResumeAnimationAction = ResumeAnimationAction;
export { exported_ResumeAnimationAction as ResumeAnimationAction };