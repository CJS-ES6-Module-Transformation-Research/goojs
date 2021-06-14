"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuadComponentHandler = undefined;

var _ComponentHandler = require("../loaders/handlers/ComponentHandler");

var _QuadComponent = require("../quadpack/QuadComponent");

var mod_QuadComponentHandler = QuadComponentHandler;

/**
 * For handling loading of quadcomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function QuadComponentHandler() {
  _ComponentHandler.ComponentHandler.apply(this, arguments);
  this._type = 'QuadComponent';
}

QuadComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
QuadComponentHandler.prototype.constructor = QuadComponentHandler;
(0, _ComponentHandler._registerClass)('quad', QuadComponentHandler);

/**
 * Create a quadcomponent object.
 * @returns {QuadComponent} the created component object
 * @private
 */
QuadComponentHandler.prototype._create = function () {
  return new _QuadComponent.QuadComponent();
};

/**
 * Removes the quadcomponent from the entity.
 * @param {Entity} entity
 * @private
 */
QuadComponentHandler.prototype._remove = function (entity) {
  if (this.world && this.world.gooRunner) {
    entity.quadComponent.destroy(this.world.gooRunner.renderer.context);
  }
  entity.clearComponent('quadComponent');
};

/**
 * Update engine quadcomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
QuadComponentHandler.prototype.update = function (entity, config, options) {
  var that = this;
  return _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
    if (!component) {
      return;
    }

    // Load material
    return that._load(config.materialRef, options).then(function (material) {
      // setting this here until the frontend sends good values
      material.cullState.enabled = true;

      // If the component already has got these components, they need to be overridden
      if (entity.meshRendererComponent !== component.meshRendererComponent) {
        entity.setComponent(component.meshRendererComponent);
      }
      if (entity.meshDataComponent !== component.meshDataComponent) {
        entity.setComponent(component.meshDataComponent);
      }

      component.setMaterial(material);
      component.rebuildMeshData();
      component.meshDataComponent.modelBoundDirty = true;

      return component;
    });
  });
};

/**
 * For handling loading of quadcomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
exports.QuadComponentHandler = mod_QuadComponentHandler;