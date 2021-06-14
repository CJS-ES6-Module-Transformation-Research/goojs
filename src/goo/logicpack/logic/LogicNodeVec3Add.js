var mod_LogicNodeVec3Add = LogicNodeVec3Add;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
function LogicNodeVec3Add() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeVec3Add.logicInterface;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeVec3Add.editorName = 'AddVec3';

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeVec3Add.inportX);
	var vec2 = LogicLayer_LogicLayer.readPort(instDesc, LogicNodeVec3Add.inportY);

	var vec = new Vector3_Vector3();
	vec.copy(vec1).add(vec2);

	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeVec3Add.outportSum, vec);
};

LogicNodeVec3Add.logicInterface = new LogicInterface_LogicInterface();
LogicNodeVec3Add.outportSum = LogicNodeVec3Add.logicInterface.addOutputProperty('sum', 'Vector3');
LogicNodeVec3Add.inportX = LogicNodeVec3Add.logicInterface.addInputProperty('vec1', 'Vector3', new Vector3_Vector3());
LogicNodeVec3Add.inportY = LogicNodeVec3Add.logicInterface.addInputProperty('vec2', 'Vector3', new Vector3_Vector3());

LogicNodes_LogicNodes.registerType('LogicNodeVec3Add', LogicNodeVec3Add);

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
export { mod_LogicNodeVec3Add as LogicNodeVec3Add };