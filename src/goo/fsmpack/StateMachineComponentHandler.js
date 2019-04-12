Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = StateMachineComponentHandler;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _StateMachineComponent = require("../fsmpack/statemachine/StateMachineComponent");

var _StateMachineComponent2 = _interopRequireDefault(_StateMachineComponent);

var _rsvp = require("../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of state machine components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function StateMachineComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'StateMachineComponent';
}

StateMachineComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
StateMachineComponentHandler.prototype.constructor = StateMachineComponentHandler;
_ComponentHandler2.default._registerClass('stateMachine', StateMachineComponentHandler);

/**
 * Create statemachine component
 * @returns {StateMachineComponent} the created component object
 * @hidden
 */
StateMachineComponentHandler.prototype._create = function () {
	return new _StateMachineComponent2.default();
};

StateMachineComponentHandler.prototype._remove = function (entity) {
	var component = entity.stateMachineComponent;
	if (component) {
		for (var i = component._machines.length - 1; i >= 0; i--) {
			var machine = component._machines[i];
			machine.cleanup();
			component.removeMachine(machine);
		}

		component.cleanup();
	}

	entity.clearComponent(this._type);
};

/**
 * Update engine statemachine component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
StateMachineComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;
	options = options || {};
	options.reload = true;
	options.instantiate = true;

	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		var promises = [];
		_ObjectUtils2.default.forEach(config.machines, function (machineConfig) {
			promises.push(that._load(machineConfig.machineRef, options));
		}, null, 'sortValue');

		return _rsvp2.default.all(promises).then(function (machines) {
			// Adding new machines
			for (var i = 0; i < machines.length; i++) {
				if (component._machines.indexOf(machines[i]) === -1) {
					component.addMachine(machines[i]);
				}
			}
			// Removing old machines
			for (var i = component._machines.length - 1; i >= 0; i--) {
				if (machines.indexOf(component._machines[i]) === -1) {
					component.removeMachine(component._machines[i]);
				}
			}
			return component;
		});
	});
};
module.exports = exports.default;
