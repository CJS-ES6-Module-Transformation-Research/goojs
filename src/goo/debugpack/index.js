import { BoundingVolumeMeshBuilder } from "./BoundingVolumeMeshBuilder";
import { MarkerComponent as MarkerComponentjs } from "./components/MarkerComponent";
import { DebugDrawHelper } from "./DebugDrawHelper";
import { Debugger } from "./Debugger";
import { EntityCounter } from "./EntityCounter";
import { CameraDebug } from "./shapes/CameraDebug";
import { LightDebug } from "./shapes/LightDebug";
import { MeshRendererDebug } from "./shapes/MeshRendererDebug";
import { SkeletonDebug } from "./shapes/SkeletonDebug";
import { DebugRenderSystem as DebugRenderSystemjs } from "./systems/DebugRenderSystem";
import { MarkerSystem } from "./systems/MarkerSystem";
module.exports = {
	BoundingVolumeMeshBuilder: BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilderjs,
	MarkerComponent: MarkerComponentjs,
	DebugDrawHelper: DebugDrawHelper_DebugDrawHelperjs,
	Debugger: Debugger_Debuggerjs,
	EntityCounter: EntityCounter_EntityCounterjs,
	CameraDebug: CameraDebug_CameraDebugjs,
	LightDebug: LightDebug_LightDebugjs,
	MeshRendererDebug: MeshRendererDebug_MeshRendererDebugjs,
	SkeletonDebug: SkeletonDebug_SkeletonDebugjs,
	DebugRenderSystem: DebugRenderSystemjs,
	MarkerSystem: MarkerSystem_MarkerSystemjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}