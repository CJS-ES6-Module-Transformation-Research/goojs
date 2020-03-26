import { LogicInterfacejs as logicLogicInterface_LogicInterfacejs } from "./logic/LogicInterface";
import { LogicLayerjs as logicLogicLayer_LogicLayerjs } from "./logic/LogicLayer";
import { LogicNodejs as logicLogicNode_LogicNodejs } from "./logic/LogicNode";
import { LogicNodeAddjs as logicLogicNodeAdd_LogicNodeAddjs } from "./logic/LogicNodeAdd";
import { LogicNodeApplyMatrixjs as logicLogicNodeApplyMatrix_LogicNodeApplyMatrixjs } from "./logic/LogicNodeApplyMatrix";
import { LogicNodeConstVec3js as logicLogicNodeConstVec3_LogicNodeConstVec3js } from "./logic/LogicNodeConstVec3";
import { LogicNodeDebugjs as logicLogicNodeDebug_LogicNodeDebugjs } from "./logic/LogicNodeDebug";
import { LogicNodeEntityProxyjs as logicLogicNodeEntityProxy_LogicNodeEntityProxyjs } from "./logic/LogicNodeEntityProxy";
import { LogicNodeFloatjs as logicLogicNodeFloat_LogicNodeFloatjs } from "./logic/LogicNodeFloat";
import { LogicNodeInputjs as logicLogicNodeInput_LogicNodeInputjs } from "./logic/LogicNodeInput";
import { LogicNodeIntjs as logicLogicNodeInt_LogicNodeIntjs } from "./logic/LogicNodeInt";
import {     LogicNodeLightComponentjs as logicLogicNodeLightComponent_LogicNodeLightComponentjs, } from "./logic/LogicNodeLightComponent";
import { LogicNodeMaxjs as logicLogicNodeMax_LogicNodeMaxjs } from "./logic/LogicNodeMax";
import {     LogicNodeMeshRendererComponentjs as logicLogicNodeMeshRendererComponent_LogicNodeMeshRendererComponentjs, } from "./logic/LogicNodeMeshRendererComponent";
import { LogicNodeMousejs as logicLogicNodeMouse_LogicNodeMousejs } from "./logic/LogicNodeMouse";
import { LogicNodeMultiplyjs as logicLogicNodeMultiply_LogicNodeMultiplyjs } from "./logic/LogicNodeMultiply";
import {     LogicNodeMultiplyFloatjs as logicLogicNodeMultiplyFloat_LogicNodeMultiplyFloatjs, } from "./logic/LogicNodeMultiplyFloat";
import { LogicNodeOutputjs as logicLogicNodeOutput_LogicNodeOutputjs } from "./logic/LogicNodeOutput";
import { LogicNodeRandomjs as logicLogicNodeRandom_LogicNodeRandomjs } from "./logic/LogicNodeRandom";
import {     LogicNodeRotationMatrixjs as logicLogicNodeRotationMatrix_LogicNodeRotationMatrixjs, } from "./logic/LogicNodeRotationMatrix";
import { LogicNodesjs as logicLogicNodes_LogicNodesjs } from "./logic/LogicNodes";
import { LogicNodeSinejs as logicLogicNodeSine_LogicNodeSinejs } from "./logic/LogicNodeSine";
import { LogicNodeSubjs as logicLogicNodeSub_LogicNodeSubjs } from "./logic/LogicNodeSub";
import { LogicNodeTimejs as logicLogicNodeTime_LogicNodeTimejs } from "./logic/LogicNodeTime";
import {     LogicNodeTransformComponentjs as logicLogicNodeTransformComponent_LogicNodeTransformComponentjs, } from "./logic/LogicNodeTransformComponent";
import { LogicNodeVec3js as logicLogicNodeVec3_LogicNodeVec3js } from "./logic/LogicNodeVec3";
import { LogicNodeVec3Addjs as logicLogicNodeVec3Add_LogicNodeVec3Addjs } from "./logic/LogicNodeVec3Add";
import { LogicNodeWASDjs as logicLogicNodeWASD_LogicNodeWASDjs } from "./logic/LogicNodeWASD";
import { LogicNodeWASD2js as logicLogicNodeWASD2_LogicNodeWASD2js } from "./logic/LogicNodeWASD2";
import { LogicComponentjs as LogicComponent_LogicComponentjs } from "./LogicComponent";
import { LogicComponentHandlerjs as LogicComponentHandler_LogicComponentHandlerjs } from "./LogicComponentHandler";
import { LogicSystemjs as LogicSystem_LogicSystemjs } from "./LogicSystem";
var indexjs;
indexjs = {
	LogicInterface: logicLogicInterface_LogicInterfacejs,
	LogicLayer: logicLogicLayer_LogicLayerjs,
	LogicNode: logicLogicNode_LogicNodejs,
	LogicNodeAdd: logicLogicNodeAdd_LogicNodeAddjs,
	LogicNodeApplyMatrix: logicLogicNodeApplyMatrix_LogicNodeApplyMatrixjs,
	LogicNodeConstVec3: logicLogicNodeConstVec3_LogicNodeConstVec3js,
	LogicNodeDebug: logicLogicNodeDebug_LogicNodeDebugjs,
	LogicNodeEntityProxy: logicLogicNodeEntityProxy_LogicNodeEntityProxyjs,
	LogicNodeFloat: logicLogicNodeFloat_LogicNodeFloatjs,
	LogicNodeInput: logicLogicNodeInput_LogicNodeInputjs,
	LogicNodeInt: logicLogicNodeInt_LogicNodeIntjs,
	LogicNodeLightComponent: logicLogicNodeLightComponent_LogicNodeLightComponentjs,
	LogicNodeMax: logicLogicNodeMax_LogicNodeMaxjs,
	LogicNodeMeshRendererComponent: logicLogicNodeMeshRendererComponent_LogicNodeMeshRendererComponentjs,
	LogicNodeMouse: logicLogicNodeMouse_LogicNodeMousejs,
	LogicNodeMultiply: logicLogicNodeMultiply_LogicNodeMultiplyjs,
	LogicNodeMultiplyFloat: logicLogicNodeMultiplyFloat_LogicNodeMultiplyFloatjs,
	LogicNodeOutput: logicLogicNodeOutput_LogicNodeOutputjs,
	LogicNodeRandom: logicLogicNodeRandom_LogicNodeRandomjs,
	LogicNodeRotationMatrix: logicLogicNodeRotationMatrix_LogicNodeRotationMatrixjs,
	LogicNodes: logicLogicNodes_LogicNodesjs,
	LogicNodeSine: logicLogicNodeSine_LogicNodeSinejs,
	LogicNodeSub: logicLogicNodeSub_LogicNodeSubjs,
	LogicNodeTime: logicLogicNodeTime_LogicNodeTimejs,
	LogicNodeTransformComponent: logicLogicNodeTransformComponent_LogicNodeTransformComponentjs,
	LogicNodeVec3: logicLogicNodeVec3_LogicNodeVec3js,
	LogicNodeVec3Add: logicLogicNodeVec3Add_LogicNodeVec3Addjs,
	LogicNodeWASD: logicLogicNodeWASD_LogicNodeWASDjs,
	LogicNodeWASD2: logicLogicNodeWASD2_LogicNodeWASD2js,
	LogicComponent: LogicComponent_LogicComponentjs,
	LogicComponentHandler: LogicComponentHandler_LogicComponentHandlerjs,
	LogicSystem: LogicSystem_LogicSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}