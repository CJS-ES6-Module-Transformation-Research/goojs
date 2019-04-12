Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetTimeScaleAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetTimeScaleAction() {
	_Action2.default.apply(this, arguments);
	this.everyFrame = false;
}

SetTimeScaleAction.prototype = Object.create(_Action2.default.prototype);
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
module.exports = exports.default;
