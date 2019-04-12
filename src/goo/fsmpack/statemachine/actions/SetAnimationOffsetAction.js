Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetAnimationOffsetAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetAnimationOffsetAction() {
	_Action2.default.apply(this, arguments);
}

SetAnimationOffsetAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
