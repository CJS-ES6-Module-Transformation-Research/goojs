import { Gizmo } from "./Gizmo";
import { GizmoRenderSystem } from "./GizmoRenderSystem";
import { GlobalRotationGizmo } from "./GlobalRotationGizmo";
import { GlobalTranslationGizmo } from "./GlobalTranslationGizmo";
import { RotationGizmo } from "./RotationGizmo";
import { ScaleGizmo } from "./ScaleGizmo";
import { TranslationGizmo } from "./TranslationGizmo";
module.exports = {
	Gizmo: Gizmo,
	GizmoRenderSystem: GizmoRenderSystem,
	GlobalRotationGizmo: GlobalRotationGizmo,
	GlobalTranslationGizmo: GlobalTranslationGizmo,
	RotationGizmo: RotationGizmo,
	ScaleGizmo: ScaleGizmo,
	TranslationGizmo: TranslationGizmo
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}