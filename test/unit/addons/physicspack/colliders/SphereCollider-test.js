import { SphereCollider as SphereColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { Transform as Transformjs } from "../../../../../src/goo/math/Transform";
describe('SphereCollider', function () {

	var SphereCollider = SphereColliderjs;
	var Transform = Transformjs;

	it('can clone', function () {
		var collider = new SphereColliderjs({
			radius: 2
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new SphereColliderjs({
			radius: 2
		});
		var transform = new Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.radius).toEqual(6);
	});
});
