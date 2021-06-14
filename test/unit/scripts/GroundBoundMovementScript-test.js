"use strict";

var _GroundBoundMovementScript = require("../../../src/goo/scriptpack/GroundBoundMovementScript");

var _MovementSystem = require("../../../src/goo/entities/systems/MovementSystem");

var _MovementComponent = require("../../../src/goo/entities/components/MovementComponent");

var _TransformComponent = require("../../../src/goo/entities/components/TransformComponent");

xdescribe('Movement script tests', function () {
		var movementSystem = new _MovementSystem.MovementSystem();
		var groundBoundMovementScript;
		var entity;

		function getHeight() {
				return 0;
		}

		var mockGround = {
				getTerrainHeightAt: getHeight,
				getTerrainNormalAt: function getTerrainNormalAt() {
						return { data: [0, 1, 0] };
				}
		};

		var setEntityTranformData = function setEntityTranformData(entity, data) {
				entity.transformComponent.transform.translation.data = data;
		};

		beforeEach(function () {
				groundBoundMovementScript = new _GroundBoundMovementScript.GroundBoundMovementScript();
				entity = {
						transformComponent: new _TransformComponent.TransformComponent(),
						movementComponent: new _MovementComponent.MovementComponent(),
						_world: { tpf: 0.1 }
				};
				setEntityTranformData(entity, [0, 0, 0]);

				groundBoundMovementScript.gravity = -2;
				groundBoundMovementScript.jumpImpulse = 4;
				groundBoundMovementScript.accLerp = 0.1;
				groundBoundMovementScript.rotLerp = 0.1;
		});

		it('finds ground contact when below ground', function () {
				setEntityTranformData(entity, [0, -1, 0]);
				groundBoundMovementScript.setTerrainSystem(mockGround);
				groundBoundMovementScript.run(entity);
				expect(entity.transformComponent.transform.translation.data[1]).toEqual(0);
		});

		it('finds velocity curvature after jump to match', function () {
				setEntityTranformData(entity, [0, -1, 0]);
				groundBoundMovementScript.setTerrainSystem(mockGround);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(0);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(0);

				expect(entity.transformComponent.transform.translation.data[1]).toEqual(0);

				groundBoundMovementScript.applyJump(1);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(4);
				expect(entity.transformComponent.transform.translation.data[1]).toBeCloseTo(0.4);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(2);
				expect(entity.transformComponent.transform.translation.data[1]).toBeCloseTo(0.6);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(0);
				expect(entity.transformComponent.transform.translation.data[1]).toBeCloseTo(0.6);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(-2);
				expect(entity.transformComponent.transform.translation.data[1]).toBeCloseTo(0.4);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(-4);
				expect(entity.transformComponent.transform.translation.data[1]).toBeCloseTo(0);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toEqual(-6);
				expect(entity.transformComponent.transform.translation.data[1]).toBeCloseTo(-0.6);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(0);
				expect(entity.transformComponent.transform.translation.data[1]).toEqual(0);

				groundBoundMovementScript.run(entity);
				movementSystem.applyMovementToEntity(entity);

				expect(entity.movementComponent.getVelocity()[1]).toBeCloseTo(0);
				expect(entity.transformComponent.transform.translation.data[1]).toEqual(0);
		});
});