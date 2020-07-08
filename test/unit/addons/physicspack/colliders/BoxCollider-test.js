import { BoxCollider as srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { Transform as srcgoomathTransform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('BoxCollider', function () {
    it('can clone', function () {
		var collider = new srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs({
			halfExtents: new srcgoomathVector3_Vector3js(1, 2, 3)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

    it('can transform', function () {
		var collider = new srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs({
			halfExtents: new srcgoomathVector3_Vector3js(1, 2, 3)
		});
		var transform = new srcgoomathTransform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.halfExtents).toEqual(new srcgoomathVector3_Vector3js(1, 4, 9));
	});
});