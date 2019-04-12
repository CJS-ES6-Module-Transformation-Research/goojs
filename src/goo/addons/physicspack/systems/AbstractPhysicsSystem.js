Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AbstractPhysicsSystem;

var _System = require("../../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Base class for physics systems.
 * @extends System
 */
function AbstractPhysicsSystem() {
	_System2.default.apply(this, arguments);

	this.priority = -1;

	/**
  * Entitites that holds ColliderComponents, but aren't instantiated since they have no RigidBodyComponent
  */
	this._activeColliderEntities = [];

	this._colliderInsertedListener = function (event) {
		this._activeColliderEntities.push(event.entity);
		this._colliderInserted(event.entity);
	}.bind(this);

	this._colliderDeletedListener = function (event) {
		var entities = this._activeColliderEntities;
		var index = entities.indexOf(event.entity);
		if (index !== -1) {
			this._activeColliderEntities.splice(index, 1);
		}
		this._colliderDeleted(event.entity);
	}.bind(this);

	this._colliderDeletedComponentListener = function (event) {
		this._colliderDeletedComponent(event.entity, event.component);
	}.bind(this);

	_SystemBus2.default.addListener('goo.collider.inserted', this._colliderInsertedListener);
	_SystemBus2.default.addListener('goo.collider.deleted', this._colliderDeletedListener);
	_SystemBus2.default.addListener('goo.collider.deletedComponent', this._colliderDeletedComponentListener);
}

AbstractPhysicsSystem.prototype = Object.create(_System2.default.prototype);
AbstractPhysicsSystem.prototype.constructor = AbstractPhysicsSystem;

/**
 * @virtual
 * @param {Vector3} gravityVector
 */
AbstractPhysicsSystem.prototype.setGravity = function () /*gravityVector*/{};

var event = {
	entityA: null,
	entityB: null
};

/**
 * @private
 */
AbstractPhysicsSystem.prototype.emitSubStepEvent = function () {
	_SystemBus2.default.emit('goo.physics.substep');
};

/**
 * @private
 * @param  {Entity} entityA
 * @param  {Entity} entityB
 */
AbstractPhysicsSystem.prototype.emitBeginContact = function (entityA, entityB) {
	this._emitEvent('goo.physics.beginContact', entityA, entityB);
};

/**
 * @private
 * @param  {Entity} entityA
 * @param  {Entity} entityB
 */
AbstractPhysicsSystem.prototype.emitDuringContact = function (entityA, entityB) {
	this._emitEvent('goo.physics.duringContact', entityA, entityB);
};

/**
 * @private
 * @param  {Entity} entityA
 * @param  {Entity} entityB
 */
AbstractPhysicsSystem.prototype.emitEndContact = function (entityA, entityB) {
	this._emitEvent('goo.physics.endContact', entityA, entityB);
};

/**
 * @private
 * @param  {Entity} triggerEntity
 * @param  {Entity} otherEntity
 */
AbstractPhysicsSystem.prototype.emitTriggerEnter = function (triggerEntity, otherEntity) {
	this._emitEvent('goo.physics.triggerEnter', triggerEntity, otherEntity);
};

/**
 * @private
 * @param  {Entity} triggerEntity
 * @param  {Entity} otherEntity
 */
AbstractPhysicsSystem.prototype.emitTriggerStay = function (triggerEntity, otherEntity) {
	this._emitEvent('goo.physics.triggerStay', triggerEntity, otherEntity);
};

/**
 * @private
 * @param  {Entity} triggerEntity
 * @param  {Entity} otherEntity
 */
AbstractPhysicsSystem.prototype.emitTriggerExit = function (triggerEntity, otherEntity) {
	this._emitEvent('goo.physics.triggerExit', triggerEntity, otherEntity);
};

AbstractPhysicsSystem.prototype._emitEvent = function (channel, entityA, entityB) {
	event.entityA = entityA;
	event.entityB = entityB;
	_SystemBus2.default.emit(channel, event);
	event.entityA = null;
	event.entityB = null;
};

AbstractPhysicsSystem.prototype._colliderInserted = function () /*entity*/{};
AbstractPhysicsSystem.prototype._colliderDeleted = function () /*entity*/{};
AbstractPhysicsSystem.prototype._colliderDeletedComponent = function () /*entity*/{};
module.exports = exports.default;
