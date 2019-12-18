import { Component } from "../../entities/components/Component";
function CssTransformComponent(domElement, faceCamera) {
	Component.apply(this, arguments);

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
	this.faceCamera = (typeof faceCamera === 'undefined') ? false : faceCamera;

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

CssTransformComponent.type = 'CssTransformComponent';

CssTransformComponent.prototype = Object.create(Component.prototype);
CssTransformComponent.prototype.constructor = CssTransformComponent;

var exported_CssTransformComponent = CssTransformComponent;

/**
 * Connects a domElement to an entity and applies the transformComponent of the entity to the domElement with CSS3 3D transforms.
 * @param {domElement} domElement
 * @param {boolean} faceCamera
 * @extends Component
 */
export { exported_CssTransformComponent as CssTransformComponent };
