import { ConfigHandler as ConfigHandler_ConfigHandlerjs } from "../../loaders/handlers/ConfigHandler";
import { Joint as Joint_Jointjs } from "../../animationpack/Joint";
import { Skeleton as Skeleton_Skeletonjs } from "../../animationpack/Skeleton";
import { SkeletonPose as SkeletonPose_SkeletonPosejs } from "../../animationpack/SkeletonPose";
import { PromiseUtils as PromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function SkeletonHandler() {
	ConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(ConfigHandler_ConfigHandlerjs.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
ConfigHandler_ConfigHandlerjs._registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new Skeleton_Skeletonjs('', []);
	var pose = new SkeletonPose_SkeletonPosejs(skeleton);
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
	return ConfigHandler_ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return PromiseUtils_PromiseUtilsjs.resolve();
		}
		var joints = [];
		ObjectUtils_ObjectUtilsjs.forEach(config.joints, function (jointConfig) {
			var joint = new Joint_Jointjs(jointConfig.name);
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

		return PromiseUtils_PromiseUtilsjs.resolve(pose);
	});
};

var exported_SkeletonHandler = SkeletonHandler;

/**
 * Handler for loading skeletons into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { exported_SkeletonHandler as SkeletonHandler };
