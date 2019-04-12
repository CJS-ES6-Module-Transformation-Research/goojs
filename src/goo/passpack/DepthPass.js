Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DepthPass;

var _Material = require("../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _RenderTarget = require("../renderer/pass/RenderTarget");

var _RenderTarget2 = _interopRequireDefault(_RenderTarget);

var _MeshData = require("../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _Shader = require("../renderer/Shader");

var _Shader2 = _interopRequireDefault(_Shader);

var _ShaderFragment = require("../renderer/shaders/ShaderFragment");

var _ShaderFragment2 = _interopRequireDefault(_ShaderFragment);

var _RenderPass = require("../renderer/pass/RenderPass");

var _RenderPass2 = _interopRequireDefault(_RenderPass);

var _FullscreenPass = require("../renderer/pass/FullscreenPass");

var _FullscreenPass2 = _interopRequireDefault(_FullscreenPass);

var _Pass = require("../renderer/pass/Pass");

var _Pass2 = _interopRequireDefault(_Pass);

var _BlurPass = require("../passpack/BlurPass");

var _BlurPass2 = _interopRequireDefault(_BlurPass);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Depth pass
 * @param renderList
 * @param outShader
 */
function DepthPass(renderList, outShader) {
	this.depthPass = new _RenderPass2.default(renderList);
	var packDepthMaterial = new _Material2.default(packDepth);
	this.depthPass.overrideMaterial = packDepthMaterial;

	this.blurTarget = new _RenderTarget2.default(256, 256);
	this.blurPass = new _BlurPass2.default({
		target: this.blurTarget
	});

	var shader = outShader || unpackDepth;
	this.outPass = new _FullscreenPass2.default(shader);
	this.outPass.useReadBuffer = false;
	// this.outPass.clear = true;

	var width = window.innerWidth || 1;
	var height = window.innerHeight || 1;
	this.depthTarget = new _RenderTarget2.default(width, height);

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

DepthPass.prototype = Object.create(_Pass2.default.prototype);
DepthPass.prototype.constructor = DepthPass;

DepthPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	this.blurPass.render(renderer, writeBuffer, readBuffer, delta);

	this.outPass.material.setTexture(_Shader2.default.DEPTH_MAP, this.depthTarget);
	this.outPass.material.setTexture(_Shader2.default.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture('BLUR_MAP', this.blurTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: _MeshData2.default.POSITION
	},
	uniforms: {
		viewMatrix: _Shader2.default.VIEW_MATRIX,
		projectionMatrix: _Shader2.default.PROJECTION_MATRIX,
		worldMatrix: _Shader2.default.WORLD_MATRIX,
		//				nearPlane: Shader.NEAR_PLANE,
		farPlane: _Shader2.default.FAR_PLANE
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'varying vec4 vPosition;', 'void main(void) {', '	vPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '	gl_Position = projectionMatrix * vPosition;', '}' //
	].join('\n'),
	fshader: ['precision mediump float;',

	//				'uniform float nearPlane;',
	'uniform float farPlane;', _ShaderFragment2.default.methods.packDepth, 'varying vec4 vPosition;', 'void main(void)', '{',
	// ' float linearDepth = min(length(vPosition), farPlane) / (farPlane - nearPlane);',
	'	float linearDepth = min(length(vPosition), farPlane) / farPlane;', '	gl_FragColor = packDepth(linearDepth);', '}' //
	].join('\n')
};

var unpackDepth = {
	attributes: {
		vertexPosition: _MeshData2.default.POSITION,
		vertexUV0: _MeshData2.default.TEXCOORD0
	},
	uniforms: {
		viewMatrix: _Shader2.default.VIEW_MATRIX,
		projectionMatrix: _Shader2.default.PROJECTION_MATRIX,
		worldMatrix: _Shader2.default.WORLD_MATRIX,
		depthMap: _Shader2.default.DEPTH_MAP,
		diffuseMap: _Shader2.default.DIFFUSE_MAP
	},
	vshader: ['attribute vec3 vertexPosition;', 'attribute vec2 vertexUV0;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'varying vec2 texCoord0;', 'void main(void) {', '	texCoord0 = vertexUV0;', '	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '}' //
	].join('\n'),
	fshader: ['precision mediump float;', 'uniform sampler2D depthMap;', 'uniform sampler2D diffuseMap;', 'varying vec2 texCoord0;', _ShaderFragment2.default.methods.unpackDepth, 'void main(void)', '{', '	vec4 depthCol = texture2D(depthMap, texCoord0);', '	vec4 diffuseCol = texture2D(diffuseMap, texCoord0);', '	float depth = unpackDepth(depthCol);', '	gl_FragColor = diffuseCol * vec4(depth);', '}' //
	].join('\n')
};
module.exports = exports.default;
