Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeshRendererComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _MeshRendererComponent = require("../../entities/components/MeshRendererComponent");

var _MeshRendererComponent2 = _interopRequireDefault(_MeshRendererComponent);

var _Material = require("../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _ShaderLib = require("../../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of meshrenderercomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function MeshRendererComponentHandler() {
  _ComponentHandler2.default.apply(this, arguments);
  this._type = 'MeshRendererComponent';
}

MeshRendererComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
MeshRendererComponentHandler.prototype.constructor = MeshRendererComponentHandler;
_ComponentHandler2.default._registerClass('meshRenderer', MeshRendererComponentHandler);

MeshRendererComponentHandler.DEFAULT_MATERIAL = new _Material2.default(_ShaderLib2.default.uber, 'Default material');

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshRendererComponentHandler.prototype._prepare = function (config) {
  return _ObjectUtils2.default.defaults(config, {
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
  return new _MeshRendererComponent2.default();
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

  return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
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
    _ObjectUtils2.default.forEach(materials, function (item) {
      promises.push(that._load(item.materialRef, options));
    }, null, 'sortValue');
    return _rsvp2.default.all(promises).then(function (materials) {
      var selectionMaterial = component.materials.filter(function (material) {
        return material.name === 'gooSelectionIndicator';
      });
      component.materials = materials.concat(selectionMaterial);
      return component;
    });
  });
};
module.exports = exports.default;
