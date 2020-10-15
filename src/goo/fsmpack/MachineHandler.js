var MachineHandler_MachineHandler = MachineHandler;
import { ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs } from "../loaders/handlers/ConfigHandler";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";
import { State as fsmpackstatemachineState_Statejs } from "../fsmpack/statemachine/State";
import { Machine as fsmpackstatemachineMachine_Machinejs } from "../fsmpack/statemachine/Machine";
import { actionForType as Actionsjs_actionForType } from "../fsmpack/statemachine/actions/Actions";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../util/rsvp";
function MachineHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

MachineHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
MachineHandler.prototype.constructor = MachineHandler;

loadershandlersConfigHandler_ConfigHandlerjs._registerClass('machine', MachineHandler);

/**
 * Creates an empty machine
 * @returns {Machine}
 * @private
 */
MachineHandler.prototype._create = function () {
	return new fsmpackstatemachineMachine_Machinejs();
};

/**
 * Preparing sound config by populating it with defaults.
 * @param {Object} config
 * @private
 */
MachineHandler.prototype._prepare = function (config) {
	utilObjectUtils_ObjectUtilsjs.defaults(config, {
		maxLoopDepth: 100,
		asyncMode: true
	});
};

/**
 * Adds/updates/removes a machine
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @private
 * @returns {RSVP.Promise} Resolves with the updated machine or null if removed
 */
MachineHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return loadershandlersConfigHandler_ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (machine) {
		if (!machine) { return; }
		machine.id = ref;
		machine.name = config.name;
		machine.maxLoopDepth = config.maxLoopDepth;
		machine.asyncMode = config.asyncMode;

		// Remove old states
		for (var key in machine._states) {
			if (!config.states[key]) {
				machine.removeState(key);
			}
		}
		// Update existing states and create new ones
		var promises = [];
		for (var key in config.states) {
			promises.push(that._updateState(machine, config.states[key], options));
		}
		return utilrsvp_rsvpjsjs.all(promises).then(function () {
			machine.setInitialState(config.initialState);
			return machine;
		});
	});
};

/**
 * Update actions on a state
 * @param {State} state
 * @param {Object} config
 * @private
 */
MachineHandler.prototype._updateActions = function (state, stateConfig) {
	// Remove old actions
	for (var i = 0; i < state._actions.length; i++) {
		var action = state._actions[i];
		if (!stateConfig.actions || !stateConfig.actions[action.id]) {
			state.removeAction(action);
			i--;
		}
	}

	// Update new and existing ones
	// For actions, order is (or will be) important
	var actions = [];
	utilObjectUtils_ObjectUtilsjs.forEach(stateConfig.actions, function (actionConfig) {
		var action = state.getAction(actionConfig.id);
		if (!action) {
			var Action = Actionsjs_actionForType(actionConfig.type);
			action = new Action(actionConfig.id, actionConfig.options);
			if (action.onCreate) {
				action.onCreate(state.proxy);
			}
			//state.addAction(action);
		} else {
			action.configure(actionConfig.options);
		}
		actions.push(action);
	}, null, 'sortValue');
	state._actions = actions;
};

/**
 * Update transitions on the machine
 * @param {State} state
 * @param {Object} config
 * @private
 */
MachineHandler.prototype._updateTransitions = function (state, stateConfig) {
	state._transitions = {};
	for (var key in stateConfig.transitions) {
		var transition = stateConfig.transitions[key];
		state.setTransition(transition.id, transition.targetState);
	}
};

/**
 * Update states on the machine. This includes loading childMachines
 * @param {State} state
 * @param {Object} config
 * @private
 */
MachineHandler.prototype._updateState = function (machine, stateConfig, options) {
	var state;
	if (machine._states && machine._states[stateConfig.id]) {
		state = machine._states[stateConfig.id];
	} else {
		state = new fsmpackstatemachineState_Statejs(stateConfig.id);
		machine.addState(state);
	}
	state.name = stateConfig.name;

	// Actions
	this._updateActions(state, stateConfig);
	// Transitions
	this._updateTransitions(state, stateConfig);
	// Child machines
	// Removing
	for (var i = 0; i < state._machines; i++) {
		var childMachine = state._machines[i];
		if (!stateConfig.childMachines[childMachine.id]) {
			state.removeMachine(childMachine);
			i--;
		}
	}
	// Updating
	var promises = [];
	for (var key in stateConfig.childMachines) {
		promises.push(this._load(stateConfig.childMachines[key].machineRef, options));
	}

	/*
	// TODO: Test and use this. Will make the promises sorted correctly.
	ObjectUtils.forEach(stateConfig.childMachines, function (childMachineConfig) {
		promises.push(that._load(childMachineConfig.machineRef, options));
	}, null, 'sortValue');
	*/

	return utilrsvp_rsvpjsjs.all(promises).then(function (machines) {
		for (var i = 0; i < machines; i++) {
			state.addMachine(machines[i]);
		}
		return state;
	});
};

/**
 * Handler for loading materials into engine
 * @hidden
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 */
export { MachineHandler_MachineHandler as MachineHandler };
