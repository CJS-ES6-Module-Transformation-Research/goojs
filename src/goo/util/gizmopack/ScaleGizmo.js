var mod_ScaleGizmo = ScaleGizmo;
import { Gizmo as Gizmo_Gizmo } from "../../util/gizmopack/Gizmo";
import { MeshData as MeshData_MeshData } from "../../renderer/MeshData";
import { MeshBuilder as MeshBuilder_MeshBuilder } from "../../util/MeshBuilder";
import { Box as Box_Box } from "../../shapes/Box";
import { Transform as Transform_Transform } from "../../math/Transform";
import { Renderer as Renderer_Renderer } from "../../renderer/Renderer";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";
import { Ray as Ray_Ray } from "../../math/Ray";
import { MathUtils as MathUtils_MathUtils } from "../../math/MathUtils";

/**
 * @extends Gizmo
 * @hidden
 */
function ScaleGizmo(gizmoRenderSystem) {
	Gizmo_Gizmo.call(this, 'ScaleGizmo', gizmoRenderSystem);

	this._transformScale = new Vector3_Vector3(1, 1, 1);

	this.compileRenderables();
}

ScaleGizmo.prototype = Object.create(Gizmo_Gizmo.prototype);
ScaleGizmo.prototype.constructor = ScaleGizmo;

var SCALE = 1;

ScaleGizmo.prototype.activate = function (props) {
	Gizmo_Gizmo.prototype.activate.call(this, props);
	if (this._activeHandle.axis !== 3) {
		this._setPlane();
		this._setLine();
	}
};

ScaleGizmo.prototype.copyTransform = function (transform) {
	Gizmo_Gizmo.prototype.copyTransform.call(this, transform);
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

	var cameraEntityDistance = Renderer_Renderer.mainCamera.translation.distance(this.transform.translation);
	scale += cameraEntityDistance / 200000 * MathUtils_MathUtils.sign(scale - 1);

	this._transformScale.scale(scale);
};

(function () {
	var oldRay = new Ray_Ray();
	var newRay = new Ray_Ray();

	var oldWorldPos = new Vector3_Vector3();
	var worldPos = new Vector3_Vector3();
	var result = new Vector3_Vector3();

	var AXIS_FOR_ID = ['x', 'y', 'z'];

	ScaleGizmo.prototype._scaleNonUniform = function (mouseState, oldMouseState) {
		Renderer_Renderer.mainCamera.getPickRay(oldMouseState.x, oldMouseState.y, 1, 1, oldRay);
		Renderer_Renderer.mainCamera.getPickRay(mouseState.x, mouseState.y, 1, 1, newRay);

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
	var boxMesh = new Box_Box(1.4, 1.4, 1.4);
	var arrowMesh = buildArrowMesh();

	this.addRenderable(buildBox(boxMesh));
	this.addRenderable(buildArrow(arrowMesh, 0));
	this.addRenderable(buildArrow(arrowMesh, 1));
	this.addRenderable(buildArrow(arrowMesh, 2));
};

function buildBox(boxMesh) {
	return {
		meshData: boxMesh,
		materials: [Gizmo_Gizmo.buildMaterialForAxis(3)],
		transform: new Transform_Transform(),
		id: Gizmo_Gizmo.registerHandle({ type: 'Scale', axis: 3 })
	};
}

function buildArrow(arrowMesh, dim) {
	var transform = new Transform_Transform();

	if (dim === 0) {
		transform.setRotationXYZ(0, Math.PI / 2, 0);
	} else if (dim === 1) {
		transform.setRotationXYZ(Math.PI * 3 / 2, 0, 0);
	}

	return {
		meshData: arrowMesh,
		materials: [Gizmo_Gizmo.buildMaterialForAxis(dim)],
		transform: transform,
		id: Gizmo_Gizmo.registerHandle({ type: 'Scale', axis: dim })
	};
}

function buildArrowMesh() {
	var meshBuilder = new MeshBuilder_MeshBuilder();

	// Box
	var mesh1Data = new Box_Box();

	// Line
	var mesh2Data = new MeshData_MeshData(MeshData_MeshData.defaultMap([MeshData_MeshData.POSITION]), 2, 2);
	mesh2Data.getAttributeBuffer(MeshData_MeshData.POSITION).set([0, 0, 0, 0, 0, 1]);
	mesh2Data.getIndexBuffer().set([0, 1]);
	mesh2Data.indexLengths = null;
	mesh2Data.indexModes = ['Lines'];

	// Box
	var transform = new Transform_Transform();
	transform.translation.setDirect(0, 0, 8);
	transform.update();
	meshBuilder.addMeshData(mesh1Data, transform);

	// Line
	var transform = new Transform_Transform();
	transform.scale.setDirect(1, 1, 8);
	transform.update();
	meshBuilder.addMeshData(mesh2Data, transform);

	// Combine
	var mergedMeshData = meshBuilder.build()[0];

	return mergedMeshData;
}

/**
 * @extends Gizmo
 * @hidden
 */
export { mod_ScaleGizmo as ScaleGizmo };