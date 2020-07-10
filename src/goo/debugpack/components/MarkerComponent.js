var MarkerComponent_MarkerComponent = MarkerComponent;
import { Component as entitiescomponentsComponent_Componentjs } from "../../entities/components/Component";
import {  BoundingVolumeMeshBuilder as debugpackBoundingVolumeMeshBuilder_BoundingVolumeMeshBuilderjs, } from "../../debugpack/BoundingVolumeMeshBuilder";
function MarkerComponent(hostEntity) {
	entitiescomponentsComponent_Componentjs.apply(this, arguments);

	this.type = 'MarkerComponent';

	var hostModelBound = hostEntity.meshRendererComponent.worldBound;
	//this.meshData = ShapeCreator.createBox(hostModelBound.radius * 2, hostModelBound.radius * 2, hostModelBound.radius * 2);
	this.meshData = debugpackBoundingVolumeMeshBuilder_BoundingVolumeMeshBuilderjs.build(hostModelBound);
}

MarkerComponent.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);
MarkerComponent.prototype.constructor = MarkerComponent;

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
export { MarkerComponent_MarkerComponent as MarkerComponent };