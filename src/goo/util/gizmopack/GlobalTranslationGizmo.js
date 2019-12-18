Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GlobalTranslationGizmo = undefined;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _Vector = require("../../math/Vector3");

var _TranslationGizmo = require("../../util/gizmopack/TranslationGizmo");

var exported_GlobalTranslationGizmo = GlobalTranslationGizmo;
function GlobalTranslationGizmo() {
	_Gizmo.Gizmo.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new _Vector.Vector3();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(_Gizmo.Gizmo.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = _TranslationGizmo.TranslationGizmo.prototype.activate;
GlobalTranslationGizmo.prototype.process = _TranslationGizmo.TranslationGizmo.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	_Gizmo.Gizmo.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = _TranslationGizmo.TranslationGizmo.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = _TranslationGizmo.TranslationGizmo.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = _TranslationGizmo.TranslationGizmo.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = _TranslationGizmo.TranslationGizmo.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = _TranslationGizmo.TranslationGizmo.prototype.compileRenderables;

/**
 * @extends Gizmo
 * @hidden
 */
exports.GlobalTranslationGizmo = exported_GlobalTranslationGizmo;
