Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = EmitAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function EmitAction() {
	_Action2.default.apply(this, arguments);
}

EmitAction.prototype = Object.create(_Action2.default.prototype);
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
	_SystemBus2.default.emit(this.channel, this.data); // data is unused?
};
module.exports = exports.default;
