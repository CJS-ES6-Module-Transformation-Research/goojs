import { Material as rendererMaterial_Materialjs } from "../renderer/Material";
import { FullscreenUtils as rendererpassFullscreenUtils_FullscreenUtilsjs } from "../renderer/pass/FullscreenUtils";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../renderer/shaders/ShaderLib";
import { ShaderLibExtra as passpackShaderLibExtra_ShaderLibExtrajs } from "../passpack/ShaderLibExtra";
import { Pass as rendererpassPass_Passjs } from "../renderer/pass/Pass";
function DogPass(settings) {
	settings = settings || {};

	this.target = settings.target !== undefined ? settings.target : null;
	var width = settings.width !== undefined ? settings.width : 1024;
	var height = settings.height !== undefined ? settings.height : 1024;
	var sigma = settings.sigma !== undefined ? settings.sigma : 0.6;
	var threshold = settings.threshold !== undefined ? settings.threshold : 0.005;
	this.downsampleAmount = settings.downsampleAmount !== undefined ? Math.max(settings.downsampleAmount, 1) : 2;

	if (sigma > 2.5) {
		sigma = 2.5;
	}

	this.updateSize({ width: width, height: height });

	this.renderable = {
		meshData: rendererpassFullscreenUtils_FullscreenUtilsjs.quad,
		materials: []
	};

	this.convolutionShader1 = utilObjectUtils_ObjectUtilsjs.deepClone(renderershadersShaderLib_ShaderLibjs.convolution);
	this.convolutionShader2 = utilObjectUtils_ObjectUtilsjs.deepClone(renderershadersShaderLib_ShaderLibjs.convolution);

	this.differenceShader = utilObjectUtils_ObjectUtilsjs.deepClone(passpackShaderLibExtra_ShaderLibExtrajs.differenceOfGaussians);
	this.differenceShader.uniforms.threshold = threshold;
	this.differenceMaterial = new rendererMaterial_Materialjs(this.differenceShader);

	this.updateSigma(sigma);

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DogPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
DogPass.prototype.constructor = DogPass;

DogPass.prototype.destroy = function (renderer) {
	var context = renderer.context;
	if (this.convolutionMaterial1) {
		this.convolutionMaterial1.shader.destroy();
	}
	if (this.convolutionMaterial2) {
		this.convolutionMaterial2.shader.destroy();
	}
	this.differenceMaterial.shader.destroy();
	if (this.gaussian1) {
		this.gaussian1.destroy(context);
	}
	if (this.gaussian2) {
		this.gaussian2.destroy(context);
	}
	if (this.renderTargetX) {
		this.renderTargetX.destroy(context);
	}
	if (this.target) {
		this.target.destroy(context);
	}
};

DogPass.prototype.updateThreshold = function (threshold) {
	this.differenceMaterial.shader.uniforms.threshold = threshold;
};

DogPass.prototype.updateEdgeColor = function (color) {
	this.differenceMaterial.shader.uniforms.edgeColor = [color[0], color[1], color[2], 1.0];
};

DogPass.prototype.updateBackgroundColor = function (color) {
	this.differenceMaterial.shader.uniforms.backgroundColor = [color[0], color[1], color[2], 1.0];
};

DogPass.prototype.updateBackgroundMix = function (amount) {
	this.differenceMaterial.shader.uniforms.backgroundMix = amount;
};

DogPass.prototype.updateSize = function (size) {
	var sizeX = size.width / this.downsampleAmount;
	var sizeY = size.height / this.downsampleAmount;
	this.renderTargetX = new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY);
	this.gaussian1 = new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY);
	this.gaussian2 = new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY);

	this.blurX = [0.5 / sizeX, 0.0];
	this.blurY = [0.0, 0.5 / sizeY];
};

