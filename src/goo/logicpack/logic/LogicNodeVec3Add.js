import { LogicLayer } from "./LogicLayer";
import { LogicNode } from "./LogicNode";
import * as LogicNodes from "./LogicNodes";
import { LogicInterface } from "./LogicInterface";
import { Vector3 } from "../../math/Vector3";
function LogicNodeVec3Add() {
	LogicNode.call(this);
	this.logicInterface = LogicNodeVec3Add.logicInterface;
	this.type = 'LogicNodeVec3Add';
}

LogicNodeVec3Add.prototype = Object.create(LogicNode.prototype);
LogicNodeVec3Add.editorName = 'AddVec3';

LogicNodeVec3Add.prototype.onInputChanged = function (instDesc) {
	var vec1 = LogicLayer.readPort(instDesc, LogicNodeVec3Add.inportX);
	var vec2 = LogicLayer.readPort(instDesc, LogicNodeVec3Add.inportY);

	var vec = new Vector3();
	vec.copy(vec1).add(vec2);

	LogicLayer.writeValue(this.logicInstance, LogicNodeVec3Add.outportSum, vec);
};

LogicNodeVec3Add.logicInterface = new LogicInterface();
LogicNodeVec3Add.outportSum = LogicNodeVec3Add.logicInterface.addOutputProperty('sum', 'Vector3');
LogicNodeVec3Add.inportX = LogicNodeVec3Add.logicInterface.addInputProperty('vec1', 'Vector3', new Vector3());
LogicNodeVec3Add.inportY = LogicNodeVec3Add.logicInterface.addInputProperty('vec2', 'Vector3', new Vector3());

LogicNodes.registerType('LogicNodeVec3Add', LogicNodeVec3Add);

var exported_LogicNodeVec3Add = LogicNodeVec3Add;

/**
 * Logic node that adds Vec3 inputs.
 * @private
 */
export { exported_LogicNodeVec3Add as LogicNodeVec3Add };