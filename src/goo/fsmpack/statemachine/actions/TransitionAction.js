import { Action } from "../../../fsmpack/statemachine/actions/Action";
var exported_TransitionAction = TransitionAction;

function TransitionAction/*id, settings*/() {
	Action.apply(this, arguments);
}

TransitionAction.prototype = Object.create(Action.prototype);
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

export { exported_TransitionAction as TransitionAction };