import { DynamicLoader as DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as Worldjs } from "../../../../src/goo/entities/World";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import { AnimationComponent as AnimationComponentjs } from "../../../../src/goo/animationpack/components/AnimationComponent";
import { AnimationLayer as AnimationLayerjs } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { SkeletonPose as SkeletonPosejs } from "../../../../src/goo/animationpack/SkeletonPose";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with animation component', function (done) {
		var config = Configs_Configsjs.entity(['animation']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.animationComponent).toEqual(jasmine.any(AnimationComponentjs));
			done();
		});
	});

	it('loads component with layers and skeletonpose', function (done) {
		var config = Configs_Configsjs.entity(['animation']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			var component = entity.animationComponent;
			expect(component._skeletonPose).toEqual(jasmine.any(SkeletonPosejs));
			expect(component.layers[0]).toEqual(jasmine.any(AnimationLayerjs));
			done();
		});
	});
});