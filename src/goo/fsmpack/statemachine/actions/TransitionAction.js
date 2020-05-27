var TransitionAction_TransitionAction = TransitionAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function TransitionAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

TransitionAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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

export { TransitionAction_TransitionAction as TransitionAction };