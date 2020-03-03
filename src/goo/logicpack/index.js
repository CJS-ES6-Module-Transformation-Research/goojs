import { LogicInterface } from "./logic/LogicInterface";
import { LogicLayer } from "./logic/LogicLayer";
import { LogicNode } from "./logic/LogicNode";
import { LogicNodeAdd } from "./logic/LogicNodeAdd";
import { LogicNodeApplyMatrix } from "./logic/LogicNodeApplyMatrix";
import { LogicNodeConstVec3 } from "./logic/LogicNodeConstVec3";
import { LogicNodeDebug } from "./logic/LogicNodeDebug";
import { LogicNodeEntityProxy } from "./logic/LogicNodeEntityProxy";
import { LogicNodeFloat } from "./logic/LogicNodeFloat";
import { LogicNodeInput } from "./logic/LogicNodeInput";
import { LogicNodeInt } from "./logic/LogicNodeInt";
import { LogicNodeLightComponent } from "./logic/LogicNodeLightComponent";
import { LogicNodeMax } from "./logic/LogicNodeMax";
import { LogicNodeMeshRendererComponent } from "./logic/LogicNodeMeshRendererComponent";
import { LogicNodeMouse } from "./logic/LogicNodeMouse";
import { LogicNodeMultiply } from "./logic/LogicNodeMultiply";
import { LogicNodeMultiplyFloat } from "./logic/LogicNodeMultiplyFloat";
import { LogicNodeOutput } from "./logic/LogicNodeOutput";
import { LogicNodeRandom } from "./logic/LogicNodeRandom";
import { LogicNodeRotationMatrix } from "./logic/LogicNodeRotationMatrix";
import { LogicNodes } from "./logic/LogicNodes";
import { LogicNodeSine } from "./logic/LogicNodeSine";
import { LogicNodeSub } from "./logic/LogicNodeSub";
import { LogicNodeTime } from "./logic/LogicNodeTime";
import { LogicNodeTransformComponent } from "./logic/LogicNodeTransformComponent";
import { LogicNodeVec3 } from "./logic/LogicNodeVec3";
import { LogicNodeVec3Add } from "./logic/LogicNodeVec3Add";
import { LogicNodeWASD } from "./logic/LogicNodeWASD";
import { LogicNodeWASD2 } from "./logic/LogicNodeWASD2";
import { LogicComponent } from "./LogicComponent";
import { LogicComponentHandler as LogicComponentHandlerjs } from "./LogicComponentHandler";
import { LogicSystem } from "./LogicSystem";
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