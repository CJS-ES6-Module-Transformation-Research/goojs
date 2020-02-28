import { Action as Action_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { PortalComponent as PortalComponentjs } from "../../../entities/components/PortalComponent";
import { PortalSystem as PortalSystemjs } from "../../../entities/systems/PortalSystem";
import { Material as Materialjs } from "../../../renderer/Material";
import { textured as ShaderLibjs_textured } from "../../../renderer/shaders/ShaderLib";

function SetRenderTargetAction/*id, settings*/() {
	Action_Actionjs.apply(this, arguments);
}

SetRenderTargetAction.prototype = Object.create(Action_Actionjs.prototype);
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
		world.setSystem(new PortalSystemjs(renderer, renderSystem));
	}
};

SetRenderTargetAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var world = entity._world;

	var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);

	if (!cameraEntity || !cameraEntity.cameraComponent || !cameraEntity.cameraComponent.camera) { return; }
	var camera = cameraEntity.cameraComponent.camera;

	var portalMaterial = new Materialjs(ShaderLibjs_textured);

	if (!entity.meshRendererComponent) { return; }
	this.oldMaterials = entity.meshRendererComponent.materials;
	entity.meshRendererComponent.materials = [portalMaterial];

	var portalComponent = new PortalComponentjs(camera, 500, { preciseRecursion: true });
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

var exported_SetRenderTargetAction = SetRenderTargetAction;
export { exported_SetRenderTargetAction as SetRenderTargetAction };