Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SoundCreator;

var _SoundHandler = require("../loaders/handlers/SoundHandler");

var _SoundHandler2 = _interopRequireDefault(_SoundHandler);

var _AudioContext = require("../sound/AudioContext");

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _Ajax = require("../util/Ajax");

var _Ajax2 = _interopRequireDefault(_Ajax);

var _StringUtils = require("../util/StringUtils");

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _PromiseUtils = require("../util/PromiseUtils");

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Provides a simple way to load sounds
 */
function SoundCreator() {
	var ajax = this.ajax = new _Ajax2.default();

	this.soundHandler = new _SoundHandler2.default({}, function (ref, options) {
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
	if (!_AudioContext2.default.isSupported()) {
		return _PromiseUtils2.default.reject(new Error('AudioContext is not supported!'));
	}

	var id = _StringUtils2.default.createUniqueId('sound');
	settings = settings || {};
	settings.audioRefs = {};

	var fileExtension = _StringUtils2.default.getAfterLast(url, '.');
	settings.audioRefs[fileExtension] = url;

	var sound = this.soundHandler._create();
	this.soundHandler._objects.set(id, sound);

	return this.soundHandler.update(id, settings, {});
};
module.exports = exports.default;
