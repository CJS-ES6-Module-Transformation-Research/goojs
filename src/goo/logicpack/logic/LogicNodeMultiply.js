import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
var LogicNodeMultiply_inportY;
var LogicNodeMultiply_inportX;
var LogicNodeMultiply_outportProduct;
var LogicNodeMultiply_editorName;
var LogicNodeMultiply_logicInterface;
function LogicNodeMultiply() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeMultiply_logicInterface = LogicNodeMultiply_logicInterface;;
	this.type = 'LogicNodeMultiply';
	this._x = this._y = 0; // REVIEW: unused ?
}

LogicNodeMultiply.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeMultiply_editorName = "Multiply";;

LogicNodeMultiply.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayerjs_readPort(instDesc, LogicNodeMultiply_inportX);
	var y = LogicLayerjs_readPort(instDesc, LogicNodeMultiply_inportY);
	LogicLayerjs_writeValue(instDesc, LogicNodeMultiply_outportProduct, x * y);
};

LogicNodeMultiply_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeMultiply_outportProduct = LogicNodeMultiply_logicInterface.addOutputProperty("product", "float");;
LogicNodeMultiply_inportX = LogicNodeMultiply_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeMultiply_inportY = LogicNodeMultiply_logicInterface.addInputProperty("y", "float", 0);;

LogicNodesjs_registerType('LogicNodeMultiply', LogicNodeMultiply);

var exported_LogicNodeMultiply = LogicNodeMultiply;

/**
 * Logic node that multiplies two inputs.
 * @private
 */
export { exported_LogicNodeMultiply as LogicNodeMultiply };