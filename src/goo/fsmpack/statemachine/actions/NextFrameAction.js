import { Action as Actionjs } from "./Action";

function NextFrameAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

NextFrameAction.prototype = Object.create(Actionjs.prototype);
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

var exported_NextFrameAction = NextFrameAction;
export { exported_NextFrameAction as NextFrameAction };