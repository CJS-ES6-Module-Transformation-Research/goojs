var mod_TextureHandler = TextureHandler;
import { ConfigHandler as ConfigHandler_ConfigHandler } from "../../loaders/handlers/ConfigHandler";
import { Texture as Texture_Texture } from "../../renderer/Texture";
import { DdsLoader as DdsLoader_DdsLoader } from "../../loaders/dds/DdsLoader";
import { CrunchLoader as CrunchLoader_CrunchLoader } from "../../loaders/crunch/CrunchLoader";
import { TgaLoader as TgaLoader_TgaLoader } from "../../loaders/tga/TgaLoader";
import { PromiseUtils as PromiseUtils_PromiseUtils } from "../../util/PromiseUtils";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../../util/ObjectUtils";
import { CanvasUtils as CanvasUtils_CanvasUtils } from "../../util/CanvasUtils";
import { StringUtils as StringUtils_StringUtils } from "../../util/StringUtils";
import { SystemBusjs as SystemBus } from "../../entities/SystemBus";
import { MathUtils as MathUtils_MathUtils } from "../../math/MathUtils";

/**
 * Handler for loading materials into engine
 * @extends ConfigHandler
 * @param {World} world
 * @param {Function} getConfig
 * @param {Function} updateObject
 * @private
 */
function TextureHandler() {
	ConfigHandler_ConfigHandler.apply(this, arguments);
	SystemBus.addListener('playStateChanged', function (playState) {
		this._objects.forEach(function (texture) {
			if (texture.image && texture.image.play && texture.image.pause) {
				var video = texture.image;
				if (playState === 'play') {
					video.play();
				} else if (playState === 'stop') {
					video.pause();
					video.currentTime = 0;
				} else if (playState === 'pause') {
					video.pause();
				}
			}
		});
	}.bind(this));
}

TextureHandler.prototype = Object.create(ConfigHandler_ConfigHandler.prototype);
TextureHandler.prototype.constructor = TextureHandler;
ConfigHandler_ConfigHandler._registerClass('texture', TextureHandler);

TextureHandler.minFilters = [
	'NearestNeighborNoMipMaps',
	'NearestNeighborNearestMipMap',
	'NearestNeighborLinearMipMap',
	'BilinearNoMipMaps',
	'BilinearNearestMipMap',
	'Trilinear'
];

TextureHandler.magFilters = [
	'NearestNeighbor',
	'Bilinear'
];

TextureHandler.noMipMapAlternatives = {
	'NearestNeighborNoMipMaps': 'NearestNeighborNoMipMaps',
	'NearestNeighborNearestMipMap': 'NearestNeighborNoMipMaps',
	'NearestNeighborLinearMipMap': 'NearestNeighborNoMipMaps',
	'BilinearNoMipMaps': 'BilinearNoMipMaps',
	'BilinearNearestMipMap': 'BilinearNoMipMaps',
	'Trilinear': 'BilinearNoMipMaps'
};

TextureHandler.loaders = {
	dds: DdsLoader_DdsLoader,
	crn: CrunchLoader_CrunchLoader, // TODO: not working atm.
	tga: TgaLoader_TgaLoader
};

// Dummy textures to use while loading image
TextureHandler.WHITE = new Uint8Array([255, 255, 255, 255]);
TextureHandler.BLACK = new Uint8Array([0, 0, 0, 255]);

/**
 * Preparing texture config by populating it with defaults.
 * @param {Object} config
 * @private
 */
TextureHandler.prototype._prepare = function (config) {
	ObjectUtils_ObjectUtils.defaults(config, {
		wrapS: 'Repeat',
		wrapT: 'Repeat',
		magFilter: 'Bilinear',
		minFilter: 'Trilinear',
		anisotropy: 1,
		offset: [0, 0],
		repeat: [1, 1],
		flipY: true,
		lodBias: 0.0,
		loop: true
	});
};

/**
 * Removes a texture
 * @param {string} ref
 * @private
 */
TextureHandler.prototype._remove = function (ref) {
	var texture = this._objects.get(ref);
	if (texture && this.world.gooRunner) {
		texture.destroy(this.world.gooRunner.renderer.context);
	}
	this._objects.delete(ref);
};

/**
 * Creates an empty Texture.
 * @returns {Texture}
 * @private
 */
TextureHandler.prototype._create = function () {
	return new Texture_Texture();
};


TextureHandler.prototype._loadWebSupportedImage = function (texture, config, options) {
	return this.loadObject(config.imageRef, options).then(function (image) {
		if (texture.image !== image) {
			texture.setImage(image);
		}
		return texture;
	});
};

