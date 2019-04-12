Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = BloomPass;

var _Material = require("../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _FullscreenUtils = require("../renderer/pass/FullscreenUtils");

var _FullscreenUtils2 = _interopRequireDefault(_FullscreenUtils);

var _RenderTarget = require("../renderer/pass/RenderTarget");

var _RenderTarget2 = _interopRequireDefault(_RenderTarget);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _ShaderLib = require("../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _ShaderLibExtra = require("../passpack/ShaderLibExtra");

var _ShaderLibExtra2 = _interopRequireDefault(_ShaderLibExtra);

var _Pass = require("../renderer/pass/Pass");

var _Pass2 = _interopRequireDefault(_Pass);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @example-link http://code.gooengine.com/latest/visual-test/goo/passpack/BloomPass/BloomPass-vtest.html Working example
 * <pre>
 * settings: {
 *     strength: 1.0,
 *     sigma: 4.0,
 *     sizeX: 256,
 *     sizeY: 256
 * }
 * </pre>
 */
function BloomPass(settings) {
	settings = settings || {};

	this.target = settings.target !== undefined ? settings.target : null;
	var strength = settings.strength !== undefined ? settings.strength : 0.0;
	var sigma = settings.sigma !== undefined ? settings.sigma : 4.0;
	var kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;
	this.downsampleAmount = settings.downsampleAmount !== undefined ? Math.max(settings.downsampleAmount, 1) : 4;

	var width = window.innerWidth || 1024;
	var height = window.innerHeight || 1024;
	this.updateSize({
		x: 0,
		y: 0,
		width: width,
		height: height
	});

	this.renderable = {
		meshData: _FullscreenUtils2.default.quad,
		materials: []
	};

	this.copyMaterial = new _Material2.default(_ShaderLib2.default.copyPure);
	this.copyMaterial.uniforms.opacity = strength;
	this.copyMaterial.blendState.blending = 'AdditiveBlending';

	this.convolutionShader = _ObjectUtils2.default.deepClone(_ShaderLib2.default.convolution);
	this.convolutionShader.defines = {
		'KERNEL_SIZE_FLOAT': kernelSize.toFixed(1),
		'KERNEL_SIZE_INT': kernelSize.toFixed(0)
	};
	this.convolutionMaterial = new _Material2.default(this.convolutionShader);
	this.convolutionMaterial.uniforms.uImageIncrement = BloomPass.blurX;
	this.convolutionMaterial.uniforms.cKernel = this.convolutionShader.buildKernel(sigma);

	this.bcMaterial = new _Material2.default(_ShaderLibExtra2.default.brightnesscontrast);
	this.bcMaterial.uniforms.brightness = 0.0;
	this.bcMaterial.uniforms.contrast = 0.0;

	this.enabled = true;
	this.clear = false;
	this.needsSwap = false;
}

BloomPass.prototype = Object.create(_Pass2.default.prototype);
BloomPass.prototype.constructor = BloomPass;

BloomPass.prototype.destroy = function (renderer) {
	if (this.renderTargetX) {
		this.renderTargetX.destroy(renderer.context);
	}
	if (this.renderTargetY) {
		this.renderTargetY.destroy(renderer.context);
	}
	this.convolutionMaterial.shader.destroy();
	this.copyMaterial.shader.destroy();
	this.bcMaterial.shader.destroy();
};

BloomPass.prototype.invalidateHandles = function (renderer) {
	renderer.invalidateMaterial(this.convolutionMaterial);
	renderer.invalidateMaterial(this.copyMaterial);
	renderer.invalidateMaterial(this.convolutionMaterial);
	renderer.invalidateMaterial(this.bcMaterial);
	renderer.invalidateRenderTarget(this.renderTargetX);
	renderer.invalidateRenderTarget(this.renderTargetY);
	renderer.invalidateMeshData(this.renderable.meshData);
};

BloomPass.prototype.updateSize = function (size, renderer) {
	var sizeX = size.width / this.downsampleAmount;
	var sizeY = size.height / this.downsampleAmount;
	if (this.renderTargetX) {
		this.renderTargetX.destroy(renderer.context);
	}
	if (this.renderTargetY) {
		this.renderTargetY.destroy(renderer.context);
	}
	this.renderTargetX = new _RenderTarget2.default(sizeX, sizeY);
	this.renderTargetY = new _RenderTarget2.default(sizeX, sizeY);
};

BloomPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	// Brightness & contrast
	this.renderable.materials[0] = this.bcMaterial;

	this.bcMaterial.setTexture('DIFFUSE_MAP', readBuffer);
	renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], this.renderTargetY, true);

	// Blur Y
	this.renderable.materials[0] = this.convolutionMaterial;

	this.convolutionMaterial.setTexture('DIFFUSE_MAP', this.renderTargetY);
	this.convolutionMaterial.uniforms.uImageIncrement = BloomPass.blurY;

	renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], this.renderTargetX, true);

	// Blur X
	this.convolutionMaterial.setTexture('DIFFUSE_MAP', this.renderTargetX);
	this.convolutionMaterial.uniforms.uImageIncrement = BloomPass.blurX;

	renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], this.renderTargetY, true);

	// Additive blend
	this.renderable.materials[0] = this.copyMaterial;
	this.copyMaterial.setTexture('DIFFUSE_MAP', this.renderTargetY);

	if (this.target !== null) {
		renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], this.target, this.clear);
	} else {
		renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], readBuffer, this.clear);
	}
};

BloomPass.blurX = [0.001953125, 0.0];
BloomPass.blurY = [0.0, 0.001953125];
module.exports = exports.default;
