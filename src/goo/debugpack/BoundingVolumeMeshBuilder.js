import { BoundingBox as BoundingBoxjs } from "../renderer/bounds/BoundingBox";
import { BoundingSphere as BoundingSpherejs } from "../renderer/bounds/BoundingSphere";
import { MeshBuilder as MeshBuilder_MeshBuilderjs } from "../util/MeshBuilder";
import { MeshData as MeshDatajs } from "../renderer/MeshData";
import { Transform as Transformjs } from "../math/Transform";
var BoundingVolumeMeshBuilder_build;
var BoundingVolumeMeshBuilder_buildSphere;
var BoundingVolumeMeshBuilder_buildBox;

/**
 * Provides methods for building bounding volume debug meshes
 */
function BoundingVolumeMeshBuilder() {}

function buildBox(dx, dy, dz) {
	var verts = [
		dx,  dy,  dz,
		dx,  dy, -dz,
		dx, -dy,  dz,
		dx, -dy, -dz,
		-dx,  dy,  dz,
		-dx,  dy, -dz,
		-dx, -dy,  dz,
		-dx, -dy, -dz
	];

	var indices = [
		0, 1,
		0, 2,
		1, 3,
		2, 3,

		4, 5,
		4, 6,
		5, 7,
		6, 7,

		0, 4,
		1, 5,
		2, 6,
		3, 7
	];

	var meshData = new MeshDatajs(MeshDatajs_defaultMap([MeshDatajs_POSITION]), verts.length / 3, indices.length);

	meshData.getAttributeBuffer(MeshDatajs_POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

BoundingVolumeMeshBuilder_buildBox = function(boundingBox) {
    var boxMeshData = buildBox(boundingBox.xExtent, boundingBox.yExtent, boundingBox.zExtent);
    // translate vertices to center
    return boxMeshData;
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

	var meshData = new MeshDatajs(MeshDatajs_defaultMap([MeshDatajs_POSITION]), nSegments, indices.length);

	meshData.getAttributeBuffer(MeshDatajs_POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

function buildSphere(radius) {
	radius = radius || 1;

	var meshBuilder = new MeshBuilder_MeshBuilderjs();
	var nSegments = 128;
	var circle = buildCircle(radius, nSegments);
	var transform;

	transform = new Transformjs();
	meshBuilder.addMeshData(circle, transform);

	transform = new Transformjs();
	transform.rotation.fromAngles(0, Math.PI / 2, 0);
	transform.update();
	meshBuilder.addMeshData(circle, transform);

	transform = new Transformjs();
	transform.rotation.fromAngles(Math.PI / 2, Math.PI / 2, 0);
	transform.update();
	meshBuilder.addMeshData(circle, transform);

	var meshDatas = meshBuilder.build();
	return meshDatas[0];
}

BoundingVolumeMeshBuilder_buildSphere = function(boundingSphere) {
    var sphereMeshData = buildSphere(boundingSphere.radius);
    // translate vertices to center
    return sphereMeshData;
};;

BoundingVolumeMeshBuilder_build = function(boundingVolume) {
    if (boundingVolume instanceof BoundingBoxjs) {
        return BoundingVolumeMeshBuilder_buildBox(boundingVolume);
    } else if (boundingVolume instanceof BoundingSpherejs) {
        return BoundingVolumeMeshBuilder_buildSphere(boundingVolume);
    }
};;

export { BoundingVolumeMeshBuilder_build as build, BoundingVolumeMeshBuilder };
