import { writeValue as LogicLayerjs_writeValue } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeFloat_outportFloat;
var LogicNodeFloat_editorName;
var LogicNodeFloat_logicInterface;
function LogicNodeFloat() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeFloat_logicInterface = LogicNodeFloat_logicInterface;;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeFloat_editorName = "Float";;

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayerjs_writeValue(this.logicInstance, LogicNodeFloat_outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeFloat_outportFloat, this.value);
};

LogicNodesjs_registerType('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeFloat_outportFloat = LogicNodeFloat_logicInterface.addOutputProperty("value", "float");;
LogicNodeFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

var exported_LogicNodeFloat = LogicNodeFloat;

/**
 * Logic node that provides a float value.
 * @private
 */
export { exported_LogicNodeFloat as LogicNodeFloat };