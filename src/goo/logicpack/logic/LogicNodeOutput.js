import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
function LogicNodeOutput() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeOutput.logicInterface;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(LogicNode.prototype);
LogicNodeOutput.editorName = 'Output';

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayer.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () { };

// Configure new output.
LogicNode.prototype.onConfigure = function (newConfig) {
	this.realOutport = LogicInterface.createDynamicOutput(newConfig.Name);
};

LogicNodes.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput.logicInterface = new LogicInterface();
LogicNodeOutput.inportOutput = LogicNodeOutput.logicInterface.addInputProperty('Output', 'any');
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name'});

var exported_LogicNodeOutput = LogicNodeOutput;

/**
 * Logic node to be used as layer output.
 * @private
 */
export { exported_LogicNodeOutput as LogicNodeOutput };