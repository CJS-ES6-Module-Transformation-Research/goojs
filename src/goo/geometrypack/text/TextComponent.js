import { Component as Component_Componentjs } from "../../entities/components/Component";
import { MeshDataComponent as MeshDataComponent_MeshDataComponentjs } from "../../entities/components/MeshDataComponent";
function TextComponent() {
	Component_Componentjs.apply(this, arguments);

	this.type = 'TextComponent';

	this._font = null;

	this._entity = null;
}

TextComponent.prototype = Object.create(Component_Componentjs.prototype);
TextComponent.prototype.constructor = TextComponent;

TextComponent.type = 'TextComponent';

TextComponent.prototype.attached = function (entity) {
	this._entity = entity;
};

TextComponent.prototype.detached = function (/*entity*/) {
	this._entity.clearComponent('MeshDataComponent');
	this._entity = null;
};

/**
 * Set the font of this component
 * @param font The font loaded through opentype.js
 * @returns {TextComponent} Returns self
 */
TextComponent.prototype.setFont = function (font) {
	this._font = font;
	return this;
};

/**
 * Set the text to generate the mesh for; recomputes the mesh
 * @param {string} text
 * @param {Object} [options]
 * @param {number} [options.extrusion=4] Extrusion amount
 * @param {number} [options.fontSize=48]
 * @param {number} [options.stepLength=1] Lower values result in a more detailed mesh
 * @returns {TextComponent} Returns self
 */
TextComponent.prototype.setText = function (text, options) {
	this._entity.clearComponent('MeshDataComponent');

	// only short texts that can fit in one mesh for now
	var meshData = TextMeshGenerator.meshesForText(text, this._font, options)[0];

	var meshDataComponent = new MeshDataComponent_MeshDataComponentjs(meshData);
	this._entity.setComponent(meshDataComponent);

	return this;
};

var exported_TextComponent = TextComponent;

/**
 * Stores a font and handles the text mesh on an entity
 * Depends on opentype.js
 */
export { exported_TextComponent as TextComponent };
