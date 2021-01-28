var mod_CannonTerrainColliderComponent = CannonTerrainColliderComponent;
import { Component as Component_Component } from "../../entities/components/Component";

/* global CANNON */

/**
 * Terrain collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @param {Object} [settings]
 * @param {Object} [settings.data]
 * @param {Object} [settings.shapeOptions]
 */
function CannonTerrainColliderComponent(settings) {
	Component_Component.apply(this, arguments);

	this.type = 'CannonTerrainColliderComponent';

	settings = settings || {
		data: [],
		shapeOptions: {}
	};

	// Create shape
	this.cannonShape = new CANNON.Heightfield(settings.data, settings.shapeOptions);
}

CannonTerrainColliderComponent.prototype = Object.create(Component_Component.prototype);
CannonTerrainColliderComponent.constructor = CannonTerrainColliderComponent;

/* global CANNON */

/**
 * Terrain collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @param {Object} [settings]
 * @param {Object} [settings.data]
 * @param {Object} [settings.shapeOptions]
 */
export { mod_CannonTerrainColliderComponent as CannonTerrainColliderComponent };
