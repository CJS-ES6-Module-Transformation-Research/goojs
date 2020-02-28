Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ScaleGizmo = undefined;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _MeshData = require("../../renderer/MeshData");

var _MeshBuilder = require("../../util/MeshBuilder");

var _Box = require("../../shapes/Box");

var _Transform = require("../../math/Transform");

var _Renderer = require("../../renderer/Renderer");

var _Vector = require("../../math/Vector3");

var _Ray = require("../../math/Ray");

var _MathUtils = require("../../math/MathUtils");

function ScaleGizmo(gizmoRenderSystem) {
	_Gizmo.Gizmo.call(this, 'ScaleGizmo', gizmoRenderSystem);

	this._transformScale = new _Vector.Vector3(1, 1, 1);

	this.compileRenderables();
}

ScaleGizmo.prototype = Object.create(_Gizmo.Gizmo.prototype);
ScaleGizmo.prototype.constructor = ScaleGizmo;

var SCALE = 1;

ScaleGizmo.prototype.activate = function (props) {
	_Gizmo.Gizmo.prototype.activate.call(this, props);
	if (this._activeHandle.axis !== 3) {
		this._setPlane();
		this._setLine();
	}
};

ScaleGizmo.prototype.copyTransform = function (transform) {
	_Gizmo.Gizmo.prototype.copyTransform.call(this, transform);
	this._transformScale.copy(transform.scale);
};

ScaleGizmo.prototype.process = function (mouseState, oldMouseState) {
	if (this._activeHandle.axis === 3) {
		this._scaleUniform(mouseState, oldMouseState);
	} else {
		this._scaleNonUniform(mouseState, oldMouseState);
	}

	this._postProcess(this._transformScale);
};

ScaleGizmo.prototype._scaleUniform = function (mouseState, oldMouseState) {
	var scale = Math.pow(1 + mouseState.x + oldMouseState.y - oldMouseState.x - mouseState.y, SCALE);

	var cameraEntityDistance = _Renderer.Renderer.mainCamera.translation.distance(this.transform.translation);
	scale += cameraEntityDistance / 200000 * _MathUtils.MathUtils.sign(scale - 1);

	this._transformScale.scale(scale);
};

(function () {
	var oldRay = new _Ray.Ray();
	var newRay = new _Ray.Ray();

	var oldWorldPos = new _Vector.Vector3();
	var worldPos = new _Vector.Vector3();
	var result = new _Vector.Vector3();

	var AXIS_FOR_ID = ['x', 'y', 'z'];

	ScaleGizmo.prototype._scaleNonUniform = function (mouseState, oldMouseState) {
		_Renderer.Renderer.mainCamera.getPickRay(oldMouseState.x, oldMouseState.y, 1, 1, oldRay);
		_Renderer.Renderer.mainCamera.getPickRay(mouseState.x, mouseState.y, 1, 1, newRay);

		// Project mousemove to plane
		this._plane.rayIntersect(oldRay, oldWorldPos);
		this._plane.rayIntersect(newRay, worldPos);

		result.copy(worldPos).sub(oldWorldPos);
		result.div(this.transform.scale).scale(0.07);

		// Then project plane diff to line
		var d = result.dot(this._line);
		var scale = Math.pow(1 + d, SCALE);

		this._transformScale[AXIS_FOR_ID[this._activeHandle.axis]] *= scale;
	};
})();

ScaleGizmo.prototype.compileRenderables = function () {
	var boxMesh = new _Box.Box(1.4, 1.4, 1.4);
	var arrowMesh = buildArrowMesh();

	this.addRenderable(buildBox(boxMesh));
	this.addRenderable(buildArrow(arrowMesh, 0));
	this.addRenderable(buildArrow(arrowMesh, 1));
	this.addRenderable(buildArrow(arrowMesh, 2));
};

function buildBox(boxMesh) {
	return {
		meshData: boxMesh,
		materials: [(0, _Gizmo.buildMaterialForAxis)(3)],
		transform: new _Transform.Transform(),
		id: (0, _Gizmo.registerHandle)({ type: 'Scale', axis: 3 })
	};
}

function buildArrow(arrowMesh, dim) {
	var transform = new _Transform.Transform();

	if (dim === 0) {
		transform.setRotationXYZ(0, Math.PI / 2, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(Math.PI * 3 / 2, 0, 0);
	}

	return {
		meshData: arrowMesh,
		materials: [(0, _Gizmo.buildMaterialForAxis)(dim)],
		transform: transform,
		id: (0, _Gizmo.registerHandle)({ type: 'Scale', axis: dim })
	};
}

function buildArrowMesh() {
	var meshBuilder = new _MeshBuilder.MeshBuilder();

	// Box
	var mesh1Data = new _Box.Box();

	// Line
	var mesh2Data = new _MeshData.MeshData(MeshDatajs_defaultMap([MeshDatajs_POSITION]), 2, 2);
	mesh2Data.getAttributeBuffer(MeshDatajs_POSITION).set([0, 0, 0, 0, 0, 1]);
	mesh2Data.getIndexBuffer().set([0, 1]);
	mesh2Data.indexLengths = null;
	mesh2Data.indexModes = ['Lines'];

	// Box
	var transform = new _Transform.Transform();
	transform.translation.setDirect(0, 0, 8);
	transform.update();
	meshBuilder.addMeshData(mesh1Data, transform);

	// Line
	var transform = new _Transform.Transform();
	transform.scale.setDirect(1, 1, 8);
	transform.update();
	meshBuilder.addMeshData(mesh2Data, transform);

	// Combine
	var mergedMeshData = meshBuilder.build()[0];

	return mergedMeshData;
}

var exported_ScaleGizmo = ScaleGizmo;

/**
 * @extends Gizmo
 * @hidden
 */
exports.ScaleGizmo = exported_ScaleGizmo;
