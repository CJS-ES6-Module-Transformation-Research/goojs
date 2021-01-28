var mod_SkeletonHandler = SkeletonHandler;
import { ConfigHandler as ConfigHandler_ConfigHandler } from "../../loaders/handlers/ConfigHandler";
import { Joint as Joint_Joint } from "../../animationpack/Joint";
import { Skeleton as Skeleton_Skeleton } from "../../animationpack/Skeleton";
import { SkeletonPose as SkeletonPose_SkeletonPose } from "../../animationpack/SkeletonPose";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * Handler for loading skeletons into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function SkeletonHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
ConfigHandler_ConfigHandler._registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new Skeleton_Skeleton('', []);
	var pose = new SkeletonPose_SkeletonPose(skeleton);
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
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return PromiseUtils_PromiseUtils.resolve();
		}
		var joints = [];
		ObjectUtils_ObjectUtils.forEach(config.joints, function (jointConfig) {
			var joint = new Joint_Joint(jointConfig.name);
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

		return PromiseUtils_PromiseUtils.resolve(pose);
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
export { mod_SkeletonHandler as SkeletonHandler };
