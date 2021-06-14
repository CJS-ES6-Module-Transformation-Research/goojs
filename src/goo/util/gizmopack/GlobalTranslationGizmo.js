var mod_GlobalTranslationGizmo = GlobalTranslationGizmo;
import { Gizmo as Gizmo_Gizmo } from "../../util/gizmopack/Gizmo";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";
import { TranslationGizmo as TranslationGizmo_TranslationGizmo } from "../../util/gizmopack/TranslationGizmo";

/**
 * @extends Gizmo
 * @hidden
 */
function GlobalTranslationGizmo() {
	Gizmo_Gizmo.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new Vector3_Vector3();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(Gizmo_Gizmo.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = TranslationGizmo_TranslationGizmo.prototype.activate;
GlobalTranslationGizmo.prototype.process = TranslationGizmo_TranslationGizmo.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	Gizmo_Gizmo.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = TranslationGizmo_TranslationGizmo.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = TranslationGizmo_TranslationGizmo.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = TranslationGizmo_TranslationGizmo.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = TranslationGizmo_TranslationGizmo.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = TranslationGizmo_TranslationGizmo.prototype.compileRenderables;

/**
 * @extends Gizmo
 * @hidden
 */
export { mod_GlobalTranslationGizmo as GlobalTranslationGizmo };