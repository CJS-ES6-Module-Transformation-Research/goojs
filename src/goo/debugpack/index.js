import { BoundingVolumeMeshBuilder as BoundingVolumeMeshBuilderjs } from "./BoundingVolumeMeshBuilder";
import { MarkerComponent as MarkerComponentjs } from "./components/MarkerComponent";
import { DebugDrawHelper as DebugDrawHelper_DebugDrawHelperjs } from "./DebugDrawHelper";
import { Debugger as Debugger_Debuggerjs } from "./Debugger";
import { EntityCounter as EntityCounter_EntityCounterjs } from "./EntityCounter";
import { CameraDebug as CameraDebugjs } from "./shapes/CameraDebug";
import { LightDebug as LightDebug_LightDebugjs } from "./shapes/LightDebug";
import { MeshRendererDebug as MeshRendererDebug_MeshRendererDebugjs } from "./shapes/MeshRendererDebug";
import { SkeletonDebug as SkeletonDebug_SkeletonDebugjs } from "./shapes/SkeletonDebug";
import { DebugRenderSystem as DebugRenderSystemjs } from "./systems/DebugRenderSystem";
import { MarkerSystem as MarkerSystem_MarkerSystemjs } from "./systems/MarkerSystem";
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