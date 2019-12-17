Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RenderInfo = undefined;

var _Entity = require("../entities/Entity");

var _Transform = require("../math/Transform");

var exported_RenderInfo = RenderInfo;

function RenderInfo() {
	this.reset();

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

/**
 * Reset for switching renderable
 */

RenderInfo.prototype.reset = function () {
	this.renderable = null;
	this.lights = null;
	this.materials = null;
	this.meshData = null;
	this.camera = null;
	this.mainCamera = null;
	this.lights = null;
	this.shadowHandler = null;
	this.renderer = null;
	this.material = null;
	this.transform = null;
	this.currentPose = null;
};

/**
 * Populates data from renderable
 */

RenderInfo.prototype.fill = function (renderable) {
	if (renderable instanceof _Entity.Entity) {
		this.meshData = renderable.meshDataComponent.meshData;
		this.materials = renderable.meshRendererComponent.materials;
		this.transform = renderable.particleComponent ? _Transform.Transform.IDENTITY : renderable.transformComponent.sync().worldTransform;
		if (renderable.meshDataComponent.currentPose) {
			this.currentPose = renderable.meshDataComponent.currentPose;
		} else {
			this.currentPose = null;
		}
	} else {
		this.meshData = renderable.meshData;
		this.materials = renderable.materials;
		this.transform = renderable.transform;
		if (renderable.currentPose) {
			this.currentPose = renderable.currentPose;
		} else {
			this.currentPose = null;
		}
	}

	this.renderable = renderable;
};

/**
 * Holds configuration data for renderable objects.
 */

exports.RenderInfo = exported_RenderInfo;
