import { DynamicLoader as DynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import { AnimationComponent as AnimationComponent_AnimationComponentjs } from "../../../../src/goo/animationpack/components/AnimationComponent";
import { AnimationLayer as AnimationLayer_AnimationLayerjs } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { SkeletonPose as SkeletonPose_SkeletonPosejs } from "../../../../src/goo/animationpack/SkeletonPose";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_Worldjs();
		loader = new DynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with animation component', function (done) {
		var config = Configs_Configsjs.entity(['animation']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.animationComponent).toEqual(jasmine.any(AnimationComponent_AnimationComponentjs));
			done();
		});
	});

	it('loads component with layers and skeletonpose', function (done) {
		var config = Configs_Configsjs.entity(['animation']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			var component = entity.animationComponent;
			expect(component._skeletonPose).toEqual(jasmine.any(SkeletonPose_SkeletonPosejs));
			expect(component.layers[0]).toEqual(jasmine.any(AnimationLayer_AnimationLayerjs));
			done();
		});
	});
});