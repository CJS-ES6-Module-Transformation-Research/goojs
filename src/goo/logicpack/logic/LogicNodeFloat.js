var mod_LogicNodeFloat = LogicNodeFloat;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that provides a float value.
 * @private
 */
function LogicNodeFloat() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeFloat.logicInterface;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeFloat.editorName = 'Float';

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
};

LogicNodes_LogicNodes.registerType('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat.logicInterface = new LogicInterface_LogicInterface();
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
export { mod_LogicNodeFloat as LogicNodeFloat };