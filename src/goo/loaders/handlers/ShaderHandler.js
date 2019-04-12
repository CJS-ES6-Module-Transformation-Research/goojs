Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ShaderHandler;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _ConfigHandler2 = _interopRequireDefault(_ConfigHandler);

var _Material = require("../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _ShaderBuilder = require("../../renderer/shaders/ShaderBuilder");

var _ShaderBuilder2 = _interopRequireDefault(_ShaderBuilder);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

var _PromiseUtils = require("../../util/PromiseUtils");

var _PromiseUtils2 = _interopRequireDefault(_PromiseUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Handler for loading shaders into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function ShaderHandler() {
	_ConfigHandler2.default.apply(this, arguments);
}

ShaderHandler.prototype = Object.create(_ConfigHandler2.default.prototype);
ShaderHandler.prototype.constructor = ShaderHandler;
_ConfigHandler2.default._registerClass('shader', ShaderHandler);

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
		return _PromiseUtils2.default.resolve();
	}
	if (!config.vshaderRef) {
		return _PromiseUtils2.default.reject('Shader error, missing vertex shader ref');
	}
	if (!config.fshaderRef) {
		return _PromiseUtils2.default.reject('Shader error, missing fragment shader ref');
	}

	var promises = [this.loadObject(config.vshaderRef, options), this.loadObject(config.fshaderRef, options)];

	return _rsvp2.default.all(promises).then(function (shaders) {
		var vshader = shaders[0];
		var fshader = shaders[1];

		if (!vshader) {
			return _PromiseUtils2.default.reject('Vertex shader' + config.vshaderRef + 'in shader' + ref + 'not found');
		}
		if (!fshader) {
			return _PromiseUtils2.default.reject('Fragment shader' + config.fshaderRef + 'in shader' + ref + 'not found');
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
				if (_ShaderBuilder2.default[processor]) {
					shaderDefinition.processors.push(_ShaderBuilder2.default[processor].processor);
				} else {
					console.error('Unknown processor ' + processor);
				}
			}
		}

		var shader = _Material2.default.createShader(shaderDefinition, ref);

		this._objects.set(ref, shader);

		return shader;
	}.bind(this));
};
module.exports = exports.default;
