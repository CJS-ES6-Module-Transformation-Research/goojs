import { Gizmo as Gizmo_Gizmojs } from "./Gizmo";
import { GizmoRenderSystem as GizmoRenderSystem_GizmoRenderSystemjs } from "./GizmoRenderSystem";
import { GlobalRotationGizmo as GlobalRotationGizmo_GlobalRotationGizmojs } from "./GlobalRotationGizmo";
import { GlobalTranslationGizmo as GlobalTranslationGizmo_GlobalTranslationGizmojs } from "./GlobalTranslationGizmo";
import { RotationGizmo as RotationGizmo_RotationGizmojs } from "./RotationGizmo";
import { ScaleGizmo as ScaleGizmo_ScaleGizmojs } from "./ScaleGizmo";
import { TranslationGizmo as TranslationGizmo_TranslationGizmojs } from "./TranslationGizmo";
module.exports = {
	Gizmo: Gizmo_Gizmojs,
	GizmoRenderSystem: GizmoRenderSystem_GizmoRenderSystemjs,
	GlobalRotationGizmo: GlobalRotationGizmo_GlobalRotationGizmojs,
	GlobalTranslationGizmo: GlobalTranslationGizmo_GlobalTranslationGizmojs,
	RotationGizmo: RotationGizmo_RotationGizmojs,
	ScaleGizmo: ScaleGizmo_ScaleGizmojs,
	TranslationGizmo: TranslationGizmo_TranslationGizmojs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}