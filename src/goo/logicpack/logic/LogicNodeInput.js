var LogicNodeInput_LogicNodeInput = LogicNodeInput;
import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeInput() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeInput.logicInterface;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeInput.editorName = 'Input';

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = LogicInterface_LogicInterfacejs.createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeInput.outportInput, value);
};

LogicNodes_LogicNodesjs.registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput.logicInterface = new LogicInterface_LogicInterfacejs();

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
export { LogicNodeInput_LogicNodeInput as LogicNodeInput };