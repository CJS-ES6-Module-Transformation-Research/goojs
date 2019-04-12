Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CameraComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _CameraComponent = require("../../entities/components/CameraComponent");

var _CameraComponent2 = _interopRequireDefault(_CameraComponent);

var _Camera = require("../../renderer/Camera");

var _Camera2 = _interopRequireDefault(_Camera);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of camera components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function CameraComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'CameraComponent';
}

CameraComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
_ComponentHandler2.default._registerClass('camera', CameraComponentHandler);
CameraComponentHandler.prototype.constructor = CameraComponentHandler;

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
CameraComponentHandler.prototype._prepare = function (config) {
	_ObjectUtils2.default.defaults(config, {
		near: 1,
		far: 10000,
		projectionMode: 'Perspective',
		aspect: 1,
		lockedRatio: false
	});
	if (config.projectionMode === 'Perspective' && config.fov === undefined) {
		config.fov = 45;
	}
	if (config.projectionMode === 'Parallel' && config.size === undefined) {
		config.size = 100;
	}
	if (config.projectionMode !== 'Perspective' && config.projectionMode !== 'Parallel') {
		config.projectionMode = 'Perspective';
	}
};

/**
 * Create camera component object.
 * @param {Entity} entity The entity on which this component should be added.
 * @returns {CameraComponent} the created component object
 * @private
 */
CameraComponentHandler.prototype._create = function () {
	var camera = new _Camera2.default(45, 1, 1, 1000);
	var component = new _CameraComponent2.default(camera);
	return component;
};

// TODO: Handle if cameracomponent is removed and camera is active

/**
 * Update engine cameracomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
CameraComponentHandler.prototype.update = function (entity, config, options) {
	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}
		component.camera.setProjectionMode(_Camera2.default[config.projectionMode]);
		component.camera.lockedRatio = false;
		if (config.projectionMode === 'Perspective') {
			component.camera.setFrustumPerspective(config.fov, null, config.near, config.far);
		} else {
			var size = config.size;
			component.camera.setFrustum(config.near, config.far, -size, size, size, -size, null);
			component.camera.size = size;
		}
		return component;
	});
};
module.exports = exports.default;
