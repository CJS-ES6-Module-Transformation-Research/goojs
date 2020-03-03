Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PauseAnimationAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

function PauseAnimationAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

PauseAnimationAction.prototype = Object.create(_Action.Action.prototype);
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
exports.PauseAnimationAction = exported_PauseAnimationAction;
