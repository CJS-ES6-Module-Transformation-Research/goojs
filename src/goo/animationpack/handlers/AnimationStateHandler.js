var mod_AnimationStateHandler = AnimationStateHandler;

import {
    ConfigHandler as ConfigHandler_ConfigHandler,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { SteadyState as SteadyState_SteadyState } from "../../animationpack/state/SteadyState";
import { ClipSource as ClipSource_ClipSource } from "../../animationpack/blendtree/ClipSource";
import { ManagedTransformSource as ManagedTransformSource_ManagedTransformSource } from "../../animationpack/blendtree/ManagedTransformSource";
import { BinaryLerpSource as BinaryLerpSource_BinaryLerpSource } from "../../animationpack/blendtree/BinaryLerpSource";
import { FrozenClipSource as FrozenClipSource_FrozenClipSource } from "../../animationpack/blendtree/FrozenClipSource";
import { rsvpjs as RSVP } from "../../util/rsvp";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * Handler for loading animation states into engine
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @extends ConfigHandler
 * @private
 */
function AnimationStateHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
}
AnimationStateHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
AnimationStateHandler.prototype.constructor = AnimationStateHandler;
ConfigHandlerjs__registerClass('animstate', AnimationStateHandler);

/**
 * Creates an empty animation state
 * @param {string} ref
 * @returns {SteadyState}
 * @private
 */
AnimationStateHandler.prototype._create = function (ref) {
	var steadyState = new SteadyState_SteadyState();
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
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (state) {
		if (!state) { return; }
		state._name = config.name;
		state.id = config.id;
		state._transitions = ObjectUtils_ObjectUtils.deepClone(config.transitions);

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
				if (clipSource && (clipSource instanceof ClipSource_ClipSource)) {
					clipSource._clip = clip;
					clipSource.setFilter(cfg.filter, cfg.channels);
				} else {
					clipSource = new ClipSource_ClipSource(clip, cfg.filter, cfg.channels);
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
						if (time < minTime) { minTime = time; }
					}
				}
				clipSource._startTime = Math.max(clipSource._startTime, minTime);

				return clipSource;
			});
		case 'Managed':
			if (!clipSource || !(clipSource instanceof ManagedTransformSource_ManagedTransformSource)) {
				clipSource = new ManagedTransformSource_ManagedTransformSource();
			}
			if (cfg.clipRef) {
				return this.loadObject(cfg.clipRef, options).then(function (clip) {
					clipSource.initFromClip(clip, cfg.filter, cfg.channels);
					return clipSource;
				});
			} else {
				return PromiseUtils_PromiseUtils.resolve(clipSource);
			}
		case 'Lerp':
			// TODO reuse object like the other parsers
			var promises = [
				this._parseClipSource(cfg.clipSourceA, null, options),
				this._parseClipSource(cfg.clipSourceB, null, options)
			];
			return RSVP.all(promises).then(function (clipSources) {
				clipSource = new BinaryLerpSource_BinaryLerpSource(clipSources[0], clipSources[1]);
				if (cfg.blendWeight) {
					clipSource.blendWeight = cfg.blendWeight;
				}
				return clipSource;
			});
		case 'Frozen':
			return this._parseClipSource(cfg.clipSource).then(function (subClipSource) {
				if (!clipSource || !(clipSource instanceof FrozenClipSource_FrozenClipSource)) {
					clipSource = new FrozenClipSource_FrozenClipSource(subClipSource, cfg.frozenTime || 0.0);
				} else {
					clipSource._source = subClipSource;
					clipSource._time = cfg.frozenTime || 0.0;
				}
				return clipSource;
			});
		default:
			console.error('Unable to parse clip source');
			return PromiseUtils_PromiseUtils.resolve();
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
export { mod_AnimationStateHandler as AnimationStateHandler };