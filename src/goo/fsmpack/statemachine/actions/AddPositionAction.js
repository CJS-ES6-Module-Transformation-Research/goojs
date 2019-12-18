Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddPositionAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var FsmUtils = _interopRequireWildcard(_FsmUtils);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_AddPositionAction = AddPositionAction;

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

		var dx = FsmUtils.getValue(this.amountX, fsm);
		var dy = FsmUtils.getValue(this.amountY, fsm);
		var dz = FsmUtils.getValue(this.amountZ, fsm);

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

exports.AddPositionAction = exported_AddPositionAction;
