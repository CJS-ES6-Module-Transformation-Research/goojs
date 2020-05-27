var SetRenderTargetAction_SetRenderTargetAction = SetRenderTargetAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { PortalComponent as entitiescomponentsPortalComponent_PortalComponentjs } from "../../../entities/components/PortalComponent";
import { PortalSystem as entitiessystemsPortalSystem_PortalSystemjs } from "../../../entities/systems/PortalSystem";
import { Material as rendererMaterial_Materialjs } from "../../../renderer/Material";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../../../renderer/shaders/ShaderLib";

function SetRenderTargetAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

SetRenderTargetAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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
		world.setSystem(new entitiessystemsPortalSystem_PortalSystemjs(renderer, renderSystem));
	}
};

SetRenderTargetAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var world = entity._world;

	var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);

	if (!cameraEntity || !cameraEntity.cameraComponent || !cameraEntity.cameraComponent.camera) { return; }
	var camera = cameraEntity.cameraComponent.camera;

	var portalMaterial = new rendererMaterial_Materialjs(renderershadersShaderLib_ShaderLibjs.textured);

	if (!entity.meshRendererComponent) { return; }
	this.oldMaterials = entity.meshRendererComponent.materials;
	entity.meshRendererComponent.materials = [portalMaterial];

	var portalComponent = new entitiescomponentsPortalComponent_PortalComponentjs(camera, 500, { preciseRecursion: true });
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

export { SetRenderTargetAction_SetRenderTargetAction as SetRenderTargetAction };