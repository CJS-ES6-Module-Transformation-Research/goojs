import { PlaneCollider as PlaneCollider_PlaneColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import { Transform as Transform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('PlaneCollider', function () {

	var PlaneCollider = PlaneCollider_PlaneColliderjs;
	var Transform = Transform_Transformjs;

	it('can clone', function () {
		var collider = new PlaneCollider_PlaneColliderjs();
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new PlaneCollider_PlaneColliderjs();
		var collider2 = new PlaneCollider_PlaneColliderjs();
		var transform = new Transform_Transformjs();
		collider.transform(transform, collider2);
		expect(collider).toEqual(collider2);
	});
});
