var _World = require("../../../../src/goo/entities/World");

var _SkeletonPose = require("../../../../src/goo/animationpack/SkeletonPose");

var _DynamicLoader = require("../../../../src/goo/loaders/DynamicLoader");

require("../../../../src/goo/animationpack/handlers/AnimationHandlers");

var Configs = require('../../../../test/unit/loaders/Configs');

describe('SkeletonHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new _World.World();
		loader = new _DynamicLoader.DynamicLoader({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads a skeleton', function (done) {
		var config = Configs.skeleton();
		loader.preload(Configs.get());
		loader.load(config.id).then(function (skeleton) {
			expect(skeleton).toEqual(jasmine.any(_SkeletonPose.SkeletonPose));
			expect(skeleton._skeleton._joints.length).toBe(Object.keys(config.joints).length);
			done();
		});
	});

	it('order joints correctly', function (done) {
		var config = Configs.skeleton();
		loader.preload(Configs.get());
		loader.load(config.id).then(function (skeleton) {
			var joints = skeleton._skeleton._joints;
			var ordered = joints.every(function (joint, idx) {
				if (idx === 0) {
					return true;
				}
				return joint._index > joints[idx - 1]._index;
			});
			expect(ordered).toBeTruthy();
			expect(skeleton).toEqual(jasmine.any(_SkeletonPose.SkeletonPose));
			expect(skeleton._skeleton._joints.length).toBe(Object.keys(config.joints).length);
			done();
		});
	});
});
