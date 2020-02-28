import {
    getRoot as EntityUtilsjs_getRoot,
    getTotalBoundingBox as EntityUtilsjs_getTotalBoundingBox,
} from "../../../src/goo/entities/EntityUtils";

import { Entity as Entityjs } from "../../../src/goo/entities/Entity";
import { World as World_Worldjs } from "../../../src/goo/entities/World";
import { TransformComponent as TransformComponentjs } from "../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponentjs } from "../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponentjs } from "../../../src/goo/entities/components/MeshRendererComponent";
import { TransformSystem as TransformSystemjs } from "../../../src/goo/entities/systems/TransformSystem";
import { Box as Boxjs } from "../../../src/goo/shapes/Box";

describe('EntityUtils', function () {
	var world;
	var meshData = new Boxjs();

	beforeEach(function () {
		world = new World_Worldjs();
		world.registerComponent(TransformComponentjs);
		world.registerComponent(MeshDataComponentjs);
		world.add(new TransformSystemjs());
		Entityjs_entityCount = 0;
	});

	it('can get the root entity', function () {
		var e1 = world.createEntity();
		var e2 = world.createEntity();
		e1.transformComponent.attachChild(e2.transformComponent);
		var e3 = world.createEntity();
		e2.transformComponent.attachChild(e3.transformComponent);
		world.process();

		expect(EntityUtilsjs_getRoot(e1)).toBe(e1);
		expect(EntityUtilsjs_getRoot(e2)).toBe(e1);
		expect(EntityUtilsjs_getRoot(e3)).toBe(e1);
	});

	it('can get the total bounding box', function () {
		var e1 = world.createEntity(meshData, new MeshRendererComponentjs());
		var e2 = world.createEntity(meshData, new MeshRendererComponentjs(), [10, 10, 10]);
		e1.transformComponent.attachChild(e2.transformComponent);
		var e3 = world.createEntity(meshData, new MeshRendererComponentjs(), [10, 10, 10]);
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
		var bb = EntityUtilsjs_getTotalBoundingBox(e1);
		expect(bb.xExtent).toBe(10.5);
		expect(bb.yExtent).toBe(10.5);
		expect(bb.zExtent).toBe(10.5);
	});
});
