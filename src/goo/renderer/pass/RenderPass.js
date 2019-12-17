Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RenderPass = undefined;

var _Renderer = require("../../renderer/Renderer");

var _Pass = require("../../renderer/pass/Pass");

var _Vector = require("../../math/Vector4");

var exported_RenderPass = RenderPass;
function RenderPass(renderList, filter) {
	this.renderList = renderList;
	this.filter = filter;

	this.clearColor = new _Vector.Vector4(0.0, 0.0, 0.0, 0.0);
	this.oldClearColor = new _Vector.Vector4();
	this.renderToScreen = false;

	this.overrideMaterial = null;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;
	this.viewportSize = undefined;
}

RenderPass.prototype = Object.create(_Pass.Pass.prototype);
RenderPass.prototype.constructor = RenderPass;

// RenderPasses may have a fourth additional parameter called delta
RenderPass.prototype.render = function (renderer, writeBuffer, readBuffer, delta, maskActive, camera, lights, clearColor) {
	camera = camera || _Renderer.Renderer.mainCamera;

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

/**
 * A pass that renders provided renderlist to the rendertarget or screen
 */
exports.RenderPass = exported_RenderPass;
