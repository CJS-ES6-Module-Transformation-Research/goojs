var mod_SsaoPass = SsaoPass;
import { Material as Material_Material } from "../renderer/Material";
import { RenderTarget as RenderTarget_RenderTarget } from "../renderer/pass/RenderTarget";
import { ObjectUtils as ObjectUtils_ObjectUtils } from "../util/ObjectUtils";
import { MeshData as MeshData_MeshData } from "../renderer/MeshData";
import { Shader as Shader_Shader } from "../renderer/Shader";
import { ShaderFragment as ShaderFragment_ShaderFragment } from "../renderer/shaders/ShaderFragment";
import { RenderPass as RenderPass_RenderPass } from "../renderer/pass/RenderPass";
import { FullscreenPass as FullscreenPass_FullscreenPass } from "../renderer/pass/FullscreenPass";
import { BlurPass as BlurPass_BlurPass } from "../passpack/BlurPass";
import { ShaderLibExtra as ShaderLibExtra_ShaderLibExtra } from "../passpack/ShaderLibExtra";
import { Pass as Pass_Pass } from "../renderer/pass/Pass";

/**
 * Screen Space Ambient Occlusion pass
 * @param renderList
 */
function SsaoPass(renderList) {
	this.depthPass = new RenderPass_RenderPass(renderList);
	this.depthPass.clearColor.setDirect(1, 1, 1, 1);
	var packDepthMaterial = new Material_Material(packDepth);
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

SsaoPass.prototype = Object.create(Pass_Pass.prototype);
SsaoPass.prototype.constructor = SsaoPass;

SsaoPass.prototype.updateSize = function (size) {
	var width = Math.floor(size.width / this.downsampleAmount);
	var height = Math.floor(size.height / this.downsampleAmount);
	var shader = ObjectUtils_ObjectUtils.deepClone(ShaderLibExtra_ShaderLibExtra.ssao);
	shader.uniforms.size = [width, height];
	this.outPass = new FullscreenPass_FullscreenPass(shader);
	this.outPass.useReadBuffer = false;
//			 this.outPass.clear = true;
//			this.outPass.renderToScreen = true;

	this.blurPass = new BlurPass_BlurPass({
		sizeX: width,
		sizeY: height
	});
//			this.blurPass.needsSwap = true;

	this.depthTarget = new RenderTarget_RenderTarget(width, height, {
		magFilter: 'NearestNeighbor',
		minFilter: 'NearestNeighborNoMipMaps'
	});
	console.log('UPDATE SSAOPASS: ', width, height);
};

SsaoPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta) {
	this.depthPass.render(renderer, null, this.depthTarget, delta);

	// this.blurPass.render(renderer, this.depthTarget, this.depthTarget, delta);

	this.outPass.material.setTexture(Shader_Shader.DIFFUSE_MAP, readBuffer);
	this.outPass.material.setTexture(Shader_Shader.DEPTH_MAP, this.depthTarget);
	this.outPass.render(renderer, writeBuffer, readBuffer, delta);
};

var packDepth = {
	attributes: {
		vertexPosition: MeshData_MeshData.POSITION
	},
	uniforms: {
		viewMatrix: Shader_Shader.VIEW_MATRIX,
		projectionMatrix: Shader_Shader.PROJECTION_MATRIX,
		worldMatrix: Shader_Shader.WORLD_MATRIX
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

		ShaderFragment_ShaderFragment.methods.packDepth,

		'void main(void) {',
		'	gl_FragColor = packDepth(gl_FragCoord.z);',
		'}'//
	].join('\n')
};

/**
 * Screen Space Ambient Occlusion pass
 * @param renderList
 */
export { mod_SsaoPass as SsaoPass };