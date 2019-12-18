Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MovementSystem = undefined;

var _System = require('../../entities/systems/System');

var exported_MovementSystem = MovementSystem;
function MovementSystem() {
	_System.System.call(this, 'MovementSystem', ['MovementComponent']);
}

MovementSystem.prototype = Object.create(_System.System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

MovementSystem.prototype.addVelocityToTransform = function (vel, transform, tpf) {
	transform.translation.addDirect(vel.x * tpf, vel.y * tpf, vel.z * tpf);
};

MovementSystem.prototype.addRotToTransform = function (rotVel, transform, tpf) {
	transform.rotation.rotateX(rotVel.x * tpf);
	transform.rotation.rotateY(rotVel.y * tpf);
	transform.rotation.rotateZ(rotVel.z * tpf);
};

MovementSystem.prototype.applyMovementToEntity = function (entity) {
	var tpf = entity._world.tpf;
	var rotVel = entity.movementComponent.getRotationVelocity();
	var velocity = entity.movementComponent.getVelocity();
	var transform = entity.transformComponent.transform;
	this.addVelocityToTransform(velocity, transform, tpf);
	this.addRotToTransform(rotVel, transform, tpf);
	entity.transformComponent.setUpdated();
};

MovementSystem.prototype.process = function (entities) {
	for (var i = 0; i < entities.length; i++) {
		this.applyMovementToEntity(entities[i]);
	}
};

//! AT: unused; should be removed
/**
 * Processes all entities with movement components.
 * This system applies movement vectors for translation and rotation
 * to the transform of the entity which has it every frame.
 * @extends System
 */
exports.MovementSystem = exported_MovementSystem;
