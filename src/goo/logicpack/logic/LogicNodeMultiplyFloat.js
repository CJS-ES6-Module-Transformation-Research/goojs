var LogicNodeMultiplyFloat_LogicNodeMultiplyFloat = LogicNodeMultiplyFloat;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeMultiplyFloat() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeMultiplyFloat.logicInterface;
	this.type = 'LogicNodeMultiplyFloat';
	this._x = this._y = 0; // REVIEW: unused?
}

LogicNodeMultiplyFloat.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMultiplyFloat.editorName = 'MultiplyFloat';

LogicNodeMultiplyFloat.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
	}
};

LogicNodeMultiplyFloat.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayerjs_readPort(instDesc, LogicNodeMultiplyFloat.inportX);
	var y = this.value;
	LogicLayerjs_writeValue(instDesc, LogicNodeMultiplyFloat.outportProduct, x * y);
};

LogicNodeMultiplyFloat.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMultiplyFloat.outportProduct = LogicNodeMultiplyFloat.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiplyFloat.inportX = LogicNodeMultiplyFloat.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiplyFloat.logicInterface.addConfigEntry({
	name: 'value',
	type: 'float',
	label: 'Value'
});

LogicNodesjs_registerType('LogicNodeMultiplyFloat', LogicNodeMultiplyFloat);

/**
 * Logic node that multiplies two floats.
 * @private
 */
export { LogicNodeMultiplyFloat_LogicNodeMultiplyFloat as LogicNodeMultiplyFloat };