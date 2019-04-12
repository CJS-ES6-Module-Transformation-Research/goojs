Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MeshDataComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _MeshDataComponent = require("../../entities/components/MeshDataComponent");

var _MeshDataComponent2 = _interopRequireDefault(_MeshDataComponent);

var _BoundingBox = require("../../renderer/bounds/BoundingBox");

var _BoundingBox2 = _interopRequireDefault(_BoundingBox);

var _ShapeCreatorMemoized = require("../../util/ShapeCreatorMemoized");

var _ShapeCreatorMemoized2 = _interopRequireDefault(_ShapeCreatorMemoized);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _StringUtils = require("../../util/StringUtils");

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of meshdatacomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function MeshDataComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'MeshDataComponent';
}

MeshDataComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
MeshDataComponentHandler.prototype.constructor = MeshDataComponentHandler;
_ComponentHandler2.default._registerClass('meshData', MeshDataComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshDataComponentHandler.prototype._prepare = function (config) {
	return _ObjectUtils2.default.defaults(config, {});
};

/**
 * Create meshdata component.
 * @returns {MeshDataComponent} the created component object
 * @private
 */
MeshDataComponentHandler.prototype._create = function () {
	return new _MeshDataComponent2.default();
};

/**
 * Removes the meshdata component
 * @param {string} ref
 */
MeshDataComponentHandler.prototype._remove = function (entity) {
	//! AT: why is this check needed?
	if (entity.meshDataComponent && entity.meshDataComponent.meshData && this.world.gooRunner) {
		entity.meshDataComponent.meshData.destroy(this.world.gooRunner.renderer.context);
	}
	entity.clearComponent('MeshDataComponent');
};

/**
 * Update engine meshdatacomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
MeshDataComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;
	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		component.meshData = null;
		component.currentPose = null;

		if (config.shape) {
			var shapeCreator = _ShapeCreatorMemoized2.default['create' + _StringUtils2.default.capitalize(config.shape)];
			if (shapeCreator) {
				component.meshData = shapeCreator(config.shapeOptions, component.meshData);
				component.modelBoundDirty = true;
				return component;
			}
		} else if (config.meshRef) {
			var promises = [];
			// MeshData
			promises.push(that._load(config.meshRef, options).then(function (meshData) {
				component.meshData = meshData;
				if (meshData.boundingBox) {
					var min = meshData.boundingBox.min;
					var max = meshData.boundingBox.max;
					var size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
					var center = new _Vector2.default(max[0] + min[0], max[1] + min[1], max[2] + min[2]).scale(0.5);
					var bounding = new _BoundingBox2.default(center, size[0] / 2, size[1] / 2, size[2] / 2);
					component.setModelBound(bounding, false);
				}
			}));
			// Skeleton pose
			if (config.poseRef) {
				promises.push(that._load(config.poseRef, options).then(function (pose) {
					component.currentPose = pose;

					entity.traverseUp(function (parentEntity) {
						if (parentEntity.animationComponent) {
							parentEntity.animationComponent._skeletonPose = pose;
						}
					});
				}));
			}
			return _rsvp2.default.all(promises).then(function () {
				return component;
			});
		} else {
			// No mesh. Need to reset the bounding box.
			component.modelBoundDirty = true;
		}
	});
};
module.exports = exports.default;
