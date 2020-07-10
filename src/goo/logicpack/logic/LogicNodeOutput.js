var LogicNodeOutput_LogicNodeOutput = LogicNodeOutput;
import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeOutput() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeOutput.logicInterface;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeOutput.editorName = 'Output';

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayer_LogicLayerjs.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () { };

// Configure new output.
LogicNode_LogicNodejs.prototype.onConfigure = function (newConfig) {
	this.realOutport = LogicInterface_LogicInterfacejs.createDynamicOutput(newConfig.Name);
};

LogicNodes_LogicNodesjs.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeOutput.inportOutput = LogicNodeOutput.logicInterface.addInputProperty('Output', 'any');
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name'});

/**
 * Logic node to be used as layer output.
 * @private
 */
export { LogicNodeOutput_LogicNodeOutput as LogicNodeOutput };