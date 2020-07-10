import {     SphereCollider as srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { Transform as srcgoomathTransform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('SphereCollider', function () {
    it('can clone', function () {
		var collider = new srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs({
			radius: 2
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

    it('can transform', function () {
		var collider = new srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs({
			radius: 2
		});
		var transform = new srcgoomathTransform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.radius).toEqual(6);
	});
});
