import { MeshCollider as MeshCollider_MeshColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/MeshCollider";
import { Vector3 as Vector3_Vector3js } from "../../../../../src/goo/math/Vector3";
import { Sphere as Sphere_Spherejs } from "../../../../../src/goo/shapes/Sphere";
import { Transform as Transform_Transformjs } from "../../../../../src/goo/math/Transform";
describe('MeshCollider', function () {

	var MeshCollider = MeshCollider_MeshColliderjs;
	var Vector3 = Vector3_Vector3js;
	var Sphere = Sphere_Spherejs;
	var Transform = Transform_Transformjs;

	it('can clone', function () {
		var collider = new MeshCollider_MeshColliderjs({
			meshData: new Sphere_Spherejs(10, 10, 1),
			scale: new Vector3_Vector3js(2, 3, 4)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new MeshCollider_MeshColliderjs({
			meshData: new Sphere_Spherejs(10, 10, 1),
			scale: new Vector3_Vector3js(2, 3, 4)
		});
		var transform = new Transform_Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.scale).toEqual(new Vector3_Vector3js(2, 6, 12));
	});
});
