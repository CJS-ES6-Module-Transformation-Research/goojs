import { SphereCollider as SphereCollider_SphereColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { Transform as Transform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('SphereCollider', function () {

	var SphereCollider = SphereCollider_SphereColliderjs;
	var Transform = Transform_Transformjs;

	it('can clone', function () {
		var collider = new SphereCollider_SphereColliderjs({
			radius: 2
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new SphereCollider_SphereColliderjs({
			radius: 2
		});
		var transform = new Transform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.radius).toEqual(6);
	});
});
