import { LogicInterface as LogicInterface_LogicInterfacejs } from "./logic/LogicInterface";
import { LogicLayer as LogicLayer_LogicLayerjs } from "./logic/LogicLayer";
import { LogicNode as LogicNode_LogicNodejs } from "./logic/LogicNode";
import { LogicNodeAdd as LogicNodeAdd_LogicNodeAddjs } from "./logic/LogicNodeAdd";
import { LogicNodeApplyMatrix as LogicNodeApplyMatrix_LogicNodeApplyMatrixjs } from "./logic/LogicNodeApplyMatrix";
import { LogicNodeConstVec3 as LogicNodeConstVec3_LogicNodeConstVec3js } from "./logic/LogicNodeConstVec3";
import { LogicNodeDebug as LogicNodeDebug_LogicNodeDebugjs } from "./logic/LogicNodeDebug";
import { LogicNodeEntityProxy as LogicNodeEntityProxy_LogicNodeEntityProxyjs } from "./logic/LogicNodeEntityProxy";
import { LogicNodeFloat as LogicNodeFloat_LogicNodeFloatjs } from "./logic/LogicNodeFloat";
import { LogicNodeInput as LogicNodeInput_LogicNodeInputjs } from "./logic/LogicNodeInput";
import { LogicNodeInt as LogicNodeInt_LogicNodeIntjs } from "./logic/LogicNodeInt";
import {     LogicNodeLightComponent as LogicNodeLightComponent_LogicNodeLightComponentjs, } from "./logic/LogicNodeLightComponent";
import { LogicNodeMax as LogicNodeMax_LogicNodeMaxjs } from "./logic/LogicNodeMax";
import {     LogicNodeMeshRendererComponent as LogicNodeMeshRendererComponent_LogicNodeMeshRendererComponentjs, } from "./logic/LogicNodeMeshRendererComponent";
import { LogicNodeMouse as LogicNodeMouse_LogicNodeMousejs } from "./logic/LogicNodeMouse";
import { LogicNodeMultiply as LogicNodeMultiply_LogicNodeMultiplyjs } from "./logic/LogicNodeMultiply";
import { LogicNodeMultiplyFloat as LogicNodeMultiplyFloat_LogicNodeMultiplyFloatjs } from "./logic/LogicNodeMultiplyFloat";
import { LogicNodeOutput as LogicNodeOutput_LogicNodeOutputjs } from "./logic/LogicNodeOutput";
import { LogicNodeRandom as LogicNodeRandom_LogicNodeRandomjs } from "./logic/LogicNodeRandom";
import {     LogicNodeRotationMatrix as LogicNodeRotationMatrix_LogicNodeRotationMatrixjs, } from "./logic/LogicNodeRotationMatrix";
import { LogicNodes as LogicNodes_LogicNodesjs } from "./logic/LogicNodes";
import { LogicNodeSine as LogicNodeSine_LogicNodeSinejs } from "./logic/LogicNodeSine";
import { LogicNodeSub as LogicNodeSub_LogicNodeSubjs } from "./logic/LogicNodeSub";
import { LogicNodeTime as LogicNodeTime_LogicNodeTimejs } from "./logic/LogicNodeTime";
import {     LogicNodeTransformComponent as LogicNodeTransformComponent_LogicNodeTransformComponentjs, } from "./logic/LogicNodeTransformComponent";
import { LogicNodeVec3 as LogicNodeVec3_LogicNodeVec3js } from "./logic/LogicNodeVec3";
import { LogicNodeVec3Add as LogicNodeVec3Add_LogicNodeVec3Addjs } from "./logic/LogicNodeVec3Add";
import { LogicNodeWASD as LogicNodeWASD_LogicNodeWASDjs } from "./logic/LogicNodeWASD";
import { LogicNodeWASD2 as LogicNodeWASD2_LogicNodeWASD2js } from "./logic/LogicNodeWASD2";
import { LogicComponent as LogicComponent_LogicComponentjs } from "./LogicComponent";
import { LogicComponentHandler as LogicComponentHandlerjs } from "./LogicComponentHandler";
import { LogicSystem as LogicSystem_LogicSystemjs } from "./LogicSystem";
module.exports = {
	LogicInterface: LogicInterface_LogicInterfacejs,
	LogicLayer: LogicLayer_LogicLayerjs,
	LogicNode: LogicNode_LogicNodejs,
	LogicNodeAdd: LogicNodeAdd_LogicNodeAddjs,
	LogicNodeApplyMatrix: LogicNodeApplyMatrix_LogicNodeApplyMatrixjs,
	LogicNodeConstVec3: LogicNodeConstVec3_LogicNodeConstVec3js,
	LogicNodeDebug: LogicNodeDebug_LogicNodeDebugjs,
	LogicNodeEntityProxy: LogicNodeEntityProxy_LogicNodeEntityProxyjs,
	LogicNodeFloat: LogicNodeFloat_LogicNodeFloatjs,
	LogicNodeInput: LogicNodeInput_LogicNodeInputjs,
	LogicNodeInt: LogicNodeInt_LogicNodeIntjs,
	LogicNodeLightComponent: LogicNodeLightComponent_LogicNodeLightComponentjs,
	LogicNodeMax: LogicNodeMax_LogicNodeMaxjs,
	LogicNodeMeshRendererComponent: LogicNodeMeshRendererComponent_LogicNodeMeshRendererComponentjs,
	LogicNodeMouse: LogicNodeMouse_LogicNodeMousejs,
	LogicNodeMultiply: LogicNodeMultiply_LogicNodeMultiplyjs,
	LogicNodeMultiplyFloat: LogicNodeMultiplyFloat_LogicNodeMultiplyFloatjs,
	LogicNodeOutput: LogicNodeOutput_LogicNodeOutputjs,
	LogicNodeRandom: LogicNodeRandom_LogicNodeRandomjs,
	LogicNodeRotationMatrix: LogicNodeRotationMatrix_LogicNodeRotationMatrixjs,
	LogicNodes: LogicNodes_LogicNodesjs,
	LogicNodeSine: LogicNodeSine_LogicNodeSinejs,
	LogicNodeSub: LogicNodeSub_LogicNodeSubjs,
	LogicNodeTime: LogicNodeTime_LogicNodeTimejs,
	LogicNodeTransformComponent: LogicNodeTransformComponent_LogicNodeTransformComponentjs,
	LogicNodeVec3: LogicNodeVec3_LogicNodeVec3js,
	LogicNodeVec3Add: LogicNodeVec3Add_LogicNodeVec3Addjs,
	LogicNodeWASD: LogicNodeWASD_LogicNodeWASDjs,
	LogicNodeWASD2: LogicNodeWASD2_LogicNodeWASD2js,
	LogicComponent: LogicComponent_LogicComponentjs,
	LogicComponentHandler: LogicComponentHandlerjs,
	LogicSystem: LogicSystem_LogicSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}