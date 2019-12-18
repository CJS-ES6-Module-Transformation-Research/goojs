var _MeshCollider = require("../../../../../src/goo/addons/physicspack/colliders/MeshCollider");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _Sphere = require("../../../../../src/goo/shapes/Sphere");

var _Transform = require("../../../../../src/goo/math/Transform");

describe('MeshCollider', function () {
	it('can clone', function () {
		var collider = new _MeshCollider.MeshCollider({
			meshData: new _Sphere.Sphere(10, 10, 1),
			scale: new _Vector.Vector3(2, 3, 4)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new _MeshCollider.MeshCollider({
			meshData: new _Sphere.Sphere(10, 10, 1),
			scale: new _Vector.Vector3(2, 3, 4)
		});
		var transform = new _Transform.Transform();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.scale).toEqual(new _Vector.Vector3(2, 6, 12));
	});
});
