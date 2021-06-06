import {     BoundingVolumeMeshBuilder as BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilder, } from "./BoundingVolumeMeshBuilder";
import { MarkerComponent as componentsMarkerComponent_MarkerComponent } from "./components/MarkerComponent";
import { DebugDrawHelper as DebugDrawHelper_DebugDrawHelper } from "./DebugDrawHelper";
import { Debugger as Debugger_Debugger } from "./Debugger";
import { EntityCounter as EntityCounter_EntityCounter } from "./EntityCounter";
import { CameraDebug as shapesCameraDebug_CameraDebug } from "./shapes/CameraDebug";
import { LightDebug as shapesLightDebug_LightDebug } from "./shapes/LightDebug";
import { MeshRendererDebug as shapesMeshRendererDebug_MeshRendererDebug } from "./shapes/MeshRendererDebug";
import { SkeletonDebug as shapesSkeletonDebug_SkeletonDebug } from "./shapes/SkeletonDebug";
import { DebugRenderSystem as systemsDebugRenderSystem_DebugRenderSystem } from "./systems/DebugRenderSystem";
import { MarkerSystem as systemsMarkerSystem_MarkerSystem } from "./systems/MarkerSystem";
mod_indexjs = {
	BoundingVolumeMeshBuilder: BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilder,
	MarkerComponent: componentsMarkerComponent_MarkerComponent,
	DebugDrawHelper: DebugDrawHelper_DebugDrawHelper,
	Debugger: Debugger_Debugger,
	EntityCounter: EntityCounter_EntityCounter,
	CameraDebug: shapesCameraDebug_CameraDebug,
	LightDebug: shapesLightDebug_LightDebug,
	MeshRendererDebug: shapesMeshRendererDebug_MeshRendererDebug,
	SkeletonDebug: shapesSkeletonDebug_SkeletonDebug,
	DebugRenderSystem: systemsDebugRenderSystem_DebugRenderSystem,
	MarkerSystem: systemsMarkerSystem_MarkerSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };