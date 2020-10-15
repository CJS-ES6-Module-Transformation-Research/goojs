"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundComponentHandler = undefined;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _SoundComponent = require("../../entities/components/SoundComponent");

var _AudioContext = require("../../sound/AudioContext");

var _rsvp = require("../../util/rsvp");

var _PromiseUtils = require("../../util/PromiseUtils");

var _ObjectUtils = require("../../util/ObjectUtils");

var SoundComponentHandler_SoundComponentHandler = SoundComponentHandler;

function SoundComponentHandler() {
	_ComponentHandler.ComponentHandler.apply(this, arguments);
	this._type = 'SoundComponent';
}

SoundComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
SoundComponentHandler.prototype.constructor = SoundComponentHandler;
_ComponentHandler.ComponentHandler._registerClass('sound', SoundComponentHandler);

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
	_ObjectUtils.ObjectUtils.defaults(config, {
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
	return new _SoundComponent.SoundComponent();
};

/**
 * Update engine sound component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
SoundComponentHandler.prototype.update = function (entity, config, options) {
	if (!_AudioContext.AudioContextjs.isSupported()) {
		return _PromiseUtils.PromiseUtils.resolve(); //! AT: we're not really using reject
	}

	var that = this;
	return _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}
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
		_ObjectUtils.ObjectUtils.forEach(config.sounds, function (soundCfg) {
			promises.push(that._load(soundCfg.soundRef, options));
		}, null, 'sortValue');

		return _rsvp.rsvpjs.all(promises).then(function (sounds) {
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

/**
 * For handling loading of sound components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
exports.SoundComponentHandler = SoundComponentHandler_SoundComponentHandler;