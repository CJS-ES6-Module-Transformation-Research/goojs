Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = RotationGizmo;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _Gizmo2 = _interopRequireDefault(_Gizmo);

var _Sphere = require("../../shapes/Sphere");

var _Sphere2 = _interopRequireDefault(_Sphere);

var _Torus = require("../../shapes/Torus");

var _Torus2 = _interopRequireDefault(_Torus);

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

var _MathUtils = require("../../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @extends Gizmo
 * @hidden
 */
function RotationGizmo() {
	_Gizmo2.default.call(this, 'RotationGizmo');

	this._rotation = new _Matrix2.default();
	this._direction = new _Vector2.default();

	//TODO: create a function that does this sort of thing
	this.snap = false;
	this._accumulatedRotation = new _Vector2.default();
	this._oldAngle = new _Vector2.default();

	this.compileRenderables();
}

RotationGizmo.prototype = Object.create(_Gizmo2.default.prototype);
RotationGizmo.prototype.constructor = RotationGizmo;

var ROTATION_SCALE = 4;

(function () {
	var worldCenter = new _Vector2.default();
	var pickedPoint = new _Vector2.default();
	var rotationDirection = new _Vector2.default();
	var axis = new _Vector2.default();
	var ray = new _Ray2.default();
	var crossResult = new _Vector2.default();

	RotationGizmo.prototype.activate = function (props) {
		_Gizmo2.default.prototype.activate.call(this, props);

		if (this._activeHandle.axis < 3) {
			// Get rotation axis
			axis.copy([_Vector2.default.UNIT_X, _Vector2.default.UNIT_Y, _Vector2.default.UNIT_Z][this._activeHandle.axis]);
			axis.applyPost(this.transform.rotation);

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
	var camRotation = new _Matrix2.default();
	var screenRotation = new _Matrix2.default();

	RotationGizmo.prototype._rotateOnScreen = function (delta) {
		this._rotation.setIdentity();

		this._rotation.rotateY(delta.x * ROTATION_SCALE);
		this._rotation.rotateX(delta.y * ROTATION_SCALE);

		var camMat = _Renderer2.default.mainCamera.getViewMatrix();

		// there has to be a function for this
		camRotation.copyMatrix4(camMat);
		screenRotation.set(camRotation).invert();
		screenRotation.mul(this._rotation);
		screenRotation.mul(camRotation);

		this.transform.rotation.mul2(screenRotation, this.transform.rotation);
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
var identityFunction = function identityFunction(x) {
	return x;
};
// ---

RotationGizmo.prototype._applyRotation = function () {
	this.transform.rotation.mul2(this.transform.rotation, this._rotation);
};

RotationGizmo.prototype._rotateOnAxis = function (delta) {
	this._rotation.setIdentity();

	var sum = delta.x * this._direction.x + delta.y * this._direction.y;
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
	var ballMesh = new _Sphere2.default(32, 32, 1.1);
	var torusMesh = new _Torus2.default(64, 8, 0.1, 2.5);

	this.addRenderable(buildBall(ballMesh));
	this.addRenderable(buildTorus(torusMesh, 0));
	this.addRenderable(buildTorus(torusMesh, 1));
	this.addRenderable(buildTorus(torusMesh, 2));
};

function buildBall(ballMesh) {
	var transform = new _Transform2.default();
	transform.scale.setDirect(1.2, 1.2, 1.2);

	return {
		meshData: ballMesh,
		materials: [_Gizmo2.default.buildMaterialForAxis(3, 0.6)],
		transform: new _Transform2.default(),
		id: _Gizmo2.default.registerHandle({ type: 'Rotate', axis: 3 })
	};
}

function buildTorus(torusMesh, dim) {
	var transform = new _Transform2.default();
	transform.scale.setDirect(1.7, 1.7, 1.7);
	if (dim === 0) {
		transform.setRotationXYZ(0, _MathUtils2.default.HALF_PI, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(_MathUtils2.default.HALF_PI, 0, 0);
	}

	return {
		meshData: torusMesh,
		materials: [_Gizmo2.default.buildMaterialForAxis(dim)],
		transform: transform,
		id: _Gizmo2.default.registerHandle({ type: 'Rotate', axis: dim }),
		thickness: 0.35
	};
}
module.exports = exports.default;
