Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ManagedTransformSource;

var _TransformData = require("../../animationpack/clip/TransformData");

var _TransformData2 = _interopRequireDefault(_TransformData);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _Quaternion = require("../../math/Quaternion");

var _Quaternion2 = _interopRequireDefault(_Quaternion);

var _Source = require("../../animationpack/blendtree/Source");

var _Source2 = _interopRequireDefault(_Source);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * This tree source maintains its own source data, which can be modified directly using instance functions. This source is meant to be used for
 *        controlling a particular joint or set of joints programatically.
 * @param {string} [sourceName] Name of source we were initialized from, if given.
 * @extends Source
 */
function ManagedTransformSource(sourceName) {
	_Source2.default.call(this);
	this._sourceName = sourceName ? sourceName : null;
	this._data = {};
}

ManagedTransformSource.prototype = Object.create(_Source2.default.prototype);
ManagedTransformSource.prototype.constructor = ManagedTransformSource;

/**
 * Sets a translation to the local transformdata for a given channelName. The channel has to be an instance of {@link TransformChannel}
 * @param {string} channelName
 * @param {Vector3} translation the translation to set
 */
ManagedTransformSource.prototype.setTranslation = function (channelName, translation) {
	var channel = this._data[channelName];
	if (channel instanceof _TransformData2.default) {
		channel._translation.set(translation);
	}
};

/**
 * Gets the translation of the local transformdata for a given channelName. The channel has to be an instance of {@link TransformChannel}
 * @param {string} channelName
 * @param {Vector3} [store] to store the result in
 * @returns new Vector3 with result or store
 */
ManagedTransformSource.prototype.getTranslation = function (channelName, store) {
	var channel = this._data[channelName];
	if (channel instanceof _TransformData2.default) {
		store = store || new _Vector2.default();
		store.set(channel._translation);
	}
	return store;
};

/**
 * Sets a scale to the local transformdata for a given channelName. The channel has to be an instance of {@link TransformChannel}
 * @param {string} channelName
 * @param {Vector3} scale the scale to set
 */
ManagedTransformSource.prototype.setScale = function (channelName, scale) {
	var channel = this._data[channelName];
	if (channel instanceof _TransformData2.default) {
		channel._scale.set(scale);
	}
};

/**
 * Gets the scale from the local transformdata for a given channelName. The channel has to be an instance of {@link TransformChannel}
 * @param {string} channelName
 * @param {Vector3} [store] to store the result in
 * @returns {Vector3} new vector with result or store
 */
ManagedTransformSource.prototype.getScale = function (channelName, store) {
	var channel = this._data[channelName];
	if (channel instanceof _TransformData2.default) {
		store = store || new _Vector2.default();
		store.set(channel._scale);
	}
	return store;
};

/**
 * Sets a rotation to the local transformdata for a given channelName. The channel has to be an instance of {@link TransformChannel}
 * @param {string} channelName
 * @param {Quaternion} rotation the rotation to set
 */
ManagedTransformSource.prototype.setRotation = function (channelName, rotation) {
	var channel = this._data[channelName];
	if (channel instanceof _TransformData2.default) {
		channel._rotation.set(rotation);
	}
};

/**
 * Gets rotation from the local transformdata for a given channelName. The channel has to be an instance of {@link TransformChannel}
 * @param {string} channelName
 * @param {Quaternion} [store] to store the result in
 */
ManagedTransformSource.prototype.getRotation = function (channelName, store) {
	var channel = this._data[channelName];
	if (channel instanceof _TransformData2.default) {
		store = store || new _Quaternion2.default();
		store.set(channel._rotation);
	}
	return store;
};

/**
 * Setup transform data for specific joints on this source, using the first frame from a given clip.
 * @param {AnimationClip} clip the animation clip to pull data from
 * @param {Array<string>} jointIndices the indices of the joints to initialize data for.
 */
ManagedTransformSource.prototype.initFromClip = function (clip, filter, channelNames) {
	if (filter === 'Include' && channelNames && channelNames.length) {
		for (var i = 0, max = channelNames.length; i < max; i++) {
			var channelName = channelNames[i];
			var channel = clip.findChannelByName(channelName);
			if (channel) {
				var data = channel.getData(0);
				this._data[channelName] = data;
			} else {
				console.error('Channel not in clip: ' + channelName);
			}
		}
	} else {
		for (var i = 0, max = clip._channels.length; i < max; i++) {
			var channel = clip._channels[i];
			var channelName = channel._channelName;
			if (filter === 'Exclude' && channelNames && channelNames.length && channelNames.indexOf(channelName) > -1) {
				var data = channel.getData(0);
				this._data[channelName] = data;
			}
		}
	}
};

ManagedTransformSource.prototype.getChannelData = function (channelName) {
	return this._data[channelName];
};

/*
 * @returns a source data mapping for the channels in this clip source
 */
ManagedTransformSource.prototype.getSourceData = function () {
	return this._data;
};

/**
* @returns {ManagedTransformSource}
*/
ManagedTransformSource.prototype.clone = function () {
	var clonedData = {};
	for (var key in this._data) {
		clonedData[key] = this._data[key].clone();
	}

	return new ManagedTransformSource(this._sourceName, clonedData);
};
module.exports = exports.default;
