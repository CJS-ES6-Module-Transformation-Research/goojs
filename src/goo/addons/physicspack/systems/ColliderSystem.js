Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColliderSystem;

var _System = require("../../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Processes all entities with collider components, making sure they are up to date.
 * @extends System
 */
function ColliderSystem() {
  _System2.default.call(this, 'ColliderSystem', ['ColliderComponent', 'TransformComponent']);
  this.priority = 1; // Should be processed after TransformSystem
}

ColliderSystem.prototype = Object.create(_System2.default.prototype);
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
  _SystemBus2.default.emit('goo.collider.inserted', {
    entity: entity
  });
};

/**
 * @private
 * @param  {Entity} entity
 */
ColliderSystem.prototype.deleted = function (entity) {
  _SystemBus2.default.emit('goo.collider.deleted', {
    entity: entity
  });
};

/**
 * @private
 * @param  {Entity} entity
 * @param  {Component} component
 */
ColliderSystem.prototype.removedComponent = function (entity, component) {
  _SystemBus2.default.emit('goo.collider.deletedComponent', {
    entity: entity,
    component: component
  });
};
module.exports = exports.default;
