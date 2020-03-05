import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3js } from "../../math/Matrix3";
var LogicNodeRotationMatrix_outportProduct;
var LogicNodeRotationMatrix_inportX;
var LogicNodeRotationMatrix_editorName;
var LogicNodeRotationMatrix_logicInterface;
function LogicNodeRotationMatrix() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeRotationMatrix_logicInterface = LogicNodeRotationMatrix_logicInterface;;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new Vector3_Vector3js();
}

LogicNodeRotationMatrix.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeRotationMatrix_editorName = "RotationMatrix";;

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeRotationMatrix_inportX);
	var mat = new Matrix3_Matrix3js();
	mat.fromAngles(vec.x, vec.y, vec.z);
	LogicLayer_LogicLayerjs.writeValue(instDesc, LogicNodeRotationMatrix_outportProduct, mat);
};

LogicNodeRotationMatrix_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeRotationMatrix_inportX = LogicNodeRotationMatrix_logicInterface.addInputProperty("vec", "Vector3", new Vector3_Vector3js());;
LogicNodeRotationMatrix_outportProduct = LogicNodeRotationMatrix_logicInterface.addOutputProperty("mat", "Matrix3", new Matrix3_Matrix3js());;

LogicNodes_LogicNodesjs.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

var exported_LogicNodeRotationMatrix = LogicNodeRotationMatrix;

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
export { exported_LogicNodeRotationMatrix as LogicNodeRotationMatrix };