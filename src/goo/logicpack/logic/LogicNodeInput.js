import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeInput_outportInput;
var LogicNodeInput_editorName;
var LogicNodeInput_logicInterface;
function LogicNodeInput() {
	LogicNodejs.call(this);
	LogicNodeInput_logicInterface = LogicNodeInput_logicInterface;;
	this.type = 'LogicNodeInput';
	this.dummyInport = null;
}

LogicNodeInput.prototype = Object.create(LogicNodejs.prototype);
LogicNodeInput_editorName = "Input";;

// Configure new input.
LogicNodeInput.prototype.onConfigure = function (newConfig) {
	this.dummyInport = LogicInterfacejs.createDynamicInput(newConfig.Name);
};

LogicNodeInput.prototype.onInputChanged = function (instDesc, portID, value) {
	// this will be the dummy inport getting values written.
	LogicLayerjs.writeValue(this.logicInstance, LogicNodeInput_outportInput, value);
};

LogicNodesjs.registerType('LogicNodeInput', LogicNodeInput);

LogicNodeInput_logicInterface = new LogicInterfacejs();

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