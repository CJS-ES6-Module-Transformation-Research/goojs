"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BallJoint = undefined;

var _PhysicsJoint = require("../../../addons/physicspack/joints/PhysicsJoint");

var _Vector = require("../../../math/Vector3");

function BallJoint(settings) {
  settings = settings || {};
  _PhysicsJoint.PhysicsJoint.call(this, settings);

  /**
   * @type {Vector3}
   */
  this.localPivot = settings.localPivot ? _Vector.Vector3.fromAny(settings.localPivot) : new _Vector.Vector3(0, 0.5, 0);

  /**
   * Automatically compute the connectedLocalPivot by using the entities initial transforms.
   * @type {boolean}
   * @default true
   */
  this.autoConfigureConnectedPivot = settings.autoConfigureConnectedPivot ? settings.autoConfigureConnectedPivot : true;

  /**
   * The pivot point defined inside the connected entity.
   * @type {Vector3}
   */
  this.connectedLocalPivot = settings.connectedLocalPivot ? _Vector.Vector3.fromAny(settings.connectedLocalPivot) : new _Vector.Vector3(0, 0.5, 0);
}

BallJoint.prototype = Object.create(_PhysicsJoint.PhysicsJoint.prototype);
BallJoint.prototype.constructor = BallJoint;

var exported_BallJoint = BallJoint;

/**
 * A physics ball joint. A ball joint (or "constraint") will try to keep a point in each of two connected bodies the same.
 * @param {Object} [settings]
 * @param {Vector3} [settings.localPivot]
 * @param {Entity} [settings.connectedEntity]
 * @param {boolean} [settings.collideConnected=false]
 * @extends PhysicsJoint
 */
exports.BallJoint = exported_BallJoint;
