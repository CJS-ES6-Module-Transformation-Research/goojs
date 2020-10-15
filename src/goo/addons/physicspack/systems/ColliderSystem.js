var ColliderSystem_ColliderSystem = ColliderSystem;
import { System as entitiessystemsSystem_Systemjs } from "../../../entities/systems/System";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../../entities/SystemBus";
function ColliderSystem() {
	entitiessystemsSystem_Systemjs.call(this, 'ColliderSystem', ['ColliderComponent', 'TransformComponent']);
	this.priority = 1; // Should be processed after TransformSystem
}
ColliderSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);
ColliderSystem.prototype.constructor = ColliderSystem;

/**
 * @private
 * @param {array} entities
 */
ColliderSystem.prototype.process = function (/*entities*/) {
};

/**
 * @private
 * @param  {Entity} entity
 */
ColliderSystem.prototype.inserted = function (entity) {
	entitiesSystemBus_SystemBusjsjs.emit('goo.collider.inserted', {
		entity: entity
	});
};

/**
 * @private
 * @param  {Entity} entity
 */
ColliderSystem.prototype.deleted = function (entity) {
	entitiesSystemBus_SystemBusjsjs.emit('goo.collider.deleted', {
		entity: entity
	});
};

/**
 * @private
 * @param  {Entity} entity
 * @param  {Component} component
 */
ColliderSystem.prototype.removedComponent = function (entity, component) {
	entitiesSystemBus_SystemBusjsjs.emit('goo.collider.deletedComponent', {
		entity: entity,
		component: component
	});
};

/**
 * Processes all entities with collider components, making sure they are up to date.
 * @extends System
 */
export { ColliderSystem_ColliderSystem as ColliderSystem };