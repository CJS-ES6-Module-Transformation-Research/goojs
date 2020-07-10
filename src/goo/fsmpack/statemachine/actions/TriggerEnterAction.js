var TriggerEnterAction_TriggerEnterAction = TriggerEnterAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../../entities/SystemBus";

function TriggerEnterAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
	this.entity = null;
}

TriggerEnterAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
TriggerEnterAction.prototype.constructor = TriggerEnterAction;

TriggerEnterAction.external = {
	key: 'TriggerEnter',
	name: 'TriggerEnter',
	type: 'collision',
	description: 'Transitions when the trigger collider is entered. This action only works if the entity has a Collider Component.',
	canTransition: true,
	parameters: [],
	transitions: [{
		key: 'enter',
		description: 'State to transition to when enter occurs.'
	}]
};

TriggerEnterAction.getTransitionLabel = function (transitionKey/*, actionConfig*/){
	return transitionKey === 'enter' ? 'On Trigger Enter' : undefined;
};

TriggerEnterAction.prototype.enter = function (fsm) {
	this.entity = fsm.getOwnerEntity();
	var that = this;
	this.listener = function (triggerEnterEvent) {
		if (that.entity && triggerEnterEvent.entityA === that.entity || triggerEnterEvent.entityB === that.entity) {
			that.entity = null;
			// TODO: should this happen on postStep instead? Maybe the user will remove the entity here...
			fsm.send(that.transitions.enter);
		}
	};
	entitiesSystemBus_SystemBusjsjs.addListener('goo.physics.triggerEnter', this.listener);
};

TriggerEnterAction.prototype.exit = function (/*fsm*/) {
	entitiesSystemBus_SystemBusjsjs.removeListener('goo.physics.triggerEnter', this.listener);
	this.entity = null;
};

export { TriggerEnterAction_TriggerEnterAction as TriggerEnterAction };