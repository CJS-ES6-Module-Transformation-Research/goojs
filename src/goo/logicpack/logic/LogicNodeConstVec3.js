var mod_LogicNodeConstVec3 = LogicNodeConstVec3;
import { LogicLayer as LogicLayer_LogicLayer } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNode } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodes } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterface } from "./LogicInterface";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";

/**
 * Logic node to provide a const Vec3
 * @private
 */
function LogicNodeConstVec3() {
	LogicNode_LogicNode.call(this);
	this.logicInterface = LogicNodeConstVec3.logicInterface;
	this.type = 'LogicNodeConstVec3';
}

LogicNodeConstVec3.prototype = Object.create(LogicNode_LogicNode.prototype);
LogicNodeConstVec3.editorName = 'ConstVec3';

LogicNodeConstVec3.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new Vector3_Vector3(this.x, this.y, this.z));
	}
};

LogicNodeConstVec3.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayer.writeValue(this.logicInstance, LogicNodeConstVec3.outportVec, new Vector3_Vector3(this.x, this.y, this.z));
};

LogicNodes_LogicNodes.registerType('LogicNodeConstVec3', LogicNodeConstVec3);

LogicNodeConstVec3.logicInterface = new LogicInterface_LogicInterface();
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

/**
 * Logic node to provide a const Vec3
 * @private
 */
export { mod_LogicNodeConstVec3 as LogicNodeConstVec3 };