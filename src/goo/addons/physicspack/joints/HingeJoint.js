"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HingeJoint = undefined;

var _PhysicsJoint = require("../../../addons/physicspack/joints/PhysicsJoint");

var _Vector = require("../../../math/Vector3");

function HingeJoint(settings) {
  settings = settings || {};
  _PhysicsJoint.PhysicsJoint.call(this, settings);

  /**
   * A point defined locally in the entity that the Hinge should rotate around.
   * @type {Vector3}
   */
  this.localPivot = settings.localPivot ? new _Vector.Vector3(settings.localPivot) : new _Vector.Vector3(0, 0.5, 0);

  /**
   * Automatically compute the connectedLocalPivot
   * @type {boolean}
   * @default true
   */
  this.autoConfigureConnectedPivot = settings.autoConfigureConnectedPivot ? settings.autoConfigureConnectedPivot : true;

  /**
   * The pivot point defined inside the connected entity.
   * @type {Vector3}
   */
  this.connectedLocalPivot = settings.connectedLocalPivot ? new _Vector.Vector3(settings.connectedLocalPivot) : new _Vector.Vector3();

  /**
   * @type {Vector3}
   */
  this.localAxis = settings.localAxis ? new _Vector.Vector3(settings.localAxis) : new _Vector.Vector3(1, 0, 0);
}
HingeJoint.prototype = Object.create(_PhysicsJoint.PhysicsJoint.prototype);
HingeJoint.prototype.constructor = HingeJoint;

var exported_HingeJoint = HingeJoint;

/**
 * Physics hinge joint. To be added to a {@link RigidBodyComponent}.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Vector3} [settings.localAxis]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
exports.HingeJoint = exported_HingeJoint;
