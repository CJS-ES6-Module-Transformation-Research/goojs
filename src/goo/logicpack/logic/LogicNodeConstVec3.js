import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function LogicNodeConstVec3() {
	LogicNode_LogicNodejs.call(this);
	this.logicInterface = LogicNodeConstVec3.logicInterface;
	this.type = 'LogicNodeConstVec3';
}

LogicNodeConstVec3.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeConstVec3.editorName = 'ConstVec3';

LogicNodeConstVec3.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new mathVector3_Vector3js(this.x, this.y, this.z));
	}
};

LogicNodeConstVec3.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new mathVector3_Vector3js(this.x, this.y, this.z));
};

LogicNodes_LogicNodesjs.registerType('LogicNodeConstVec3', LogicNodeConstVec3);

LogicNodeConstVec3.logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeConstVec3.outportVec = LogicNodeConstVec3.logicInterface.addOutputProperty('xyz', 'Vector3');

LogicNodeConstVec3.logicInterface.addConfigEntry({
	name: 'x',
	type: 'float',
	label: 'X'
});

LogicNodeConstVec3.logicInterface.addConfigEntry({
	name: 'y',
	type: 'float',
	label: 'Y'
});

LogicNodeConstVec3.logicInterface.addConfigEntry({
	name: 'z',
	type: 'float',
	label: 'Z'
});

var exported_LogicNodeConstVec3 = LogicNodeConstVec3;

/**
 * Logic node to provide a const Vec3
 * @private
 */
export { exported_LogicNodeConstVec3 as LogicNodeConstVec3 };