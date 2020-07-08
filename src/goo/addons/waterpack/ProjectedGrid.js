var ProjectedGrid_ProjectedGrid = ProjectedGrid;
import { MeshData as rendererMeshData_MeshDatajs } from "../../renderer/MeshData";
import { Vector2 as mathVector2_Vector2js } from "../../math/Vector2";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Vector4 as mathVector4_Vector4js } from "../../math/Vector4";
import { Matrix4 as mathMatrix4_Matrix4js } from "../../math/Matrix4";
import { Camera as rendererCamera_Camerajs } from "../../renderer/Camera";
import { EPSILON as MathUtilsjs_EPSILON } from "../../math/MathUtils";
function ProjectedGrid(densityX, densityY) {
	this.densityX = densityX !== undefined ? densityX : 20;
	this.densityY = densityY !== undefined ? densityY : 20;

	this.projectorCamera = new rendererCamera_Camerajs(45, 1, 0.1, 2000);
	this.mainCamera = new rendererCamera_Camerajs(45, 1, 0.1, 2000);

	this.freezeProjector = false;
	this.upperBound = 20.0;

	this.origin = new mathVector4_Vector4js();
	this.direction = new mathVector4_Vector4js();
	this.source = new mathVector2_Vector2js();
	this.rangeMatrix = new mathMatrix4_Matrix4js();

	this.intersectBottomLeft = new mathVector4_Vector4js();
	this.intersectTopLeft = new mathVector4_Vector4js();
	this.intersectTopRight = new mathVector4_Vector4js();
	this.intersectBottomRight = new mathVector4_Vector4js();

	this.planeIntersection = new mathVector3_Vector3js();

	this.freezeProjector = false;

	this.projectorMinHeight = 50.0;
	this.intersections = [];
	for (var i = 0; i < 24; i++) {
		this.intersections.push(new mathVector3_Vector3js());
	}

	this.connections = [0, 3, 1, 2, 0, 4, 1, 5, 2, 6, 3, 7, 4, 7, 5, 6];

	// Create mesh data
	var vertexCount = this.densityX * this.densityY;
	var indexCount = ((this.densityX - 1) * (this.densityY - 1)) * 6;
	var attributeMap = rendererMeshData_MeshDatajs.defaultMap([rendererMeshData_MeshDatajs.POSITION, rendererMeshData_MeshDatajs.TEXCOORD0]);
	rendererMeshData_MeshDatajs.call(this, attributeMap, vertexCount, indexCount);

	this.rebuild();
}

ProjectedGrid.prototype = Object.create(rendererMeshData_MeshDatajs.prototype);
ProjectedGrid.prototype.constructor = ProjectedGrid;

