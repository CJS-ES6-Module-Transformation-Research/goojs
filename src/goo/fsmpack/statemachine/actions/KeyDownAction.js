import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { getKey as FsmUtilsjs_getKey } from "../../../fsmpack/statemachine/FsmUtils";

function KeyDownAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

KeyDownAction.prototype = Object.create(Action_Actionjs.prototype);
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
	this.key = settings.key ? FsmUtilsjs_getKey(settings.key) : null;
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

var exported_KeyDownAction = KeyDownAction;
export { exported_KeyDownAction as KeyDownAction };