var mod_AnimationComponentHandler = AnimationComponentHandler;

import {
    ComponentHandler as ComponentHandler_ComponentHandler,
    _registerClass as ComponentHandlerjs__registerClass,
} from "../../loaders/handlers/ComponentHandler";

import { AnimationComponent as AnimationComponent_AnimationComponent } from "../../animationpack/components/AnimationComponent";
import { rsvpjs as RSVP } from "../../util/rsvp";

/**
 * For handling loading of animation components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function AnimationComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'AnimationComponent';
}

AnimationComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
AnimationComponentHandler.prototype.constructor = AnimationComponentHandler;
ComponentHandlerjs__registerClass('animation', AnimationComponentHandler);

/**
 * Create animation component.
 * @returns {AnimationComponent} the created component object
 * @private
 */
AnimationComponentHandler.prototype._create = function () {
	return new AnimationComponent_AnimationComponent();
};

/**
 * Update engine animation component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
AnimationComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;

	return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		var promises = [];
		var p;

		var poseRef = config.poseRef;
		if (poseRef) {
			p = that._load(poseRef, options).then(function (pose) {
				component._skeletonPose = pose;
			});
			promises.push(p);
		}

		var layersRef = config.layersRef;
		if (layersRef) {
			p = that._load(layersRef, options).then(function (layers) {
				component.layers = layers;
				component._layersId = layersRef;
			});
			promises.push(p);
		}
		return RSVP.all(promises).then(function () {
			return component;
		});
	});
};

/**
 * For handling loading of animation components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { mod_AnimationComponentHandler as AnimationComponentHandler };