ProjectedGrid.prototype.update = function (camera) {
	if (camera.translation.y === 0) {
		return;
	}

	var upperBound = this.upperBound;
	var mainCamera = this.mainCamera;

	if (!mainCamera) {
		return;
	}

	if (!this.freezeProjector) {
		mainCamera.copy(camera);
		// mainCamera.setFrustumPerspective(null, null, 10.0, 300.0);

		// var tmp = new Vector3();
		// getWorldTransform().applyInverse(mainCamera.translation, tmp);
		// mainCamera.setLocation(tmp);
		// getWorldTransform().applyInverseVector(mainCamera.getLeft(), tmp);
		// mainCamera.setLeft(tmp);
		// getWorldTransform().applyInverseVector(mainCamera.getUp(), tmp);
		// mainCamera.setUp(tmp);
		// getWorldTransform().applyInverseVector(mainCamera._direction, tmp);
		// mainCamera.setDirection(tmp);
	}

	var mainCameraLocation = mainCamera.translation;
	if (mainCameraLocation.y > 0.0 && mainCameraLocation.y < upperBound + mainCamera.near) {
		mainCamera.translation.setDirect(mainCameraLocation.x, upperBound + mainCamera.near,
			mainCameraLocation.z);
	} else if (mainCameraLocation.y < 0.0
		&& mainCameraLocation.y > -upperBound - mainCamera.near) {
		mainCamera.translation.setDirect(mainCameraLocation.x, -upperBound - mainCamera.near,
			mainCameraLocation.z);
	}
	var corners = mainCamera.calculateFrustumCorners();

	var nrPoints = 0;

	// check intersections of frustum connections with upper and lower bound
	var tmpStorage = new mathVector3_Vector3js();
	for (var i = 0; i < 8; i++) {
		var source = this.connections[i * 2];
		var destination = this.connections[i * 2 + 1];

		if (corners[source].y > upperBound && corners[destination].y < upperBound
			|| corners[source].y < upperBound && corners[destination].y > upperBound) {
			this.getWorldIntersectionSimple(upperBound, corners[source], corners[destination], this.intersections[nrPoints++],
				tmpStorage);
		}
		if (corners[source].y > -upperBound && corners[destination].y < -upperBound
			|| corners[source].y < -upperBound && corners[destination].y > -upperBound) {
			this.getWorldIntersectionSimple(-upperBound, corners[source], corners[destination], this.intersections[nrPoints++],
				tmpStorage);
		}
	}
	// check if any of the frustums corner vertices lie between the upper and lower bound planes
	for (var i = 0; i < 8; i++) {
		if (corners[i].y < upperBound && corners[i].y > -upperBound) {
			this.intersections[nrPoints++].set(corners[i]);
		}
	}

	if (nrPoints === 0) {
		// No intersection, grid not visible
		return false;
	}

	// set projector
	var projectorCamera = this.projectorCamera;
	projectorCamera.copy(mainCamera);

	// force the projector to point at the plane
	if (projectorCamera.translation.y > 0.0 && projectorCamera._direction.y > 0.0
		|| projectorCamera.translation.y < 0.0 && projectorCamera._direction.y < 0.0) {
		projectorCamera._direction.y = -projectorCamera._direction.y;

		var tmpVec = new mathVector3_Vector3js();
		tmpVec.set(projectorCamera._direction).cross(projectorCamera._left).normalize();
		projectorCamera._up.set(tmpVec);
	}

	// find the plane intersection point
	var source = this.source;
	var planeIntersection = this.planeIntersection;

	source.setDirect(0.5, 0.5);
	this.getWorldIntersection(0.0, source, projectorCamera.getViewProjectionInverseMatrix(), planeIntersection);

	// force the projector to be a certain distance above the plane
	var cameraLocation = projectorCamera.translation;
	if (cameraLocation.y > 0.0 && cameraLocation.y < this.projectorMinHeight * 2) {
		var delta = (this.projectorMinHeight * 2 - cameraLocation.y) / (this.projectorMinHeight * 2);

		projectorCamera.translation.setDirect(cameraLocation.x, this.projectorMinHeight * 2 - this.projectorMinHeight * delta,
			cameraLocation.z);
	} else if (cameraLocation.y < 0.0 && cameraLocation.y > -this.projectorMinHeight * 2) {
		var delta = (-this.projectorMinHeight * 2 - cameraLocation.y) / (-this.projectorMinHeight * 2);

		projectorCamera.translation.setDirect(cameraLocation.x, -this.projectorMinHeight * 2 + this.projectorMinHeight * delta,
			cameraLocation.z);
	}

	// restrict the intersection point to be a certain distance from the camera in plane coords
	planeIntersection.sub(projectorCamera.translation);
	planeIntersection.y = 0.0;
	var length = planeIntersection.length();
	if (length > Math.abs(projectorCamera.translation.y)) {
		planeIntersection.normalize();
		planeIntersection.scale(Math.abs(projectorCamera.translation.y));
	} else if (length < MathUtilsjs_EPSILON) {
		planeIntersection.add(projectorCamera._up);
		planeIntersection.y = 0.0;
		planeIntersection.normalize();
		planeIntersection.scale(0.1); // TODO: magic number
	}
	planeIntersection.add(projectorCamera.translation);
	planeIntersection.y = 0.0;

	// point projector at the new intersection point
	projectorCamera.lookAt(planeIntersection, mathVector3_Vector3js.UNIT_Y);

	// transform points to projector space
	var modelViewProjectionMatrix = projectorCamera.getViewProjectionMatrix();
	var spaceTransformation = new mathVector4_Vector4js();
	var intersections = this.intersections;
	for (var i = 0; i < nrPoints; i++) {
		var intersection = intersections[i];
		spaceTransformation.setDirect(intersection.x, 0.0, intersection.z, 1.0);
		// modelViewProjectionMatrix.applyPost(spaceTransformation);
		spaceTransformation.applyPost(modelViewProjectionMatrix);
		intersection.setDirect(spaceTransformation.x, spaceTransformation.y, 0);
		intersection.scale(1 / spaceTransformation.w);
	}

	// find min/max in projector space
	var minX = Number.MAX_VALUE;
	var maxX = -Number.MAX_VALUE;
	var minY = Number.MAX_VALUE;
	var maxY = -Number.MAX_VALUE;
	for (var i = 0; i < nrPoints; i++) {
		if (intersections[i].x < minX) {
			minX = intersections[i].x;
		}
		if (intersections[i].x > maxX) {
			maxX = intersections[i].x;
		}
		if (intersections[i].y < minY) {
			minY = intersections[i].y;
		}
		if (intersections[i].y > maxY) {
			maxY = intersections[i].y;
		}
	}

	// create range matrix
	var rangeMatrix = this.rangeMatrix;
	rangeMatrix.setIdentity();
	rangeMatrix.e00 = maxX - minX;
	rangeMatrix.e11 = maxY - minY;
	rangeMatrix.e03 = minX;
	rangeMatrix.e13 = minY;

	var modelViewProjectionInverseMatrix = projectorCamera.getViewProjectionInverseMatrix();
	rangeMatrix.mul2(modelViewProjectionInverseMatrix, rangeMatrix);

	source.setDirect(0.5, 0.5);
	this.getWorldIntersectionHomogenous(0.0, source, rangeMatrix, this.intersectBottomLeft);
	source.setDirect(0.5, 1);
	this.getWorldIntersectionHomogenous(0.0, source, rangeMatrix, this.intersectTopLeft);
	source.setDirect(1, 1);
	this.getWorldIntersectionHomogenous(0.0, source, rangeMatrix, this.intersectTopRight);
	source.setDirect(1, 0.5);
	this.getWorldIntersectionHomogenous(0.0, source, rangeMatrix, this.intersectBottomRight);

	return true;
};

