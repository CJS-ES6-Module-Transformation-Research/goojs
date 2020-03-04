import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function PauseAnimationAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

PauseAnimationAction.prototype = Object.create(Actionjs.prototype);
PauseAnimationAction.prototype.constructor = PauseAnimationAction;

PauseAnimationAction.external = {
	key: 'Pause Animation',
	name: 'Pause Animation',
	type: 'animation',
	description: 'Pauses skeleton animations.',
	parameters: [{
		name: 'On all entities',
		key: 'onAll',
		type: 'boolean',
		description: 'Pause animation on all entities or just one.',
		'default': false
	}],
	transitions: []
};

PauseAnimationAction.prototype.enter = function (fsm) {
	if (this.onAll) {
		var world = fsm.getWorld();
		var animationSystem = world.getSystem('AnimationSystem');
		animationSystem.pause();
	} else {
		var entity = fsm.getOwnerEntity();
		if (entity.animationComponent) {
			entity.animationComponent.pause();
		}
	}
};

var exported_PauseAnimationAction = PauseAnimationAction;
export { exported_PauseAnimationAction as PauseAnimationAction };