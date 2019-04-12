Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SoundComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _SoundComponent = require("../../entities/components/SoundComponent");

var _SoundComponent2 = _interopRequireDefault(_SoundComponent);

var _AudioContext = require("../../sound/AudioContext");

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _PromiseUtils = require("../../util/PromiseUtils");

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of sound components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function SoundComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'SoundComponent';
}

SoundComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
SoundComponentHandler.prototype.constructor = SoundComponentHandler;
_ComponentHandler2.default._registerClass('sound', SoundComponentHandler);

/**
 * Removes the souncomponent and stops all connected sounds
 * @param {Entity} entity
 * @private
 */
SoundComponentHandler.prototype._remove = function (entity) {
	var component = entity.soundComponent;
	if (component && component.sounds) {
		var sounds = component.sounds;
		for (var i = 0; i < sounds.length; i++) {
			sounds[i].stop();
		}
	}
};

/**
 * Prepares the config
 * @param {Object} config
 */
SoundComponentHandler.prototype._prepare = function (config) {
	_ObjectUtils2.default.defaults(config, {
		volume: 1.0,
		reverb: 0.0
	});
};

/**
 * Creates sound component
 * @returns {SoundComponent} Should be soundcomponent
 * @private
 */
SoundComponentHandler.prototype._create = function () {
	return new _SoundComponent2.default();
};

/**
 * Update engine sound component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
SoundComponentHandler.prototype.update = function (entity, config, options) {
	if (!_AudioContext2.default.isSupported()) {
		return _PromiseUtils2.default.resolve(); //! AT: we're not really using reject
	}

	var that = this;
	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}
		component.updateConfig(config);

		// Remove old sounds
		for (var i = 0; i < component.sounds.length; i++) {
			var sound = component.sounds[i];
			if (!config.sounds[sound.id]) {
				component.removeSound(sound);
			}
		}

		var promises = [];
		// Load all sounds
		_ObjectUtils2.default.forEach(config.sounds, function (soundCfg) {
			promises.push(that._load(soundCfg.soundRef, options));
		}, null, 'sortValue');

		return _rsvp2.default.all(promises).then(function (sounds) {
			// Add new sounds
			for (var i = 0; i < sounds.length; i++) {
				if (component.sounds.indexOf(sounds[i]) === -1) {
					component.addSound(sounds[i]);
				}
			}
			return component;
		});
	});
};
module.exports = exports.default;
