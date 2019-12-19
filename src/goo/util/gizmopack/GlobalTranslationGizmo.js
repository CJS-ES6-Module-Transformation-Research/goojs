import { Gizmo } from "../../util/gizmopack/Gizmo";
import { Vector3 } from "../../math/Vector3";
import { TranslationGizmo } from "../../util/gizmopack/TranslationGizmo";
function GlobalTranslationGizmo() {
	Gizmo.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new Vector3();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(Gizmo.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = TranslationGizmo.prototype.activate;
GlobalTranslationGizmo.prototype.process = TranslationGizmo.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	Gizmo.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = TranslationGizmo.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = TranslationGizmo.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = TranslationGizmo.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = TranslationGizmo.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = TranslationGizmo.prototype.compileRenderables;

var exported_GlobalTranslationGizmo = GlobalTranslationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
export { exported_GlobalTranslationGizmo as GlobalTranslationGizmo };