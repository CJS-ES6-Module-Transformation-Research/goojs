"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RenderTarget = undefined;

var _Vector = require("../../math/Vector2");

var _ObjectUtil = require("../../util/ObjectUtil");

function RenderTarget(width, height, options) {
	this.glTexture = null;
	this._glRenderBuffer = null;
	this._glFrameBuffer = null;

	this.width = Math.max(Math.floor(width), 1);
	this.height = Math.max(Math.floor(height), 1);

	_ObjectUtil.ObjectUtils.copyOptions(this, options, {
		wrapS: 'EdgeClamp',
		wrapT: 'EdgeClamp',
		magFilter: 'Bilinear',
		minFilter: 'BilinearNoMipMaps',
		anisotropy: 1,
		format: 'RGBA',
		type: 'UnsignedByte',
		generateMipmaps: false,
		premultiplyAlpha: false,
		unpackAlignment: 1,
		flipY: true,
		depthBuffer: true,
		stencilBuffer: true
	});

	this.variant = '2D'; // CUBE

	this.offset = new _Vector.Vector2(0, 0);
	this.repeat = new _Vector.Vector2(1, 1);

	this.textureRecord = {};
}

RenderTarget.prototype.clone = function () {
	var tmp = new RenderTarget(this.width, this.height);

	tmp.wrapS = this.wrapS;
	tmp.wrapT = this.wrapT;

	tmp.magFilter = this.magFilter;
	tmp.minFilter = this.minFilter;

	tmp.anisotropy = this.anisotropy;

	tmp.format = this.format;
	tmp.type = this.type;
	tmp.variant = this.variant;

	tmp.offset.copy(this.offset);
	tmp.repeat.copy(this.repeat);

	tmp.generateMipmaps = this.generateMipmaps;
	tmp.premultiplyAlpha = this.premultiplyAlpha;
	tmp.unpackAlignment = this.unpackAlignment;
	tmp.flipY = this.flipY;

	tmp.depthBuffer = this.depthBuffer;
	tmp.stencilBuffer = this.stencilBuffer;

	return tmp;
};

/**
 * Returns the number of bytes this render target occupies in memory
 * @returns {number}
 */
RenderTarget.prototype.getSizeInMemory = function () {
	var size = this.width * this.height * 4;

	if (this.generateMipmaps) {
		size = Math.ceil(size * 4 / 3);
	}

	return size;
};

/**
 * Deallocates all allocated resources from the WebGL context.
 * @param  {WebGLRenderingContext} context
 */
RenderTarget.prototype.destroy = function (context) {
	if (this.glTexture) {
		context.deleteTexture(this.glTexture);
		this.glTexture = null;
	}
	if (this._glRenderBuffer) {
		context.deleteRenderbuffer(this._glRenderBuffer);
		this._glRenderBuffer = null;
	}
	if (this._glFrameBuffer) {
		context.deleteFramebuffer(this._glFrameBuffer);
		this._glFrameBuffer = null;
	}
};

var exported_RenderTarget = RenderTarget;

/**
 * Creates a new RenderTarget object
 *
 * Post processing handler
 * @param {number} width Width of rendertarget
 * @param {number} height Height of rendertarget
 * @param {Object} options Options
 */
exports.RenderTarget = exported_RenderTarget;
