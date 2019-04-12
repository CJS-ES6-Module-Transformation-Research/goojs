Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = RegularPolygon;

var _PolyLine = require("../geometrypack/PolyLine");

var _PolyLine2 = _interopRequireDefault(_PolyLine);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Regular polygon mesh
 */
function RegularPolygon(nSegments, radius) {
	this.nSegments = nSegments || 5;
	this.radius = radius || 1;

	var verts = [];
	var ak = Math.PI * 2 / nSegments;
	for (var i = 0, k = 0; i < this.nSegments; i++, k += ak) {
		verts.push(Math.cos(k) * this.radius, Math.sin(k) * this.radius, 0);
	}

	_PolyLine2.default.call(this, verts, true);

	this.rebuild();
}

RegularPolygon.prototype = Object.create(_PolyLine2.default.prototype);
module.exports = exports.default;
