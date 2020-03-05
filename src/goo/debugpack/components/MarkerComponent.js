"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MarkerComponent = undefined;

var _Component = require("../../entities/components/Component");

var _BoundingVolumeMeshBuilder = require("../../debugpack/BoundingVolumeMeshBuilder");

function MarkerComponent(hostEntity) {
	_Component.Component.apply(this, arguments);

	this.type = 'MarkerComponent';

	var hostModelBound = hostEntity.meshRendererComponent.worldBound;
	//this.meshData = ShapeCreator.createBox(hostModelBound.radius * 2, hostModelBound.radius * 2, hostModelBound.radius * 2);
	this.meshData = _BoundingVolumeMeshBuilder.BoundingVolumeMeshBuilder.build(hostModelBound);
}

MarkerComponent.prototype = Object.create(_Component.Component.prototype);
MarkerComponent.prototype.constructor = MarkerComponent;

var exported_MarkerComponent = MarkerComponent;

/**
 * Holds the necessary data for a marker
 * @param {Entity} entity The entity this component is attached to
 * @extends Component
 */
exports.MarkerComponent = exported_MarkerComponent;
