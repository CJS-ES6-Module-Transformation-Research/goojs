Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundCreator = undefined;

var _SoundHandler = require("../loaders/handlers/SoundHandler");

var _AudioContext = require("../sound/AudioContext");

var AudioContext = _interopRequireWildcard(_AudioContext);

var _Ajax = require("../util/Ajax");

var _StringUtils = require("../util/StringUtils");

var StringUtils = _interopRequireWildcard(_StringUtils);

var _PromiseUtils = require("../util/PromiseUtils");

var PromiseUtils = _interopRequireWildcard(_PromiseUtils);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_SoundCreator = SoundCreator;
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

/**
 * Provides a simple way to load sounds
 */
exports.SoundCreator = exported_SoundCreator;
