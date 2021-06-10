var mod_EmitAction = EmitAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { SystemBusjs as SystemBus } from "../../../entities/SystemBus";

function EmitAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

EmitAction.prototype = Object.create(Action_Action.prototype);
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
	SystemBus.emit(this.channel, this.data); // data is unused?
};

export { mod_EmitAction as EmitAction };