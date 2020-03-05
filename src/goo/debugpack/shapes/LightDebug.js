import { MeshData as MeshData_MeshDatajs } from "../../renderer/MeshData";
import { MeshBuilder as MeshBuilder_MeshBuilderjs } from "../../util/MeshBuilder";
import { Transform as Transform_Transformjs } from "../../math/Transform";
import { Sphere as Sphere_Spherejs } from "../../shapes/Sphere";
import { PointLight as PointLight_PointLightjs } from "../../renderer/light/PointLight";
import { DirectionalLight as DirectionalLight_DirectionalLightjs } from "../../renderer/light/DirectionalLight";
import { SpotLight as SpotLight_SpotLightjs } from "../../renderer/light/SpotLight";
var LightDebug__buildDirectionalLightMesh;
var LightDebug__buildSpotLightMesh;
var LightDebug__buildPointLightMesh;
var LightDebug__directionalLightMesh;
var LightDebug__spotLightMesh;
var LightDebug__pointLightMesh;

function LightDebug() {
	this._ball = new Sphere_Spherejs(12, 12, 0.3);
	LightDebug__pointLightMesh = LightDebug__buildPointLightMesh();;
	LightDebug__spotLightMesh = LightDebug__buildSpotLightMesh();;
	LightDebug__directionalLightMesh = LightDebug__buildDirectionalLightMesh();;
}

LightDebug.prototype.getMesh = function (light, options) {
	if (light instanceof PointLight_PointLightjs) {
		return options.full ? [this._ball, this._pointLightMesh] : [this._ball];
	} else if (light instanceof SpotLight_SpotLightjs) {
		return options.full ? [this._ball, this._spotLightMesh] : [this._ball];
	} else if (light instanceof DirectionalLight_DirectionalLightjs) {
		return options.full ? [this._ball, this._directionalLightMesh] : [this._ball];
	}
};

LightDebug__buildPointLightMesh = function() {
    return buildBall();
};;

LightDebug__buildSpotLightMesh = function() {
    return buildCone();
};;

LightDebug__buildDirectionalLightMesh = function() {
    return buildColumn();
};;

function buildCircle(radius, nSegments) {
	radius = radius || 1;
	nSegments = nSegments || 8;

	var verts = [];
	var indices = [];

	var ak = Math.PI * 2 / nSegments;
	for (var i = 0, k = 0; i < nSegments; i++, k += ak) {
		verts.push(Math.cos(k) * radius, Math.sin(k) * radius, 0);
		indices.push(i, i + 1);
	}
	indices[indices.length - 1] = 0;

	var meshData = new MeshData_MeshDatajs(MeshData_MeshDatajs.defaultMap([MeshData_MeshDatajs.POSITION]), nSegments, indices.length);

	meshData.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildBall() {
	var radius = 1;

	var meshBuilder = new MeshBuilder_MeshBuilderjs();
	var nSegments = 128;
	var circle = buildCircle(radius, nSegments);
	var transform;

	transform = new Transform_Transformjs();
	meshBuilder.addMeshData(circle, transform);

	transform = new Transform_Transformjs();
	transform.rotation.fromAngles(0, Math.PI / 2, 0);
	transform.update();
	meshBuilder.addMeshData(circle, transform);

	transform = new Transform_Transformjs();
	transform.rotation.fromAngles(Math.PI / 2, Math.PI / 2, 0);
	transform.update();
	meshBuilder.addMeshData(circle, transform);

	var meshDatas = meshBuilder.build();
	return meshDatas[0];
}

function buildUmbrella(nSegments) {
	nSegments = nSegments || 8;

	var verts = [0, 0, 0];
	var indices = [];

	var ak = Math.PI * 2 / nSegments;
	for (var i = 0, k = 0; i < nSegments; i++, k += ak) {
		verts.push(Math.cos(k), Math.sin(k), 1);
		indices.push(0, i + 1);
	}

	var meshData = new MeshData_MeshDatajs(MeshData_MeshDatajs.defaultMap([MeshData_MeshDatajs.POSITION]), nSegments + 1, indices.length);

	meshData.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildCone() {
	var length = -1;

	var meshBuilder = new MeshBuilder_MeshBuilderjs();

	var nSegments = 64;
	var nParallel = 2;
	var dxParallel = length / 2;
	var dyParallel = dxParallel;

	for (var i = 1; i <= nParallel; i++) {
		var circle = buildCircle(dyParallel * i, nSegments);
		var transform = new Transform_Transformjs();
		transform.translation.setDirect(0, 0, dxParallel * i);
		transform.update();
		meshBuilder.addMeshData(circle, transform);
	}

	var umbrella = buildUmbrella(4);
	var transform = new Transform_Transformjs();
	transform.scale.setDirect(dyParallel * nParallel, dyParallel * nParallel, dxParallel * nParallel);
	transform.update();
	meshBuilder.addMeshData(umbrella, transform);

	var meshDatas = meshBuilder.build();
	return meshDatas[0];
}

function buildTube(nSegments) {
	nSegments = nSegments || 8;

	var verts = [];
	var indices = [];

	var ak = Math.PI * 2 / nSegments;
	for (var i = 0, k = 0; i < nSegments; i++, k += ak) {
		verts.push(Math.cos(k), Math.sin(k), 0);
		verts.push(Math.cos(k), Math.sin(k), 1);
		indices.push(i * 2, i * 2 + 1);
	}

	var meshData = new MeshData_MeshDatajs(MeshData_MeshDatajs.defaultMap([MeshData_MeshDatajs.POSITION]), nSegments * 2, indices.length);

	meshData.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildColumn() {
	var meshBuilder = new MeshBuilder_MeshBuilderjs();

	var nSegments = 64;
	var nParallel = 2;
	var dxParallel = 10 / nParallel;
	var radius = 1;

	for (var i = 0; i < nParallel; i++) {
		var circle = buildCircle(radius, nSegments);
		var transform = new Transform_Transformjs();
		transform.translation.z = -dxParallel * i;
		transform.update();
		meshBuilder.addMeshData(circle, transform);
	}

	var tube = buildTube(4);
	var transform = new Transform_Transformjs();
	transform.scale.setDirect(radius, radius, -dxParallel * nParallel);
	transform.update();
	meshBuilder.addMeshData(tube, transform);

	var meshDatas = meshBuilder.build();
	return meshDatas[0];
}

var exported_LightDebug = LightDebug;
export { exported_LightDebug as LightDebug };