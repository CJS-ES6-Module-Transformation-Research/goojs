import {     PlaneCollider as srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import { Transform as srcgoomathTransform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('PlaneCollider', function () {
    it('can clone', function () {
		var collider = new srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs();
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

    it('can transform', function () {
		var collider = new srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs();
		var collider2 = new srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs();
		var transform = new srcgoomathTransform_Transformjs();
		collider.transform(transform, collider2);
		expect(collider).toEqual(collider2);
	});
});
