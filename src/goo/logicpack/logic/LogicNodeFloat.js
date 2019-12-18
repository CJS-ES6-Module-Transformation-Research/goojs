import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
function LogicNodeFloat() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeFloat.logicInterface;
	this.type = 'LogicNodeFloat';
}

LogicNodeFloat.prototype = Object.create(LogicNode.prototype);
LogicNodeFloat.editorName = 'Float';

LogicNodeFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayer.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
	}
};

LogicNodeFloat.prototype.onSystemStarted = function () {
	LogicLayer.writeValue(this.logicInstance, LogicNodeFloat.outportFloat, this.value);
};

LogicNodes.registerType('LogicNodeFloat', LogicNodeFloat);

LogicNodeFloat.logicInterface = new LogicInterface();
LogicNodeFloat.outportFloat = LogicNodeFloat.logicInterface.addOutputProperty('value', 'float');
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