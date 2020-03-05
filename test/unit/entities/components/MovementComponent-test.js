import { MovementComponent as MovementComponent_MovementComponentjs } from "../../../../src/goo/entities/components/MovementComponent";
import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";

describe('MovementComponent', function () {
	describe('Test velocity deltas', function () {
		var spatialMovementComponent;

		beforeEach(function () {
			spatialMovementComponent = new MovementComponent_MovementComponentjs();
		});

		it('adds velocity once', function () {
			var velocity = new Vector3_Vector3js(0, 1, 0);
			spatialMovementComponent.addVelocity(velocity);
			expect(spatialMovementComponent.getVelocity()).toEqual(velocity);
		});

		it('adds velocity some times', function () {
			var velocity = new Vector3_Vector3js(0, 1, 0);
			spatialMovementComponent.addVelocity(velocity);
			spatialMovementComponent.addVelocity(velocity);
			expect(spatialMovementComponent.getVelocity()).toEqual(velocity.scale(2));
			velocity.setDirect(1, 0, 0);
			spatialMovementComponent.addVelocity(velocity);
			spatialMovementComponent.addVelocity(velocity);
			expect(spatialMovementComponent.getVelocity()).toEqual(new Vector3_Vector3js(2, 2, 0));
			velocity.setDirect(-1, 0, 1);
			spatialMovementComponent.addVelocity(velocity);
			spatialMovementComponent.addVelocity(velocity);
			expect(spatialMovementComponent.getVelocity()).toEqual(new Vector3_Vector3js(0, 2, 2));
		});

		it('sets velocity', function () {
			var velocity = new Vector3_Vector3js(0, 1, 0);
			spatialMovementComponent.setVelocity(velocity);
			expect(spatialMovementComponent.getVelocity()).toEqual(velocity);

			velocity = new Vector3_Vector3js(3, 0, 0);
			spatialMovementComponent.setVelocity(velocity);
			expect(spatialMovementComponent.getVelocity()).toEqual(velocity);
		});

		it('adds rotational  velocity once', function () {
			var velocity = new Vector3_Vector3js(0, 1, 0);
			spatialMovementComponent.addRotationVelocity(velocity);
			expect(spatialMovementComponent.getRotationVelocity()).toEqual(velocity);
		});

		it('adds rotational velocity some times', function () {
			var velocity = new Vector3_Vector3js(0, 1, 0);
			spatialMovementComponent.addRotationVelocity(velocity);
			spatialMovementComponent.addRotationVelocity(velocity);
			expect(spatialMovementComponent.getRotationVelocity()).toEqual(velocity.scale(2));
			velocity.setDirect(1, 0, 0);
			spatialMovementComponent.addRotationVelocity(velocity);
			spatialMovementComponent.addRotationVelocity(velocity);
			expect(spatialMovementComponent.getRotationVelocity()).toEqual(new Vector3_Vector3js(2, 2, 0));
			velocity.setDirect(-1, 0, 1);
			spatialMovementComponent.addRotationVelocity(velocity);
			spatialMovementComponent.addRotationVelocity(velocity);
			expect(spatialMovementComponent.getRotationVelocity()).toEqual(new Vector3_Vector3js(0, 2, 2));
		});

		it('sets velocity', function () {
			var velocity = new Vector3_Vector3js(0, 1, 0);
			spatialMovementComponent.setRotationVelocity(velocity);
			expect(spatialMovementComponent.getRotationVelocity()).toEqual(velocity);
			velocity = new Vector3_Vector3js(3, 0, 0);
			spatialMovementComponent.setRotationVelocity(velocity);
			expect(spatialMovementComponent.getRotationVelocity()).toEqual(velocity);
		});
	});
});
