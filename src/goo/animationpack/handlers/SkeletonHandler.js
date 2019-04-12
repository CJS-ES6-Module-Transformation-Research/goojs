Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SkeletonHandler;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _ConfigHandler2 = _interopRequireDefault(_ConfigHandler);

var _Joint = require("../../animationpack/Joint");

var _Joint2 = _interopRequireDefault(_Joint);

var _Skeleton = require("../../animationpack/Skeleton");

var _Skeleton2 = _interopRequireDefault(_Skeleton);

var _SkeletonPose = require("../../animationpack/SkeletonPose");

var _SkeletonPose2 = _interopRequireDefault(_SkeletonPose);

var _PromiseUtils = require("../../util/PromiseUtils");

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Handler for loading skeletons into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function SkeletonHandler() {
	_ConfigHandler2.default.apply(this, arguments);
}

SkeletonHandler.prototype = Object.create(_ConfigHandler2.default.prototype);
SkeletonHandler.prototype.constructor = SkeletonHandler;
_ConfigHandler2.default._registerClass('skeleton', SkeletonHandler);

SkeletonHandler.prototype._create = function () {
	var skeleton = new _Skeleton2.default('', []);
	var pose = new _SkeletonPose2.default(skeleton);
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
	return _ConfigHandler2.default.prototype._update.call(this, ref, config, options).then(function (pose) {
		if (!config) {
			return _PromiseUtils2.default.resolve();
		}
		var joints = [];
		_ObjectUtils2.default.forEach(config.joints, function (jointConfig) {
			var joint = new _Joint2.default(jointConfig.name);
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

		return _PromiseUtils2.default.resolve(pose);
	});
};
module.exports = exports.default;
