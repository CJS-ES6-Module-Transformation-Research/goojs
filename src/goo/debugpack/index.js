import {     BoundingVolumeMeshBuilderjs as BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilderjs, } from "./BoundingVolumeMeshBuilder";
import { MarkerComponentjs as componentsMarkerComponent_MarkerComponentjs } from "./components/MarkerComponent";
import { DebugDrawHelperjs as DebugDrawHelper_DebugDrawHelperjs } from "./DebugDrawHelper";
import { Debuggerjs as Debugger_Debuggerjs } from "./Debugger";
import { EntityCounterjs as EntityCounter_EntityCounterjs } from "./EntityCounter";
import { CameraDebugjs as shapesCameraDebug_CameraDebugjs } from "./shapes/CameraDebug";
import { LightDebugjs as shapesLightDebug_LightDebugjs } from "./shapes/LightDebug";
import { MeshRendererDebugjs as shapesMeshRendererDebug_MeshRendererDebugjs } from "./shapes/MeshRendererDebug";
import { SkeletonDebugjs as shapesSkeletonDebug_SkeletonDebugjs } from "./shapes/SkeletonDebug";
import { DebugRenderSystemjs as systemsDebugRenderSystem_DebugRenderSystemjs } from "./systems/DebugRenderSystem";
import { MarkerSystemjs as systemsMarkerSystem_MarkerSystemjs } from "./systems/MarkerSystem";
var indexjs;
indexjs = {
	BoundingVolumeMeshBuilder: BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilderjs,
	MarkerComponent: componentsMarkerComponent_MarkerComponentjs,
	DebugDrawHelper: DebugDrawHelper_DebugDrawHelperjs,
	Debugger: Debugger_Debuggerjs,
	EntityCounter: EntityCounter_EntityCounterjs,
	CameraDebug: shapesCameraDebug_CameraDebugjs,
	LightDebug: shapesLightDebug_LightDebugjs,
	MeshRendererDebug: shapesMeshRendererDebug_MeshRendererDebugjs,
	SkeletonDebug: shapesSkeletonDebug_SkeletonDebugjs,
	DebugRenderSystem: systemsDebugRenderSystem_DebugRenderSystemjs,
	MarkerSystem: systemsMarkerSystem_MarkerSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}