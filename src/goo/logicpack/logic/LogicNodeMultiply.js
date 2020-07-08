var LogicNodeMultiply_LogicNodeMultiply = LogicNodeMultiply;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
function LogicNodeMultiply() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeMultiply.logicInterface;
	this.type = 'LogicNodeMultiply';
	this._x = this._y = 0; // REVIEW: unused ?
}

LogicNodeMultiply.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMultiply.editorName = 'Multiply';

LogicNodeMultiply.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayerjs_readPort(instDesc, LogicNodeMultiply.inportX);
	var y = LogicLayerjs_readPort(instDesc, LogicNodeMultiply.inportY);
	LogicLayerjs_writeValue(instDesc, LogicNodeMultiply.outportProduct, x * y);
};

LogicNodeMultiply.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMultiply.outportProduct = LogicNodeMultiply.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiply.inportX = LogicNodeMultiply.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiply.inportY = LogicNodeMultiply.logicInterface.addInputProperty('y', 'float', 0);

LogicNodesjs_registerType('LogicNodeMultiply', LogicNodeMultiply);

/**
 * Logic node that multiplies two inputs.
 * @private
 */
export { LogicNodeMultiply_LogicNodeMultiply as LogicNodeMultiply };