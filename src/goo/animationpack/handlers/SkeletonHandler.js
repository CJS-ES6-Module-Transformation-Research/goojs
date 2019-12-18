import { ConfigHandler } from "../../loaders/handlers/ConfigHandler";
import { Joint } from "../../animationpack/Joint";
import { Skeleton } from "../../animationpack/Skeleton";
import { SkeletonPose } from "../../animationpack/SkeletonPose";
import * as PromiseUtils from "../../util/PromiseUtils";
import * as ObjectUtils from "../../util/ObjectUtils";
var exported_SkeletonHandler = SkeletonHandler;
function SkeletonHandler() {
	ConfigHandler.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(ConfigHandler.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
ConfigHandler._registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new Skeleton('', []);
	var pose = new SkeletonPose(skeleton);
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
	return ConfigHandler.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return PromiseUtils.resolve();
		}
		var joints = [];
		ObjectUtils.forEach(config.joints, function (jointConfig) {
			var joint = new Joint(jointConfig.name);
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

		return PromiseUtils.resolve(pose);
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
export { exported_SkeletonHandler as SkeletonHandler };
