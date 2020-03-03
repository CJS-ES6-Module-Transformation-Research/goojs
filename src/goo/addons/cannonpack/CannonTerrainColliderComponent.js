Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CannonTerrainColliderComponent = undefined;

var _Component = require("../../entities/components/Component");

function CannonTerrainColliderComponent(settings) {
	_Component.Component.apply(this, arguments);

	this.type = 'CannonTerrainColliderComponent';

	settings = settings || {
		data: [],
		shapeOptions: {}
	};

	// Create shape
	this.cannonShape = new CANNON.Heightfield(settings.data, settings.shapeOptions);
}

CannonTerrainColliderComponent.prototype = Object.create(_Component.Component.prototype);
CannonTerrainColliderComponent.constructor = CannonTerrainColliderComponent;

var exported_CannonTerrainColliderComponent = CannonTerrainColliderComponent;

/* global CANNON */

/**
 * Terrain collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @param {Object} [settings]
 * @param {Object} [settings.data]
 * @param {Object} [settings.shapeOptions]
 */
exports.CannonTerrainColliderComponent = exported_CannonTerrainColliderComponent;
