import { Entity as Entity_Entity } from "../../../src/goo/entities/Entity";
import { World as World_World } from "../../../src/goo/entities/World";
import { TransformComponent as TransformComponent_TransformComponent } from "../../../src/goo/entities/components/TransformComponent";
import { MeshDataComponent as MeshDataComponent_MeshDataComponent } from "../../../src/goo/entities/components/MeshDataComponent";
import { MeshRendererComponent as MeshRendererComponent_MeshRendererComponent } from "../../../src/goo/entities/components/MeshRendererComponent";
import { CameraComponent as CameraComponent_CameraComponent } from "../../../src/goo/entities/components/CameraComponent";
import { LightComponent as LightComponent_LightComponent } from "../../../src/goo/entities/components/LightComponent";
import { ScriptComponent as ScriptComponent_ScriptComponent } from "../../../src/goo/entities/components/ScriptComponent";
import { Component as Component_Component } from "../../../src/goo/entities/components/Component";
import { ScriptSystem as ScriptSystem_ScriptSystem } from "../../../src/goo/entities/systems/ScriptSystem";
import { Box as Box_Box } from "../../../src/goo/shapes/Box";
import { Camera as Camera_Camera } from "../../../src/goo/renderer/Camera";
import { PointLight as PointLight_PointLight } from "../../../src/goo/renderer/light/PointLight";
import { ShaderLib as ShaderLib_ShaderLib } from "../../../src/goo/renderer/shaders/ShaderLib";
import { Material as Material_Material } from "../../../src/goo/renderer/Material";

