Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KeyPressedAction = undefined;

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

function KeyPressedAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

KeyPressedAction.prototype = Object.create(_Action.Action.prototype);
KeyPressedAction.prototype.constructor = KeyPressedAction;

KeyPressedAction.external = {
	key: 'Key Pressed',
	name: 'Key Pressed',
	type: 'controls',
	description: 'Listens for a key press event and performs a transition. Works over transition boundaries.',
	canTransition: true,
	parameters: [{
		name: 'Key',
		key: 'key',
		type: 'string',
		control: 'key',
		description: 'Key to listen for.',
		'default': 'A'
	}],
	transitions: [{
		key: 'keydown',
		description: 'State to transition to when the key is pressed.'
	}]
};

KeyPressedAction.getTransitionLabel = function (transitionKey, actionConfig) {
	return 'On Key ' + (actionConfig.options.key || '') + ' pressed';
};

KeyPressedAction.prototype.configure = function (settings) {
	this.key = settings.key ? FsmUtils.getKey(settings.key) : null;
	this.transitions = { keydown: settings.transitions.keydown };
};

KeyPressedAction.prototype.enter = function (fsm) {
	if (fsm.getInputState(this.key)) {
		fsm.send(this.transitions.keydown);
	}
};

KeyPressedAction.prototype.update = function (fsm) {
	if (fsm.getInputState(this.key)) {
		fsm.send(this.transitions.keydown);
	}
};

var exported_KeyPressedAction = KeyPressedAction;
exports.KeyPressedAction = exported_KeyPressedAction;
