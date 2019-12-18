Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FireAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Material = require("../../../renderer/Material");

var _ShaderLib = require("../../../renderer/shaders/ShaderLib");

var ShaderLib = _interopRequireWildcard(_ShaderLib);

var _ParticleLib = require("../../../particles/ParticleLib");

var ParticleLib = _interopRequireWildcard(_ParticleLib);

var _ParticleSystemUtils = require("../../../util/ParticleSystemUtils");

var ParticleSystemUtils = _interopRequireWildcard(_ParticleSystemUtils);

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

function FireAction /*id, settings*/() {
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
		FireAction.material = new _Material.Material(ShaderLib.particles);
		var texture = ParticleSystemUtils.createFlareTexture();
		texture.generateMipmaps = true;
		FireAction.material.setTexture('DIFFUSE_MAP', texture);
		FireAction.material.blendState.blending = 'AdditiveBlending';
		FireAction.material.cullState.enabled = false;
		FireAction.material.depthState.write = false;
		FireAction.material.renderQueue = 2002;
	}

	var entityScale = entity.transformComponent.sync().worldTransform.scale;
	var scale = (entityScale.x + entityScale.y + entityScale.z) / 3;
	this.fireEntity = ParticleSystemUtils.createParticleSystemEntity(gooRunner.world, ParticleLib.getFire({
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

var exported_FireAction = FireAction;
exports.FireAction = exported_FireAction;
