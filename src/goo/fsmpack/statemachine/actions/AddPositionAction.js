Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AddPositionAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var _FsmUtils2 = _interopRequireDefault(_FsmUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function AddPositionAction() {
	_Action2.default.apply(this, arguments);
}

AddPositionAction.prototype = Object.create(_Action2.default.prototype);
AddPositionAction.prototype.constructor = AddPositionAction;

AddPositionAction.external = {
	parameters: [{
		name: 'Entity',
		key: 'entity',
		type: 'entity',
		description: 'Entity to move.'
	}, {
		name: 'Amount X',
		key: 'amountX',
		type: 'float',
		description: 'Amount to move on the X axis.',
		'default': 0
	}, {
		name: 'Amount Y',
		key: 'amountY',
		type: 'float',
		description: 'Amount to move on the Y axis.',
		'default': 0
	}, {
		name: 'Amount Z',
		key: 'amountZ',
		type: 'float',
		description: 'Amount to move on the Z axis.',
		'default': 0
	}, {
		name: 'Speed',
		key: 'speed',
		type: 'float',
		description: 'Speed to multiply.',
		'default': 1
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

AddPositionAction.prototype.addPosition = function (fsm) {
	if (this.entity) {
		var tpf = fsm.getTpf();

		var dx = _FsmUtils2.default.getValue(this.amountX, fsm);
		var dy = _FsmUtils2.default.getValue(this.amountY, fsm);
		var dz = _FsmUtils2.default.getValue(this.amountZ, fsm);

		this.entity.transformComponent.transform.translation.addDirect(dx * this.speed * tpf, dy * this.speed * tpf, dz * this.speed * tpf);

		this.entity.transformComponent.setUpdated();
	}
};

AddPositionAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.addPosition(fsm);
	}
};

AddPositionAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.addPosition(fsm);
	}
};
module.exports = exports.default;
