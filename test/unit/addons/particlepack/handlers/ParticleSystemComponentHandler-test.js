var _PolyCurve = require("../../../../../src/goo/addons/particlepack/curves/PolyCurve");

var _Vector3Curve = require("../../../../../src/goo/addons/particlepack/curves/Vector3Curve");

var _Vector4Curve = require("../../../../../src/goo/addons/particlepack/curves/Vector4Curve");

var _ConstantCurve = require("../../../../../src/goo/addons/particlepack/curves/ConstantCurve");

var _ParticleSystemComponent = require("../../../../../src/goo/addons/particlepack/components/ParticleSystemComponent");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _World = require("../../../../../src/goo/entities/World");

var _DynamicLoader = require("../../../../../src/goo/loaders/DynamicLoader");

var _ObjectUtil = require("../../../../../src/goo/util/ObjectUtil");

require("../../../../../src/goo/addons/particlepack/handlers/ParticleSystemComponentHandler");

var Configs = require('../../../../../test/unit/loaders/Configs');

describe('ParticleSystemComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: typeof window !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads an entity with a ParticleSystemComponent', function (done) {
		var config = Configs.entity(['transform', 'particleSystem']);

		function constantCurve(value) {
			return [{
				type: 'constant',
				offset: 0,
				value: value
			}];
		}

		_ObjectUtil.ObjectUtils.extend(config.components.particleSystem, {
			seed: 123,
			shapeType: 'sphere',
			sphereRadius: 123,
			sphereEmitFromShell: true,
			randomDirection: true,
			coneEmitFrom: 'volume',
			boxExtents: [1, 2, 3],
			coneRadius: 123,
			coneAngle: 12,
			coneLength: 123,
			startColor: [constantCurve(0), constantCurve(1), constantCurve(0), constantCurve(1)],
			colorOverLifetime: [constantCurve(1), constantCurve(0), constantCurve(0), constantCurve(1)],
			duration: 123,
			localSpace: true,
			startSpeed: constantCurve(123),
			localVelocityOverLifetime: [constantCurve(0), constantCurve(0), constantCurve(0)],
			worldVelocityOverLifetime: [constantCurve(0), constantCurve(0), constantCurve(0)],
			maxParticles: 123,
			emissionRate: constantCurve(123),
			startLifetime: constantCurve(123),
			renderQueue: 3123,
			discardThreshold: 0.6,
			loop: true,
			blending: 'TransparencyBlending',
			depthWrite: false,
			depthTest: false,
			textureTilesX: 12,
			textureTilesY: 34,
			textureFrameOverLifetime: constantCurve(0),
			textureAnimationCycles: 123,
			startSize: constantCurve(123),
			sortMode: 'camera_distance',
			billboard: false,
			sizeOverLifetime: constantCurve(1),
			startAngle: constantCurve(0),
			rotationSpeedOverLifetime: constantCurve(0)
			//textureRef: null
		});

		loader.preload(Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.particleSystemComponent).toEqual(jasmine.any(_ParticleSystemComponent.ParticleSystemComponent));

			function newConstantPolyCurve(value) {
				return new _PolyCurve.PolyCurve({ segments: [new _ConstantCurve.ConstantCurve({ value: value })] });
			}
			function newVector4Curve(x, y, z, w) {
				return new _Vector4Curve.Vector4Curve({
					x: newConstantPolyCurve(x),
					y: newConstantPolyCurve(y),
					z: newConstantPolyCurve(z),
					w: newConstantPolyCurve(w)
				});
			}
			function newVector3Curve(x, y, z) {
				return new _Vector3Curve.Vector3Curve({
					x: newConstantPolyCurve(x),
					y: newConstantPolyCurve(y),
					z: newConstantPolyCurve(z)
				});
			}
			var c = entity.particleSystemComponent;
			expect(c.seed).toEqual(123);
			expect(c.shapeType).toEqual('sphere');
			expect(c.sphereRadius).toEqual(123);
			expect(c.sphereEmitFromShell).toEqual(true);
			expect(c.randomDirection).toEqual(true);
			expect(c.coneEmitFrom).toEqual('volume');
			expect(c.boxExtents).toEqual(new _Vector.Vector3(1, 2, 3));
			expect(c.coneRadius).toEqual(123);
			expect(c.coneAngle.toFixed(4)).toEqual((12 * Math.PI / 180).toFixed(4));
			expect(c.coneLength).toEqual(123);
			expect(c.startColor).toEqual(newVector4Curve(0, 1, 0, 1));
			expect(c.colorOverLifetime).toEqual(newVector4Curve(1, 0, 0, 1));
			expect(c.duration).toEqual(123);
			expect(c.localSpace).toEqual(true);
			expect(c.startSpeed).toEqual(newConstantPolyCurve(123));
			expect(c.localVelocityOverLifetime).toEqual(newVector3Curve(0, 0, 0));
			expect(c.worldVelocityOverLifetime).toEqual(newVector3Curve(0, 0, 0));
			expect(c.maxParticles).toEqual(123);
			expect(c.emissionRate).toEqual(newConstantPolyCurve(123));
			expect(c.startLifetime).toEqual(newConstantPolyCurve(123));
			expect(c.renderQueue).toEqual(3123);
			expect(c.discardThreshold).toEqual(0.6);
			expect(c.loop).toEqual(true);
			expect(c.blending).toEqual('TransparencyBlending');
			expect(c.depthWrite).toEqual(false);
			expect(c.depthTest).toEqual(false);
			expect(c.textureTilesX).toEqual(12);
			expect(c.textureTilesY).toEqual(34);
			expect(c.textureAnimationCycles).toEqual(123);
			expect(c.textureFrameOverLifetime).toEqual(newConstantPolyCurve(0));
			expect(c.startSize).toEqual(newConstantPolyCurve(123));
			expect(c.sortMode).toEqual(_ParticleSystemComponent.ParticleSystemComponent.SORT_CAMERA_DISTANCE);
			expect(c.billboard).toEqual(false);
			expect(c.sizeOverLifetime).toEqual(newConstantPolyCurve(1));
			expect(c.startAngle).toEqual(newConstantPolyCurve(0));
			expect(c.rotationSpeedOverLifetime).toEqual(newConstantPolyCurve(0));

			done();
		});
	});
});
