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
	LogicInterface: _LogicInterface.LogicInterfacejs,
	LogicLayer: _LogicLayer.LogicLayerjs,
	LogicNode: _LogicNode.LogicNodejs,
	LogicNodeAdd: _LogicNodeAdd.LogicNodeAddjs,
	LogicNodeApplyMatrix: _LogicNodeApplyMatrix.LogicNodeApplyMatrixjs,
	LogicNodeConstVec3: _LogicNodeConstVec.LogicNodeConstVec3js,
	LogicNodeDebug: _LogicNodeDebug.LogicNodeDebugjs,
	LogicNodeEntityProxy: _LogicNodeEntityProxy.LogicNodeEntityProxyjs,
	LogicNodeFloat: _LogicNodeFloat.LogicNodeFloatjs,
	LogicNodeInput: _LogicNodeInput.LogicNodeInputjs,
	LogicNodeInt: _LogicNodeInt.LogicNodeIntjs,
	LogicNodeLightComponent: _LogicNodeLightComponent.LogicNodeLightComponentjs,
	LogicNodeMax: _LogicNodeMax.LogicNodeMaxjs,
	LogicNodeMeshRendererComponent: _LogicNodeMeshRendererComponent.LogicNodeMeshRendererComponentjs,
	LogicNodeMouse: _LogicNodeMouse.LogicNodeMousejs,
	LogicNodeMultiply: _LogicNodeMultiply.LogicNodeMultiplyjs,
	LogicNodeMultiplyFloat: _LogicNodeMultiplyFloat.LogicNodeMultiplyFloatjs,
	LogicNodeOutput: _LogicNodeOutput.LogicNodeOutputjs,
	LogicNodeRandom: _LogicNodeRandom.LogicNodeRandomjs,
	LogicNodeRotationMatrix: _LogicNodeRotationMatrix.LogicNodeRotationMatrixjs,
	LogicNodes: _LogicNodes.LogicNodesjs,
	LogicNodeSine: _LogicNodeSine.LogicNodeSinejs,
	LogicNodeSub: _LogicNodeSub.LogicNodeSubjs,
	LogicNodeTime: _LogicNodeTime.LogicNodeTimejs,
	LogicNodeTransformComponent: _LogicNodeTransformComponent.LogicNodeTransformComponentjs,
	LogicNodeVec3: _LogicNodeVec.LogicNodeVec3js,
	LogicNodeVec3Add: _LogicNodeVec3Add.LogicNodeVec3Addjs,
	LogicNodeWASD: _LogicNodeWASD.LogicNodeWASDjs,
	LogicNodeWASD2: _LogicNodeWASD2.LogicNodeWASD2js,
	LogicComponent: _LogicComponent.LogicComponentjs,
	LogicComponentHandler: _LogicComponentHandler.LogicComponentHandlerjs,
	LogicSystem: _LogicSystem.LogicSystemjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
