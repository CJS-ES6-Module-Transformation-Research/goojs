import { MeshCollider as MeshColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/MeshCollider";
import { Vector3 as Vector3js } from "../../../../../src/goo/math/Vector3";
import { Sphere as Spherejs } from "../../../../../src/goo/shapes/Sphere";
import { Transform as Transformjs } from "../../../../../src/goo/math/Transform";
describe('MeshCollider', function () {

	var MeshCollider = MeshColliderjs;
	var Vector3 = Vector3js;
	var Sphere = Spherejs;
	var Transform = Transformjs;

	it('can clone', function () {
		var collider = new MeshColliderjs({
			meshData: new Spherejs(10, 10, 1),
			scale: new Vector3js(2, 3, 4)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new MeshColliderjs({
			meshData: new Spherejs(10, 10, 1),
			scale: new Vector3js(2, 3, 4)
		});
		var transform = new Transformjs();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.scale).toEqual(new Vector3js(2, 6, 12));
	});
});
