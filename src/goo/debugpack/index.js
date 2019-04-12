import BoundingVolumeMeshBuilder_moduleDefault from "./BoundingVolumeMeshBuilder";
import componentsMarkerComponent_moduleDefault from "./components/MarkerComponent";
import DebugDrawHelper_moduleDefault from "./DebugDrawHelper";
import Debugger_moduleDefault from "./Debugger";
import EntityCounter_moduleDefault from "./EntityCounter";
import shapesCameraDebug_moduleDefault from "./shapes/CameraDebug";
import shapesLightDebug_moduleDefault from "./shapes/LightDebug";
import shapesMeshRendererDebug_moduleDefault from "./shapes/MeshRendererDebug";
import shapesSkeletonDebug_moduleDefault from "./shapes/SkeletonDebug";
import systemsDebugRenderSystem_moduleDefault from "./systems/DebugRenderSystem";
import systemsMarkerSystem_moduleDefault from "./systems/MarkerSystem";
export default {
	BoundingVolumeMeshBuilder: BoundingVolumeMeshBuilder_moduleDefault,
	MarkerComponent: componentsMarkerComponent_moduleDefault,
	DebugDrawHelper: DebugDrawHelper_moduleDefault,
	Debugger: Debugger_moduleDefault,
	EntityCounter: EntityCounter_moduleDefault,
	CameraDebug: shapesCameraDebug_moduleDefault,
	LightDebug: shapesLightDebug_moduleDefault,
	MeshRendererDebug: shapesMeshRendererDebug_moduleDefault,
	SkeletonDebug: shapesSkeletonDebug_moduleDefault,
	DebugRenderSystem: systemsDebugRenderSystem_moduleDefault,
	MarkerSystem: systemsMarkerSystem_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}