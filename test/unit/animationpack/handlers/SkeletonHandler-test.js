import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { SkeletonPose as srcgooanimationpackSkeletonPose_SkeletonPosejs } from "../../../../src/goo/animationpack/SkeletonPose";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('SkeletonHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a skeleton', function (done) {
		var config = testunitloadersConfigs_Configsjs.skeleton();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (skeleton) {
			expect(skeleton).toEqual(jasmine.any(srcgooanimationpackSkeletonPose_SkeletonPosejs));
			expect(skeleton._skeleton._joints.length).toBe(Object.keys(config.joints).length);
			done();
		});
	});

	it('order joints correctly', function (done) {
		var config = testunitloadersConfigs_Configsjs.skeleton();
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (skeleton) {
			var joints = skeleton._skeleton._joints;
			var ordered = joints.every(function (joint, idx) {
				if (idx === 0) { return true; }
				return joint._index > joints[idx-1]._index;
			});
			expect(ordered).toBeTruthy();
			expect(skeleton).toEqual(jasmine.any(srcgooanimationpackSkeletonPose_SkeletonPosejs));
			expect(skeleton._skeleton._joints.length).toBe(Object.keys(config.joints).length);
			done();
		});
	});
});