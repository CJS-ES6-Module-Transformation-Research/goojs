var NextFrameAction_NextFrameAction = NextFrameAction;
import { Action as Action_Actionjs } from "./Action";

function NextFrameAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

NextFrameAction.prototype = Object.create(Action_Actionjs.prototype);
NextFrameAction.prototype.constructor = NextFrameAction;

NextFrameAction.external = {
	key: 'transitionOnNextFrame',
	name: 'Transition on next frame',
	type: 'transitions',
	description: 'Transition to a selected state on the next frame.',
	canTransition: true,
	parameters: [],
	transitions: [{
		key: 'transition',
		name: 'On Next Frame',
		description: 'State to transition to on next frame.'
	}]
};

var labels = {
	transition: 'On Next Frame'
};

NextFrameAction.getTransitionLabel = function (transitionKey /*, actionConfig*/){
	return labels[transitionKey];
};

NextFrameAction.prototype.update = function (fsm) {
	fsm.send(this.transitions.transition);
};

export { NextFrameAction_NextFrameAction as NextFrameAction };