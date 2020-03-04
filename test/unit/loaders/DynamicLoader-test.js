import { World as Worldjs } from "../../../src/goo/entities/World";
import { TransformSystem as TransformSystemjs } from "../../../src/goo/entities/systems/TransformSystem";
import { CameraSystem as CameraSystemjs } from "../../../src/goo/entities/systems/CameraSystem";
import { ParticlesSystem as ParticlesSystemjs } from "../../../src/goo/entities/systems/ParticlesSystem";
import { BoundingUpdateSystem as BoundingUpdateSystemjs } from "../../../src/goo/entities/systems/BoundingUpdateSystem";
import { LightingSystem as LightingSystemjs } from "../../../src/goo/entities/systems/LightingSystem";
import { AnimationSystem as AnimationSystem_AnimationSystemjs } from "../../../src/goo/animationpack/systems/AnimationSystem";
import { DynamicLoader as DynamicLoaderjs } from "../../../src/goo/loaders/DynamicLoader";
import * as AudioContext from "../../../src/goo/sound/AudioContext";
import { SoundSystem as SoundSystemjs } from "../../../src/goo/entities/systems/SoundSystem";
import { RenderSystem as RenderSystemjs } from "../../../src/goo/entities/systems/RenderSystem";
import { Configs as Configs_Configsjs } from "../../../test/unit/loaders/Configs";
import "../../../src/goo/loaders/handlers/EntityHandler";
import "../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('DynamicLoader', function () {
	var loader;

	var entityRef = 'aaaabbbbaaaabbbbaaaabbbbaaaabbbb.entity';
	var materialRef = 'ccccddddccccddddccccddddccccdddd.material';
	var imageRef = 'ccccddddccccddddccccddddccccddddccccdddd.jpg';

	beforeEach(function () {
		var world = new Worldjs();
		world.setSystem(new TransformSystemjs());
		world.setSystem(new CameraSystemjs());
		world.setSystem(new ParticlesSystemjs());
		world.setSystem(new BoundingUpdateSystemjs());
		world.setSystem(new LightingSystemjs());
		world.setSystem(new AnimationSystem_AnimationSystemjs());
		if (AudioContextjs) {
			world.setSystem(new SoundSystemjs());
		}

		world.setSystem(new RenderSystemjs());

		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './'
		});
	});

	it('loads bundle', function (done) {
		// Create a bundlewrapper to preload and skip ajax
		var config = Configs_Configsjs.entity();
		var bundleRef = Configs_Configsjs.randomRef('bundle');

		loader.update(bundleRef, Configs_Configsjs.get());
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
		var config = Configs_Configsjs.project(true);
		var world = loader._world;
		loader.preload(Configs_Configsjs.get());
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
			entities[i] = Configs_Configsjs.entity(['transform', 'meshData']);
			if (i > 0) {
				Configs_Configsjs.attachChild(entities[i - 1], entities[i]);
			}
		}

		var bundleRef = Configs_Configsjs.randomRef('bundle');
		loader.update(bundleRef, Configs_Configsjs.get());

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

			expect(DynamicLoaderjs._getRefsFromConfig(config))
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

			expect(DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('gets packed references', function () {
			var config = {
				arefs: {
					aref: entityRef,
					bref: materialRef
				}
			};

			expect(DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});

		it('ignores thumbnailRef', function () {
			var config = {
				aref: entityRef,
				bref: materialRef,
				thumbnailRef: imageRef
			};

			expect(DynamicLoaderjs._getRefsFromConfig(config))
				.toEqual([entityRef, materialRef]);
		});
	});
});
