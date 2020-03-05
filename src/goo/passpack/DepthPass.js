import { Material as Materialjs } from "../renderer/Material";
import { RenderTarget as RenderTargetjs } from "../renderer/pass/RenderTarget";
import { MeshData as MeshDatajs } from "../renderer/MeshData";
import { Shader as Shaderjs } from "../renderer/Shader";
import { ShaderFragment as ShaderFragmentjs } from "../renderer/shaders/ShaderFragment";
import { RenderPass as RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { Pass as Passjs } from "../renderer/pass/Pass";
import { BlurPass as BlurPassjs } from "../passpack/BlurPass";
function DepthPass(renderList, outShader) {
	this.depthPass = new RenderPassjs(renderList);
	var packDepthMaterial = new Materialjs(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	this.blurTarget = new RenderTargetjs(256, 256);
	this.blurPass = new BlurPassjs({
		target: this.blurTarget
	});

	var shader = outShader || unpackDepth;
	this.outPass = new FullscreenPassjs(shader);
	this.outPass.useReadBuffer = false;
	// this.outPass.clear = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	this.depthTarget = new RenderTargetjs(width, height);

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DepthPass.prototype = Object.create(Passjs.prototype);
DepthPass.prototype.constructor = DepthPass;

DepthPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	this.blurPass.render(renderer, writeBuffer, readBuffer, delta);

	this.outPass.material.setTexture(Shaderjs.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(Shaderjs.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture('BLUR_MAP', this.blurTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: MeshDatajs.POSITION
	},
	uniforms: {
		viewMatrix: Shaderjs.VIEW_MATRIX,
		projectionMatrix: Shaderjs.PROJECTION_MATRIX,
		worldMatrix: Shaderjs.WORLD_MATRIX,
//				nearPlane: Shader.NEAR_PLANE,
		farPlane: Shaderjs.FAR_PLANE
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

		ShaderFragmentjs.methods.packDepth,

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
		vertexPosition: MeshDatajs.POSITION,
		vertexUV0: MeshDatajs.TEXCOORD0
	},
	uniforms: {
		viewMatrix: Shaderjs.VIEW_MATRIX,
		projectionMatrix: Shaderjs.PROJECTION_MATRIX,
		worldMatrix: Shaderjs.WORLD_MATRIX,
		depthMap: Shaderjs.DEPTH_MAP,
		diffuseMap: Shaderjs.DIFFUSE_MAP
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

		ShaderFragmentjs.methods.unpackDepth,

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