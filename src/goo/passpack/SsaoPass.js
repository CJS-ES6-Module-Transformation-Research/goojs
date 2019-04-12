Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SsaoPass;

var _Material = require("../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _RenderTarget = require("../renderer/pass/RenderTarget");

var _RenderTarget2 = _interopRequireDefault(_RenderTarget);

var _ObjectUtils = require("../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

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

var _BlurPass = require("../passpack/BlurPass");

var _BlurPass2 = _interopRequireDefault(_BlurPass);

var _ShaderLibExtra = require("../passpack/ShaderLibExtra");

var _ShaderLibExtra2 = _interopRequireDefault(_ShaderLibExtra);

var _Pass = require("../renderer/pass/Pass");

var _Pass2 = _interopRequireDefault(_Pass);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Screen Space Ambient Occlusion pass
 * @param renderList
 */
function SsaoPass(renderList) {
	this.depthPass = new _RenderPass2.default(renderList);
	this.depthPass.clearColor.setDirect(1, 1, 1, 1);
	var packDepthMaterial = new _Material2.default(packDepth);
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

SsaoPass.prototype = Object.create(_Pass2.default.prototype);
SsaoPass.prototype.constructor = SsaoPass;

SsaoPass.prototype.updateSize = function (size) {
	var width = Math.floor(size.width / this.downsampleAmount);
	var height = Math.floor(size.height / this.downsampleAmount);
	var shader = _ObjectUtils2.default.deepClone(_ShaderLibExtra2.default.ssao);
	shader.uniforms.size = [width, height];
	this.outPass = new _FullscreenPass2.default(shader);
	this.outPass.useReadBuffer = false;
	//			 this.outPass.clear = true;
	//			this.outPass.renderToScreen = true;

	this.blurPass = new _BlurPass2.default({
		sizeX: width,
		sizeY: height
	});
	//			this.blurPass.needsSwap = true;

	this.depthTarget = new _RenderTarget2.default(width, height, {
		magFilter: 'NearestNeighbor',
		minFilter: 'NearestNeighborNoMipMaps'
	});
	console.log('UPDATE SSAOPASS: ', width, height);
};

SsaoPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	// this.blurPass.render(renderer, this.depthTarget, this.depthTarget, delta);

	this.outPass.material.setTexture(_Shader2.default.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture(_Shader2.default.DEPTH_MAP, this.depthTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: _MeshData2.default.POSITION
	},
	uniforms: {
		viewMatrix: _Shader2.default.VIEW_MATRIX,
		projectionMatrix: _Shader2.default.PROJECTION_MATRIX,
		worldMatrix: _Shader2.default.WORLD_MATRIX
		//				nearPlane: Shader.NEAR_PLANE,
		//				farPlane: Shader.FAR_PLANE
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'void main(void) {', '	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '}' //
	].join('\n'),
	fshader: ['precision mediump float;',

	//				'uniform float nearPlane;',
	//				'uniform float farPlane;',

	_ShaderFragment2.default.methods.packDepth, 'void main(void) {', '	gl_FragColor = packDepth(gl_FragCoord.z);', '}' //
	].join('\n')
};
module.exports = exports.default;
