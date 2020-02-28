import { Component as Component_Componentjs } from "../../entities/components/Component";
function CannonTerrainColliderComponent(settings) {
	Component_Componentjs.apply(this, arguments);

	this.type = 'CannonTerrainColliderComponent';

	settings = settings || {
		data: [],
		shapeOptions: {}
	};

	// Create shape
	this.cannonShape = new CANNON.Heightfield(settings.data, settings.shapeOptions);
}

CannonTerrainColliderComponent.prototype = Object.create(Component_Componentjs.prototype);
CannonTerrainColliderComponent.constructor = CannonTerrainColliderComponent;

var exported_CannonTerrainColliderComponent = CannonTerrainColliderComponent;

/* global CANNON */

/**
 * Terrain collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @param {Object} [settings]
 * @param {Object} [settings.data]
 * @param {Object} [settings.shapeOptions]
 */
export { exported_CannonTerrainColliderComponent as CannonTerrainColliderComponent };
