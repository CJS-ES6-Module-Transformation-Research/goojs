Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColliderSystem = undefined;

var _System = require("../../../entities/systems/System");

var _SystemBus = require("../../../entities/SystemBus");

function ColliderSystem() {
  _System.System.call(this, 'ColliderSystem', ['ColliderComponent', 'TransformComponent']);
  this.priority = 1; // Should be processed after TransformSystem
}
ColliderSystem.prototype = Object.create(_System.System.prototype);
ColliderSystem.prototype.constructor = ColliderSystem;

/**
 * @private
 * @param {array} entities
 */
ColliderSystem.prototype.process = function () /*entities*/{};

/**
 * @private
 * @param  {Entity} entity
 */
ColliderSystem.prototype.inserted = function (entity) {
  _SystemBus.anonymus.emit('goo.collider.inserted', {
    entity: entity
  });
};

/**
 * @private
 * @param  {Entity} entity
 */
ColliderSystem.prototype.deleted = function (entity) {
  _SystemBus.anonymus.emit('goo.collider.deleted', {
    entity: entity
  });
};

/**
 * @private
 * @param  {Entity} entity
 * @param  {Component} component
 */
ColliderSystem.prototype.removedComponent = function (entity, component) {
  _SystemBus.anonymus.emit('goo.collider.deletedComponent', {
    entity: entity,
    component: component
  });
};

var exported_ColliderSystem = ColliderSystem;

/**
 * Processes all entities with collider components, making sure they are up to date.
 * @extends System
 */
exports.ColliderSystem = exported_ColliderSystem;
