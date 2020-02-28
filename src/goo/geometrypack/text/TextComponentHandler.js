import {
    ComponentHandler as ComponentHandler_ComponentHandlerjs,
    _registerClass as ComponentHandlerjs__registerClass,
} from "../../loaders/handlers/ComponentHandler";

import { TextComponent as TextComponentjs } from "../../geometrypack/text/TextComponent";
import { createPromise as PromiseUtilsjs_createPromise } from "../../util/PromiseUtils";
function TextComponentHandler() {
	ComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'TextComponent';
}

TextComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandlerjs.prototype);
TextComponentHandler.prototype.constructor = TextComponentHandler;

ComponentHandlerjs__registerClass('text', TextComponentHandler);

/**
 * Create a TextComponent object.
 * @returns {TextComponent} the created component object
 * @private
 */
TextComponentHandler.prototype._create = function () {
	return new TextComponentjs();
};

/**
 * Removes the quadcomponent from the entity.
 * @param {Entity} entity
 * @private
 */
TextComponentHandler.prototype._remove = function (entity) {
	//if (this.world && this.world.gooRunner) {
	//	entity.textComponent.destroy(this.world.gooRunner.renderer.context);
	//}
	entity.clearComponent('TextComponent');
};

/**
 * Update engine textComponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
TextComponentHandler.prototype.update = function (entity, config, options) {
	return ComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		// load font

		return PromiseUtilsjs_createPromise(function (resolve) {
			opentype.load(config.font.fontRef, function (err, font) {
				if (err) {
					console.error(err);
					resolve(component);
					return;
				}

				var FONT_SIZE = 1;

				// smoothness is between 0 and 1
				// with 0 looking rough and choppy and 1 looking as smooth as possible
				var computeStepLength = function (fontSize, smoothness) {
					return ((1 - smoothness) * 0.08 + 0.01) * fontSize;
				};

				component.setFont(font);
				component.setText(config.text, {
					extrusion: config.extrusion,
					fontSize: FONT_SIZE,
					stepLength: computeStepLength(FONT_SIZE, config.smoothness),
					simplifyPaths: true
				});

				resolve(component);
			});
		});
	});
};

var exported_TextComponentHandler = TextComponentHandler;

/**
 * For handling loading of text components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function.
 * @param {Function} updateObject The handler function.
 * @extends ComponentHandler
 * @hidden
 */
export { exported_TextComponentHandler as TextComponentHandler };
