var StateMachineComponent_StateMachineComponent = StateMachineComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
import { remove as ArrayUtilsjs_remove } from "../../util/ArrayUtils";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../entities/SystemBus";
var StateMachineComponent_applyOnVariable;
var StateMachineComponent_getVariable;
var StateMachineComponent_vars;
function StateMachineComponent() {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'StateMachineComponent';

	this._machines = [];
	this._machinesById = {};
	this.entity = null;
	this.vars = {};
	this.system = null;
	this.time = 0;
	this.entered = false;

	this.active = true;
}

StateMachineComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);

StateMachineComponent_vars = {};;

StateMachineComponent_getVariable = function(name) {
    return StateMachineComponent_vars[name];
};;

StateMachineComponent.prototype.getVariable = function (name) {
	if (this.vars[name] !== undefined) {
		return this.vars[name];
	} else {
		return StateMachineComponent_getVariable(name);
	}
};

StateMachineComponent_applyOnVariable = function(name, fun) {
    StateMachineComponent_vars[name] = fun(StateMachineComponent_vars[name]);
};;

StateMachineComponent.prototype.applyOnVariable = function (name, fun) {
	if (this.vars[name] !== undefined) {
		this.vars[name] = fun(this.vars[name]);
	} else {
		StateMachineComponent_applyOnVariable(name, fun);
	}
};

StateMachineComponent.prototype.defineVariable = function (name, initialValue) {
	this.vars[name] = initialValue;
};

StateMachineComponent.prototype.removeVariable = function (name) {
	delete this.vars[name];
};

StateMachineComponent_applyOnVariable = function (name, fun) {
	if (this.vars[name]) {
		this.vars[name] = fun(this.vars[name]);
	} else if (StateMachineComponent_vars[name]) {
		StateMachineComponent_applyOnVariable(name, fun);
	}
};

StateMachineComponent.prototype.addMachine = function (machine) {
	machine.parent = this;
	machine.setRefs(this);
	this._machines.push(machine);
	this._machinesById[machine.id] = machine;
};

StateMachineComponent.prototype.removeMachine = function (machine) {
	machine.recursiveRemove();
	ArrayUtilsjs_remove(this._machines, machine);
	delete this._machinesById[machine.id];
};

/**
 * Gets the state machine with the specified identifier.
 *
 * @param {string} id
 *        The identifier of the machine which is to be returned.
 *
 * @return {Machine}
 *         The state machine which was found or null if the specified state
 *         machine is not in the component.
 */
StateMachineComponent.prototype.getMachineById = function (id) {
	return this._machinesById[id] || null;
};

/**
 * Resets all state machines to their initial state
 */
StateMachineComponent.prototype.init = function () {
	for (var i = 0; i < this._machines.length; i++) {
		var machine = this._machines[i];
		machine.setRefs(this);
		machine.reset();
		machine.ready();
	}
};

StateMachineComponent.prototype.doEnter = function () {
	for (var i = 0; i < this._machines.length; i++) {
		var machine = this._machines[i];
		machine.enter();
	}
};

/**
 * Kills the state machines triggering exit functions in all current states
 */
StateMachineComponent.prototype.kill = function () {
	for (var i = 0; i < this._machines.length; i++) {
		var machine = this._machines[i];
		machine.kill();
	}
};

/**
 * Performs a cleanup; undoes any changes not undone by exit methods
 */
StateMachineComponent.prototype.cleanup = function () {
	for (var i = 0; i < this._machines.length; i++) {
		var machine = this._machines[i];
		machine.cleanup();
	}
};

/**
 * Updates the state machines
 */
StateMachineComponent.prototype.update = function () {
	if (this.active) {
		for (var i = 0; i < this._machines.length; i++) {
			var machine = this._machines[i];
			machine.update();
		}
	}
};

/**
 * Stops updating the state machines
 */
StateMachineComponent.prototype.pause = function () {
	this.active = false;
	entitiesSystemBus_SystemBusjsjs.emit('goo.entity.' + this.entity.name + '.fsm.pause');
};

/**
 * Resumes updating the state machines
 */
StateMachineComponent.prototype.play = function () {
	this.active = true;
	entitiesSystemBus_SystemBusjsjs.emit('goo.entity.' + this.entity.name + '.fsm.play');
};

/**
 * StateMachineComponent
 * @private
 */
export { StateMachineComponent_StateMachineComponent as StateMachineComponent };
