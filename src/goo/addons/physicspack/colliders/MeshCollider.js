"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshCollider = undefined;

var _Collider = require("../../../addons/physicspack/colliders/Collider");

var _Vector = require("../../../math/Vector3");

var mod_MeshCollider = MeshCollider;

/**
 * Physics mesh collider.
 * @param {Object} [settings]
 * @param {MeshData} [settings.meshData]
 * @param {Vector3} [settings.scale]
 * @extends Collider
 */
function MeshCollider(settings) {
  settings = settings || {};

  /**
   * @type {MeshData}
   */
  this.meshData = settings.meshData;

  /**
   * @type {Vector3}
   */
  this.scale = settings.scale !== undefined ? new _Vector.Vector3(settings.scale) : new _Vector.Vector3(1, 1, 1);

  _Collider.Collider.call(this);
}
MeshCollider.prototype = Object.create(_Collider.Collider.prototype);
MeshCollider.prototype.constructor = MeshCollider;

/**
 * @private
 * @param {Transform} transform
 * @param {Collider} targetCollider
 */
MeshCollider.prototype.transform = function (transform, targetCollider) {
  targetCollider.scale.set(this.scale).mul(transform.scale);
};

/**
 * @returns {MeshCollider}
 */
MeshCollider.prototype.clone = function () {
  return new MeshCollider({
    meshData: this.meshData,
    scale: this.scale
  });
};

/**
 * Physics mesh collider.
 * @param {Object} [settings]
 * @param {MeshData} [settings.meshData]
 * @param {Vector3} [settings.scale]
 * @extends Collider
 */
exports.MeshCollider = mod_MeshCollider;