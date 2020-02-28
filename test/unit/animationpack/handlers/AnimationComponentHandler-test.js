var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

var _World = require("../../../../src/goo/entities/World");

var _Configs = require("../../../../test/unit/loaders/Configs");

var _AnimationComponent = require("../../../../src/goo/animationpack/components/AnimationComponent");

var _AnimationLayer = require("../../../../src/goo/animationpack/layer/AnimationLayer");

var _SkeletonPose = require("../../../../src/goo/animationpack/SkeletonPose");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

describe('AnimationComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with animation component', function (done) {
		var config = _Configs.Configs.entity(['animation']);
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.animationComponent).toEqual(jasmine.any(_AnimationComponent.AnimationComponent));
			done();
		});
	});

	it('loads component with layers and skeletonpose', function (done) {
		var config = _Configs.Configs.entity(['animation']);
		loader.preload(_Configs.Configs.get());
		loader.load(config.id).then(function (entity) {
			var component = entity.animationComponent;
			expect(component._skeletonPose).toEqual(jasmine.any(_SkeletonPose.SkeletonPose));
			expect(component.layers[0]).toEqual(jasmine.any(_AnimationLayer.AnimationLayer));
			done();
		});
	});
});
