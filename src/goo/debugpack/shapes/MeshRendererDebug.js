Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MeshRendererDebug;

var _MeshData = require("../../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function MeshRendererDebug() {
	this._meshes = [buildBox(1, 1, 1), null];
}

MeshRendererDebug.prototype.getMesh = function () {
	return this._meshes;
};

function buildBox(dx, dy, dz) {
	var verts = [dx, dy, dz, dx, dy, -dz, dx, -dy, dz, dx, -dy, -dz, -dx, dy, dz, -dx, dy, -dz, -dx, -dy, dz, -dx, -dy, -dz];

	var indices = [0, 1, 0, 2, 1, 3, 2, 3, 4, 5, 4, 6, 5, 7, 6, 7, 0, 4, 1, 5, 2, 6, 3, 7];

	var meshData = new _MeshData2.default(_MeshData2.default.defaultMap([_MeshData2.default.POSITION]), verts.length / 3, indices.length);

	meshData.getAttributeBuffer(_MeshData2.default.POSITION).set(verts);
	meshData.getIndexBuffer().set(indices);

	meshData.indexLengths = null;
	meshData.indexModes = ['Lines'];

	return meshData;
}
module.exports = exports.default;
