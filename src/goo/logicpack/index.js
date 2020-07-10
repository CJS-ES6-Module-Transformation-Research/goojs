"use strict";

var _LogicInterface = require("./logic/LogicInterface");

var _LogicLayer = require("./logic/LogicLayer");

var _LogicNode = require("./logic/LogicNode");

var _LogicNodeAdd = require("./logic/LogicNodeAdd");

var _LogicNodeApplyMatrix = require("./logic/LogicNodeApplyMatrix");

var _LogicNodeConstVec = require("./logic/LogicNodeConstVec3");

var _LogicNodeDebug = require("./logic/LogicNodeDebug");

var _LogicNodeEntityProxy = require("./logic/LogicNodeEntityProxy");

var _LogicNodeFloat = require("./logic/LogicNodeFloat");

var _LogicNodeInput = require("./logic/LogicNodeInput");

var _LogicNodeInt = require("./logic/LogicNodeInt");

var _LogicNodeLightComponent = require("./logic/LogicNodeLightComponent");

var _LogicNodeMax = require("./logic/LogicNodeMax");

var _LogicNodeMeshRendererComponent = require("./logic/LogicNodeMeshRendererComponent");

var _LogicNodeMouse = require("./logic/LogicNodeMouse");

var _LogicNodeMultiply = require("./logic/LogicNodeMultiply");

var _LogicNodeMultiplyFloat = require("./logic/LogicNodeMultiplyFloat");

var _LogicNodeOutput = require("./logic/LogicNodeOutput");

var _LogicNodeRandom = require("./logic/LogicNodeRandom");

var _LogicNodeRotationMatrix = require("./logic/LogicNodeRotationMatrix");

var _LogicNodes = require("./logic/LogicNodes");

var _LogicNodeSine = require("./logic/LogicNodeSine");

var _LogicNodeSub = require("./logic/LogicNodeSub");

var _LogicNodeTime = require("./logic/LogicNodeTime");

var _LogicNodeTransformComponent = require("./logic/LogicNodeTransformComponent");

var _LogicNodeVec = require("./logic/LogicNodeVec3");

var _LogicNodeVec3Add = require("./logic/LogicNodeVec3Add");

var _LogicNodeWASD = require("./logic/LogicNodeWASD");

var _LogicNodeWASD2 = require("./logic/LogicNodeWASD2");

var _LogicComponent = require("./LogicComponent");

var _LogicComponentHandler = require("./LogicComponentHandler");

var _LogicSystem = require("./LogicSystem");

var indexjs;
indexjs = {
	LogicInterface: _LogicInterface.LogicInterface,
	LogicLayer: _LogicLayer.LogicLayer,
	LogicNode: _LogicNode.LogicNode,
	LogicNodeAdd: _LogicNodeAdd.LogicNodeAdd,
	LogicNodeApplyMatrix: _LogicNodeApplyMatrix.LogicNodeApplyMatrix,
	LogicNodeConstVec3: _LogicNodeConstVec.LogicNodeConstVec3,
	LogicNodeDebug: _LogicNodeDebug.LogicNodeDebug,
	LogicNodeEntityProxy: _LogicNodeEntityProxy.LogicNodeEntityProxy,
	LogicNodeFloat: _LogicNodeFloat.LogicNodeFloat,
	LogicNodeInput: _LogicNodeInput.LogicNodeInput,
	LogicNodeInt: _LogicNodeInt.LogicNodeInt,
	LogicNodeLightComponent: _LogicNodeLightComponent.LogicNodeLightComponent,
	LogicNodeMax: _LogicNodeMax.LogicNodeMax,
	LogicNodeMeshRendererComponent: _LogicNodeMeshRendererComponent.LogicNodeMeshRendererComponent,
	LogicNodeMouse: _LogicNodeMouse.LogicNodeMouse,
	LogicNodeMultiply: _LogicNodeMultiply.LogicNodeMultiply,
	LogicNodeMultiplyFloat: _LogicNodeMultiplyFloat.LogicNodeMultiplyFloat,
	LogicNodeOutput: _LogicNodeOutput.LogicNodeOutput,
	LogicNodeRandom: _LogicNodeRandom.LogicNodeRandom,
	LogicNodeRotationMatrix: _LogicNodeRotationMatrix.LogicNodeRotationMatrix,
	LogicNodes: _LogicNodes.LogicNodes,
	LogicNodeSine: _LogicNodeSine.LogicNodeSine,
	LogicNodeSub: _LogicNodeSub.LogicNodeSub,
	LogicNodeTime: _LogicNodeTime.LogicNodeTime,
	LogicNodeTransformComponent: _LogicNodeTransformComponent.LogicNodeTransformComponent,
	LogicNodeVec3: _LogicNodeVec.LogicNodeVec3,
	LogicNodeVec3Add: _LogicNodeVec3Add.LogicNodeVec3Add,
	LogicNodeWASD: _LogicNodeWASD.LogicNodeWASD,
	LogicNodeWASD2: _LogicNodeWASD2.LogicNodeWASD2,
	LogicComponent: _LogicComponent.LogicComponent,
	LogicComponentHandler: _LogicComponentHandler.LogicComponentHandler,
	LogicSystem: _LogicSystem.LogicSystem
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}