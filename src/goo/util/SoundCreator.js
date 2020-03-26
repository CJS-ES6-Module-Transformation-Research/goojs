import { SoundHandler as loadershandlersSoundHandler_SoundHandlerjs } from "../loaders/handlers/SoundHandler";
import { AudioContextjs as soundAudioContext_AudioContextjsjs } from "../sound/AudioContext";
import { Ajax as utilAjax_Ajaxjs } from "../util/Ajax";
import { StringUtils as utilStringUtils_StringUtilsjs } from "../util/StringUtils";
import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../util/PromiseUtils";
function SoundCreator() {
	var ajax = this.ajax = new utilAjax_Ajaxjs();

	this.soundHandler = new loadershandlersSoundHandler_SoundHandlerjs(
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
	if (!soundAudioContext_AudioContextjsjs.isSupported()) {
		return utilPromiseUtils_PromiseUtilsjs.reject(new Error('AudioContext is not supported!'));
	}

	var id = utilStringUtils_StringUtilsjs.createUniqueId('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = utilStringUtils_StringUtilsjs.getAfterLast(url, '.');
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
