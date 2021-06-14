"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FireAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Material = require("../../../renderer/Material");

var _ShaderLib = require("../../../renderer/shaders/ShaderLib");

var _ParticleLib = require("../../../particles/ParticleLib");

var _ParticleSystemUtils = require("../../../util/ParticleSystemUtils");

var mod_FireAction = FireAction;

function FireAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
	this.fireEntity = null;
}

FireAction.material = null;

FireAction.prototype = Object.create(_Action.Action.prototype);
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
		FireAction.material = new _Material.Material(_ShaderLib.ShaderLib.particles);
		var texture = (0, _ParticleSystemUtils.createFlareTexture)();
		texture.generateMipmaps = true;
		FireAction.material.setTexture('DIFFUSE_MAP', texture);
		FireAction.material.blendState.blending = 'AdditiveBlending';
		FireAction.material.cullState.enabled = false;
		FireAction.material.depthState.write = false;
		FireAction.material.renderQueue = 2002;
	}

	var entityScale = entity.transformComponent.sync().worldTransform.scale;
	var scale = (entityScale.x + entityScale.y + entityScale.z) / 3;
	this.fireEntity = (0, _ParticleSystemUtils.createParticleSystemEntity)(gooRunner.world, (0, _ParticleLib.getFire)({
		scale: scale,
		startColor: this.startColor,
		endColor: this.endColor
	}), FireAction.material);
	this.fireEntity.meshRendererComponent.isPickable = false;
	this.fireEntity.meshRendererComponent.castShadows = false;
	this.fireEntity.meshRendererComponent.receiveShadows = false;
	this.fireEntity.name = '_ParticleSystemFire';
	entity.transformComponent.attachChild(this.fireEntity.transformComponent);

	this.fireEntity.addToWorld();
};

FireAction.prototype.cleanup = function () /*fsm*/{
	if (this.fireEntity) {
		this.fireEntity.removeFromWorld();
		this.fireEntity = null;
	}
};

exports.FireAction = mod_FireAction;