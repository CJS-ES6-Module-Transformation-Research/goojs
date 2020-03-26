import { Gizmo as utilgizmopackGizmo_Gizmojs } from "../../util/gizmopack/Gizmo";
import { MeshData as rendererMeshData_MeshDatajs } from "../../renderer/MeshData";
import { MeshBuilder as utilMeshBuilder_MeshBuilderjs } from "../../util/MeshBuilder";
import { Box as shapesBox_Boxjs } from "../../shapes/Box";
import { Transform as mathTransform_Transformjs } from "../../math/Transform";
import { Renderer as rendererRenderer_Rendererjs } from "../../renderer/Renderer";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Ray as mathRay_Rayjs } from "../../math/Ray";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../math/MathUtils";
function ScaleGizmo(gizmoRenderSystem) {
	utilgizmopackGizmo_Gizmojs.call(this, 'ScaleGizmo', gizmoRenderSystem);

	this._transformScale = new mathVector3_Vector3js(1, 1, 1);

	this.compileRenderables();
}

ScaleGizmo.prototype = Object.create(utilgizmopackGizmo_Gizmojs.prototype);
ScaleGizmo.prototype.constructor = ScaleGizmo;

var SCALE = 1;

ScaleGizmo.prototype.activate = function (props) {
	utilgizmopackGizmo_Gizmojs.prototype.activate.call(this, props);
	if (this._activeHandle.axis !== 3) {
		this._setPlane();
		this._setLine();
	}
};

ScaleGizmo.prototype.copyTransform = function (transform) {
	utilgizmopackGizmo_Gizmojs.prototype.copyTransform.call(this, transform);
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

	var cameraEntityDistance = rendererRenderer_Rendererjs.mainCamera.translation.distance(this.transform.translation);
	scale += cameraEntityDistance / 200000 * mathMathUtils_MathUtilsjs.sign(scale - 1);

	this._transformScale.scale(scale);
};

(function () {
	var oldRay = new mathRay_Rayjs();
	var newRay = new mathRay_Rayjs();

	var oldWorldPos = new mathVector3_Vector3js();
	var worldPos = new mathVector3_Vector3js();
	var result = new mathVector3_Vector3js();

	var AXIS_FOR_ID = ['x', 'y', 'z'];

	ScaleGizmo.prototype._scaleNonUniform = function (mouseState, oldMouseState) {
		rendererRenderer_Rendererjs.mainCamera.getPickRay(oldMouseState.x, oldMouseState.y, 1, 1, oldRay);
		rendererRenderer_Rendererjs.mainCamera.getPickRay(mouseState.x, mouseState.y, 1, 1, newRay);

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
	var boxMesh = new shapesBox_Boxjs(1.4, 1.4, 1.4);
	var arrowMesh = buildArrowMesh();

	this.addRenderable(buildBox(boxMesh));
	this.addRenderable(buildArrow(arrowMesh, 0));
	this.addRenderable(buildArrow(arrowMesh, 1));
	this.addRenderable(buildArrow(arrowMesh, 2));
};

function buildBox(boxMesh) {
	return {
		meshData: boxMesh,
		materials: [utilgizmopackGizmo_Gizmojs.buildMaterialForAxis(3)],
		transform: new mathTransform_Transformjs(),
		id: utilgizmopackGizmo_Gizmojs.registerHandle({ type: 'Scale', axis: 3 })
	};
}

function buildArrow(arrowMesh, dim) {
	var transform = new mathTransform_Transformjs();

	if (dim === 0) {
		transform.setRotationXYZ(0, Math.PI / 2, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(Math.PI * 3 / 2, 0, 0);
	}

	return {
		meshData: arrowMesh,
		materials: [utilgizmopackGizmo_Gizmojs.buildMaterialForAxis(dim)],
		transform: transform,
		id: utilgizmopackGizmo_Gizmojs.registerHandle({ type: 'Scale', axis: dim })
	};
}

function buildArrowMesh() {
	var meshBuilder = new utilMeshBuilder_MeshBuilderjs();

	// Box
	var mesh1Data = new shapesBox_Boxjs();

	// Line
	var mesh2Data = new rendererMeshData_MeshDatajs(rendererMeshData_MeshDatajs.defaultMap([rendererMeshData_MeshDatajs.POSITION]), 2, 2);
	mesh2Data.getAttributeBuffer(rendererMeshData_MeshDatajs.POSITION).set([0, 0, 0, 0, 0, 1]);
	mesh2Data.getIndexBuffer().set([0, 1]);
	mesh2Data.indexLengths = null;
	mesh2Data.indexModes = ['Lines'];

	// Box
	var transform = new mathTransform_Transformjs();
	transform.translation.setDirect(0, 0, 8);
	transform.update();
	meshBuilder.addMeshData(mesh1Data, transform);

	// Line
	var transform = new mathTransform_Transformjs();
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