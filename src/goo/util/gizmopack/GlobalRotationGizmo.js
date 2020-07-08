var GlobalRotationGizmo_GlobalRotationGizmo = GlobalRotationGizmo;
import { Gizmo as utilgizmopackGizmo_Gizmojs } from "../../util/gizmopack/Gizmo";
import { RotationGizmo as utilgizmopackRotationGizmo_RotationGizmojs } from "../../util/gizmopack/RotationGizmo";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as mathMatrix3_Matrix3js } from "../../math/Matrix3";
import { Transform as mathTransform_Transformjs } from "../../math/Transform";
import { mainCamera as Rendererjs_mainCamera } from "../../renderer/Renderer";
import { Ray as mathRay_Rayjs } from "../../math/Ray";
function GlobalRotationGizmo() {
	utilgizmopackGizmo_Gizmojs.call(this, 'GlobalRotationGizmo');

	this._rotation = new mathMatrix3_Matrix3js();
	this._direction = new mathVector3_Vector3js();

	//TODO: create a function that does this sort of thing
	this.snap = false;
	this._accumulatedRotation = new mathVector3_Vector3js();
	this._oldAngle = new mathVector3_Vector3js();

	this.compileRenderables();
}

GlobalRotationGizmo.prototype = Object.create(utilgizmopackGizmo_Gizmojs.prototype);
GlobalRotationGizmo.prototype.constructor = GlobalRotationGizmo;

(function () {
	var worldCenter = new mathVector3_Vector3js();
	var pickedPoint = new mathVector3_Vector3js();
	var rotationDirection = new mathVector3_Vector3js();
	var axis = new mathVector3_Vector3js();
	var ray = new mathRay_Rayjs();
	var crossResult = new mathVector3_Vector3js();

	GlobalRotationGizmo.prototype.activate = function (props) {
		utilgizmopackGizmo_Gizmojs.prototype.activate.call(this, props);

		if (this._activeHandle.axis < 3) {
			// Get rotation axis
			axis.copy([mathVector3_Vector3js.UNIT_X, mathVector3_Vector3js.UNIT_Y, mathVector3_Vector3js.UNIT_Z][this._activeHandle.axis]);

			// Get rotation center
			worldCenter.copy(mathVector3_Vector3js.ZERO);
			worldCenter.applyPostPoint(this.transform.matrix);

			// Get picked point in world space (sort of)
			Rendererjs_mainCamera.getPickRay(
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
			Rendererjs_mainCamera.getScreenCoordinates(
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

GlobalRotationGizmo.prototype.process = utilgizmopackRotationGizmo_RotationGizmojs.prototype.process;

GlobalRotationGizmo.prototype._rotateOnScreen = utilgizmopackRotationGizmo_RotationGizmojs.prototype._rotateOnScreen;

GlobalRotationGizmo.prototype._applyRotation = function () {
	this.transform.rotation.mul2(
		this._rotation,
		this.transform.rotation
	);
};

GlobalRotationGizmo.prototype._rotateOnAxis = utilgizmopackRotationGizmo_RotationGizmojs.prototype._rotateOnAxis;

(function () {
	var transform = new mathTransform_Transformjs();

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

GlobalRotationGizmo.prototype.compileRenderables = utilgizmopackRotationGizmo_RotationGizmojs.prototype.compileRenderables;

/**
 * @extends Gizmo
 * @hidden
 */
export { GlobalRotationGizmo_GlobalRotationGizmo as GlobalRotationGizmo };