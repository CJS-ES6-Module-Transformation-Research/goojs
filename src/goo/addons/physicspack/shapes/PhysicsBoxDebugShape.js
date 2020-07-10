var PhysicsBoxDebugShape_PhysicsBoxDebugShape = PhysicsBoxDebugShape;
import { MeshData as rendererMeshData_MeshDatajs } from "../../../renderer/MeshData";
function PhysicsBoxDebugShape() {
	var attributeMap = rendererMeshData_MeshDatajs.defaultMap([rendererMeshData_MeshDatajs.POSITION]);
	rendererMeshData_MeshDatajs.call(this, attributeMap, 3 * 8, 2 * 4 * 3);
	this.indexModes[0] = 'Lines';
	this.rebuild();
}
PhysicsBoxDebugShape.prototype = Object.create(rendererMeshData_MeshDatajs.prototype);
PhysicsBoxDebugShape.prototype.constructor = PhysicsBoxDebugShape;

/**
 * @returns {PhysicsBoxDebugShape}
 */
PhysicsBoxDebugShape.prototype.buildWireframeData = function () {
	return new PhysicsBoxDebugShape();
};

/**
 * @returns {PhysicsBoxDebugShape} self for chaining
 */
PhysicsBoxDebugShape.prototype.rebuild = function () {
	var verts = [];
	var indices = [];

	verts.push(
		-0.5, -0.5, -0.5, // 0
		-0.5, -0.5,  0.5, // 1
		-0.5,  0.5,  0.5, // 2
		-0.5,  0.5, -0.5, // 3
		0.5, -0.5, -0.5, // 4
		0.5, -0.5,  0.5, // 5
		0.5,  0.5,  0.5, // 6
		0.5,  0.5, -0.5  // 7
	);

	indices.push(
		0, 1,
		1, 2,
		2, 3,
		3, 0,

		4, 5,
		5, 6,
		6, 7,
		7, 4,

		0, 4,
		1, 5,
		2, 6,
		3, 7
	);

	this.getAttributeBuffer(rendererMeshData_MeshDatajs.POSITION).set(verts);

	this.getIndexBuffer().set(indices);

	return this;
};

/**
 * A wireframe mesh indicating the position and orientation of a BoxCollider.
 * @extends MeshData
 */
export { PhysicsBoxDebugShape_PhysicsBoxDebugShape as PhysicsBoxDebugShape };