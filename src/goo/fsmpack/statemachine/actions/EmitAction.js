import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../../entities/SystemBus";

function EmitAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

EmitAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
EmitAction.prototype.constructor = EmitAction;

EmitAction.external = {
	key: 'Emit message',
	name: 'Emit Message',
	type: 'transitions',
	description: 'Emits a message (event) to a channel on the bus. Messages can be listened to by the Listen action, or by scripts using the SystemBus.addListener(channel, callback) function.',
	parameters: [{
		name: 'Channel',
		key: 'channel',
		type: 'string',
		description: 'Channel to transmit a message (event) on.',
		'default': ''
	}],
	transitions: []
};

EmitAction.prototype.enter = function (/*fsm*/) {
	entitiesSystemBus_SystemBusjsjs.emit(this.channel, this.data); // data is unused?
};

var exported_EmitAction = EmitAction;
export { exported_EmitAction as EmitAction };