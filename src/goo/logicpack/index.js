import { LogicInterface as logicLogicInterface_LogicInterface } from "./logic/LogicInterface";
import { LogicLayer as logicLogicLayer_LogicLayer } from "./logic/LogicLayer";
import { LogicNode as logicLogicNode_LogicNode } from "./logic/LogicNode";
import { LogicNodeAdd as logicLogicNodeAdd_LogicNodeAdd } from "./logic/LogicNodeAdd";
import { LogicNodeApplyMatrix as logicLogicNodeApplyMatrix_LogicNodeApplyMatrix } from "./logic/LogicNodeApplyMatrix";
import { LogicNodeConstVec3 as logicLogicNodeConstVec3_LogicNodeConstVec3 } from "./logic/LogicNodeConstVec3";
import { LogicNodeDebug as logicLogicNodeDebug_LogicNodeDebug } from "./logic/LogicNodeDebug";
import { LogicNodeEntityProxy as logicLogicNodeEntityProxy_LogicNodeEntityProxy } from "./logic/LogicNodeEntityProxy";
import { LogicNodeFloat as logicLogicNodeFloat_LogicNodeFloat } from "./logic/LogicNodeFloat";
import { LogicNodeInput as logicLogicNodeInput_LogicNodeInput } from "./logic/LogicNodeInput";
import { LogicNodeInt as logicLogicNodeInt_LogicNodeInt } from "./logic/LogicNodeInt";
import {     LogicNodeLightComponent as logicLogicNodeLightComponent_LogicNodeLightComponent, } from "./logic/LogicNodeLightComponent";
import { LogicNodeMax as logicLogicNodeMax_LogicNodeMax } from "./logic/LogicNodeMax";
import {     LogicNodeMeshRendererComponent as logicLogicNodeMeshRendererComponent_LogicNodeMeshRendererComponent, } from "./logic/LogicNodeMeshRendererComponent";
import { LogicNodeMouse as logicLogicNodeMouse_LogicNodeMouse } from "./logic/LogicNodeMouse";
import { LogicNodeMultiply as logicLogicNodeMultiply_LogicNodeMultiply } from "./logic/LogicNodeMultiply";
import {     LogicNodeMultiplyFloat as logicLogicNodeMultiplyFloat_LogicNodeMultiplyFloat, } from "./logic/LogicNodeMultiplyFloat";
import { LogicNodeOutput as logicLogicNodeOutput_LogicNodeOutput } from "./logic/LogicNodeOutput";
import { LogicNodeRandom as logicLogicNodeRandom_LogicNodeRandom } from "./logic/LogicNodeRandom";
import {     LogicNodeRotationMatrix as logicLogicNodeRotationMatrix_LogicNodeRotationMatrix, } from "./logic/LogicNodeRotationMatrix";
import { LogicNodes as logicLogicNodes_LogicNodes } from "./logic/LogicNodes";
import { LogicNodeSine as logicLogicNodeSine_LogicNodeSine } from "./logic/LogicNodeSine";
import { LogicNodeSub as logicLogicNodeSub_LogicNodeSub } from "./logic/LogicNodeSub";
import { LogicNodeTime as logicLogicNodeTime_LogicNodeTime } from "./logic/LogicNodeTime";
import {     LogicNodeTransformComponent as logicLogicNodeTransformComponent_LogicNodeTransformComponent, } from "./logic/LogicNodeTransformComponent";
import { LogicNodeVec3 as logicLogicNodeVec3_LogicNodeVec3 } from "./logic/LogicNodeVec3";
import { LogicNodeVec3Add as logicLogicNodeVec3Add_LogicNodeVec3Add } from "./logic/LogicNodeVec3Add";
import { LogicNodeWASD as logicLogicNodeWASD_LogicNodeWASD } from "./logic/LogicNodeWASD";
import { LogicNodeWASD2 as logicLogicNodeWASD2_LogicNodeWASD2 } from "./logic/LogicNodeWASD2";
import { LogicComponent as LogicComponent_LogicComponent } from "./LogicComponent";
import { LogicComponentHandler as LogicComponentHandler_LogicComponentHandler } from "./LogicComponentHandler";
import { LogicSystem as LogicSystem_LogicSystem } from "./LogicSystem";
mod_indexjs = {
	LogicInterface: logicLogicInterface_LogicInterface,
	LogicLayer: logicLogicLayer_LogicLayer,
	LogicNode: logicLogicNode_LogicNode,
	LogicNodeAdd: logicLogicNodeAdd_LogicNodeAdd,
	LogicNodeApplyMatrix: logicLogicNodeApplyMatrix_LogicNodeApplyMatrix,
	LogicNodeConstVec3: logicLogicNodeConstVec3_LogicNodeConstVec3,
	LogicNodeDebug: logicLogicNodeDebug_LogicNodeDebug,
	LogicNodeEntityProxy: logicLogicNodeEntityProxy_LogicNodeEntityProxy,
	LogicNodeFloat: logicLogicNodeFloat_LogicNodeFloat,
	LogicNodeInput: logicLogicNodeInput_LogicNodeInput,
	LogicNodeInt: logicLogicNodeInt_LogicNodeInt,
	LogicNodeLightComponent: logicLogicNodeLightComponent_LogicNodeLightComponent,
	LogicNodeMax: logicLogicNodeMax_LogicNodeMax,
	LogicNodeMeshRendererComponent: logicLogicNodeMeshRendererComponent_LogicNodeMeshRendererComponent,
	LogicNodeMouse: logicLogicNodeMouse_LogicNodeMouse,
	LogicNodeMultiply: logicLogicNodeMultiply_LogicNodeMultiply,
	LogicNodeMultiplyFloat: logicLogicNodeMultiplyFloat_LogicNodeMultiplyFloat,
	LogicNodeOutput: logicLogicNodeOutput_LogicNodeOutput,
	LogicNodeRandom: logicLogicNodeRandom_LogicNodeRandom,
	LogicNodeRotationMatrix: logicLogicNodeRotationMatrix_LogicNodeRotationMatrix,
	LogicNodes: logicLogicNodes_LogicNodes,
	LogicNodeSine: logicLogicNodeSine_LogicNodeSine,
	LogicNodeSub: logicLogicNodeSub_LogicNodeSub,
	LogicNodeTime: logicLogicNodeTime_LogicNodeTime,
	LogicNodeTransformComponent: logicLogicNodeTransformComponent_LogicNodeTransformComponent,
	LogicNodeVec3: logicLogicNodeVec3_LogicNodeVec3,
	LogicNodeVec3Add: logicLogicNodeVec3Add_LogicNodeVec3Add,
	LogicNodeWASD: logicLogicNodeWASD_LogicNodeWASD,
	LogicNodeWASD2: logicLogicNodeWASD2_LogicNodeWASD2,
	LogicComponent: LogicComponent_LogicComponent,
	LogicComponentHandler: LogicComponentHandler_LogicComponentHandler,
	LogicSystem: LogicSystem_LogicSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };