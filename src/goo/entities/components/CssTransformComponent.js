'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CssTransformComponent = undefined;

var _Component = require('../../entities/components/Component');

var mod_CssTransformComponent = CssTransformComponent;

/**
 * Connects a domElement to an entity and applies the transformComponent of the entity to the domElement with CSS3 3D transforms.
 * @param {domElement} domElement
 * @param {boolean} faceCamera
 * @extends Component
 */
function CssTransformComponent(domElement, faceCamera) {
  _Component.Component.apply(this, arguments);

  this.type = 'CssTransformComponent';

  /**
   * DOM element.
   */
  this.domElement = domElement;

  /**
   * @type {number}
   * @default 1
   */
  this.scale = 1;

  /**
   * @type {boolean}
   */
  this.faceCamera = typeof faceCamera === 'undefined' ? false : faceCamera;

  // @ifdef DEBUG
  Object.seal(this);
  // @endif
}

CssTransformComponent.type = 'CssTransformComponent';

CssTransformComponent.prototype = Object.create(_Component.Component.prototype);
CssTransformComponent.prototype.constructor = CssTransformComponent;

/**
 * Connects a domElement to an entity and applies the transformComponent of the entity to the domElement with CSS3 3D transforms.
 * @param {domElement} domElement
 * @param {boolean} faceCamera
 * @extends Component
 */
exports.CssTransformComponent = mod_CssTransformComponent;