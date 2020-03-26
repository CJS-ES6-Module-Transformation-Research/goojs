import { Gizmo as utilgizmopackGizmo_Gizmojs } from "../../util/gizmopack/Gizmo";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { TranslationGizmo as utilgizmopackTranslationGizmo_TranslationGizmojs } from "../../util/gizmopack/TranslationGizmo";
function GlobalTranslationGizmo() {
	utilgizmopackGizmo_Gizmojs.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new mathVector3_Vector3js();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(utilgizmopackGizmo_Gizmojs.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype.activate;
GlobalTranslationGizmo.prototype.process = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	utilgizmopackGizmo_Gizmojs.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = utilgizmopackTranslationGizmo_TranslationGizmojs.prototype.compileRenderables;

var exported_GlobalTranslationGizmo = GlobalTranslationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
export { exported_GlobalTranslationGizmo as GlobalTranslationGizmo };