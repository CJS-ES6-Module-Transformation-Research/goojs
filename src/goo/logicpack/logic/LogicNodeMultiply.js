var mod_LogicNodeMultiply = LogicNodeMultiply;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";

/**
 * Logic node that multiplies two inputs.
 * @private
 */
function LogicNodeMultiply() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeMultiply.logicInterface;
	this.type = 'LogicNodeMultiply';
	this._x = this._y = 0; // REVIEW: unused ?
}

LogicNodeMultiply.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeMultiply.editorName = 'Multiply';

LogicNodeMultiply.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeMultiply.inportX);
	var y = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeMultiply.inportY);
	LogicLayer_LogicLayer.writeValue(instDesc, LogicNodeMultiply.outportProduct, x * y);
};

LogicNodeMultiply.logicInterface = new LogicInterface_LogicInterface();
LogicNodeMultiply.outportProduct = LogicNodeMultiply.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiply.inportX = LogicNodeMultiply.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiply.inportY = LogicNodeMultiply.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodes.registerType('LogicNodeMultiply', LogicNodeMultiply);

/**
 * Logic node that multiplies two inputs.
 * @private
 */
export { mod_LogicNodeMultiply as LogicNodeMultiply };