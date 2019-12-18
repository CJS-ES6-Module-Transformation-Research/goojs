Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GlobalRotationGizmo = undefined;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _RotationGizmo = require("../../util/gizmopack/RotationGizmo");

var _Vector = require("../../math/Vector3");

var _Matrix = require("../../math/Matrix3");

var _Transform = require("../../math/Transform");

var _Renderer = require("../../renderer/Renderer");

var _Ray = require("../../math/Ray");

function GlobalRotationGizmo() {
	_Gizmo.Gizmo.call(this, 'GlobalRotationGizmo');

	this._rotation = new _Matrix.Matrix3();
	this._direction = new _Vector.Vector3();

	//TODO: create a function that does this sort of thing
	this.snap = false;
	this._accumulatedRotation = new _Vector.Vector3();
	this._oldAngle = new _Vector.Vector3();

	this.compileRenderables();
}

GlobalRotationGizmo.prototype = Object.create(_Gizmo.Gizmo.prototype);
GlobalRotationGizmo.prototype.constructor = GlobalRotationGizmo;

(function () {
	var worldCenter = new _Vector.Vector3();
	var pickedPoint = new _Vector.Vector3();
	var rotationDirection = new _Vector.Vector3();
	var axis = new _Vector.Vector3();
	var ray = new _Ray.Ray();
	var crossResult = new _Vector.Vector3();

	GlobalRotationGizmo.prototype.activate = function (props) {
		_Gizmo.Gizmo.prototype.activate.call(this, props);

		if (this._activeHandle.axis < 3) {
			// Get rotation axis
			axis.copy([_Vector.Vector3.UNIT_X, _Vector.Vector3.UNIT_Y, _Vector.Vector3.UNIT_Z][this._activeHandle.axis]);

			// Get rotation center
			worldCenter.copy(_Vector.Vector3.ZERO);
			worldCenter.applyPostPoint(this.transform.matrix);

			// Get picked point in world space (sort of)
			_Renderer.Renderer.mainCamera.getPickRay(props.x, props.y, 1, 1, ray);
			pickedPoint.copy(ray.origin).sub(worldCenter);
			var d = pickedPoint.length() * 0.9;
			pickedPoint.copy(ray.direction).scale(d).add(ray.origin);

			// Get vector from center to picked point, cross it with rotation axis and get drag direction
			rotationDirection.copy(pickedPoint).sub(worldCenter);

			crossResult.copy(axis).cross(rotationDirection);
			rotationDirection.copy(crossResult);

			rotationDirection.add(pickedPoint);
			_Renderer.Renderer.mainCamera.getScreenCoordinates(rotationDirection, 1, 1, this._direction);
			this._direction.subDirect(props.x, props.y, 0);

			this._direction.z = 0;
			this._direction.normalize();
		}
	};
})();

GlobalRotationGizmo.prototype.process = _RotationGizmo.RotationGizmo.prototype.process;

GlobalRotationGizmo.prototype._rotateOnScreen = _RotationGizmo.RotationGizmo.prototype._rotateOnScreen;

GlobalRotationGizmo.prototype._applyRotation = function () {
	this.transform.rotation.mul2(this._rotation, this.transform.rotation);
};

GlobalRotationGizmo.prototype._rotateOnAxis = _RotationGizmo.RotationGizmo.prototype._rotateOnAxis;

(function () {
	var transform = new _Transform.Transform();

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

GlobalRotationGizmo.prototype.compileRenderables = _RotationGizmo.RotationGizmo.prototype.compileRenderables;

var exported_GlobalRotationGizmo = GlobalRotationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
exports.GlobalRotationGizmo = exported_GlobalRotationGizmo;
