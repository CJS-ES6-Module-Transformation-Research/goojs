import { Material as Materialjs } from "../../renderer/Material";
import { camera as FullscreenUtilsjs_camera, quad as FullscreenUtilsjs_quad } from "../../renderer/pass/FullscreenUtils";
import { simple as ShaderLibjs_simple } from "../../renderer/shaders/ShaderLib";
import { Pass as Pass_Passjs } from "../../renderer/pass/Pass";
function FullscreenPass(shader) {
	this.material = new Materialjs(shader || ShaderLibjs_simple);
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

FullscreenPass.prototype = Object.create(Pass_Passjs.prototype);
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

var exported_FullscreenPass = FullscreenPass;

/**
 * Fullscreen pass
 * @param shader
 */
export { exported_FullscreenPass as FullscreenPass };