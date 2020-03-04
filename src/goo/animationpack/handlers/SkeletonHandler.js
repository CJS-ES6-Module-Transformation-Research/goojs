import { ConfigHandler as ConfigHandlerjs } from "../../loaders/handlers/ConfigHandler";
import { Joint as Jointjs } from "../../animationpack/Joint";
import { Skeleton as Skeletonjs } from "../../animationpack/Skeleton";
import { SkeletonPose as SkeletonPosejs } from "../../animationpack/SkeletonPose";
import { PromiseUtils as PromiseUtilsjs } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtilsjs } from "../../util/ObjectUtils";
function SkeletonHandler() {
	ConfigHandlerjs.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(ConfigHandlerjs.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
ConfigHandlerjs._registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new Skeletonjs('', []);
	var pose = new SkeletonPosejs(skeleton);
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
	return ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return PromiseUtilsjs.resolve();
		}
		var joints = [];
		ObjectUtilsjs.forEach(config.joints, function (jointConfig) {
			var joint = new Jointjs(jointConfig.name);
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

		return PromiseUtilsjs.resolve(pose);
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
