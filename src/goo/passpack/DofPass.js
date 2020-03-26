import { Material as rendererMaterial_Materialjs } from "../renderer/Material";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { MeshData as rendererMeshData_MeshDatajs } from "../renderer/MeshData";
import { Shader as rendererShader_Shaderjs } from "../renderer/Shader";
import { ShaderFragment as renderershadersShaderFragment_ShaderFragmentjs } from "../renderer/shaders/ShaderFragment";
import { RenderPass as rendererpassRenderPass_RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as rendererpassFullscreenPass_FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { Skybox as utilSkybox_Skyboxjs } from "../util/Skybox";
import { Pass as rendererpassPass_Passjs } from "../renderer/pass/Pass";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../math/MathUtils";
function DofPass(renderList, outShader) {
	this.depthPass = new rendererpassRenderPass_RenderPassjs(renderList, function (item) {
		return !(item instanceof utilSkybox_Skyboxjs);
	});
	this.regularPass = new rendererpassRenderPass_RenderPassjs(renderList);
	var packDepthMaterial = new rendererMaterial_Materialjs(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	var shader = outShader || unpackDepth;
	this.outPass = new rendererpassFullscreenPass_FullscreenPassjs(shader);
	this.outPass.useReadBuffer = false;
	this.outPass.renderToScreen = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	var size = mathMathUtils_MathUtilsjs.nearestPowerOfTwo(Math.max(width, height));
	this.depthTarget = new rendererpassRenderTarget_RenderTargetjs(width, height);
	this.regularTarget = new rendererpassRenderTarget_RenderTargetjs(size / 2, size / 2);
	this.regularTarget2 = new rendererpassRenderTarget_RenderTargetjs(width, height);
	this.regularTarget.generateMipmaps = true;
	this.regularTarget.minFilter = 'Trilinear';

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DofPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
DofPass.prototype.constructor = DofPass;

DofPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);
	this.regularPass.render(renderer, null, this.regularTarget, delta);
	this.regularPass.render(renderer, null, this.regularTarget2, delta);

	this.outPass.material.setTexture(rendererShader_Shaderjs.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(rendererShader_Shaderjs.DIFFUSE_MAP, this.regularTarget);
	this.outPass.material.setTexture('DIFFUSE_MIP', this.regularTarget2);
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
		'  vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);',
		'  gl_Position = projectionMatrix * vPosition;',
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
		'  float linearDepth = min(-vPosition.z, farPlane) / farPlane;',
		'  gl_FragColor = packDepth(linearDepth);',
		'}'//
	].join('\n')
};

var unpackDepth = {
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION,
		vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
	},
	uniforms: {
		worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
		viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
		depthMap: rendererShader_Shaderjs.DEPTH_MAP,
		diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP,
		diffuseMip: 'DIFFUSE_MIP',
		zfar: rendererShader_Shaderjs.FAR_PLANE,
		focalDepth: 100.0,
		fStop: 2.0,
		CoC: 0.003,
		focalLength: 75.0,
		maxBlur: 16.0
	},
	vshader: [
		'attribute vec3 vertexPosition;',
		'attribute vec2 vertexUV0;',

		'uniform mat4 viewProjectionMatrix;',
		'uniform mat4 worldMatrix;',

		'varying vec2 texCoord0;',

		'void main(void) {',
		'  texCoord0 = vertexUV0;',
		'  gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);',
		'}'
	].join('\n'),
	fshader: '' +
	'uniform sampler2D diffuseMap;\n' +
	'uniform sampler2D diffuseMip;\n' +
	'uniform sampler2D depthMap;\n' +
	'uniform float zfar; //camera clipping end\n' +
	'uniform float focalDepth;\n' +
	'uniform float focalLength;\n' +
	'uniform float fStop;\n' +
	'uniform float CoC;\n' +
	'uniform float maxBlur;\n' +
	'varying vec2 texCoord0;\n' +

	renderershadersShaderFragment_ShaderFragmentjs.methods.unpackDepth +

	'void main() {\n' +
		'float depth = unpackDepth(texture2D(depthMap,texCoord0)) * zfar;\n' +
		'float f = focalLength; //focal length in mm\n' +
		'float d = focalDepth*1000.0; //focal plane in mm\n' +
		'float o = depth*1000.0; //depth in mm\n' +

		'float a = (o*f)/(o-f);\n' +
		'float b = (d*f)/(d-f);\n' +
		'float c = (d-f)/(d*fStop*CoC); \n' +

		'float blur = clamp(abs(a-b)*c, 0.0, maxBlur);\n' +
		'if (blur < 0.3) {\n' +
			'gl_FragColor = texture2D(diffuseMip, texCoord0);\n' +
		'} else {\n' +
			'gl_FragColor = texture2D(diffuseMap, texCoord0, log2(blur));\n' +
		'}\n' +
		'gl_FragColor.a = 1.0;' +
	'}'
};

var exported_DofPass = DofPass;

/**
 * Deph of field pass
 * @param renderList
 * @param outShader
 */
export { exported_DofPass as DofPass };