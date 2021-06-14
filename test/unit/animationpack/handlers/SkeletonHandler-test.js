import { World as World_World } from "../../../../src/goo/entities/World";
import { SkeletonPose as SkeletonPose_SkeletonPose } from "../../../../src/goo/animationpack/SkeletonPose";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('SkeletonHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a skeleton', function (done) {
		var config = Configs_Configs.skeleton();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (skeleton) {
			expect(skeleton).toEqual(jasmine.any(SkeletonPose_SkeletonPose));
			expect(skeleton._skeleton._joints.length).toBe(Object.keys(config.joints).length);
			done();
		});
	});

	it('order joints correctly', function (done) {
		var config = Configs_Configs.skeleton();
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (skeleton) {
			var joints = skeleton._skeleton._joints;
			var ordered = joints.every(function (joint, idx) {
				if (idx === 0) { return true; }
				return joint._index > joints[idx-1]._index;
			});
			expect(ordered).toBeTruthy();
			expect(skeleton).toEqual(jasmine.any(SkeletonPose_SkeletonPose));
			expect(skeleton._skeleton._joints.length).toBe(Object.keys(config.joints).length);
			done();
		});
	});
});