"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonSphereColliderComponent = undefined;

var _Component = require("../../entities/components/Component");

var CannonSphereColliderComponent_CannonSphereColliderComponent = CannonSphereColliderComponent;

function CannonSphereColliderComponent(settings) {
  _Component.Component.apply(this, arguments);

  settings = settings || {};
  this.type = 'CannonSphereColliderComponent';
  this.radius = settings.radius || 0.5;
  this.cannonShape = new CANNON.Sphere(this.radius);
}
CannonSphereColliderComponent.prototype = Object.create(_Component.Component.prototype);
CannonSphereColliderComponent.constructor = CannonSphereColliderComponent;

/* global CANNON */

/**
 * Sphere collider for the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {number} [settings.radius=0.5]
 */
exports.CannonSphereColliderComponent = CannonSphereColliderComponent_CannonSphereColliderComponent;