var SsaoPass_SsaoPass = SsaoPass;
import { Material as rendererMaterial_Materialjs } from "../renderer/Material";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";
import { MeshData as rendererMeshData_MeshDatajs } from "../renderer/MeshData";
import { Shader as rendererShader_Shaderjs } from "../renderer/Shader";
import { methods as ShaderFragmentjs_methods } from "../renderer/shaders/ShaderFragment";
import { RenderPass as rendererpassRenderPass_RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as rendererpassFullscreenPass_FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { BlurPass as passpackBlurPass_BlurPassjs } from "../passpack/BlurPass";
import { ssao as ShaderLibExtrajs_ssao } from "../passpack/ShaderLibExtra";
import { Pass as rendererpassPass_Passjs } from "../renderer/pass/Pass";
function SsaoPass(renderList) {
	this.depthPass = new rendererpassRenderPass_RenderPassjs(renderList);
	this.depthPass.clearColor.setDirect(1, 1, 1, 1);
	var packDepthMaterial = new rendererMaterial_Materialjs(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	this.downsampleAmount = 4;
	var width = window.innerWidth || 1024;
	var height = window.innerHeight || 1024;
	this.updateSize({
		x: 0, y: 0, width: width, height: height
	});

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

SsaoPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
SsaoPass.prototype.constructor = SsaoPass;

SsaoPass.prototype.updateSize = function (size) {
	var width = Math.floor(size.width / this.downsampleAmount);
	var height = Math.floor(size.height / this.downsampleAmount);
	var shader = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibExtrajs_ssao);
	shader.uniforms.size = [width, height];
	this.outPass = new rendererpassFullscreenPass_FullscreenPassjs(shader);
	this.outPass.useReadBuffer = false;
//			 this.outPass.clear = true;
//			this.outPass.renderToScreen = true;

	this.blurPass = new passpackBlurPass_BlurPassjs({
		sizeX: width,
		sizeY: height
	});
//			this.blurPass.needsSwap = true;

	this.depthTarget = new rendererpassRenderTarget_RenderTargetjs(width, height, {
		magFilter: 'NearestNeighbor',
		minFilter: 'NearestNeighborNoMipMaps'
	});
	console.log('UPDATE SSAOPASS: ', width, height);
};

SsaoPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	// this.blurPass.render(renderer, this.depthTarget, this.depthTarget, delta);

	this.outPass.material.setTexture(rendererShader_Shaderjs.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture(rendererShader_Shaderjs.DEPTH_MAP, this.depthTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION
	},
	uniforms: {
		viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
		projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
		worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX
//				nearPlane: Shader.NEAR_PLANE,
//				farPlane: Shader.FAR_PLANE
	},
	vshader: [
		'attribute vec3 vertexPosition;',

		'uniform mat4 viewMatrix;',
		'uniform mat4 projectionMatrix;',
		'uniform mat4 worldMatrix;',

		'void main(void) {',
		'	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);',
		'}'//
	].join('\n'),
	fshader: [
		'precision mediump float;',

//				'uniform float nearPlane;',
//				'uniform float farPlane;',

		ShaderFragmentjs_methods.packDepth,

		'void main(void) {',
		'	gl_FragColor = packDepth(gl_FragCoord.z);',
		'}'//
	].join('\n')
};

/**
 * Screen Space Ambient Occlusion pass
 * @param renderList
 */
export { SsaoPass_SsaoPass as SsaoPass };