ProjectedGrid.prototype.getWorldIntersectionHomogenous = function (planeHeight, screenPosition, modelViewProjectionInverseMatrix, store) {
	this.calculateIntersection(planeHeight, screenPosition, modelViewProjectionInverseMatrix);
	store.set(this.origin);
};

ProjectedGrid.prototype.getWorldIntersection = function (planeHeight, screenPosition, modelViewProjectionInverseMatrix, store) {
	this.calculateIntersection(planeHeight, screenPosition, modelViewProjectionInverseMatrix);
	store.setDirect(this.origin.x, this.origin.y, this.origin.z).scale(1 / this.origin.w);
};

ProjectedGrid.prototype.getWorldIntersectionSimple = function (planeHeight, source, destination, store, tmpStorage) {
	var origin = store.set(source);
	var direction = tmpStorage.set(destination).sub(origin);

	var t = (planeHeight - origin.y) / (direction.y);

	direction.scale(t);
	origin.add(direction);

	return t >= 0.0 && t <= 1.0;
};

ProjectedGrid.prototype.calculateIntersection = function (planeHeight, screenPosition, modelViewProjectionInverseMatrix) {
	this.origin.setDirect(screenPosition.x * 2 - 1, screenPosition.y * 2 - 1, -1, 1);
	this.direction.setDirect(screenPosition.x * 2 - 1, screenPosition.y * 2 - 1, 1, 1);

	// modelViewProjectionInverseMatrix.applyPost(this.origin);
	// modelViewProjectionInverseMatrix.applyPost(this.direction);
	this.origin.applyPost(modelViewProjectionInverseMatrix);
	this.direction.applyPost(modelViewProjectionInverseMatrix);

	this.direction.sub(this.origin);

	// final double t = (planeHeight * this.origin.getW() - this.origin.y)
	// / (direction.y - planeHeight * direction.getW());

	if (Math.abs(this.direction.y) > MathUtilsjs_EPSILON) {
		var t = (planeHeight - this.origin.y) / this.direction.y;
		this.direction.scale(t);
	} else {
		this.direction.normalize();
		this.direction.scale(this.mainCamera._frustumFar);
	}

	this.origin.add(this.direction);
};

/**
 * Builds or rebuilds the mesh data.
 * @returns {ProjectedGrid} Self for chaining.
 */
ProjectedGrid.prototype.rebuild = function () {
	var vbuf = this.getAttributeBuffer(rendererMeshData_MeshDatajs.POSITION);
	var texs = this.getAttributeBuffer(rendererMeshData_MeshDatajs.TEXCOORD0);
	var indices = this.getIndexBuffer();

	var densityX = this.densityX;
	var densityY = this.densityY;

	for (var x = 0; x < densityX; x++) {
		for (var y = 0; y < densityY; y++) {
			vbuf[(x + (y * densityX)) * 3 + 0] = x;
			vbuf[(x + (y * densityX)) * 3 + 1] = 0;
			vbuf[(x + (y * densityX)) * 3 + 2] = y;

			texs[(x + (y * densityX)) * 2 + 0] = x / (densityX - 1);
			texs[(x + (y * densityX)) * 2 + 1] = y / (densityY - 1);
		}
	}

	// go through entire array up to the second to last column.
	var index = 0;
	for (var i = 0; i < (densityX * (densityY - 1)); i++) {
		// we want to skip the top row.
		if (i % ((densityX * (Math.floor(i / densityX) + 1)) - 1) === 0 && i !== 0) {
			continue;
		}

		// set the top left corner.
		indices[index++] = i;
		// indexBuffer.put(i);
		// set the bottom right corner.
		indices[index++] = 1 + densityX + i;
		// indexBuffer.put((1 + densityX) + i);
		// set the top right corner.
		indices[index++] = 1 + i;
		// indexBuffer.put(1 + i);
		// set the top left corner
		indices[index++] = i;
		// indexBuffer.put(i);
		// set the bottom left corner
		indices[index++] = densityX + i;
		// indexBuffer.put(densityX + i);
		// set the bottom right corner
		indices[index++] = 1 + densityX + i;
		// indexBuffer.put((1 + densityX) + i);
	}

	return this;
};

/**
 * Projected grid mesh
 * @param {number} [densityX=20] Density in X of grid
 * @param {number} [densityY=20] Density in Y of grid
 */
export { ProjectedGrid_ProjectedGrid as ProjectedGrid };