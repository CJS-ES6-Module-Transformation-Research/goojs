"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundHandler = undefined;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _AudioContext = require("../../sound/AudioContext");

var _Sound = require("../../sound/Sound");

var _PromiseUtils = require("../../util/PromiseUtils");

var _ObjectUtils = require("../../util/ObjectUtils");

var mod_SoundHandler = SoundHandler;

/**
 * Handler for loading sounds into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function SoundHandler() {
	_ConfigHandler.ConfigHandler.apply(this, arguments);
	this._audioCache = {};

	if (window.Audio !== undefined) {
		var audioTest = new Audio();

		this._codecs = [{
			type: 'mp3',
			enabled: !!audioTest.canPlayType('audio/mpeg;')
		}, {
			type: 'ogg',
			enabled: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"')
		}, {
			type: 'wav',
			enabled: !!audioTest.canPlayType('audio/wav; codecs="1"')
		}];
	} else {
		this._codecs = [];
	}
}

SoundHandler.prototype = Object.create(_ConfigHandler.ConfigHandler.prototype);
SoundHandler.prototype.constructor = SoundHandler;
(0, _ConfigHandler._registerClass)('sound', SoundHandler);

/**
 * Removes a sound
 * @param {ref}
 * @private
 */
SoundHandler.prototype._remove = function (ref) {
	var sound = this._objects.get(ref);
	if (!sound) {
		return;
	}

	sound.stop();
	this._objects.delete(ref);
};

/**
 * Preparing sound config by populating it with defaults.
 * @param {Object} config
 * @private
 */
SoundHandler.prototype._prepare = function (config) {
	_ObjectUtils.ObjectUtils.defaults(config, {
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
	return new _Sound.Sound();
};

/**
 * Adds/updates/removes a sound
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated sound or null if removed
 */
SoundHandler.prototype._update = function (ref, config, options) {
	if (!_AudioContext.AudioContextjs.isSupported()) {
		return _PromiseUtils.PromiseUtils.resolve();
	}
	var that = this;
	return _ConfigHandler.ConfigHandler.prototype._update.call(this, ref, config, options).then(function (sound) {
		if (!sound) {
			return;
		}
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
						return _PromiseUtils.PromiseUtils.createPromise(function (resolve) {
							_AudioContext.AudioContextjs.getContext().decodeAudioData(buffer, function (audioBuffer) {
								resolve(audioBuffer);
							}, function () /*err*/{
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
exports.SoundHandler = mod_SoundHandler;