import { SoundHandler as SoundHandlerjs } from "../loaders/handlers/SoundHandler";
import { AudioContextjs as AudioContext_AudioContextjsjs } from "../sound/AudioContext";
import { Ajax as Ajax_Ajaxjs } from "../util/Ajax";

import {
    createUniqueId as StringUtilsjs_createUniqueId,
    getAfterLast as StringUtilsjs_getAfterLast,
} from "../util/StringUtils";

import { reject as PromiseUtilsjs_reject } from "../util/PromiseUtils";
function SoundCreator() {
	var ajax = this.ajax = new Ajax_Ajaxjs();

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
		return PromiseUtilsjs_reject(new Error('AudioContext is not supported!'));
	}

	var id = StringUtilsjs_createUniqueId('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = StringUtilsjs_getAfterLast(url, '.');
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
