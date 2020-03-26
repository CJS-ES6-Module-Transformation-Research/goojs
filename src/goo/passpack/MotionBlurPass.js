import { Shader as rendererShader_Shaderjs } from "../renderer/Shader";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../renderer/shaders/ShaderLib";
import { MeshData as rendererMeshData_MeshDatajs } from "../renderer/MeshData";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../renderer/pass/RenderTarget";
import { FullscreenPass as rendererpassFullscreenPass_FullscreenPassjs } from "../renderer/pass/FullscreenPass";
import { Pass as rendererpassPass_Passjs } from "../renderer/pass/Pass";

function MotionBlurPass() {
	this.inPass = new rendererpassFullscreenPass_FullscreenPassjs(blendShader);
	this.outPass = new rendererpassFullscreenPass_FullscreenPassjs(renderershadersShaderLib_ShaderLibjs.copyPure);

	var width = window.innerWidth || 1024;
	var height = window.innerHeight || 1024;
	this.updateSize({
		x: 0,
		y: 0,
		width: width,
		height: height
	});
	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
}

MotionBlurPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
MotionBlurPass.prototype.constructor = MotionBlurPass;

MotionBlurPass.prototype.destroy = function (renderer) {
	this.inPass.destroy(renderer);
	this.outPass.destroy(renderer);
	if (this.targetSwap) {
		this.targetSwap[0].destroy(renderer.context);
		this.targetSwap[1].destroy(renderer.context);
		this.targetSwap = undefined;
	}
};

MotionBlurPass.prototype.invalidateHandles = function (renderer) {
	this.inPass.invalidateHandles(renderer);
	this.outPass.invalidateHandles(renderer);
	renderer.invalidateRenderTarget(this.targetSwap[0]);
	renderer.invalidateRenderTarget(this.targetSwap[1]);
};

MotionBlurPass.prototype.updateSize = function (size, renderer) {
	var sizeX = size.width;
	var sizeY = size.height;

	if (this.targetSwap) {
		for (var i = 0; i < this.targetSwap.length; i++) {
			renderer._deallocateRenderTarget(this.targetSwap[i]);
		}
	}

	this.targetSwap = [
		new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY),
		new rendererpassRenderTarget_RenderTargetjs(sizeX, sizeY)
	];
};

MotionBlurPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	this.inPass.material.setTexture('MOTION_MAP', this.targetSwap[1]);
	this.inPass.render(renderer, this.targetSwap[0], readBuffer);
	this.outPass.render(renderer, writeBuffer, this.targetSwap[0]);
	this.targetSwap.reverse();
};

var blendShader = {
	defines: {},
	processors: [function (shader, shaderInfo) {
		if (shaderInfo.material._textureMaps.MOTION_MAP.glTexture) {
			shader.setDefine('MOTION_MAP', true);
		} else {
			shader.removeDefine('MOTION_MAP');
		}
	}],
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION,
		vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
	},
	uniforms: {
		viewProjectionMatrix: rendererShader_Shaderjs.VIEW_PROJECTION_MATRIX,
		worldMatrix: rendererShader_Shaderjs.WORLD_MATRIX,
		blend: 0.90,
		scale: 1.0,
		diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP,
		motionMap: 'MOTION_MAP'
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
	fshader: [
		'uniform sampler2D diffuseMap;',
		'uniform sampler2D motionMap;',
		'uniform float blend;',
		'uniform float scale;',

		'varying vec2 texCoord0;',

		'void main(void)',
		'{',
		'    vec4 colA = texture2D(diffuseMap, texCoord0);',
		'    #ifdef MOTION_MAP',
		'    vec4 colB = texture2D(motionMap, (texCoord0 - 0.5) / scale + 0.5);',
		'    float wBlend = blend;// * length(colB) / sqrt(3.0);',
		'    gl_FragColor = mix(colA, colB, wBlend);',
		'    #else',
		'    gl_FragColor = colA;',
		'    #endif',
		'}'
	].join('\n')
};

var exported_MotionBlurPass = MotionBlurPass;
export { exported_MotionBlurPass as MotionBlurPass };