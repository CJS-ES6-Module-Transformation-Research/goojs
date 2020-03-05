"use strict";

var _BoxCollider = require("../../../../../src/goo/addons/physicspack/colliders/BoxCollider");

var _Vector = require("../../../../../src/goo/math/Vector3");

var _Transform = require("../../../../../src/goo/math/Transform");

describe('BoxCollider', function () {

	var BoxCollider = _BoxCollider.BoxCollider;
	var Vector3 = _Vector.Vector3;
	var Transform = _Transform.Transform;

	it('can clone', function () {
		var collider = new _BoxCollider.BoxCollider({
			halfExtents: new _Vector.Vector3(1, 2, 3)
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new _BoxCollider.BoxCollider({
			halfExtents: new _Vector.Vector3(1, 2, 3)
		});
		var transform = new _Transform.Transform();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.halfExtents).toEqual(new _Vector.Vector3(1, 4, 9));
	});
});
