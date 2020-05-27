var BlurPass_BlurPass = BlurPass;
import { Material as rendererMaterial_Materialjs } from "../renderer/Material";
import { FullscreenUtils as rendererpassFullscreenUtils_FullscreenUtilsjs } from "../renderer/pass/FullscreenUtils";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../renderer/shaders/ShaderLib";
import { Pass as rendererpassPass_Passjs } from "../renderer/pass/Pass";
function BlurPass(settings) {
	settings = settings || {};

	this.target = settings.target !== undefined ? settings.target : null;
	var strength = settings.strength !== undefined ? settings.strength : 1.0;
	var sigma = settings.sigma !== undefined ? settings.sigma : 4.0;
	var kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;
	this.downsampleAmount = settings.downsampleAmount !== undefined ? Math.max(settings.downsampleAmount, 1) : 4;

	this.blurX = [0.001953125, 0.0];
	this.blurY = [0.0, 0.001953125];

	var width = window.innerWidth || 1024;
	var height = window.innerHeight || 1024;
	this.updateSize({
		x: 0,
		y: 0,
		width: width,
		height: height
	});

	this.renderable = {
		meshData: rendererpassFullscreenUtils_FullscreenUtilsjs.quad,
		materials: []
	};

	this.copyMaterial = new rendererMaterial_Materialjs(renderershadersShaderLib_ShaderLibjs.copyPure);
	this.copyMaterial.uniforms.opacity = strength;
	this.copyMaterial.blendState.blending = 'CustomBlending';

	this.convolutionShader = utilObjectUtils_ObjectUtilsjs.deepClone(renderershadersShaderLib_ShaderLibjs.convolution);
	this.convolutionShader.defines = {
		'KERNEL_SIZE_FLOAT': kernelSize.toFixed(1),
		'KERNEL_SIZE_INT': kernelSize.toFixed(0)
	};
	this.convolutionShader.uniforms.uImageIncrement = this.blurX;
	this.convolutionShader.uniforms.cKernel = this.convolutionShader.buildKernel(sigma);
	this.convolutionMaterial = new rendererMaterial_Materialjs(this.convolutionShader);

	this.enabled = true;
	this.clear = false;
	this.needsSwap = false;
}

BlurPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
BlurPass.prototype.constructor = BlurPass;

BlurPass.prototype.destroy = function (renderer) {
	if (this.renderTargetX) {
		this.renderTargetX.destroy(renderer.context);
	}
	if (this.renderTargetY) {
		this.renderTargetY.destroy(renderer.context);
	}
	this.convolutionMaterial.shader.destroy();
	this.copyMaterial.shader.destroy();
};

BlurPass.prototype.invalidateHandles = function (renderer) {
	renderer.invalidateMaterial(this.convolutionMaterial);
	renderer.invalidateMaterial(this.copyMaterial);
	renderer.invalidateRenderTarget(this.renderTargetX);
	renderer.invalidateRenderTarget(this.renderTargetY);
	renderer.invalidateMeshData(this.renderable.meshData);
};

BlurPass.prototype.updateSize = function (size, renderer) {
	var sizeX = size.width / this.downsampleAmount;
	var sizeY = size.height / this.downsampleAmount;
	if (this.renderTargetX) {
		renderer._deallocateRenderTarget(this.renderTargetX);
	}
	if (this.renderTargetY) {
		renderer._deallocateRenderTarget(this.renderTargetY);
	}
	this.renderTargetX = new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY);
	this.renderTargetY = new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY);
};

BlurPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	this.renderable.materials[0] = this.convolutionMaterial;

	this.convolutionMaterial.setTexture('DIFFUSE_MAP', readBuffer);
	this.convolutionMaterial.uniforms.uImageIncrement = this.blurY;

	renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.renderTargetX, true);

	this.convolutionMaterial.setTexture('DIFFUSE_MAP', this.renderTargetX);
	this.convolutionMaterial.uniforms.uImageIncrement = this.blurX;

	renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.renderTargetY, true);

	this.renderable.materials[0] = this.copyMaterial;
	this.copyMaterial.setTexture('DIFFUSE_MAP', this.renderTargetY);

	if (this.target !== null) {
		renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.target, this.clear);
	} else {
		renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], readBuffer, this.clear);
	}
};

/**
 * <pre>
 * settings: {
 *     target: null,
 *     strength: 1.0,
 *     sigma: 4.0,
 *     sizeX: 256,
 *     sizeY: 256
 * }
 * </pre>
 */
export { BlurPass_BlurPass as BlurPass };