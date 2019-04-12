Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Snow;

var _Material = require("../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _ShaderLib = require("../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _ParticleLib = require("../particles/ParticleLib");

var _ParticleLib2 = _interopRequireDefault(_ParticleLib);

var _ParticleSystemUtils = require("../util/ParticleSystemUtils");

var _ParticleSystemUtils2 = _interopRequireDefault(_ParticleSystemUtils);

var _Renderer = require("../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Vector = require("../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Snow
 * @param {GooRunner} gooRunner
 */
function Snow(gooRunner) {
	this.velocity = 10;
	this.height = 25;

	// put this in some subroutine
	this.material = new _Material2.default(_ShaderLib2.default.particles);
	var texture = _ParticleSystemUtils2.default.createFlareTexture(64); //Snowflake
	texture.generateMipmaps = true;
	this.material.setTexture('DIFFUSE_MAP', texture);
	this.material.blendState.blending = 'AdditiveBlending';
	this.material.cullState.enabled = false;
	this.material.depthState.write = false;
	this.material.renderQueue = 2002;

	// actually needed
	var that = this;

	// and this too
	this.particleCloudEntity = _ParticleSystemUtils2.default.createParticleSystemEntity(gooRunner.world, _ParticleLib2.default.getSnow({
		getEmissionPoint: function getEmissionPoint(vec3) {
			// either camera or some predefined area

			// camera
			vec3.copy(_Renderer2.default.mainCamera ? _Renderer2.default.mainCamera.translation : new _Vector2.default());
			vec3.x += Math.random() * 1000 - 500;
			vec3.y += that.height; // put higher than camera
			vec3.z += Math.random() * 1000 - 500;
		},
		getEmissionVelocity: function getEmissionVelocity(vec3) {
			vec3.x = (Math.random() - 0.5) * 2;
			vec3.y = -(Math.random() + 1) * that.velocity;
			vec3.z = (Math.random() - 0.5) * 2;
		}
	}), this.material);
	this.particleCloudEntity.name = '_ParticleSystemSnow';

	this.onCameraChange = function (newCam) {
		newCam.entity.attachChild(this.particleCloudEntity);
	}.bind(this);

	this.particleCloudEntity.transformComponent.transform.translation.copy(_Renderer2.default.mainCamera ? _Renderer2.default.mainCamera.translation : new _Vector2.default());

	this.particleCloudEntity.addToWorld();
	//SystemBus.addListener('goo.setCurrentCamera', this.onCameraChange);
}

Snow.prototype.setEmissionVelocity = function (velocity) {
	if (velocity) {
		this.velocity = velocity;

		// change velocity of all particles in the particle system
		// hack, but necessary for this particular situation
		var particleComponent = this.particleCloudEntity.particleComponent;
		var particles = particleComponent.particles;

		for (var i = 0; i < particles.length; i++) {
			particles[i].velocity.y = -(Math.random() + 1) * this.velocity; //this.velocity;
		}
	}
};

Snow.prototype.setEmissionHeight = function (height) {
	if (height) {
		this.height = height;
	}
};

Snow.prototype.setReleaseRatePerSecond = function (releaseRatePerSecond) {
	if (releaseRatePerSecond) {
		var particleComponent = this.particleCloudEntity.particleComponent;
		var emitter = particleComponent.emitters[0];
		emitter.releaseRatePerSecond = releaseRatePerSecond;
	}
};

Snow.prototype.remove = function () {
	//SystemBus.removeListener('goo.setCurrentCamera', this.onCameraChange);
	this.particleCloudEntity.removeFromWorld();
};
module.exports = exports.default;
