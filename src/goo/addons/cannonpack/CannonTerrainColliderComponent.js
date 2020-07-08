var CannonTerrainColliderComponent_CannonTerrainColliderComponent = CannonTerrainColliderComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
function CannonTerrainColliderComponent(settings) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'CannonTerrainColliderComponent';

	settings = settings || {
		data: [],
		shapeOptions: {}
	};

	// Create shape
	this.cannonShape = new CANNON.Heightfield(settings.data, settings.shapeOptions);
}

CannonTerrainColliderComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
CannonTerrainColliderComponent.constructor = CannonTerrainColliderComponent;

/* global CANNON */

/**
 * Terrain collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @param {Object} [settings]
 * @param {Object} [settings.data]
 * @param {Object} [settings.shapeOptions]
 */
export { CannonTerrainColliderComponent_CannonTerrainColliderComponent as CannonTerrainColliderComponent };
