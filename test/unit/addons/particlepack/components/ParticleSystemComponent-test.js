var _CustomMatchers = require("../../../CustomMatchers");

var _LinearCurve = require("../../../../../src/goo/addons/particlepack/curves/LinearCurve");

var _MeshData = require("../../../../../src/goo/renderer/MeshData");

var _ParticleSystemComponent = require("../../../../../src/goo/addons/particlepack/components/ParticleSystemComponent");

var _Texture = require("../../../../../src/goo/renderer/Texture");

var _TransformComponent = require("../../../../../src/goo/entities/components/TransformComponent");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _Vector3Curve = require("../../../../../src/goo/addons/particlepack/curves/Vector3Curve");

var _Vector4Curve = require("../../../../../src/goo/addons/particlepack/curves/Vector4Curve");

var _World = require("../../../../../src/goo/entities/World");

describe('ParticleSystemComponent', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
		world = new _World.World();
		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_ParticleSystemComponent.ParticleSystemComponent);
	});

	it('gets added to the entity via world.createEntity', function () {
		var component = new _ParticleSystemComponent.ParticleSystemComponent();
		var entity = world.createEntity([0, 0, 0], component).addToWorld();
		expect(entity.particleSystemComponent).toBe(component);
	});

	it('can clone', function () {
		var texture = new _Texture.Texture();

		var component = new _ParticleSystemComponent.ParticleSystemComponent({
			maxParticles: 10,
			time: 1,
			gravity: new _Vector.Vector3(1, 2, 3),
			seed: 123,
			shapeType: 'box',
			sphereRadius: 123,
			sphereEmitFromShell: true,
			randomDirection: true,
			coneEmitFrom: 'volume',
			boxExtents: new _Vector.Vector3(1, 2, 3),
			coneRadius: 123,
			coneAngle: 123,
			coneLength: 123,
			preWarm: true,
			startColor: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			colorOverLifetime: new _Vector4Curve.Vector4Curve({
				x: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				y: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				z: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				w: new _LinearCurve.LinearCurve({ k: 123, m: 123 })
			}),
			duration: 123,
			localSpace: false,
			startSpeed: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			localVelocityOverLifetime: new _Vector3Curve.Vector3Curve({
				x: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				y: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				z: new _LinearCurve.LinearCurve({ k: 123, m: 123 })
			}),
			worldVelocityOverLifetime: new _Vector3Curve.Vector3Curve({
				x: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				y: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
				z: new _LinearCurve.LinearCurve({ k: 123, m: 123 })
			}),
			emissionRate: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			startLifetime: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			renderQueue: 123,
			discardThreshold: 0.123,
			loop: true,
			blending: 'TransparencyBlending',
			depthWrite: false,
			depthTest: false,
			textureTilesX: 123,
			textureTilesY: 123,
			textureAnimationCycles: 123,
			startSize: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			sortMode: ParticleSystemComponentjs_SORT_CAMERA_DISTANCE,
			mesh: new _MeshData.MeshData(),
			billboard: false,
			sizeOverLifetime: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			startAngle: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			rotationSpeedOverLifetime: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			texture: texture,
			textureFrameOverLifetime: new _LinearCurve.LinearCurve({ k: 1, m: 0 })
		});

		var clone = component.clone();

		expect(clone.maxParticles).toBe(10);
		expect(clone.time).toBe(1);
		expect(clone.gravity).toEqual(new _Vector.Vector3(1, 2, 3));
		expect(clone.seed).toEqual(123);
		expect(clone.shapeType).toBe('box');
		expect(clone.sphereRadius).toBe(123);
		expect(clone.sphereEmitFromShell).toBe(true);
		expect(clone.randomDirection).toBe(true);
		expect(clone.coneEmitFrom).toBe('volume');
		expect(clone.boxExtents).toEqual(new _Vector.Vector3(1, 2, 3));
		expect(clone.coneRadius).toBe(123);
		expect(clone.coneAngle).toBe(123);
		expect(clone.coneLength).toBe(123);
		expect(clone.preWarm).toBe(true);
		expect(clone.startColor).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.colorOverLifetime).toEqual(new _Vector4Curve.Vector4Curve({
			x: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			y: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			z: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			w: new _LinearCurve.LinearCurve({ k: 123, m: 123 })
		}));
		expect(clone.duration).toBe(123);
		expect(clone.localSpace).toBe(false);
		expect(clone.startSpeed).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.localVelocityOverLifetime).toEqual(new _Vector3Curve.Vector3Curve({
			x: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			y: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			z: new _LinearCurve.LinearCurve({ k: 123, m: 123 })
		}));
		expect(clone.worldVelocityOverLifetime).toEqual(new _Vector3Curve.Vector3Curve({
			x: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			y: new _LinearCurve.LinearCurve({ k: 123, m: 123 }),
			z: new _LinearCurve.LinearCurve({ k: 123, m: 123 })
		}));
		expect(clone.emissionRate).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.startLifetime).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.renderQueue).toBe(123);
		expect(clone.discardThreshold).toBe(0.123);
		expect(clone.loop).toBe(true);
		expect(clone.blending).toBe('TransparencyBlending');
		expect(clone.depthWrite).toBe(false);
		expect(clone.depthTest).toBe(false);
		expect(clone.textureTilesX).toBe(123);
		expect(clone.textureTilesY).toBe(123);
		expect(clone.textureAnimationCycles).toBe(123);
		expect(clone.startSize).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.sortMode).toEqual(ParticleSystemComponentjs_SORT_CAMERA_DISTANCE);
		expect(clone.mesh).toEqual(new _MeshData.MeshData());
		expect(clone.billboard).toBe(false);
		expect(clone.sizeOverLifetime).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.startAngle).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.rotationSpeedOverLifetime).toEqual(new _LinearCurve.LinearCurve({ k: 123, m: 123 }));
		expect(clone.texture).toEqual(texture);
		expect(clone.textureFrameOverLifetime).toEqual(new _LinearCurve.LinearCurve({ m: 0, k: 1 }));
	});

	it('can emit one', function () {
		var component = new _ParticleSystemComponent.ParticleSystemComponent({
			localSpace: false
		});
		world.createEntity([0, 0, 0], component).addToWorld();
		var position = new _Vector.Vector3();
		var direction = new _Vector.Vector3(0, 1, 0);
		component.emitOne(position, direction);

		expect(component.particles[0].startPosition).toEqual(position);
		expect(component.particles[0].startDirection).toEqual(direction);
	});

	it('can pause/resume', function () {
		var component = new _ParticleSystemComponent.ParticleSystemComponent();
		world.createEntity([0, 0, 0], component).addToWorld();
		expect(component.time).toBe(0);
		component.process(1);
		expect(component.time).toBe(1);
		component.pause();
		component.process(1);
		expect(component.time).toBe(1);
		component.resume();
		component.process(1);
		expect(component.time).toBe(2);
	});

	it('can stop/resume', function () {
		var component = new _ParticleSystemComponent.ParticleSystemComponent();
		world.createEntity([0, 0, 0], component).addToWorld();
		component.process(1);
		expect(component.time).toBe(1);
		component.stop();
		expect(component.time).toBe(0);
		component.process(1);
		expect(component.time).toBe(0);
		component.resume();
		component.process(1);
		expect(component.time).toBe(1);
	});
});
