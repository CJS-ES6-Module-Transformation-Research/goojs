import { Entity as Entity_Entity } from "../../../../src/goo/entities/Entity";
import { LightComponent as LightComponent_LightComponent } from "../../../../src/goo/entities/components/LightComponent";
import { TransformComponent as TransformComponent_TransformComponent } from "../../../../src/goo/entities/components/TransformComponent";
import { LightingSystem as LightingSystem_LightingSystem } from "../../../../src/goo/entities/systems/LightingSystem";
import { World as World_World } from "../../../../src/goo/entities/World";

describe('LightingSystem', function () {
	describe('inserted', function () {
		it('will update a light\'s transform', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new LightComponent_LightComponent(light);
			var entity = new Entity_Entity().setComponent(lightComponent).setComponent(new TransformComponent_TransformComponent());
			var lightingSystem = new LightingSystem_LightingSystem();

			lightingSystem.inserted(entity);

			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});
	});

	// testing interaction coming from 'world-space'
	describe('+World', function () {
		it('adds and updates a light when adding an entity with a light component to the world', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new LightComponent_LightComponent(light);
			var lightingSystem = new LightingSystem_LightingSystem();

			var world = new World_World();
			world.setSystem(lightingSystem);
			var entity = world.createEntity(lightComponent).addToWorld();

			world.process();

			expect(lightingSystem.lights).toContain(light);
			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});

		it('adds and updates a light when adding a light component on an existing entity', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new LightComponent_LightComponent(light);
			var lightingSystem = new LightingSystem_LightingSystem();

			var world = new World_World();
			world.setSystem(lightingSystem);
			var entity = world.createEntity().addToWorld();

			world.process();

			entity.setComponent(lightComponent);

			world.process();

			expect(lightingSystem.lights).toContain(light);
			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});
	});
});
