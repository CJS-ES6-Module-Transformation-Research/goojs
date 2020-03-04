import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3js } from "../../math/Matrix3";
var LogicNodeRotationMatrix_outportProduct;
var LogicNodeRotationMatrix_inportX;
var LogicNodeRotationMatrix_editorName;
var LogicNodeRotationMatrix_logicInterface;
function LogicNodeRotationMatrix() {
	LogicNodejs.call(this);
	LogicNodeRotationMatrix_logicInterface = LogicNodeRotationMatrix_logicInterface;;
	this.type = 'LogicNodeRotationMatrix';
	this.vec = new Vector3js();
}

LogicNodeRotationMatrix.prototype = Object.create(LogicNodejs.prototype);
LogicNodeRotationMatrix_editorName = "RotationMatrix";;

LogicNodeRotationMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayerjs.readPort(instDesc, LogicNodeRotationMatrix_inportX);
	var mat = new Matrix3js();
	mat.fromAngles(vec.x, vec.y, vec.z);
	LogicLayerjs.writeValue(instDesc, LogicNodeRotationMatrix_outportProduct, mat);
};

LogicNodeRotationMatrix_logicInterface = new LogicInterfacejs();
LogicNodeRotationMatrix_inportX = LogicNodeRotationMatrix_logicInterface.addInputProperty("vec", "Vector3", new Vector3js());;
LogicNodeRotationMatrix_outportProduct = LogicNodeRotationMatrix_logicInterface.addOutputProperty("mat", "Matrix3", new Matrix3js());;

LogicNodesjs.registerType('LogicNodeRotationMatrix', LogicNodeRotationMatrix);

var exported_LogicNodeRotationMatrix = LogicNodeRotationMatrix;

/**
 * Logic node that constructs a rotation matrix.
 * @private
 */
export { exported_LogicNodeRotationMatrix as LogicNodeRotationMatrix };