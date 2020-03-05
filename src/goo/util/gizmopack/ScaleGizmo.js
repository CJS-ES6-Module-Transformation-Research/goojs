import { Gizmo as Gizmojs } from "../../util/gizmopack/Gizmo";
import { MeshData as MeshDatajs } from "../../renderer/MeshData";
import { MeshBuilder as MeshBuilder_MeshBuilderjs } from "../../util/MeshBuilder";
import { Box as Boxjs } from "../../shapes/Box";
import { Transform as Transformjs } from "../../math/Transform";
import { Renderer as Rendererjs } from "../../renderer/Renderer";
import { Vector3 as Vector3js } from "../../math/Vector3";
import { Ray as Rayjs } from "../../math/Ray";
import { MathUtils as MathUtilsjs } from "../../math/MathUtils";
function ScaleGizmo(gizmoRenderSystem) {
	Gizmojs.call(this, 'ScaleGizmo', gizmoRenderSystem);

	this._transformScale = new Vector3js(1, 1, 1);

	this.compileRenderables();
}

ScaleGizmo.prototype = Object.create(Gizmojs.prototype);
ScaleGizmo.prototype.constructor = ScaleGizmo;

var SCALE = 1;

ScaleGizmo.prototype.activate = function (props) {
	Gizmojs.prototype.activate.call(this, props);
	if (this._activeHandle.axis !== 3) {
		this._setPlane();
		this._setLine();
	}
};

ScaleGizmo.prototype.copyTransform = function (transform) {
	Gizmojs.prototype.copyTransform.call(this, transform);
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
	var scale = Math.pow(
		1 + mouseState.x + oldMouseState.y - oldMouseState.x - mouseState.y,
		SCALE
	);

	var cameraEntityDistance = Rendererjs.mainCamera.translation.distance(this.transform.translation);
	scale += cameraEntityDistance / 200000 * MathUtilsjs.sign(scale - 1);

	this._transformScale.scale(scale);
};

(function () {
	var oldRay = new Rayjs();
	var newRay = new Rayjs();

	var oldWorldPos = new Vector3js();
	var worldPos = new Vector3js();
	var result = new Vector3js();

	var AXIS_FOR_ID = ['x', 'y', 'z'];

	ScaleGizmo.prototype._scaleNonUniform = function (mouseState, oldMouseState) {
		Rendererjs.mainCamera.getPickRay(oldMouseState.x, oldMouseState.y, 1, 1, oldRay);
		Rendererjs.mainCamera.getPickRay(mouseState.x, mouseState.y, 1, 1, newRay);

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
	var boxMesh = new Boxjs(1.4, 1.4, 1.4);
	var arrowMesh = buildArrowMesh();

	this.addRenderable(buildBox(boxMesh));
	this.addRenderable(buildArrow(arrowMesh, 0));
	this.addRenderable(buildArrow(arrowMesh, 1));
	this.addRenderable(buildArrow(arrowMesh, 2));
};

function buildBox(boxMesh) {
	return {
		meshData: boxMesh,
		materials: [Gizmojs.buildMaterialForAxis(3)],
		transform: new Transformjs(),
		id: Gizmojs.registerHandle({ type: 'Scale', axis: 3 })
	};
}

function buildArrow(arrowMesh, dim) {
	var transform = new Transformjs();

	if (dim === 0) {
		transform.setRotationXYZ(0, Math.PI / 2, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(Math.PI * 3 / 2, 0, 0);
	}

	return {
		meshData: arrowMesh,
		materials: [Gizmojs.buildMaterialForAxis(dim)],
		transform: transform,
		id: Gizmojs.registerHandle({ type: 'Scale', axis: dim })
	};
}

function buildArrowMesh() {
	var meshBuilder = new MeshBuilder_MeshBuilderjs();

	// Box
	var mesh1Data = new Boxjs();

	// Line
	var mesh2Data = new MeshDatajs(MeshDatajs.defaultMap([MeshDatajs.POSITION]), 2, 2);
	mesh2Data.getAttributeBuffer(MeshDatajs.POSITION).set([0, 0, 0, 0, 0, 1]);
	mesh2Data.getIndexBuffer().set([0, 1]);
	mesh2Data.indexLengths = null;
	mesh2Data.indexModes = ['Lines'];

	// Box
	var transform = new Transformjs();
	transform.translation.setDirect(0, 0, 8);
	transform.update();
	meshBuilder.addMeshData(mesh1Data, transform);

	// Line
	var transform = new Transformjs();
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
export { exported_ScaleGizmo as ScaleGizmo };