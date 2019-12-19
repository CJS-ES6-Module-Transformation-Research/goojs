import { System } from "../../../entities/systems/System";
import { anonymus as SystemBus } from "../../../entities/SystemBus";
function ColliderSystem() {
	System.call(this, 'ColliderSystem', ['ColliderComponent', 'TransformComponent']);
	this.priority = 1; // Should be processed after TransformSystem
}
ColliderSystem.prototype = Object.create(System.prototype);
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
	SystemBus.emit('goo.collider.inserted', {
		entity: entity
	});
};

/**
 * @private
 * @param  {Entity} entity
 */
ColliderSystem.prototype.deleted = function (entity) {
	SystemBus.emit('goo.collider.deleted', {
		entity: entity
	});
};

/**
 * @private
 * @param  {Entity} entity
 * @param  {Component} component
 */
ColliderSystem.prototype.removedComponent = function (entity, component) {
	SystemBus.emit('goo.collider.deletedComponent', {
		entity: entity,
		component: component
	});
};

var exported_ColliderSystem = ColliderSystem;

/**
 * Processes all entities with collider components, making sure they are up to date.
 * @extends System
 */
export { exported_ColliderSystem as ColliderSystem };