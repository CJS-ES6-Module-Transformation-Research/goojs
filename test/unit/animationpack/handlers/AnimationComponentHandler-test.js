import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { World as World_World } from "../../../../src/goo/entities/World";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import { AnimationComponent as AnimationComponent_AnimationComponent } from "../../../../src/goo/animationpack/components/AnimationComponent";
import { AnimationLayer as AnimationLayer_AnimationLayer } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { SkeletonPose as SkeletonPose_SkeletonPose } from "../../../../src/goo/animationpack/SkeletonPose";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with animation component', function (done) {
		var config = Configs_Configs.entity(['animation']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.animationComponent).toEqual(jasmine.any(AnimationComponent_AnimationComponent));
			done();
		});
	});

	it('loads component with layers and skeletonpose', function (done) {
		var config = Configs_Configs.entity(['animation']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			var component = entity.animationComponent;
			expect(component._skeletonPose).toEqual(jasmine.any(SkeletonPose_SkeletonPose));
			expect(component.layers[0]).toEqual(jasmine.any(AnimationLayer_AnimationLayer));
			done();
		});
	});
});