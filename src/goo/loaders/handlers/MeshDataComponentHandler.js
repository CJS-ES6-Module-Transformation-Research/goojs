var mod_MeshDataComponentHandler = MeshDataComponentHandler;

import {
    ComponentHandler as ComponentHandler_ComponentHandler,
    _registerClass as ComponentHandlerjs__registerClass,
} from "../../loaders/handlers/ComponentHandler";

import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../entities/components/MeshDataComponent";
import { BoundingBox as BoundingBox_BoundingBox } from "../../renderer/bounds/BoundingBox";
import { ShapeCreatorMemoized as ShapeCreatorMemoized_ShapeCreatorMemoized } from "../../util/ShapeCreatorMemoized";
import { rsvpjs as RSVP } from "../../util/rsvp";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";
import { StringUtils as StringUtils_StringUtils } from "../../util/StringUtils";
import { Vector3 as Vector3_Vector3 } from "../../math/Vector3";

/**
 * For handling loading of meshdatacomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function MeshDataComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'MeshDataComponent';
}

MeshDataComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
MeshDataComponentHandler.prototype.constructor = MeshDataComponentHandler;
ComponentHandlerjs__registerClass('meshData', MeshDataComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshDataComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils_ObjectUtils.defaults(config, {
	});
};

/**
 * Create meshdata component.
 * @returns {MeshDataComponent} the created component object
 * @private
 */
MeshDataComponentHandler.prototype._create = function () {
	return new MeshDataComponent_MeshDataComponent();
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
	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		component.meshData = null;
		component.currentPose = null;

		if (config.shape) {
			var shapeCreator = ShapeCreatorMemoized_ShapeCreatorMemoized['create' + StringUtils_StringUtils.capitalize(config.shape)];
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
					var center = new Vector3_Vector3(max[0] + min[0], max[1] + min[1], max[2] + min[2]).scale(0.5);
					var bounding = new BoundingBox_BoundingBox(center, size[0] / 2, size[1] / 2, size[2] / 2);
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
			return RSVP.all(promises).then(function () {
				return component;
			});
		} else {
			// No mesh. Need to reset the bounding box.
			component.modelBoundDirty = true;
		}
	});
};

/**
 * For handling loading of meshdatacomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { mod_MeshDataComponentHandler as MeshDataComponentHandler };