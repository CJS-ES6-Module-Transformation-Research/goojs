var mod_KeyUpAction = KeyUpAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { FsmUtils as FsmUtils_FsmUtils } from "../../../fsmpack/statemachine/FsmUtils";

function KeyUpAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

KeyUpAction.prototype = Object.create(Action_Action.prototype);
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

KeyUpAction.getTransitionLabel = function (transitionKey, actionConfig){
	return 'On Key ' + (actionConfig.options.key || '') + ' up';
};

KeyUpAction.prototype.configure = function (settings) {
	this.key = settings.key ? FsmUtils_FsmUtils.getKey(settings.key) : null;
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

export { mod_KeyUpAction as KeyUpAction };