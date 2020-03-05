import { Gizmo as Gizmo_Gizmojs } from "../../util/gizmopack/Gizmo";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
import { TranslationGizmo as TranslationGizmo_TranslationGizmojs } from "../../util/gizmopack/TranslationGizmo";
function GlobalTranslationGizmo() {
	Gizmo_Gizmojs.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new Vector3_Vector3js();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(Gizmo_Gizmojs.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = TranslationGizmo_TranslationGizmojs.prototype.activate;
GlobalTranslationGizmo.prototype.process = TranslationGizmo_TranslationGizmojs.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	Gizmo_Gizmojs.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = TranslationGizmo_TranslationGizmojs.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = TranslationGizmo_TranslationGizmojs.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = TranslationGizmo_TranslationGizmojs.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = TranslationGizmo_TranslationGizmojs.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = TranslationGizmo_TranslationGizmojs.prototype.compileRenderables;

var exported_GlobalTranslationGizmo = GlobalTranslationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
export { exported_GlobalTranslationGizmo as GlobalTranslationGizmo };