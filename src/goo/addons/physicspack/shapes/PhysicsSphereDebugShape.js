Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PhysicsSphereDebugShape = undefined;

var _MeshData = require("../../../renderer/MeshData");

function PhysicsSphereDebugShape(numSegments) {
	numSegments = numSegments || 32;
	var attributeMap = MeshDatajs_defaultMap([MeshDatajs_POSITION]);
	this.numSegments = numSegments;
	_MeshData.MeshData.call(this, attributeMap, 3 * 3 * numSegments, 3 * 2 * numSegments);
	this.indexModes[0] = 'Lines';
	this.rebuild();
}
PhysicsSphereDebugShape.prototype = Object.create(_MeshData.MeshData.prototype);
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

	this.getAttributeBuffer(MeshDatajs_POSITION).set(verts);
	this.getIndexBuffer().set(indices);

	return this;
};

var exported_PhysicsSphereDebugShape = PhysicsSphereDebugShape;

/**
 * A wireframe mesh indicating the position and orientation of a SphereCollider.
 * @param {number} [numSegments=32]
 * @extends MeshData
 */
exports.PhysicsSphereDebugShape = exported_PhysicsSphereDebugShape;
