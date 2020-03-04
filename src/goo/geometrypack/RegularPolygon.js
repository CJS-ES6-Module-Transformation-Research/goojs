import { PolyLine as PolyLinejs } from "../geometrypack/PolyLine";
function RegularPolygon(nSegments, radius) {
	this.nSegments = nSegments || 5;
	this.radius = radius || 1;

	var verts = [];
	var ak = Math.PI * 2 / nSegments;
	for (var i = 0, k = 0; i < this.nSegments; i++, k += ak) {
		verts.push(Math.cos(k) * this.radius, Math.sin(k) * this.radius, 0);
	}

	PolyLinejs.call(this, verts, true);

	this.rebuild();
}

RegularPolygon.prototype = Object.create(PolyLinejs.prototype);

var exported_RegularPolygon = RegularPolygon;

/**
 * Regular polygon mesh
 */
export { exported_RegularPolygon as RegularPolygon };