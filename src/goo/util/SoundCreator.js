Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundCreator = undefined;

var _SoundHandler = require("../loaders/handlers/SoundHandler");

var _AudioContext = require("../sound/AudioContext");

var _Ajax = require("../util/Ajax");

var _StringUtils = require("../util/StringUtils");

var _PromiseUtils = require("../util/PromiseUtils");

function SoundCreator() {
	var ajax = this.ajax = new _Ajax.Ajax();

	this.soundHandler = new _SoundHandler.SoundHandler({}, function (ref, options) {
		return ajax.load(ref, options ? options.noCache : false);
	}, function () {}, function (ref, options) {
		return ajax.load(ref, options ? options.noCache : false);
	});
}

/**
 * Releases any references to cached objects
 */
SoundCreator.prototype.clear = function () {
	this.ajax.clear();
	this.soundHandler.clear();
};

/**
 * Load a sound.
 * @param  {string}   url
 * @param  {Object}   settings
 * @returns {RSVP.Promise}
 */
SoundCreator.prototype.loadSound = function (url, settings) {
	if (!_AudioContext.AudioContextjs.isSupported()) {
		return (0, _PromiseUtils.reject)(new Error('AudioContext is not supported!'));
	}

	var id = (0, _StringUtils.createUniqueId)('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = (0, _StringUtils.getAfterLast)(url, '.');
	settings.audioRefs[fileExtension] = url;

	var sound = this.soundHandler._create();
	this.soundHandler._objects.set(id, sound);

	return this.soundHandler.update(id, settings, {});
};

var exported_SoundCreator = SoundCreator;

/**
 * Provides a simple way to load sounds
 */
exports.SoundCreator = exported_SoundCreator;
