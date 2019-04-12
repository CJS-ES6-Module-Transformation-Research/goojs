Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AnimationComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _AnimationComponent = require("../../animationpack/components/AnimationComponent");

var _AnimationComponent2 = _interopRequireDefault(_AnimationComponent);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of animation components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function AnimationComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'AnimationComponent';
}

AnimationComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
AnimationComponentHandler.prototype.constructor = AnimationComponentHandler;
_ComponentHandler2.default._registerClass('animation', AnimationComponentHandler);

/**
 * Create animation component.
 * @returns {AnimationComponent} the created component object
 * @private
 */
AnimationComponentHandler.prototype._create = function () {
	return new _AnimationComponent2.default();
};

/**
 * Update engine animation component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
AnimationComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;

	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		var promises = [];
		var p;

		var poseRef = config.poseRef;
		if (poseRef) {
			p = that._load(poseRef, options).then(function (pose) {
				component._skeletonPose = pose;
			});
			promises.push(p);
		}

		var layersRef = config.layersRef;
		if (layersRef) {
			p = that._load(layersRef, options).then(function (layers) {
				component.layers = layers;
				component._layersId = layersRef;
			});
			promises.push(p);
		}
		return _rsvp2.default.all(promises).then(function () {
			return component;
		});
	});
};
module.exports = exports.default;
