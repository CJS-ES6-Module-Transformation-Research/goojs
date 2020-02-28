Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshRendererComponentHandler = undefined;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _MeshRendererComponent = require("../../entities/components/MeshRendererComponent");

var _Material = require("../../renderer/Material");

var _ShaderLib = require("../../renderer/shaders/ShaderLib");

var _rsvp = require("../../util/rsvp");

var _ObjectUtils = require("../../util/ObjectUtils");

function MeshRendererComponentHandler() {
  _ComponentHandler.ComponentHandler.apply(this, arguments);
  this._type = 'MeshRendererComponent';
}

MeshRendererComponentHandler.prototype = Object.create(_ComponentHandler.ComponentHandler.prototype);
MeshRendererComponentHandler.prototype.constructor = MeshRendererComponentHandler;
(0, _ComponentHandler._registerClass)('meshRenderer', MeshRendererComponentHandler);

MeshRendererComponentHandler.DEFAULT_MATERIAL = new _Material.Material(_ShaderLib.uber, 'Default material');

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshRendererComponentHandler.prototype._prepare = function (config) {
  return (0, _ObjectUtils.defaults)(config, {
    cullMode: 'Dynamic',
    castShadows: true,
    receiveShadows: true,
    reflectable: true
  });
};

/**
 * Create meshrenderer component.
 * @returns {MeshRendererComponent} the created component object
 * @private
 */
MeshRendererComponentHandler.prototype._create = function () {
  return new _MeshRendererComponent.MeshRendererComponent();
};

/**
 * Update engine meshrenderercomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
MeshRendererComponentHandler.prototype.update = function (entity, config, options) {
  var that = this;

  return _ComponentHandler.ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
    if (!component) {
      return;
    }
    // Component settings
    component.cullMode = config.cullMode;
    component.castShadows = config.castShadows;
    component.receiveShadows = config.receiveShadows;
    component.isReflectable = config.reflectable;
    //component.isPickable = config.pickable;

    // Materials
    var materials = config.materials;
    if (!materials || !Object.keys(materials).length) {
      var selectionMaterial = component.materials.filter(function (material) {
        return material.name === 'gooSelectionIndicator';
      });
      component.materials = [MeshRendererComponentHandler.DEFAULT_MATERIAL].concat(selectionMaterial);
      return component;
    }

    var promises = [];
    (0, _ObjectUtils.forEach)(materials, function (item) {
      promises.push(that._load(item.materialRef, options));
    }, null, 'sortValue');
    return _rsvp.rsvpjs.all(promises).then(function (materials) {
      var selectionMaterial = component.materials.filter(function (material) {
        return material.name === 'gooSelectionIndicator';
      });
      component.materials = materials.concat(selectionMaterial);
      return component;
    });
  });
};

var exported_MeshRendererComponentHandler = MeshRendererComponentHandler;

/**
 * For handling loading of meshrenderercomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
exports.MeshRendererComponentHandler = exported_MeshRendererComponentHandler;
