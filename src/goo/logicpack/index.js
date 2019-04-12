import logicLogicInterface_moduleDefault from "./logic/LogicInterface";
import logicLogicLayer_moduleDefault from "./logic/LogicLayer";
import logicLogicNode_moduleDefault from "./logic/LogicNode";
import logicLogicNodeAdd_moduleDefault from "./logic/LogicNodeAdd";
import logicLogicNodeApplyMatrix_moduleDefault from "./logic/LogicNodeApplyMatrix";
import logicLogicNodeConstVec3_moduleDefault from "./logic/LogicNodeConstVec3";
import logicLogicNodeDebug_moduleDefault from "./logic/LogicNodeDebug";
import logicLogicNodeEntityProxy_moduleDefault from "./logic/LogicNodeEntityProxy";
import logicLogicNodeFloat_moduleDefault from "./logic/LogicNodeFloat";
import logicLogicNodeInput_moduleDefault from "./logic/LogicNodeInput";
import logicLogicNodeInt_moduleDefault from "./logic/LogicNodeInt";
import logicLogicNodeLightComponent_moduleDefault from "./logic/LogicNodeLightComponent";
import logicLogicNodeMax_moduleDefault from "./logic/LogicNodeMax";
import logicLogicNodeMeshRendererComponent_moduleDefault from "./logic/LogicNodeMeshRendererComponent";
import logicLogicNodeMouse_moduleDefault from "./logic/LogicNodeMouse";
import logicLogicNodeMultiply_moduleDefault from "./logic/LogicNodeMultiply";
import logicLogicNodeMultiplyFloat_moduleDefault from "./logic/LogicNodeMultiplyFloat";
import logicLogicNodeOutput_moduleDefault from "./logic/LogicNodeOutput";
import logicLogicNodeRandom_moduleDefault from "./logic/LogicNodeRandom";
import logicLogicNodeRotationMatrix_moduleDefault from "./logic/LogicNodeRotationMatrix";
import logicLogicNodes_moduleDefault from "./logic/LogicNodes";
import logicLogicNodeSine_moduleDefault from "./logic/LogicNodeSine";
import logicLogicNodeSub_moduleDefault from "./logic/LogicNodeSub";
import logicLogicNodeTime_moduleDefault from "./logic/LogicNodeTime";
import logicLogicNodeTransformComponent_moduleDefault from "./logic/LogicNodeTransformComponent";
import logicLogicNodeVec3_moduleDefault from "./logic/LogicNodeVec3";
import logicLogicNodeVec3Add_moduleDefault from "./logic/LogicNodeVec3Add";
import logicLogicNodeWASD_moduleDefault from "./logic/LogicNodeWASD";
import logicLogicNodeWASD2_moduleDefault from "./logic/LogicNodeWASD2";
import LogicComponent_moduleDefault from "./LogicComponent";
import LogicComponentHandler_moduleDefault from "./LogicComponentHandler";
import LogicSystem_moduleDefault from "./LogicSystem";
export default {
	LogicInterface: logicLogicInterface_moduleDefault,
	LogicLayer: logicLogicLayer_moduleDefault,
	LogicNode: logicLogicNode_moduleDefault,
	LogicNodeAdd: logicLogicNodeAdd_moduleDefault,
	LogicNodeApplyMatrix: logicLogicNodeApplyMatrix_moduleDefault,
	LogicNodeConstVec3: logicLogicNodeConstVec3_moduleDefault,
	LogicNodeDebug: logicLogicNodeDebug_moduleDefault,
	LogicNodeEntityProxy: logicLogicNodeEntityProxy_moduleDefault,
	LogicNodeFloat: logicLogicNodeFloat_moduleDefault,
	LogicNodeInput: logicLogicNodeInput_moduleDefault,
	LogicNodeInt: logicLogicNodeInt_moduleDefault,
	LogicNodeLightComponent: logicLogicNodeLightComponent_moduleDefault,
	LogicNodeMax: logicLogicNodeMax_moduleDefault,
	LogicNodeMeshRendererComponent: logicLogicNodeMeshRendererComponent_moduleDefault,
	LogicNodeMouse: logicLogicNodeMouse_moduleDefault,
	LogicNodeMultiply: logicLogicNodeMultiply_moduleDefault,
	LogicNodeMultiplyFloat: logicLogicNodeMultiplyFloat_moduleDefault,
	LogicNodeOutput: logicLogicNodeOutput_moduleDefault,
	LogicNodeRandom: logicLogicNodeRandom_moduleDefault,
	LogicNodeRotationMatrix: logicLogicNodeRotationMatrix_moduleDefault,
	LogicNodes: logicLogicNodes_moduleDefault,
	LogicNodeSine: logicLogicNodeSine_moduleDefault,
	LogicNodeSub: logicLogicNodeSub_moduleDefault,
	LogicNodeTime: logicLogicNodeTime_moduleDefault,
	LogicNodeTransformComponent: logicLogicNodeTransformComponent_moduleDefault,
	LogicNodeVec3: logicLogicNodeVec3_moduleDefault,
	LogicNodeVec3Add: logicLogicNodeVec3Add_moduleDefault,
	LogicNodeWASD: logicLogicNodeWASD_moduleDefault,
	LogicNodeWASD2: logicLogicNodeWASD2_moduleDefault,
	LogicComponent: LogicComponent_moduleDefault,
	LogicComponentHandler: LogicComponentHandler_moduleDefault,
	LogicSystem: LogicSystem_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}