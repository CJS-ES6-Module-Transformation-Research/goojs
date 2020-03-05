import { ComponentHandler as ComponentHandlerjs } from "../../loaders/handlers/ComponentHandler";
import { SoundComponent as SoundComponentjs } from "../../entities/components/SoundComponent";
import { AudioContextjs as AudioContext_AudioContextjsjs } from "../../sound/AudioContext";
import { rsvpjs as rsvp_rsvpjsjs } from "../../util/rsvp";
import { PromiseUtils as PromiseUtilsjs } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtilsjs } from "../../util/ObjectUtils";
function SoundComponentHandler() {
	ComponentHandlerjs.apply(this, arguments);
	this._type = 'SoundComponent';
}

SoundComponentHandler.prototype = Object.create(ComponentHandlerjs.prototype);
SoundComponentHandler.prototype.constructor = SoundComponentHandler;
ComponentHandlerjs._registerClass('sound', SoundComponentHandler);

/**
 * Removes the souncomponent and stops all connected sounds
 * @param {Entity} entity
 * @private
 */
SoundComponentHandler.prototype._remove = function (entity) {
	var component = entity.soundComponent;
	if (component && component.sounds) {
		var sounds = component.sounds;
		for (var i = 0; i < sounds.length; i++) {
			sounds[i].stop();
		}
	}
};

/**
 * Prepares the config
 * @param {Object} config
 */
SoundComponentHandler.prototype._prepare = function (config) {
	ObjectUtilsjs.defaults(config, {
		volume: 1.0,
		reverb: 0.0
	});
};

/**
 * Creates sound component
 * @returns {SoundComponent} Should be soundcomponent
 * @private
 */
SoundComponentHandler.prototype._create = function () {
	return new SoundComponentjs();
};

/**
 * Update engine sound component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
SoundComponentHandler.prototype.update = function (entity, config, options) {
	if (!AudioContext_AudioContextjsjs.isSupported()) {
		return PromiseUtilsjs.resolve(); //! AT: we're not really using reject
	}

	var that = this;
	return ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }
		component.updateConfig(config);

		// Remove old sounds
		for (var i = 0; i < component.sounds.length; i++) {
			var sound = component.sounds[i];
			if (!config.sounds[sound.id]) {
				component.removeSound(sound);
			}
		}

		var promises = [];
		// Load all sounds
		ObjectUtilsjs.forEach(config.sounds, function (soundCfg) {
			promises.push(that._load(soundCfg.soundRef, options));
		}, null, 'sortValue');

		return rsvp_rsvpjsjs.all(promises).then(function (sounds) {
			// Add new sounds
			for (var i = 0; i < sounds.length; i++) {
				if (component.sounds.indexOf(sounds[i]) === -1) {
					component.addSound(sounds[i]);
				}
			}
			return component;
		});
	});
};

var exported_SoundComponentHandler = SoundComponentHandler;

/**
 * For handling loading of sound components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { exported_SoundComponentHandler as SoundComponentHandler };