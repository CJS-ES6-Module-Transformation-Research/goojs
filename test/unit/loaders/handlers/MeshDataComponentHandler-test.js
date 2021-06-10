import { World as World_World } from "../../../../src/goo/entities/World";
import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../../../src/goo/entities/components/MeshDataComponent";
import { MeshData as MeshData_MeshData } from "../../../../src/goo/renderer/MeshData";
import { SkeletonPose as SkeletonPose_SkeletonPose } from "../../../../src/goo/animationpack/SkeletonPose";
import { DynamicLoader as DynamicLoader_DynamicLoader } from "../../../../src/goo/loaders/DynamicLoader";
import { Configs as Configs_Configs } from "../../../../test/unit/loaders/Configs";
import "../../../../src/goo/animationpack/handlers/AnimationHandlers";
import "../../../../src/goo/loaders/handlers/MeshDataComponentHandler";
import "../../../../src/goo/loaders/handlers/MeshDataHandler";

describe('MeshDataComponentHandler', function () {
	var loader;

	beforeEach(function () {
		var world = new World_World();
		loader = new DynamicLoader_DynamicLoader({
			world: world,
			rootPath: './'
		});
	});

	it('loads an entity with a meshDataComponent', function (done) {
		var config = Configs_Configs.entity(['meshData']);
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(MeshDataComponent_MeshDataComponent));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(MeshData_MeshData));
			expect(entity.meshDataComponent.currentPose).toEqual(jasmine.any(SkeletonPose_SkeletonPose));
			done();
		});
	});

	it('loads a meshDatacomponent with a shape', function (done) {
		var config = Configs_Configs.entity();
		config.components.meshData = Configs_Configs.component.meshData('Sphere');
		loader.preload(Configs_Configs.get());
		loader.load(config.id).then(function (entity) {
			expect(entity.meshDataComponent).toEqual(jasmine.any(MeshDataComponent_MeshDataComponent));
			expect(entity.meshDataComponent.meshData).toEqual(jasmine.any(MeshData_MeshData));
			done();
		});
	});
});
