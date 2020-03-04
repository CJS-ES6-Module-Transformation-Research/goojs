import { LogicLayer as LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3js } from "../../math/Matrix3";
var LogicNodeApplyMatrix_inportY;
var LogicNodeApplyMatrix_inportX;
var LogicNodeApplyMatrix_outportProduct;
var LogicNodeApplyMatrix_editorName;
var LogicNodeApplyMatrix_logicInterface;
function LogicNodeApplyMatrix() {
	LogicNodejs.call(this);
	LogicNodeApplyMatrix_logicInterface = LogicNodeApplyMatrix_logicInterface;;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new Vector3js();
}

LogicNodeApplyMatrix.prototype = Object.create(LogicNodejs.prototype);
LogicNodeApplyMatrix_editorName = "ApplyMatrix";;

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayerjs.readPort(instDesc, LogicNodeApplyMatrix_inportX);
	var mat = LogicLayerjs.readPort(instDesc, LogicNodeApplyMatrix_inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	LogicLayerjs.writeValue(this.logicInstance, LogicNodeApplyMatrix_outportProduct, this.vec);
};

LogicNodeApplyMatrix_logicInterface = new LogicInterfacejs();
LogicNodeApplyMatrix_outportProduct = LogicNodeApplyMatrix_logicInterface.addOutputProperty("product", "Vector3");;
LogicNodeApplyMatrix_inportX = LogicNodeApplyMatrix_logicInterface.addInputProperty("vec", "Vector3", new Vector3js());;
LogicNodeApplyMatrix_inportY = LogicNodeApplyMatrix_logicInterface.addInputProperty("mat", "Matrix3", new Matrix3js());;

LogicNodesjs.registerType('LogicNodeApplyMatrix', LogicNodeApplyMatrix);

var exported_LogicNodeApplyMatrix = LogicNodeApplyMatrix;

/**
 * Logic node for vector < matrix computation
 * @private
 */
export { exported_LogicNodeApplyMatrix as LogicNodeApplyMatrix };
