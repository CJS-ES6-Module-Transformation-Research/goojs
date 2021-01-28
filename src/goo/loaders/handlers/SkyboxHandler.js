"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SkyboxHandler = undefined;

var _ConfigHandler = require("../../loaders/handlers/ConfigHandler");

var _EnvironmentHandler = require("../../loaders/handlers/EnvironmentHandler");

var _Texture = require("../../renderer/Texture");

var _ShaderBuilder = require("../../renderer/shaders/ShaderBuilder");

var _Skybox = require("../../util/Skybox");

var _rsvp = require("../../util/rsvp");

var _PromiseUtils = require("../../util/PromiseUtils");

var _SystemBus = require("../../entities/SystemBus");

var mod_SkyboxHandler = SkyboxHandler;

function SkyboxHandler() {
	_ConfigHandler.ConfigHandler.apply(this, arguments);

	this._activeSkyboxRef = null;

	// Skybox entity
	var skybox = new _Skybox.Skybox('box', [], null, 0);
	this._skybox = this.world.createEntity(skybox.meshData, skybox.materials[0], skybox.transform);
	this._skybox.transformComponent.sync();
	this._skybox.isSkybox = true;
	this._skybox.name = 'Skybox_box';

	// Skybox texture
	this._skyboxTexture = new _Texture.Texture(null, { flipY: false });
	this._skyboxTexture.variant = 'CUBE';
	this._skyboxTexture.wrapS = 'EdgeClamp';
	this._skyboxTexture.wrapT = 'EdgeClamp';
	this._skybox.meshRendererComponent.materials[0].setTexture('DIFFUSE_MAP', this._skyboxTexture);

	// Skysphere entity
	var skysphere = new _Skybox.Skybox('sphere', [], null, 0);
	this._skysphere = this.world.createEntity(skysphere.meshData, skysphere.materials[0], skysphere.transform);
	this._skysphere.transformComponent.sync();
	this._skysphere.isSkybox = true;
	this._skysphere.name = 'Skybox_sphere';

	// Skysphere texture
	this._skysphereTexture = new _Texture.Texture(null, { flipY: false, wrapS: 'EdgeClamp', wrapT: 'EdgeClamp' });
	this._skysphere.meshRendererComponent.materials[0].setTexture('DIFFUSE_MAP', this._skysphereTexture);

	this._activeSkyshape = null;
}

SkyboxHandler.prototype = Object.create(_ConfigHandler.ConfigHandler.prototype);
SkyboxHandler.prototype.constructor = SkyboxHandler;
_ConfigHandler.ConfigHandler._registerClass('skybox', SkyboxHandler);

SkyboxHandler.prototype._remove = function (ref) {
	this._objects.delete(ref);

	// We can only remove the skybox if it is the one that is currently
	// active. Otherwise the scene will be left with no skybox in cases
	// where it shouldn't be.
	if (this._activeSkyboxRef === ref) {
		this._hide(this._skybox);
		this._hide(this._skysphere);
		this._skyboxTexture.setImage(null);
		this._activeSkyshape = null;
		_ShaderBuilder.ShaderBuilder.SKYBOX = null;
		_ShaderBuilder.ShaderBuilder.SKYSPHERE = null;
		this._activeSkyboxRef = null;
	}
};

SkyboxHandler.prototype._create = function () {
	return {
		textures: [],
		enabled: false
	};
};

SkyboxHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return _ConfigHandler.ConfigHandler.prototype._update.call(this, ref, config, options).then(function (skybox) {
		if (!skybox) {
			return _PromiseUtils.PromiseUtils.resolve([]);
		}

		var promises = [];
		if (config.box) {
			promises.push(that._updateBox(ref, config.box, options, skybox));
		}
		if (config.sphere) {
			promises.push(that._updateSphere(ref, config.sphere, options, skybox));
		}

		return _rsvp.rsvpjs.all(promises).then(function (skyboxes) {
			if (config.box || config.sphere) {
				that._activeSkyboxRef = ref;
			}

			return skyboxes;
		});
	});
};

