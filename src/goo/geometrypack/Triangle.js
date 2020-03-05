import { MeshData as MeshData_MeshDatajs } from "../renderer/MeshData";
import { MathUtils as MathUtils_MathUtilsjs } from "../math/MathUtils";
function Triangle(verts) {
	this.verts = verts;

	var attributeMap = MeshData_MeshDatajs.defaultMap([MeshData_MeshDatajs.POSITION, MeshData_MeshDatajs.NORMAL]);
	MeshData_MeshDatajs.call(this, attributeMap, 3, 3);

	this.rebuild();
}

Triangle.prototype = Object.create(MeshData_MeshDatajs.prototype);
Triangle.prototype.constructor = Triangle;

/**
 * Builds or rebuilds the mesh data.
 * @returns {Triangle} Self for chaining.
 */
Triangle.prototype.rebuild = function () {
	this.getAttributeBuffer(MeshData_MeshDatajs.POSITION).set(this.verts);

	var normals = MathUtils_MathUtilsjs.getTriangleNormal(
		this.verts[0], this.verts[1], this.verts[2],
		this.verts[3], this.verts[4], this.verts[5],
		this.verts[6], this.verts[7], this.verts[8]);

	this.getAttributeBuffer(MeshData_MeshDatajs.NORMAL).set([
		normals[0], normals[1], normals[2],
		normals[0], normals[1], normals[2],
		normals[0], normals[1], normals[2]]);

	this.getIndexBuffer().set([0, 1, 2]);

	return this;
};

var exported_Triangle = Triangle;

/**
 * Only creates an attributeMap with MeshData.POSITION and MeshData.NORMAL.
 * @param {Array<number>} verts array with 9 elements. These 9 elements must be 3 x, y, z positions.
 */
export { exported_Triangle as Triangle };