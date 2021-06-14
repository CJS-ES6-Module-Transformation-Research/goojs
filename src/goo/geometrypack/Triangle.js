var mod_Triangle = Triangle;
import { MeshData as MeshData_MeshData } from "../renderer/MeshData";
import { getTriangleNormal as MathUtilsjs_getTriangleNormal } from "../math/MathUtils";

/**
 * Only creates an attributeMap with MeshData.POSITION and MeshData.NORMAL.
 * @param {Array<number>} verts array with 9 elements. These 9 elements must be 3 x, y, z positions.
 */
function Triangle(verts) {
	this.verts = verts;

	var attributeMap = MeshData_MeshData.defaultMap([MeshData_MeshData.POSITION, MeshData_MeshData.NORMAL]);
	MeshData_MeshData.call(this, attributeMap, 3, 3);

	this.rebuild();
}

Triangle.prototype = Object.create(MeshData_MeshData.prototype);
Triangle.prototype.constructor = Triangle;

/**
 * Builds or rebuilds the mesh data.
 * @returns {Triangle} Self for chaining.
 */
Triangle.prototype.rebuild = function () {
	this.getAttributeBuffer(MeshData_MeshData.POSITION).set(this.verts);

	var normals = MathUtilsjs_getTriangleNormal(
		this.verts[0], this.verts[1], this.verts[2],
		this.verts[3], this.verts[4], this.verts[5],
		this.verts[6], this.verts[7], this.verts[8]);

	this.getAttributeBuffer(MeshData_MeshData.NORMAL).set([
		normals[0], normals[1], normals[2],
		normals[0], normals[1], normals[2],
		normals[0], normals[1], normals[2]]);

	this.getIndexBuffer().set([0, 1, 2]);

	return this;
};

/**
 * Only creates an attributeMap with MeshData.POSITION and MeshData.NORMAL.
 * @param {Array<number>} verts array with 9 elements. These 9 elements must be 3 x, y, z positions.
 */
export { mod_Triangle as Triangle };