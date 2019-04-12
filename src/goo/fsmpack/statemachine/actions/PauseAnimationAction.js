Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = PauseAnimationAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function PauseAnimationAction() {
	_Action2.default.apply(this, arguments);
}

PauseAnimationAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
