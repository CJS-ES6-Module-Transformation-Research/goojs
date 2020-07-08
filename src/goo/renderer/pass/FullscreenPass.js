var FullscreenPass_FullscreenPass = FullscreenPass;
import { Material as rendererMaterial_Materialjs } from "../../renderer/Material";
import { camera as FullscreenUtilsjs_camera, quad as FullscreenUtilsjs_quad } from "../../renderer/pass/FullscreenUtils";
import { simple as ShaderLibjs_simple } from "../../renderer/shaders/ShaderLib";
import { Pass as rendererpassPass_Passjs } from "../../renderer/pass/Pass";
function FullscreenPass(shader) {
	this.material = new rendererMaterial_Materialjs(shader || ShaderLibjs_simple);
	this.useReadBuffer = true;

	this.renderToScreen = false;

	this.renderable = {
		meshData: FullscreenUtilsjs_quad,
		materials: [this.material]
	};

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
	this.viewportSize = undefined;
}

FullscreenPass.prototype = Object.create(rendererpassPass_Passjs.prototype);
FullscreenPass.prototype.constructor = FullscreenPass;

FullscreenPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	if (this.useReadBuffer) {
		this.material.setTexture('DIFFUSE_MAP', readBuffer);
	}

	if (this.renderToScreen) {
		renderer.render(this.renderable, FullscreenUtilsjs_camera, [], null, this.clear);
	} else {
		renderer.render(this.renderable, FullscreenUtilsjs_camera, [], writeBuffer, this.clear);
	}
};

FullscreenPass.prototype.destroy = function (/* renderer */) {
	this.material.shader.destroy();
};

FullscreenPass.prototype.invalidateHandles = function (renderer) {
	renderer.invalidateMaterial(this.renderable.materials[0]);
	renderer.invalidateMeshData(this.renderable.meshData);
};

/**
 * Fullscreen pass
 * @param shader
 */
export { FullscreenPass_FullscreenPass as FullscreenPass };