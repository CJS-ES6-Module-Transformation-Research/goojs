"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonPlaneColliderComponent = undefined;

var _Component = require("../../entities/components/Component");

var mod_CannonPlaneColliderComponent = CannonPlaneColliderComponent;


/* global CANNON */

/**
 * Plane collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 */
function CannonPlaneColliderComponent(settings) {
  _Component.Component.apply(this, arguments);

  this.type = 'CannonPlaneColliderComponent';

  settings = settings || {};

  // Create shape
  this.cannonShape = new CANNON.Plane();
}

CannonPlaneColliderComponent.prototype = Object.create(_Component.Component.prototype);
CannonPlaneColliderComponent.constructor = CannonPlaneColliderComponent;

/* global CANNON */

/**
 * Plane collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 */
exports.CannonPlaneColliderComponent = mod_CannonPlaneColliderComponent;