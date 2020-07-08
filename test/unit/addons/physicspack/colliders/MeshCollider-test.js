import {     MeshCollider as srcgooaddonsphysicspackcollidersMeshCollider_MeshColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/MeshCollider";
import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { Sphere as srcgooshapesSphere_Spherejs } from "../../../../../src/goo/shapes/Sphere";
import { Transform as srcgoomathTransform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('MeshCollider', function () {
    it('can clone', function () {
		var collider = new srcgooaddonsphysicspackcollidersMeshCollider_MeshColliderjs({
			meshData: new srcgooshapesSphere_Spherejs(10, 10, 1),
			scale: new srcgoomathVector3_Vector3js(2, 3, 4)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

    it('can transform', function () {
		var collider = new srcgooaddonsphysicspackcollidersMeshCollider_MeshColliderjs({
			meshData: new srcgooshapesSphere_Spherejs(10, 10, 1),
			scale: new srcgoomathVector3_Vector3js(2, 3, 4)
		});
		var transform = new srcgoomathTransform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.scale).toEqual(new srcgoomathVector3_Vector3js(2, 6, 12));
	});
});
