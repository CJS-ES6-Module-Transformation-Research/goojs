"use strict";

var _World = require("../../../src/goo/entities/World");

var _TransformSystem = require("../../../src/goo/entities/systems/TransformSystem");

var _CameraSystem = require("../../../src/goo/entities/systems/CameraSystem");

var _ParticlesSystem = require("../../../src/goo/entities/systems/ParticlesSystem");

var _BoundingUpdateSystem = require("../../../src/goo/entities/systems/BoundingUpdateSystem");

var _LightingSystem = require("../../../src/goo/entities/systems/LightingSystem");

var _AnimationSystem = require("../../../src/goo/animationpack/systems/AnimationSystem");

var _DynamicLoader = require("../../../src/goo/loaders/DynamicLoader");

var _AudioContext = require("../../../src/goo/sound/AudioContext");

var AudioContext = _interopRequireWildcard(_AudioContext);

var _SoundSystem = require("../../../src/goo/entities/systems/SoundSystem");

var _RenderSystem = require("../../../src/goo/entities/systems/RenderSystem");

var _Configs = require("../../../test/unit/loaders/Configs");

require("../../../src/goo/loaders/handlers/EntityHandler");

require("../../../src/goo/animationpack/handlers/AnimationHandlers");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

describe('DynamicLoader', function () {
	var loader;

	var entityRef = 'aaaabbbbaaaabbbbaaaabbbbaaaabbbb.entity';
	var materialRef = 'ccccddddccccddddccccddddccccdddd.material';
	var imageRef = 'ccccddddccccddddccccddddccccddddccccdddd.jpg';

	beforeEach(function () {
		var world = new _World.World();
		world.setSystem(new _TransformSystem.TransformSystem());
		world.setSystem(new _CameraSystem.CameraSystem());
		world.setSystem(new _ParticlesSystem.ParticlesSystem());
		world.setSystem(new _BoundingUpdateSystem.BoundingUpdateSystem());
		world.setSystem(new _LightingSystem.LightingSystem());
		world.setSystem(new _AnimationSystem.AnimationSystem());
		if (AudioContextjs) {
			world.setSystem(new _SoundSystem.SoundSystem());
		}

		world.setSystem(new _RenderSystem.RenderSystem());

		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './'
		});
	});

	it('loads bundle', function (done) {
		// Create a bundlewrapper to preload and skip ajax
		var config = _Configs.Configs.entity();
		var bundleRef = _Configs.Configs.randomRef('bundle');

		loader.update(bundleRef, _Configs.Configs.get());
		// Load bundle
		loader.load(bundleRef).then(function () /* bundle */{
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
		var config = _Configs.Configs.project(true);
		var world = loader._world;
		loader.preload(_Configs.Configs.get());
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
			entities[i] = _Configs.Configs.entity(['transform', 'meshData']);
			if (i > 0) {
				_Configs.Configs.attachChild(entities[i - 1], entities[i]);
			}
		}

		var bundleRef = _Configs.Configs.randomRef('bundle');
		loader.update(bundleRef, _Configs.Configs.get());

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

			expect(_DynamicLoader.DynamicLoader._getRefsFromConfig(config)).toEqual([entityRef, materialRef]);
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

			expect(_DynamicLoader.DynamicLoader._getRefsFromConfig(config)).toEqual([entityRef, materialRef]);
		});

		it('gets packed references', function () {
			var config = {
				arefs: {
					aref: entityRef,
					bref: materialRef
				}
			};

			expect(_DynamicLoader.DynamicLoader._getRefsFromConfig(config)).toEqual([entityRef, materialRef]);
		});

		it('ignores thumbnailRef', function () {
			var config = {
				aref: entityRef,
				bref: materialRef,
				thumbnailRef: imageRef
			};

			expect(_DynamicLoader.DynamicLoader._getRefsFromConfig(config)).toEqual([entityRef, materialRef]);
		});
	});
});
