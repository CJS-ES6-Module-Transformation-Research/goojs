import { SoundHandler } from "../loaders/handlers/SoundHandler";
import { anonymus as AudioContext } from "../sound/AudioContext";
import { Ajax } from "../util/Ajax";
import * as StringUtils from "../util/StringUtils";
import * as PromiseUtils from "../util/PromiseUtils";
function SoundCreator() {
	var ajax = this.ajax = new Ajax();

	this.soundHandler = new SoundHandler(
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
		return PromiseUtils.reject(new Error('AudioContext is not supported!'));
	}

	var id = StringUtils.createUniqueId('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = StringUtils.getAfterLast(url, '.');
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
