"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DepthPass = undefined;

var _Material = require("../renderer/Material");

var _RenderTarget = require("../renderer/pass/RenderTarget");

var _MeshData = require("../renderer/MeshData");

var _Shader = require("../renderer/Shader");

var _ShaderFragment = require("../renderer/shaders/ShaderFragment");

var _RenderPass = require("../renderer/pass/RenderPass");

var _FullscreenPass = require("../renderer/pass/FullscreenPass");

var _Pass = require("../renderer/pass/Pass");

var _BlurPass = require("../passpack/BlurPass");

function DepthPass(renderList, outShader) {
	this.depthPass = new _RenderPass.RenderPass(renderList);
	var packDepthMaterial = new _Material.Material(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	this.blurTarget = new _RenderTarget.RenderTarget(256, 256);
	this.blurPass = new _BlurPass.BlurPass({
		target: this.blurTarget
	});

	var shader = outShader || unpackDepth;
	this.outPass = new _FullscreenPass.FullscreenPass(shader);
	this.outPass.useReadBuffer = false;
	// this.outPass.clear = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	this.depthTarget = new _RenderTarget.RenderTarget(width, height);

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DepthPass.prototype = Object.create(_Pass.Pass.prototype);
DepthPass.prototype.constructor = DepthPass;

DepthPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	this.blurPass.render(renderer, writeBuffer, readBuffer, delta);

	this.outPass.material.setTexture(_Shader.Shader.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(_Shader.Shader.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture('BLUR_MAP', this.blurTarget);
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
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'varying vec4 vPosition;', 'void main(void) {', '	vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '	gl_Position = projectionMatrix * vPosition;', '}' //
	].join('\n'),
	fshader: ['precision mediump float;',

	//				'uniform float nearPlane;',
	'uniform float farPlane;', _ShaderFragment.ShaderFragment.methods.packDepth, 'varying vec4 vPosition;', 'void main(void)', '{',
	// ' float linearDepth = min(length(vPosition), farPlane) / (farPlane - nearPlane);',
	'	float linearDepth = min(length(vPosition), farPlane) / farPlane;', '	gl_FragColor = packDepth(linearDepth);', '}' //
	].join('\n')
};

var unpackDepth = {
	attributes: {
		vertexPosition: _MeshData.MeshData.POSITION,
		vertexUV0: _MeshData.MeshData.TEXCOORD0
	},
	uniforms: {
		viewMatrix: _Shader.Shader.VIEW_MATRIX,
		projectionMatrix: _Shader.Shader.PROJECTION_MATRIX,
		worldMatrix: _Shader.Shader.WORLD_MATRIX,
		depthMap: _Shader.Shader.DEPTH_MAP,
		diffuseMap: _Shader.Shader.DIFFUSE_MAP
	},
	vshader: ['attribute vec3 vertexPosition;', 'attribute vec2 vertexUV0;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'varying vec2 texCoord0;', 'void main(void) {', '	texCoord0 = vertexUV0;', '	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '}' //
	].join('\n'),
	fshader: ['precision mediump float;', 'uniform sampler2D depthMap;', 'uniform sampler2D diffuseMap;', 'varying vec2 texCoord0;', _ShaderFragment.ShaderFragment.methods.unpackDepth, 'void main(void)', '{', '	vec4 depthCol = texture2D(depthMap, texCoord0);', '	vec4 diffuseCol = texture2D(diffuseMap, texCoord0);', '	float depth = unpackDepth(depthCol);', '	gl_FragColor = diffuseCol * vec4(depth);', '}' //
	].join('\n')
};

var exported_DepthPass = DepthPass;

/**
 * Depth pass
 * @param renderList
 * @param outShader
 */
exports.DepthPass = exported_DepthPass;
