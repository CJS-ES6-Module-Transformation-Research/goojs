Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetPositionAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var _FsmUtils2 = _interopRequireDefault(_FsmUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetPositionAction() {
	_Action2.default.apply(this, arguments);
}

SetPositionAction.prototype = Object.create(_Action2.default.prototype);
SetPositionAction.prototype.constructor = SetPositionAction;

SetPositionAction.prototype.configure = function (settings) {
	this.everyFrame = !!settings.everyFrame;
	this.entity = settings.entity || null;
	this.amountX = settings.amountX || 0;
	this.amountY = settings.amountY || 0;
	this.amountZ = settings.amountZ || 0;
};

SetPositionAction.external = {
	key: 'Set Position',
	name: 'Set Position',
	parameters: [{
		name: 'Entity',
		key: 'entity',
		type: 'entity',
		description: 'Entity to move.'
	}, {
		name: 'Amount X',
		key: 'amountX',
		type: 'float',
		description: 'Position on the X axis.',
		'default': 0
	}, {
		name: 'Amount Y',
		key: 'amountY',
		type: 'float',
		description: 'Position on the Y axis.',
		'default': 0
	}, {
		name: 'Amount Z',
		key: 'amountZ',
		type: 'float',
		description: 'Position on the Z axis.',
		'default': 0
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

SetPositionAction.prototype.update = function (fsm) {
	if (this.entity !== null) {
		this.entity.transformComponent.transform.translation.setDirect(_FsmUtils2.default.getValue(this.amountX, fsm), _FsmUtils2.default.getValue(this.amountY, fsm), _FsmUtils2.default.getValue(this.amountZ, fsm));
		this.entity.transformComponent.setUpdated();
	}
};
module.exports = exports.default;
