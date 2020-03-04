import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
var LogicNodeFloat_outportFloat;
var LogicNodeFloat_editorName;
var LogicNodeFloat_logicInterface;
function LogicNodeFloat() {
	LogicNodejs.call(this);
	LogicNodeFloat_logicInterface = LogicNodeFloat_logicInterface;;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(LogicNodejs.prototype);
LogicNodeFloat_editorName = "Float";;

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayerjs.writeValue(this.logicInstance, LogicNodeFloat_outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	LogicLayerjs.writeValue(this.logicInstance, LogicNodeFloat_outportFloat, this.value);
};

LogicNodesjs.registerType('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat_logicInterface = new LogicInterfacejs();
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