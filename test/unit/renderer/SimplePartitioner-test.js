import { SimplePartitioner as srcgoorendererSimplePartitioner_SimplePartitionerjs } from "../../../src/goo/renderer/SimplePartitioner";
import { Camera as srcgoorendererCamera_Camerajs } from "../../../src/goo/renderer/Camera";
import { BoundingSphere as srcgoorendererboundsBoundingSphere_BoundingSpherejs } from "../../../src/goo/renderer/bounds/BoundingSphere";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../src/goo/math/Vector3";
import { Entity as srcgooentitiesEntity_Entityjs } from "../../../src/goo/entities/Entity";
import {     MeshRendererComponent as srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs, } from "../../../src/goo/entities/components/MeshRendererComponent";

describe('SimplePartitioner', function () {
	var partitioner, camera;

	beforeEach(function () {
		partitioner = new srcgoorendererSimplePartitioner_SimplePartitionerjs();
		camera = new srcgoorendererCamera_Camerajs();
	});

	function createEntity(x, y, z) {
		var entity = new srcgooentitiesEntity_Entityjs();
		var mrc = new srcgooentitiescomponentsMeshRendererComponent_MeshRendererComponentjs();
		mrc.worldBound = new srcgoorendererboundsBoundingSphere_BoundingSpherejs(new srcgoomathVector3_Vector3js(x, y, z), 1);
		entity.set(mrc);
		return entity;
	}

	describe('process', function () {
		it('can partition two entities', function () {
			var entity1 = createEntity(0, 0, 5);
			var entity2 = createEntity(0, 0, -5);
			var entities = [entity1, entity2];
			var renderList = [];

			partitioner.process(camera, entities, renderList);

			expect(renderList).toContain(entity2);
			expect(renderList.length).toEqual(1);
		});

		it('can filter with hide', function () {
			var entity = createEntity(0, 0, -5);
			var entities = [entity];
			var renderList = [];

			partitioner.process(camera, entities, renderList);

			expect(renderList).toContain(entity);

			entity.meshRendererComponent.hidden = true;
			partitioner.process(camera, entities, renderList);

			expect(renderList).not.toContain(entity);
		});

		it('cullmode never', function () {
			var entity = createEntity(0, 0, 5);
			var entities = [entity];
			var renderList = [];

			partitioner.process(camera, entities, renderList);

			expect(renderList).not.toContain(entity);

			entity.meshRendererComponent.cullMode = 'Never';
			partitioner.process(camera, entities, renderList);

			expect(renderList).toContain(entity);
		});
	});
});
