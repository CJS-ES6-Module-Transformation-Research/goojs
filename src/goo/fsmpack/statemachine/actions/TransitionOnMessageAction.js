Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TransitionOnMessageAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _SystemBus = require("../../../entities/SystemBus");

var SystemBus = _interopRequireWildcard(_SystemBus);

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

var exported_TransitionOnMessageAction = TransitionOnMessageAction;

function TransitionOnMessageAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

TransitionOnMessageAction.prototype = Object.create(_Action.Action.prototype);
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
	SystemBus.addListener(this.channel, this.eventListener, false);
};

TransitionOnMessageAction.prototype.exit = function () /*fsm*/{
	SystemBus.removeListener(this.channel, this.eventListener);
};

exports.TransitionOnMessageAction = exported_TransitionOnMessageAction;
