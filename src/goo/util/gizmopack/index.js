import { Gizmojs as Gizmo_Gizmojs } from "./Gizmo";
import { GizmoRenderSystemjs as GizmoRenderSystem_GizmoRenderSystemjs } from "./GizmoRenderSystem";
import { GlobalRotationGizmojs as GlobalRotationGizmo_GlobalRotationGizmojs } from "./GlobalRotationGizmo";
import {     GlobalTranslationGizmojs as GlobalTranslationGizmo_GlobalTranslationGizmojs, } from "./GlobalTranslationGizmo";
import { RotationGizmojs as RotationGizmo_RotationGizmojs } from "./RotationGizmo";
import { ScaleGizmojs as ScaleGizmo_ScaleGizmojs } from "./ScaleGizmo";
import { TranslationGizmojs as TranslationGizmo_TranslationGizmojs } from "./TranslationGizmo";
var indexjs;
indexjs = {
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