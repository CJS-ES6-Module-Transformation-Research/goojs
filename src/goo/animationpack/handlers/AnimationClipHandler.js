import { ConfigHandler as ConfigHandlerjs } from "../../loaders/handlers/ConfigHandler";
import { AnimationClip as AnimationClip_AnimationClipjs } from "../../animationpack/clip/AnimationClip";
import { JointChannel as JointChannel_JointChanneljs } from "../../animationpack/clip/JointChannel";
import { TransformChannel as TransformChanneljs } from "../../animationpack/clip/TransformChannel";
import {     InterpolatedFloatChannel as InterpolatedFloatChannel_InterpolatedFloatChanneljs, } from "../../animationpack/clip/InterpolatedFloatChannel";
import { TriggerChannel as TriggerChannel_TriggerChanneljs } from "../../animationpack/clip/TriggerChannel";
import { ArrayUtils as ArrayUtilsjs } from "../../util/ArrayUtils";
function AnimationClipHandler() {
	ConfigHandlerjs.apply(this, arguments);
}

AnimationClipHandler.prototype = Object.create(ConfigHandlerjs.prototype);
AnimationClipHandler.prototype.constructor = AnimationClipHandler;
ConfigHandlerjs._registerClass('clip', AnimationClipHandler);

/**
 * Creates an empty animation clip
 * @param {string} ref
 * @returns {AnimationClip}
 * @private
 */
AnimationClipHandler.prototype._create = function () {
	return new AnimationClip_AnimationClipjs();
};

/**
 * Adds/updates/removes an animation clip
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated animation clip or null if removed
 */
AnimationClipHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (clip) {
		if (!clip) { return clip; }
		return that.loadObject(config.binaryRef, options).then(function (bindata) {
			if (!bindata) {
				throw new Error('Binary clip data was empty');
			}
			return that._updateAnimationClip(config, bindata, clip);
		});
	});
};

/**
 * Does the actual updating of animation clip and channels
 * It creates new channels on every update, but clips are practically never updated
 * @param {Object} clipConfig
 * @param {ArrayBuffer} binData
 * @param {AnimationClip} clip
 * @private
 */
AnimationClipHandler.prototype._updateAnimationClip = function (clipConfig, bindata, clip) {
	clip._channels = [];

	if (clipConfig.channels) {
		var keys = Object.keys(clipConfig.channels);
		for (var i = 0; i < keys.length; i++) {
			var channelConfig = clipConfig.channels[keys[i]];
			// Time samples
			var times = ArrayUtilsjs.getTypedArray(bindata, channelConfig.times);

			var blendType = channelConfig.blendType;
			var type = channelConfig.type;

			var channel;
			switch (type) {
				case 'Joint':
				case 'Transform':
					// Transform samples
					var rots, trans, scales;
					rots = ArrayUtilsjs.getTypedArray(bindata, channelConfig.rotationSamples);
					trans = ArrayUtilsjs.getTypedArray(bindata, channelConfig.translationSamples);
					scales = ArrayUtilsjs.getTypedArray(bindata, channelConfig.scaleSamples);

					if (type === 'Joint') {
						channel = new JointChannel_JointChanneljs(
							channelConfig.jointIndex,
							channelConfig.name,
							times,
							rots,
							trans,
							scales,
							blendType
						);
					} else {
						channel = new TransformChanneljs(
							channelConfig.name,
							times,
							rots,
							trans,
							scales,
							blendType
						);
					}
					break;
				case 'FloatLERP':
					channel = new InterpolatedFloatChannel_InterpolatedFloatChanneljs(
						channelConfig.name,
						times,
						channelConfig.values,
						blendType
					);
					break;
				case 'Trigger':
					channel = new TriggerChannel_TriggerChanneljs(
						channelConfig.name,
						times,
						channelConfig.keys
					);
					channel.guarantee = !!channelConfig.guarantee;
					break;
				default:
					console.warn('Unhandled channel type: ' + channelConfig.type);
					continue;
			}
			clip.addChannel(channel);
		}
	}
	return clip;
};

var exported_AnimationClipHandler = AnimationClipHandler;

/**
 * Handler for loading animation clips into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { exported_AnimationClipHandler as AnimationClipHandler };
