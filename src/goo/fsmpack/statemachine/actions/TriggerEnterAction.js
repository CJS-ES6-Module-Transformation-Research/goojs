Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TriggerEnterAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function TriggerEnterAction() {
	_Action2.default.apply(this, arguments);
	this.entity = null;
}

TriggerEnterAction.prototype = Object.create(_Action2.default.prototype);
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

TriggerEnterAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
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
	_SystemBus2.default.addListener('goo.physics.triggerEnter', this.listener);
};

TriggerEnterAction.prototype.exit = function () /*fsm*/{
	_SystemBus2.default.removeListener('goo.physics.triggerEnter', this.listener);
	this.entity = null;
};
module.exports = exports.default;
