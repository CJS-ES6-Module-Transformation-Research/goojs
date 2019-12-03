import { Component } from "../../entities/components/Component";
import * as BoundingVolumeMeshBuilder from "../../debugpack/BoundingVolumeMeshBuilder";
var exported_MarkerComponent = MarkerComponent;
function MarkerComponent(hostEntity) {
	Component.apply(this, arguments);

	this.type = 'MarkerComponent';

	var hostModelBound = hostEntity.meshRendererComponent.worldBound;
	//this.meshData = ShapeCreator.createBox(hostModelBound.radius * 2, hostModelBound.radius * 2, hostModelBound.radius * 2);
	this.meshData = BoundingVolumeMeshBuilder.build(hostModelBound);
}

MarkerComponent.prototype = Object.create(Component.prototype);
MarkerComponent.prototype.constructor = MarkerComponent;

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
export { exported_MarkerComponent as MarkerComponent };