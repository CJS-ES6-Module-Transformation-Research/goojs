Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TransitionOnMessageAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function TransitionOnMessageAction() {
	_Action2.default.apply(this, arguments);
}

TransitionOnMessageAction.prototype = Object.create(_Action2.default.prototype);
TransitionOnMessageAction.prototype.constructor = TransitionOnMessageAction;

TransitionOnMessageAction.external = {
	key: 'Transition on Message',
	name: 'Listen',
	type: 'transitions',
	description: 'Performs a transition on receiving a system bus message (event) on a specific channel.',
	canTransition: true,
	parameters: [{
		name: 'Message channel',
		key: 'channel',
		type: 'string',
		description: 'Channel to listen to.',
		'default': ''
	}],
	transitions: [{
		key: 'transition',
		description: 'State to transition to.'
	}]
};

TransitionOnMessageAction.getTransitionLabel = function (transitionKey, actionConfig) {
	var label = actionConfig.options.channel ? '"' + actionConfig.options.channel + '"' : '';
	return transitionKey === 'transition' ? 'On ' + label + ' event' : 'On Message';
};

TransitionOnMessageAction.prototype.enter = function (fsm) {
	this.eventListener = function () /*data*/{
		fsm.send(this.transitions.transition);
	}.bind(this);
	_SystemBus2.default.addListener(this.channel, this.eventListener, false);
};

TransitionOnMessageAction.prototype.exit = function () /*fsm*/{
	_SystemBus2.default.removeListener(this.channel, this.eventListener);
};
module.exports = exports.default;
