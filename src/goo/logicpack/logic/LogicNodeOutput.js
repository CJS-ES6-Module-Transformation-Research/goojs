"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogicNodeOutput = undefined;

var _LogicLayer = require("./LogicLayer");

var _LogicNode = require("./LogicNode");

var _LogicNodes = require("./LogicNodes");

var _LogicInterface = require("./LogicInterface");

var LogicNodeOutput_inportOutput;
var LogicNodeOutput_editorName;
var LogicNodeOutput_logicInterface;
function LogicNodeOutput() {
	_LogicNode.LogicNode.call(this);
	LogicNodeOutput_logicInterface = LogicNodeOutput_logicInterface;;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(_LogicNode.LogicNode.prototype);
LogicNodeOutput_editorName = "Output";;

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	_LogicLayer.LogicLayer.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () {};

// Configure new output.
_LogicNode.LogicNode.prototype.onConfigure = function (newConfig) {
	this.realOutport = _LogicInterface.LogicInterface.createDynamicOutput(newConfig.Name);
};

_LogicNodes.LogicNodes.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput_logicInterface = new _LogicInterface.LogicInterface();
LogicNodeOutput_inportOutput = LogicNodeOutput_logicInterface.addInputProperty("Output", "any");;
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name' });

var exported_LogicNodeOutput = LogicNodeOutput;

/**
 * Logic node to be used as layer output.
 * @private
 */
exports.LogicNodeOutput = exported_LogicNodeOutput;
