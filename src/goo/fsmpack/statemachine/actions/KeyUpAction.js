Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = KeyUpAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var _FsmUtils2 = _interopRequireDefault(_FsmUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function KeyUpAction() {
	_Action2.default.apply(this, arguments);
}

KeyUpAction.prototype = Object.create(_Action2.default.prototype);
KeyUpAction.prototype.constructor = KeyUpAction;

KeyUpAction.external = {
	key: 'Key Up',
	name: 'Key Up',
	type: 'controls',
	description: 'Listens for a key release and performs a transition.',
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
		key: 'keyup',
		description: 'State to transition to when the key is released.'
	}]
};

KeyUpAction.getTransitionLabel = function (transitionKey, actionConfig) {
	return 'On Key ' + (actionConfig.options.key || '') + ' up';
};

KeyUpAction.prototype.configure = function (settings) {
	this.key = settings.key ? _FsmUtils2.default.getKey(settings.key) : null;
	this.transitions = { keyup: settings.transitions.keyup };
};

KeyUpAction.prototype.enter = function (fsm) {
	this.eventListener = function (event) {
		if (!this.key || event.which === +this.key) {
			fsm.send(this.transitions.keyup);
		}
	}.bind(this);
	document.addEventListener('keyup', this.eventListener);
};

KeyUpAction.prototype.exit = function () {
	document.removeEventListener('keyup', this.eventListener);
};
module.exports = exports.default;
