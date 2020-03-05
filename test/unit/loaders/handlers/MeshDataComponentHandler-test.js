"use strict";

var _World = require("../../../../src/goo/entities/World");

var _MeshDataComponent = require("../../../../src/goo/entities/components/MeshDataComponent");

var _MeshData = require("../../../../src/goo/renderer/MeshData");

var _SkeletonPose = require("../../../../src/goo/animationpack/SkeletonPose");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _Configs = require("../../../../test/unit/loaders/Configs");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

require("../../../../src/goo/loaders/handlers/MeshDataComponentHandler");

require("../../../../src/goo/loaders/handlers/MeshDataHandler");

describe('MeshDataComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './'
		});
	});

	it('loads an entity with a meshDataComponent', function (done) {
		var config = _Configs.Configs.entity(['meshData']);
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(_MeshDataComponent.MeshDataComponent));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(_MeshData.MeshData));
			expect(entity.meshDataComponent.currentPose).toEqual(jasmine.any(_SkeletonPose.SkeletonPose));
			done();
		});
	});

	it('loads a meshDatacomponent with a shape', function (done) {
		var config = _Configs.Configs.entity();
		config.components.meshData = _Configs.Configs.component.meshData('Sphere');
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(_MeshDataComponent.MeshDataComponent));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(_MeshData.MeshData));
			done();
		});
	});
});
