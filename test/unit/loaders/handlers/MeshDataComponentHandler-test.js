import { World as Worldjs } from "../../../../src/goo/entities/World";
import { MeshDataComponent as MeshDataComponentjs } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshData as MeshDatajs } from "../../../../src/goo/renderer/MeshData";
import { SkeletonPose as SkeletonPosejs } from "../../../../src/goo/animationpack/SkeletonPose";
import { DynamicLoader as DynamicLoaderjs } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configsjs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";
import "../../../../src/goo/loaders/handlers/MeshDataComponentHandler";
import "../../../../src/goo/loaders/handlers/MeshDataHandler";

describe('MeshDataComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new Worldjs();
		loader = new DynamicLoaderjs({
			world: world,
			rootPath: './'
		});
	});

	it('loads an entity with a meshDataComponent', function (done) {
		var config = Configs_Configsjs.entity(['meshData']);
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(MeshDataComponentjs));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(MeshDatajs));
			expect(entity.meshDataComponent.currentPose).toEqual(jasmine.any(SkeletonPosejs));
			done();
		});
	});

	it('loads a meshDatacomponent with a shape', function (done) {
		var config = Configs_Configsjs.entity();
		config.components.meshData = Configs_Configsjs.component.meshData('Sphere');
		loader.preload(Configs_Configsjs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(MeshDataComponentjs));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(MeshDatajs));
			done();
		});
	});
});
