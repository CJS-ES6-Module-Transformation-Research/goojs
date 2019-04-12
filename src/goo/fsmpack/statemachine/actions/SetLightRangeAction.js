Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetLightRangeAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetLightRangeAction() {
	_Action2.default.apply(this, arguments);
}

SetLightRangeAction.prototype = Object.create(_Action2.default.prototype);
SetLightRangeAction.prototype.constructor = SetLightRangeAction;

SetLightRangeAction.prototype.configure = function (settings) {
	this.everyFrame = !!settings.everyFrame;
	this.entity = settings.entity || null;
	this.range = settings.range || 100;
};

SetLightRangeAction.external = {
	key: 'Set Light Range',
	name: 'Set Light Range',
	description: 'Sets the range of a light.',
	parameters: [{
		name: 'Entity',
		key: 'entity',
		type: 'entity',
		description: 'Light entity.'
	}, {
		name: 'Range',
		key: 'range',
		type: 'real',
		description: 'Light range.',
		'default': 100,
		min: 0
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

SetLightRangeAction.prototype.enter = function () /*fsm*/{
	var entity = this.entity;
	if (entity && entity.lightComponent && entity.lightComponent.light) {
		entity.lightComponent.light.range = this.range;
	}
};
module.exports = exports.default;
