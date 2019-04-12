Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SmokeAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Material = require("../../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _ShaderLib = require("../../../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _ParticleLib = require("../../../particles/ParticleLib");

var _ParticleLib2 = _interopRequireDefault(_ParticleLib);

var _ParticleSystemUtils = require("../../../util/ParticleSystemUtils");

var _ParticleSystemUtils2 = _interopRequireDefault(_ParticleSystemUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SmokeAction() {
	_Action2.default.apply(this, arguments);
	this.smokeEntity = null;
}

SmokeAction.material = null;

SmokeAction.prototype = Object.create(_Action2.default.prototype);
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
		SmokeAction.material = new _Material2.default(_ShaderLib2.default.particles);
		var texture = _ParticleSystemUtils2.default.createFlareTexture();
		texture.generateMipmaps = true;
		SmokeAction.material.setTexture('DIFFUSE_MAP', texture);
		SmokeAction.material.blendState.blending = 'TransparencyBlending';
		SmokeAction.material.cullState.enabled = false;
		SmokeAction.material.depthState.write = false;
		SmokeAction.material.renderQueue = 2001;
	}

	var entityScale = entity.transformComponent.sync().worldTransform.scale;
	var scale = (entityScale.x + entityScale.y + entityScale.z) / 3;
	this.smokeEntity = _ParticleSystemUtils2.default.createParticleSystemEntity(gooRunner.world, _ParticleLib2.default.getSmoke({
		scale: scale,
		color: this.color
	}), SmokeAction.material);
	this.smokeEntity.meshRendererComponent.isPickable = false;
	this.smokeEntity.meshRendererComponent.castShadows = false;
	this.smokeEntity.meshRendererComponent.receiveShadows = false;
	this.smokeEntity.name = '_ParticleSystemSmoke';
	entity.transformComponent.attachChild(this.smokeEntity.transformComponent);

	this.smokeEntity.addToWorld();
};

SmokeAction.prototype.cleanup = function () /*fsm*/{
	if (this.smokeEntity) {
		this.smokeEntity.removeFromWorld();
		this.smokeEntity = null;
	}
};
module.exports = exports.default;
