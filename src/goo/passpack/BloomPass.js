import { Material as Materialjs } from "../renderer/Material";
import { camera as FullscreenUtilsjs_camera, quad as FullscreenUtilsjs_quad } from "../renderer/pass/FullscreenUtils";
import { RenderTarget as RenderTargetjs } from "../renderer/pass/RenderTarget";
import { deepClone as ObjectUtilsjs_deepClone } from "../util/ObjectUtils";
import { copyPure as ShaderLibjs_copyPure, convolution as ShaderLibjs_convolution } from "../renderer/shaders/ShaderLib";
import { brightnesscontrast as ShaderLibExtrajs_brightnesscontrast } from "../passpack/ShaderLibExtra";
import { Pass as Pass_Passjs } from "../renderer/pass/Pass";
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
		meshData: FullscreenUtilsjs_quad,
		materials: []
	};

	this.copyMaterial = new Materialjs(ShaderLibjs_copyPure);
	this.copyMaterial.uniforms.opacity = strength;
	this.copyMaterial.blendState.blending = 'AdditiveBlending';

	this.convolutionShader = ObjectUtilsjs_deepClone(ShaderLibjs_convolution);
	this.convolutionShader.defines = {
		'KERNEL_SIZE_FLOAT': kernelSize.toFixed(1),
		'KERNEL_SIZE_INT': kernelSize.toFixed(0)
	};
	this.convolutionMaterial = new Materialjs(this.convolutionShader);
	this.convolutionMaterial.uniforms.uImageIncrement = BloomPass.blurX;
	this.convolutionMaterial.uniforms.cKernel = this.convolutionShader.buildKernel(sigma);

	this.bcMaterial = new Materialjs(ShaderLibExtrajs_brightnesscontrast);
	this.bcMaterial.uniforms.brightness = 0.0;
	this.bcMaterial.uniforms.contrast = 0.0;

	this.enabled = true;
	this.clear = false;
	this.needsSwap = false;
}

BloomPass.prototype = Object.create(Pass_Passjs.prototype);
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
	this.renderTargetX = new RenderTargetjs(sizeX, sizeY);
	this.renderTargetY = new RenderTargetjs(sizeX, sizeY);
};

BloomPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	// Brightness & contrast
	this.renderable.materials[0] = this.bcMaterial;

	this.bcMaterial.setTexture('DIFFUSE_MAP', readBuffer);
	renderer.render(this.renderable, FullscreenUtilsjs_camera, [], this.renderTargetY, true);

	// Blur Y
	this.renderable.materials[0] = this.convolutionMaterial;

	this.convolutionMaterial.setTexture('DIFFUSE_MAP', this.renderTargetY);
	this.convolutionMaterial.uniforms.uImageIncrement = BloomPass.blurY;

	renderer.render(this.renderable, FullscreenUtilsjs_camera, [], this.renderTargetX, true);

	// Blur X
	this.convolutionMaterial.setTexture('DIFFUSE_MAP', this.renderTargetX);
	this.convolutionMaterial.uniforms.uImageIncrement = BloomPass.blurX;

	renderer.render(this.renderable, FullscreenUtilsjs_camera, [], this.renderTargetY, true);

	// Additive blend
	this.renderable.materials[0] = this.copyMaterial;
	this.copyMaterial.setTexture('DIFFUSE_MAP', this.renderTargetY);

	if (this.target !== null) {
		renderer.render(this.renderable, FullscreenUtilsjs_camera, [], this.target, this.clear);
	} else {
		renderer.render(this.renderable, FullscreenUtilsjs_camera, [], readBuffer, this.clear);
	}
};

BloomPass.blurX = [0.001953125, 0.0];
BloomPass.blurY = [0.0, 0.001953125];

var exported_BloomPass = BloomPass;

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
export { exported_BloomPass as BloomPass };