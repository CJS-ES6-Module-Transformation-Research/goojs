var DirectionalLight_DirectionalLight = DirectionalLight;
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { Light as rendererlightLight_Lightjs } from "../../renderer/light/Light";
function DirectionalLight(color) {
	rendererlightLight_Lightjs.call(this, color);

	/**
	 * The direction vector of the light
	 * @readonly
	 * @type {Vector3}
	 */
	this.direction = new mathVector3_Vector3js();

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

DirectionalLight.prototype = Object.create(rendererlightLight_Lightjs.prototype);
DirectionalLight.prototype.constructor = DirectionalLight;

/**
 * Updates the light's translation and orientation
 * @hidden
 * @param {Transform} transform
 */
DirectionalLight.prototype.update = function (transform) {
	transform.matrix.getTranslation(this.translation);
	this.direction.setDirect(0.0, 0.0, -1.0);
	this.direction.applyPostVector(transform.matrix);
};

DirectionalLight.prototype.copy = function (source) {
	rendererlightLight_Lightjs.prototype.copy.call(this, source);

	this.direction.copy(source.direction);

	return this;
};

DirectionalLight.prototype.clone = function () {
	var clone = new DirectionalLight(this.color.clone());
	clone.copy(this);
	return clone;
};

/**
 * A directional light
 * @example-link http://code.gooengine.com/latest/visual-test/goo/renderer/light/Lights-vtest.html Working example
 * @extends Light
 * @param {Vector3} [color=(1, 1, 1)] The color of the light
 */
export { DirectionalLight_DirectionalLight as DirectionalLight };