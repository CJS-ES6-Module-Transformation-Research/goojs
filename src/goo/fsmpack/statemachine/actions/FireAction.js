var mod_FireAction = FireAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { Material as Material_Material } from "../../../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLib } from "../../../renderer/shaders/ShaderLib";
import { ParticleLib as ParticleLib_ParticleLib } from "../../../particles/ParticleLib";
import { ParticleSystemUtils as ParticleSystemUtils_ParticleSystemUtils } from "../../../util/ParticleSystemUtils";

function FireAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
	this.fireEntity = null;
}

FireAction.material = null;

FireAction.prototype = Object.create(Action_Action.prototype);
FireAction.prototype.constructor = FireAction;

FireAction.external = {
	key: 'Fire',
	name: 'Fire FX',
	type: 'fx',
	description: 'Makes the entity emit fire. To "extinguish" the fire use the "Remove Particles" action.',
	parameters: [{
		name: 'Start Color',
		key: 'startColor',
		type: 'vec3',
		control: 'color',
		description: 'Flame color at source.',
		'default': [1, 1, 0]
	}, {
		name: 'End color',
		key: 'endColor',
		type: 'vec3',
		control: 'color',
		description: 'Color near the end of a flame\'s life.',
		'default': [1, 0, 0]
	}],
	transitions: []
};

FireAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (this.fireEntity && entity.transformComponent.children.indexOf(this.fireEntity.transformComponent) !== -1) {
		return;
	}

	var gooRunner = entity._world.gooRunner;

	if (!FireAction.material) {
		FireAction.material = new Material_Material(ShaderLib_ShaderLib.particles);
		var texture = ParticleSystemUtils_ParticleSystemUtils.createFlareTexture();
		texture.generateMipmaps = true;
		FireAction.material.setTexture('DIFFUSE_MAP', texture);
		FireAction.material.blendState.blending = 'AdditiveBlending';
		FireAction.material.cullState.enabled = false;
		FireAction.material.depthState.write = false;
		FireAction.material.renderQueue = 2002;
	}

	var entityScale = entity.transformComponent.sync().worldTransform.scale;
	var scale = (entityScale.x + entityScale.y + entityScale.z) / 3;
	this.fireEntity = ParticleSystemUtils_ParticleSystemUtils.createParticleSystemEntity(
		gooRunner.world,
		ParticleLib_ParticleLib.getFire({
			scale: scale,
			startColor: this.startColor,
			endColor: this.endColor
		}),
		FireAction.material
	);
	this.fireEntity.meshRendererComponent.isPickable = false;
	this.fireEntity.meshRendererComponent.castShadows = false;
	this.fireEntity.meshRendererComponent.receiveShadows = false;
	this.fireEntity.name = '_ParticleSystemFire';
	entity.transformComponent.attachChild(this.fireEntity.transformComponent);

	this.fireEntity.addToWorld();
};

FireAction.prototype.cleanup = function (/*fsm*/) {
	if (this.fireEntity) {
		this.fireEntity.removeFromWorld();
		this.fireEntity = null;
	}
};

export { mod_FireAction as FireAction };