import { PlaneCollider as PlaneColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import { Transform as Transformjs } from "../../../../../src/goo/math/Transform";
describe('PlaneCollider', function () {

	var PlaneCollider = PlaneColliderjs;
	var Transform = Transformjs;

	it('can clone', function () {
		var collider = new PlaneColliderjs();
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new PlaneColliderjs();
		var collider2 = new PlaneColliderjs();
		var transform = new Transformjs();
		collider.transform(transform, collider2);
		expect(collider).toEqual(collider2);
	});
});
