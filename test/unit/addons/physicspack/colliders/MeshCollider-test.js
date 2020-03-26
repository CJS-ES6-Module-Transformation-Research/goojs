import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../../src/goo/math/Vector3";
describe('MeshCollider', function () {
    it('can clone', function () {
		var collider = new MeshCollider({
			meshData: new Sphere(10, 10, 1),
			scale: new Vector3(2, 3, 4)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

    it('can transform', function () {
		var collider = new MeshCollider({
			meshData: new Sphere(10, 10, 1),
			scale: new Vector3(2, 3, 4)
		});
		var transform = new Transform();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.scale).toEqual(new srcgoomathVector3_Vector3js(2, 6, 12));
	});
});
