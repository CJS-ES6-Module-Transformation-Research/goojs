var MaterialHandler_MaterialHandler = MaterialHandler;

import {
    ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { Material as rendererMaterial_Materialjs } from "../../renderer/Material";
import { texturedLit as ShaderLibjs_texturedLit } from "../../renderer/shaders/ShaderLib";
import { TRANSPARENT as RenderQueuejs_TRANSPARENT } from "../../renderer/RenderQueue";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../../util/rsvp";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function MaterialHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

MaterialHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
MaterialHandler.prototype.constructor = MaterialHandler;
ConfigHandlerjs__registerClass('material', MaterialHandler);

MaterialHandler.ENGINE_SHADER_PREFIX = 'GOO_ENGINE_SHADERS/';

/**
 * Preparing material config by populating it with defaults.
 * @param {Object} config
 * @private
 */
MaterialHandler.prototype._prepare = function (config) {
	utilObjectUtils_ObjectUtilsjs.defaults(config, {
		blendState: {},
		cullState: {},
		depthState: {},
		renderQueue: -1,
		dualTransparency: false,
		wireframe: false,
		flat: false
	});

	utilObjectUtils_ObjectUtilsjs.defaults(config.blendState, {
		blending: 'NoBlending',
		blendEquation: 'AddEquation',
		blendSrc: 'SrcAlphaFactor',
		blendDst: 'OneMinusSrcAlphaFactor'
	});

	utilObjectUtils_ObjectUtilsjs.defaults(config.cullState, {
		enabled: true,
		cullFace: 'Back',
		frontFace: 'CCW'
	});

	utilObjectUtils_ObjectUtilsjs.defaults(config.depthState, {
		enabled: true,
		write: true
	});
};

/**
 * Creates a (somewhat) empty material.
 * @returns {Material}
 * @private
 */
MaterialHandler.prototype._create = function () {
	return new rendererMaterial_Materialjs();
};

MaterialHandler.prototype._remove = function (ref) {
	var material = this._objects.get(ref);
	if (!material) {
		return;
	}
	// material.shader.destroy(); // don't destroy the shader; it may be used by some other material
	material.empty();
	this._objects.delete(ref);
};

/**
 * Adds/updates/removes a a material
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated material or null if removed
 */
MaterialHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return loadershandlersConfigHandler_ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (material) {
		if (!material) { return; }

		var promises = [];

		// Material settings
		utilObjectUtils_ObjectUtilsjs.extend(material.blendState, config.blendState);
		utilObjectUtils_ObjectUtilsjs.extend(material.cullState, config.cullState);
		utilObjectUtils_ObjectUtilsjs.extend(material.depthState, config.depthState);

		material.id = config.id;
		material.name = config.name;
		material.wireframe = config.wireframe;
		material.flat = config.flat;
		material.dualTransparency = config.dualTransparency;

		if (config.renderQueue === -1) {
			if (config.blendState.blending !== 'NoBlending') {
				material.renderQueue = RenderQueuejs_TRANSPARENT;
			} else {
				material.renderQueue = null;
			}
		} else {
			material.renderQueue = config.renderQueue;
		}

		material.uniforms = {};
		for (var name in config.uniforms) {
			if (config.uniforms[name].enabled === undefined) {
				material.uniforms[name] = utilObjectUtils_ObjectUtilsjs.clone(config.uniforms[name]);
			} else if (config.uniforms[name].enabled) {
				material.uniforms[name] = utilObjectUtils_ObjectUtilsjs.clone(config.uniforms[name].value);
			}
		}

		// Patch color uniforms
		if (material.uniforms.materialDiffuse !== undefined) {
			material.uniforms.materialDiffuse[3] = 1;
		}
		if (material.uniforms.materialAmbient !== undefined) {
			material.uniforms.materialAmbient[3] = 1;
		}
		if (material.uniforms.materialEmissive !== undefined) {
			material.uniforms.materialEmissive[3] = 1;
		}

		// TODO: This is a temporary hack until we fully moved shininess into the last entry of specular [r, g, b, spec_power]
		if (material.uniforms.materialSpecular !== undefined && material.uniforms.materialSpecularPower !== undefined) {
			material.uniforms.materialSpecular[3] = material.uniforms.materialSpecularPower;
		}

		// Shader
		var shaderRef = config.shaderRef;
		if (!shaderRef) {
			material.shader = rendererMaterial_Materialjs.createShader(ShaderLibjs_texturedLit, 'DefaultShader');
		}
		else if (shaderRef.indexOf(MaterialHandler.ENGINE_SHADER_PREFIX) === 0) {
			var shaderName = shaderRef.slice(MaterialHandler.ENGINE_SHADER_PREFIX.length);
			material.shader = rendererMaterial_Materialjs.createShader(renderershadersShaderLib_ShaderLibjs[shaderName]);
		} else {
			var p = that._load(shaderRef, options).then(function (shader) {
				material.shader = shader;
			}).then(null, function (err) {
				throw new Error('Error loading shader: ' + err);
			});
			promises.push(p);
		}

		// Textures
		function addTexture(type, ref, options) {
			return that._load(ref, options).then(function (texture) {
				material.setTexture(type, texture);
			}).then(null, function (err) {
				throw new Error('Error loading texture: ' + ref + ' - ' + err);
			});
		}
		var textureRef;
		for (var type in config.texturesMapping) {
			textureRef = config.texturesMapping[type];
			if (!textureRef || !textureRef.textureRef || textureRef.enabled === false) {
				material.removeTexture(type);
			} else {
				promises.push(addTexture(type, textureRef.textureRef, options));
			}
		}
		for (var type in material._textureMaps) {
			if (!config.texturesMapping[type]) {
				material.removeTexture(type);
			}
		}
		return utilrsvp_rsvpjsjs.all(promises).then(function () {
			return material;
		});
	});
};

/**
 * Handler for loading materials into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { MaterialHandler_MaterialHandler as MaterialHandler };
