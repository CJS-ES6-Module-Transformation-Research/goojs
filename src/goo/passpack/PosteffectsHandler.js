import { ConfigHandler as ConfigHandlerjs } from "../loaders/handlers/ConfigHandler";
import { ArrayUtils as ArrayUtilsjs } from "../util/ArrayUtils";
import { rsvpjs as rsvp_rsvpjsjs } from "../util/rsvp";
import { ObjectUtils as ObjectUtilsjs } from "../util/ObjectUtils";
import { Composer as Composer_Composerjs } from "../renderer/pass/Composer";
import { RenderPass as RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { ShaderLib as ShaderLibjs } from "../renderer/shaders/ShaderLib";
function PosteffectsHandler() {
	ConfigHandlerjs.apply(this, arguments);
	this._composer = new Composer_Composerjs();
	var renderSystem = this.world.getSystem('RenderSystem');
	this._renderPass = new RenderPassjs(renderSystem.renderList);
	this._outPass = new FullscreenPassjs(ObjectUtilsjs.deepClone(ShaderLibjs.copy));
	this._outPass.renderToScreen = true;
}


PosteffectsHandler.prototype = Object.create(ConfigHandlerjs.prototype);
PosteffectsHandler.prototype.constructor = PosteffectsHandler;
ConfigHandlerjs._registerClass('posteffects', PosteffectsHandler);

/**
 * Removes the posteffects, i e removes the composer from rendersystem.
 * @param {ref}
 */
PosteffectsHandler.prototype._remove = function (ref) {
	var renderSystem = this.world.getSystem('RenderSystem');
	ArrayUtilsjs.remove(renderSystem.composers, this._composer);

	this._objects.delete(ref);

	if (this.world) {
		this._composer.destroy(this.world.gooRunner.renderer);
	}

	this._composer = new Composer_Composerjs();
};

/**
 * Creates an empty array which will hold the posteffects/RenderPasses
 * @returns {Entity}
 * @private
 */
PosteffectsHandler.prototype._create = function () {
	return [];
};

/**
 * Creates/updates/removes a posteffectconfig
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated posteffectsarray or null if removed
 */
PosteffectsHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return ConfigHandlerjs.prototype._update.call(this, ref, config, options).then(function (posteffects) {
		if (!posteffects) { return; }

		var oldEffects = posteffects.slice();
		var promises = [];
		ObjectUtilsjs.forEach(config.posteffects, function (effectConfig) {
			promises.push(that._updateEffect(effectConfig, oldEffects, options));
		}, null, 'sortValue');

		return rsvp_rsvpjsjs.all(promises).then(function (effects) {
			for (var i = 0; i < effects.length; i++) {
				posteffects[i] = effects[i];
			}

			posteffects.length = i;
			return posteffects;
		});
	}).then(function (posteffects) {
		if (!posteffects) { return; }

		var enabled = posteffects.some(function (effect) { return effect.enabled; });
		var renderSystem = that.world.getSystem('RenderSystem');
		var composer = that._composer;

		// If there are any enabled, add them
		if (enabled) {
			composer.passes = [];
			composer.addPass(that._renderPass);
			for (var i = 0; i < posteffects.length; i++) {
				var posteffect = posteffects[i];
				if (posteffect && posteffect.enabled) {
					composer.addPass(posteffects[i], that.world.gooRunner.renderer);
				}
			}
			composer.addPass(that._outPass);
			if (renderSystem.composers.indexOf(composer) === -1) {
				renderSystem.composers.push(composer);
			}
		} else {
			// No posteffects, remove composer
			ArrayUtilsjs.remove(renderSystem.composers, that._composer);
		}

		return posteffects;
	});
};

/**
 * Finds the already created effect from the configs id or creates a new one and updates it
 * according to config
 * @param {Object} config
 * @param {Array<RenderPass>} posteffects array of engine posteffects/Renderpasses
 * @param {Object} options
 * @returns {RenderPass} effect
 */
PosteffectsHandler.prototype._updateEffect = function (originalConfig, posteffects, options) {
	// this gets mutated
	var config = ObjectUtilsjs.deepClone(originalConfig);

	var that = this;
	function loadConfig(key, id) {
		return that._load(id, options).then(function (object) {
			config.options[key] = object;
		});
	}

	// ArrayUtils.find
	var effect;
	for (var i = 0; i < posteffects.length; i++) {
		if (posteffects[i].id === config.id) {
			effect = posteffects[i];
			break;
		}
	}

	if (!effect) {
		if (!PassLib[config.type]) {
			return null;
		}
		effect = new PassLib[config.type](config.id);
	}

	var promises = [];
	for (var i = 0; i < PassLib[config.type].options.length; i++) {
		var option = PassLib[config.type].options[i];
		var key = option.key;
		var type = option.type;

		if (type === 'texture') {
			if (config.options[key] && config.options[key].textureRef && config.options[key].enabled) {
				promises.push(loadConfig(key, config.options[key].textureRef));
			} else {
				config.options[key] = null;
			}
		} else if (type === 'entity') {
			if (config.options[key] && config.options[key].entityRef && config.options[key].enabled) {
				promises.push(loadConfig(key, config.options[key].entityRef));
			} else {
				config.options[key] = null;
			}
		}
	}

	return rsvp_rsvpjsjs.all(promises).then(function () {
		effect.update(config);
		return effect;
	});
};

var exported_PosteffectsHandler = PosteffectsHandler;

/**
 * Handler for loading posteffects into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
export { exported_PosteffectsHandler as PosteffectsHandler };