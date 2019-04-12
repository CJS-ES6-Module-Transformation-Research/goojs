Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Triangle;

var _MeshData = require("../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _MathUtils = require("../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Only creates an attributeMap with MeshData.POSITION and MeshData.NORMAL.
 * @param {Array<number>} verts array with 9 elements. These 9 elements must be 3 x, y, z positions.
 */
function Triangle(verts) {
	this.verts = verts;

	var attributeMap = _MeshData2.default.defaultMap([_MeshData2.default.POSITION, _MeshData2.default.NORMAL]);
	_MeshData2.default.call(this, attributeMap, 3, 3);

	this.rebuild();
}

Triangle.prototype = Object.create(_MeshData2.default.prototype);
Triangle.prototype.constructor = Triangle;

/**
 * Builds or rebuilds the mesh data.
 * @returns {Triangle} Self for chaining.
 */
Triangle.prototype.rebuild = function () {
	this.getAttributeBuffer(_MeshData2.default.POSITION).set(this.verts);

	var normals = _MathUtils2.default.getTriangleNormal(this.verts[0], this.verts[1], this.verts[2], this.verts[3], this.verts[4], this.verts[5], this.verts[6], this.verts[7], this.verts[8]);

	this.getAttributeBuffer(_MeshData2.default.NORMAL).set([normals[0], normals[1], normals[2], normals[0], normals[1], normals[2], normals[0], normals[1], normals[2]]);

	this.getIndexBuffer().set([0, 1, 2]);

	return this;
};
module.exports = exports.default;
