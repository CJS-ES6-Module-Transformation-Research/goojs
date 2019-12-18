Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StateMachineComponentHandler = undefined;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _StateMachineComponent = require("../fsmpack/statemachine/StateMachineComponent");

var _rsvp = require("../util/rsvp");

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

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

function StateMachineComponentHandler() {
	_ComponentHandler.ComponentHandler.apply(this, arguments);
	this._type = 'StateMachineComponent';
}

StateMachineComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
StateMachineComponentHandler.prototype.constructor = StateMachineComponentHandler;
_ComponentHandler.ComponentHandler._registerClass('stateMachine', StateMachineComponentHandler);

/**
 * Create statemachine component
 * @returns {StateMachineComponent} the created component object
 * @hidden
 */
StateMachineComponentHandler.prototype._create = function () {
	return new _StateMachineComponent.StateMachineComponent();
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

	return _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		var promises = [];
		ObjectUtils.forEach(config.machines, function (machineConfig) {
			promises.push(that._load(machineConfig.machineRef, options));
		}, null, 'sortValue');

		return _rsvp.anonymus.all(promises).then(function (machines) {
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

var exported_StateMachineComponentHandler = StateMachineComponentHandler;

/**
 * For handling loading of state machine components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
exports.StateMachineComponentHandler = exported_StateMachineComponentHandler;
