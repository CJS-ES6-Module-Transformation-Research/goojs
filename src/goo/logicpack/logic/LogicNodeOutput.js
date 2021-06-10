var mod_LogicNodeOutput = LogicNodeOutput;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node to be used as layer output.
 * @private
 */
function LogicNodeOutput() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeOutput.logicInterface;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeOutput.editorName = 'Output';

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayer_LogicLayer.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () { };

// Configure new output.
LogicNode_LogicNode.prototype.onConfigure = function (newConfig) {
	this.realOutport = LogicInterface_LogicInterface.createDynamicOutput(newConfig.Name);
};

LogicNodes_LogicNodes.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput.logicInterface = new LogicInterface_LogicInterface();
LogicNodeOutput.inportOutput = LogicNodeOutput.logicInterface.addInputProperty('Output', 'any');
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name'});

/**
 * Logic node to be used as layer output.
 * @private
 */
export { mod_LogicNodeOutput as LogicNodeOutput };