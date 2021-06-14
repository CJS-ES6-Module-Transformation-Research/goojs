var mod_LogicNodeMultiplyFloat = LogicNodeMultiplyFloat;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that multiplies two floats.
 * @private
 */
function LogicNodeMultiplyFloat() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeMultiplyFloat.logicInterface;
	this.type = 'LogicNodeMultiplyFloat';
	this._x = this._y = 0; // REVIEW: unused?
}

LogicNodeMultiplyFloat.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeMultiplyFloat.editorName = 'MultiplyFloat';

LogicNodeMultiplyFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
	}
};

LogicNodeMultiplyFloat.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeMultiplyFloat.inportX);
	var y = this.value;
	LogicLayer_LogicLayer.writeValue(instDesc, LogicNodeMultiplyFloat.outportProduct, x * y);
};

LogicNodeMultiplyFloat.logicInterface = new LogicInterface_LogicInterface();
LogicNodeMultiplyFloat.outportProduct = LogicNodeMultiplyFloat.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiplyFloat.inportX = LogicNodeMultiplyFloat.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiplyFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

LogicNodes_LogicNodes.registerType('LogicNodeMultiplyFloat', LogicNodeMultiplyFloat);

/**
 * Logic node that multiplies two floats.
 * @private
 */
export { mod_LogicNodeMultiplyFloat as LogicNodeMultiplyFloat };