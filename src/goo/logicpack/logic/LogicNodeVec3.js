import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function LogicNodeVec3() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeVec3.logicInterface;
	this.type = 'LogicNodeVec3';
	this._x = this._y = this._z = 0; // REVIEW: unused?
}

LogicNodeVec3.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeVec3.editorName = 'Vec3';

LogicNodeVec3.prototype.onInputChanged = function (instDesc) {
	var x = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeVec3.inportX);
	var y = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeVec3.inportY);
	var z = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeVec3.inportZ);
	var xyz = LogicLayer_LogicLayerjs.readPort(instDesc, LogicNodeVec3.inportVec3);
	if (xyz !== null) {
		x = xyz.x;
		y = xyz.y;
		z = xyz.z;
	}

	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeVec3.outportVec3, new mathVector3_Vector3js(x, y, z));
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeVec3.outportX, x);
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeVec3.outportY, y);
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeVec3.outportZ, z);
};

LogicNodeVec3.logicInterface = new LogicInterface_LogicInterfacejs();

LogicNodeVec3.outportVec3 = LogicNodeVec3.logicInterface.addOutputProperty('xyz', 'Vector3');
LogicNodeVec3.inportVec3 = LogicNodeVec3.logicInterface.addInputProperty('xyz', 'Vector3', null);
LogicNodeVec3.inportX = LogicNodeVec3.logicInterface.addInputProperty('x', 'float', 0);
LogicNodeVec3.inportY = LogicNodeVec3.logicInterface.addInputProperty('y', 'float', 0);
LogicNodeVec3.inportZ = LogicNodeVec3.logicInterface.addInputProperty('z', 'float', 0);
LogicNodeVec3.outportX = LogicNodeVec3.logicInterface.addOutputProperty('x', 'float', 0);
LogicNodeVec3.outportY = LogicNodeVec3.logicInterface.addOutputProperty('y', 'float', 0);
LogicNodeVec3.outportZ = LogicNodeVec3.logicInterface.addOutputProperty('z', 'float', 0);

LogicNodes_LogicNodesjs.registerType('LogicNodeVec3', LogicNodeVec3);

var exported_LogicNodeVec3 = LogicNodeVec3;

/**
 * Logic node that provides a Vec3.
 * @private
 */
export { exported_LogicNodeVec3 as LogicNodeVec3 };