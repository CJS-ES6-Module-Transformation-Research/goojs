import { Material as Material_Materialjs } from "../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLibjs } from "../renderer/shaders/ShaderLib";
import { ParticleLib as ParticleLib_ParticleLibjs } from "../particles/ParticleLib";
import { ParticleSystemUtils as ParticleSystemUtils_ParticleSystemUtilsjs } from "../util/ParticleSystemUtils";
import { Renderer as Renderer_Rendererjs } from "../renderer/Renderer";
import { Vector3 as Vector3_Vector3js } from "../math/Vector3";
function Snow(gooRunner) {
	this.velocity = 10;
	this.height = 25;

	// put this in some subroutine
	this.material = new Material_Materialjs(ShaderLib_ShaderLibjs.particles);
	var texture = ParticleSystemUtils_ParticleSystemUtilsjs.createFlareTexture(64); //Snowflake
	texture.generateMipmaps = true;
	this.material.setTexture('DIFFUSE_MAP', texture);
	this.material.blendState.blending = 'AdditiveBlending';
	this.material.cullState.enabled = false;
	this.material.depthState.write = false;
	this.material.renderQueue = 2002;

	// actually needed
	var that = this;

	// and this too
	this.particleCloudEntity = ParticleSystemUtils_ParticleSystemUtilsjs.createParticleSystemEntity(
		gooRunner.world,
		ParticleLib_ParticleLibjs.getSnow({
			getEmissionPoint: function (vec3) {
				// either camera or some predefined area

				// camera
				vec3.copy(Renderer_Rendererjs.mainCamera ? Renderer_Rendererjs.mainCamera.translation : new Vector3_Vector3js());
				vec3.x += Math.random() * 1000 - 500;
				vec3.y += that.height; // put higher than camera
				vec3.z += Math.random() * 1000 - 500;
			},
			getEmissionVelocity: function (vec3) {
				vec3.x = (Math.random() - 0.5) * 2;
				vec3.y = -(Math.random() + 1) * that.velocity;
				vec3.z = (Math.random() - 0.5) * 2;
			}
		}),
		this.material
	);
	this.particleCloudEntity.name = '_ParticleSystemSnow';

	this.onCameraChange = function (newCam) {
		newCam.entity.attachChild(this.particleCloudEntity);
	}.bind(this);

	this.particleCloudEntity.transformComponent.transform.translation.copy(Renderer_Rendererjs.mainCamera ? Renderer_Rendererjs.mainCamera.translation : new Vector3_Vector3js());

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

var exported_Snow = Snow;

/**
 * Snow
 * @param {GooRunner} gooRunner
 */
export { exported_Snow as Snow };
