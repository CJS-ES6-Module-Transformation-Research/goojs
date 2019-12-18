var _Gizmo = require("./Gizmo");

var _GizmoRenderSystem = require("./GizmoRenderSystem");

var _GlobalRotationGizmo = require("./GlobalRotationGizmo");

var _GlobalTranslationGizmo = require("./GlobalTranslationGizmo");

var _RotationGizmo = require("./RotationGizmo");

var _ScaleGizmo = require("./ScaleGizmo");

var _TranslationGizmo = require("./TranslationGizmo");

module.exports = {
	Gizmo: _Gizmo.Gizmo,
	GizmoRenderSystem: _GizmoRenderSystem.GizmoRenderSystem,
	GlobalRotationGizmo: _GlobalRotationGizmo.GlobalRotationGizmo,
	GlobalTranslationGizmo: _GlobalTranslationGizmo.GlobalTranslationGizmo,
	RotationGizmo: _RotationGizmo.RotationGizmo,
	ScaleGizmo: _ScaleGizmo.ScaleGizmo,
	TranslationGizmo: _TranslationGizmo.TranslationGizmo
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
