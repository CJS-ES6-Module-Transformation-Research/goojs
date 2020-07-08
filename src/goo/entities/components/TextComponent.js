var TextComponent_TextComponent = TextComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
function TextComponent(text) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'TextComponent';

	this.text = text || '';
	this.dirty = true;

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

TextComponent.type = 'TextComponent';

TextComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
TextComponent.prototype.constructor = TextComponent;

/**
 * Text to update to
 * @param {string} text
 * @returns {TextComponent} Self for chaining
 */
TextComponent.prototype.setText = function (text) {
	if (this.text !== text) {
		this.text = text;
		this.dirty = true;
	}
	return this;
};

/**
 * Provides ways for the entity to display text
 * @extends Component
 * @example-link http://code.gooengine.com/latest/visual-test/goo/entities/components/TextComponent/TextComponent-vtest.html Working example
 */
export { TextComponent_TextComponent as TextComponent };