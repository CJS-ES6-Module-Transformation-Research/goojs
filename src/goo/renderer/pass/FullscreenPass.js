"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FullscreenPass = undefined;

var _Material = require("../../renderer/Material");

var _FullscreenUtils = require("../../renderer/pass/FullscreenUtils");

var _ShaderLib = require("../../renderer/shaders/ShaderLib");

var _Pass = require("../../renderer/pass/Pass");

var FullscreenPass_FullscreenPass = FullscreenPass;

function FullscreenPass(shader) {
	this.material = new _Material.Material(shader || _ShaderLib.ShaderLib.simple);
	this.useReadBuffer = true;

	this.renderToScreen = false;

	this.renderable = {
		meshData: _FullscreenUtils.FullscreenUtils.quad,
		materials: [this.material]
	};

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
	this.viewportSize = undefined;
}

FullscreenPass.prototype = Object.create(_Pass.Pass.prototype);
FullscreenPass.prototype.constructor = FullscreenPass;

FullscreenPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	if (this.useReadBuffer) {
		this.material.setTexture('DIFFUSE_MAP', readBuffer);
	}

	if (this.renderToScreen) {
		renderer.render(this.renderable, _FullscreenUtils.FullscreenUtils.camera, [], null, this.clear);
	} else {
		renderer.render(this.renderable, _FullscreenUtils.FullscreenUtils.camera, [], writeBuffer, this.clear);
	}
};

FullscreenPass.prototype.destroy = function () /* renderer */{
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
exports.FullscreenPass = FullscreenPass_FullscreenPass;