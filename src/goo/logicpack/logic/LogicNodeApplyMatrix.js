var mod_LogicNodeApplyMatrix = LogicNodeApplyMatrix;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3 } from "../../math/Matrix3";

/**
 * Logic node for vector < matrix computation
 * @private
 */
function LogicNodeApplyMatrix() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeApplyMatrix.logicInterface;
	this.type = 'LogicNodeApplyMatrix';
	this.vec = new Vector3_Vector3();
}

LogicNodeApplyMatrix.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeApplyMatrix.editorName = 'ApplyMatrix';

LogicNodeApplyMatrix.prototype.onInputChanged = function (instDesc) {
	var vec = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeApplyMatrix.inportX);
	var mat = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeApplyMatrix.inportY);
	this.vec.copy(vec);
	mat.applyPost(this.vec);
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeApplyMatrix.outportProduct, this.vec);
};

LogicNodeApplyMatrix.logicInterface = new LogicInterface_LogicInterface();
LogicNodeApplyMatrix.outportProduct = LogicNodeApplyMatrix.logicInterface.addOutputProperty('product', 'Vector3');
LogicNodeApplyMatrix.inportX = LogicNodeApplyMatrix.logicInterface.addInputProperty('vec', 'Vector3', new Vector3_Vector3());
LogicNodeApplyMatrix.inportY = LogicNodeApplyMatrix.logicInterface.addInputProperty('mat', 'Matrix3', new Matrix3_Matrix3());

LogicNodes_LogicNodes.registerType('LogicNodeApplyMatrix', LogicNodeApplyMatrix);

/**
 * Logic node for vector < matrix computation
 * @private
 */
export { mod_LogicNodeApplyMatrix as LogicNodeApplyMatrix };
