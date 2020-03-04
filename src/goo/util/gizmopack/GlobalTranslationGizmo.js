import { Gizmo as Gizmojs } from "../../util/gizmopack/Gizmo";
import { Vector3 as Vector3js } from "../../math/Vector3";
import { TranslationGizmo as TranslationGizmojs } from "../../util/gizmopack/TranslationGizmo";
function GlobalTranslationGizmo() {
	Gizmojs.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new Vector3js();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(Gizmojs.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = TranslationGizmojs.prototype.activate;
GlobalTranslationGizmo.prototype.process = TranslationGizmojs.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	Gizmojs.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = TranslationGizmojs.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = TranslationGizmojs.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = TranslationGizmojs.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = TranslationGizmojs.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = TranslationGizmojs.prototype.compileRenderables;

var exported_GlobalTranslationGizmo = GlobalTranslationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
export { exported_GlobalTranslationGizmo as GlobalTranslationGizmo };