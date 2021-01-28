var mod_MarkerComponent = MarkerComponent;
import { Component as Component_Component } from "../../entities/components/Component";
import {  BoundingVolumeMeshBuilder as BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilder, } from "../../debugpack/BoundingVolumeMeshBuilder";

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
function MarkerComponent(hostEntity) {
	Component_Component.apply(this, arguments);

	this.type = 'MarkerComponent';

	var hostModelBound = hostEntity.meshRendererComponent.worldBound;
	//this.meshData = ShapeCreator.createBox(hostModelBound.radius * 2, hostModelBound.radius * 2, hostModelBound.radius * 2);
	this.meshData = BoundingVolumeMeshBuilder_BoundingVolumeMeshBuilder.build(hostModelBound);
}

MarkerComponent.prototype = Object.create(Component_Component.prototype);
MarkerComponent.prototype.constructor = MarkerComponent;

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
export { mod_MarkerComponent as MarkerComponent };