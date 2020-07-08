import { Entity as srcgooentitiesEntity_Entityjs } from "../../../../src/goo/entities/Entity";
import { LightComponent as srcgooentitiescomponentsLightComponent_LightComponentjs } from "../../../../src/goo/entities/components/LightComponent";
import {     TransformComponent as srcgooentitiescomponentsTransformComponent_TransformComponentjs, } from "../../../../src/goo/entities/components/TransformComponent";
import { LightingSystem as srcgooentitiessystemsLightingSystem_LightingSystemjs } from "../../../../src/goo/entities/systems/LightingSystem";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";

describe('LightingSystem', function () {
	describe('inserted', function () {
		it('will update a light\'s transform', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new srcgooentitiescomponentsLightComponent_LightComponentjs(light);
			var entity = new srcgooentitiesEntity_Entityjs().setComponent(lightComponent).setComponent(new srcgooentitiescomponentsTransformComponent_TransformComponentjs());
			var lightingSystem = new srcgooentitiessystemsLightingSystem_LightingSystemjs();

			lightingSystem.inserted(entity);

			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});
	});

	// testing interaction coming from 'world-space'
	describe('+World', function () {
		it('adds and updates a light when adding an entity with a light component to the world', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new srcgooentitiescomponentsLightComponent_LightComponentjs(light);
			var lightingSystem = new srcgooentitiessystemsLightingSystem_LightingSystemjs();

			var world = new srcgooentitiesWorld_Worldjs();
			world.setSystem(lightingSystem);
			var entity = world.createEntity(lightComponent).addToWorld();

			world.process();

			expect(lightingSystem.lights).toContain(light);
			expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
		});

		it('adds and updates a light when adding a light component on an existing entity', function () {
			var light = jasmine.createSpyObj('Light', ['update']);
			var lightComponent = new srcgooentitiescomponentsLightComponent_LightComponentjs(light);
			var lightingSystem = new srcgooentitiessystemsLightingSystem_LightingSystemjs();

			var world = new srcgooentitiesWorld_Worldjs();
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
