var LogicNodeVec3Add_LogicNodeVec3Add = LogicNodeVec3Add;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function LogicNodeVec3Add() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeVec3Add.logicInterface;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeVec3Add.editorName = 'AddVec3';

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = LogicLayerjs_readPort(instDesc, LogicNodeVec3Add.inportX);
	var vec2 = LogicLayerjs_readPort(instDesc, LogicNodeVec3Add.inportY);

	var vec = new mathVector3_Vector3js();
	vec.copy(vec1).add(vec2);

	LogicLayerjs_writeValue(this.logicInstance, LogicNodeVec3Add.outportSum, vec);
};

LogicNodeVec3Add.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeVec3Add.outportSum = LogicNodeVec3Add.logicInterface.addOutputProperty('sum', 'Vector3');
LogicNodeVec3Add.inportX = LogicNodeVec3Add.logicInterface.addInputProperty('vec1', 'Vector3', new mathVector3_Vector3js());
LogicNodeVec3Add.inportY = LogicNodeVec3Add.logicInterface.addInputProperty('vec2', 'Vector3', new mathVector3_Vector3js());

LogicNodesjs_registerType('LogicNodeVec3Add', LogicNodeVec3Add);

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
export { LogicNodeVec3Add_LogicNodeVec3Add as LogicNodeVec3Add };