import { World as World_World } from "../../../src/goo/entities/World";
import { TransformSystem as TransformSystem_TransformSystem } from "../../../src/goo/entities/systems/TransformSystem";
import { CameraSystem as CameraSystem_CameraSystem } from "../../../src/goo/entities/systems/CameraSystem";
import { ParticlesSystem as ParticlesSystem_ParticlesSystem } from "../../../src/goo/entities/systems/ParticlesSystem";
import { BoundingUpdateSystem as BoundingUpdateSystem_BoundingUpdateSystem } from "../../../src/goo/entities/systems/BoundingUpdateSystem";
import { LightingSystem as LightingSystem_LightingSystem } from "../../../src/goo/entities/systems/LightingSystem";
import { AnimationSystem as AnimationSystem_AnimationSystem } from "../../../src/goo/animationpack/systems/AnimationSystem";

import {
    DynamicLoader as DynamicLoader_DynamicLoader,
    _getRefsFromConfig as DynamicLoaderjs__getRefsFromConfig,
} from "../../../src/goo/loaders/DynamicLoader";

import { AudioContextjs as AudioContext } from "../../../src/goo/sound/AudioContext";
import { SoundSystem as SoundSystem_SoundSystem } from "../../../src/goo/entities/systems/SoundSystem";
import { RenderSystem as RenderSystem_RenderSystem } from "../../../src/goo/entities/systems/RenderSystem";
import { Configs as Configs_Configs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/loaders/handlers/EntityHandler";
import "../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('DynamicLoader', function () {
	var loader;

	var entityRef = 'aaaabbbbaaaabbbbaaaabbbbaaaabbbb.entity';
	var materialRef = 'ccccddddccccddddccccddddccccdddd.material';
	var imageRef = 'ccccddddccccddddccccddddccccddddccccdddd.jpg';

	beforeEach(function () {
		var world = new World_World();
		world.setSystem(new TransformSystem_TransformSystem());
		world.setSystem(new CameraSystem_CameraSystem());
		world.setSystem(new ParticlesSystem_ParticlesSystem());
		world.setSystem(new BoundingUpdateSystem_BoundingUpdateSystem());
		world.setSystem(new LightingSystem_LightingSystem());
		world.setSystem(new AnimationSystem_AnimationSystem());
		if (AudioContext) {
			world.setSystem(new SoundSystem_SoundSystem());
		}

		world.setSystem(new RenderSystem_RenderSystem());

		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './'
		});
	});

	it('loads bundle', function (done) {
		// Create a bundlewrapper to preload and skip ajax
		var config = Configs_Configs.entity();
		var bundleRef = Configs_Configs.randomRef('bundle');

		loader.update(bundleRef, Configs_Configs.get());
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
		var config = Configs_Configs.project(true);
		var world = loader._world;
		loader.preload(Configs_Configs.get());
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
			entities[i] = Configs_Configs.entity(['transform', 'meshData']);
			if (i > 0) {
				Configs_Configs.attachChild(entities[i - 1], entities[i]);
			}
		}

		var bundleRef = Configs_Configs.randomRef('bundle');
		loader.update(bundleRef, Configs_Configs.get());

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

			expect(DynamicLoaderjs__getRefsFromConfig(config))
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

			expect(DynamicLoaderjs__getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('gets packed references', function () {
			var config = {
				arefs: {
					aref: entityRef,
					bref: materialRef
				}
			};

			expect(DynamicLoaderjs__getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('ignores thumbnailRef', function () {
			var config = {
				aref: entityRef,
				bref: materialRef,
				thumbnailRef: imageRef
			};

			expect(DynamicLoaderjs__getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});
	});
});
