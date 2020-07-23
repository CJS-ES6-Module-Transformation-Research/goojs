var LogicNodeMultiply_LogicNodeMultiply = LogicNodeMultiply;
import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
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
	var x = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeMultiply.inportX);
	var y = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeMultiply.inportY);
	LogicLayer_LogicLayerjs.writeValue(instDesc, LogicNodeMultiply.outportProduct, x * y);
};

LogicNodeMultiply.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMultiply.outportProduct = LogicNodeMultiply.logicInterface.addOutputProperty('product', 'float');
LogicNodeMultiply.inportX = LogicNodeMultiply.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeMultiply.inportY = LogicNodeMultiply.logicInterface.addInputProperty('y', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeMultiply', LogicNodeMultiply);

/**
 * Logic node that multiplies two inputs.
 * @private
 */
export { LogicNodeMultiply_LogicNodeMultiply as LogicNodeMultiply };