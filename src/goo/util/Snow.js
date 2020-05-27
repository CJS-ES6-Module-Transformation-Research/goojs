"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Snow = undefined;

var _Material = require("../renderer/Material");

var _ShaderLib = require("../renderer/shaders/ShaderLib");

var _ParticleLib = require("../particles/ParticleLib");

var _ParticleSystemUtils = require("../util/ParticleSystemUtils");

var _Renderer = require("../renderer/Renderer");

var _Vector = require("../math/Vector3");

var Snow_Snow = Snow;

function Snow(gooRunner) {
	this.velocity = 10;
	this.height = 25;

	// put this in some subroutine
	this.material = new _Material.Material(_ShaderLib.ShaderLib.particles);
	var texture = _ParticleSystemUtils.ParticleSystemUtils.createFlareTexture(64); //Snowflake
	texture.generateMipmaps = true;
	this.material.setTexture('DIFFUSE_MAP', texture);
	this.material.blendState.blending = 'AdditiveBlending';
	this.material.cullState.enabled = false;
	this.material.depthState.write = false;
	this.material.renderQueue = 2002;

	// actually needed
	var that = this;

	// and this too
	this.particleCloudEntity = _ParticleSystemUtils.ParticleSystemUtils.createParticleSystemEntity(gooRunner.world, _ParticleLib.ParticleLib.getSnow({
		getEmissionPoint: function getEmissionPoint(vec3) {
			// either camera or some predefined area

			// camera
			vec3.copy(_Renderer.Renderer.mainCamera ? _Renderer.Renderer.mainCamera.translation : new _Vector.Vector3());
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

	this.particleCloudEntity.transformComponent.transform.translation.copy(_Renderer.Renderer.mainCamera ? _Renderer.Renderer.mainCamera.translation : new _Vector.Vector3());

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

/**
 * Snow
 * @param {GooRunner} gooRunner
 */
exports.Snow = Snow_Snow;