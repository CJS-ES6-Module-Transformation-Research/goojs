Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ColliderComponentHandler;

var _ComponentHandler = require("../../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _ColliderComponent = require("../../../addons/physicspack/components/ColliderComponent");

var _ColliderComponent2 = _interopRequireDefault(_ColliderComponent);

var _ObjectUtils = require("../../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _SphereCollider = require("../../../addons/physicspack/colliders/SphereCollider");

var _SphereCollider2 = _interopRequireDefault(_SphereCollider);

var _BoxCollider = require("../../../addons/physicspack/colliders/BoxCollider");

var _BoxCollider2 = _interopRequireDefault(_BoxCollider);

var _PlaneCollider = require("../../../addons/physicspack/colliders/PlaneCollider");

var _PlaneCollider2 = _interopRequireDefault(_PlaneCollider);

var _CylinderCollider = require("../../../addons/physicspack/colliders/CylinderCollider");

var _CylinderCollider2 = _interopRequireDefault(_CylinderCollider);

var _PhysicsMaterial = require("../../../addons/physicspack/PhysicsMaterial");

var _PhysicsMaterial2 = _interopRequireDefault(_PhysicsMaterial);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of collider components
 * @extends ComponentHandler
 * @hidden
 */
function ColliderComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'ColliderComponent';
}

ColliderComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
ColliderComponentHandler.prototype.constructor = ColliderComponentHandler;
_ComponentHandler2.default._registerClass('collider', ColliderComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
ColliderComponentHandler.prototype._prepare = function (config) {
	return _ObjectUtils2.default.defaults(config, {
		shape: 'Box',
		shapeOptions: {
			halfExtents: [1, 1, 1],
			radius: 0.5,
			height: 1
		},
		isTrigger: false,
		friction: 0.3,
		restitution: 0.0
	});
};

/**
 * Create collider component.
 * @returns {ColliderComponent} the created component object
 * @private
 */
ColliderComponentHandler.prototype._create = function () {
	return new _ColliderComponent2.default({ material: new _PhysicsMaterial2.default() });
};

/**
 * Removes the collider component
 * @param {string} ref
 */
ColliderComponentHandler.prototype._remove = function (entity) {
	entity.clearComponent('ColliderComponent');
};

/**
 * Update engine collider component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
ColliderComponentHandler.prototype.update = function (entity, config, options) {
	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		switch (config.shape) {
			default:
			case 'Box':
				component.collider = new _BoxCollider2.default(config.shapeOptions);
				component.worldCollider = new _BoxCollider2.default();
				break;
			case 'Sphere':
				component.collider = new _SphereCollider2.default(config.shapeOptions);
				component.worldCollider = new _SphereCollider2.default();
				break;
			case 'Plane':
				component.collider = new _PlaneCollider2.default();
				component.worldCollider = new _PlaneCollider2.default();
				break;
			case 'Cylinder':
				component.collider = new _CylinderCollider2.default(config.shapeOptions);
				component.worldCollider = new _CylinderCollider2.default();
				break;
		}

		component.material.friction = config.friction;
		component.material.restitution = config.restitution;
		component.isTrigger = config.isTrigger;

		return component;
	});
};
module.exports = exports.default;
