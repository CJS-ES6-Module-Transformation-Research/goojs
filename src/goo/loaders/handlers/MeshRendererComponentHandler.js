var mod_MeshRendererComponentHandler = MeshRendererComponentHandler;
import { ComponentHandler as ComponentHandler_ComponentHandler } from "../../loaders/handlers/ComponentHandler";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponent } from "../../entities/components/MeshRendererComponent";
import { Material as Material_Material } from "../../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLib } from "../../renderer/shaders/ShaderLib";
import { rsvpjs as RSVP } from "../../util/rsvp";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";

/**
 * For handling loading of meshrenderercomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
function MeshRendererComponentHandler() {
	ComponentHandler_ComponentHandler.apply(this, arguments);
	this._type = 'MeshRendererComponent';
}

MeshRendererComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandler.prototype);
MeshRendererComponentHandler.prototype.constructor = MeshRendererComponentHandler;
ComponentHandler_ComponentHandler._registerClass('meshRenderer', MeshRendererComponentHandler);

MeshRendererComponentHandler.DEFAULT_MATERIAL = new Material_Material(ShaderLib_ShaderLib.uber, 'Default material');

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshRendererComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils_ObjectUtils.defaults(config, {
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
	return new MeshRendererComponent_MeshRendererComponent();
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

   return ComponentHandler_ComponentHandler.prototype.update.call(this, entity, config, options).then(function (component) {
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
       ObjectUtils_ObjectUtils.forEach(materials, function (item) {
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

/**
 * For handling loading of meshrenderercomponents
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @extends ComponentHandler
 * @hidden
 */
export { mod_MeshRendererComponentHandler as MeshRendererComponentHandler };
