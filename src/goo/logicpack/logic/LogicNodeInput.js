import { writeValue as LogicLayerjs_writeValue } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";

import {
    LogicInterface as LogicInterface_LogicInterfacejs,
    createDynamicInput as LogicInterfacejs_createDynamicInput,
} from "./LogicInterface";

var LogicNodeInput_outportInput;
var LogicNodeInput_editorName;
var LogicNodeInput_logicInterface;
function LogicNodeInput() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeInput_logicInterface = LogicNodeInput_logicInterface;;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeInput_editorName = "Input";;

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = LogicInterfacejs_createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeInput_outportInput, value);
};

LogicNodesjs_registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput_logicInterface = new LogicInterface_LogicInterfacejs();

// TODO: This should be a both, not property/event.
LogicNodeInput_outportInput = LogicNodeInput_logicInterface.addOutputProperty("Input", "any");;

LogicNodeInput.logicInterface.addConfigEntry({
	name: 'Name',
	type: 'string',
	label: 'Name'
});

var exported_LogicNodeInput = LogicNodeInput;

/**
 * Logic node to be used as Layer input.
 * @private
 */
export { exported_LogicNodeInput as LogicNodeInput };