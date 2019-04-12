import Gizmo_moduleDefault from "./Gizmo";
import GizmoRenderSystem_moduleDefault from "./GizmoRenderSystem";
import GlobalRotationGizmo_moduleDefault from "./GlobalRotationGizmo";
import GlobalTranslationGizmo_moduleDefault from "./GlobalTranslationGizmo";
import RotationGizmo_moduleDefault from "./RotationGizmo";
import ScaleGizmo_moduleDefault from "./ScaleGizmo";
import TranslationGizmo_moduleDefault from "./TranslationGizmo";
export default {
	Gizmo: Gizmo_moduleDefault,
	GizmoRenderSystem: GizmoRenderSystem_moduleDefault,
	GlobalRotationGizmo: GlobalRotationGizmo_moduleDefault,
	GlobalTranslationGizmo: GlobalTranslationGizmo_moduleDefault,
	RotationGizmo: RotationGizmo_moduleDefault,
	ScaleGizmo: ScaleGizmo_moduleDefault,
	TranslationGizmo: TranslationGizmo_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}