import { PolyCurve as PolyCurvejs } from "../../../../../src/goo/addons/particlepack/curves/PolyCurve";
import { Vector3Curve as Vector3Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Vector3Curve";
import { Vector4Curve as Vector4Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Vector4Curve";
import { ConstantCurve as ConstantCurvejs } from "../../../../../src/goo/addons/particlepack/curves/ConstantCurve";
import { ParticleSystemComponent as ParticleSystemComponentjs } from "../../../../../src/goo/addons/particlepack/components/ParticleSystemComponent";
import { Vector3 as Vector3js } from "../../../../../src/goo/math/Vector3";
import { World as World_Worldjs } from "../../../../../src/goo/entities/World";
import { Configs as Configs_Configsjs } from "../../../../../test/unit/loaders/Configs";
import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../../src/goo/loaders/DynamicLoader";
import { ObjectUtils as ObjectUtil_ObjectUtilsjs } from "../../../../../src/goo/util/ObjectUtil";
import "../../../../../src/goo/addons/particlepack/handlers/ParticleSystemComponentHandler";

describe('ParticleSystemComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: typeof(window) !== 'undefined' && window.__karma__ ? './' : 'loaders/res'
		});
	});

	it('loads an entity with a ParticleSystemComponent', function (done) {
		var config = Configs_Configsjs.entity(['transform', 'particleSystem']);

		function constantCurve(value){
			return [{
				type: 'constant',
				offset: 0,
				value: value
			}];
		}

		ObjectUtil_ObjectUtilsjs.extend(config.components.particleSystem, {
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
			startColor: [
				constantCurve(0),
				constantCurve(1),
				constantCurve(0),
				constantCurve(1)
			],
			colorOverLifetime: [
				constantCurve(1),
				constantCurve(0),
				constantCurve(0),
				constantCurve(1)
			],
			duration: 123,
			localSpace: true,
			startSpeed: constantCurve(123),
			localVelocityOverLifetime: [constantCurve(0),constantCurve(0),constantCurve(0)],
			worldVelocityOverLifetime: [constantCurve(0),constantCurve(0),constantCurve(0)],
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

		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.particleSystemComponent).toEqual(jasmine.any(ParticleSystemComponentjs));

			function newConstantPolyCurve(value){
				return new PolyCurvejs({ segments: [new ConstantCurvejs({ value: value })] });
			}
			function newVector4Curve(x,y,z,w){
				return new Vector4Curvejs({
					x: newConstantPolyCurve(x),
					y: newConstantPolyCurve(y),
					z: newConstantPolyCurve(z),
					w: newConstantPolyCurve(w)
				});
			}
			function newVector3Curve(x,y,z){
				return new Vector3Curvejs({
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
			expect(c.boxExtents).toEqual(new Vector3js(1, 2, 3));
			expect(c.coneRadius).toEqual(123);
			expect(c.coneAngle.toFixed(4)).toEqual((12 * Math.PI / 180).toFixed(4));
			expect(c.coneLength).toEqual(123);
			expect(c.startColor).toEqual(newVector4Curve(0,1,0,1));
			expect(c.colorOverLifetime).toEqual(newVector4Curve(1,0,0,1));
			expect(c.duration).toEqual(123);
			expect(c.localSpace).toEqual(true);
			expect(c.startSpeed).toEqual(newConstantPolyCurve(123));
			expect(c.localVelocityOverLifetime).toEqual(newVector3Curve(0,0,0));
			expect(c.worldVelocityOverLifetime).toEqual(newVector3Curve(0,0,0));
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
			expect(c.sortMode).toEqual(ParticleSystemComponentjs.SORT_CAMERA_DISTANCE);
			expect(c.billboard).toEqual(false);
			expect(c.sizeOverLifetime).toEqual(newConstantPolyCurve(1));
			expect(c.startAngle).toEqual(newConstantPolyCurve(0));
			expect(c.rotationSpeedOverLifetime).toEqual(newConstantPolyCurve(0));

			done();
		});
	});
});
