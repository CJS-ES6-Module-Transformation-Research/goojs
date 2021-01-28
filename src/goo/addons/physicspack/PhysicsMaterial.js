"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mod_PhysicsMaterial = PhysicsMaterial;
/**
 * @param {Object} [settings]
 * @param {number} [settings.friction=0.3]
 * @param {number} [settings.restitution=0]
 */
function PhysicsMaterial(settings) {
	settings = settings || {};

	/**
  * The friction coefficient. Multiplication is used to combine two friction values.
  * @type {number}
  */
	this.friction = settings.friction !== undefined ? settings.friction : 0.3;

	/**
  * The "bounciness" of the collider.
  * @type {number}
  */
	this.restitution = settings.restitution !== undefined ? settings.restitution : 0;
}

/**
 * @param {Object} [settings]
 * @param {number} [settings.friction=0.3]
 * @param {number} [settings.restitution=0]
 */
exports.PhysicsMaterial = mod_PhysicsMaterial;