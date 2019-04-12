Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FullscreenPass;

var _Material = require("../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _FullscreenUtils = require("../../renderer/pass/FullscreenUtils");

var _FullscreenUtils2 = _interopRequireDefault(_FullscreenUtils);

var _ShaderLib = require("../../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _Pass = require("../../renderer/pass/Pass");

var _Pass2 = _interopRequireDefault(_Pass);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Fullscreen pass
 * @param shader
 */
function FullscreenPass(shader) {
	this.material = new _Material2.default(shader || _ShaderLib2.default.simple);
	this.useReadBuffer = true;

	this.renderToScreen = false;

	this.renderable = {
		meshData: _FullscreenUtils2.default.quad,
		materials: [this.material]
	};

	this.enabled = true;
	this.clear = false;
	this.needsSwap = true;
	this.viewportSize = undefined;
}

FullscreenPass.prototype = Object.create(_Pass2.default.prototype);
FullscreenPass.prototype.constructor = FullscreenPass;

FullscreenPass.prototype.render = function (renderer, writeBuffer, readBuffer) {
	if (this.useReadBuffer) {
		this.material.setTexture('DIFFUSE_MAP', readBuffer);
	}

	if (this.renderToScreen) {
		renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], null, this.clear);
	} else {
		renderer.render(this.renderable, _FullscreenUtils2.default.camera, [], writeBuffer, this.clear);
	}
};

FullscreenPass.prototype.destroy = function () /* renderer */{
	this.material.shader.destroy();
};

FullscreenPass.prototype.invalidateHandles = function (renderer) {
	renderer.invalidateMaterial(this.renderable.materials[0]);
	renderer.invalidateMeshData(this.renderable.meshData);
};
module.exports = exports.default;
