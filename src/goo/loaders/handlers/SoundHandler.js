import { ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs } from "../../loaders/handlers/ConfigHandler";
import { AudioContextjs as soundAudioContext_AudioContextjsjs } from "../../sound/AudioContext";
import { Sound as soundSound_Soundjs } from "../../sound/Sound";
import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function SoundHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
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

SoundHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
SoundHandler.prototype.constructor = SoundHandler;
loadershandlersConfigHandler_ConfigHandlerjs._registerClass('sound', SoundHandler);

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
	utilObjectUtils_ObjectUtilsjs.defaults(config, {
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
	return new soundSound_Soundjs();
};

/**
 * Adds/updates/removes a sound
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated sound or null if removed
 */
SoundHandler.prototype._update = function (ref, config, options) {
	if (!soundAudioContext_AudioContextjsjs.isSupported()) {
		return utilPromiseUtils_PromiseUtilsjs.resolve();
	}
	var that = this;
	return loadershandlersConfigHandler_ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (sound) {
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
						return utilPromiseUtils_PromiseUtilsjs.createPromise(function (resolve) {
							soundAudioContext_AudioContextjsjs.getContext().decodeAudioData(buffer, function (audioBuffer) {
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

var exported_SoundHandler = SoundHandler;

/**
 * Handler for loading sounds into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { exported_SoundHandler as SoundHandler };