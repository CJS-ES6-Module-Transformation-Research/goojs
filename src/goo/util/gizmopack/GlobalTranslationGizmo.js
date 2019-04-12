Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = GlobalTranslationGizmo;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _Gizmo2 = _interopRequireDefault(_Gizmo);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _TranslationGizmo = require("../../util/gizmopack/TranslationGizmo");

var _TranslationGizmo2 = _interopRequireDefault(_TranslationGizmo);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @extends Gizmo
 * @hidden
 */
function GlobalTranslationGizmo() {
	_Gizmo2.default.call(this, 'GlobalTranslationGizmo');

	this.realTranslation = new _Vector2.default();
	this._snap = false;

	this.compileRenderables();
}

GlobalTranslationGizmo.prototype = Object.create(_Gizmo2.default.prototype);
GlobalTranslationGizmo.prototype.constructor = GlobalTranslationGizmo;

GlobalTranslationGizmo.prototype.activate = _TranslationGizmo2.default.prototype.activate;
GlobalTranslationGizmo.prototype.process = _TranslationGizmo2.default.prototype.process;

GlobalTranslationGizmo.prototype.copyTransform = function (transform) {
	_Gizmo2.default.prototype.copyTransform.call(this, transform);

	this.transform.rotation.setIdentity();
	this.updateTransforms();
};

GlobalTranslationGizmo.prototype.setSnap = _TranslationGizmo2.default.prototype.setSnap;

GlobalTranslationGizmo.prototype._addTranslation = _TranslationGizmo2.default.prototype._addTranslation;

GlobalTranslationGizmo.prototype._moveOnPlane = _TranslationGizmo2.default.prototype._moveOnPlane;
GlobalTranslationGizmo.prototype._moveOnLine = _TranslationGizmo2.default.prototype._moveOnLine;

GlobalTranslationGizmo.prototype.compileRenderables = _TranslationGizmo2.default.prototype.compileRenderables;
module.exports = exports.default;
