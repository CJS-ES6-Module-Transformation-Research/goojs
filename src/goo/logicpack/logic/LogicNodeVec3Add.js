import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
var LogicNodeVec3Add_inportY;
var LogicNodeVec3Add_inportX;
var LogicNodeVec3Add_outportSum;
var LogicNodeVec3Add_editorName;
var LogicNodeVec3Add_logicInterface;
function LogicNodeVec3Add() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeVec3Add_logicInterface = LogicNodeVec3Add_logicInterface;;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeVec3Add_editorName = "AddVec3";;

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeVec3Add_inportX);
	var vec2 = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeVec3Add_inportY);

	var vec = new Vector3_Vector3js();
	vec.copy(vec1).add(vec2);

	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeVec3Add_outportSum, vec);
};

LogicNodeVec3Add_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeVec3Add_outportSum = LogicNodeVec3Add_logicInterface.addOutputProperty("sum", "Vector3");;
LogicNodeVec3Add_inportX = LogicNodeVec3Add_logicInterface.addInputProperty("vec1", "Vector3", new Vector3_Vector3js());;
LogicNodeVec3Add_inportY = LogicNodeVec3Add_logicInterface.addInputProperty("vec2", "Vector3", new Vector3_Vector3js());;

LogicNodes_LogicNodesjs.registerType('LogicNodeVec3Add', LogicNodeVec3Add);

var exported_LogicNodeVec3Add = LogicNodeVec3Add;

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
export { exported_LogicNodeVec3Add as LogicNodeVec3Add };