Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmitAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _SystemBus = require("../../../entities/SystemBus");

var SystemBus = _interopRequireWildcard(_SystemBus);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_EmitAction = EmitAction;

function EmitAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

EmitAction.prototype = Object.create(_Action.Action.prototype);
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

EmitAction.prototype.enter = function () /*fsm*/{
	SystemBus.emit(this.channel, this.data); // data is unused?
};

exports.EmitAction = exported_EmitAction;
