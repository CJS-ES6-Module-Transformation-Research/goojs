var exported_Rectangle = Rectangle;
function Rectangle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

/**
 * Rectangle
 * @hidden
 * @param {number} x
 * @param {number} y
 * @param {number} w Width
 * @param {number} h Height
 */
export { exported_Rectangle as Rectangle };