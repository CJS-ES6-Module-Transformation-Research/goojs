import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import {     MeshDataComponent as srcgooentitiescomponentsMeshDataComponent_MeshDataComponentjs, } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshData as srcgoorendererMeshData_MeshDatajs } from "../../../../src/goo/renderer/MeshData";
import { SkeletonPose as srcgooanimationpackSkeletonPose_SkeletonPosejs } from "../../../../src/goo/animationpack/SkeletonPose";
import { DynamicLoader as srcgooloadersDynamicLoader_DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as testunitloadersConfigs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";
import "../../../../src/goo/loaders/handlers/MeshDataComponentHandler";
import "../../../../src/goo/loaders/handlers/MeshDataHandler";

describe('MeshDataComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new srcgooentitiesWorld_Worldjs();
		loader = new srcgooloadersDynamicLoader_DynamicLoaderjs({
			world: world,
			rootPath: './'
		});
	});

	it('loads an entity with a meshDataComponent', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity(['meshData']);
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(srcgooentitiescomponentsMeshDataComponent_MeshDataComponentjs));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
			expect(entity.meshDataComponent.currentPose).toEqual(jasmine.any(srcgooanimationpackSkeletonPose_SkeletonPosejs));
			done();
		});
	});

	it('loads a meshDatacomponent with a shape', function (done) {
		var config = testunitloadersConfigs_Configsjs.entity();
		config.components.meshData = testunitloadersConfigs_Configsjs.component.meshData('Sphere');
		loader.preload(testunitloadersConfigs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(srcgooentitiescomponentsMeshDataComponent_MeshDataComponentjs));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
			done();
		});
	});
});
