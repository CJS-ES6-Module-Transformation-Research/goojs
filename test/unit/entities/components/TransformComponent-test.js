import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { Matrix3 as Matrix3_Matrix3js } from "../../../../src/goo/math/Matrix3";
import { Transform as Transform_Transformjs } from "../../../../src/goo/math/Transform";
import { TransformSystem as TransformSystem_TransformSystemjs } from "../../../../src/goo/entities/systems/TransformSystem";
import { TransformComponent as TransformComponent_TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponentjs } from "../../../../src/goo/entities/components/MeshRendererComponent";
import { HtmlComponent as HtmlComponent_HtmlComponentjs } from "../../../../src/goo/entities/components/HtmlComponent";
import { LightComponent as LightComponent_LightComponentjs } from "../../../../src/goo/entities/components/LightComponent";
import { Entity as Entity_Entityjs } from "../../../../src/goo/entities/Entity";
import { EntitySelection as EntitySelection_EntitySelectionjs } from "../../../../src/goo/entities/EntitySelection";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";

describe('TransformComponent', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
		world = new World_Worldjs();
		world.registerComponent(TransformComponent_TransformComponentjs);
	});

	it('can attach a child component via the transformComponent', function () {
		var parentEntity = world.createEntity();
		var childEntity = world.createEntity();
		parentEntity.addToWorld();
		childEntity.addToWorld();
		parentEntity.transformComponent.attachChild(childEntity.transformComponent);
		world.process();

		expect(parentEntity.transformComponent.children).toContain(childEntity.transformComponent);
		expect(childEntity.transformComponent.parent).toBe(parentEntity.transformComponent);
	});

	it('correctly removes parent reference of child on its removal from the world', function () {
		var parentEntity = world.createEntity();
		var childEntity = world.createEntity();
		parentEntity.addToWorld();
		childEntity.addToWorld();
		parentEntity.transformComponent.attachChild(childEntity.transformComponent);
		world.process();
		childEntity.removeFromWorld();
		world.process();
		expect(parentEntity.transformComponent.children).not.toContain(childEntity.transformComponent);
		expect(childEntity.transformComponent.parent).toBeNull();
	});

	it('correctly removes child reference of parent on its removal from the world (in non-recursive mode)', function () {
		var parentEntity = world.createEntity();
		var childEntity = world.createEntity();
		parentEntity.addToWorld();
		childEntity.addToWorld();
		parentEntity.transformComponent.attachChild(childEntity.transformComponent);
		world.process();
		parentEntity.removeFromWorld(false);
		world.process();
		expect(childEntity.transformComponent.parent).toBeNull();
		expect(parentEntity.transformComponent.children).not.toContain(childEntity.transformComponent);
	});

	it('can set, add and get rotation', function () {
		var transformComponent = new TransformComponent_TransformComponentjs();
		transformComponent.setRotation(0.2, 0.4, 0.6); // keep these values under PI / 2
		transformComponent.addRotation(0.0, 0.0, 0.5);
		expect(transformComponent.getRotation()).toBeCloseToVector(new Vector3_Vector3js(0.2, 0.4, 0.6 + 0.5));
	});

	it('can set, add and get rotation with array', function () {
		var transformComponent = new TransformComponent_TransformComponentjs();
		transformComponent.setRotation([0.2, 0.4, 0.6]); // keep these values under PI / 2
		transformComponent.addRotation([0.0, 0.0, 0.5]);
		expect(transformComponent.getRotation()).toBeCloseToVector(new Vector3_Vector3js(0.2, 0.4, 0.6 + 0.5));
	});

	it('can set translation', function () {
		var tc = new TransformComponent_TransformComponentjs();
		var translation;

		tc.setTranslation(1, 2, 3);
		translation = tc.getTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(1, 2, 3));

		tc.setTranslation([4, 5, 6]);
		translation = tc.getTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(4, 5, 6));

		tc.setTranslation(7, 8, 9);
		translation = tc.getTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(7, 8, 9));
	});

	it('can get world translation', function () {
		var parent = new TransformComponent_TransformComponentjs();
		var child = new TransformComponent_TransformComponentjs();
		parent.attachChild(child);
		var translation;

		parent.setTranslation(1, 0, 0);
		child.setTranslation(1, 2, 3);
		translation = child.getWorldTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(2, 2, 3));
	});

	it('can add translation', function () {
		var tc = new TransformComponent_TransformComponentjs();
		var translation;

		tc.setTranslation(1, 2, 3);
		tc.addTranslation(0, 0, 1);
		translation = tc.getTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(1, 2, 4));

		tc.setTranslation([1, 2, 3]);
		tc.addTranslation([0, 0, 1]);
		translation = tc.getTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(1, 2, 4));

		tc.setTranslation(new Vector3_Vector3js(1, 2, 3));
		tc.addTranslation(new Vector3_Vector3js(0, 0, 1));
		translation = tc.getTranslation();
		expect(translation).toEqual(new Vector3_Vector3js(1, 2, 4));
	});

	it('can set scale', function () {
		var tc = new TransformComponent_TransformComponentjs();
		var scale;

		tc.setScale(1, 2, 3);
		scale = tc.getScale();
		expect(scale).toEqual(new Vector3_Vector3js(1, 2, 3));

		tc.setScale([4, 5, 6]);
		scale = tc.getScale();
		expect(scale).toEqual(new Vector3_Vector3js(4, 5, 6));

		tc.setScale(7, 8, 9);
		scale = tc.getScale();
		expect(scale).toEqual(new Vector3_Vector3js(7, 8, 9));
	});

	it('can get world scale', function () {
		var parent = new TransformComponent_TransformComponentjs();
		var child = new TransformComponent_TransformComponentjs();
		parent.attachChild(child);
		var scale;

		parent.setScale(2, 1, 1);
		child.setScale(1, 2, 3);
		scale = child.getWorldScale();
		expect(scale).toEqual(new Vector3_Vector3js(2, 2, 3));
	});

	it('can set rotation matrix', function () {
		var tc = new TransformComponent_TransformComponentjs();
		var matrix;

		tc.setRotationMatrix(new Matrix3_Matrix3js([1, 2, 3, 4, 5, 6, 7, 8, 9]));
		matrix = tc.getRotationMatrix();
		expect(matrix).toEqual(new Matrix3_Matrix3js([1, 2, 3, 4, 5, 6, 7, 8, 9]));
	});

	it('can get world rotation matrix', function () {
		var tc = new TransformComponent_TransformComponentjs();
		var matrix;

		tc.setRotationMatrix(new Matrix3_Matrix3js([1, 2, 3, 4, 5, 6, 7, 8, 9]));
		matrix = tc.getWorldRotationMatrix();
		expect(matrix).toEqual(new Matrix3_Matrix3js([1, 2, 3, 4, 5, 6, 7, 8, 9]));
	});

	it('can move', function () {
		var tc = new TransformComponent_TransformComponentjs();
		tc.lookAt(new Vector3_Vector3js(1, 0, 0)); // look along the positive x axis
		tc.move(0, 0, -10); // this moves forward in a right handed coordinate system.
		// in our case this will move us 10 unity in the direction of the positive x axis.
		var translation = tc.getTranslation();
		expect(translation).toBeCloseToVector(new Vector3_Vector3js(10, 0, 0));
		tc.move(new Vector3_Vector3js(0, 0, 1));
		expect(translation).toBeCloseToVector(new Vector3_Vector3js(9, 0, 0));
	});

	it('can lookAt entity', function () {
		var entity1 = world.createEntity();
		entity1.move(3, 7, -10);
		var t1 = entity1.getTranslation();

		var entity2 = world.createEntity();
		entity2.lookAt(entity1);
		entity2.move(0, 0, -t1.length());
		var t2 = entity2.getTranslation();

		expect(t1).toBeCloseToVector(t2);
	});

	it('handles attaching itself to an entity', function () {
		var transformComponent = new TransformComponent_TransformComponentjs();
		var entity = new Entity_Entityjs(world);

		entity.setComponent(transformComponent);
		expect(transformComponent.entity).toBe(entity);
	});

	// should it ever be detached? since it's enforced and there are so many dependencies probably not
	it('handles detaching itself from an entity', function () {
		var transformComponent = new TransformComponent_TransformComponentjs();
		var entity = new Entity_Entityjs(world);

		entity.setComponent(transformComponent);
		entity.clearComponent('transformComponent');
		expect(transformComponent.entity).toBeFalsy();
	});

	it('returns the host entity when calling setTranslation on it', function () {
		var entity = world.createEntity();
		entity.setComponent(new TransformComponent_TransformComponentjs());

		expect(entity.setTranslation(new Vector3_Vector3js(1, 2, 3))).toBe(entity);
	});

	it('handles getTranslation on host the same way as on itself', function () {
		var entity = world.createEntity();
		entity.setComponent(new TransformComponent_TransformComponentjs());
		expect(entity.getTranslation()).toBe(entity.transformComponent.getTranslation());
	});

	it('returns the host entity when calling any transform related method on it', function () {
		var entity = world.createEntity();
		entity.setComponent(new TransformComponent_TransformComponentjs());

		expect(entity.setTranslation(new Vector3_Vector3js(1, 2, 3))).toBe(entity);
		expect(entity.setScale(new Vector3_Vector3js(1, 2, 3))).toBe(entity);
		expect(entity.setRotation(new Vector3_Vector3js(1, 2, 3))).toBe(entity);
		expect(entity.lookAt(new Vector3_Vector3js(1, 2, 3))).toBe(entity);
	});

	it('returns the parent host entity when calling attachChild/detachChild on it', function () {
		var parent = world.createEntity();
		var child = world.createEntity();

		expect(parent.attachChild(child)).toBe(parent);
		expect(parent.detachChild(child)).toBe(parent);
	});

	it('calls TransformComponent.attachChild from the injected "pair" method', function () {
		var parent = world.createEntity();
		var child = world.createEntity();

		parent.attachChild(child);

		expect(parent.transformComponent.children).toEqual([child.transformComponent]);
		expect(child.transformComponent.parent).toEqual(parent.transformComponent);
	});

	it('calls TransformComponent.detachChild from the injected "pair" method', function () {
		var parent = world.createEntity();
		var child = world.createEntity();

		parent.attachChild(child);
		parent.detachChild(child);

		expect(parent.transformComponent.children).toEqual([]);
		expect(child.transformComponent.parent).toBeFalsy();
	});

	describe('called from EntitySelection', function () {
		it('sets the translation of some entities', function () {
			var entity1 = new Entity_Entityjs(world).setComponent(new TransformComponent_TransformComponentjs());
			var entity2 = new Entity_Entityjs(world).setComponent(new TransformComponent_TransformComponentjs());

			new EntitySelection_EntitySelectionjs(entity1, entity2).setTranslation(1, 2, 3);

			expect(entity1.transformComponent.transform.translation).toBeCloseToVector(new Vector3_Vector3js(1, 2, 3));
			expect(entity2.transformComponent.transform.translation).toBeCloseToVector(new Vector3_Vector3js(1, 2, 3));
		});

		it('translates some entities', function () {
			var entity1 = new Entity_Entityjs(world).setComponent(new TransformComponent_TransformComponentjs());
			var entity2 = new Entity_Entityjs(world).setComponent(new TransformComponent_TransformComponentjs());

			entity1.setTranslation(11, 22, 33);
			entity2.setTranslation(44, 55, 66);

			new EntitySelection_EntitySelectionjs(entity1, entity2).addTranslation(1, 2, 3);

			expect(entity1.transformComponent.transform.translation)
			.toBeCloseToVector(new Vector3_Vector3js(11 + 1, 22 + 2, 33 + 3));

			expect(entity2.transformComponent.transform.translation)
			.toBeCloseToVector(new Vector3_Vector3js(44 + 1, 55 + 2, 66 + 3));
		});

		it('hides some entities', function () {
			var entity = new Entity_Entityjs(world).setComponent(new TransformComponent_TransformComponentjs());
			new EntitySelection_EntitySelectionjs(entity).hide();
			expect(entity._hidden).toBeTruthy();
		});
	});

	describe('.applyOnEntity', function () {
		it('sets a TransformComponent when trying to add a 3 element array', function () {
			var entity = new Entity_Entityjs(world);
			var translation = [1, 2, 3];
			entity.set(translation);

			expect(entity.transformComponent).toBeTruthy();
			expect(entity.transformComponent.transform.translation).toBeCloseToVector(new Vector3_Vector3js(1, 2, 3));
		});

		it('modifies the TransformComponent if it already exists when trying to add a 3 element array', function () {
			var entity = new Entity_Entityjs(world);
			var transformComponent = new TransformComponent_TransformComponentjs();
			var transformSystem = new TransformSystem_TransformSystemjs();

			entity.set(transformComponent);
			transformSystem.process([entity]);

			var translation = [1, 2, 3];
			entity.set(translation);

			expect(entity.transformComponent).toBe(transformComponent);
			expect(entity.transformComponent.transform.translation).toBeCloseToVector(new Vector3_Vector3js(1, 2, 3));
		});

		it('sets a TransformComponent when trying to add a {x, y, z} object', function () {
			var entity = new Entity_Entityjs(world);
			var translation = { x: 1, y: 2, z: 3 };
			entity.set(translation);

			expect(entity.transformComponent).toBeTruthy();
			expect(entity.transformComponent.transform.translation).toBeCloseToVector(new Vector3_Vector3js(1, 2, 3));
		});

		it('sets a TransformComponent when trying to add a Transform', function () {
			var entity = new Entity_Entityjs(world);
			var transform = new Transform_Transformjs();
			transform.translation.setDirect(1, 2, 3);
			entity.set(transform);

			expect(entity.transformComponent).toBeTruthy();
			expect(entity.transformComponent.transform.translation).toBeCloseToVector(new Vector3_Vector3js(1, 2, 3));
		});

		it('applies all of the API functions correctly', function (){
			var entity = new Entity_Entityjs(world);
			var childEntity = new Entity_Entityjs(world);
			function traverseFunction(entity){
				expect(entity).toEqual(jasmine.any(Entity_Entityjs));
			}
			entity.set(new TransformComponent_TransformComponentjs());
			childEntity.set(new TransformComponent_TransformComponentjs());

			entity.setTranslation(1, 2, 3);
			expect(entity.getTranslation()).toEqual(new Vector3_Vector3js(1, 2, 3));

			entity.setRotation(0, 0, 0);
			expect(entity.getRotation()).toEqual(new Vector3_Vector3js(0, 0, 0));

			entity.setScale(1, 2, 3);
			expect(entity.getScale()).toEqual(new Vector3_Vector3js(1, 2, 3));

			entity.lookAt(0, 0, 0);

			entity.addTranslation(1, 0, 0);

			entity.setTranslation(1, 2, 3).addTranslation(1, 2, 3);
			expect(entity.getTranslation()).toEqual(new Vector3_Vector3js(2, 4, 6));

			entity.attachChild(childEntity);
			expect(entity.children().size()).toEqual(1);
			expect(childEntity.parent().size()).toEqual(1);

			entity.traverse(traverseFunction);
			entity.traverseUp(traverseFunction);

			entity.detachChild(childEntity);
			expect(entity.children().size()).toEqual(0);
			expect(childEntity.parent().size()).toEqual(0);
		});
	});

	it('gets an EntitySelection of children', function () {
		var parent = world.createEntity();
		var child1 = world.createEntity();
		var child2 = world.createEntity();

		parent.attachChild(child1);
		parent.attachChild(child2);

		var children = parent.children();

		expect(children.contains(child1)).toBeTruthy();
		expect(children.contains(child2)).toBeTruthy();
	});

	it('gets an EntitySelection of parent', function () {
		var parent = world.createEntity();
		var child = world.createEntity();

		parent.attachChild(child);

		var parentSelection = child.parent();

		expect(parentSelection.contains(parent)).toBeTruthy();
	});

	describe('traverse', function () {
		it('traverses the children of an entity with a callback', function () {
			var child21 = world.createEntity('child21');
			var child22 = world.createEntity('child22');

			var child1 = world.createEntity('child1');
			var child2 = world.createEntity('child2').attachChild(child21).attachChild(child22);

			var parent = world.createEntity().attachChild(child1).attachChild(child2);

			var traversed = [];
			parent.traverse(function (entity) {
				traversed.push(entity);
			});

			expect(traversed).toEqual([parent, child1, child2, child21, child22]);
		});

		it('traverses the children of an entity with a callback until false is returned', function () {
			var child21 = world.createEntity('child21');
			var child22 = world.createEntity('child22');

			var child1 = world.createEntity('child1');
			var child2 = world.createEntity('child2').attachChild(child21).attachChild(child22);

			var parent = world.createEntity().attachChild(child1).attachChild(child2);

			var traversed = [];
			parent.traverse(function (entity) {
				traversed.push(entity);
				if (traversed.length >= 3) {
					return false;
				}
			});

			expect(traversed).toEqual([parent, child1, child2]);
		});
	});

	describe('traverseUp', function () {
		it('traverses the parents of an entity with a callback', function () {
			var child21 = world.createEntity('child21');
			var child22 = world.createEntity('child22');

			var child1 = world.createEntity('child1');
			var child2 = world.createEntity('child2').attachChild(child21).attachChild(child22);

			var parent = world.createEntity().attachChild(child1).attachChild(child2);

			var traversed = [];
			child22.traverseUp(function (entity) {
				traversed.push(entity);
			});

			expect(traversed).toEqual([child22, child2, parent]);
		});

		it('traverses the parents of an entity with a callback until false is returned', function () {
			var child21 = world.createEntity('child21');
			var child22 = world.createEntity('child22');

			var child1 = world.createEntity('child1');
			var child2 = world.createEntity('child2').attachChild(child21).attachChild(child22);

			world.createEntity().attachChild(child1).attachChild(child2);

			var traversed = [];
			child22.traverseUp(function (entity) {
				traversed.push(entity);
				return false;
			});

			expect(traversed).toEqual([child22]);
		});
	});

	//! AT: let's isolate this a bit
	// it can't stay in its own describe but it uses some methods of its own
	(function () {
		function getEntity() {
			return world.createEntity().set(new MeshRendererComponent_MeshRendererComponentjs())
				.set(new LightComponent_LightComponentjs())
				.set(new HtmlComponent_HtmlComponentjs());
		}

		function expectEverything(entity, entityHidden, componentsHidden) {
			expect(entity._hidden).toEqual(entityHidden);
			expect(entity.meshRendererComponent.hidden).toEqual(componentsHidden);
			expect(entity.lightComponent.hidden).toEqual(componentsHidden);
			expect(entity.htmlComponent.hidden).toEqual(componentsHidden);
		}

		describe('hide', function () {
			it('can hide an entity and its components', function () {
				var entity = getEntity();

				entity.hide();

				expectEverything(entity, true, true);
			});

			it('can hide an entity and its children and their components', function () {
				var grandparent = getEntity();
				var parent1 = getEntity();
				var parent2 = getEntity();
				var child11 = getEntity();
				var child12 = getEntity();
				var child21 = getEntity();
				var child22 = getEntity();

				grandparent.attachChild(parent1);
				grandparent.attachChild(parent2);
				parent1.attachChild(child11);
				parent1.attachChild(child12);
				parent2.attachChild(child21);
				parent2.attachChild(child22);

				parent1.hide();
				grandparent.hide();

				expectEverything(grandparent, true, true);
				expectEverything(parent1, true, true);
				expectEverything(parent2, false, true);
				expectEverything(child11, false, true);
				expectEverything(child12, false, true);
				expectEverything(child21, false, true);
				expectEverything(child22, false, true);
			});
		});

		describe('show', function () {
			it('can show a hidden entity and its components', function () {
				var entity = getEntity();

				entity.hide();
				entity.show();

				expectEverything(entity, false, false);
			});

			it('can show a hidden entity but keeps its components hidden if an ancestor entity is hidden', function () {
				var grandparent = getEntity();
				var parent1 = getEntity();
				var parent2 = getEntity();
				var child11 = getEntity();
				var child12 = getEntity();
				var child21 = getEntity();
				var child22 = getEntity();

				grandparent.attachChild(parent1);
				grandparent.attachChild(parent2);
				parent1.attachChild(child11);
				parent1.attachChild(child12);
				parent2.attachChild(child21);
				parent2.attachChild(child22);

				grandparent.hide();
				parent1.show();
				child22.show();

				expectEverything(grandparent, true, true);
				expectEverything(parent1, false, true);
				expectEverything(parent2, false, true);
				expectEverything(child11, false, true);
				expectEverything(child12, false, true);
				expectEverything(child21, false, true);
				expectEverything(child22, false, true);
			});
		});

		describe('isHidden', function () {
			it('returns the correct hidden status for one entity', function () {
				var entity1 = getEntity();
				expect(entity1.isHidden()).toBeFalsy();

				var entity2 = getEntity();
				entity2.hide();
				expect(entity2.isHidden()).toBeTruthy();
				entity2.show();
				expect(entity2.isHidden()).toBeFalsy();
			});

			it('returns the correct hidden status for an entity in a hierarchy', function () {
				var grandparent = getEntity();
				var parent1 = getEntity();
				var parent2 = getEntity();
				var child11 = getEntity();
				var child12 = getEntity();
				var child21 = getEntity();
				var child22 = getEntity();

				grandparent.attachChild(parent1);
				grandparent.attachChild(parent2);
				parent1.attachChild(child11);
				parent1.attachChild(child12);
				parent2.attachChild(child21);
				parent2.attachChild(child22);

				parent1.hide();

				expect(grandparent.isHidden()).toBeFalsy();
				expect(parent1.isHidden()).toBeTruthy();
				expect(parent2.isHidden()).toBeFalsy();

				expect(child11.isHidden()).toBeFalsy();
				expect(child12.isHidden()).toBeFalsy();
				expect(child21.isHidden()).toBeFalsy();
				expect(child22.isHidden()).toBeFalsy();
			});
		});

		describe('isVisiblyHidden', function () {
			it('returns the correct visibly hidden status for one entity', function () {
				var entity1 = getEntity();
				expect(entity1.isVisiblyHidden()).toBeFalsy();

				var entity2 = getEntity();
				entity2.hide();
				expect(entity2.isVisiblyHidden()).toBeTruthy();
				entity2.show();
				expect(entity2.isVisiblyHidden()).toBeFalsy();
			});

			it('returns the correct visibly hidden status for an entity in a hierarchy', function () {
				var grandparent = getEntity();
				var parent1 = getEntity();
				var parent2 = getEntity();
				var child11 = getEntity();
				var child12 = getEntity();
				var child21 = getEntity();
				var child22 = getEntity();

				grandparent.attachChild(parent1);
				grandparent.attachChild(parent2);
				parent1.attachChild(child11);
				parent1.attachChild(child12);
				parent2.attachChild(child21);
				parent2.attachChild(child22);

				parent1.hide();

				expect(grandparent.isVisiblyHidden()).toBeFalsy();
				expect(parent1.isVisiblyHidden()).toBeTruthy();
				expect(parent2.isVisiblyHidden()).toBeFalsy();

				expect(child11.isVisiblyHidden()).toBeTruthy();
				expect(child12.isVisiblyHidden()).toBeTruthy();
				expect(child21.isVisiblyHidden()).toBeFalsy();
				expect(child22.isVisiblyHidden()).toBeFalsy();
			});
		});

		//! AT: components will be visible if attached after the entity was hidden
		// same goes for entities attached after the parent was hidden
	})();

	it('can sync', function () {
		var parentEntity = world.createEntity().addToWorld();
		var childEntity = world.createEntity().addToWorld();
		parentEntity.transformComponent.attachChild(childEntity.transformComponent);
		parentEntity.transformComponent.transform.translation.x = 1;
		parentEntity.transformComponent.transform.update();
		parentEntity.transformComponent.setUpdated();

		parentEntity.transformComponent.sync();

		expect(parentEntity.transformComponent.worldTransform.translation.x).toBe(1);
		expect(childEntity.transformComponent.worldTransform.translation.x).toBe(0);

		childEntity.transformComponent.sync();

		expect(childEntity.transformComponent.worldTransform.translation.x).toBe(1);
	});
});