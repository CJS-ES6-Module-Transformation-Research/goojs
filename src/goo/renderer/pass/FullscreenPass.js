import { Material } from "../../renderer/Material";
import * as FullscreenUtils from "../../renderer/pass/FullscreenUtils";
import * as ShaderLib from "../../renderer/shaders/ShaderLib";
import { Pass } from "../../renderer/pass/Pass";
var exported_FullscreenPass = FullscreenPass;
function FullscreenPass(shader) {
	this.material = new Material(shader || ShaderLib.simple);
	this.useReadBuffer = true;

	this.renderToScreen = false;

	this.renderable = {
		meshData: FullscreenUtils.quad,
		materials: [this.material]
	};

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
	this.viewportSize = undefined;
}

FullscreenPass.prototype = Object.create(Pass.prototype);
FullscreenPass.prototype.constructor = FullscreenPass;

FullscreenPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	if (this.useReadBuffer) {
		this.material.setTexture('DIFFUSE_MAP', readBuffer);
	}

	if (this.renderToScreen) {
		renderer.render(this.renderable, FullscreenUtils.camera, [], null, this.clear);
	} else {
		renderer.render(this.renderable, FullscreenUtils.camera, [], writeBuffer, this.clear);
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
export { exported_FullscreenPass as FullscreenPass };