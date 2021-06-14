var mod_SoundHandler = SoundHandler;

import {
    ConfigHandler as ConfigHandler_ConfigHandler,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { AudioContextjs as AudioContext } from "../../sound/AudioContext";
import { Sound as Sound_Sound } from "../../sound/Sound";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * Handler for loading sounds into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function SoundHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
	this._audioCache = {};

	if (window.Audio !== undefined) {
		var audioTest = new Audio();

		this._codecs = [
			{
				type: 'mp3',
				enabled: !!audioTest.canPlayType('audio/mpeg;')
			}, {
				type: 'ogg',
				enabled: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"')
			}, {
				type: 'wav',
				enabled: !!audioTest.canPlayType('audio/wav; codecs="1"')
			}
		];
	} else {
		this._codecs = [];
	}
}

SoundHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
SoundHandler.prototype.constructor = SoundHandler;
ConfigHandlerjs__registerClass('sound', SoundHandler);

/**
 * Removes a sound
 * @param {ref}
 * @private
 */
SoundHandler.prototype._remove = function (ref) {
	var sound = this._objects.get(ref);
	if (!sound) { return; }

	sound.stop();
	this._objects.delete(ref);
};

/**
 * Preparing sound config by populating it with defaults.
 * @param {Object} config
 * @private
 */
SoundHandler.prototype._prepare = function (config) {
	ObjectUtils_ObjectUtils.defaults(config, {
		loop: false,
		audioRefs: {},
		volume: 1.0,
		spatialize: false,
		autoPlay: false,
		name: 'A Sound'
	});
};

/**
 * Creates an empty sound.
 * @returns {Howl}
 * @private
 */
SoundHandler.prototype._create = function () {
	return new Sound_Sound();
};

/**
 * Adds/updates/removes a sound
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated sound or null if removed
 */
SoundHandler.prototype._update = function (ref, config, options) {
	if (!AudioContext.isSupported()) {
		return PromiseUtils_PromiseUtils.resolve();
	}
	var that = this;
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (sound) {
		if (!sound) { return; }
		sound.update(config);
		for (var i = 0; i < that._codecs.length; i++) {
			var codec = that._codecs[i];
			var ref = config.audioRefs[codec.type];

			if (ref && codec.enabled) {
				if (that._audioCache[ref]) {
					sound.setAudioBuffer(that._audioCache[ref]);
					return sound;
				} else {
					return that.loadObject(ref).then(function (buffer) {
						return PromiseUtils_PromiseUtils.createPromise(function (resolve) {
							AudioContext.getContext().decodeAudioData(buffer, function (audioBuffer) {
								resolve(audioBuffer);
							}, function (/*err*/) {
								console.error('Could not decode audio ' + ref);
								// shouldn't this just reject?
								resolve(null);
							});
						});
					}).then(function (audioBuffer) {
						if (audioBuffer) {
							that._audioCache[ref] = audioBuffer;
							sound.setAudioBuffer(audioBuffer);
						}
						return sound;
					});
				}
			}
		}
		console.warn('No supported audioformat was found');
		return sound;
	});
};

/**
 * Handler for loading sounds into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { mod_SoundHandler as SoundHandler };