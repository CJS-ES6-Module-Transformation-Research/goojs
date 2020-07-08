var ShaderHandler_ShaderHandler = ShaderHandler;

import {
    ConfigHandler as loadershandlersConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { Material as rendererMaterial_Materialjs } from "../../renderer/Material";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../../util/rsvp";
import { PromiseUtils as utilPromiseUtils_PromiseUtilsjs } from "../../util/PromiseUtils";
function ShaderHandler() {
	loadershandlersConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

ShaderHandler.prototype = Object.create(loadershandlersConfigHandler_ConfigHandlerjs.prototype);
ShaderHandler.prototype.constructor = ShaderHandler;
ConfigHandlerjs__registerClass('shader', ShaderHandler);

/**
 * Removes a shader
 * @param {ref}
 * @private
 */
ShaderHandler.prototype._remove = function (ref) {
	var shader = this._objects.get(ref);
	if (shader && this.world.gooRunner) {
		shader.destroy(this.world.gooRunner.renderer.context);
		this._objects.delete(ref);
	}
};

/**
 * Adds/updates/removes a shader
 * Currently it is not possible to update a shader, so we create a new one every time
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated shader or null if removed
 */
ShaderHandler.prototype._update = function (ref, config, options) {
	if (!config) {
		this._remove(ref);
		return utilPromiseUtils_PromiseUtilsjs.resolve();
	}
	if (!config.vshaderRef) {
		return utilPromiseUtils_PromiseUtilsjs.reject('Shader error, missing vertex shader ref');
	}
	if (!config.fshaderRef) {
		return utilPromiseUtils_PromiseUtilsjs.reject('Shader error, missing fragment shader ref');
	}

	var promises = [
		this.loadObject(config.vshaderRef, options),
		this.loadObject(config.fshaderRef, options)
	];

	return utilrsvp_rsvpjsjs.all(promises).then(function (shaders) {
		var vshader = shaders[0];
		var fshader = shaders[1];

		if (!vshader) {
			return utilPromiseUtils_PromiseUtilsjs.reject('Vertex shader' + config.vshaderRef + 'in shader' + ref + 'not found');
		}
		if (!fshader) {
			return utilPromiseUtils_PromiseUtilsjs.reject('Fragment shader' + config.fshaderRef + 'in shader' + ref + 'not found');
		}

		var shaderDefinition = {
			defines: config.defines || {},
			attributes: config.attributes || {},
			uniforms: config.uniforms || {},
			vshader: vshader,
			fshader: fshader
		};

		if (config.processors) {
			shaderDefinition.processors = [];
			for (var i = 0; i < config.processors.length; i++) {
				var processor = config.processors[i];
				if (ShaderBuilder[processor]) {
					shaderDefinition.processors.push(ShaderBuilder[processor].processor);
				} else {
					console.error('Unknown processor ' + processor);
				}
			}
		}

		var shader = rendererMaterial_Materialjs.createShader(shaderDefinition, ref);

		this._objects.set(ref, shader);

		return shader;
	}.bind(this));
};

/**
 * Handler for loading shaders into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { ShaderHandler_ShaderHandler as ShaderHandler };
