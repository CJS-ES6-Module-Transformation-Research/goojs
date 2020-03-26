"use strict";

var _Gizmo = require("./Gizmo");

var _GizmoRenderSystem = require("./GizmoRenderSystem");

var _GlobalRotationGizmo = require("./GlobalRotationGizmo");

var _GlobalTranslationGizmo = require("./GlobalTranslationGizmo");

var _RotationGizmo = require("./RotationGizmo");

var _ScaleGizmo = require("./ScaleGizmo");

var _TranslationGizmo = require("./TranslationGizmo");

var indexjs;
indexjs = {
	Gizmo: _Gizmo.Gizmojs,
	GizmoRenderSystem: _GizmoRenderSystem.GizmoRenderSystemjs,
	GlobalRotationGizmo: _GlobalRotationGizmo.GlobalRotationGizmojs,
	GlobalTranslationGizmo: _GlobalTranslationGizmo.GlobalTranslationGizmojs,
	RotationGizmo: _RotationGizmo.RotationGizmojs,
	ScaleGizmo: _ScaleGizmo.ScaleGizmojs,
	TranslationGizmo: _TranslationGizmo.TranslationGizmojs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
