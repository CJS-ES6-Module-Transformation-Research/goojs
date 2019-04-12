Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = RigidBodyComponentHandler;

var _ComponentHandler = require("../../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _RigidBodyComponent = require("../../../addons/physicspack/components/RigidBodyComponent");

var _RigidBodyComponent2 = _interopRequireDefault(_RigidBodyComponent);

var _ObjectUtils = require("../../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of rigid body components
 * @extends ComponentHandler
 * @hidden
 */
function RigidBodyComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'RigidBodyComponent';
}

RigidBodyComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
RigidBodyComponentHandler.prototype.constructor = RigidBodyComponentHandler;
_ComponentHandler2.default._registerClass('rigidBody', RigidBodyComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
RigidBodyComponentHandler.prototype._prepare = function (config) {
	return _ObjectUtils2.default.defaults(config, {
		mass: 1,
		isKinematic: false,
		velocity: [0, 0, 0],
		angularVelocity: [0, 0, 0],
		linearDrag: 0,
		angularDrag: 0,
		freezePositionX: false,
		freezePositionY: false,
		freezePositionZ: false,
		freezeRotationX: false,
		freezeRotationY: false,
		freezeRotationZ: false
	});
};

/**
 * Create a rigid body component.
 * @returns {RigidBodyComponent} the created component object
 * @private
 */
RigidBodyComponentHandler.prototype._create = function () {
	return new _RigidBodyComponent2.default();
};

/**
 * Removes the rigid body component
 * @param {string} ref
 */
RigidBodyComponentHandler.prototype._remove = function (entity) {
	entity.clearComponent('RigidBodyComponent');
};

/**
 * Update engine rigid body component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
RigidBodyComponentHandler.prototype.update = function (entity, config, options) {
	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		component.mass = config.mass;
		component.isKinematic = config.isKinematic;
		component.setVelocity(new _Vector2.default(config.velocity));
		component.setAngularVelocity(new _Vector2.default(config.angularVelocity));
		component.linearDamping = config.linearDrag;
		component.angularDamping = config.angularDrag;

		component.constraints = (config.freezePositionX ? _RigidBodyComponent2.default.FREEZE_POSITION_X : 0) | (config.freezePositionY ? _RigidBodyComponent2.default.FREEZE_POSITION_Y : 0) | (config.freezePositionZ ? _RigidBodyComponent2.default.FREEZE_POSITION_Z : 0) | (config.freezeRotationX ? _RigidBodyComponent2.default.FREEZE_ROTATION_X : 0) | (config.freezeRotationY ? _RigidBodyComponent2.default.FREEZE_ROTATION_Y : 0) | (config.freezeRotationZ ? _RigidBodyComponent2.default.FREEZE_ROTATION_Z : 0);

		return component;
	});
};
module.exports = exports.default;
