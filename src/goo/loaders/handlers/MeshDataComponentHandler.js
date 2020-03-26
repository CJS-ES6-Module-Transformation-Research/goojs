import { ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs } from "../../loaders/handlers/ComponentHandler";
import {     MeshDataComponent as entitiescomponentsMeshDataComponent_MeshDataComponentjs, } from "../../entities/components/MeshDataComponent";
import { BoundingBox as rendererboundsBoundingBox_BoundingBoxjs } from "../../renderer/bounds/BoundingBox";
import { ShapeCreatorMemoized as utilShapeCreatorMemoized_ShapeCreatorMemoizedjs } from "../../util/ShapeCreatorMemoized";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../../util/rsvp";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
import { StringUtils as utilStringUtils_StringUtilsjs } from "../../util/StringUtils";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
function MeshDataComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'MeshDataComponent';
}

MeshDataComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
MeshDataComponentHandler.prototype.constructor = MeshDataComponentHandler;
loadershandlersComponentHandler_ComponentHandlerjs._registerClass('meshData', MeshDataComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshDataComponentHandler.prototype._prepare = function (config) {
	return utilObjectUtils_ObjectUtilsjs.defaults(config, {
	});
};

/**
 * Create meshdata component.
 * @returns {MeshDataComponent} the created component object
 * @private
 */
MeshDataComponentHandler.prototype._create = function () {
	return new entitiescomponentsMeshDataComponent_MeshDataComponentjs();
};

/**
 * Removes the meshdata component
 * @param {string} ref
 */
MeshDataComponentHandler.prototype._remove = function (entity) {
	//! AT: why is this check needed?
	if (entity.meshDataComponent && entity.meshDataComponent.meshData && this.world.gooRunner) {
		entity.meshDataComponent.meshData.destroy(this.world.gooRunner.renderer.context);
	}
	entity.clearComponent('MeshDataComponent');
};

/**
 * Update engine meshdatacomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
MeshDataComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;
	return loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		component.meshData = null;
		component.currentPose = null;

		if (config.shape) {
			var shapeCreator = utilShapeCreatorMemoized_ShapeCreatorMemoizedjs['create' + utilStringUtils_StringUtilsjs.capitalize(config.shape)];
			if (shapeCreator) {
				component.meshData = shapeCreator(config.shapeOptions, component.meshData);
				component.modelBoundDirty = true;
				return component;
			}
		} else if (config.meshRef) {
			var promises = [];
			// MeshData
			promises.push(that._load(config.meshRef, options).then(function (meshData) {
				component.meshData = meshData;
				if (meshData.boundingBox) {
					var min = meshData.boundingBox.min;
					var max = meshData.boundingBox.max;
					var size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
					var center = new mathVector3_Vector3js(max[0] + min[0], max[1] + min[1], max[2] + min[2]).scale(0.5);
					var bounding = new rendererboundsBoundingBox_BoundingBoxjs(center, size[0] / 2, size[1] / 2, size[2] / 2);
					component.setModelBound(bounding, false);
				}
			}));
			// Skeleton pose
			if (config.poseRef) {
				promises.push(that._load(config.poseRef, options).then(function (pose) {
					component.currentPose = pose;

					entity.traverseUp(function (parentEntity) {
						if (parentEntity.animationComponent) {
							parentEntity.animationComponent._skeletonPose = pose;
						}
					});
				}));
			}
			return utilrsvp_rsvpjsjs.all(promises).then(function () {
				return component;
			});
		} else {
			// No mesh. Need to reset the bounding box.
			component.modelBoundDirty = true;
		}
	});
};

var exported_MeshDataComponentHandler = MeshDataComponentHandler;

/**
 * For handling loading of meshdatacomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { exported_MeshDataComponentHandler as MeshDataComponentHandler };