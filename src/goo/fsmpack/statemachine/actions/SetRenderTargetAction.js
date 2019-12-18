Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetRenderTargetAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _PortalComponent = require("../../../entities/components/PortalComponent");

var _PortalSystem = require("../../../entities/systems/PortalSystem");

var _Material = require("../../../renderer/Material");

var _ShaderLib = require("../../../renderer/shaders/ShaderLib");

var ShaderLib = _interopRequireWildcard(_ShaderLib);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

var exported_SetRenderTargetAction = SetRenderTargetAction;

function SetRenderTargetAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

SetRenderTargetAction.prototype = Object.create(_Action.Action.prototype);
SetRenderTargetAction.prototype.constructor = SetRenderTargetAction;

SetRenderTargetAction.external = {
	key: 'Set Render Target',
	name: 'Set Render Target',
	type: 'texture',
	description: 'Renders what a camera sees on the current entity\'s texture.',
	parameters: [{
		name: 'Camera',
		key: 'cameraEntityRef',
		type: 'camera',
		description: 'Camera to use as source.',
		'default': null
	}],
	transitions: []
};

SetRenderTargetAction.prototype.ready = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var world = entity._world;
	if (!world.getSystem('PortalSystem')) {
		var renderSystem = world.getSystem('RenderSystem');
		var renderer = world.gooRunner.renderer;
		world.setSystem(new _PortalSystem.PortalSystem(renderer, renderSystem));
	}
};

SetRenderTargetAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var world = entity._world;

	var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);

	if (!cameraEntity || !cameraEntity.cameraComponent || !cameraEntity.cameraComponent.camera) {
		return;
	}
	var camera = cameraEntity.cameraComponent.camera;

	var portalMaterial = new _Material.Material(ShaderLib.textured);

	if (!entity.meshRendererComponent) {
		return;
	}
	this.oldMaterials = entity.meshRendererComponent.materials;
	entity.meshRendererComponent.materials = [portalMaterial];

	var portalComponent = new _PortalComponent.PortalComponent(camera, 500, { preciseRecursion: true });
	entity.setComponent(portalComponent);
};

SetRenderTargetAction.prototype.cleanup = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity) {
		if (this.oldMaterials && entity.meshRendererComponent) {
			entity.meshRendererComponent.materials = this.oldMaterials;
		}
		entity.clearComponent('portalComponent');
	}

	this.oldMaterials = null;

	// would remove the entire system, but the engine does not support that
};

exports.SetRenderTargetAction = exported_SetRenderTargetAction;
