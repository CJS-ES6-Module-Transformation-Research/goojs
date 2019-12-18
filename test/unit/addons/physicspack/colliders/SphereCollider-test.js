var _SphereCollider = require("../../../../../src/goo/addons/physicspack/colliders/SphereCollider");

var _Transform = require("../../../../../src/goo/math/Transform");

describe('SphereCollider', function () {
	it('can clone', function () {
		var collider = new _SphereCollider.SphereCollider({
			radius: 2
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new _SphereCollider.SphereCollider({
			radius: 2
		});
		var transform = new _Transform.Transform();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.radius).toEqual(6);
	});
});
