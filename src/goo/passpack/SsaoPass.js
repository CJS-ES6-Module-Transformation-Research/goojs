Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SsaoPass = undefined;

var _Material = require("../renderer/Material");

var _RenderTarget = require("../renderer/pass/RenderTarget");

var _ObjectUtils = require("../util/ObjectUtils");

var ObjectUtils = _interopRequireWildcard(_ObjectUtils);

var _MeshData = require("../renderer/MeshData");

var _Shader = require("../renderer/Shader");

var _ShaderFragment = require("../renderer/shaders/ShaderFragment");

var ShaderFragment = _interopRequireWildcard(_ShaderFragment);

var _RenderPass = require("../renderer/pass/RenderPass");

var _FullscreenPass = require("../renderer/pass/FullscreenPass");

var _BlurPass = require("../passpack/BlurPass");

var _ShaderLibExtra = require("../passpack/ShaderLibExtra");

var ShaderLibExtra = _interopRequireWildcard(_ShaderLibExtra);

var _Pass = require("../renderer/pass/Pass");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function SsaoPass(renderList) {
	this.depthPass = new _RenderPass.RenderPass(renderList);
	this.depthPass.clearColor.setDirect(1, 1, 1, 1);
	var packDepthMaterial = new _Material.Material(packDepth);
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

SsaoPass.prototype = Object.create(_Pass.Pass.prototype);
SsaoPass.prototype.constructor = SsaoPass;

SsaoPass.prototype.updateSize = function (size) {
	var width = Math.floor(size.width / this.downsampleAmount);
	var height = Math.floor(size.height / this.downsampleAmount);
	var shader = ObjectUtils.deepClone(ShaderLibExtra.ssao);
	shader.uniforms.size = [width, height];
	this.outPass = new _FullscreenPass.FullscreenPass(shader);
	this.outPass.useReadBuffer = false;
	//			 this.outPass.clear = true;
	//			this.outPass.renderToScreen = true;

	this.blurPass = new _BlurPass.BlurPass({
		sizeX: width,
		sizeY: height
	});
	//			this.blurPass.needsSwap = true;

	this.depthTarget = new _RenderTarget.RenderTarget(width, height, {
		magFilter: 'NearestNeighbor',
		minFilter: 'NearestNeighborNoMipMaps'
	});
	console.log('UPDATE SSAOPASS: ', width, height);
};

SsaoPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	// this.blurPass.render(renderer, this.depthTarget, this.depthTarget, delta);

	this.outPass.material.setTexture(_Shader.Shader.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture(_Shader.Shader.DEPTH_MAP, this.depthTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: _MeshData.MeshData.POSITION
	},
	uniforms: {
		viewMatrix: _Shader.Shader.VIEW_MATRIX,
		projectionMatrix: _Shader.Shader.PROJECTION_MATRIX,
		worldMatrix: _Shader.Shader.WORLD_MATRIX
		//				nearPlane: Shader.NEAR_PLANE,
		//				farPlane: Shader.FAR_PLANE
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform mat4 worldMatrix;', 'void main(void) {', '	gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', '}' //
	].join('\n'),
	fshader: ['precision mediump float;',

	//				'uniform float nearPlane;',
	//				'uniform float farPlane;',

	ShaderFragment.methods.packDepth, 'void main(void) {', '	gl_FragColor = packDepth(gl_FragCoord.z);', '}' //
	].join('\n')
};

var exported_SsaoPass = SsaoPass;

/**
 * Screen Space Ambient Occlusion pass
 * @param renderList
 */
exports.SsaoPass = exported_SsaoPass;
