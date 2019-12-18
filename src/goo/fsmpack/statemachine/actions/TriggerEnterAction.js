Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TriggerEnterAction = undefined;

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

var exported_TriggerEnterAction = TriggerEnterAction;

function TriggerEnterAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
	this.entity = null;
}

TriggerEnterAction.prototype = Object.create(_Action.Action.prototype);
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
	SystemBus.addListener('goo.physics.triggerEnter', this.listener);
};

TriggerEnterAction.prototype.exit = function () /*fsm*/{
	SystemBus.removeListener('goo.physics.triggerEnter', this.listener);
	this.entity = null;
};

exports.TriggerEnterAction = exported_TriggerEnterAction;
