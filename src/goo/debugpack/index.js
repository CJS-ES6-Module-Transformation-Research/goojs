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

var indexjs;
indexjs = {
	BoundingVolumeMeshBuilder: _BoundingVolumeMeshBuilder.BoundingVolumeMeshBuilderjs,
	MarkerComponent: _MarkerComponent.MarkerComponentjs,
	DebugDrawHelper: _DebugDrawHelper.DebugDrawHelperjs,
	Debugger: _Debugger.Debuggerjs,
	EntityCounter: _EntityCounter.EntityCounterjs,
	CameraDebug: _CameraDebug.CameraDebugjs,
	LightDebug: _LightDebug.LightDebugjs,
	MeshRendererDebug: _MeshRendererDebug.MeshRendererDebugjs,
	SkeletonDebug: _SkeletonDebug.SkeletonDebugjs,
	DebugRenderSystem: _DebugRenderSystem.DebugRenderSystemjs,
	MarkerSystem: _MarkerSystem.MarkerSystemjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
