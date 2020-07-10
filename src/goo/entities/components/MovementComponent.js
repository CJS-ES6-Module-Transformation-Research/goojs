"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementComponent = undefined;

var _Vector = require("../../math/Vector3");

var _Component = require("../../entities/components/Component");

var MovementComponent_MovementComponent = MovementComponent;

function MovementComponent() {
  _Component.Component.apply(this, arguments);

  this.type = 'MovementComponent';
  this.velocity = new _Vector.Vector3();
  this.rotationVelocity = new _Vector.Vector3();

  // @ifdef DEBUG
  Object.seal(this);
  // @endif
}

MovementComponent.type = 'MovementComponent';

MovementComponent.prototype = Object.create(_Component.Component.prototype);
MovementComponent.prototype.constructor = MovementComponent;

/**
 * Adds velocity to movement. Typically useful for things such as gravity and slingshots.
 * @param {Vector3} vec3 velocity impulse vector.
 */
MovementComponent.prototype.addVelocity = function (vec3) {
  this.velocity.add(vec3);
};

/**
 * Adds velocity to movement. Typically useful for things such as gravity and slingshots.
 * @param {Vector3} vec3 velocity impulse vector.
 */

MovementComponent.prototype.setVelocity = function (vec3) {
  this.velocity.set(vec3);
};

/**
 * Reads the movement velocity vector
 * @returns {Vector3} velocity vector
 */

MovementComponent.prototype.getVelocity = function () {
  return this.velocity;
};

/**
 * Adds rotational velocity to movement. Typically useful for spinning or turning things.
 * @param {Vector3} vec3 rotational velocity impulse vector.
 */

MovementComponent.prototype.addRotationVelocity = function (vec3) {
  this.rotationVelocity.add(vec3);
};
/**
 * Sets rotational velocity of the movement.
 * @param {Vector3} vec3 rotational velocity vector.
 */

MovementComponent.prototype.setRotationVelocity = function (vec3) {
  this.rotationVelocity.set(vec3);
};

/**
 * Read the rotational velocity of movement
 * @returns {Vector3} the rotational velocity
 */

MovementComponent.prototype.getRotationVelocity = function () {
  return this.rotationVelocity;
};

/**
 * Holds the movement parameters of an entity.
 * Typically useful for anything which has a speed and/or
 * rotation.
 * @extends Component
 */
exports.MovementComponent = MovementComponent_MovementComponent;