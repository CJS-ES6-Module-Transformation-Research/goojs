import { ConfigHandler as ConfigHandlerjs } from "../../loaders/handlers/ConfigHandler";
import { SteadyState as SteadyStatejs } from "../../animationpack/state/SteadyState";
import { ClipSource as ClipSourcejs } from "../../animationpack/blendtree/ClipSource";
import { ManagedTransformSource as ManagedTransformSourcejs } from "../../animationpack/blendtree/ManagedTransformSource";
import { BinaryLerpSource as BinaryLerpSourcejs } from "../../animationpack/blendtree/BinaryLerpSource";
import { FrozenClipSource as FrozenClipSourcejs } from "../../animationpack/blendtree/FrozenClipSource";
import { rsvpjs as rsvp_rsvpjsjs } from "../../util/rsvp";
import { PromiseUtils as PromiseUtilsjs } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtilsjs } from "../../util/ObjectUtils";
function AnimationStateHandler() {
	ConfigHandlerjs.apply(this, arguments);
}
AnimationStateHandler.prototype = Object.create(ConfigHandlerjs.prototype);
AnimationStateHandler.prototype.constructor = AnimationStateHandler;
ConfigHandlerjs._registerClass('animstate', AnimationStateHandler);

/**
 * Creates an empty animation state
 * @param {string} ref
 * @returns {SteadyState}
 * @private
 */
AnimationStateHandler.prototype._create = function (ref) {
	var steadyState = new SteadyStatejs();
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
	return ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (state) {
		if (!state) { return; }
		state._name = config.name;
		state.id = config.id;
		state._transitions = ObjectUtilsjs.deepClone(config.transitions);

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
				if (clipSource && (clipSource instanceof ClipSourcejs)) {
					clipSource._clip = clip;
					clipSource.setFilter(cfg.filter, cfg.channels);
				} else {
					clipSource = new ClipSourcejs(clip, cfg.filter, cfg.channels);
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
			if (!clipSource || !(clipSource instanceof ManagedTransformSourcejs)) {
				clipSource = new ManagedTransformSourcejs();
			}
			if (cfg.clipRef) {
				return this.loadObject(cfg.clipRef, options).then(function (clip) {
					clipSource.initFromClip(clip, cfg.filter, cfg.channels);
					return clipSource;
				});
			} else {
				return PromiseUtilsjs.resolve(clipSource);
			}
		case 'Lerp':
			// TODO reuse object like the other parsers
			var promises = [
				this._parseClipSource(cfg.clipSourceA, null, options),
				this._parseClipSource(cfg.clipSourceB, null, options)
			];
			return rsvp_rsvpjsjs.all(promises).then(function (clipSources) {
				clipSource = new BinaryLerpSourcejs(clipSources[0], clipSources[1]);
				if (cfg.blendWeight) {
					clipSource.blendWeight = cfg.blendWeight;
				}
				return clipSource;
			});
		case 'Frozen':
			return this._parseClipSource(cfg.clipSource).then(function (subClipSource) {
				if (!clipSource || !(clipSource instanceof FrozenClipSourcejs)) {
					clipSource = new FrozenClipSourcejs(subClipSource, cfg.frozenTime || 0.0);
				} else {
					clipSource._source = subClipSource;
					clipSource._time = cfg.frozenTime || 0.0;
				}
				return clipSource;
			});
		default:
			console.error('Unable to parse clip source');
			return PromiseUtilsjs.resolve();
	}
};

var exported_AnimationStateHandler = AnimationStateHandler;

/**
 * Handler for loading animation states into engine
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @extends ConfigHandler
 * @private
 */
export { exported_AnimationStateHandler as AnimationStateHandler };