"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SkeletonHandler = undefined;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _Joint = require("../../animationpack/Joint");

var _Skeleton = require("../../animationpack/Skeleton");

var _SkeletonPose = require("../../animationpack/SkeletonPose");

var _PromiseUtils = require("../../util/PromiseUtils");

var _ObjectUtils = require("../../util/ObjectUtils");

var mod_SkeletonHandler = SkeletonHandler;

/**
 * Handler for loading skeletons into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function SkeletonHandler() {
	_ConfigHandler.ConfigHandler.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(_ConfigHandler.ConfigHandler.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
_ConfigHandler.ConfigHandler._registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new _Skeleton.Skeleton('', []);
	var pose = new _SkeletonPose.SkeletonPose(skeleton);
	return pose;
};

/**
 * Adds/updates/removes a skeleton. A Skeleton is created once and then reused, but skeletons
 * are rarely updated.
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated entity or null if removed
 */
SkeletonHandler.prototype._update = function (ref, config, options) {
	return _ConfigHandler.ConfigHandler.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return _PromiseUtils.PromiseUtils.resolve();
		}
		var joints = [];
		_ObjectUtils.ObjectUtils.forEach(config.joints, function (jointConfig) {
			var joint = new _Joint.Joint(jointConfig.name);
			joint._index = jointConfig.index;
			joint._parentIndex = jointConfig.parentIndex;
			joint._inverseBindPose.matrix.data.set(jointConfig.inverseBindPose);

			joints.push(joint);
		}, null, 'index');

		pose.id = config.id;
		pose._skeleton._name = config.name;
		pose._skeleton._joints = joints;
		pose.allocateTransforms();
		pose.setToBindPose();

		return _PromiseUtils.PromiseUtils.resolve(pose);
	});
};

/**
 * Handler for loading skeletons into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
exports.SkeletonHandler = mod_SkeletonHandler;