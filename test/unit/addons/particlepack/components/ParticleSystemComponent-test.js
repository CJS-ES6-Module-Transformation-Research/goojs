import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../CustomMatchers";
import { LinearCurve as srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs } from "../../../../../src/goo/addons/particlepack/curves/LinearCurve";
import { MeshData as srcgoorendererMeshData_MeshDatajs } from "../../../../../src/goo/renderer/MeshData";
import {     ParticleSystemComponent as srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs, } from "../../../../../src/goo/addons/particlepack/components/ParticleSystemComponent";
import { Texture as srcgoorendererTexture_Texturejs } from "../../../../../src/goo/renderer/Texture";
import {     TransformComponent as srcgooentitiescomponentsTransformComponent_TransformComponentjs, } from "../../../../../src/goo/entities/components/TransformComponent";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { Vector3Curve as srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Vector3Curve";
import { Vector4Curve as srcgooaddonsparticlepackcurvesVector4Curve_Vector4Curvejs } from "../../../../../src/goo/addons/particlepack/curves/Vector4Curve";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../../src/goo/entities/World";

describe('ParticleSystemComponent', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
		world = new srcgooentitiesWorld_Worldjs();
		world.registerComponent(srcgooentitiescomponentsTransformComponent_TransformComponentjs);
		world.registerComponent(srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs);
	});

	it('gets added to the entity via world.createEntity', function () {
		var component = new srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs();
		var entity = world.createEntity([0, 0, 0], component).addToWorld();
		expect(entity.particleSystemComponent).toBe(component);
	});

	it('can clone', function () {
		var texture = new srcgoorendererTexture_Texturejs();

		var component = new srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs({
			maxParticles: 10,
			time: 1,
			gravity: new srcgoomathVector3_Vector3js(1, 2, 3),
			seed: 123,
			shapeType: 'box',
			sphereRadius: 123,
			sphereEmitFromShell: true,
			randomDirection: true,
			coneEmitFrom: 'volume',
			boxExtents: new srcgoomathVector3_Vector3js(1, 2, 3),
			coneRadius: 123,
			coneAngle: 123,
			coneLength: 123,
			preWarm: true,
			startColor: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			colorOverLifetime: new srcgooaddonsparticlepackcurvesVector4Curve_Vector4Curvejs({
				x: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				y: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				z: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				w: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 })
			}),
			duration: 123,
			localSpace: false,
			startSpeed: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			localVelocityOverLifetime: new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
				x: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				y: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				z: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 })
			}),
			worldVelocityOverLifetime: new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
				x: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				y: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
				z: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 })
			}),
			emissionRate: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			startLifetime: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			renderQueue: 123,
			discardThreshold: 0.123,
			loop: true,
			blending: 'TransparencyBlending',
			depthWrite: false,
			depthTest: false,
			textureTilesX: 123,
			textureTilesY: 123,
			textureAnimationCycles: 123,
			startSize: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			sortMode: srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs.SORT_CAMERA_DISTANCE,
			mesh: new srcgoorendererMeshData_MeshDatajs(),
			billboard: false,
			sizeOverLifetime: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			startAngle: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			rotationSpeedOverLifetime: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			texture: texture,
			textureFrameOverLifetime: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 1, m: 0 })
		});

		var clone = component.clone();

		expect(clone.maxParticles).toBe(10);
		expect(clone.time).toBe(1);
		expect(clone.gravity).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
		expect(clone.seed).toEqual(123);
		expect(clone.shapeType).toBe('box');
		expect(clone.sphereRadius).toBe(123);
		expect(clone.sphereEmitFromShell).toBe(true);
		expect(clone.randomDirection).toBe(true);
		expect(clone.coneEmitFrom).toBe('volume');
		expect(clone.boxExtents).toEqual(new srcgoomathVector3_Vector3js(1, 2, 3));
		expect(clone.coneRadius).toBe(123);
		expect(clone.coneAngle).toBe(123);
		expect(clone.coneLength).toBe(123);
		expect(clone.preWarm).toBe(true);
		expect(clone.startColor).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.colorOverLifetime).toEqual(new srcgooaddonsparticlepackcurvesVector4Curve_Vector4Curvejs({
			x: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			y: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			z: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			w: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 })
		}));
		expect(clone.duration).toBe(123);
		expect(clone.localSpace).toBe(false);
		expect(clone.startSpeed).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.localVelocityOverLifetime).toEqual(new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
			x: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			y: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			z: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 })
		}));
		expect(clone.worldVelocityOverLifetime).toEqual(new srcgooaddonsparticlepackcurvesVector3Curve_Vector3Curvejs({
			x: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			y: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }),
			z: new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 })
		}));
		expect(clone.emissionRate).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.startLifetime).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.renderQueue).toBe(123);
		expect(clone.discardThreshold).toBe(0.123);
		expect(clone.loop).toBe(true);
		expect(clone.blending).toBe('TransparencyBlending');
		expect(clone.depthWrite).toBe(false);
		expect(clone.depthTest).toBe(false);
		expect(clone.textureTilesX).toBe(123);
		expect(clone.textureTilesY).toBe(123);
		expect(clone.textureAnimationCycles).toBe(123);
		expect(clone.startSize).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.sortMode).toEqual(srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs.SORT_CAMERA_DISTANCE);
		expect(clone.mesh).toEqual(new srcgoorendererMeshData_MeshDatajs());
		expect(clone.billboard).toBe(false);
		expect(clone.sizeOverLifetime).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.startAngle).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.rotationSpeedOverLifetime).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ k: 123, m: 123 }));
		expect(clone.texture).toEqual(texture);
		expect(clone.textureFrameOverLifetime).toEqual(new srcgooaddonsparticlepackcurvesLinearCurve_LinearCurvejs({ m: 0, k: 1 }));
	});

	it('can emit one', function () {
		var component = new srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs({
			localSpace: false
		});
		world.createEntity([0, 0, 0], component).addToWorld();
		var position = new srcgoomathVector3_Vector3js();
		var direction = new srcgoomathVector3_Vector3js(0,1,0);
		component.emitOne(position, direction);

		expect(component.particles[0].startPosition).toEqual(position);
		expect(component.particles[0].startDirection).toEqual(direction);
	});

	it('can pause/resume', function () {
		var component = new srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs();
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
		var component = new srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs();
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
