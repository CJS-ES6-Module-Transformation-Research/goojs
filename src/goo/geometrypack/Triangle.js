Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Triangle = undefined;

var _MeshData = require("../renderer/MeshData");

var _MathUtils = require("../math/MathUtils");

var MathUtils = _interopRequireWildcard(_MathUtils);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_Triangle = Triangle;
function Triangle(verts) {
	this.verts = verts;

	var attributeMap = _MeshData.MeshData.defaultMap([_MeshData.MeshData.POSITION, _MeshData.MeshData.NORMAL]);
	_MeshData.MeshData.call(this, attributeMap, 3, 3);

	this.rebuild();
}

Triangle.prototype = Object.create(_MeshData.MeshData.prototype);
Triangle.prototype.constructor = Triangle;

/**
 * Builds or rebuilds the mesh data.
 * @returns {Triangle} Self for chaining.
 */
Triangle.prototype.rebuild = function () {
	this.getAttributeBuffer(_MeshData.MeshData.POSITION).set(this.verts);

	var normals = MathUtils.getTriangleNormal(this.verts[0], this.verts[1], this.verts[2], this.verts[3], this.verts[4], this.verts[5], this.verts[6], this.verts[7], this.verts[8]);

	this.getAttributeBuffer(_MeshData.MeshData.NORMAL).set([normals[0], normals[1], normals[2], normals[0], normals[1], normals[2], normals[0], normals[1], normals[2]]);

	this.getIndexBuffer().set([0, 1, 2]);

	return this;
};

/**
 * Only creates an attributeMap with MeshData.POSITION and MeshData.NORMAL.
 * @param {Array<number>} verts array with 9 elements. These 9 elements must be 3 x, y, z positions.
 */
exports.Triangle = exported_Triangle;
