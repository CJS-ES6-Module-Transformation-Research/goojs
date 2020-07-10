"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeOutput = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeOutput_LogicNodeOutput = LogicNodeOutput;

function LogicNodeOutput() {
	_LogicNode.LogicNode.call(this);
	this.logicInterface = LogicNodeOutput.logicInterface;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeOutput.editorName = 'Output';

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	_LogicLayer.LogicLayer.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () {};

// Configure new output.
_LogicNode.LogicNode.prototype.onConfigure = function (newConfig) {
	this.realOutport = _LogicInterface.LogicInterface.createDynamicOutput(newConfig.Name);
};

_LogicNodes.LogicNodes.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput.logicInterface = new _LogicInterface.LogicInterface();
LogicNodeOutput.inportOutput = LogicNodeOutput.logicInterface.addInputProperty('Output', 'any');
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name' });

/**
 * Logic node to be used as layer output.
 * @private
 */
exports.LogicNodeOutput = LogicNodeOutput_LogicNodeOutput;