import { Gizmo as Gizmo_Gizmojs } from "../../util/gizmopack/Gizmo";
import { Sphere as Sphere_Spherejs } from "../../shapes/Sphere";
import { Torus as Torus_Torusjs } from "../../shapes/Torus";
import { Vector3 as Vector3_Vector3js } from "../../math/Vector3";
import { Matrix3 as Matrix3_Matrix3js } from "../../math/Matrix3";
import { Transform as Transform_Transformjs } from "../../math/Transform";
import { Renderer as Renderer_Rendererjs } from "../../renderer/Renderer";
import { Ray as Ray_Rayjs } from "../../math/Ray";
import { MathUtils as MathUtils_MathUtilsjs } from "../../math/MathUtils";
function RotationGizmo() {
	Gizmo_Gizmojs.call(this, 'RotationGizmo');

	this._rotation = new Matrix3_Matrix3js();
	this._direction = new Vector3_Vector3js();

	//TODO: create a function that does this sort of thing
	this.snap = false;
	this._accumulatedRotation = new Vector3_Vector3js();
	this._oldAngle = new Vector3_Vector3js();

	this.compileRenderables();
}

RotationGizmo.prototype = Object.create(Gizmo_Gizmojs.prototype);
RotationGizmo.prototype.constructor = RotationGizmo;

var ROTATION_SCALE = 4;

(function () {
	var worldCenter = new Vector3_Vector3js();
	var pickedPoint = new Vector3_Vector3js();
	var rotationDirection = new Vector3_Vector3js();
	var axis = new Vector3_Vector3js();
	var ray = new Ray_Rayjs();
	var crossResult = new Vector3_Vector3js();

	RotationGizmo.prototype.activate = function (props) {
		Gizmo_Gizmojs.prototype.activate.call(this, props);

		if (this._activeHandle.axis < 3) {
			// Get rotation axis
			axis.copy([Vector3_Vector3js.UNIT_X, Vector3_Vector3js.UNIT_Y, Vector3_Vector3js.UNIT_Z][this._activeHandle.axis]);
			axis.applyPost(this.transform.rotation);

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

RotationGizmo.prototype.process = function (mouseState, oldMouseState) {
	var delta = mouseState.clone().sub(oldMouseState);

	if (this._activeHandle.axis === 3) {
		this._rotateOnScreen(delta);
	} else {
		this._rotateOnAxis(delta);
	}

	this._postProcess(this.transform.rotation);
};

(function () {
	var camRotation = new Matrix3_Matrix3js();
	var screenRotation = new Matrix3_Matrix3js();

	RotationGizmo.prototype._rotateOnScreen = function (delta) {
		this._rotation.setIdentity();

		this._rotation.rotateY(delta.x * ROTATION_SCALE);
		this._rotation.rotateX(delta.y * ROTATION_SCALE);

		var camMat = Renderer_Rendererjs.mainCamera.getViewMatrix();

		// there has to be a function for this
		camRotation.copyMatrix4(camMat);
		screenRotation.set(camRotation).invert();
		screenRotation.mul(this._rotation);
		screenRotation.mul(camRotation);

		this.transform.rotation.mul2(
			screenRotation,
			this.transform.rotation
		);
	};
})();

// --- functions for snapping to certain angles
function inclinedType2(size, t) {
	return function (x) {
		var z = x % size;
		z += z < 0 ? size : 0;
		if (z < t) {
			return x - z;
		} else if (z > size - t) {
			return x + size - z;
		}
		return x;
	};
}

var snapFunction = inclinedType2(Math.PI / 4, Math.PI / 16);
var identityFunction = function (x) { return x; };
// ---

RotationGizmo.prototype._applyRotation = function () {
	this.transform.rotation.mul2(
		this.transform.rotation,
		this._rotation
	);
};

RotationGizmo.prototype._rotateOnAxis = function (delta) {
	this._rotation.setIdentity();

	var sum = (delta.x * this._direction.x) + (delta.y * this._direction.y);
	sum *= ROTATION_SCALE;

	var transformFunction = this._snap ? snapFunction : identityFunction;
	var newAngle;

	switch (this._activeHandle.axis) {
		case 0:
			this._accumulatedRotation.x += sum;
			newAngle = transformFunction(this._accumulatedRotation.x);
			this._rotation.rotateX(newAngle - this._oldAngle.x);
			this._oldAngle.x = newAngle;
			break;
		case 1:
			this._accumulatedRotation.y += sum;
			newAngle = transformFunction(this._accumulatedRotation.y);
			this._rotation.rotateY(newAngle - this._oldAngle.y);
			this._oldAngle.y = newAngle;
			break;
		case 2:
			this._accumulatedRotation.z += sum;
			newAngle = transformFunction(this._accumulatedRotation.z);
			this._rotation.rotateZ(newAngle - this._oldAngle.z);
			this._oldAngle.z = newAngle;
			break;
	}

	this._applyRotation();
};

RotationGizmo.prototype.compileRenderables = function () {
	var ballMesh = new Sphere_Spherejs(32, 32, 1.1);
	var torusMesh = new Torus_Torusjs(64, 8, 0.1, 2.5);

	this.addRenderable(buildBall(ballMesh));
	this.addRenderable(buildTorus(torusMesh, 0));
	this.addRenderable(buildTorus(torusMesh, 1));
	this.addRenderable(buildTorus(torusMesh, 2));
};

function buildBall(ballMesh) {
	var transform = new Transform_Transformjs();
	transform.scale.setDirect(1.2, 1.2, 1.2);

	return {
		meshData: ballMesh,
		materials: [Gizmo_Gizmojs.buildMaterialForAxis(3, 0.6)],
		transform: new Transform_Transformjs(),
		id: Gizmo_Gizmojs.registerHandle({ type: 'Rotate', axis: 3 })
	};
}

function buildTorus(torusMesh, dim) {
	var transform = new Transform_Transformjs();
	transform.scale.setDirect(1.7, 1.7, 1.7);
	if (dim === 0) {
		transform.setRotationXYZ(0, MathUtils_MathUtilsjs.HALF_PI, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(MathUtils_MathUtilsjs.HALF_PI, 0, 0);
	}

	return {
		meshData: torusMesh,
		materials: [Gizmo_Gizmojs.buildMaterialForAxis(dim)],
		transform: transform,
		id: Gizmo_Gizmojs.registerHandle({ type: 'Rotate', axis: dim }),
		thickness: 0.35
	};
}

var exported_RotationGizmo = RotationGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
export { exported_RotationGizmo as RotationGizmo };