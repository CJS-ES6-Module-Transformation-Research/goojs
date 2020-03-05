import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeOutput_inportOutput;
var LogicNodeOutput_editorName;
var LogicNodeOutput_logicInterface;
function LogicNodeOutput() {
	LogicNodejs.call(this);
	LogicNodeOutput_logicInterface = LogicNodeOutput_logicInterface;;
	this.type = 'LogicNodeOutput';
	this.realOutport = null;
}

LogicNodeOutput.prototype = Object.create(LogicNodejs.prototype);
LogicNodeOutput_editorName = "Output";;

LogicNodeOutput.prototype.onInputChanged = function (instDesc, portID, value) {
	LogicLayerjs.writeValueToLayerOutput(instDesc, this.realOutport, value);
};

LogicNodeOutput.prototype.onEvent = function () { };

// Configure new output.
LogicNodejs.prototype.onConfigure = function (newConfig) {
	this.realOutport = LogicInterfacejs.createDynamicOutput(newConfig.Name);
};

LogicNodesjs.registerType('LogicNodeOutput', LogicNodeOutput);

LogicNodeOutput_logicInterface = new LogicInterfacejs();
LogicNodeOutput_inportOutput = LogicNodeOutput_logicInterface.addInputProperty("Output", "any");;
LogicNodeOutput.logicInterface.addConfigEntry({ name: 'Name', type: 'string', label: 'Name'});

var exported_LogicNodeOutput = LogicNodeOutput;

/**
 * Logic node to be used as layer output.
 * @private
 */
export { exported_LogicNodeOutput as LogicNodeOutput };