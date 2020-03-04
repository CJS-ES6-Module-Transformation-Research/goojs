import { Entity as Entityjs } from "../../../../src/goo/entities/Entity";
import { LightComponent as LightComponentjs } from "../../../../src/goo/entities/components/LightComponent";
import { TransformComponent as TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { LightingSystem as LightingSystemjs } from "../../../../src/goo/entities/systems/LightingSystem";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";

describe('LightingSystem', function () {
	describe('inserted', function () {
		it('will update a light\'s transform', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new LightComponentjs(light);
			var entity = new Entityjs().setComponent(lightComponent).setComponent(new TransformComponentjs());
			var lightingSystem = new LightingSystemjs();

			lightingSystem.inserted(entity);

			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});
	});

	// testing interaction coming from 'world-space'
	describe('+World', function () {
		it('adds and updates a light when adding an entity with a light component to the world', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new LightComponentjs(light);
			var lightingSystem = new LightingSystemjs();

			var world = new World_Worldjs();
			world.setSystem(lightingSystem);
			var entity = world.createEntity(lightComponent).addToWorld();

			world.process();

			expect(lightingSystem.lights).toContain(light);
			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});

		it('adds and updates a light when adding a light component on an existing entity', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new LightComponentjs(light);
			var lightingSystem = new LightingSystemjs();

			var world = new World_Worldjs();
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
