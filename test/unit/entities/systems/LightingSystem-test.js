"use strict";

var _Entity = require("../../../../src/goo/entities/Entity");

var _LightComponent = require("../../../../src/goo/entities/components/LightComponent");

var _TransformComponent = require("../../../../src/goo/entities/components/TransformComponent");

var _LightingSystem = require("../../../../src/goo/entities/systems/LightingSystem");

var _World = require("../../../../src/goo/entities/World");

describe('LightingSystem', function () {
			describe('inserted', function () {
						it('will update a light\'s transform', function () {
									var light = jasmine.createSpyObj('Light', ['update']);
									var lightComponent = new _LightComponent.LightComponent(light);
									var entity = new _Entity.Entity().setComponent(lightComponent).setComponent(new _TransformComponent.TransformComponent());
									var lightingSystem = new _LightingSystem.LightingSystem();

									lightingSystem.inserted(entity);

									expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
						});
			});

			// testing interaction coming from 'world-space'
			describe('+World', function () {
						it('adds and updates a light when adding an entity with a light component to the world', function () {
									var light = jasmine.createSpyObj('Light', ['update']);
									var lightComponent = new _LightComponent.LightComponent(light);
									var lightingSystem = new _LightingSystem.LightingSystem();

									var world = new _World.World();
									world.setSystem(lightingSystem);
									var entity = world.createEntity(lightComponent).addToWorld();

									world.process();

									expect(lightingSystem.lights).toContain(light);
									expect(light.update).toHaveBeenCalledWith(entity.transformComponent.worldTransform);
						});

						it('adds and updates a light when adding a light component on an existing entity', function () {
									var light = jasmine.createSpyObj('Light', ['update']);
									var lightComponent = new _LightComponent.LightComponent(light);
									var lightingSystem = new _LightingSystem.LightingSystem();

									var world = new _World.World();
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
