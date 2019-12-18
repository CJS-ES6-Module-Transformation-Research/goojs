Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.KeyDownAction = undefined;

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

var exported_KeyDownAction = KeyDownAction;

function KeyDownAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

KeyDownAction.prototype = Object.create(_Action.Action.prototype);
KeyDownAction.prototype.constructor = KeyDownAction;

KeyDownAction.external = {
	key: 'Key Down',
	name: 'Key Down',
	type: 'controls',
	description: 'Listens for a key press and performs a transition.',
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

KeyDownAction.getTransitionLabel = function (transitionKey, actionConfig) {
	return 'On Key ' + (actionConfig.options.key || '') + ' down';
};

KeyDownAction.prototype.configure = function (settings) {
	this.key = settings.key ? FsmUtils.getKey(settings.key) : null;
	this.transitions = { keydown: settings.transitions.keydown };
};

KeyDownAction.prototype.enter = function (fsm) {
	this.eventListener = function (event) {
		if (this.key && event.which === +this.key) {
			fsm.send(this.transitions.keydown);
		}
	}.bind(this);
	document.addEventListener('keydown', this.eventListener);
};

KeyDownAction.prototype.exit = function () {
	document.removeEventListener('keydown', this.eventListener);
};

exports.KeyDownAction = exported_KeyDownAction;
