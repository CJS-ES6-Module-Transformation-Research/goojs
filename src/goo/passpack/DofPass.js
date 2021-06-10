var mod_DofPass = DofPass;
import { Material as Material_Material } from "../renderer/Material";
import { RenderTarget as RenderTarget_RenderTarget } from "../renderer/pass/RenderTarget";
import { MeshData as MeshData_MeshData } from "../renderer/MeshData";
import { Shader as Shader_Shader } from "../renderer/Shader";
import { ShaderFragment as ShaderFragment_ShaderFragment } from "../renderer/shaders/ShaderFragment";
import { RenderPass as RenderPass_RenderPass } from "../renderer/pass/RenderPass";
import { FullscreenPass as FullscreenPass_FullscreenPass } from "../renderer/pass/FullscreenPass";
import { Skybox as Skybox_Skybox } from "../util/Skybox";
import { Pass as Pass_Pass } from "../renderer/pass/Pass";
import { MathUtils as MathUtils_MathUtils } from "../math/MathUtils";

/**
 * Deph of field pass
 * @param renderList
 * @param outShader
 */
function DofPass(renderList, outShader) {
	this.depthPass = new RenderPass_RenderPass(renderList, function (item) {
		return !(item instanceof Skybox_Skybox);
	});
	this.regularPass = new RenderPass_RenderPass(renderList);
	var packDepthMaterial = new Material_Material(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	var shader = outShader || unpackDepth;
	this.outPass = new FullscreenPass_FullscreenPass(shader);
	this.outPass.useReadBuffer = false;
	this.outPass.renderToScreen = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	var size = MathUtils_MathUtils.nearestPowerOfTwo(Math.max(width, height));
	this.depthTarget = new RenderTarget_RenderTarget(width, height);
	this.regularTarget = new RenderTarget_RenderTarget(size / 2, size / 2);
	this.regularTarget2 = new RenderTarget_RenderTarget(width, height);
	this.regularTarget.generateMipmaps = true;
	this.regularTarget.minFilter = 'Trilinear';

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DofPass.prototype = Object.create(Pass_Pass.prototype);
DofPass.prototype.constructor = DofPass;

DofPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);
	this.regularPass.render(renderer, null, this.regularTarget, delta);
	this.regularPass.render(renderer, null, this.regularTarget2, delta);

	this.outPass.material.setTexture(Shader_Shader.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(Shader_Shader.DIFFUSE_MAP, this.regularTarget);
	this.outPass.material.setTexture('DIFFUSE_MIP', this.regularTarget2);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: MeshData_MeshData.POSITION
	},
	uniforms: {
		viewMatrix: Shader_Shader.VIEW_MATRIX,
		projectionMatrix: Shader_Shader.PROJECTION_MATRIX,
		worldMatrix: Shader_Shader.WORLD_MATRIX,
//				nearPlane: Shader.NEAR_PLANE,
		farPlane: Shader_Shader.FAR_PLANE
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

		ShaderFragment_ShaderFragment.methods.packDepth,

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
		vertexPosition: MeshData_MeshData.POSITION,
		vertexUV0: MeshData_MeshData.TEXCOORD0
	},
	uniforms: {
		worldMatrix: Shader_Shader.WORLD_MATRIX,
		viewProjectionMatrix: Shader_Shader.VIEW_PROJECTION_MATRIX,
		depthMap: Shader_Shader.DEPTH_MAP,
		diffuseMap: Shader_Shader.DIFFUSE_MAP,
		diffuseMip: 'DIFFUSE_MIP',
		zfar: Shader_Shader.FAR_PLANE,
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

	ShaderFragment_ShaderFragment.methods.unpackDepth +

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

/**
 * Deph of field pass
 * @param renderList
 * @param outShader
 */
export { mod_DofPass as DofPass };