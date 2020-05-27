"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeInput = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeInput_LogicNodeInput = LogicNodeInput;

function LogicNodeInput() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeInput.logicInterface;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeInput.editorName = 'Input';

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = _LogicInterface.LogicInterface.createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	_LogicLayer.LogicLayer.writeValue(this.logicInstance, LogicNodeInput.outportInput, value);
};

_LogicNodes.LogicNodes.registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput.logicInterface = new _LogicInterface.LogicInterface();

// TODO: This should be a both, not property/event.
LogicNodeInput.outportInput = LogicNodeInput.logicInterface.addOutputProperty('Input', 'any');

LogicNodeInput.logicInterface.addConfigEntry({
	name: 'Name',
	type: 'string',
	label: 'Name'
});

/**
 * Logic node to be used as Layer input.
 * @private
 */
exports.LogicNodeInput = LogicNodeInput_LogicNodeInput;