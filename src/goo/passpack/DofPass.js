"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DofPass = undefined;

var _Material = require("../renderer/Material");

var _RenderTarget = require("../renderer/pass/RenderTarget");

var _MeshData = require("../renderer/MeshData");

var _Shader = require("../renderer/Shader");

var _ShaderFragment = require("../renderer/shaders/ShaderFragment");

var _RenderPass = require("../renderer/pass/RenderPass");

var _FullscreenPass = require("../renderer/pass/FullscreenPass");

var _Skybox = require("../util/Skybox");

var _Pass = require("../renderer/pass/Pass");

var _MathUtils = require("../math/MathUtils");

function DofPass(renderList, outShader) {
	this.depthPass = new _RenderPass.RenderPass(renderList, function (item) {
		return !(item instanceof _Skybox.Skybox);
	});
	this.regularPass = new _RenderPass.RenderPass(renderList);
	var packDepthMaterial = new _Material.Material(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	var shader = outShader || unpackDepth;
	this.outPass = new _FullscreenPass.FullscreenPass(shader);
	this.outPass.useReadBuffer = false;
	this.outPass.renderToScreen = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	var size = _MathUtils.MathUtils.nearestPowerOfTwo(Math.max(width, height));
	this.depthTarget = new _RenderTarget.RenderTarget(width, height);
	this.regularTarget = new _RenderTarget.RenderTarget(size / 2, size / 2);
	this.regularTarget2 = new _RenderTarget.RenderTarget(width, height);
	this.regularTarget.generateMipmaps = true;
	this.regularTarget.minFilter = 'Trilinear';

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DofPass.prototype = Object.create(_Pass.Pass.prototype);
DofPass.prototype.constructor = DofPass;

DofPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);
	this.regularPass.render(renderer, null, this.regularTarget, delta);
	this.regularPass.render(renderer, null, this.regularTarget2, delta);

	this.outPass.material.setTexture(_Shader.Shader.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(_Shader.Shader.DIFFUSE_MAP, this.regularTarget);
	this.outPass.material.setTexture('DIFFUSE_MIP', this.regularTarget2);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: _MeshData.MeshData.POSITION
	},
	uniforms: {
		viewMatrix: _Shader.Shader.VIEW_MATRIX,
		projectionMatrix: _Shader.Shader.PROJECTION_MATRIX,
		worldMatrix: _Shader.Shader.WORLD_MATRIX,
		//				nearPlane: Shader.NEAR_PLANE,
		farPlane: _Shader.Shader.FAR_PLANE
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'varying vec4 vPosition;', 'void main(void) {', '  vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '  gl_Position = projectionMatrix * vPosition;', '}' //
	].join('\n'),
	fshader: ['precision mediump float;',

	//				'uniform float nearPlane;',
	'uniform float farPlane;', _ShaderFragment.ShaderFragment.methods.packDepth, 'varying vec4 vPosition;', 'void main(void)', '{', '  float linearDepth = min(-vPosition.z, farPlane) / farPlane;', '  gl_FragColor = packDepth(linearDepth);', '}' //
	].join('\n')
};

var unpackDepth = {
	attributes: {
		vertexPosition: _MeshData.MeshData.POSITION,
		vertexUV0: _MeshData.MeshData.TEXCOORD0
	},
	uniforms: {
		worldMatrix: _Shader.Shader.WORLD_MATRIX,
		viewProjectionMatrix: _Shader.Shader.VIEW_PROJECTION_MATRIX,
		depthMap: _Shader.Shader.DEPTH_MAP,
		diffuseMap: _Shader.Shader.DIFFUSE_MAP,
		diffuseMip: 'DIFFUSE_MIP',
		zfar: _Shader.Shader.FAR_PLANE,
		focalDepth: 100.0,
		fStop: 2.0,
		CoC: 0.003,
		focalLength: 75.0,
		maxBlur: 16.0
	},
	vshader: ['attribute vec3 vertexPosition;', 'attribute vec2 vertexUV0;', 'uniform mat4 viewProjectionMatrix;', 'uniform mat4 worldMatrix;', 'varying vec2 texCoord0;', 'void main(void) {', '  texCoord0 = vertexUV0;', '  gl_Position = viewProjectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '}'].join('\n'),
	fshader: '' + 'uniform sampler2D diffuseMap;\n' + 'uniform sampler2D diffuseMip;\n' + 'uniform sampler2D depthMap;\n' + 'uniform float zfar; //camera clipping end\n' + 'uniform float focalDepth;\n' + 'uniform float focalLength;\n' + 'uniform float fStop;\n' + 'uniform float CoC;\n' + 'uniform float maxBlur;\n' + 'varying vec2 texCoord0;\n' + _ShaderFragment.ShaderFragment.methods.unpackDepth + 'void main() {\n' + 'float depth = unpackDepth(texture2D(depthMap,texCoord0)) * zfar;\n' + 'float f = focalLength; //focal length in mm\n' + 'float d = focalDepth*1000.0; //focal plane in mm\n' + 'float o = depth*1000.0; //depth in mm\n' + 'float a = (o*f)/(o-f);\n' + 'float b = (d*f)/(d-f);\n' + 'float c = (d-f)/(d*fStop*CoC); \n' + 'float blur = clamp(abs(a-b)*c, 0.0, maxBlur);\n' + 'if (blur < 0.3) {\n' + 'gl_FragColor = texture2D(diffuseMip, texCoord0);\n' + '} else {\n' + 'gl_FragColor = texture2D(diffuseMap, texCoord0, log2(blur));\n' + '}\n' + 'gl_FragColor.a = 1.0;' + '}'
};

var exported_DofPass = DofPass;

/**
 * Deph of field pass
 * @param renderList
 * @param outShader
 */
exports.DofPass = exported_DofPass;
