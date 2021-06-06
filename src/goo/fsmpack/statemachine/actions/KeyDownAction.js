var mod_KeyDownAction = KeyDownAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as FsmUtils_FsmUtils } from "../../../fsmpack/statemachine/FsmUtils";

function KeyDownAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

KeyDownAction.prototype = Object.create(Action_Action.prototype);
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
	this.key = settings.key ? FsmUtils_FsmUtils.getKey(settings.key) : null;
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

export { mod_KeyDownAction as KeyDownAction };