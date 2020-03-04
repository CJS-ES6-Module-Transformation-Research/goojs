import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function HtmlAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

HtmlAction.prototype = Object.create(Actionjs.prototype);
HtmlAction.prototype.constructor = HtmlAction;

HtmlAction.external = {
	key: 'HTMLPick',
	name: 'HTMLPick',
	type: 'controls',
	description: 'Listens for a picking event and performs a transition. Can only be used on HTML entities.',
	canTransition: true,
	parameters: [], // but not farther than some value
	transitions: [{
		key: 'pick',
		description: 'State to transition to when the HTML entity is picked.'
	}]
};

HtmlAction.getTransitionLabel = function (/*transitionKey, actionConfig*/){
	return 'On HTML Pick';
};

HtmlAction.prototype.enter = function (fsm) {
	var ownerEntity = fsm.getOwnerEntity();
	if (ownerEntity.htmlComponent) {
		this.eventListener = function () {
			fsm.send(this.transitions.pick);
		}.bind(this);
		this.domElement = ownerEntity.htmlComponent.domElement;
		this.domElement.addEventListener('click', this.eventListener);
	}
};

HtmlAction.prototype.exit = function (fsm) {
	var ownerEntity = fsm.getOwnerEntity();
	if (ownerEntity.htmlComponent && this.domElement) {
		this.domElement.removeEventListener('click', this.eventListener);
	}
};

var exported_HtmlAction = HtmlAction;
export { exported_HtmlAction as HtmlAction };