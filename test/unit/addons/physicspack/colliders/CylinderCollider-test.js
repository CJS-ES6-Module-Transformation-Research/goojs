"use strict";

var _CylinderCollider = require("../../../../../src/goo/addons/physicspack/colliders/CylinderCollider");

var _Transform = require("../../../../../src/goo/math/Transform");

describe('CylinderCollider', function () {

	var CylinderCollider = _CylinderCollider.CylinderCollider;
	var Transform = _Transform.Transform;

	it('can clone', function () {
		var collider = new _CylinderCollider.CylinderCollider({
			radius: 123,
			height: 456
		});
		var clone = collider.clone();
		expect(collider).toEqual(clone);
	});

	it('can transform', function () {
		var collider = new _CylinderCollider.CylinderCollider({
			radius: 2,
			height: 3
		});
		var transform = new _Transform.Transform();
		transform.scale.setDirect(1, 2, 3);
		collider.transform(transform, collider);
		expect(collider.radius).toEqual(4);
		expect(collider.height).toEqual(9);
	});
});