DogPass.prototype.updateSigma = function (sigma) {
	// Use a ratio between the sigmas of 1.6 to approximate the Laplacian of Gaussian [Marr–Hildreth].
	// The max kernelsize is 2.5 , as implemented at this time in the convolutionShader, this means the max sigma to be used properly is 4.0
	var kernel1 = this.convolutionShader1.buildKernel(sigma);
	var kernel2 = this.convolutionShader2.buildKernel(1.6 * sigma);

	var kernelSize = kernel1.length;

	this.convolutionShader1.defines = {
		'KERNEL_SIZE_FLOAT': kernelSize.toFixed(1),
		'KERNEL_SIZE_INT': kernelSize.toFixed(0)
	};

	kernelSize = kernel2.length;

	this.convolutionShader2.defines = {
		'KERNEL_SIZE_FLOAT': kernelSize.toFixed(1),
		'KERNEL_SIZE_INT': kernelSize.toFixed(0)
	};

	this.convolutionShader1.uniforms.cKernel = kernel1;
	this.convolutionShader2.uniforms.cKernel = kernel2;

	this.convolutionMaterial1 = new rendererMaterial_Materialjs(this.convolutionShader1);
	this.convolutionMaterial2 = new rendererMaterial_Materialjs(this.convolutionShader2);
};

DogPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	// Gaussian sigma1
	this.renderable.materials[0] = this.convolutionMaterial1;

	this.convolutionMaterial1.setTexture('DIFFUSE_MAP', readBuffer);
	this.convolutionShader1.uniforms.uImageIncrement = this.blurX;

	renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.renderTargetX, true);

	this.convolutionMaterial1.setTexture('DIFFUSE_MAP', this.renderTargetX);
	this.convolutionShader1.uniforms.uImageIncrement = this.blurY;

	renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.gaussian1, true);

	// Gaussian sigma2
	this.renderable.materials[0] = this.convolutionMaterial2;

	this.convolutionMaterial2.setTexture('DIFFUSE_MAP', readBuffer);
	this.convolutionShader2.uniforms.uImageIncrement = this.blurX;

	renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.renderTargetX, true);

	this.convolutionMaterial2.setTexture('DIFFUSE_MAP', this.renderTargetX);
	this.convolutionShader2.uniforms.uImageIncrement = this.blurY;

	renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.gaussian2, true);

	// OUT
	this.renderable.materials[0] = this.differenceMaterial;
	// produces the difference gaussian1 - gaussian2
	this.differenceMaterial.setTexture('BLUR1', this.gaussian1);
	this.differenceMaterial.setTexture('BLUR2', this.gaussian2);
	this.differenceMaterial.setTexture('ORIGINAL', readBuffer);

	if (this.target !== null) {
		renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], this.target, this.clear);
	} else {
		renderer.render(this.renderable, rendererpassFullscreenUtils_FullscreenUtilsjs.camera, [], writeBuffer, this.clear);
	}
};

DogPass.prototype.invalidateHandles = function (renderer) {
	renderer.invalidateMaterial(this.convolutionMaterial1);
	renderer.invalidateMaterial(this.convolutionMaterial2);
	renderer.invalidateMaterial(this.differenceMaterial);
	renderer.invalidateMeshData(this.renderable.meshData);

	renderer.invalidateRenderTarget(this.renderTargetX);
	renderer.invalidateRenderTarget(this.gaussian1);
	renderer.invalidateRenderTarget(this.gaussian2);
};

var exported_DogPass = DogPass;

/**
* Difference of Gaussian Filter pass.
* Usable for edge detection.
*
* A lower sigma will create thinner edgelines, tune to get the sweetspot.
* Maximum sigma is 2.5.
*
* http://en.wikipedia.org/wiki/Difference_of_Gaussians
* http://www.tara.tcd.ie/bitstream/2262/12840/1/eg07.pdf , Adaptive Abstraction of 3D Scenes in Real-Time by Redmond and Dingliana, 2007
*/
export { exported_DogPass as DogPass };