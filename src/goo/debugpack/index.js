import * as BoundingVolumeMeshBuilder from "./BoundingVolumeMeshBuilder";
import { MarkerComponent } from "./components/MarkerComponent";
import * as DebugDrawHelper from "./DebugDrawHelper";
import { Debugger } from "./Debugger";
import { EntityCounter } from "./EntityCounter";
import { CameraDebug } from "./shapes/CameraDebug";
import { LightDebug } from "./shapes/LightDebug";
import { MeshRendererDebug } from "./shapes/MeshRendererDebug";
import { SkeletonDebug } from "./shapes/SkeletonDebug";
import { DebugRenderSystem } from "./systems/DebugRenderSystem";
import { MarkerSystem } from "./systems/MarkerSystem";
module.exports = {
	BoundingVolumeMeshBuilder: BoundingVolumeMeshBuilder,
	MarkerComponent: MarkerComponent,
	DebugDrawHelper: DebugDrawHelper,
	Debugger: Debugger,
	EntityCounter: EntityCounter,
	CameraDebug: CameraDebug,
	LightDebug: LightDebug,
	MeshRendererDebug: MeshRendererDebug,
	SkeletonDebug: SkeletonDebug,
	DebugRenderSystem: DebugRenderSystem,
	MarkerSystem: MarkerSystem
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}