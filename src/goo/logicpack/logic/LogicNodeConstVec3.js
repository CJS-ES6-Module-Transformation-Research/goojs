import { LogicLayer as LogicLayer_LogicLayerjs } from "./LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./LogicNode";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./LogicNodes";
import { LogicInterface as LogicInterface_LogicInterfacejs } from "./LogicInterface";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
var LogicNodeConstVec3_outportVec;
var LogicNodeConstVec3_editorName;
var LogicNodeConstVec3_logicInterface;
function LogicNodeConstVec3() {
	LogicNode_LogicNodejs.call(this);
	LogicNodeConstVec3_logicInterface = LogicNodeConstVec3_logicInterface;;
	this.type = 'LogicNodeConstVec3';
}

LogicNodeConstVec3.prototype = Object.create(LogicNode_LogicNodejs.prototype);
LogicNodeConstVec3_editorName = "ConstVec3";;

LogicNodeConstVec3.prototype.onConfigure = function (newConfig) {
	if (newConfig.value !== undefined) {
		this.value = newConfig.value;
		LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeConstVec3_outportVec, new Vector3_Vector3js(this.x, this.y, this.z));
	}
};

LogicNodeConstVec3.prototype.onSystemStarted = function () {
	LogicLayer_LogicLayerjs.writeValue(this.logicInstance, LogicNodeConstVec3_outportVec, new Vector3_Vector3js(this.x, this.y, this.z));
};

LogicNodes_LogicNodesjs.registerType('LogicNodeConstVec3', LogicNodeConstVec3);

LogicNodeConstVec3_logicInterface = new LogicInterface_LogicInterfacejs();
LogicNodeConstVec3_outportVec = LogicNodeConstVec3_logicInterface.addOutputProperty("xyz", "Vector3");;

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