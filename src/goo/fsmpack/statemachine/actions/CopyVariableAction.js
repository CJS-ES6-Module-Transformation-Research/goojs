var _Action = require("./Action");

var _FsmUtils = require("../FsmUtils");

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

function CopyVariableAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}

CopyVariableAction.prototype = Object.create(_Action.Action.prototype);
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
				val = FsmUtils.getValue(this.variableSource, fsm);
			} else {
				val = FsmUtils.getValue(this.value, fsm);
			}
			ownerEntity[this.variableTarget] = val;
		} catch (err) {
			console.warn(err);
		}
	}
};

module.exports = CopyVariableAction;
