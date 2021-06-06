import { EntityUtils as EntityUtils_EntityUtils } from "../../../src/goo/entities/EntityUtils";
import { Entity as Entity_Entity } from "../../../src/goo/entities/Entity";
import { World as World_World } from "../../../src/goo/entities/World";
import { TransformComponent as TransformComponent_TransformComponent } from "../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponent } from "../../../src/goo/entities/components/MeshRendererComponent";
import { TransformSystem as TransformSystem_TransformSystem } from "../../../src/goo/entities/systems/TransformSystem";
import { Box as Box_Box } from "../../../src/goo/shapes/Box";

describe('EntityUtils', function () {
	var world;
	var meshData = new Box_Box();

	beforeEach(function () {
		world = new World_World();
		world.registerComponent(TransformComponent_TransformComponent);
		world.registerComponent(MeshDataComponent_MeshDataComponent);
		world.add(new TransformSystem_TransformSystem());
		Entity_Entity.entityCount = 0;
	});

	it('can get the root entity', function () {
		var e1 = world.createEntity();
		var e2 = world.createEntity();
		e1.transformComponent.attachChild(e2.transformComponent);
		var e3 = world.createEntity();
		e2.transformComponent.attachChild(e3.transformComponent);
		world.process();

		expect(EntityUtils_EntityUtils.getRoot(e1)).toBe(e1);
		expect(EntityUtils_EntityUtils.getRoot(e2)).toBe(e1);
		expect(EntityUtils_EntityUtils.getRoot(e3)).toBe(e1);
	});

	it('can get the total bounding box', function () {
		var e1 = world.createEntity(meshData, new MeshRendererComponent_MeshRendererComponent());
		var e2 = world.createEntity(meshData, new MeshRendererComponent_MeshRendererComponent(), [10, 10, 10]);
		e1.transformComponent.attachChild(e2.transformComponent);
		var e3 = world.createEntity(meshData, new MeshRendererComponent_MeshRendererComponent(), [10, 10, 10]);
		e2.transformComponent.attachChild(e3.transformComponent);
		world.process();
		var es = [e1, e2, e3, e1, e2, e3];
		for (var i = 0; i<es.length; i++) {
			var e = es[i];
			e.transformComponent.updateTransform();
			e.transformComponent.updateWorldTransform();
			e.meshDataComponent.computeBoundFromPoints();
			e.meshRendererComponent.updateBounds(e.meshDataComponent.modelBound, e.transformComponent.worldTransform);
		}
		var bb = EntityUtils_EntityUtils.getTotalBoundingBox(e1);
		expect(bb.xExtent).toBe(10.5);
		expect(bb.yExtent).toBe(10.5);
		expect(bb.zExtent).toBe(10.5);
	});
});
