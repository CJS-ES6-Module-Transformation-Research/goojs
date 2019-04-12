Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ScaleGizmo;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _Gizmo2 = _interopRequireDefault(_Gizmo);

var _MeshData = require("../../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _MeshBuilder = require("../../util/MeshBuilder");

var _MeshBuilder2 = _interopRequireDefault(_MeshBuilder);

var _Box = require("../../shapes/Box");

var _Box2 = _interopRequireDefault(_Box);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Renderer = require("../../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

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
function ScaleGizmo(gizmoRenderSystem) {
	_Gizmo2.default.call(this, 'ScaleGizmo', gizmoRenderSystem);

	this._transformScale = new _Vector2.default(1, 1, 1);

	this.compileRenderables();
}

ScaleGizmo.prototype = Object.create(_Gizmo2.default.prototype);
ScaleGizmo.prototype.constructor = ScaleGizmo;

var SCALE = 1;

ScaleGizmo.prototype.activate = function (props) {
	_Gizmo2.default.prototype.activate.call(this, props);
	if (this._activeHandle.axis !== 3) {
		this._setPlane();
		this._setLine();
	}
};

ScaleGizmo.prototype.copyTransform = function (transform) {
	_Gizmo2.default.prototype.copyTransform.call(this, transform);
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

	var cameraEntityDistance = _Renderer2.default.mainCamera.translation.distance(this.transform.translation);
	scale += cameraEntityDistance / 200000 * _MathUtils2.default.sign(scale - 1);

	this._transformScale.scale(scale);
};

(function () {
	var oldRay = new _Ray2.default();
	var newRay = new _Ray2.default();

	var oldWorldPos = new _Vector2.default();
	var worldPos = new _Vector2.default();
	var result = new _Vector2.default();

	var AXIS_FOR_ID = ['x', 'y', 'z'];

	ScaleGizmo.prototype._scaleNonUniform = function (mouseState, oldMouseState) {
		_Renderer2.default.mainCamera.getPickRay(oldMouseState.x, oldMouseState.y, 1, 1, oldRay);
		_Renderer2.default.mainCamera.getPickRay(mouseState.x, mouseState.y, 1, 1, newRay);

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
	var boxMesh = new _Box2.default(1.4, 1.4, 1.4);
	var arrowMesh = buildArrowMesh();

	this.addRenderable(buildBox(boxMesh));
	this.addRenderable(buildArrow(arrowMesh, 0));
	this.addRenderable(buildArrow(arrowMesh, 1));
	this.addRenderable(buildArrow(arrowMesh, 2));
};

function buildBox(boxMesh) {
	return {
		meshData: boxMesh,
		materials: [_Gizmo2.default.buildMaterialForAxis(3)],
		transform: new _Transform2.default(),
		id: _Gizmo2.default.registerHandle({ type: 'Scale', axis: 3 })
	};
}

function buildArrow(arrowMesh, dim) {
	var transform = new _Transform2.default();

	if (dim === 0) {
		transform.setRotationXYZ(0, Math.PI / 2, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(Math.PI * 3 / 2, 0, 0);
	}

	return {
		meshData: arrowMesh,
		materials: [_Gizmo2.default.buildMaterialForAxis(dim)],
		transform: transform,
		id: _Gizmo2.default.registerHandle({ type: 'Scale', axis: dim })
	};
}

function buildArrowMesh() {
	var meshBuilder = new _MeshBuilder2.default();

	// Box
	var mesh1Data = new _Box2.default();

	// Line
	var mesh2Data = new _MeshData2.default(_MeshData2.default.defaultMap([_MeshData2.default.POSITION]), 2, 2);
	mesh2Data.getAttributeBuffer(_MeshData2.default.POSITION).set([0, 0, 0, 0, 0, 1]);
	mesh2Data.getIndexBuffer().set([0, 1]);
	mesh2Data.indexLengths = null;
	mesh2Data.indexModes = ['Lines'];

	// Box
	var transform = new _Transform2.default();
	transform.translation.setDirect(0, 0, 8);
	transform.update();
	meshBuilder.addMeshData(mesh1Data, transform);

	// Line
	var transform = new _Transform2.default();
	transform.scale.setDirect(1, 1, 8);
	transform.update();
	meshBuilder.addMeshData(mesh2Data, transform);

	// Combine
	var mergedMeshData = meshBuilder.build()[0];

	return mergedMeshData;
}
module.exports = exports.default;
