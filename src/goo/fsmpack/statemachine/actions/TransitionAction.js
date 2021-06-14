var mod_TransitionAction = TransitionAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function TransitionAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

TransitionAction.prototype = Object.create(Action_Action.prototype);
TransitionAction.prototype.constructor = TransitionAction;

TransitionAction.external = {
	key: 'Transition',
	name: 'Transition',
	type: 'transitions',
	description: 'Transition to a selected state.',
	canTransition: true,
	parameters: [],
	transitions: [{
		key: 'transition',
		description: 'State to transition to.'
	}]
};

var labels = {
	transition: 'On Enter'
};

TransitionAction.getTransitionLabel = function (transitionKey /*, actionConfig*/){
	return labels[transitionKey];
};

TransitionAction.prototype.enter = function (fsm) {
	fsm.send(this.transitions.transition);
};

export { mod_TransitionAction as TransitionAction };