describe('Entity', function () {
	var world;

	beforeEach(function () {
		world = new World_World();
		Entity_Entity.entityCount = 0;

		world.registerComponent(TransformComponent_TransformComponent);
		world.registerComponent(MeshDataComponent_MeshDataComponent);
		world.registerComponent(MeshRendererComponent_MeshRendererComponent);
		world.registerComponent(CameraComponent_CameraComponent);
		world.registerComponent(LightComponent_LightComponent);
		world.registerComponent(ScriptComponent_ScriptComponent);

		//
		world.gooRunner = {
			renderer: {
				domElement: null,
				viewportWidth: null,
				viewportHeight: null
			}
		};
		world.add(new ScriptSystem_ScriptSystem(world));
	});

	it('addToWorld', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		entity1.addToWorld();
		entity2.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
	});

	it('addToWorld recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);
	});

	it('addToWorld non-recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld(false);
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(false);
		expect(world.entityManager.containsEntity(entity3)).toBe(false);
	});

	it('removeFromWorld', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		entity1.addToWorld();
		entity2.addToWorld();
		world.process();
		entity1.removeFromWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(false);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
	});

	it('removeFromWorld recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);
		entity2.removeFromWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(false);
		expect(world.entityManager.containsEntity(entity3)).toBe(false);

		expect(entity1.transformComponent.children.length).toBe(0);
		expect(entity2.transformComponent.parent).toBeNull();
		expect(entity3.transformComponent.parent).toBe(entity2.transformComponent);
	});

	it('removeFromWorld non-recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);
		entity2.removeFromWorld(false);
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(false);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);

		expect(entity1.transformComponent.children.length).toBe(0);
		expect(entity2.transformComponent.parent).toBeNull();
		expect(entity2.transformComponent.children.length).toBe(0);
		expect(entity3.transformComponent.parent).toBeNull();
	});

	it('toString', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity('myEnt');
		var entity3 = world.createEntity();
		expect(entity1.toString()).toBe('Entity_0');
		expect(entity2.toString()).toBe('myEnt');
		expect(entity3.toString()).toBe('Entity_2');
	});

	it('all entities should have TransformComponent', function () {
		var entity = world.createEntity();
		expect(entity.transformComponent !== undefined).toBe(true);
	});

	it('setComponent', function () {
		var entity = world.createEntity();
		entity.setComponent(new MeshDataComponent_MeshDataComponent());
		expect(entity.meshDataComponent !== undefined).toBe(true);
	});

	it('cannot add the same component twice', function () {
		var entity = world.createEntity();
		var component = new MeshDataComponent_MeshDataComponent();
		entity.setComponent(component);
		entity.setComponent(component);
		expect(entity._components.length).toBe(2);
	});

	it('cannot add more than one component of the same type to the same entity', function () {
		var entity = world.createEntity();
		entity.setComponent(new MeshDataComponent_MeshDataComponent());
		entity.setComponent(new MeshDataComponent_MeshDataComponent());
		expect(entity._components.length).toBe(2);
	});

	it('discards the second added component of the same type', function () {
		var entity = world.createEntity();
		var component1 = new MeshDataComponent_MeshDataComponent();
		var component2 = new MeshDataComponent_MeshDataComponent();
		entity.setComponent(component1);
		entity.setComponent(component2);
		var gotComponent = entity.getComponent('MeshDataComponent');
		expect(gotComponent).toBe(component1);
	});

	it('getComponent', function () {
		var entity = world.createEntity();
		var mdc = new MeshDataComponent_MeshDataComponent();
		entity.setComponent(mdc);
		expect(entity.getComponent('meshDataComponent')).toBe(mdc);
		expect(entity.getComponent('MeshDataComponent')).toBe(mdc);
		expect(entity.getComponent('TransformComponent') !== undefined).toBe(true);
	});

	it('hasComponent', function () {
		var entity = world.createEntity();
		entity.setComponent(new MeshDataComponent_MeshDataComponent());
		expect(entity.hasComponent('alabalaportocala')).toBe(false);
		expect(entity.hasComponent('TransformComponent')).toBe(true);
		expect(entity.hasComponent('MeshDataComponent')).toBe(true);
	});

	it('clears a component', function () {
		var entity = world.createEntity();
		entity.setComponent(new MeshDataComponent_MeshDataComponent());
		entity.setComponent(new MeshRendererComponent_MeshRendererComponent());
		world.process();
		entity.clearComponent('MeshRendererComponent');
		world.process();
		expect(entity.hasComponent('MeshDataComponent')).toBe(true);
		expect(entity.hasComponent('MeshRendererComponent')).toBe(false);
	});

	it('installs the api of a component', function () {
		var entity = world.createEntity();
		entity.setComponent(new TransformComponent_TransformComponent());
		expect(entity.setTranslation).toBeTruthy();
	});

	it('removes the api of a component', function () {
		var entity = world.createEntity();
		entity.clearComponent('TransformComponent');
		expect(entity.setTranslation).toBeFalsy();
	});

	it('does not override existing methods on install', function () {
		var a = 0;
		function FishComponent() {
			Component_Component.apply(this, arguments);
			this.type = 'FishComponent';
			this.api = {
				swim: function () { a += 123; }
			};
		}
		FishComponent.prototype = Object.create(Component_Component.prototype);


		var b = 0;
		function BananaComponent() {
			Component_Component.apply(this, arguments);
			this.type = 'BananaComponent';
			this.api = {
				swim: function () { b += 234; }
			};
		}
		BananaComponent.prototype = Object.create(Component_Component.prototype);


		var entity = new Entity_Entity(world);

		entity.setComponent(new FishComponent());

		expect(function () {
			entity.setComponent(new BananaComponent());
		}).toThrow(new Error("Could not install method swim of BananaComponent as it is already taken"));

		entity.swim();

		expect(a).toEqual(123);
		expect(b).toEqual(0);
	});

	it('does not remove what it did not manage to install', function () {
		var a = 0;
		function FishComponent() {
			Component_Component.apply(this, arguments);
			this.type = 'FishComponent';
			this.api = {
				swim: function () { a += 123; }
			};
		}
		FishComponent.prototype = Object.create(Component_Component.prototype);


		var b = 0;
		function BananaComponent() {
			Component_Component.apply(this, arguments);
			this.type = 'BananaComponent';
			this.api = {
				swim: function () { b += 234; }
			};
		}
		BananaComponent.prototype = Object.create(Component_Component.prototype);


		var entity = new Entity_Entity(world);

		entity.setComponent(new FishComponent());

		expect(function () {
			entity.setComponent(new BananaComponent());
		}).toThrow(new Error("Could not install method swim of BananaComponent as it is already taken"));

		entity.clearComponent('BananaComponent');

		expect(entity.swim).toBeTruthy();

		entity.swim();

		expect(a).toEqual(123);
	});

	//! AT: these should stay in their respective component test files
	it('returns itself after calling set()', function () {
		var entity = new Entity_Entity(world);
		var translation = [1, 2, 3];
		var sameEntity = entity.set(translation);

		expect(sameEntity).toEqual(entity);
	});

	it('sets a TransformComponent', function () {
		var entity = new Entity_Entity(world);
		var transformComponent = new TransformComponent_TransformComponent();
		entity.set(transformComponent);

		expect(entity.transformComponent).toBe(transformComponent);
	});

	// ---
	it('sets a MeshDataComponent when trying to add a mesh', function () {
		var entity = new Entity_Entity(world);
		var meshData = new Box_Box();
		entity.set(meshData);

		expect(entity.meshDataComponent).toBeTruthy();
		expect(entity.meshDataComponent.meshData).toEqual(meshData);
	});

	it('sets a MeshRendererComponent when trying to add a material', function () {
		var entity = new Entity_Entity(world);
		var material = new Material_Material(ShaderLib_ShaderLib.simple);
		entity.set(material);

		expect(entity.meshRendererComponent).toBeTruthy();
		expect(entity.meshRendererComponent.materials).toEqual([material]);
	});

	it('sets a CameraComponent when trying to add a camera', function () {
		var entity = new Entity_Entity(world);
		var camera = new Camera_Camera();
		entity.set(camera);

		expect(entity.cameraComponent).toBeTruthy();
		expect(entity.cameraComponent.camera).toBe(camera);
	});

	it('sets a LightComponent when trying to add a light', function () {
		var entity = new Entity_Entity(world);
		var light = new PointLight_PointLight();
		entity.set(light);

		expect(entity.lightComponent).toBeTruthy();
		expect(entity.lightComponent.light).toBe(light);
	});

	it('sets a ScriptComponent when trying to some functions / objects with a run function', function () {
		var entity = new Entity_Entity(world);
		var script1 = { run: function () { } };
		var script2 = function () { };

		entity.set(script1, script2);

		expect(entity.scriptComponent).toBeTruthy();
		expect(entity.scriptComponent.scripts).toEqual([script1, { run: script2 }]);
	});

	/*
	//! AT: disputed
	it('cannot clear a transform component', function () {
		var entity = world.createEntity();
		entity.setComponent(new MeshDataComponent());
		world.process();
		entity.clearComponent('transformComponent');
		world.process();
		expect(entity.hasComponent('MeshDataComponent')).toBe(true);
		expect(entity.hasComponent('TransformComponent')).toBe(true);
	});
	*/

	it('can add components on a world-less entity', function () {
		var entity = new Entity_Entity();
		entity.setComponent(new CameraComponent_CameraComponent());
		expect(entity.cameraComponent).toBeTruthy();
	});

	it('can remove components on a world-less entity', function () {
		var entity = new Entity_Entity();
		entity.setComponent(new CameraComponent_CameraComponent());
		entity.clearComponent('CameraComponent');
		expect(entity.cameraComponent).toBeFalsy();
	});

	it("can pass a 'primitive engine object' to .set of a world-less entity", function () {
		var entity = new Entity_Entity();
		entity.set([1, 2, 3]);
		// if we get here at least it doesn't blow up (like it used to)
		expect(true).toBeTruthy();

		//! AT: this should work too but requires a lot of changes
		// registered components should stay somewhere else than in worlds
		//expect(entity.cameraComponent).toBeTruthy();
	});

	describe('tags', function () {
		it('sets a tag on an entity', function () {
			var entity = new Entity_Entity();
			entity.setTag('t1');
			expect(entity.hasTag('t1')).toBeTruthy();
			expect(entity.hasTag('t2')).toBeFalsy();
		});

		it('clears a tag on an entity', function () {
			var entity = new Entity_Entity();
			entity.setTag('t1').setTag('t3');
			entity.clearTag('t1').clearTag('t2');
			expect(entity.hasTag('t1')).toBeFalsy();
			expect(entity.hasTag('t2')).toBeFalsy();
			expect(entity.hasTag('t3')).toBeTruthy();
		});
	});

	describe('attributes', function () {
		it('sets an attribute on an entity', function () {
			var entity = new Entity_Entity();
			entity.setAttribute('a1', 123);

			expect(entity.hasAttribute('a1')).toBeTruthy();
			expect(entity.getAttribute('a1')).toEqual(123);

			expect(entity.hasAttribute('a2')).toBeFalsy();
			expect(entity.getAttribute('a2')).toBeUndefined();
		});

		it('clears an attribute on an entity', function () {
			var entity = new Entity_Entity();
			entity.setAttribute('a1', 123).setAttribute('a3', 'asd');
			entity.clearAttribute('a1').clearAttribute('a2');

			expect(entity.hasAttribute('a1')).toBeFalsy();
			expect(entity.getAttribute('a1')).toBeUndefined();

			expect(entity.hasAttribute('a2')).toBeFalsy();
			expect(entity.getAttribute('a2')).toBeUndefined();

			expect(entity.hasAttribute('a3')).toBeTruthy();
			expect(entity.getAttribute('a3')).toEqual('asd');
		});
	});
});
