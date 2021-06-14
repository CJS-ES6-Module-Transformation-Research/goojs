var mod_SoundCreator = SoundCreator;
import { SoundHandler as SoundHandler_SoundHandler } from "../loaders/handlers/SoundHandler";
import { AudioContextjs as AudioContext } from "../sound/AudioContext";
import { Ajax as Ajax_Ajax } from "../util/Ajax";
import { StringUtils as StringUtils_StringUtils } from "../util/StringUtils";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../util/PromiseUtils";

/**
 * Provides a simple way to load sounds
 */
function SoundCreator() {
	var ajax = this.ajax = new Ajax_Ajax();

	this.soundHandler = new SoundHandler_SoundHandler(
		{},
		function (ref, options) {
			return ajax.load(ref, options ? options.noCache : false);
		},
		function () {},
		function (ref, options) {
			return ajax.load(ref, options ? options.noCache : false);
		}
	);
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
	if (!AudioContext.isSupported()) {
		return PromiseUtils_PromiseUtils.reject(new Error('AudioContext is not supported!'));
	}

	var id = StringUtils_StringUtils.createUniqueId('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = StringUtils_StringUtils.getAfterLast(url, '.');
	settings.audioRefs[fileExtension] = url;

	var sound = this.soundHandler._create();
	this.soundHandler._objects.set(id, sound);

	return this.soundHandler.update(id, settings, {});
};

/**
 * Provides a simple way to load sounds
 */
export { mod_SoundCreator as SoundCreator };
