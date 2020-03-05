import { Gizmo as Gizmo_Gizmojs } from "../../util/gizmopack/Gizmo";
import { RotationGizmo as RotationGizmo_RotationGizmojs } from "../../util/gizmopack/RotationGizmo";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3js } from "../../math/Matrix3";
import { Transform as Transform_Transformjs } from "../../math/Transform";
import { Renderer as Renderer_Rendererjs } from "../../renderer/Renderer";
import { Ray as Ray_Rayjs } from "../../math/Ray";
function GlobalRotationGizmo() {
	Gizmo_Gizmojs.call(this, 'GlobalRotationGizmo');

	this._rotation = new Matrix3_Matrix3js();
	this._direction = new Vector3_Vector3js();

	//TODO: create a function that does this sort of thing
	this.snap = false;
	this._accumulatedRotation = new Vector3_Vector3js();
	this._oldAngle = new Vector3_Vector3js();

	this.compileRenderables();
}

GlobalRotationGizmo.prototype = Object.create(Gizmo_Gizmojs.prototype);
GlobalRotationGizmo.prototype.constructor = GlobalRotationGizmo;

(function () {
	var worldCenter = new Vector3_Vector3js();
	var pickedPoint = new Vector3_Vector3js();
	var rotationDirection = new Vector3_Vector3js();
	var axis = new Vector3_Vector3js();
	var ray = new Ray_Rayjs();
	var crossResult = new Vector3_Vector3js();

	GlobalRotationGizmo.prototype.activate = function (props) {
		Gizmo_Gizmojs.prototype.activate.call(this, props);

		if (this._activeHandle.axis < 3) {
			// Get rotation axis
			axis.copy([Vector3_Vector3js.UNIT_X, Vector3_Vector3js.UNIT_Y, Vector3_Vector3js.UNIT_Z][this._activeHandle.axis]);

			// Get rotation center
			worldCenter.copy(Vector3_Vector3js.ZERO);
			worldCenter.applyPostPoint(this.transform.matrix);

			// Get picked point in world space (sort of)
			Renderer_Rendererjs.mainCamera.getPickRay(
				props.x,
				props.y,
				1,
				1,
				ray
			);
			pickedPoint.copy(ray.origin).sub(worldCenter);
			var d = pickedPoint.length() * 0.9;
			pickedPoint.copy(ray.direction).scale(d).add(ray.origin);

			// Get vector from center to picked point, cross it with rotation axis and get drag direction
			rotationDirection.copy(pickedPoint).sub(worldCenter);

			crossResult.copy(axis).cross(rotationDirection);
			rotationDirection.copy(crossResult);

			rotationDirection.add(pickedPoint);
			Renderer_Rendererjs.mainCamera.getScreenCoordinates(
				rotationDirection,
				1,
				1,
				this._direction
			);
			this._direction.subDirect(props.x, props.y, 0);

			this._direction.z = 0;
			this._direction.normalize();
		}
	};
})();

GlobalRotationGizmo.prototype.process = RotationGizmo_RotationGizmojs.prototype.process;

GlobalRotationGizmo.prototype._rotateOnScreen = RotationGizmo_RotationGizmojs.prototype._rotateOnScreen;

GlobalRotationGizmo.prototype._applyRotation = function () {
	this.transform.rotation.mul2(
		this._rotation,
		this.transform.rotation
	);
};

GlobalRotationGizmo.prototype._rotateOnAxis = RotationGizmo_RotationGizmojs.prototype._rotateOnAxis;

(function () {
	var transform = new Transform_Transformjs();

	/**
	 * Update the transform of the provided renderable.
	 * @param renderable
	 */
	GlobalRotationGizmo.prototype.updateRenderableTransform = function (renderable) {
		transform.copy(this.transform);
		transform.rotation.setIdentity();
		transform.update();

		renderable.transform.matrix.mul2(
			transform.matrix,
			renderable.transform.matrix
		);
	};
})();

GlobalRotationGizmo.prototype.compileRenderables = RotationGizmo_RotationGizmojs.prototype.compileRenderables;

var exported_GlobalRotationGizmo = GlobalRotationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
export { exported_GlobalRotationGizmo as GlobalRotationGizmo };