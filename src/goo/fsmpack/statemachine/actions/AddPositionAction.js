Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddPositionAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

function AddPositionAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

AddPositionAction.prototype = Object.create(_Action.Action.prototype);
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

		var dx = (0, _FsmUtils.getValue)(this.amountX, fsm);
		var dy = (0, _FsmUtils.getValue)(this.amountY, fsm);
		var dz = (0, _FsmUtils.getValue)(this.amountZ, fsm);

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

var exported_AddPositionAction = AddPositionAction;
exports.AddPositionAction = exported_AddPositionAction;
