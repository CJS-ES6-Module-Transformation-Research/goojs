import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as mathMatrix3_Matrix3js } from "../../math/Matrix3";
function LogicNodeApplyMatrix() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeApplyMatrix.logicInterface;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new mathVector3_Vector3js();
}

LogicNodeApplyMatrix.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeApplyMatrix.editorName = 'ApplyMatrix';

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeApplyMatrix.inportX);
	var mat = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeApplyMatrix.inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeApplyMatrix.outportProduct, this.vec);
};

LogicNodeApplyMatrix.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeApplyMatrix.outportProduct = LogicNodeApplyMatrix.logicInterface.addOutputProperty('product', 'Vector3');
LogicNodeApplyMatrix.inportX = LogicNodeApplyMatrix.logicInterface.addInputProperty('vec', 'Vector3', new mathVector3_Vector3js());
LogicNodeApplyMatrix.inportY = LogicNodeApplyMatrix.logicInterface.addInputProperty('mat', 'Matrix3', new mathMatrix3_Matrix3js());

LogicNodes_LogicNodesjs.registerType('LogicNodeApplyMatrix', LogicNodeApplyMatrix);

var exported_LogicNodeApplyMatrix = LogicNodeApplyMatrix;

/**
 * Logic node for vector < matrix computation
 * @private
 */
export { exported_LogicNodeApplyMatrix as LogicNodeApplyMatrix };
