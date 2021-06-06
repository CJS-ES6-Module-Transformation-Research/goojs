var mod_RegularPolygon = RegularPolygon;
import { PolyLine as PolyLine_PolyLine } from "../geometrypack/PolyLine";

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

	PolyLine_PolyLine.call(this, verts, true);

	this.rebuild();
}

RegularPolygon.prototype = Object.create(PolyLine_PolyLine.prototype);

/**
 * Regular polygon mesh
 */
export { mod_RegularPolygon as RegularPolygon };