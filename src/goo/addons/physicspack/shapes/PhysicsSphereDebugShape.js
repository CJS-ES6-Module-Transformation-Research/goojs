var PhysicsSphereDebugShape_PhysicsSphereDebugShape = PhysicsSphereDebugShape;
import { MeshData as rendererMeshData_MeshDatajs } from "../../../renderer/MeshData";
function PhysicsSphereDebugShape(numSegments) {
	numSegments = numSegments || 32;
	var attributeMap = rendererMeshData_MeshDatajs.defaultMap([rendererMeshData_MeshDatajs.POSITION]);
	this.numSegments = numSegments;
	rendererMeshData_MeshDatajs.call(this, attributeMap, 3 * 3 * numSegments, 3 * 2 * numSegments);
	this.indexModes[0] = 'Lines';
	this.rebuild();
}
PhysicsSphereDebugShape.prototype = Object.create(rendererMeshData_MeshDatajs.prototype);
PhysicsSphereDebugShape.prototype.constructor = PhysicsSphereDebugShape;

/**
 * @returns {PhysicsSphereDebugShape}
 */
PhysicsSphereDebugShape.prototype.buildWireframeData = function () {
	return new PhysicsSphereDebugShape();
};

/**
 * @returns {PhysicsSphereDebugShape} self for chaining
 */
PhysicsSphereDebugShape.prototype.rebuild = function () {
	var verts = [];
	var indices = [];
	var numSegments = this.numSegments;

	// Around x
	for (var i = 0; i < numSegments; i++) {
		verts.push(0, Math.cos(2 * Math.PI * i / numSegments), Math.sin(2 * Math.PI * i / numSegments));
		indices.push(i, (i + 1) % numSegments);
	}

	// Around y
	for (var i = 0; i < numSegments; i++) {
		verts.push(Math.cos(2 * Math.PI * i / numSegments), 0, Math.sin(2 * Math.PI * i / numSegments));
		indices.push(numSegments + i, numSegments + (i + 1) % numSegments);
	}

	// Around z
	for (var i = 0; i < numSegments; i++) {
		verts.push(Math.cos(2 * Math.PI * i / numSegments), Math.sin(2 * Math.PI * i / numSegments), 0);
		indices.push(2 * numSegments + i, 2 * numSegments + (i + 1) % numSegments);
	}

	this.getAttributeBuffer(rendererMeshData_MeshDatajs.POSITION).set(verts);
	this.getIndexBuffer().set(indices);

	return this;
};

/**
 * A wireframe mesh indicating the position and orientation of a SphereCollider.
 * @param {number} [numSegments=32]
 * @extends MeshData
 */
export { PhysicsSphereDebugShape_PhysicsSphereDebugShape as PhysicsSphereDebugShape };