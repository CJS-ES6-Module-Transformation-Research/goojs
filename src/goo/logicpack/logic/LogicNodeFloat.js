var LogicNodeFloat_LogicNodeFloat = LogicNodeFloat;
import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeFloat() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeFloat.logicInterface;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeFloat.editorName = 'Float';

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
};

LogicNodes_LogicNodesjs.registerType('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeFloat.outportFloat = LogicNodeFloat.logicInterface.addOutputProperty('value', 'float');
LogicNodeFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

/**
 * Logic node that provides a float value.
 * @private
 */
export { LogicNodeFloat_LogicNodeFloat as LogicNodeFloat };