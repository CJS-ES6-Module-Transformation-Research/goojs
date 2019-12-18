import { ComponentHandler } from "../../loaders/handlers/ComponentHandler";
import { MeshRendererComponent } from "../../entities/components/MeshRendererComponent";
import { Material } from "../../renderer/Material";
import * as ShaderLib from "../../renderer/shaders/ShaderLib";
import { anonymus as RSVP } from "../../util/rsvp";
import * as ObjectUtils from "../../util/ObjectUtils";
function MeshRendererComponentHandler() {
	ComponentHandler.apply(this, arguments);
	this._type = 'MeshRendererComponent';
}

MeshRendererComponentHandler.prototype = Object.create(ComponentHandler.prototype);
MeshRendererComponentHandler.prototype.constructor = MeshRendererComponentHandler;
ComponentHandler._registerClass('meshRenderer', MeshRendererComponentHandler);

MeshRendererComponentHandler.DEFAULT_MATERIAL = new Material(ShaderLib.uber, 'Default material');

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshRendererComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils.defaults(config, {
		cullMode: 'Dynamic',
		castShadows: true,
		receiveShadows: true,
		reflectable: true
	});
};

/**
 * Create meshrenderer component.
 * @returns {MeshRendererComponent} the created component object
 * @private
 */
MeshRendererComponentHandler.prototype._create = function () {
	return new MeshRendererComponent();
};

/**
 * Update engine meshrenderercomponent object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
MeshRendererComponentHandler.prototype.update = function (entity, config, options) {
   var that = this;

   return ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
       if (!component) { return; }
       // Component settings
       component.cullMode = config.cullMode;
       component.castShadows = config.castShadows;
       component.receiveShadows = config.receiveShadows;
       component.isReflectable = config.reflectable;
       //component.isPickable = config.pickable;

       // Materials
       var materials = config.materials;
       if (!materials || !Object.keys(materials).length) {
           var selectionMaterial = component.materials.filter(function (material) {
               return material.name === 'gooSelectionIndicator';
           });
           component.materials = [MeshRendererComponentHandler.DEFAULT_MATERIAL].concat(selectionMaterial);
           return component;
       }

       var promises = [];
       ObjectUtils.forEach(materials, function (item) {
           promises.push(that._load(item.materialRef, options));
       }, null, 'sortValue');
       return RSVP.all(promises).then(function (materials) {
           var selectionMaterial = component.materials.filter(function (material) {
               return material.name === 'gooSelectionIndicator';
           });
           component.materials = materials.concat(selectionMaterial);
           return component;
       });
   });
};

var exported_MeshRendererComponentHandler = MeshRendererComponentHandler;

/**
 * For handling loading of meshrenderercomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { exported_MeshRendererComponentHandler as MeshRendererComponentHandler };
