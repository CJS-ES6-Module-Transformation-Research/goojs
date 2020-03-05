import { ComponentHandler as ComponentHandler_ComponentHandlerjs } from "../../loaders/handlers/ComponentHandler";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponentjs } from "../../entities/components/MeshRendererComponent";
import { Material as Material_Materialjs } from "../../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLibjs } from "../../renderer/shaders/ShaderLib";
import { rsvpjs as rsvp_rsvpjsjs } from "../../util/rsvp";
import { ObjectUtils as ObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function MeshRendererComponentHandler() {
	ComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._type = 'MeshRendererComponent';
}

MeshRendererComponentHandler.prototype = Object.create(ComponentHandler_ComponentHandlerjs.prototype);
MeshRendererComponentHandler.prototype.constructor = MeshRendererComponentHandler;
ComponentHandler_ComponentHandlerjs._registerClass('meshRenderer', MeshRendererComponentHandler);

MeshRendererComponentHandler.DEFAULT_MATERIAL = new Material_Materialjs(ShaderLib_ShaderLibjs.uber, 'Default material');

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
MeshRendererComponentHandler.prototype._prepare = function (config) {
	return ObjectUtils_ObjectUtilsjs.defaults(config, {
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
	return new MeshRendererComponent_MeshRendererComponentjs();
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

   return ComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
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
       ObjectUtils_ObjectUtilsjs.forEach(materials, function (item) {
           promises.push(that._load(item.materialRef, options));
       }, null, 'sortValue');
       return rsvp_rsvpjsjs.all(promises).then(function (materials) {
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
