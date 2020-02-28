import { MeshData as MeshDatajs } from "../renderer/MeshData";
import { shallowSelectiveClone as ObjectUtilsjs_shallowSelectiveClone } from "../util/ObjectUtils";
function Disk(nSegments, radius, pointiness) {
	if (arguments.length === 1 && arguments[0] instanceof Object) {
		var props = arguments[0];
		nSegments = props.nSegments;
		radius = props.radius;
		pointiness = props.pointiness;
	}
	//! AT: in cylinder and cone this is called radialSamples
	this.nSegments = nSegments || 8;
	this.radius = radius || 1;
	this.pointiness = pointiness || 0;

	var attributeMap = MeshDatajs_defaultMap([MeshDatajs_POSITION, MeshDatajs_NORMAL, MeshDatajs_TEXCOORD0]);
	MeshDatajs.call(this, attributeMap, this.nSegments + 1, this.nSegments * 3);

	this.indexModes = ['Triangles'];

	this.rebuild();
}

Disk.prototype = Object.create(MeshDatajs.prototype);
Disk.prototype.constructor = Disk;

/**
 * Builds or rebuilds the mesh data.
 * @returns {Disk} Self for chaining.
 */
Disk.prototype.rebuild = function () {
	var verts = [];
	var norms = [];
	var tex = [];
	var indices = [];

	var slope = Math.atan2(this.radius, this.pointiness);

	var angleIncrement = Math.PI * 2 / this.nSegments;
	for (var i = 0, angle = 0; i < this.nSegments; i++, angle += angleIncrement) {
		verts.push(
			Math.cos(angle) * this.radius,
			Math.sin(angle) * this.radius,
			0);

		norms.push(
			Math.cos(angle) * Math.cos(slope),
			Math.sin(angle) * Math.cos(slope),
			Math.sin(slope));

		tex.push(
			Math.cos(angle) * 0.5 + 0.5,
			Math.sin(angle) * 0.5 + 0.5);

		indices.push(this.nSegments, i, (i + 1) % this.nSegments);
	}

	verts.push(0, 0, this.pointiness);
	norms.push(0, 0, 1);
	tex.push(0.5, 0.5);

	this.getAttributeBuffer(MeshDatajs_POSITION).set(verts);
	this.getAttributeBuffer(MeshDatajs_NORMAL).set(norms);
	this.getAttributeBuffer(MeshDatajs_TEXCOORD0).set(tex);
	this.getIndexBuffer().set(indices);

	return this;
};

/**
 * Returns a clone of this disk
 * @returns {Disk}
 */
Disk.prototype.clone = function () {
	var options = ObjectUtilsjs_shallowSelectiveClone(this, ['nSegments', 'radius', 'pointiness']);

	return new Disk(options);
};

var exported_Disk = Disk;

/**
 * A disk shape
 * @extends MeshData
 * @example-link http://code.gooengine.com/latest/visual-test/goo/shapes/Disk/Disk-vtest.html Working example
 * @param {number} [nSegments=8] Number of slices
 * @param {number} [radius=1] Radius of the disk
 * @param {number} [pointiness=0] The center of the disk can be offset in both directions from its outer edge by setting a positive or negative pointiness.
 */
export { exported_Disk as Disk };