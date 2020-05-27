"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ColliderComponentHandler = undefined;

var _ComponentHandler = require("../../../loaders/handlers/ComponentHandler");

var _ColliderComponent = require("../../../addons/physicspack/components/ColliderComponent");

var _ObjectUtils = require("../../../util/ObjectUtils");

var _SphereCollider = require("../../../addons/physicspack/colliders/SphereCollider");

var _BoxCollider = require("../../../addons/physicspack/colliders/BoxCollider");

var _PlaneCollider = require("../../../addons/physicspack/colliders/PlaneCollider");

var _CylinderCollider = require("../../../addons/physicspack/colliders/CylinderCollider");

var _PhysicsMaterial = require("../../../addons/physicspack/PhysicsMaterial");

var ColliderComponentHandler_ColliderComponentHandler = ColliderComponentHandler;

function ColliderComponentHandler() {
	_ComponentHandler.ComponentHandler.apply(this, arguments);
	this._type = 'ColliderComponent';
}

ColliderComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
ColliderComponentHandler.prototype.constructor = ColliderComponentHandler;
_ComponentHandler.ComponentHandler._registerClass('collider', ColliderComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
ColliderComponentHandler.prototype._prepare = function (config) {
	return _ObjectUtils.ObjectUtils.defaults(config, {
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
	return new _ColliderComponent.ColliderComponent({ material: new _PhysicsMaterial.PhysicsMaterial() });
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
	return _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			return;
		}

		switch (config.shape) {
			default:
			case 'Box':
				component.collider = new _BoxCollider.BoxCollider(config.shapeOptions);
				component.worldCollider = new _BoxCollider.BoxCollider();
				break;
			case 'Sphere':
				component.collider = new _SphereCollider.SphereCollider(config.shapeOptions);
				component.worldCollider = new _SphereCollider.SphereCollider();
				break;
			case 'Plane':
				component.collider = new _PlaneCollider.PlaneCollider();
				component.worldCollider = new _PlaneCollider.PlaneCollider();
				break;
			case 'Cylinder':
				component.collider = new _CylinderCollider.CylinderCollider(config.shapeOptions);
				component.worldCollider = new _CylinderCollider.CylinderCollider();
				break;
		}

		component.material.friction = config.friction;
		component.material.restitution = config.restitution;
		component.isTrigger = config.isTrigger;

		return component;
	});
};

/**
 * For handling loading of collider components
 * @extends ComponentHandler
 * @hidden
 */
exports.ColliderComponentHandler = ColliderComponentHandler_ColliderComponentHandler;