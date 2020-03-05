import { Material as Material_Materialjs } from "../renderer/Material";
import { RenderTarget as RenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { ObjectUtils as ObjectUtils_ObjectUtilsjs } from "../util/ObjectUtils";
import { MeshData as MeshData_MeshDatajs } from "../renderer/MeshData";
import { Shader as Shader_Shaderjs } from "../renderer/Shader";
import { ShaderFragment as ShaderFragment_ShaderFragmentjs } from "../renderer/shaders/ShaderFragment";
import { RenderPass as RenderPass_RenderPassjs } from "../renderer/pass/RenderPass";
import { FullscreenPass as FullscreenPass_FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { BlurPass as BlurPass_BlurPassjs } from "../passpack/BlurPass";
import { ShaderLibExtra as ShaderLibExtra_ShaderLibExtrajs } from "../passpack/ShaderLibExtra";
import { Pass as Pass_Passjs } from "../renderer/pass/Pass";
function SsaoPass(renderList) {
	this.depthPass = new RenderPass_RenderPassjs(renderList);
	this.depthPass.clearColor.setDirect(1, 1, 1, 1);
	var packDepthMaterial = new Material_Materialjs(packDepth);
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
	var shader = ObjectUtils_ObjectUtilsjs.deepClone(ShaderLibExtra_ShaderLibExtrajs.ssao);
	shader.uniforms.size = [width, height];
	this.outPass = new FullscreenPass_FullscreenPassjs(shader);
	this.outPass.useReadBuffer = false;
//			 this.outPass.clear = true;
//			this.outPass.renderToScreen = true;

	this.blurPass = new BlurPass_BlurPassjs({
		sizeX: width,
		sizeY: height
	});
//			this.blurPass.needsSwap = true;

	this.depthTarget = new RenderTarget_RenderTargetjs(width, height, {
		magFilter: 'NearestNeighbor',
		minFilter: 'NearestNeighborNoMipMaps'
	});
	console.log('UPDATE SSAOPASS: ', width, height);
};

SsaoPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	// this.blurPass.render(renderer, this.depthTarget, this.depthTarget, delta);

	this.outPass.material.setTexture(Shader_Shaderjs.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture(Shader_Shaderjs.DEPTH_MAP, this.depthTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: MeshData_MeshDatajs.POSITION
	},
	uniforms: {
		viewMatrix: Shader_Shaderjs.VIEW_MATRIX,
		projectionMatrix: Shader_Shaderjs.PROJECTION_MATRIX,
		worldMatrix: Shader_Shaderjs.WORLD_MATRIX
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

		ShaderFragment_ShaderFragmentjs.methods.packDepth,

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