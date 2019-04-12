Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CopyVariableAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _FsmUtils = require("../FsmUtils");

var _FsmUtils2 = _interopRequireDefault(_FsmUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function CopyVariableAction() {
	_Action2.default.apply(this, arguments);
}

CopyVariableAction.prototype = Object.create(_Action2.default.prototype);
CopyVariableAction.prototype.constructor = CopyVariableAction;

CopyVariableAction.external = {
	key: 'Copy Variable',
	name: 'Copy Variable',
	type: 'variables',
	description: '',
	parameters: [{
		name: 'Variable Target',
		key: 'variableTarget',
		type: 'identifier'
	}, {
		name: 'Variable Source',
		key: 'variableSource',
		type: 'identifier'
	}, {
		name: 'Value',
		key: 'value',
		type: 'float'
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': false
	}],
	transitions: []
};

CopyVariableAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.copy(fsm);
	}
};

CopyVariableAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.copy(fsm);
	}
};

CopyVariableAction.prototype.copy = function (fsm) {
	var ownerEntity = fsm.getOwnerEntity();
	if (this.variableTarget && ownerEntity) {
		try {
			var val;
			if (this.variableSource) {
				val = _FsmUtils2.default.getValue(this.variableSource, fsm);
			} else {
				val = _FsmUtils2.default.getValue(this.value, fsm);
			}
			ownerEntity[this.variableTarget] = val;
		} catch (err) {
			console.warn(err);
		}
	}
};
module.exports = exports.default;
