"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PhysicsPlaneDebugShape = undefined;

var _MeshData = require("../../../renderer/MeshData");

var mod_PhysicsPlaneDebugShape = PhysicsPlaneDebugShape;

/**
 * A wireframe mesh indicating the position and orientation of a PlaneCollider.
 * @extends MeshData
 */
function PhysicsPlaneDebugShape() {
	var attributeMap = _MeshData.MeshData.defaultMap([_MeshData.MeshData.POSITION]);
	_MeshData.MeshData.call(this, attributeMap, 10, 14);
	this.indexModes[0] = 'Lines';
	this.rebuild();
}
PhysicsPlaneDebugShape.prototype = Object.create(_MeshData.MeshData.prototype);
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

	verts.push(-1, -1, 0, // 0
	1, -1, 0, // 1
	1, 1, 0, // 2
	-1, 1, 0, // 3
	-2, 0, 0, // 4
	2, 0, 0, // 5
	0, -2, 0, // 6
	0, 2, 0, // 7
	0, 0, 0, // 8
	0, 0, 1 // 9
	);

	indices.push(0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 6, 7, 8, 9);

	this.getAttributeBuffer(_MeshData.MeshData.POSITION).set(verts);

	this.getIndexBuffer().set(indices);

	return this;
};

/**
 * A wireframe mesh indicating the position and orientation of a PlaneCollider.
 * @extends MeshData
 */
exports.PhysicsPlaneDebugShape = mod_PhysicsPlaneDebugShape;