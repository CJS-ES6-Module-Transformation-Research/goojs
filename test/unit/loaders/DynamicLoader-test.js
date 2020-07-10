import { World as srcgooentitiesWorld_Worldjs } from "../../../src/goo/entities/World";
import { TransformSystem as srcgooentitiessystemsTransformSystem_TransformSystemjs } from "../../../src/goo/entities/systems/TransformSystem";
import { CameraSystem as srcgooentitiessystemsCameraSystem_CameraSystemjs } from "../../../src/goo/entities/systems/CameraSystem";
import { ParticlesSystem as srcgooentitiessystemsParticlesSystem_ParticlesSystemjs } from "../../../src/goo/entities/systems/ParticlesSystem";
import {     BoundingUpdateSystem as srcgooentitiessystemsBoundingUpdateSystem_BoundingUpdateSystemjs, } from "../../../src/goo/entities/systems/BoundingUpdateSystem";
import { LightingSystem as srcgooentitiessystemsLightingSystem_LightingSystemjs } from "../../../src/goo/entities/systems/LightingSystem";
import {     AnimationSystem as srcgooanimationpacksystemsAnimationSystem_AnimationSystemjs, } from "../../../src/goo/animationpack/systems/AnimationSystem";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../src/goo/loaders/DynamicLoader";
import { AudioContextjs as srcgoosoundAudioContext_AudioContextjsjs } from "../../../src/goo/sound/AudioContext";
import { SoundSystem as srcgooentitiessystemsSoundSystem_SoundSystemjs } from "../../../src/goo/entities/systems/SoundSystem";
import { RenderSystem as srcgooentitiessystemsRenderSystem_RenderSystemjs } from "../../../src/goo/entities/systems/RenderSystem";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/loaders/handlers/EntityHandler";
import "../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('DynamicLoader', function () {
	var loader;

	var entityRef = 'aaaabbbbaaaabbbbaaaabbbbaaaabbbb.entity';
	var materialRef = 'ccccddddccccddddccccddddccccdddd.material';
	var imageRef = 'ccccddddccccddddccccddddccccddddccccdddd.jpg';

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		world.setSystem(new srcgooentitiessystemsTransformSystem_TransformSystemjs());
		world.setSystem(new srcgooentitiessystemsCameraSystem_CameraSystemjs());
		world.setSystem(new srcgooentitiessystemsParticlesSystem_ParticlesSystemjs());
		world.setSystem(new srcgooentitiessystemsBoundingUpdateSystem_BoundingUpdateSystemjs());
		world.setSystem(new srcgooentitiessystemsLightingSystem_LightingSystemjs());
		world.setSystem(new srcgooanimationpacksystemsAnimationSystem_AnimationSystemjs());
		if (srcgoosoundAudioContext_AudioContextjsjs) {
			world.setSystem(new srcgooentitiessystemsSoundSystem_SoundSystemjs());
		}

		world.setSystem(new srcgooentitiessystemsRenderSystem_RenderSystemjs());

		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './'
		});
	});

	it('loads bundle', function (done) {
		// Create a bundlewrapper to preload and skip ajax
		var config = testunitloadersConfigs_Configsjs.entity();
		var bundleRef = testunitloadersConfigs_Configsjs.randomRef('bundle');

		loader.update(bundleRef, testunitloadersConfigs_Configsjs.get());
		// Load bundle
		loader.load(bundleRef).then(function (/* bundle */) {
			var keys = Object.keys(loader._ajax._cache); // this needs to change when _cache becomes a map

			expect(keys).toContain(config.id);
			expect(loader._ajax._cache[config.id].components).toBeDefined();
			done();
		}, function () {
			expect('').toEqual('Should never get here');
			done();
		});
	});

	it('clears the engine', function (done) {
		var config = testunitloadersConfigs_Configsjs.project(true);
		var world = loader._world;
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function () {
			world.process();
			// We have some entities
			expect(world.entityManager.getEntities().length).toBeGreaterThan(0);
			expect(world.getSystem('TransformSystem')._activeEntities.length).toBeGreaterThan(0);

			// Someloaders are populated
			expect(loader._handlers.entity._objects.size).toBeGreaterThan(0);

			// Ajax has some cache
			expect(Object.keys(loader._ajax._cache).length).toBeGreaterThan(0);

			return loader.clear();
		}).then(function () {
			world.process();
			// Process loop is empty
			expect(world._addedEntities.length).toBe(0);
			expect(world._removedEntities.length).toBe(0);
			expect(world._changedEntities.length).toBe(0);

			// No entities in world
			expect(world.entityManager.getEntities().length).toBe(0);

			// No entities in systems
			expect(world._systems.length).toBeGreaterThan(0);
			for (var i = 0; i < world._systems.length; i++) {
				var entities = world._systems[i]._activeEntities;
				expect(entities.length).toBe(0);
			}

			// No objects in handlers
			for (var key in loader._handlers) {
				expect(loader._handlers[key]._objects.size).toBe(0);
			}

			// No configs in ajax
			var cacheCount = Object.keys(loader._ajax._cache);
			expect(cacheCount.length).toBe(0);
			done();
		}, function () {
			expect('').toEqual('Should never get here');
			done();
		});
	});

	it('preloads all binaries in json structure', function (done) {
		var entities = [];
		for (var i = 0; i < 4; i++) {
			entities[i] = testunitloadersConfigs_Configsjs.entity(['transform', 'meshData']);
			if (i > 0) {
				testunitloadersConfigs_Configsjs.attachChild(entities[i - 1], entities[i]);
			}
		}

		var bundleRef = testunitloadersConfigs_Configsjs.randomRef('bundle');
		loader.update(bundleRef, testunitloadersConfigs_Configsjs.get());

		var progress = jasmine.createSpy('progress');
		loader.load(bundleRef).then(function () {
			return loader.load(entities[0].id, {
				preloadBinaries: true,
				progressCallback: progress
			});
		}).then(function () {
			var l = entities.length;
			expect(progress).toHaveBeenCalledWith(l, l);
			done();
		}, function () {
			expect('').toEqual('Should never get here');
			done();
		});
	});

	describe('_getRefsFromConfig', function () {
		it('gets individual references', function () {
			var config = {
				aref: entityRef,
				bref: materialRef
			};

			expect(srcgooloadersDynamicLoader_DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('gets individual references several levels deep', function () {
			var config = {
				a: {
					b: {
						c: {
							aref: entityRef,
							bref: materialRef
						}
					}
				}
			};

			expect(srcgooloadersDynamicLoader_DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('gets packed references', function () {
			var config = {
				arefs: {
					aref: entityRef,
					bref: materialRef
				}
			};

			expect(srcgooloadersDynamicLoader_DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('ignores thumbnailRef', function () {
			var config = {
				aref: entityRef,
				bref: materialRef,
				thumbnailRef: imageRef
			};

			expect(srcgooloadersDynamicLoader_DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});
	});
});
