import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3js } from "../../math/Matrix3";
var LogicNodeApplyMatrix_inportY;
var LogicNodeApplyMatrix_inportX;
var LogicNodeApplyMatrix_outportProduct;
var LogicNodeApplyMatrix_editorName;
var LogicNodeApplyMatrix_logicInterface;
function LogicNodeApplyMatrix() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeApplyMatrix_logicInterface = LogicNodeApplyMatrix_logicInterface;;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new Vector3_Vector3js();
}

LogicNodeApplyMatrix.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeApplyMatrix_editorName = "ApplyMatrix";;

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeApplyMatrix_inportX);
	var mat = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeApplyMatrix_inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeApplyMatrix_outportProduct, this.vec);
};

LogicNodeApplyMatrix_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeApplyMatrix_outportProduct = LogicNodeApplyMatrix_logicInterface.addOutputProperty("product", "Vector3");;
LogicNodeApplyMatrix_inportX = LogicNodeApplyMatrix_logicInterface.addInputProperty("vec", "Vector3", new Vector3_Vector3js());;
LogicNodeApplyMatrix_inportY = LogicNodeApplyMatrix_logicInterface.addInputProperty("mat", "Matrix3", new Matrix3_Matrix3js());;

LogicNodes_LogicNodesjs.registerType('LogicNodeApplyMatrix', LogicNodeApplyMatrix);

var exported_LogicNodeApplyMatrix = LogicNodeApplyMatrix;

/**
 * Logic node for vector < matrix computation
 * @private
 */
export { exported_LogicNodeApplyMatrix as LogicNodeApplyMatrix };
