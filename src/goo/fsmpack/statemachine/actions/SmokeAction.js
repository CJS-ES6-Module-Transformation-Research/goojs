var SmokeAction_SmokeAction = SmokeAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Material as rendererMaterial_Materialjs } from "../../../renderer/Material";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../../../renderer/shaders/ShaderLib";
import { ParticleLib as particlesParticleLib_ParticleLibjs } from "../../../particles/ParticleLib";
import { ParticleSystemUtils as utilParticleSystemUtils_ParticleSystemUtilsjs } from "../../../util/ParticleSystemUtils";

function SmokeAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
	this.smokeEntity = null;
}

SmokeAction.material = null;

SmokeAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
SmokeAction.prototype.constructor = SmokeAction;

SmokeAction.external = {
	key: 'Smoke',
	name: 'Smoke FX',
	type: 'fx',
	description: 'Makes the entity emit smoke. To cancel the smoke emitter use the "Remove Particles" action.',
	parameters: [{
		name: 'Color',
		key: 'color',
		type: 'vec3',
		control: 'color',
		description: 'Smoke color.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

SmokeAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (this.smokeEntity && entity.transformComponent.children.indexOf(this.smokeEntity.transformComponent) !== -1) {
		return;
	}

	var gooRunner = entity._world.gooRunner;

	if (!SmokeAction.material) {
		SmokeAction.material = new rendererMaterial_Materialjs(renderershadersShaderLib_ShaderLibjs.particles);
		var texture = utilParticleSystemUtils_ParticleSystemUtilsjs.createFlareTexture();
		texture.generateMipmaps = true;
		SmokeAction.material.setTexture('DIFFUSE_MAP', texture);
		SmokeAction.material.blendState.blending = 'TransparencyBlending';
		SmokeAction.material.cullState.enabled = false;
		SmokeAction.material.depthState.write = false;
		SmokeAction.material.renderQueue = 2001;
	}

	var entityScale = entity.transformComponent.sync().worldTransform.scale;
	var scale = (entityScale.x + entityScale.y + entityScale.z) / 3;
	this.smokeEntity = utilParticleSystemUtils_ParticleSystemUtilsjs.createParticleSystemEntity(
		gooRunner.world,
		particlesParticleLib_ParticleLibjs.getSmoke({
			scale: scale,
			color: this.color
		}),
		SmokeAction.material
	);
	this.smokeEntity.meshRendererComponent.isPickable = false;
	this.smokeEntity.meshRendererComponent.castShadows = false;
	this.smokeEntity.meshRendererComponent.receiveShadows = false;
	this.smokeEntity.name = '_ParticleSystemSmoke';
	entity.transformComponent.attachChild(this.smokeEntity.transformComponent);

	this.smokeEntity.addToWorld();
};

SmokeAction.prototype.cleanup = function (/*fsm*/) {
	if (this.smokeEntity) {
		this.smokeEntity.removeFromWorld();
		this.smokeEntity = null;
	}
};

export { SmokeAction_SmokeAction as SmokeAction };