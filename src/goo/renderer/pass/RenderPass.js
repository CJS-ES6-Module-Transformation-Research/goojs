import { Renderer as Rendererjs } from "../../renderer/Renderer";
import { Pass as Passjs } from "../../renderer/pass/Pass";
import { Vector4 as Vector4js } from "../../math/Vector4";
function RenderPass(renderList, filter) {
	this.renderList = renderList;
	this.filter = filter;

	this.clearColor = new Vector4js(0.0, 0.0, 0.0, 0.0);
	this.oldClearColor = new Vector4js();
	this.renderToScreen = false;

	this.overrideMaterial = null;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;
	this.viewportSize = undefined;
}

RenderPass.prototype = Object.create(Passjs.prototype);
RenderPass.prototype.constructor = RenderPass;

// RenderPasses may have a fourth additional parameter called delta
RenderPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta, maskActive, camera, lights, clearColor) {
	camera = camera || Rendererjs.mainCamera;

	if (!camera) {
		return;
	}

	lights = lights || [];
	if (clearColor && false) {
		this.oldClearColor.set(renderer.clearColor);
		renderer.setClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
	}

	var renderList;
	if (this.filter) {
		renderList = this.renderList.filter(this.filter);
	} else {
		renderList = this.renderList;
	}
	if (this.renderToScreen) {
		renderer.render(renderList, camera, lights, null, this.clear, this.overrideMaterial);
	} else {
		renderer.render(renderList, camera, lights, readBuffer, this.clear, this.overrideMaterial);
	}

	if (this.clearColor && false) {
		renderer.setClearColor(this.oldClearColor.x, this.oldClearColor.y, this.oldClearColor.z, this.oldClearColor.w);
	}
};

var exported_RenderPass = RenderPass;

/**
 * A pass that renders provided renderlist to the rendertarget or screen
 */
export { exported_RenderPass as RenderPass };