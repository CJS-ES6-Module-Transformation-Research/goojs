var mod_LogicNodeRotationMatrix = LogicNodeRotationMatrix;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3 } from "../../math/Matrix3";

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
function LogicNodeRotationMatrix() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeRotationMatrix.logicInterface;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new Vector3_Vector3();
}

LogicNodeRotationMatrix.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeRotationMatrix.editorName = 'RotationMatrix';

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeRotationMatrix.inportX);
	var mat = new Matrix3_Matrix3();
	mat.fromAngles(vec.x, vec.y, vec.z);
	LogicLayer_LogicLayer.writeValue(instDesc, LogicNodeRotationMatrix.outportProduct, mat);
};

LogicNodeRotationMatrix.logicInterface = new LogicInterface_LogicInterface();
LogicNodeRotationMatrix.inportX = LogicNodeRotationMatrix.logicInterface.addInputProperty('vec', 'Vector3', new Vector3_Vector3());
LogicNodeRotationMatrix.outportProduct = LogicNodeRotationMatrix.logicInterface.addOutputProperty('mat', 'Matrix3', new Matrix3_Matrix3());

LogicNodes_LogicNodes.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
export { mod_LogicNodeRotationMatrix as LogicNodeRotationMatrix };