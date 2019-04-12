Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Renderer = exports.RendererRecord = undefined;

var _Renderer = require("../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var _RendererRecord = require("../renderer/RendererRecord");

var _RendererRecord2 = _interopRequireDefault(_RendererRecord);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.RendererRecord = _RendererRecord2.default;
exports.Renderer = _Renderer2.default;

_Renderer2.default.prototype.invalidateBuffer = function (buffer) {
	buffer.glBuffer = null;
};

_Renderer2.default.prototype.invalidateMeshData = function (meshData) {
	this.invalidateBuffer(meshData.vertexData);
	if (meshData.indexData) {
		this.invalidateBuffer(meshData.indexData);
	}
	if (meshData.wireframeData) {
		this.invalidateMeshData(meshData.wireframeData);
	}
	if (meshData.flatMeshData) {
		this.invalidateMeshData(meshData.flatMeshData);
	}
};

_Renderer2.default.prototype.invalidateTexture = function (texture) {
	texture.glTexture = null;
	texture.textureRecord = {};
};

_Renderer2.default.prototype.invalidateShader = function (shader) {
	shader.shaderProgram = null;
	shader.vertexShader = null;
	shader.fragmentShader = null;
};

_Renderer2.default.prototype.invalidateMaterial = function (material) {
	var keys = Object.keys(material._textureMaps);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var texture = material._textureMaps[key];
		this.invalidateTexture(texture);
	}

	this.invalidateShader(material.shader);
};

_Renderer2.default.prototype.invalidateRenderTarget = function (renderTarget) {
	renderTarget.glTexture = null;
	renderTarget._glRenderBuffer = null;
	renderTarget._glFrameBuffer = null;
	delete renderTarget.textureRecord;
};

_Renderer2.default.prototype.invalidateComposer = function (composer) {
	if (composer.writeBuffer && !composer._passedWriteBuffer) {
		this.invalidateRenderTarget(composer.writeBuffer);
	}
	if (composer.readBuffer) {
		this.invalidateRenderTarget(composer.readBuffer);
	}

	composer.copyPass.invalidateHandles(this);

	for (var i = 0; i < composer.passes.length; i++) {
		var pass = composer.passes[i];
		// every pass has to do its own internal cleaning
		pass.invalidateHandles(this);
	}
};

_Renderer2.default.prototype.invalidatePicking = function () {
	if (this.hardwarePicking) {
		if (this.hardwarePicking.pickingTarget) {
			this.invalidateRenderTarget(this.hardwarePicking.pickingTarget);
		}
		this.invalidateMaterial(this.hardwarePicking.pickingMaterial);
	}
};

_Renderer2.default.prototype._restoreContext = function () {
	this.establishContext();

	this.rendererRecord = new _RendererRecord2.default();

	this.context.clearColor(this._clearColor.x, this._clearColor.y, this._clearColor.z, this._clearColor.w);
};
