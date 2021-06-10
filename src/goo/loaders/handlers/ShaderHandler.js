var mod_ShaderHandler = ShaderHandler;
import { ConfigHandler as ConfigHandler_ConfigHandler } from "../../loaders/handlers/ConfigHandler";
import { Material as Material_Material } from "../../renderer/Material";
import { ShaderBuilder as ShaderBuilder_ShaderBuilder } from "../../renderer/shaders/ShaderBuilder";
import { rsvpjs as RSVP } from "../../util/rsvp";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../../util/PromiseUtils";

/**
 * Handler for loading shaders into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function ShaderHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
}

ShaderHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
ShaderHandler.prototype.constructor = ShaderHandler;
ConfigHandler_ConfigHandler._registerClass('shader', ShaderHandler);

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
		return PromiseUtils_PromiseUtils.resolve();
	}
	if (!config.vshaderRef) {
		return PromiseUtils_PromiseUtils.reject('Shader error, missing vertex shader ref');
	}
	if (!config.fshaderRef) {
		return PromiseUtils_PromiseUtils.reject('Shader error, missing fragment shader ref');
	}

	var promises = [
		this.loadObject(config.vshaderRef, options),
		this.loadObject(config.fshaderRef, options)
	];

	return RSVP.all(promises).then(function (shaders) {
		var vshader = shaders[0];
		var fshader = shaders[1];

		if (!vshader) {
			return PromiseUtils_PromiseUtils.reject('Vertex shader' + config.vshaderRef + 'in shader' + ref + 'not found');
		}
		if (!fshader) {
			return PromiseUtils_PromiseUtils.reject('Fragment shader' + config.fshaderRef + 'in shader' + ref + 'not found');
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
				if (ShaderBuilder_ShaderBuilder[processor]) {
					shaderDefinition.processors.push(ShaderBuilder_ShaderBuilder[processor].processor);
				} else {
					console.error('Unknown processor ' + processor);
				}
			}
		}

		var shader = Material_Material.createShader(shaderDefinition, ref);

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
export { mod_ShaderHandler as ShaderHandler };
