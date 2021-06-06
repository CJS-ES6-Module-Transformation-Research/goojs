var mod_SetRenderTargetAction = SetRenderTargetAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { PortalComponent as PortalComponent_PortalComponent } from "../../../entities/components/PortalComponent";
import { PortalSystem as PortalSystem_PortalSystem } from "../../../entities/systems/PortalSystem";
import { Material as Material_Material } from "../../../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLib } from "../../../renderer/shaders/ShaderLib";

function SetRenderTargetAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

SetRenderTargetAction.prototype = Object.create(Action_Action.prototype);
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
		world.setSystem(new PortalSystem_PortalSystem(renderer, renderSystem));
	}
};

SetRenderTargetAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var world = entity._world;

	var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);

	if (!cameraEntity || !cameraEntity.cameraComponent || !cameraEntity.cameraComponent.camera) { return; }
	var camera = cameraEntity.cameraComponent.camera;

	var portalMaterial = new Material_Material(ShaderLib_ShaderLib.textured);

	if (!entity.meshRendererComponent) { return; }
	this.oldMaterials = entity.meshRendererComponent.materials;
	entity.meshRendererComponent.materials = [portalMaterial];

	var portalComponent = new PortalComponent_PortalComponent(camera, 500, { preciseRecursion: true });
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

export { mod_SetRenderTargetAction as SetRenderTargetAction };