Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TranslationGizmo;

var _Gizmo = require("../../util/gizmopack/Gizmo");

var _Gizmo2 = _interopRequireDefault(_Gizmo);

var _MeshData = require("../../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _MeshBuilder = require("../../util/MeshBuilder");

var _MeshBuilder2 = _interopRequireDefault(_MeshBuilder);

var _Disk = require("../../shapes/Disk");

var _Disk2 = _interopRequireDefault(_Disk);

var _Quad = require("../../shapes/Quad");

var _Quad2 = _interopRequireDefault(_Quad);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _Ray = require("../../math/Ray");

var _Ray2 = _interopRequireDefault(_Ray);

var _Renderer = require("../../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @extends Gizmo
 * @hidden
 */
function TranslationGizmo() {
	_Gizmo2.default.call(this, 'TranslationGizmo');

	this.realTranslation = new _Vector2.default();
	this._snap = false;

	this.compileRenderables();
}

TranslationGizmo.prototype = Object.create(_Gizmo2.default.prototype);
TranslationGizmo.prototype.constructor = TranslationGizmo;

// Triggered when you have mousedown on a gizmo handle
TranslationGizmo.prototype.activate = function (props) {
	_Gizmo2.default.prototype.activate.call(this, props);
	this._setPlane();
	if (this._activeHandle.type === 'Axis') {
		this._setLine();
	}
	this.realTranslation.copy(this.transform.translation);
};

TranslationGizmo.prototype.copyTransform = function () {
	_Gizmo2.default.prototype.copyTransform.apply(this, arguments);
};

function snapToGrid(vector3) {
	vector3.x = Math.round(vector3.x);
	vector3.y = Math.round(vector3.y);
	vector3.z = Math.round(vector3.z);
}

TranslationGizmo.prototype.setSnap = function (snap) {
	this._snap = snap;
};

(function () {
	var oldRay = new _Ray2.default();
	var newRay = new _Ray2.default();

	TranslationGizmo.prototype.process = function (mouseState, oldMouseState) {
		_Renderer2.default.mainCamera.getPickRay(oldMouseState.x, oldMouseState.y, 1, 1, oldRay);
		_Renderer2.default.mainCamera.getPickRay(mouseState.x, mouseState.y, 1, 1, newRay);

		if (this._activeHandle.type === 'Plane') {
			this._moveOnPlane(oldRay, newRay, this._plane);
		} else if (this._activeHandle.type === 'Axis') {
			this._moveOnLine(oldRay, newRay, this._plane, this._line);
		}

		this._postProcess(this.transform.translation);
	};
})();

TranslationGizmo.prototype._addTranslation = function (moveVector) {
	this.realTranslation.add(moveVector);
	this.transform.translation.copy(this.realTranslation);

	if (this._snap) {
		snapToGrid(this.transform.translation);
	}
};

(function () {
	var oldWorldPos = new _Vector2.default();
	var worldPos = new _Vector2.default();
	var moveVector = new _Vector2.default();

	TranslationGizmo.prototype._moveOnPlane = function (oldRay, newRay, plane) {
		// Project mouse move to plane
		plane.rayIntersect(oldRay, oldWorldPos, true);
		plane.rayIntersect(newRay, worldPos, true);
		moveVector.copy(worldPos).sub(oldWorldPos);

		// And add to translation
		this._addTranslation(moveVector);
	};
})();

(function () {
	var oldWorldPos = new _Vector2.default();
	var worldPos = new _Vector2.default();
	var moveVector = new _Vector2.default();

	TranslationGizmo.prototype._moveOnLine = function (oldRay, newRay, plane, line) {
		// Project mousemove to plane
		plane.rayIntersect(oldRay, oldWorldPos, true);
		plane.rayIntersect(newRay, worldPos, true);
		moveVector.copy(worldPos).sub(oldWorldPos);

		// Then project plane diff to line
		var d = moveVector.dot(line);
		moveVector.copy(line).scale(d);

		this._addTranslation(moveVector);
	};
})();

TranslationGizmo.prototype.compileRenderables = function () {
	var arrowMesh = buildArrowMesh();
	var quadMesh = new _Quad2.default(2, 2);

	buildArrow(arrowMesh, quadMesh, 0).forEach(this.addRenderable, this);
	buildArrow(arrowMesh, quadMesh, 1).forEach(this.addRenderable, this);
	buildArrow(arrowMesh, quadMesh, 2).forEach(this.addRenderable, this);
};

function buildArrow(arrowMesh, quadMesh, dim) {
	var arrowTransform = new _Transform2.default();
	var quadTransform = new _Transform2.default();

	var size = 1.0;
	quadTransform.scale.setDirect(size, size, size);
	if (dim === 2) {
		quadTransform.translation.setDirect(size, size, 0);
	} else if (dim === 0) {
		quadTransform.translation.setDirect(0, size, size);
		quadTransform.setRotationXYZ(0, Math.PI / 2, 0);
		arrowTransform.setRotationXYZ(0, Math.PI / 2, 0);
	} else if (dim === 1) {
		quadTransform.translation.setDirect(size, 0, size);
		quadTransform.setRotationXYZ(Math.PI / 2, 0, 0);
		arrowTransform.setRotationXYZ(Math.PI * 3 / 2, 0, 0);
	}

	return [{
		meshData: arrowMesh,
		materials: [_Gizmo2.default.buildMaterialForAxis(dim)],
		transform: arrowTransform,
		id: _Gizmo2.default.registerHandle({ type: 'Axis', axis: dim }),
		thickness: 0.6
	}, {
		meshData: quadMesh,
		materials: [_Gizmo2.default.buildMaterialForAxis(dim, 0.6)],
		transform: quadTransform,
		id: _Gizmo2.default.registerHandle({ type: 'Plane', axis: dim })
	}];
}

function buildArrowMesh() {
	var meshBuilder = new _MeshBuilder2.default();

	// Arrow head
	var mesh1Data = new _Disk2.default(32, 0.6, 2.3);
	// Arrow base
	var mesh2Data = new _Disk2.default(32, 0.6);
	// Line
	var mesh3Data = new _MeshData2.default(_MeshData2.default.defaultMap([_MeshData2.default.POSITION]), 2, 2);
	mesh3Data.getAttributeBuffer(_MeshData2.default.POSITION).set([0, 0, 0, 0, 0, 7]);
	mesh3Data.getIndexBuffer().set([0, 1]);
	mesh3Data.indexLengths = null;
	mesh3Data.indexModes = ['Lines'];

	// Arrow head
	var transform = new _Transform2.default();
	transform.translation.setDirect(0, 0, 7);
	transform.update();
	meshBuilder.addMeshData(mesh1Data, transform);

	// Arrow base
	transform.setRotationXYZ(0, Math.PI, 0);
	transform.update();
	meshBuilder.addMeshData(mesh2Data, transform);

	// Line
	var transform = new _Transform2.default();
	transform.update();
	meshBuilder.addMeshData(mesh3Data, transform);

	// Combine
	var mergedMeshData = meshBuilder.build()[0];
	return mergedMeshData;
}
module.exports = exports.default;