SkyboxHandler.prototype._updateSphere = function (ref, config, options, skybox) {
	var that = this;

	if (config.sphereRef) {
		return this._load(config.sphereRef, options).then(function (texture) {
			if (!texture || !texture.image) {
				_SystemBus.SystemBusjs.emit('goo.error.skybox', {
					type: 'Sphere',
					message: 'The skysphere needs an image to display.'
				});
				that._hide(that._skysphere);
				return;
			}

			// Check if skybox is the same
			if (texture === skybox.textures[0] && that._activeSkyshape === that._skysphere) {
				return that._skysphere;
			}

			if (ref === _EnvironmentHandler.EnvironmentHandler.currentSkyboxRef && config.enabled) {
				var skyTex = that._skysphereTexture;
				skybox.textures = [texture];
				skyTex.setImage(texture.image);

				that._show(that._skysphere);
			} else if (!config.enabled) {
				that._hide(that._skysphere);
			}
			return that._skysphere;
		});
	} else {
		that._skysphereTexture.setImage(null);
		that._hide(that._skysphere);
	}
	return _PromiseUtils.PromiseUtils.resolve(that._skysphere);
};

var sides = ['rightRef', 'leftRef', 'topRef', 'bottomRef', 'frontRef', 'backRef'];

//! AT: this can definitely be moved elsewhere
function isEqual(a, b) {
	var len = a.length;
	if (len !== b.length) {
		return false;
	}
	while (len--) {
		if (a[len] !== b[len]) {
			return false;
		}
	}
	return true;
}

SkyboxHandler.prototype._updateBox = function (ref, config, options, skybox) {
	var that = this;

	var promises = sides.map(function (side) {
		return config[side] ? that._load(config[side], options) : _PromiseUtils.PromiseUtils.resolve();
	});

	// Load all textures
	return _rsvp.rsvpjs.all(promises).then(function (textures) {
		// Check if skybox is the same
		if (isEqual(textures, skybox.textures) && that._activeSkyshape === that._skybox) {
			return that._skybox;
		}

		var images = textures.map(function (texture) {
			return texture ? texture.image : null;
		});

		// If no textures were found, clear skybox and return
		if (images.filter(Boolean).length === 0) {
			that._skyboxTexture.setImage(null);
			that._hide(that._skybox);
			return that._skybox;
		}

		var w = 1;
		var h = 1;
		for (var i = 0; i < images.length; i++) {
			if (images[i]) {
				w = Math.max(w, images[i].width);
				h = Math.max(h, images[i].width);
			}
		}

		if (ref === _EnvironmentHandler.EnvironmentHandler.currentSkyboxRef && config.enabled) {
			skybox.textures = textures;
			var skyTex = that._skyboxTexture;
			skyTex.setImage(images);
			skyTex.image.width = w;
			skyTex.image.height = h;
			skyTex.image.dataReady = true;
			skyTex.setNeedsUpdate();

			that._show(that._skybox);
		} else if (!config.enabled) {
			that._hide(that._skybox);
		}

		return that._skybox;
	});
};

SkyboxHandler.prototype._hide = function (skyshape) {
	var renderSystem = this.world.getSystem('RenderSystem');
	renderSystem.removed(skyshape);
	if (skyshape === this._skybox) {
		_ShaderBuilder.ShaderBuilder.SKYBOX = null;
	} else if (skyshape === this._skysphere) {
		_ShaderBuilder.ShaderBuilder.SKYSPHERE = null;
	}
};

SkyboxHandler.prototype._show = function (skyshape) {
	var renderSystem = this.world.getSystem('RenderSystem');
	if (this._activeSkyshape) {
		renderSystem.removed(this._activeSkyshape);
	}
	renderSystem.added(skyshape);
	this._activeSkyshape = skyshape;
	_ShaderBuilder.ShaderBuilder.SKYBOX = skyshape === this._skybox ? this._skyboxTexture : null;
	_ShaderBuilder.ShaderBuilder.SKYSPHERE = skyshape === this._skysphere ? this._skysphereTexture : null;
};

exports.SkyboxHandler = mod_SkyboxHandler;