TextureHandler.prototype._loadSpecialImage = function (texture, config, type/*, options*/) {
	// Special (dds, tga, crn)
	var Loader = TextureHandler.loaders[type];
	var imageRef = config.imageRef;
	return this.loadObject(imageRef)
	.then(function (data) {
		if (data && data.preloaded) {
			ObjectUtils_ObjectUtils.extend(texture.image, data.image);
			texture.format = data.format;
			texture.setNeedsUpdate();
			return texture;
		}
		var loader = new Loader();
		loader.load(data, texture, config.flipY, 0, data.byteLength);
		return texture;
	});
};

TextureHandler.prototype._loadVideo = function (texture, config, options) {
	// Video
	return this.loadObject(config.imageRef, options).then(function (video) {
		video.width = video.videoWidth;
		video.height = video.videoHeight;
		video.loop = config.loop !== undefined ? config.loop : true;

		if (!(MathUtils_MathUtils.isPowerOfTwo(video.width) && MathUtils_MathUtils.isPowerOfTwo(video.height))) {
			texture.generateMipmaps = false;
			texture.minFilter = 'BilinearNoMipMaps';
		}
		texture.setImage(video);
		texture.updateCallback = function () {
			return !video.paused;
		};
		if (config.autoPlay !== false && !options.editMode) {
			video.play();
		}
		else {
			video.pause();
			video.currentTime = 0;
		}
		return texture;
	});
};

TextureHandler.prototype._loadImage = function (texture, config, options) {
	var imageRef = config.imageRef;
	var path = StringUtils_StringUtils.parseURL(imageRef).path;
	var type = path.substr(path.lastIndexOf('.') + 1).toLowerCase();
	if (TextureHandler.loaders[type]) {
		return this._loadSpecialImage(texture, config, type, options);
	}
	if (['jpg', 'jpeg', 'png', 'gif'].indexOf(type) !== -1) {
		return this._loadWebSupportedImage(texture, config, options);
	}
	if (['mp4', 'ogv', 'webm'].indexOf(type) !== -1) {
		return this._loadVideo(texture, config, options);
	}

	return PromiseUtils_PromiseUtils.reject(new Error('Unknown image type: ' + type));
};

/**
 * Adds/updates/removes a texture
 * @param {string} ref
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} Resolves with the updated texture or null if removed
 */
TextureHandler.prototype._update = function (ref, config, options) {
	var that = this;
	return ConfigHandler_ConfigHandler.prototype._update.call(this, ref, config, options).then(function (texture) {
		if (!texture) { return; }
		var ret;

		// Wrap
		if (texture.wrapS !== config.wrapS || texture.wrapT !== config.wrapT) {
			texture.setNeedsUpdate();
		}
		texture.wrapS = config.wrapS;
		texture.wrapT = config.wrapT;

		// SH: Why do we need to check this?
		if (TextureHandler.magFilters.indexOf(config.magFilter) !== -1) {
			texture.magFilter = config.magFilter;
		}
		if (TextureHandler.minFilters.indexOf(config.minFilter) !== -1) {
			texture.minFilter = config.generateMipmaps !== false ?
				config.minFilter :
				TextureHandler.noMipMapAlternatives[config.minFilter];
		}

		texture.anisotropy = Math.max(config.anisotropy, 1);

		texture.offset.setDirect(config.offset[0], config.offset[1]);
		texture.repeat.setDirect(config.repeat[0], config.repeat[1]);
		texture.lodBias = config.lodBias;

		if (texture.flipY !== config.flipY) {
			texture.flipY = config.flipY;
			texture.setNeedsUpdate();
		}

		if (texture.generateMipmaps !== config.generateMipmaps) {
			texture.generateMipmaps = config.generateMipmaps !== false;
			texture.setNeedsUpdate();
		}

		texture.updateCallback = null;

		if (config.imageRef) {
			if (!config.lazy) {
				ret = that._loadImage(texture, config, options);
			} else {
				texture.loadImage = function () {
					return that._loadImage(texture, config, options);
				};
				ret = texture;
			}
		} else if (config.svgData) {
			// Load SVG data
			ret = PromiseUtils_PromiseUtils.createPromise(function (resolve, reject) {
				CanvasUtils_CanvasUtils.renderSvgToCanvas(config.svgData, {}, function (canvas) {
					if (canvas) {
						texture.setImage(canvas);
						resolve(texture);
					} else {
						reject('could not render svg to canvas');
					}
				});
			});
		} else {
			// Blank
			// console.warn('Texture ' + ref + ' has no imageRef');
			// texture.setImage(TextureHandler.WHITE, 1, 1);
			ret = texture;
		}
		if (options && options.texture && options.texture.dontwait) {
			return texture;
		} else {
			return ret;
		}
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
export { mod_TextureHandler as TextureHandler };
