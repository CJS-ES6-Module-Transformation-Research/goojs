Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ResumeAnimationAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function ResumeAnimationAction() {
	_Action2.default.apply(this, arguments);
}

ResumeAnimationAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
