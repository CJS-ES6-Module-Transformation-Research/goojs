import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import {     AnimationComponent as srcgooanimationpackcomponentsAnimationComponent_AnimationComponentjs, } from "../../../../src/goo/animationpack/components/AnimationComponent";
import { AnimationLayer as srcgooanimationpacklayerAnimationLayer_AnimationLayerjs } from "../../../../src/goo/animationpack/layer/AnimationLayer";
import { SkeletonPose as srcgooanimationpackSkeletonPose_SkeletonPosejs } from "../../../../src/goo/animationpack/SkeletonPose";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";

describe('AnimationComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './',
			ajax: false
		});
	});

	it('loads an entity with animation component', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['animation']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.animationComponent).toEqual(jasmine.any(srcgooanimationpackcomponentsAnimationComponent_AnimationComponentjs));
			done();
		});
	});

	it('loads component with layers and skeletonpose', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['animation']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			var component = entity.animationComponent;
			expect(component._skeletonPose).toEqual(jasmine.any(srcgooanimationpackSkeletonPose_SkeletonPosejs));
			expect(component.layers[0]).toEqual(jasmine.any(srcgooanimationpacklayerAnimationLayer_AnimationLayerjs));
			done();
		});
	});
});