import { MeshData as MeshDatajs } from "../../../renderer/MeshData";
function PhysicsCylinderDebugShape(numSegments) {
	numSegments = numSegments || 32;
	var attributeMap = MeshDatajs_defaultMap([MeshDatajs_POSITION]);
	this.numSegments = numSegments;
	MeshDatajs.call(this, attributeMap, 2 * 3 * numSegments + 3 * 8, 2 * 2 * numSegments + 2 * 8);
	this.indexModes[0] = 'Lines';
	this.rebuild();
}
PhysicsCylinderDebugShape.prototype = Object.create(MeshDatajs.prototype);
PhysicsCylinderDebugShape.prototype.constructor = PhysicsCylinderDebugShape;

/**
 * @returns {PhysicsCylinderDebugShape}
 */
PhysicsCylinderDebugShape.prototype.buildWireframeData = function () {
	return new PhysicsCylinderDebugShape();
};

/**
 * @returns {PhysicsCylinderDebugShape} self for chaining
 */
PhysicsCylinderDebugShape.prototype.rebuild = function () {
	var verts = [];
	var indices = [];
	var numSegments = this.numSegments;

	// Around +z
	for (var i = 0; i < numSegments; i++) {
		verts.push(Math.cos(2 * Math.PI * i / numSegments), Math.sin(2 * Math.PI * i / numSegments), 0.5);
		indices.push(i, (i + 1) % numSegments);
	}

	// Around -z
	for (var i = 0; i < numSegments; i++) {
		verts.push(Math.cos(2 * Math.PI * i / numSegments), Math.sin(2 * Math.PI * i / numSegments), -0.5);
		indices.push(numSegments + i, numSegments + (i + 1) % numSegments);
	}

	verts.push(
		Math.cos(1 * Math.PI / 2), Math.sin(1 * Math.PI / 2), -0.5,
		Math.cos(1 * Math.PI / 2), Math.sin(1 * Math.PI / 2), 0.5,
		Math.cos(2 * Math.PI / 2), Math.sin(2 * Math.PI / 2), -0.5,
		Math.cos(2 * Math.PI / 2), Math.sin(2 * Math.PI / 2), 0.5,
		Math.cos(3 * Math.PI / 2), Math.sin(3 * Math.PI / 2), -0.5,
		Math.cos(3 * Math.PI / 2), Math.sin(3 * Math.PI / 2), 0.5,
		Math.cos(4 * Math.PI / 2), Math.sin(4 * Math.PI / 2), -0.5,
		Math.cos(4 * Math.PI / 2), Math.sin(4 * Math.PI / 2), 0.5
	);

	indices.push(
		2 * numSegments + 0, 2 * numSegments + 1,
		2 * numSegments + 2, 2 * numSegments + 3,
		2 * numSegments + 4, 2 * numSegments + 5,
		2 * numSegments + 6, 2 * numSegments + 7
	);

	this.getAttributeBuffer(MeshDatajs_POSITION).set(verts);
	this.getIndexBuffer().set(indices);

	return this;
};

var exported_PhysicsCylinderDebugShape = PhysicsCylinderDebugShape;

/**
 * A wireframe mesh indicating the position and orientation of a CylinderCollider.
 * @param {number} [numSegments=32]
 * @extends MeshData
 */
export { exported_PhysicsCylinderDebugShape as PhysicsCylinderDebugShape };