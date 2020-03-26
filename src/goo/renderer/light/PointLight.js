import { Light as rendererlightLight_Lightjs } from "../../renderer/light/Light";
function PointLight(color) {
	rendererlightLight_Lightjs.call(this, color);

	/**
	 * The range of the light (default is 1000)
	 * @type {number}
	 */
	this.range = 1000;

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

PointLight.prototype = Object.create(rendererlightLight_Lightjs.prototype);
PointLight.prototype.constructor = PointLight;

/**
 * Updates the light's translation
 * @private
 * @param {Transform} transform
 */
PointLight.prototype.update = function (transform) {
	transform.matrix.getTranslation(this.translation);
};

PointLight.prototype.copy = function (source) {
	rendererlightLight_Lightjs.prototype.copy.call(this, source);

	this.range = source.range;

	return this;
};

PointLight.prototype.clone = function () {
	var clone = new PointLight(this.color.clone());
	clone.copy(this);
	return clone;
};

var exported_PointLight = PointLight;

/**
 * A omni-directional source of light. So far it has the same effect as {@link Light}<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/renderer/light/Lights-vtest.html Working example
 * @extends Light
 * @param {Vector3} [color=(1, 1, 1)] The color of the light
 */
export { exported_PointLight as PointLight };