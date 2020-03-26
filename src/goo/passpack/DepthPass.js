import { Material as rendererMaterial_Materialjs } from "../renderer/Material";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { MeshData as rendererMeshData_MeshDatajs } from "../renderer/MeshData";
import { Shader as rendererShader_Shaderjs } from "../renderer/Shader";
import { ShaderFragment as renderershadersShaderFragment_ShaderFragmentjs } from "../renderer/shaders/ShaderFragment";
import { RenderPass as rendererpassRenderPass_RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as rendererpassFullscreenPass_FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { Pass as rendererpassPass_Passjs } from "../renderer/pass/Pass";
import { BlurPass as passpackBlurPass_BlurPassjs } from "../passpack/BlurPass";
function DepthPass(renderList, outShader) {
	this.depthPass = new rendererpassRenderPass_RenderPassjs(renderList);
	var packDepthMaterial = new rendererMaterial_Materialjs(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	this.blurTarget = new rendererpassRenderTarget_RenderTargetjs(256, 256);
	this.blurPass = new passpackBlurPass_BlurPassjs({
		target: this.blurTarget
	});

	var shader = outShader || unpackDepth;
	this.outPass = new rendererpassFullscreenPass_FullscreenPassjs(shader);
	this.outPass.useReadBuffer = false;
	// this.outPass.clear = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	this.depthTarget = new rendererpassRenderTarget_RenderTargetjs(width, height);

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DepthPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
DepthPass.prototype.constructor = DepthPass;

DepthPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	this.blurPass.render(renderer, writeBuffer, readBuffer, delta);

	this.outPass.material.setTexture(rendererShader_Shaderjs.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(rendererShader_Shaderjs.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture('BLUR_MAP', this.blurTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION
	},
	uniforms: {
		viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
		projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
		worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
//				nearPlane: Shader.NEAR_PLANE,
		farPlane: rendererShader_Shaderjs.FAR_PLANE
	},
	vshader: [
		'attribute vec3 vertexPosition;',

		'uniform mat4 viewMatrix;',
		'uniform mat4 projectionMatrix;',
		'uniform mat4 worldMatrix;',

		'varying vec4 vPosition;',

		'void main(void) {',
		'	vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);',
		'	gl_Position = projectionMatrix * vPosition;',
		'}'//
	].join('\n'),
	fshader: [
		'precision mediump float;',

//				'uniform float nearPlane;',
		'uniform float farPlane;',

		renderershadersShaderFragment_ShaderFragmentjs.methods.packDepth,

		'varying vec4 vPosition;',

		'void main(void)',
		'{',
		// ' float linearDepth = min(length(vPosition), farPlane) / (farPlane - nearPlane);',
		'	float linearDepth = min(length(vPosition), farPlane) / farPlane;',
		'	gl_FragColor = packDepth(linearDepth);',
		'}'//
	].join('\n')
};

var unpackDepth = {
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION,
		vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
	},
	uniforms: {
		viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
		projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
		worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
		depthMap: rendererShader_Shaderjs.DEPTH_MAP,
		diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
	},
	vshader: [
		'attribute vec3 vertexPosition;',
		'attribute vec2 vertexUV0;',

		'uniform mat4 viewMatrix;',
		'uniform mat4 projectionMatrix;',
		'uniform mat4 worldMatrix;',

		'varying vec2 texCoord0;',

		'void main(void) {',
		'	texCoord0 = vertexUV0;',
		'	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);',
		'}'//
	].join('\n'),
	fshader: [
		'precision mediump float;',

		'uniform sampler2D depthMap;',
		'uniform sampler2D diffuseMap;',

		'varying vec2 texCoord0;',

		renderershadersShaderFragment_ShaderFragmentjs.methods.unpackDepth,

		'void main(void)',
		'{',
		'	vec4 depthCol = texture2D(depthMap, texCoord0);',
		'	vec4 diffuseCol = texture2D(diffuseMap, texCoord0);',
		'	float depth = unpackDepth(depthCol);',
		'	gl_FragColor = diffuseCol * vec4(depth);',
		'}'//
	].join('\n')
};

var exported_DepthPass = DepthPass;

/**
 * Depth pass
 * @param renderList
 * @param outShader
 */
export { exported_DepthPass as DepthPass };