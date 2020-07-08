var LogicNodeRotationMatrix_LogicNodeRotationMatrix = LogicNodeRotationMatrix;
import { writeValue as LogicLayerjs_writeValue, readPort as LogicLayerjs_readPort } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { registerType as LogicNodesjs_registerType } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as mathMatrix3_Matrix3js } from "../../math/Matrix3";
function LogicNodeRotationMatrix() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeRotationMatrix.logicInterface;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new mathVector3_Vector3js();
}

LogicNodeRotationMatrix.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeRotationMatrix.editorName = 'RotationMatrix';

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayerjs_readPort(instDesc, LogicNodeRotationMatrix.inportX);
	var mat = new mathMatrix3_Matrix3js();
	mat.fromAngles(vec.x, vec.y, vec.z);
	LogicLayerjs_writeValue(instDesc, LogicNodeRotationMatrix.outportProduct, mat);
};

LogicNodeRotationMatrix.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeRotationMatrix.inportX = LogicNodeRotationMatrix.logicInterface.addInputProperty('vec', 'Vector3', new mathVector3_Vector3js());
LogicNodeRotationMatrix.outportProduct = LogicNodeRotationMatrix.logicInterface.addOutputProperty('mat', 'Matrix3', new mathMatrix3_Matrix3js());

LogicNodesjs_registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
export { LogicNodeRotationMatrix_LogicNodeRotationMatrix as LogicNodeRotationMatrix };