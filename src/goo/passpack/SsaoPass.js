import { Material as Materialjs } from "../renderer/Material";
import { RenderTarget as RenderTargetjs } from "../renderer/pass/RenderTarget";
import { deepClone as ObjectUtilsjs_deepClone } from "../util/ObjectUtils";
import { MeshData as MeshDatajs } from "../renderer/MeshData";
import { Shader as Shaderjs } from "../renderer/Shader";
import { methods as ShaderFragmentjs_methods } from "../renderer/shaders/ShaderFragment";
import { RenderPass as RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { BlurPass as BlurPassjs } from "../passpack/BlurPass";
import { ssao as ShaderLibExtrajs_ssao } from "../passpack/ShaderLibExtra";
import { Pass as Pass_Passjs } from "../renderer/pass/Pass";
function SsaoPass(renderList) {
	this.depthPass = new RenderPassjs(renderList);
	this.depthPass.clearColor.setDirect(1, 1, 1, 1);
	var packDepthMaterial = new Materialjs(packDepth);
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

SsaoPass.prototype = Object.create(Pass_Passjs.prototype);
SsaoPass.prototype.constructor = SsaoPass;

SsaoPass.prototype.updateSize = function (size) {
	var width = Math.floor(size.width / this.downsampleAmount);
	var height = Math.floor(size.height / this.downsampleAmount);
	var shader = ObjectUtilsjs_deepClone(ShaderLibExtrajs_ssao);
	shader.uniforms.size = [width, height];
	this.outPass = new FullscreenPassjs(shader);
	this.outPass.useReadBuffer = false;
//			 this.outPass.clear = true;
//			this.outPass.renderToScreen = true;

	this.blurPass = new BlurPassjs({
		sizeX: width,
		sizeY: height
	});
//			this.blurPass.needsSwap = true;

	this.depthTarget = new RenderTargetjs(width, height, {
		magFilter: 'NearestNeighbor',
		minFilter: 'NearestNeighborNoMipMaps'
	});
	console.log('UPDATE SSAOPASS: ', width, height);
};

SsaoPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	// this.blurPass.render(renderer, this.depthTarget, this.depthTarget, delta);

	this.outPass.material.setTexture(Shaderjs_DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture(Shaderjs_DEPTH_MAP, this.depthTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: MeshDatajs_POSITION
	},
	uniforms: {
		viewMatrix: Shaderjs_VIEW_MATRIX,
		projectionMatrix: Shaderjs_PROJECTION_MATRIX,
		worldMatrix: Shaderjs_WORLD_MATRIX
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

var exported_SsaoPass = SsaoPass;

/**
 * Screen Space Ambient Occlusion pass
 * @param renderList
 */
export { exported_SsaoPass as SsaoPass };