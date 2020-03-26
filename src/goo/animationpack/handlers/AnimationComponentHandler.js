import { ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs } from "../../loaders/handlers/ComponentHandler";
import {     AnimationComponent as animationpackcomponentsAnimationComponent_AnimationComponentjs, } from "../../animationpack/components/AnimationComponent";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../../util/rsvp";
function AnimationComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'AnimationComponent';
}

AnimationComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
AnimationComponentHandler.prototype.constructor = AnimationComponentHandler;
loadershandlersComponentHandler_ComponentHandlerjs._registerClass('animation', AnimationComponentHandler);

/**
 * Create animation component.
 * @returns {AnimationComponent} the created component object
 * @private
 */
AnimationComponentHandler.prototype._create = function () {
	return new animationpackcomponentsAnimationComponent_AnimationComponentjs();
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

	return loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
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
		return utilrsvp_rsvpjsjs.all(promises).then(function () {
			return component;
		});
	});
};

var exported_AnimationComponentHandler = AnimationComponentHandler;

/**
 * For handling loading of animation components
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { exported_AnimationComponentHandler as AnimationComponentHandler };
