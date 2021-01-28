var mod_PhysicsPlaneDebugShape = PhysicsPlaneDebugShape;
import { MeshData as MeshData_MeshData } from "../../../renderer/MeshData";

/**
 * A wireframe mesh indicating the position and orientation of a PlaneCollider.
 * @extends MeshData
 */
function PhysicsPlaneDebugShape() {
	var attributeMap = MeshData_MeshData.defaultMap([MeshData_MeshData.POSITION]);
	MeshData_MeshData.call(this, attributeMap, 10, 14);
	this.indexModes[0] = 'Lines';
	this.rebuild();
}
PhysicsPlaneDebugShape.prototype = Object.create(MeshData_MeshData.prototype);
PhysicsPlaneDebugShape.prototype.constructor = PhysicsPlaneDebugShape;

/**
 * @returns {PhysicsPlaneDebugShape}
 */
PhysicsPlaneDebugShape.prototype.buildWireframeData = function () {
	return new PhysicsPlaneDebugShape();
};

/**
 * @returns {PhysicsPlaneDebugShape} self for chaining
 */
PhysicsPlaneDebugShape.prototype.rebuild = function () {
	var verts = [];
	var indices = [];

	verts.push(
		-1, -1, 0, // 0
		1, -1, 0, // 1
		1,  1, 0, // 2
		-1,  1, 0, // 3
		-2,  0, 0, // 4
		2,  0, 0, // 5
		0, -2, 0, // 6
		0,  2, 0, // 7
		0,  0, 0, // 8
		0,  0, 1  // 9
	);

	indices.push(
		0, 1,
		1, 2,
		2, 3,
		3, 0,
		4, 5,
		6, 7,
		8, 9
	);

	this.getAttributeBuffer(MeshData_MeshData.POSITION).set(verts);

	this.getIndexBuffer().set(indices);

	return this;
};

/**
 * A wireframe mesh indicating the position and orientation of a PlaneCollider.
 * @extends MeshData
 */
export { mod_PhysicsPlaneDebugShape as PhysicsPlaneDebugShape };