var mod_LogicNodeInput = LogicNodeInput;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node to be used as Layer input.
 * @private
 */
function LogicNodeInput() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeInput.logicInterface;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeInput.editorName = 'Input';

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = LogicInterface_LogicInterface.createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeInput.outportInput, value);
};

LogicNodes_LogicNodes.registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput.logicInterface = new LogicInterface_LogicInterface();

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
export { mod_LogicNodeInput as LogicNodeInput };