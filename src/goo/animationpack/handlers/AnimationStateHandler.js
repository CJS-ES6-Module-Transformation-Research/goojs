"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AnimationStateHandler = undefined;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _SteadyState = require("../../animationpack/state/SteadyState");

var _ClipSource = require("../../animationpack/blendtree/ClipSource");

var _ManagedTransformSource = require("../../animationpack/blendtree/ManagedTransformSource");

var _BinaryLerpSource = require("../../animationpack/blendtree/BinaryLerpSource");

var _FrozenClipSource = require("../../animationpack/blendtree/FrozenClipSource");

var _rsvp = require("../../util/rsvp");

var _PromiseUtils = require("../../util/PromiseUtils");

var _ObjectUtils = require("../../util/ObjectUtils");

var AnimationStateHandler_AnimationStateHandler = AnimationStateHandler;

function AnimationStateHandler() {
	_ConfigHandler.ConfigHandler.apply(this, arguments);
}
AnimationStateHandler.prototype = Object.create(_ConfigHandler.ConfigHandler.prototype);
AnimationStateHandler.prototype.constructor = AnimationStateHandler;
_ConfigHandler.ConfigHandler._registerClass('animstate', AnimationStateHandler);

/**
 * Creates an empty animation state
 * @param {string} ref
 * @returns {SteadyState}
 * @private
 */
AnimationStateHandler.prototype._create = function (ref) {
	var steadyState = new _SteadyState.SteadyState();
	this._objects.set(ref, steadyState);
	return steadyState;
};

/**
 * Adds/updates/removes an animation state
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated animation state or null if removed
 */
AnimationStateHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return _ConfigHandler.ConfigHandler.prototype._update.call(this, ref, config, options).then(function (state) {
		if (!state) {
			return;
		}
		state._name = config.name;
		state.id = config.id;
		state._transitions = _ObjectUtils.ObjectUtils.deepClone(config.transitions);

		return that._parseClipSource(config.clipSource, state._sourceTree, options).then(function (source) {
			state._sourceTree = source;
			return state;
		});
	});
};

/**
 * Updates or creates clipSource to put on animation state
 * @param {Object} config
 * @param {ClipSource} [clipSource]
 * @returns {RSVP.Promise} resolved with updated clip source
 */
AnimationStateHandler.prototype._parseClipSource = function (cfg, clipSource, options) {
	switch (cfg.type) {
		case 'Clip':
			return this.loadObject(cfg.clipRef, options).then(function (clip) {
				if (clipSource && clipSource instanceof _ClipSource.ClipSource) {
					clipSource._clip = clip;
					clipSource.setFilter(cfg.filter, cfg.channels);
				} else {
					clipSource = new _ClipSource.ClipSource(clip, cfg.filter, cfg.channels);
				}

				if (cfg.loopCount !== undefined) {
					clipSource._clipInstance._loopCount = +cfg.loopCount;
				}

				if (cfg.timeScale !== undefined) {
					clipSource._clipInstance._timeScale = cfg.timeScale;
				}

				clipSource._startTime = cfg.startTime || 0;
				var minTime = Infinity;
				for (var i = 0; i < clip._channels.length; i++) {
					var channel = clip._channels[i];
					for (var j = 0; j < channel._times.length; j++) {
						var time = channel._times[j];
						if (time < minTime) {
							minTime = time;
						}
					}
				}
				clipSource._startTime = Math.max(clipSource._startTime, minTime);

				return clipSource;
			});
		case 'Managed':
			if (!clipSource || !(clipSource instanceof _ManagedTransformSource.ManagedTransformSource)) {
				clipSource = new _ManagedTransformSource.ManagedTransformSource();
			}
			if (cfg.clipRef) {
				return this.loadObject(cfg.clipRef, options).then(function (clip) {
					clipSource.initFromClip(clip, cfg.filter, cfg.channels);
					return clipSource;
				});
			} else {
				return _PromiseUtils.PromiseUtils.resolve(clipSource);
			}
		case 'Lerp':
			// TODO reuse object like the other parsers
			var promises = [this._parseClipSource(cfg.clipSourceA, null, options), this._parseClipSource(cfg.clipSourceB, null, options)];
			return _rsvp.rsvpjs.all(promises).then(function (clipSources) {
				clipSource = new _BinaryLerpSource.BinaryLerpSource(clipSources[0], clipSources[1]);
				if (cfg.blendWeight) {
					clipSource.blendWeight = cfg.blendWeight;
				}
				return clipSource;
			});
		case 'Frozen':
			return this._parseClipSource(cfg.clipSource).then(function (subClipSource) {
				if (!clipSource || !(clipSource instanceof _FrozenClipSource.FrozenClipSource)) {
					clipSource = new _FrozenClipSource.FrozenClipSource(subClipSource, cfg.frozenTime || 0.0);
				} else {
					clipSource._source = subClipSource;
					clipSource._time = cfg.frozenTime || 0.0;
				}
				return clipSource;
			});
		default:
			console.error('Unable to parse clip source');
			return _PromiseUtils.PromiseUtils.resolve();
	}
};

/**
 * Handler for loading animation states into engine
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @extends ConfigHandler
 * @private
 */
exports.AnimationStateHandler = AnimationStateHandler_AnimationStateHandler;