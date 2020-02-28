Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ShaderHandler = undefined;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _Material = require("../../renderer/Material");

var _ShaderBuilder = require("../../renderer/shaders/ShaderBuilder");

var _rsvp = require("../../util/rsvp");

var _PromiseUtils = require("../../util/PromiseUtils");

function ShaderHandler() {
	_ConfigHandler.ConfigHandler.apply(this, arguments);
}

ShaderHandler.prototype = Object.create(_ConfigHandler.ConfigHandler.prototype);
ShaderHandler.prototype.constructor = ShaderHandler;
(0, _ConfigHandler._registerClass)('shader', ShaderHandler);

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
		return (0, _PromiseUtils.resolve)();
	}
	if (!config.vshaderRef) {
		return (0, _PromiseUtils.reject)('Shader error, missing vertex shader ref');
	}
	if (!config.fshaderRef) {
		return (0, _PromiseUtils.reject)('Shader error, missing fragment shader ref');
	}

	var promises = [this.loadObject(config.vshaderRef, options), this.loadObject(config.fshaderRef, options)];

	return _rsvp.rsvpjs.all(promises).then(function (shaders) {
		var vshader = shaders[0];
		var fshader = shaders[1];

		if (!vshader) {
			return (0, _PromiseUtils.reject)('Vertex shader' + config.vshaderRef + 'in shader' + ref + 'not found');
		}
		if (!fshader) {
			return (0, _PromiseUtils.reject)('Fragment shader' + config.fshaderRef + 'in shader' + ref + 'not found');
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
				if (_ShaderBuilder.ShaderBuilder[processor]) {
					shaderDefinition.processors.push(_ShaderBuilder.ShaderBuilder[processor].processor);
				} else {
					console.error('Unknown processor ' + processor);
				}
			}
		}

		var shader = _Material.Material.createShader(shaderDefinition, ref);

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
exports.ShaderHandler = exported_ShaderHandler;
