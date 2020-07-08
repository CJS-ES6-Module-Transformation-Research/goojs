var SkeletonHandler_SkeletonHandler = SkeletonHandler;

import {
    ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { Joint as animationpackJoint_Jointjs } from "../../animationpack/Joint";
import { Skeleton as animationpackSkeleton_Skeletonjs } from "../../animationpack/Skeleton";
import { SkeletonPose as animationpackSkeletonPose_SkeletonPosejs } from "../../animationpack/SkeletonPose";
import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function SkeletonHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
ConfigHandlerjs__registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new animationpackSkeleton_Skeletonjs('', []);
	var pose = new animationpackSkeletonPose_SkeletonPosejs(skeleton);
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
	return loadershandlersConfigHandler_ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return utilPromiseUtils_PromiseUtilsjs.resolve();
		}
		var joints = [];
		utilObjectUtils_ObjectUtilsjs.forEach(config.joints, function (jointConfig) {
			var joint = new animationpackJoint_Jointjs(jointConfig.name);
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

		return utilPromiseUtils_PromiseUtilsjs.resolve(pose);
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
export { SkeletonHandler_SkeletonHandler as SkeletonHandler };
