"use strict";

var _BoundingVolumeMeshBuilder = require("./BoundingVolumeMeshBuilder");

var _MarkerComponent = require("./components/MarkerComponent");

var _DebugDrawHelper = require("./DebugDrawHelper");

var _Debugger = require("./Debugger");

var _EntityCounter = require("./EntityCounter");

var _CameraDebug = require("./shapes/CameraDebug");

var _LightDebug = require("./shapes/LightDebug");

var _MeshRendererDebug = require("./shapes/MeshRendererDebug");

var _SkeletonDebug = require("./shapes/SkeletonDebug");

var _DebugRenderSystem = require("./systems/DebugRenderSystem");

var _MarkerSystem = require("./systems/MarkerSystem");

module.exports = {
	BoundingVolumeMeshBuilder: BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilderjs,
	MarkerComponent: _MarkerComponent.MarkerComponent,
	DebugDrawHelper: _DebugDrawHelper.DebugDrawHelper,
	Debugger: _Debugger.Debugger,
	EntityCounter: _EntityCounter.EntityCounter,
	CameraDebug: CameraDebug_CameraDebugjs,
	LightDebug: _LightDebug.LightDebug,
	MeshRendererDebug: _MeshRendererDebug.MeshRendererDebug,
	SkeletonDebug: _SkeletonDebug.SkeletonDebug,
	DebugRenderSystem: _DebugRenderSystem.DebugRenderSystem,
	MarkerSystem: _MarkerSystem.MarkerSystem
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
