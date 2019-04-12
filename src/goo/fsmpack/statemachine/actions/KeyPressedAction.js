Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = KeyPressedAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var _FsmUtils2 = _interopRequireDefault(_FsmUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function KeyPressedAction() {
	_Action2.default.apply(this, arguments);
}

KeyPressedAction.prototype = Object.create(_Action2.default.prototype);
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
	this.key = settings.key ? _FsmUtils2.default.getKey(settings.key) : null;
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
module.exports = exports.default;
