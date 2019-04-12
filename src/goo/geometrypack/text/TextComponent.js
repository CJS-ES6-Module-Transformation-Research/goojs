Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

var _MeshDataComponent = require("../../entities/components/MeshDataComponent");

var _MeshDataComponent2 = _interopRequireDefault(_MeshDataComponent);

var _TextMeshGenerator = require("./TextMeshGenerator");

var _TextMeshGenerator2 = _interopRequireDefault(_TextMeshGenerator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Stores a font and handles the text mesh on an entity
 * Depends on opentype.js
 */
function TextComponent() {
  _Component2.default.apply(this, arguments);

  this.type = 'TextComponent';

  this._font = null;

  this._entity = null;
}

TextComponent.prototype = Object.create(_Component2.default.prototype);
TextComponent.prototype.constructor = TextComponent;

TextComponent.type = 'TextComponent';

TextComponent.prototype.attached = function (entity) {
  this._entity = entity;
};

TextComponent.prototype.detached = function () /*entity*/{
  this._entity.clearComponent('MeshDataComponent');
  this._entity = null;
};

/**
 * Set the font of this component
 * @param font The font loaded through opentype.js
 * @returns {TextComponent} Returns self
 */
TextComponent.prototype.setFont = function (font) {
  this._font = font;
  return this;
};

/**
 * Set the text to generate the mesh for; recomputes the mesh
 * @param {string} text
 * @param {Object} [options]
 * @param {number} [options.extrusion=4] Extrusion amount
 * @param {number} [options.fontSize=48]
 * @param {number} [options.stepLength=1] Lower values result in a more detailed mesh
 * @returns {TextComponent} Returns self
 */
TextComponent.prototype.setText = function (text, options) {
  this._entity.clearComponent('MeshDataComponent');

  // only short texts that can fit in one mesh for now
  var meshData = _TextMeshGenerator2.default.meshesForText(text, this._font, options)[0];

  var meshDataComponent = new _MeshDataComponent2.default(meshData);
  this._entity.setComponent(meshDataComponent);

  return this;
};
module.exports = exports.default;
