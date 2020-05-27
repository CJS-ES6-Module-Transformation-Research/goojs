import { Gizmo as Gizmo_Gizmo } from "./Gizmo";
import { GizmoRenderSystem as GizmoRenderSystem_GizmoRenderSystem } from "./GizmoRenderSystem";
import { GlobalRotationGizmo as GlobalRotationGizmo_GlobalRotationGizmo } from "./GlobalRotationGizmo";
import { GlobalTranslationGizmo as GlobalTranslationGizmo_GlobalTranslationGizmo } from "./GlobalTranslationGizmo";
import { RotationGizmo as RotationGizmo_RotationGizmo } from "./RotationGizmo";
import { ScaleGizmo as ScaleGizmo_ScaleGizmo } from "./ScaleGizmo";
import { TranslationGizmo as TranslationGizmo_TranslationGizmo } from "./TranslationGizmo";
var indexjs;
indexjs = {
	Gizmo: Gizmo_Gizmo,
	GizmoRenderSystem: GizmoRenderSystem_GizmoRenderSystem,
	GlobalRotationGizmo: GlobalRotationGizmo_GlobalRotationGizmo,
	GlobalTranslationGizmo: GlobalTranslationGizmo_GlobalTranslationGizmo,
	RotationGizmo: RotationGizmo_RotationGizmo,
	ScaleGizmo: ScaleGizmo_ScaleGizmo,
	TranslationGizmo: TranslationGizmo_TranslationGizmo
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}