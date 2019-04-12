Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = GlobalRotationGizmo;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _Gizmo2 = _interopRequireDefault(_Gizmo);

var _RotationGizmo = require("../../util/gizmopack/RotationGizmo");

var _RotationGizmo2 = _interopRequireDefault(_RotationGizmo);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _Matrix = require("../../math/Matrix3");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Renderer = require("../../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Ray = require("../../math/Ray");

var _Ray2 = _interopRequireDefault(_Ray);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @extends Gizmo
 * @hidden
 */
function GlobalRotationGizmo() {
	_Gizmo2.default.call(this, 'GlobalRotationGizmo');

	this._rotation = new _Matrix2.default();
	this._direction = new _Vector2.default();

	//TODO: create a function that does this sort of thing
	this.snap = false;
	this._accumulatedRotation = new _Vector2.default();
	this._oldAngle = new _Vector2.default();

	this.compileRenderables();
}

GlobalRotationGizmo.prototype = Object.create(_Gizmo2.default.prototype);
GlobalRotationGizmo.prototype.constructor = GlobalRotationGizmo;

(function () {
	var worldCenter = new _Vector2.default();
	var pickedPoint = new _Vector2.default();
	var rotationDirection = new _Vector2.default();
	var axis = new _Vector2.default();
	var ray = new _Ray2.default();
	var crossResult = new _Vector2.default();

	GlobalRotationGizmo.prototype.activate = function (props) {
		_Gizmo2.default.prototype.activate.call(this, props);

		if (this._activeHandle.axis < 3) {
			// Get rotation axis
			axis.copy([_Vector2.default.UNIT_X, _Vector2.default.UNIT_Y, _Vector2.default.UNIT_Z][this._activeHandle.axis]);

			// Get rotation center
			worldCenter.copy(_Vector2.default.ZERO);
			worldCenter.applyPostPoint(this.transform.matrix);

			// Get picked point in world space (sort of)
			_Renderer2.default.mainCamera.getPickRay(props.x, props.y, 1, 1, ray);
			pickedPoint.copy(ray.origin).sub(worldCenter);
			var d = pickedPoint.length() * 0.9;
			pickedPoint.copy(ray.direction).scale(d).add(ray.origin);

			// Get vector from center to picked point, cross it with rotation axis and get drag direction
			rotationDirection.copy(pickedPoint).sub(worldCenter);

			crossResult.copy(axis).cross(rotationDirection);
			rotationDirection.copy(crossResult);

			rotationDirection.add(pickedPoint);
			_Renderer2.default.mainCamera.getScreenCoordinates(rotationDirection, 1, 1, this._direction);
			this._direction.subDirect(props.x, props.y, 0);

			this._direction.z = 0;
			this._direction.normalize();
		}
	};
})();

GlobalRotationGizmo.prototype.process = _RotationGizmo2.default.prototype.process;

GlobalRotationGizmo.prototype._rotateOnScreen = _RotationGizmo2.default.prototype._rotateOnScreen;

GlobalRotationGizmo.prototype._applyRotation = function () {
	this.transform.rotation.mul2(this._rotation, this.transform.rotation);
};

GlobalRotationGizmo.prototype._rotateOnAxis = _RotationGizmo2.default.prototype._rotateOnAxis;

(function () {
	var transform = new _Transform2.default();

	/**
  * Update the transform of the provided renderable.
  * @param renderable
  */
	GlobalRotationGizmo.prototype.updateRenderableTransform = function (renderable) {
		transform.copy(this.transform);
		transform.rotation.setIdentity();
		transform.update();

		renderable.transform.matrix.mul2(transform.matrix, renderable.transform.matrix);
	};
})();

GlobalRotationGizmo.prototype.compileRenderables = _RotationGizmo2.default.prototype.compileRenderables;
module.exports = exports.default;
