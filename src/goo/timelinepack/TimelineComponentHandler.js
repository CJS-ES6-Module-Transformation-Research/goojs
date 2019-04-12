Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TimelineComponentHandler;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _TimelineComponent = require("../timelinepack/TimelineComponent");

var _TimelineComponent2 = _interopRequireDefault(_TimelineComponent);

var _ValueChannel = require("../timelinepack/ValueChannel");

var _ValueChannel2 = _interopRequireDefault(_ValueChannel);

var _EventChannel = require("../timelinepack/EventChannel");

var _EventChannel2 = _interopRequireDefault(_EventChannel);

var _ArrayUtils = require("../util/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _SystemBus = require("../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _Easing = require("../util/Easing");

var _Easing2 = _interopRequireDefault(_Easing);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @hidden
 */
function TimelineComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'TimelineComponent';
}

TimelineComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
TimelineComponentHandler.prototype.constructor = TimelineComponentHandler;
_ComponentHandler2.default._registerClass('timeline', TimelineComponentHandler);

TimelineComponentHandler.prototype._prepare = function () /*config*/{};

TimelineComponentHandler.prototype._create = function () {
	var component = new _TimelineComponent2.default();
	return component;
};

TimelineComponentHandler.tweenMap = {
	translationX: _ValueChannel2.default.getSimpleTransformTweener.bind(null, 'translation', 'x'),
	translationY: _ValueChannel2.default.getSimpleTransformTweener.bind(null, 'translation', 'y'),
	translationZ: _ValueChannel2.default.getSimpleTransformTweener.bind(null, 'translation', 'z'),
	scaleX: _ValueChannel2.default.getSimpleTransformTweener.bind(null, 'scale', 'x'),
	scaleY: _ValueChannel2.default.getSimpleTransformTweener.bind(null, 'scale', 'y'),
	scaleZ: _ValueChannel2.default.getSimpleTransformTweener.bind(null, 'scale', 'z'),
	rotationX: _ValueChannel2.default.getRotationTweener.bind(null, 0),
	rotationY: _ValueChannel2.default.getRotationTweener.bind(null, 1),
	rotationZ: _ValueChannel2.default.getRotationTweener.bind(null, 2)
};

function getEasingFunction(easingString) {
	if (!easingString) {
		return _Easing2.default.Linear.None;
	}
	var separator = easingString.indexOf('.');
	var easingType = easingString.substr(0, separator);
	var easingDirection = easingString.substr(separator + 1);
	return _Easing2.default[easingType][easingDirection];
}

function updateValueChannelKeyframe(keyframeConfig, keyframeId, channel) {
	var needsResorting = false;

	var keyframe = _ArrayUtils2.default.find(channel.keyframes, function (keyframe) {
		return keyframe.id === keyframeId;
	});

	var easingFunction = getEasingFunction(keyframeConfig.easing);

	// create a new keyframe if it does not exist already or update it if it exists
	if (!keyframe) {
		channel.addKeyframe(keyframeId, keyframeConfig.time, keyframeConfig.value, easingFunction);
	} else {
		// the time of one keyframe changed so we're not certain anymore that they're sorted
		if (keyframe.time !== +keyframeConfig.time) {
			needsResorting = true;
		}
		keyframe.time = +keyframeConfig.time;
		keyframe.value = +keyframeConfig.value;
		keyframe.easingFunction = easingFunction;
	}

	return {
		needsResorting: needsResorting
	};
}

function updateEventChannelKeyFrame(keyframeConfig, keyframeId, channel, channelConfig) {
	var needsResorting = false;

	var callbackEntry = _ArrayUtils2.default.find(channel.keyframes, function (callbackEntry) {
		return callbackEntry.id === keyframeId;
	});

	// create the event emitter callback, we're gonna use it anyway
	var eventEmitter = function eventEmitter() {
		_SystemBus2.default.emit(channelConfig.eventName, keyframeConfig.value);
	};

	// create a new callback entry in the callback agenda if it does not exist already or update it if it exists
	if (!callbackEntry) {
		channel.addCallback(keyframeId, keyframeConfig.time, eventEmitter);
	} else {
		// the time of one keyframe changed so we're not certain anymore that they're sorted
		if (callbackEntry.time !== +keyframeConfig.time) {
			needsResorting = true;
		}
		callbackEntry.time = +keyframeConfig.time;
		callbackEntry.callback = eventEmitter;
	}

	return {
		needsResorting: needsResorting
	};
}

function updateChannel(channelConfig, channelId, component, entityResolver, rotationMap) {
	// search for existing one
	var channel = _ArrayUtils2.default.find(component.channels, function (channel) {
		return channel.id === channelId;
	});

	// and create one if needed
	if (!channel) {
		var key = channelConfig.propertyKey;
		if (key) {
			var entityId = channelConfig.entityId;
			if (entityId && !rotationMap[entityId]) {
				rotationMap[entityId] = [0, 0, 0];
			}
			var updateCallback = TimelineComponentHandler.tweenMap[key](entityId, entityResolver, rotationMap[entityId]);

			channel = new _ValueChannel2.default(channelId, {
				callbackUpdate: updateCallback
			});
		} else {
			channel = new _EventChannel2.default(channelId);
		}
		component.channels.push(channel);
	} else if (channelConfig.entityId && channel.callbackUpdate && channel.callbackUpdate.rotation) {
		var rotation = rotationMap[channelConfig.entityId] = channel.callbackUpdate.rotation;
		rotation[0] = 0;
		rotation[1] = 0;
		rotation[2] = 0;
	}

	channel.enabled = channelConfig.enabled !== false;

	// remove existing keyframes in the channel that are not mentioned in the config anymore
	// filter preserves the order, otherwise the channel would fail to work
	// the keyframes need always be sorted by their time property
	channel.keyframes = channel.keyframes.filter(function (keyframe) {
		return !!channelConfig.keyframes[keyframe.id];
	});

	var needsResorting = false;

	if (channelConfig.propertyKey) {
		for (var keyframeId in channelConfig.keyframes) {
			var keyframeConfig = channelConfig.keyframes[keyframeId];
			var updateResult = updateValueChannelKeyframe(keyframeConfig, keyframeId, channel, channelConfig);
			needsResorting = needsResorting || updateResult.needsResorting;
		}
	} else {
		for (var keyframeId in channelConfig.keyframes) {
			var keyframeConfig = channelConfig.keyframes[keyframeId];
			var updateResult = updateEventChannelKeyFrame(keyframeConfig, keyframeId, channel, channelConfig);
			needsResorting = needsResorting || updateResult.needsResorting;
		}
	}

	// !AT: if time was changed for any keyframe then the whole channel might not work as expected
	// could make this even faster but let's not go that far
	if (needsResorting) {
		channel.sort();
	}
}

TimelineComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;
	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		if (!isNaN(config.duration)) {
			component.duration = +config.duration;
		}
		component.loop = config.loop.enabled === true;

		component.autoStart = config.autoStart !== undefined ? config.autoStart : true;
		if (component.autoStart) {
			component.start();
		} else {
			component.stop();
		}

		// remove existing channels in the component that are not mentioned in the config anymore
		component.channels = component.channels.filter(function (channel) {
			return !!config.channels[channel.id];
		});

		var entityResolver = function entityResolver(entityId) {
			return that.world.entityManager.getEntityById(entityId);
		};
		var rotationMap = {};

		_ObjectUtils2.default.forEach(config.channels, function (channelConfig) {
			updateChannel(channelConfig, channelConfig.id, component, entityResolver, rotationMap);
		}, null, 'sortValue');

		return component;
	});
};
module.exports = exports.default;
