var mod_FullscreenPass = FullscreenPass;
import { Material as Material_Material } from "../../renderer/Material";
import { FullscreenUtils as FullscreenUtils_FullscreenUtils } from "../../renderer/pass/FullscreenUtils";
import { ShaderLib as ShaderLib_ShaderLib } from "../../renderer/shaders/ShaderLib";
import { Pass as Pass_Pass } from "../../renderer/pass/Pass";

/**
 * Fullscreen pass
 * @param shader
 */
function FullscreenPass(shader) {
	this.material = new Material_Material(shader || ShaderLib_ShaderLib.simple);
	this.useReadBuffer = true;

	this.renderToScreen = false;

	this.renderable = {
		meshData: FullscreenUtils_FullscreenUtils.quad,
		materials: [this.material]
	};

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
	this.viewportSize = undefined;
}

FullscreenPass.prototype = Object.create(Pass_Pass.prototype);
FullscreenPass.prototype.constructor = FullscreenPass;

FullscreenPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	if (this.useReadBuffer) {
		this.material.setTexture('DIFFUSE_MAP', readBuffer);
	}

	if (this.renderToScreen) {
		renderer.render(this.renderable, FullscreenUtils_FullscreenUtils.camera, [], null, this.clear);
	} else {
		renderer.render(this.renderable, FullscreenUtils_FullscreenUtils.camera, [], writeBuffer, this.clear);
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
export { mod_FullscreenPass as FullscreenPass };