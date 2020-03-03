import { Gizmo } from "./Gizmo";
import { GizmoRenderSystem as GizmoRenderSystemjs } from "./GizmoRenderSystem";
import { GlobalRotationGizmo as GlobalRotationGizmojs } from "./GlobalRotationGizmo";
import { GlobalTranslationGizmo as GlobalTranslationGizmojs } from "./GlobalTranslationGizmo";
import { RotationGizmo as RotationGizmojs } from "./RotationGizmo";
import { ScaleGizmo as ScaleGizmojs } from "./ScaleGizmo";
import { TranslationGizmo as TranslationGizmojs } from "./TranslationGizmo";
module.exports = {
	Gizmo: Gizmo_Gizmojs,
	GizmoRenderSystem: GizmoRenderSystemjs,
	GlobalRotationGizmo: GlobalRotationGizmojs,
	GlobalTranslationGizmo: GlobalTranslationGizmojs,
	RotationGizmo: RotationGizmojs,
	ScaleGizmo: ScaleGizmojs,
	TranslationGizmo: TranslationGizmojs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}