var LightingSystem_LightingSystem = LightingSystem;
import { Capabilities as rendererCapabilities_Capabilitiesjs } from "../../renderer/Capabilities";
import { System as entitiessystemsSystem_Systemjs } from "../../entities/systems/System";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../entities/SystemBus";
function LightingSystem() {
	entitiessystemsSystem_Systemjs.call(this, 'LightingSystem', ['LightComponent', 'TransformComponent']);

	this.overrideLights = null;

	this.lights = [];

	this._needsUpdate = true;
}

LightingSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);
LightingSystem.prototype.constructor = LightingSystem;

/**
 * Replaces the lights tracked by the system with custom ones.
 * @param overrideLights
 */
LightingSystem.prototype.setOverrideLights = function (overrideLights) {
	this.overrideLights = overrideLights;
	entitiesSystemBus_SystemBusjsjs.emit('goo.setLights', this.overrideLights);
	this._needsUpdate = true;
};

/**
 * Disables overriding of lights tracked by the system
 */
LightingSystem.prototype.clearOverrideLights = function () {
	this.overrideLights = undefined;
	this._needsUpdate = true;
};

LightingSystem.prototype.inserted = function (entity) {
	entity.lightComponent.updateLight(entity.transformComponent.sync().worldTransform);
};

LightingSystem.prototype.process = function (entities) {
	// do we use this anymore?
	// we used to have this feature for the early days of create
	if (!this.overrideLights) {
		this.lights.length = 0;

		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var transformComponent = entity.transformComponent;
			var lightComponent = entity.lightComponent;

			transformComponent.sync();
			if (lightComponent._transformDirty || this._needsUpdate) {
				lightComponent.updateLight(transformComponent.worldTransform);
				lightComponent._transformDirty = false;
			}

			if (!lightComponent.hidden) {
				var light = lightComponent.light;
				light.shadowCaster = light.shadowCaster && rendererCapabilities_Capabilitiesjs.TextureFloat; // Needs float texture for shadows (for now)
				this.lights.push(light);
			}
		}
		this._needsUpdate = false;
		entitiesSystemBus_SystemBusjsjs.emit('goo.setLights', this.lights);
	}
};

LightingSystem.prototype.invalidateHandles = function (renderer) {
	this._activeEntities.forEach(function (entity) {
		entity.lightComponent.light.invalidateHandles(renderer);
	});
};

/**
 * Processes all entities with a light component making sure that lights are placed according to its transforms<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/renderer/light/Lights-vtest.html Working example
 * @extends System
 */
export { LightingSystem_LightingSystem as LightingSystem };