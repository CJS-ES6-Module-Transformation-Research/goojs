import { BoundingBox as BoundingBox_BoundingBoxjs } from "../renderer/bounds/BoundingBox";
import { BoundingSphere as BoundingSphere_BoundingSpherejs } from "../renderer/bounds/BoundingSphere";
import { MeshBuilder as MeshBuilder_MeshBuilderjs } from "../util/MeshBuilder";
import { MeshData as MeshData_MeshDatajs } from "../renderer/MeshData";
import { Transform as Transform_Transformjs } from "../math/Transform";
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

	var meshData = new MeshData_MeshDatajs(MeshData_MeshDatajs.defaultMap([MeshData_MeshDatajs.POSITION]), verts.length / 3, indices.length);

	meshData.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}

BoundingVolumeMeshBuilder.buildBox = function (boundingBox) {
	var boxMeshData = buildBox(boundingBox.xExtent, boundingBox.yExtent, boundingBox.zExtent);
	// translate vertices to center
	return boxMeshData;
};

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

function buildSphere(radius) {
	radius = radius || 1;

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

BoundingVolumeMeshBuilder.buildSphere = function (boundingSphere) {
	var sphereMeshData = buildSphere(boundingSphere.radius);
	// translate vertices to center
	return sphereMeshData;
};

BoundingVolumeMeshBuilder.build = function (boundingVolume) {
	if (boundingVolume instanceof BoundingBox_BoundingBoxjs) {
		return BoundingVolumeMeshBuilder.buildBox(boundingVolume);
	} else if (boundingVolume instanceof BoundingSphere_BoundingSpherejs) {
		return BoundingVolumeMeshBuilder.buildSphere(boundingVolume);
	}
};

var exported_BoundingVolumeMeshBuilder = BoundingVolumeMeshBuilder;

/**
 * Provides methods for building bounding volume debug meshes
 */
export { exported_BoundingVolumeMeshBuilder as BoundingVolumeMeshBuilder };
