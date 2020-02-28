import {
    ConfigHandler as ConfigHandler_ConfigHandlerjs,
    _registerClass as ConfigHandlerjs__registerClass,
} from "../../loaders/handlers/ConfigHandler";

import { Material as Materialjs } from "../../renderer/Material";
import { ShaderBuilder as ShaderBuilderjs } from "../../renderer/shaders/ShaderBuilder";
import { rsvpjs as rsvp_rsvpjsjs } from "../../util/rsvp";
import { resolve as PromiseUtilsjs_resolve, reject as PromiseUtilsjs_reject } from "../../util/PromiseUtils";
function ShaderHandler() {
	ConfigHandler_ConfigHandlerjs.apply(this, arguments);
}

ShaderHandler.prototype = Object.create(ConfigHandler_ConfigHandlerjs.prototype);
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
		return PromiseUtilsjs_resolve();
	}
	if (!config.vshaderRef) {
		return PromiseUtilsjs_reject('Shader error, missing vertex shader ref');
	}
	if (!config.fshaderRef) {
		return PromiseUtilsjs_reject('Shader error, missing fragment shader ref');
	}

	var promises = [
		this.loadObject(config.vshaderRef, options),
		this.loadObject(config.fshaderRef, options)
	];

	return rsvp_rsvpjsjs.all(promises).then(function (shaders) {
		var vshader = shaders[0];
		var fshader = shaders[1];

		if (!vshader) {
			return PromiseUtilsjs_reject('Vertex shader' + config.vshaderRef + 'in shader' + ref + 'not found');
		}
		if (!fshader) {
			return PromiseUtilsjs_reject('Fragment shader' + config.fshaderRef + 'in shader' + ref + 'not found');
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
				if (ShaderBuilderjs[processor]) {
					shaderDefinition.processors.push(ShaderBuilderjs[processor].processor);
				} else {
					console.error('Unknown processor ' + processor);
				}
			}
		}

		var shader = Materialjs.createShader(shaderDefinition, ref);

		this._objects.set(ref, shader);

		return shader;
	}.bind(this));
};

var exported_ShaderHandler = ShaderHandler;

/**
 * Handler for loading shaders into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { exported_ShaderHandler as ShaderHandler };
