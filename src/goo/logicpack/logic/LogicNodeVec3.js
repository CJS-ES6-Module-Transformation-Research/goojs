import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3js } from "../../math/Vector3";
var LogicNodeVec3_outportZ;
var LogicNodeVec3_outportY;
var LogicNodeVec3_outportX;
var LogicNodeVec3_inportZ;
var LogicNodeVec3_inportY;
var LogicNodeVec3_inportX;
var LogicNodeVec3_inportVec3;
var LogicNodeVec3_outportVec3;
var LogicNodeVec3_editorName;
var LogicNodeVec3_logicInterface;
function LogicNodeVec3() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeVec3_logicInterface = LogicNodeVec3_logicInterface;;
	this.type = 'LogicNodeVec3';
	this._x = this._y = this._z = 0; // REVIEW: unused?
}

LogicNodeVec3.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeVec3_editorName = "Vec3";;

LogicNodeVec3.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayerjs_readPort(instDesc, LogicNodeVec3_inportX);
	var y = LogicLayerjs_readPort(instDesc, LogicNodeVec3_inportY);
	var z = LogicLayerjs_readPort(instDesc, LogicNodeVec3_inportZ);
	var xyz = LogicLayerjs_readPort(instDesc, LogicNodeVec3_inportVec3);
	if (xyz !== null) {
		x = xyz.x;
		y = xyz.y;
		z = xyz.z;
	}

	LogicLayerjs_writeValue(this.logicInstance, LogicNodeVec3_outportVec3, new Vector3js(x, y, z));
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeVec3_outportX, x);
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeVec3_outportY, y);
	LogicLayerjs_writeValue(this.logicInstance, LogicNodeVec3_outportZ, z);
};

LogicNodeVec3_logicInterface = new LogicInterface_LogicInterfacejs();

LogicNodeVec3_outportVec3 = LogicNodeVec3_logicInterface.addOutputProperty("xyz", "Vector3");;
LogicNodeVec3_inportVec3 = LogicNodeVec3_logicInterface.addInputProperty("xyz", "Vector3", null);;
LogicNodeVec3_inportX = LogicNodeVec3_logicInterface.addInputProperty("x", "float", 0);;
LogicNodeVec3_inportY = LogicNodeVec3_logicInterface.addInputProperty("y", "float", 0);;
LogicNodeVec3_inportZ = LogicNodeVec3_logicInterface.addInputProperty("z", "float", 0);;
LogicNodeVec3_outportX = LogicNodeVec3_logicInterface.addOutputProperty("x", "float", 0);;
LogicNodeVec3_outportY = LogicNodeVec3_logicInterface.addOutputProperty("y", "float", 0);;
LogicNodeVec3_outportZ = LogicNodeVec3_logicInterface.addOutputProperty("z", "float", 0);;

LogicNodesjs_registerType('LogicNodeVec3', LogicNodeVec3);

var exported_LogicNodeVec3 = LogicNodeVec3;

/**
 * Logic node that provides a Vec3.
 * @private
 */
export { exported_LogicNodeVec3 as LogicNodeVec3 };