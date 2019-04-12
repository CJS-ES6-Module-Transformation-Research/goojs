Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetClearColorAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetClearColorAction() {
	_Action2.default.apply(this, arguments);
}

SetClearColorAction.prototype = Object.create(_Action2.default.prototype);
SetClearColorAction.prototype.constructor = SetClearColorAction;

SetClearColorAction.external = {
	key: 'Set Clear Color',
	name: 'Background Color',
	description: 'Sets the clear color.',
	parameters: [{
		name: 'Color',
		key: 'color',
		type: 'vec4',
		control: 'color',
		description: 'Color.',
		'default': [1, 1, 1, 1]
	}],
	transitions: []
};

SetClearColorAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var color = this.color;
	entity._world.gooRunner.renderer.setClearColor(color[0], color[1], color[2], color[3]);
};
module.exports = exports.default;
