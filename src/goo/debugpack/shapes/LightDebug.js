Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LightDebug = undefined;

var _MeshData = require("../../renderer/MeshData");

var _MeshBuilder = require("../../util/MeshBuilder");

var _Transform = require("../../math/Transform");

var _Sphere = require("../../shapes/Sphere");

var _PointLight = require("../../renderer/light/PointLight");

var _DirectionalLight = require("../../renderer/light/DirectionalLight");

var _SpotLight = require("../../renderer/light/SpotLight");

var LightDebug__buildDirectionalLightMesh;
var LightDebug__buildSpotLightMesh;
var LightDebug__buildPointLightMesh;
var LightDebug__directionalLightMesh;
var LightDebug__spotLightMesh;
var LightDebug__pointLightMesh;

function LightDebug() {
	this._ball = new _Sphere.Sphere(12, 12, 0.3);
	LightDebug__pointLightMesh = LightDebug__buildPointLightMesh();;
	LightDebug__spotLightMesh = LightDebug__buildSpotLightMesh();;
	LightDebug__directionalLightMesh = LightDebug__buildDirectionalLightMesh();;
}

LightDebug.prototype.getMesh = function (light, options) {
	if (light instanceof _PointLight.PointLight) {
		return options.full ? [this._ball, this._pointLightMesh] : [this._ball];
	} else if (light instanceof _SpotLight.SpotLight) {
		return options.full ? [this._ball, this._spotLightMesh] : [this._ball];
	} else if (light instanceof _DirectionalLight.DirectionalLight) {
		return options.full ? [this._ball, this._directionalLightMesh] : [this._ball];
	}
};

LightDebug__buildPointLightMesh = function LightDebug__buildPointLightMesh() {
	return buildBall();
};;

LightDebug__buildSpotLightMesh = function LightDebug__buildSpotLightMesh() {
	return buildCone();
};;

LightDebug__buildDirectionalLightMesh = function LightDebug__buildDirectionalLightMesh() {
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

	var meshData = new _MeshData.MeshData(_MeshData.MeshData.defaultMap([_MeshData.MeshData.POSITION]), nSegments, indices.length);

	meshData.getAttributeBuffer(_MeshData.MeshData.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildBall() {
	var radius = 1;

	var meshBuilder = new _MeshBuilder.MeshBuilder();
	var nSegments = 128;
	var circle = buildCircle(radius, nSegments);
	var transform;

	transform = new _Transform.Transform();
	meshBuilder.addMeshData(circle, transform);

	transform = new _Transform.Transform();
	transform.rotation.fromAngles(0, Math.PI / 2, 0);
	transform.update();
	meshBuilder.addMeshData(circle, transform);

	transform = new _Transform.Transform();
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

	var meshData = new _MeshData.MeshData(_MeshData.MeshData.defaultMap([_MeshData.MeshData.POSITION]), nSegments + 1, indices.length);

	meshData.getAttributeBuffer(_MeshData.MeshData.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildCone() {
	var length = -1;

	var meshBuilder = new _MeshBuilder.MeshBuilder();

	var nSegments = 64;
	var nParallel = 2;
	var dxParallel = length / 2;
	var dyParallel = dxParallel;

	for (var i = 1; i <= nParallel; i++) {
		var circle = buildCircle(dyParallel * i, nSegments);
		var transform = new _Transform.Transform();
		transform.translation.setDirect(0, 0, dxParallel * i);
		transform.update();
		meshBuilder.addMeshData(circle, transform);
	}

	var umbrella = buildUmbrella(4);
	var transform = new _Transform.Transform();
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

	var meshData = new _MeshData.MeshData(_MeshData.MeshData.defaultMap([_MeshData.MeshData.POSITION]), nSegments * 2, indices.length);

	meshData.getAttributeBuffer(_MeshData.MeshData.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildColumn() {
	var meshBuilder = new _MeshBuilder.MeshBuilder();

	var nSegments = 64;
	var nParallel = 2;
	var dxParallel = 10 / nParallel;
	var radius = 1;

	for (var i = 0; i < nParallel; i++) {
		var circle = buildCircle(radius, nSegments);
		var transform = new _Transform.Transform();
		transform.translation.z = -dxParallel * i;
		transform.update();
		meshBuilder.addMeshData(circle, transform);
	}

	var tube = buildTube(4);
	var transform = new _Transform.Transform();
	transform.scale.setDirect(radius, radius, -dxParallel * nParallel);
	transform.update();
	meshBuilder.addMeshData(tube, transform);

	var meshDatas = meshBuilder.build();
	return meshDatas[0];
}

var exported_LightDebug = LightDebug;
exports.LightDebug = exported_LightDebug;
