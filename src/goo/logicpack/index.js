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
import * as LogicNodes from "./logic/LogicNodes";
import { LogicNodeSine } from "./logic/LogicNodeSine";
import { LogicNodeSub } from "./logic/LogicNodeSub";
import { LogicNodeTime } from "./logic/LogicNodeTime";
import { LogicNodeTransformComponent } from "./logic/LogicNodeTransformComponent";
import { LogicNodeVec3 } from "./logic/LogicNodeVec3";
import { LogicNodeVec3Add } from "./logic/LogicNodeVec3Add";
import { LogicNodeWASD } from "./logic/LogicNodeWASD";
import { LogicNodeWASD2 } from "./logic/LogicNodeWASD2";
import { LogicComponent } from "./LogicComponent";
import { LogicComponentHandler } from "./LogicComponentHandler";
import { LogicSystem } from "./LogicSystem";
module.exports = {
	LogicInterface: LogicInterface,
	LogicLayer: LogicLayer,
	LogicNode: LogicNode,
	LogicNodeAdd: LogicNodeAdd,
	LogicNodeApplyMatrix: LogicNodeApplyMatrix,
	LogicNodeConstVec3: LogicNodeConstVec3,
	LogicNodeDebug: LogicNodeDebug,
	LogicNodeEntityProxy: LogicNodeEntityProxy,
	LogicNodeFloat: LogicNodeFloat,
	LogicNodeInput: LogicNodeInput,
	LogicNodeInt: LogicNodeInt,
	LogicNodeLightComponent: LogicNodeLightComponent,
	LogicNodeMax: LogicNodeMax,
	LogicNodeMeshRendererComponent: LogicNodeMeshRendererComponent,
	LogicNodeMouse: LogicNodeMouse,
	LogicNodeMultiply: LogicNodeMultiply,
	LogicNodeMultiplyFloat: LogicNodeMultiplyFloat,
	LogicNodeOutput: LogicNodeOutput,
	LogicNodeRandom: LogicNodeRandom,
	LogicNodeRotationMatrix: LogicNodeRotationMatrix,
	LogicNodes: LogicNodes,
	LogicNodeSine: LogicNodeSine,
	LogicNodeSub: LogicNodeSub,
	LogicNodeTime: LogicNodeTime,
	LogicNodeTransformComponent: LogicNodeTransformComponent,
	LogicNodeVec3: LogicNodeVec3,
	LogicNodeVec3Add: LogicNodeVec3Add,
	LogicNodeWASD: LogicNodeWASD,
	LogicNodeWASD2: LogicNodeWASD2,
	LogicComponent: LogicComponent,
	LogicComponentHandler: LogicComponentHandler,
	LogicSystem: LogicSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}