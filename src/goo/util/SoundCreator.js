import { SoundHandler as SoundHandlerjs } from "../loaders/handlers/SoundHandler";
import { AudioContextjs as AudioContext_AudioContextjsjs } from "../sound/AudioContext";
import { Ajax as Ajaxjs } from "../util/Ajax";
import { StringUtils as StringUtilsjs } from "../util/StringUtils";
import { PromiseUtils as PromiseUtilsjs } from "../util/PromiseUtils";
function SoundCreator() {
	var ajax = this.ajax = new Ajaxjs();

	this.soundHandler = new SoundHandlerjs(
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
	if (!AudioContext_AudioContextjsjs.isSupported()) {
		return PromiseUtilsjs.reject(new Error('AudioContext is not supported!'));
	}

	var id = StringUtilsjs.createUniqueId('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = StringUtilsjs.getAfterLast(url, '.');
	settings.audioRefs[fileExtension] = url;

	var sound = this.soundHandler._create();
	this.soundHandler._objects.set(id, sound);

	return this.soundHandler.update(id, settings, {});
};

var exported_SoundCreator = SoundCreator;

/**
 * Provides a simple way to load sounds
 */
export { exported_SoundCreator as SoundCreator };
