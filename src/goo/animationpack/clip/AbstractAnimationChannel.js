var AbstractAnimationChannel_AbstractAnimationChannel = AbstractAnimationChannel;
import { scurve3 as MathUtilsjs_scurve3, scurve5 as MathUtilsjs_scurve5 } from "../../math/MathUtils";
var AbstractAnimationChannel_BLENDTYPES;
function AbstractAnimationChannel(channelName, times, blendType) {
	this._blendType = blendType || AbstractAnimationChannel_BLENDTYPES.LINEAR;
	this._channelName = channelName;

	if ((times instanceof Array || times instanceof Float32Array) && times.length) {
		this._times = new Float32Array(times);
	} else {
		this._times = [];
	}

	this._lastStartFrame = 0;
}

AbstractAnimationChannel_BLENDTYPES = {};;
AbstractAnimationChannel_BLENDTYPES.LINEAR = 'Linear';
AbstractAnimationChannel_BLENDTYPES.CUBIC = 'SCurve3';
AbstractAnimationChannel_BLENDTYPES.QUINTIC = 'SCurve5';

/*
 * @returns {number} number of samples
 */
AbstractAnimationChannel.prototype.getSampleCount = function () {
	return this._times.length;
};

/*
 * @returns {number} The last time sample of the animation channel
 */
AbstractAnimationChannel.prototype.getMaxTime = function () {
	return this._times.length ? this._times[this._times.length - 1] : 0;
};

/*
 * Calculates which samples to use for extracting animation state, then applies the animation state to supplied data item.
 * @param {number} clockTime
 * @param {(TransformData|TriggerData|number[])} applyTo
 */
AbstractAnimationChannel.prototype.updateSample = function (clockTime, applyTo) {
	var timeCount = this._times.length;

	if (!(timeCount)) {
		return;
	}
	// figure out what frames we are between and by how much
	var lastFrame = timeCount - 1;
	if (clockTime < 0 || timeCount === 1) {
		this.setCurrentSample(0, 0.0, applyTo);
	} else if (clockTime >= this._times[lastFrame]) {
		this.setCurrentSample(lastFrame, 0.0, applyTo);
	} else {
		var startFrame = 0;
		if (clockTime >= this._times[this._lastStartFrame]) {
			startFrame = this._lastStartFrame;
			for (var i = this._lastStartFrame; i < timeCount - 1; i++) {
				if (this._times[i] >= clockTime) {
					break;
				}
				startFrame = i;
			}
		} else {
			for (var i = 0; i < this._lastStartFrame; i++) {
				if (this._times[i] >= clockTime) {
					break;
				}
				startFrame = i;
			}
		}
		var progressPercent = (clockTime - this._times[startFrame]) / (this._times[startFrame + 1] - this._times[startFrame]);

		switch (this._blendType) {
			case AbstractAnimationChannel_BLENDTYPES.CUBIC:
				progressPercent = MathUtilsjs_scurve3(progressPercent);
				break;
			case AbstractAnimationChannel_BLENDTYPES.QUINTIC:
				progressPercent = MathUtilsjs_scurve5(progressPercent);
				break;
			default:
		}

		this.setCurrentSample(startFrame, progressPercent, applyTo);

		this._lastStartFrame = startFrame;
	}
};

export { AbstractAnimationChannel };